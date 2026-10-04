/**
 * Posts written and hosted on this site. Each post's body is a standalone page at
 * src/app/blog/<slug>/page.tsx; this list puts them at the front of the Writing
 * section, next to the Medium feed.
 */
export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO date
  readingMinutes: number;
  tags: string[];
  cover: string; // file in public/, without the base path
  coverAlt: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "laya-chess",
    title: "LayaChess: teaching a System 1 decision model to play chess",
    summary:
      "An experiment: I took Laya, a fast decision model that had never seen a chessboard, trained it on 2 million Stockfish-rated moves, and wrapped it in a search engine. Here's how it works, and how strong it got.",
    date: "2026-10-05",
    readingMinutes: 12,
    tags: ["Experiment", "Chess", "Decision models", "MCTS"],
    cover: "/blog/laya-chess/board.jpg",
    coverAlt:
      "The LayaChess board in a browser: a game position next to panels showing Laya's win chance for its candidate moves and Stockfish's preferred move.",
  },
];

export function getBlogPost(slug: string): BlogPost {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) throw new Error(`unknown blog post: ${slug}`);
  return post;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
