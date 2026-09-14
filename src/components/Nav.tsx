"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "writing", label: "Writing" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy. Sections are tall and unequal, so "most visible" gives the wrong
  // answer near boundaries; instead the active section is whichever one the
  // viewport's midpoint currently sits inside.
  useEffect(() => {
    const pickActive = () => {
      const midpoint = window.scrollY + window.innerHeight / 2;
      let current = "";

      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (midpoint >= top && midpoint < top + el.offsetHeight) {
          current = id;
          break;
        }
      }

      // Past the last section (the footer), keep the final link lit.
      if (!current && window.scrollY > 0) {
        const last = document.getElementById(SECTIONS[SECTIONS.length - 1].id);
        if (last && window.scrollY + window.innerHeight / 2 >= last.offsetTop) {
          current = SECTIONS[SECTIONS.length - 1].id;
        }
      }

      setActive(current);
    };

    pickActive();
    window.addEventListener("scroll", pickActive, { passive: true });
    window.addEventListener("resize", pickActive);
    return () => {
      window.removeEventListener("scroll", pickActive);
      window.removeEventListener("resize", pickActive);
    };
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a
            href="#top"
            className="font-display text-lg uppercase tracking-widest text-fg transition-colors hover:text-garnet-lit"
          >
            Devroop<span className="text-garnet">.</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active === section.id ? "true" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                    active === section.id
                      ? "bg-white/[0.07] text-fg"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-px w-5 bg-fg transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-fg transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Sibling of <header> on purpose — see the comment above. */}
      <div
        className={`fixed inset-0 z-40 bg-ink/[0.98] transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-2">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                tabIndex={open ? undefined : -1}
                className="block px-6 py-3 font-display text-3xl uppercase tracking-wide text-fg transition-colors hover:text-garnet-lit"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
