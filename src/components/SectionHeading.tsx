import type { ReactNode } from "react";

import { Reveal } from "./Reveal";

type Props = {
  /** Small monospaced kicker, e.g. "02 / about". */
  kicker: string;
  title: ReactNode;
  lead?: string;
};

export function SectionHeading({ kicker, title, lead }: Props) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-garnet">
        {kicker}
      </p>
      <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
