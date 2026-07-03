"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { TextPortrait } from "@/components/ui/text-portrait";
import { MonoLabel } from "@/components/ui/reveal";

export function TextArt() {
  return (
    <section
      id="identity"
      className="relative overflow-hidden bg-[#030307] py-24 md:py-32"
      aria-label="Dhruv Saxena text portrait"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_50%_50%,rgba(168,85,247,0.10),transparent_70%)]" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex flex-col items-center gap-3 text-center"
        >
          <MonoLabel>IDENTITY / DHRUV SAXENA //</MonoLabel>
          <p className="max-w-md font-mono text-xs uppercase tracking-[0.25em] text-white/40">
            A portrait rendered entirely from DHRUV · SAXENA · //
          </p>
        </motion.div>

        <div className="flex w-full items-center justify-center">
          <TextPortrait animate delay={0.1} />
        </div>
      </div>
    </section>
  );
}
