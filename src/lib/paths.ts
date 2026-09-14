/**
 * Must stay in sync with `basePath` in next.config.ts.
 *
 * Next only rewrites basePath for next/link and next/image. A raw <a href> or
 * <iframe src> to a file in public/ needs the prefix applied by hand, or it
 * 404s once deployed to the /portfolio sub-path.
 */
export const BASE_PATH = "/portfolio";

export function asset(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
