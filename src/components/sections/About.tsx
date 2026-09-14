import { about } from "@/data/about";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { RichText } from "@/components/RichText";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        kicker="01 / about"
        title={
          <>
            Engineer by trade,
            <br />
            culé by temperament
          </>
        }
      />

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-blau-lit">
            The work
          </h3>
          <div className="space-y-5">
            {about.professional.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index}>
                <p className="text-[15px] leading-[1.75] text-muted sm:text-base">
                  <RichText>{paragraph}</RichText>
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* The shirt number, sitting behind the personal column. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -top-14 select-none font-display text-[10rem] leading-none text-white/[0.035] sm:text-[13rem]"
          >
            10
          </span>

          <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-garnet-lit">
            The rest of it
          </h3>
          <div className="space-y-5">
            {about.personal.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index}>
                <p className="text-[15px] leading-[1.75] text-muted sm:text-base">
                  <RichText>{paragraph}</RichText>
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal className="mt-16">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {about.stats.map((stat) => (
            <div key={stat.label} className="bg-surface px-5 py-7 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="text-gradient block font-display text-4xl sm:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
