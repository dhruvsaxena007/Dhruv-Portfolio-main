"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GitBranch, Send, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { Reveal, WordReveal, MonoLabel } from "@/components/ui/reveal";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const SOCIALS = [
  { label: "LinkedIn", href: personalInfo.linkedin, Icon: LinkedinIcon },
  { label: "GitHub", href: personalInfo.github, Icon: GitBranch },
  { label: "Instagram", href: personalInfo.instagram, Icon: InstagramIcon },
].filter((s) => s.href);

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("success");
      setForm({ name: "", email: "", reason: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const inputCls =
    "w-full border border-border bg-[#07040F] px-4 py-3 text-white placeholder:text-white/25 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors";

  return (
    <section
      id="contact"
      className="relative border-t border-border bg-[#030307] px-6 py-28 md:py-40"
      aria-labelledby="contact-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(168,85,247,0.10),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mb-6">
          <MonoLabel>CONTACT /</MonoLabel>
        </Reveal>
        <h2
          id="contact-title"
          className="max-w-5xl font-display font-black uppercase leading-[0.85] tracking-[-0.02em] text-white"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)" }}
        >
          <WordReveal text="Work with me" />
        </h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-10">
            <Reveal>
              <p className="max-w-md text-lg leading-relaxed text-white/60">
                Open to full-time roles, internships, freelance builds and
                interesting collaborations. Tell me what you&apos;re building.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <a
                href={`mailto:${personalInfo.email}`}
                className="group inline-flex items-center gap-3 font-display text-2xl font-bold text-white transition-colors hover:text-primary md:text-3xl"
              >
                {personalInfo.email}
                <ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              {personalInfo.phone && (
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                  className="mt-3 block font-mono text-sm text-white/50 transition-colors hover:text-primary"
                >
                  {personalInfo.phone}
                </a>
              )}
            </Reveal>

            <Reveal delay={0.14}>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex h-12 w-12 items-center justify-center border border-border text-white/60 transition-all duration-300 hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="space-y-5 border border-border bg-[#0A0718] p-6 md:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="c-name"
                    className={inputCls}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    className={inputCls}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="c-reason" className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Reason
                </label>
                <input
                  id="c-reason"
                  className={inputCls}
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  placeholder="Hiring / Collaboration / Freelance / Just saying hi"
                  required
                />
              </div>

              <div>
                <label htmlFor="c-message" className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="c-message"
                  rows={5}
                  className={`${inputCls} resize-none`}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the opportunity or project..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex w-full items-center justify-center gap-2 bg-primary px-6 py-3.5 font-mono text-sm uppercase tracking-widest text-white transition-all duration-300 hover:bg-primary/90 disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending
                  </>
                ) : status === "success" ? (
                  "Message sent ✓"
                ) : (
                  <>
                    Send message
                    <Send size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-center text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
