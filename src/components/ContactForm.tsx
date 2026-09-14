"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";

/**
 * Web3Forms access key. This is a NEXT_PUBLIC_ value on purpose: the site is a
 * static export with no server, so the POST happens from the browser and the key
 * is designed by Web3Forms to be public. It only permits submissions to the
 * address the key was issued for, and it cannot read anything.
 *
 * Grab one at https://web3forms.com/#start and set it as the
 * NEXT_PUBLIC_WEB3FORMS_KEY repository secret. Until then the form degrades to
 * a mailto: link rather than silently swallowing messages.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-[15px] text-fg placeholder:text-faint transition-colors focus:border-garnet focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  if (!ACCESS_KEY) {
    return (
      <div className="card p-6 sm:p-7">
        <p className="text-[15px] leading-relaxed text-muted">
          The contact form isn&rsquo;t wired up yet. No form key is configured. In the
          meantime, email works perfectly well:
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          style={{ background: "var(--accent-gradient)" }}
        >
          {profile.email}
        </a>
      </div>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const payload = new FormData(form);
    payload.append("access_key", ACCESS_KEY);
    payload.append("subject", "New message from your portfolio");
    payload.append("from_name", "Portfolio contact form");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const result = (await res.json()) as { success?: boolean; message?: string };

      if (!res.ok || !result.success) {
        throw new Error(result.message ?? `Request failed (${res.status})`);
      }

      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(
        (err as Error).message ||
          "Something went wrong. Email me directly and I'll get it.",
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card flex flex-col items-start gap-3 p-6 sm:p-7">
        <span className="font-display text-3xl uppercase text-gradient">Sent</span>
        <p className="text-[15px] leading-relaxed text-muted">
          Got it. That landed in my inbox. I&rsquo;ll reply as soon as I&rsquo;m not
          mid-match.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 text-sm text-garnet-lit underline-offset-4 hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-6 sm:p-7">
      {/* Honeypot: bots fill this, humans never see it. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={3000}
          placeholder="What are you building?"
          className={`${inputClass} resize-y`}
        />
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-garnet-lit">
          {error}{" "}
          <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
            Email me instead
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        style={{ background: "var(--accent-gradient)" }}
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
