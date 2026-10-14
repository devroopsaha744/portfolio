import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Kim live chat. Only loads when all four are set: the Pages build sets them in
// deploy.yml, and .env.local points them at a local candy for development
const kimSdkUrl = process.env.NEXT_PUBLIC_KIM_SDK_URL;
const kimApiHost = process.env.NEXT_PUBLIC_KIM_API_HOST;
const kimWidgetUrl = process.env.NEXT_PUBLIC_KIM_WIDGET_URL;
const kimWebsiteToken = process.env.NEXT_PUBLIC_KIM_WEBSITE_TOKEN;

// Candy's embed snippet (Inbox settings > Configuration), with the URLs and
// token from the env. It runs from <head> while the page is still parsing:
// it opens the connection to candy, starts the chat window's iframe, and
// loads the SDK, which reuses that iframe.
const kimSnippet =
  kimSdkUrl &&
  kimApiHost &&
  kimWidgetUrl &&
  kimWebsiteToken &&
  `(function(d,t) {
  var BASE_URL=${JSON.stringify(kimApiHost)};
  var WEBSITE_TOKEN=${JSON.stringify(kimWebsiteToken)};
  var p=d.createElement('link');
  p.rel='preconnect';
  p.href=BASE_URL;
  p.crossOrigin='anonymous';
  d.head.appendChild(p);
  var w=function(){
    if(d.getElementById('chatwoot_live_chat_widget'))return;
    var c=(d.cookie.match(/(?:^|; )cw_conversation=([^;]*)/)||[])[1];
    var h=d.createElement('div'),f=d.createElement('iframe');
    h.style.cssText='position:fixed;visibility:hidden';
    f.allow='camera;microphone;fullscreen;display-capture;picture-in-picture;clipboard-write;';
    f.src=${JSON.stringify(`${kimWidgetUrl}/widget?website_token=`)}+WEBSITE_TOKEN+(c?'&cw_conversation='+c:'');
    f.id='chatwoot_live_chat_widget';
    f.style.visibility='hidden';
    h.appendChild(f);
    d.body.appendChild(h);
  };
  if(d.body){w()}else{d.addEventListener('DOMContentLoaded',w)}
  var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
  g.src=${JSON.stringify(kimSdkUrl)};
  g.defer = true;
  g.async = true;
  g.fetchPriority = 'high';
  s.parentNode.insertBefore(g,s);
  g.onload=function(){
    window.kimSDK.run({
      websiteToken: WEBSITE_TOKEN,
      baseUrl: BASE_URL,
      widgetConfig: {"widget_bubble_launcher_title":null,"widget_bubble_position":null,"widget_bubble_type":null}
    })
  }
})(document,"script");`;

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://devroopsaha744.github.io/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Devroop Saha | AI Engineer",
  description:
    "AI engineer building production LLM systems: RAG pipelines, agents, hybrid retrieval. Currently at Kim CC. Culé, LeetCode grinder, and occasional writer.",
  keywords: [
    "Devroop Saha",
    "AI Engineer",
    "Machine Learning Engineer",
    "RAG",
    "LLM",
    "AI Agents",
    "Python",
    "FastAPI",
  ],
  authors: [{ name: "Devroop Saha", url: "https://github.com/devroopsaha744" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Devroop Saha | AI Engineer",
    description:
      "AI engineer building production LLM systems: RAG pipelines, agents, hybrid retrieval. Currently at Kim CC.",
    siteName: "Devroop Saha",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devroop Saha | AI Engineer",
    description:
      "AI engineer building production LLM systems: RAG pipelines, agents, hybrid retrieval.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      {kimSnippet && (
        <head>
          <script id="kim-live-chat" dangerouslySetInnerHTML={{ __html: kimSnippet }} />
        </head>
      )}
      <body className="font-sans antialiased">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-garnet focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {children}

      </body>
    </html>
  );
}
