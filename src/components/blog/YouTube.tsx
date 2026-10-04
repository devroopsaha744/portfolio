/**
 * YouTube embed via the privacy-enhanced youtube-nocookie domain, lazy-loaded so
 * the iframe (and its tracking) only loads once it scrolls near the viewport.
 */
export function YouTube({ id, title, caption }: { id: string; title: string; caption?: string }) {
  return (
    <figure className="my-10">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-surface">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {caption ? <figcaption className="mt-3 text-[13px] leading-relaxed text-faint">{caption}</figcaption> : null}
    </figure>
  );
}
