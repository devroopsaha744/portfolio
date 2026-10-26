import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages, served at the root of https://dvprsh.tech
 * (custom domain, so no basePath). Pages has no Image Optimization API, hence
 * `unoptimized`.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
