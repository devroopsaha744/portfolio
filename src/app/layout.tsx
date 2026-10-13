import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Kim live chat. Only loads when all three are set: the Pages build sets them in
// deploy.yml, and .env.local points them at a local candy for development
const kimSdkUrl = process.env.NEXT_PUBLIC_KIM_SDK_URL;
const kimApiHost = process.env.NEXT_PUBLIC_KIM_API_HOST;
const kimWebsiteToken = process.env.NEXT_PUBLIC_KIM_WEBSITE_TOKEN;

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
      <body className="font-sans antialiased">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-garnet focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {children}

        {kimSdkUrl && kimApiHost && kimWebsiteToken && (
          <Script id="kim-live-chat" strategy="afterInteractive">
            {`(function (d) {
              var g = d.createElement("script");
              g.src = ${JSON.stringify(kimSdkUrl)};
              g.type = "module";
              g.async = true;
              g.onload = function () {
                window.kimSDK.run({
                  websiteToken: ${JSON.stringify(kimWebsiteToken)},
                  baseUrl: ${JSON.stringify(kimApiHost)},
                });
              };
              d.body.appendChild(g);
            })(document);`}
          </Script>
        )}
      </body>
    </html>
  );
}
