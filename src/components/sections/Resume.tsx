import { profile } from "@/data/profile";
import { asset } from "@/lib/paths";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowUpRightIcon, DocumentIcon, DownloadIcon } from "@/components/Icons";

export function Resume() {
  const href = asset(profile.resume);

  return (
    <section id="resume" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        kicker="03 / resume"
        title="The one-pager"
        lead="Everything above, compressed onto a single side of A4 for the people who need it that way."
      />

      <Reveal>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <a
            href={href}
            download
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--accent-gradient)" }}
          >
            <DownloadIcon />
            Download PDF
          </a>
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-garnet hover:text-garnet-lit"
          >
            Open in new tab
            <ArrowUpRightIcon />
          </a>
        </div>
      </Reveal>

      {/* Inline viewer — desktop only. Mobile browsers largely refuse to render
          a PDF in an iframe and show a blank box instead, so small screens get
          the card below rather than a dead frame. */}
      <Reveal delay={1}>
        <div className="hidden overflow-hidden rounded-2xl border border-line bg-surface md:block">
          <iframe
            src={`${href}#view=FitH&toolbar=0`}
            title="Devroop Saha — résumé"
            className="h-[min(78vh,880px)] w-full"
            loading="lazy"
          />
        </div>

        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="card flex items-center gap-4 p-5 md:hidden"
        >
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "var(--accent-gradient)" }}
          >
            <DocumentIcon className="h-6 w-6 text-white" />
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] font-medium text-fg">
              Devroop_Saha_Resume.pdf
            </span>
            <span className="block text-[13px] text-faint">
              Tap to open · 1 page · 100 KB
            </span>
          </span>
          <ArrowUpRightIcon className="ml-auto h-4 w-4 shrink-0 text-faint" />
        </a>
      </Reveal>
    </section>
  );
}
