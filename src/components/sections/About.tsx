"use client";

import * as React from "react";
import { Reveal, WordReveal, MonoLabel } from "@/components/ui/reveal";
import { personalInfo } from "@/data/personal";

const FACTS = [
  { k: "ROLE", v: "AI Engineer Intern" },
  { k: "COMPANY", v: "HG Technologies" },
  { k: "EDUCATION", v: "B.Tech CSE" },
  { k: "INSTITUTION", v: "PIET Jaipur" },
  { k: "LOCATION", v: "Jaipur, India" },
  { k: "STATUS", v: "Open to opportunities" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-border bg-[#030307] px-6 py-28 md:py-40"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14">
          <MonoLabel>ABOUT /</MonoLabel>
        </Reveal>

        <h2
          id="about-title"
          className="max-w-5xl font-display font-black leading-[0.95] tracking-[-0.02em] text-white"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}
        >
          <WordReveal text="Built to ship at scale." />
        </h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <Reveal delay={0.05}>
              <p className="text-lg leading-relaxed text-white/70 md:text-xl">
                {personalInfo.extendedBio.split("\n\n")[0]}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-lg leading-relaxed text-white/70 md:text-xl">
                {personalInfo.extendedBio.split("\n\n")[1]}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-lg leading-relaxed text-white/70 md:text-xl">
                {personalInfo.extendedBio.split("\n\n")[2]}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <dl className="divide-y divide-border border-y border-border">
              {FACTS.map((f) => (
                <div
                  key={f.k}
                  className="group flex items-center justify-between gap-6 py-4 transition-colors hover:bg-white/[0.02]"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    {f.k}
                  </dt>
                  <dd className="text-right font-medium text-white transition-colors group-hover:text-primary">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
