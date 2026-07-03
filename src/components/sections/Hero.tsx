"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { MonoLabel } from "@/components/ui/reveal";
import { HackerText } from "@/components/ui/hacker-text";

const EASE = [0.22, 1, 0.36, 1] as const;

function BlurWord({ children, delay }: { children: string; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="inline-block"
      initial={
        reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(20px)", y: 16 }
      }
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 1.0, delay, ease: EASE }}
      style={{ willChange: "filter, transform, opacity" }}
    >
      <HackerText duration={1.3} className="cursor-default">
        {children}
      </HackerText>
    </motion.span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-20 md:pt-24"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 bg-[#030307]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(168,85,247,0.16),transparent_70%)]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center pb-20 text-center md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <MonoLabel>AI ENGINEER / FULL STACK DEVELOPER</MonoLabel>
        </motion.div>

        <h1
          id="hero-title"
          className="max-w-full font-display font-black uppercase leading-[0.9] tracking-[-0.02em] text-white"
          style={{ fontSize: "clamp(2.25rem, 9vw, 6.5rem)" }}
        >
          <span className="block">
            <BlurWord delay={0.25}>DHRUV</BlurWord>
          </span>
          <span className="block">
            <BlurWord delay={0.45}>SAXENA</BlurWord>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          className="mx-auto mt-8 max-w-2xl space-y-1.5"
        >
          {personalInfo.heroLines.map((line, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "text-base font-medium text-white md:text-lg"
                  : "text-sm leading-relaxed text-white/55 md:text-base"
              }
            >
              {line}
            </p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
          className="mt-10"
        >
          <a
            href={personalInfo.resumeUrl}
            download
            className="group relative inline-flex items-center gap-3 bg-primary px-8 py-3.5 font-mono text-sm uppercase tracking-widest text-white transition-all duration-300 hover:bg-primary/90"
          >
            <span className="absolute inset-0 bg-primary opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-60" />
            <span className="relative">DOWNLOAD RESUME</span>
            <ArrowDown
              size={16}
              className="relative transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>
        </motion.div>

        <motion.div
          className="mt-14 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
            Scroll
          </span>
          <div className="relative h-10 w-px overflow-hidden bg-white/10">
            <motion.span
              className="absolute left-0 top-0 h-4 w-px bg-primary"
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
