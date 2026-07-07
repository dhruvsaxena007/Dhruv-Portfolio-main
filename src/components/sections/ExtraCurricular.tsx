"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Bike, Code2, Cpu, Trophy } from "lucide-react";
import { extraCurricular } from "@/data/extra-curricular";
import { Reveal, MonoLabel } from "@/components/ui/reveal";

const ICONS: Record<string, React.ElementType> = {
  bike: Bike,
  code: Code2,
  cpu: Cpu,
  trophy: Trophy,
};

export function ExtraCurricular() {
  return (
    <section
      id="beyond"
      className="relative border-t border-border bg-[#030307] px-6 py-28 md:py-36"
      aria-labelledby="beyond-title"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-6">
          <MonoLabel>BEYOND CODE /</MonoLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="beyond-title"
            className="max-w-4xl font-display font-black leading-[0.9] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}
          >
            Beyond code
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {extraCurricular.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Trophy;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col bg-[#0A0718] p-6 transition-colors duration-500 hover:bg-[#0E0A1E]"
              >
                <span className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />

                <span className="flex h-11 w-11 items-center justify-center bg-primary/12 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-mono text-sm uppercase tracking-[0.15em] text-white">
                  {item.title}
                </h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                  {item.subtitle}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">
                  {item.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                  {item.stats.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] text-primary/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
