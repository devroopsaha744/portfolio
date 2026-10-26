/**
 * Must stay in sync with `basePath` in next.config.ts.
 *
 * Next only rewrites basePath for next/link and next/image. A raw <a href> or
 * <iframe src> to a file in public/ needs the prefix applied by hand. The site
 * is served from the root of dvprsh.tech, so this is empty; keep routing
 * public/ links through asset() in case it moves under a sub-path again.
 */
export const BASE_PATH = "";

export function asset(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
