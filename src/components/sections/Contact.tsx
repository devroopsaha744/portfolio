import { profile } from "@/data/profile";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import {
  GitHubIcon,
  LeetCodeIcon,
  LinkedInIcon,
  MailIcon,
  MediumIcon,
  XIcon,
} from "@/components/Icons";

const LINKS = [
  { href: profile.socials.github, label: "GitHub", handle: "devroopsaha744", Icon: GitHubIcon },
  {
    href: profile.socials.linkedin,
    label: "LinkedIn",
    handle: "devroop-saha-datafreak",
    Icon: LinkedInIcon,
  },
  { href: profile.socials.x, label: "X", handle: "@Devroop_saha", Icon: XIcon },
  { href: profile.socials.medium, label: "Medium", handle: "@datafreakai", Icon: MediumIcon },
  {
    href: profile.socials.leetcode,
    label: "LeetCode",
    handle: "bouncy_hufflepuff",
    Icon: LeetCodeIcon,
  },
  { href: `mailto:${profile.email}`, label: "Email", handle: profile.email, Icon: MailIcon },
];

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        kicker="08 / contact"
        title="Say something"
        lead="Hiring, collaborating, or just want to argue about the GOAT debate — the form goes straight to my inbox."
      />

      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-10">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={1}>
          <ul className="space-y-px overflow-hidden rounded-2xl border border-line bg-line">
            {LINKS.map(({ href, label, handle, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  className="group flex items-center gap-4 bg-surface px-5 py-4 transition-colors hover:bg-surface-2"
                >
                  <Icon className="h-[18px] w-[18px] shrink-0 text-faint transition-colors group-hover:text-garnet-lit" />
                  <span className="min-w-0">
                    <span className="block text-sm text-fg">{label}</span>
                    <span className="block truncate font-mono text-xs text-faint">
                      {handle}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
