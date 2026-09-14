"use client";

import { useState } from "react";

/**
 * Medium cover images are hot-linked from their CDN, so any of them can 404 at
 * any time. On error we swap in a blaugrana gradient tile rather than leaving a
 * broken image in the grid.
 */
export function PostImage({ src, alt }: { src: string | null; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        aria-hidden="true"
        className="h-44 w-full"
        style={{ background: "var(--accent-gradient)", opacity: 0.55 }}
      />
    );
  }

  return (
    // Remote Medium CDN, unoptimized under static export. next/image adds
    // nothing here and cannot carry an onError fallback as cleanly.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
  );
}
