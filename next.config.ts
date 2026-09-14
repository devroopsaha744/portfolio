import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages. The site is served from
 * https://devroopsaha744.github.io/portfolio, so every asset has to be
 * prefixed with /portfolio — that is what basePath does. Pages has no
 * Image Optimization API, hence `unoptimized`.
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
