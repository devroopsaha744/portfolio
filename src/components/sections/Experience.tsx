import { education, experience } from "@/data/experience";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32"
    >
      <SectionHeading
        kicker="02 / experience"
        title="Where I've shipped"
        lead="Four stints, one theme: taking LLM systems from a demo that impresses to a service that holds up on a Tuesday afternoon under real traffic."
      />

      <div className="relative">
        {/* Timeline rail. */}
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-garnet via-blau to-transparent sm:block"
        />

        <ol className="space-y-10">
          {experience.map((role, index) => (
            <li key={role.company} className="relative sm:pl-12">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-2 hidden h-[15px] w-[15px] rounded-full border-2 sm:block ${
                  role.current
                    ? "border-gold bg-gold/25"
                    : "border-line-strong bg-ink"
                }`}
              />
              <Reveal delay={index}>
                <article className="card p-6 sm:p-7">
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl uppercase tracking-wide sm:text-[1.7rem]">
                      {role.company}
                    </h3>
                    <span className="font-mono text-xs text-faint">{role.period}</span>
                  </div>
                  <p className="mb-5 text-sm text-garnet-lit">
                    {role.title}
                    <span className="text-faint"> · {role.location}</span>
                  </p>
                  <ul className="space-y-2.5">
                    {role.bullets.map((bullet) => (
                      <li
                        key={bullet.slice(0, 32)}
                        className="relative pl-5 text-[14.5px] leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[0.62em] h-1.5 w-1.5 rounded-full bg-blau-lit"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}

          <li className="relative sm:pl-12">
            <span
              aria-hidden="true"
              className="absolute left-0 top-2 hidden h-[15px] w-[15px] rounded-full border-2 border-line-strong bg-ink sm:block"
            />
            <Reveal delay={experience.length}>
              <article className="card p-6 sm:p-7">
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-2xl uppercase tracking-wide sm:text-[1.7rem]">
                    {education.school}
                  </h3>
                  <span className="font-mono text-xs text-faint">{education.period}</span>
                </div>
                <p className="text-sm text-garnet-lit">
                  {education.degree}
                  <span className="text-faint"> · {education.location}</span>
                </p>
                <p className="mt-3 text-[14.5px] text-muted">{education.detail}</p>
              </article>
            </Reveal>
          </li>
        </ol>
      </div>
    </section>
  );
}
