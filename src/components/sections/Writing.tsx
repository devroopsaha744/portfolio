import type { Post } from "@/lib/medium";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { PostImage } from "@/components/PostImage";
import { ArrowUpRightIcon } from "@/components/Icons";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function Writing({ posts }: { posts: Post[] }) {
  return (
    <section id="writing" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        kicker="05 / writing"
        title="I write things down"
        lead="Explaining a concept is how I find out whether I actually understood it. These are pulled live from my Medium feed."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.link} delay={index} className="h-full">
            <a
              href={post.link}
              target="_blank"
              rel="noreferrer noopener"
              className="card group flex h-full flex-col overflow-hidden"
            >
              <div className="overflow-hidden">
                <PostImage src={post.coverImage} alt="" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <time
                  dateTime={post.date}
                  className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-faint"
                >
                  {formatDate(post.date)}
                </time>

                <h3 className="mb-3 text-[15px] font-semibold leading-snug text-fg transition-colors group-hover:text-garnet-lit">
                  {post.title}
                </h3>

                <p className="mb-4 line-clamp-3 text-[13.5px] leading-relaxed text-muted">
                  {post.excerpt}
                </p>

                {post.tags.length > 0 ? (
                  <ul className="mb-4 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] text-garnet-lit">
                  Read on Medium
                  <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <a
          href={profile.socials.medium}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm text-muted transition-colors hover:border-garnet hover:text-fg"
        >
          Everything on Medium
          <ArrowUpRightIcon />
        </a>
      </Reveal>
    </section>
  );
}
