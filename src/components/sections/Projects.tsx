import type { Project } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowUpRightIcon, GitHubIcon, StarIcon } from "@/components/Icons";

const ACCENT_GLOW: Record<Project["accent"], string> = {
  garnet: "from-garnet/25",
  blau: "from-blau/30",
  gold: "from-gold/20",
};

const LANGUAGE_DOT: Record<string, string> = {
  Python: "bg-[#3572A5]",
  TypeScript: "bg-[#3178c6]",
  "Jupyter Notebook": "bg-[#DA5B0B]",
};

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        kicker="04 / selected work"
        title="Things I built"
        lead="Six of them. Voice agents, MCP servers, a CLI people actually pip install, and some computer vision that judges your squat form."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.repo} delay={index} className="h-full">
            <article className="card group relative flex h-full flex-col overflow-hidden p-6 sm:p-7">
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${
                  ACCENT_GLOW[project.accent]
                } to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="mb-3 flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl uppercase tracking-wide">
                  {project.name}
                </h3>
                {project.stars > 0 ? (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-xs text-gold">
                    <StarIcon />
                    {project.stars}
                  </span>
                ) : null}
              </div>

              <p className="mb-5 text-[14.5px] leading-relaxed text-muted">
                {project.blurb}
              </p>

              <ul className="mb-6 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-faint"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
                >
                  <GitHubIcon className="h-4 w-4" />
                  Source
                </a>
                {project.demo ? (
                  <a
                    href={project.demo.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-garnet-lit transition-colors hover:text-gold"
                  >
                    {project.demo.label}
                    <ArrowUpRightIcon />
                  </a>
                ) : null}
                <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-faint">
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 rounded-full ${
                      LANGUAGE_DOT[project.language] ?? "bg-faint"
                    }`}
                  />
                  {project.language}
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <a
          href="https://github.com/devroopsaha744?tab=repositories"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm text-muted transition-colors hover:border-garnet hover:text-fg"
        >
          All 59 repositories on GitHub
          <ArrowUpRightIcon />
        </a>
      </Reveal>
    </section>
  );
}
