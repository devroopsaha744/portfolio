import { skills } from "@/data/skills";
import { achievements } from "@/data/achievements";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading kicker="05 / toolkit" title="What I work with" />

      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((group, index) => (
          <Reveal key={group.group} delay={index} className="h-full">
            <div className="card h-full p-6">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-blau-lit">
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 text-[13px] text-muted transition-colors hover:border-garnet/50 hover:text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-20">
        <SectionHeading kicker="06 / receipts" title="Things I won" />

        <ul className="space-y-px overflow-hidden rounded-2xl border border-line bg-line">
          {achievements.map((achievement, index) => (
            <li key={achievement.title}>
              <Reveal delay={index}>
                <div className="flex flex-col gap-1 bg-surface px-5 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-7">
                  <span
                    className="shrink-0 rounded-full px-3 py-1 text-center font-mono text-[11px] uppercase tracking-wider text-white sm:w-[5.5rem]"
                    style={{ background: "var(--accent-gradient)" }}
                  >
                    {achievement.place}
                  </span>
                  <div>
                    <p className="text-[15px] font-medium text-fg">{achievement.title}</p>
                    <p className="mt-0.5 text-[13.5px] text-faint">{achievement.detail}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
