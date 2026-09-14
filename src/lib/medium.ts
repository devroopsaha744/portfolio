import { XMLParser } from "fast-xml-parser";
import fallback from "@/data/medium-fallback.json";

export type Post = {
  title: string;
  link: string;
  date: string;
  tags: string[];
  coverImage: string | null;
  excerpt: string;
};

const FEED_URL = process.env.MEDIUM_FEED_URL ?? "https://medium.com/feed/@datafreakai";

/** Medium appends a `?source=rss-…` tracking suffix to every link. */
function cleanLink(link: string): string {
  return link.split("?")[0];
}

function stripHtml(html: string): string {
  return html
    .replace(/<figcaption[\s\S]*?<\/figcaption>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function firstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^"]+)"/i);
  return match ? match[1] : null;
}

function excerptFrom(html: string): string {
  // Medium bodies open with the cover image's credit line ("source: …",
  // "credits: Pexels") and often an "Introduction" heading. Both are noise in a
  // card preview, so strip them and start at the real first sentence.
  const trimmed = stripHtml(html)
    .replace(/^(source|credit|credits|image source)\s*:?[^.]{0,60}?\s(?=[A-Z])/i, "")
    .replace(/^(introduction|intro)\s+(?=[A-Z])/i, "")
    .trim();

  return trimmed.length > 180 ? `${trimmed.slice(0, 180).trimEnd()}…` : trimmed;
}

type RssItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  category?: string | string[];
  "content:encoded"?: string;
};

function parseFeed(xml: string): Post[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    // Medium wraps titles and bodies in CDATA; keep them as plain strings.
    cdataPropName: false as unknown as string,
    trimValues: true,
  });
  const parsed = parser.parse(xml);
  const raw = parsed?.rss?.channel?.item;
  if (!raw) return [];

  const items: RssItem[] = Array.isArray(raw) ? raw : [raw];

  return items.map((item) => {
    const body = item["content:encoded"] ?? "";
    const categories = item.category
      ? Array.isArray(item.category)
        ? item.category
        : [item.category]
      : [];

    return {
      title: stripHtml(String(item.title ?? "Untitled")),
      link: cleanLink(String(item.link ?? "")),
      date: new Date(String(item.pubDate ?? Date.now())).toISOString(),
      tags: categories.map(String).slice(0, 4),
      coverImage: firstImage(body),
      excerpt: excerptFrom(body),
    };
  });
}

/**
 * Reads the Medium RSS feed at build time.
 *
 * The feed is a third party we don't control, so a build must never fail on it:
 * any error falls back to the snapshot committed at src/data/medium-fallback.json.
 * On GitHub Pages the result is baked into the export — the nightly Actions
 * rebuild is what keeps the list current.
 */
export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "devroop-portfolio/1.0" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Medium feed responded ${res.status}`);

    const posts = parseFeed(await res.text());
    if (posts.length === 0) throw new Error("Medium feed contained no items");

    return posts.sort((a, b) => b.date.localeCompare(a.date));
  } catch (error) {
    console.warn(
      `[medium] falling back to committed snapshot: ${(error as Error).message}`,
    );
    return (fallback as Post[]).sort((a, b) => b.date.localeCompare(a.date));
  }
}
