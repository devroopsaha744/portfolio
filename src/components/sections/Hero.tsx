"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import {
  ArrowUpRightIcon,
  GitHubIcon,
  LeetCodeIcon,
  LinkedInIcon,
  MailIcon,
  MediumIcon,
} from "@/components/Icons";

const SOCIALS = [
  { href: profile.socials.github, label: "GitHub", Icon: GitHubIcon },
  { href: profile.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: profile.socials.medium, label: "Medium", Icon: MediumIcon },
  { href: profile.socials.leetcode, label: "LeetCode", Icon: LeetCodeIcon },
  { href: `mailto:${profile.email}`, label: "Email", Icon: MailIcon },
];

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(
      () => setIndex((value) => (value + 1) % profile.roles.length),
      2600,
    );
    return () => clearInterval(timer);
  }, [reduced]);

  if (reduced) return <span className="text-gradient">{profile.roles[0]}</span>;

  return (
    <span className="relative inline-block align-bottom">
      {/* Invisible longest label reserves the width so the line never reflows. */}
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {profile.roles.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <motion.span
        key={index}
        aria-live="polite"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="text-gradient absolute inset-0 whitespace-nowrap"
      >
        {profile.roles[index]}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-24 sm:px-8"
    >
      {/* Blaugrana gradient mesh + pitch grid. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="pitch-grid absolute inset-0" />
        <div className="absolute -left-40 top-[-15%] h-[34rem] w-[34rem] rounded-full bg-blau/25 blur-[140px]" />
        <div className="absolute -right-32 top-[20%] h-[30rem] w-[30rem] rounded-full bg-garnet/25 blur-[140px]" />
        <div className="absolute bottom-[-25%] left-1/3 h-[26rem] w-[26rem] rounded-full bg-garnet/10 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-4 py-1.5 font-mono text-xs text-muted backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          {profile.currentRole}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-display text-[clamp(3rem,13vw,9rem)] uppercase leading-[0.85] tracking-tight"
        >
          Devroop
          <br />
          Saha
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-6 font-display text-[clamp(1.5rem,5vw,3rem)] uppercase leading-none tracking-tight"
        >
          <RotatingRole />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--accent-gradient)" }}
          >
            See the work
            <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-garnet hover:text-garnet-lit"
          >
            Get in touch
          </a>

          <div className="ml-1 flex items-center gap-1">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer noopener"
                aria-label={label}
                className="rounded-full p-2.5 text-muted transition-colors hover:bg-white/5 hover:text-fg"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 [@media(min-height:760px)]:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-line-strong to-transparent" />
      </div>
    </section>
  );
}
