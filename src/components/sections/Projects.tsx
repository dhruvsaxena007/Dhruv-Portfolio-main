"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GitBranch, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Reveal, MonoLabel } from "@/components/ui/reveal";

type ProjectWithImages = Project & { images?: string[] };

const AUTOPLAY_MS = 2000;
const SWIPE_THRESHOLD = 40;

function getProjectImages(project: ProjectWithImages): string[] {
  const fromArray = Array.isArray(project.images) ? project.images : [];
  const fallback = project.image ? [project.image] : [];
  const unique = new Set<string>();
  for (const src of [...fromArray, ...fallback]) {
    if (src) unique.add(src);
  }
  return [...unique];
}

const ProjectCarousel = React.memo(function ProjectCarousel({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const touchStart = React.useRef<number | null>(null);

  const total = images.length;
  const hasMultiple = total > 1;

  const next = React.useCallback(() => {
    if (!hasMultiple) return;
    setActive((prev) => (prev + 1) % total);
  }, [hasMultiple, total]);

  const prev = React.useCallback(() => {
    if (!hasMultiple) return;
    setActive((prev) => (prev - 1 + total) % total);
  }, [hasMultiple, total]);

  React.useEffect(() => {
    if (!hasMultiple || hovered || touched) return;
    const id = setInterval(() => {
      requestAnimationFrame(() => {
        setActive((prev) => (prev + 1) % total);
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [hasMultiple, hovered, touched, total]);

  React.useEffect(() => {
    if (!hasMultiple) return;
    const nextIndex = (active + 1) % total;
    const img = new Image();
    img.src = images[nextIndex];
  }, [active, hasMultiple, images, total]);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStart.current = e.touches[0]?.clientX ?? null;
    setTouched(true);
  };
  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart.current === null) {
      setTouched(false);
      return;
    }
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStart.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) next();
      else prev();
    }
    touchStart.current = null;
    setTouched(false);
  };

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden border-b border-border bg-[#05050B]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
      tabIndex={0}
      aria-label={`${title} screenshots carousel`}
    >
      {images.map((src, idx) => (
        <img
          key={`${src}-${idx}`}
          src={src}
          alt={`${title} screenshot ${idx + 1}`}
          loading={idx === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            idx === active ? "opacity-100" : "opacity-0"
          }`}
          draggable={false}
        />
      ))}

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous screenshot"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 text-white/85 opacity-0 backdrop-blur-md transition-opacity duration-300 hover:bg-white/20 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next screenshot"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 text-white/85 opacity-0 backdrop-blur-md transition-opacity duration-300 hover:bg-white/20 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to screenshot ${idx + 1}`}
                onClick={() => setActive(idx)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  idx === active ? "w-4 bg-white" : "bg-white/45 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
});

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const imageList = React.useMemo(
    () => getProjectImages(project as ProjectWithImages),
    [project]
  );
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col border border-border bg-[#0A0718] shadow-[0_6px_18px_rgba(0,0,0,0.22)] transition-all duration-500 hover:border-primary/45 hover:shadow-[0_16px_40px_rgba(124,58,237,0.25)]"
    >
      {/* border trace */}
      <span className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />

      {/* header row: category + external */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {project.category}
        </span>
        {project.featured && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
            Featured
          </span>
        )}
      </div>

      <div className="transition-transform duration-500 group-hover:scale-[1.03]">
        <ProjectCarousel images={imageList} title={project.name} />
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-6 transition-transform duration-500 group-hover:-translate-y-1">
        <h3 className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-primary md:text-2xl">
          {project.name}
        </h3>
        <p className="mt-3 leading-relaxed text-white/70">{project.description}</p>

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
        <div className="mt-6 flex items-center gap-3 border-t border-border pt-5 transition-all duration-500 group-hover:pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/75 transition-all duration-300 hover:text-white"
            >
              <span className="flex h-6 w-6 items-center justify-center bg-primary/15 text-primary transition-all duration-300 group-hover/cta:scale-105 group-hover/cta:bg-primary group-hover/cta:text-white">
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
              className="group/cta inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/75 transition-all duration-300 hover:text-white"
            >
              <span className="flex h-6 w-6 items-center justify-center bg-primary/15 text-primary transition-all duration-300 group-hover/cta:scale-105 group-hover/cta:bg-primary group-hover/cta:text-white">
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
