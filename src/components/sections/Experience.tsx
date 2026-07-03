"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import { Reveal, MonoLabel } from "@/components/ui/reveal";

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experience)[0];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border border-border bg-[#0A0718] transition-colors duration-500 hover:border-border-strong"
    >
      {/* border trace */}
      <span className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
      <span className="pointer-events-none absolute left-0 top-0 h-0 w-px bg-primary transition-all delay-100 duration-500 group-hover:h-full" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-0 w-px bg-primary transition-all delay-100 duration-500 group-hover:h-full" />

      {/* header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="flex h-8 w-8 items-center justify-center border border-border font-mono text-xs text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-mono text-sm uppercase tracking-[0.15em] text-white">
            {exp.company}
          </h3>
        </div>
        {exp.current && (
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            Current
          </span>
        )}
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-[220px_1fr] md:p-8">
        <div className="space-y-2">
          <p className="text-lg font-semibold text-white">{exp.role}</p>
          <p className="font-mono text-xs text-muted-foreground">{exp.period}</p>
          <p className="font-mono text-xs text-muted-foreground">{exp.location}</p>
        </div>

        <div>
          <ul className="space-y-3">
            {exp.description.map((d, i) => (
              <li key={i} className="flex gap-3 text-white/70">
                {/* L-bracket bullet */}
                <span className="mt-1.5 inline-block h-3 w-3 shrink-0 border-b border-l border-primary/60" />
                <span className="leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
            {exp.techStack.map((t) => (
              <span
                key={t}
                className="border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="relative border-t border-border bg-[#030307] px-6 py-28 md:py-40"
      aria-labelledby="experience-title"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-6">
          <MonoLabel>EXPERIENCE /</MonoLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="experience-title"
            className="max-w-4xl font-display font-black leading-[0.9] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}
          >
            Experience
          </h2>
        </Reveal>

        <div className="mt-16 space-y-6">
          {experience.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
