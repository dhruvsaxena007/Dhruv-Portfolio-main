"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GitBranch, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Reveal, MonoLabel } from "@/components/ui/reveal";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col border border-border bg-[#0A0718] transition-colors duration-500 hover:border-border-strong"
    >
      {/* border trace */}
      <span className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />

      {/* header row: number + category + external */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-primary">
            {String(project.id).padStart(2, "0")}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {project.category}
          </span>
        </div>
        {project.featured && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
            Featured
          </span>
        )}
      </div>

      {/* image reveal area */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-[#07040F]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12),transparent_70%)]" />
        <span className="absolute inset-0 flex items-center justify-center font-display text-7xl font-black text-white/[0.04]">
          {String(project.id).padStart(2, "0")}
        </span>
        {project.image && (
          <img
            src={project.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-25"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        )}
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-primary md:text-2xl">
          {project.name}
        </h3>
        <p className="mt-3 leading-relaxed text-white/60">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 6).map((t) => (
            <span
              key={t}
              className="border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-white"
            >
              <span className="flex h-6 w-6 items-center justify-center bg-primary/15 text-primary transition-colors group-hover/cta:bg-primary group-hover/cta:text-white">
                <GitBranch size={13} />
              </span>
              Code
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-white"
            >
              <span className="flex h-6 w-6 items-center justify-center bg-primary/15 text-primary transition-colors group-hover/cta:bg-primary group-hover/cta:text-white">
                <ArrowUpRight size={13} />
              </span>
              Live
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section
      id="work"
      className="relative border-t border-border bg-[#030307] px-6 py-28 md:py-40"
      aria-labelledby="projects-title"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-6">
          <MonoLabel>WORK /</MonoLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="projects-title"
            className="max-w-4xl font-display font-black leading-[0.9] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}
          >
            Selected work
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-white/50">
            Production applications, AI systems and experiments — built end to end.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
