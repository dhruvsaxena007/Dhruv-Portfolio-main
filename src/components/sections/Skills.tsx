"use client";

import * as React from "react";
import { techStack } from "@/data/tech-stack";
import { Reveal, MonoLabel } from "@/components/ui/reveal";

function MarqueeRow({
  items,
  duration,
  reverse,
}: {
  items: string[];
  duration: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-paused group relative flex overflow-hidden py-3">
      <div
        className="animate-marquee flex shrink-0 items-center gap-10 pr-10"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {doubled.map((name, i) => (
          <span
            key={i}
            className="whitespace-nowrap font-display text-2xl font-semibold text-white/30 transition-colors duration-300 hover:text-primary md:text-4xl"
          >
            {name}
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030307] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030307] to-transparent" />
    </div>
  );
}

export function Skills() {
  const rows = techStack.map((cat) => cat.items.map((i) => i.name));

  return (
    <section
      id="tech-stack"
      className="relative border-t border-border bg-[#030307] px-6 py-28 md:py-36"
      aria-labelledby="tech-title"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-6">
          <MonoLabel>TECH STACK /</MonoLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="tech-title"
            className="max-w-4xl font-display font-black leading-[0.9] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}
          >
            Tech stack
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 flex flex-col gap-2">
        {rows.map((items, i) => (
          <MarqueeRow
            key={i}
            items={items}
            duration={38 + i * 6}
            reverse={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
