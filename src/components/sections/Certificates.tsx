"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, ExternalLink } from "lucide-react";
import { certificates, type Certificate } from "@/data/certificates";
import { Reveal, MonoLabel } from "@/components/ui/reveal";

const SWIPE_THRESHOLD = 48;

export function Certificates() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = React.useState(
    () => certificates[0]?.id ?? ""
  );
  const trackRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const touchStart = React.useRef<number | null>(null);
  const isProgrammaticScroll = React.useRef(false);
  const total = certificates.length;

  const activeIndex = React.useMemo(() => {
    const idx = certificates.findIndex((c) => c.id === activeId);
    return idx >= 0 ? idx : 0;
  }, [activeId]);

  const current = certificates[activeIndex] ?? null;

  const goToId = React.useCallback((id: string) => {
    if (!certificates.some((c) => c.id === id)) return;
    setActiveId(id);
  }, []);

  const goToIndex = React.useCallback(
    (index: number) => {
      if (total === 0) return;
      const next = ((index % total) + total) % total;
      setActiveId(certificates[next].id);
    },
    [total]
  );

  const next = React.useCallback(
    () => goToIndex(activeIndex + 1),
    [activeIndex, goToIndex]
  );
  const prev = React.useCallback(
    () => goToIndex(activeIndex - 1),
    [activeIndex, goToIndex]
  );

  // Keep carousel visually synced to activeId without scrollIntoView page jumps
  React.useEffect(() => {
    const track = trackRef.current;
    const card = cardRefs.current.get(activeId);
    if (!track || !card) return;

    const target =
      card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    const max = track.scrollWidth - track.clientWidth;
    const left = Math.max(0, Math.min(target, max));

    isProgrammaticScroll.current = true;
    track.scrollTo({
      left,
      behavior: reduce ? "auto" : "smooth",
    });

    const clear = window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, reduce ? 50 : 420);

    return () => window.clearTimeout(clear);
  }, [activeId, reduce]);

  // Sync active state when user freely scrolls / snaps the track
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track || total === 0) return;

    const pickNearest = () => {
      if (isProgrammaticScroll.current) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let bestId = activeId;
      let bestDist = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((el, id) => {
        const cardCenter = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = id;
        }
      });

      if (bestId && bestId !== activeId) setActiveId(bestId);
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pickNearest);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [activeId, total]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStart.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) next();
      else prev();
    }
    touchStart.current = null;
  };

  if (total === 0) {
    return (
      <section
        id="achievements"
        className="relative overflow-x-clip border-t border-border bg-[#030307] px-5 py-24 sm:px-6 md:py-40"
        aria-labelledby="achievements-title"
      >
        <div className="mx-auto max-w-7xl">
          <MonoLabel>ACHIEVEMENTS & CERTIFICATES /</MonoLabel>
          <h2
            id="achievements-title"
            className="mt-6 font-display font-black text-white"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}
          >
            Achievements & Certificates
          </h2>
          <p className="mt-6 max-w-xl text-white/50">
            Certificate assets will appear here once entries are added to{" "}
            <code className="text-primary">src/data/certificates.ts</code>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="achievements"
      className="relative overflow-x-clip border-t border-border bg-[#030307] px-5 py-24 sm:px-6 md:py-40"
      aria-labelledby="achievements-title"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_70%_40%,rgba(168,85,247,0.08),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mb-6">
          <MonoLabel>ACHIEVEMENTS & CERTIFICATES /</MonoLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="achievements-title"
            className="max-w-4xl font-display font-black leading-[0.9] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)" }}
          >
            Achievements & Certificates
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-base text-white/50 sm:mt-6 sm:text-lg">
            Verified courses, job simulations, and certifications — browse each
            credential with full detail.
          </p>
        </Reveal>

        {/*
          Below lg: carousel only (info panel fully removed — not stacked).
          lg+: two-column layout with sticky info panel + carousel.
        */}
        <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-[minmax(260px,0.9fr)_minmax(0,1.4fr)] lg:items-start lg:gap-10 xl:gap-12">
          {/* Info panel — desktop / wide tablet only */}
          <Reveal delay={0.08} className="mb-0 hidden min-w-0 lg:block">
            <div className="sticky top-28 border border-border bg-[#0A0718] p-6 md:p-8">
              <AnimatePresence mode="wait">
                {current && (
                  <motion.div
                    key={current.id}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
                      {current.category}
                    </p>
                    <h3 className="mt-4 break-words font-display text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
                      {current.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.16em] text-white/45">
                      <span>{current.issuer}</span>
                      <span className="text-primary/60">·</span>
                      <span>{current.year}</span>
                    </div>

                    <p className="mt-6 text-sm leading-relaxed text-white/65 md:text-[15px]">
                      {current.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {current.technologies.map((tech) => (
                        <span
                          key={`${current.id}-${tech}`}
                          className="border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {current.credentialId && (
                      <p className="mt-6 break-all font-mono text-[11px] tracking-wide text-white/35">
                        Credential ID:{" "}
                        <span className="text-white/55">
                          {current.credentialId}
                        </span>
                      </p>
                    )}

                    {current.credentialUrl && (
                      <a
                        href={current.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:text-white"
                      >
                        Verify credential
                        <ExternalLink size={13} />
                      </a>
                    )}

                    <div className="mt-8 border-t border-border pt-6">
                      <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
                        <Award size={13} className="text-primary" />
                        Major Highlights
                      </p>
                      <ul className="space-y-2.5">
                        {current.highlights.map((item) => (
                          <li
                            key={`${current.id}-${item}`}
                            className="flex gap-3 text-sm leading-relaxed text-white/70"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(total).padStart(2, "0")}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Carousel — full width below lg */}
          <Reveal delay={0.12} className="min-w-0 max-w-full">
            <div className="min-w-0 max-w-full overflow-hidden">
              <div
                ref={trackRef}
                className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-3 sm:gap-4 md:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                role="list"
                aria-label="Certificate carousel"
              >
                {certificates.map((cert) => (
                  <CertificateCard
                    key={cert.id}
                    cert={cert}
                    active={cert.id === activeId}
                    onSelect={() => goToId(cert.id)}
                    setRef={(el) => {
                      if (el) cardRefs.current.set(cert.id, el);
                      else cardRefs.current.delete(cert.id);
                    }}
                  />
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 sm:mt-6">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous certificate"
                    className="flex h-12 w-12 items-center justify-center border border-border bg-[#0A0718] text-white/70 transition-colors hover:border-primary/50 hover:text-primary sm:h-11 sm:w-11"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next certificate"
                    className="flex h-12 w-12 items-center justify-center border border-border bg-[#0A0718] text-white/70 transition-colors hover:border-primary/50 hover:text-primary sm:h-11 sm:w-11"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35 lg:hidden">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </p>

                <div className="hidden max-w-[60%] flex-wrap justify-end gap-1.5 sm:flex">
                  {certificates.map((cert) => (
                    <button
                      key={cert.id}
                      type="button"
                      aria-label={`Go to ${cert.title}`}
                      aria-current={cert.id === activeId ? "true" : undefined}
                      onClick={() => goToId(cert.id)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        cert.id === activeId
                          ? "w-5 bg-primary"
                          : "w-1.5 bg-white/25 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CertificateCard({
  cert,
  active,
  onSelect,
  setRef,
}: {
  cert: Certificate;
  active: boolean;
  onSelect: () => void;
  setRef: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      type="button"
      role="listitem"
      ref={setRef}
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
      className={`group/card relative w-[92%] max-w-[520px] shrink-0 snap-center border text-left transition-all duration-300 sm:w-[80%] md:w-[70%] lg:w-[68%] lg:max-w-[420px] ${
        active
          ? "border-primary/55 bg-[#0C0818] shadow-[0_12px_36px_rgba(124,58,237,0.22)]"
          : "border-border bg-[#08060F] opacity-75 hover:opacity-100"
      }`}
    >
      <div className="flex h-[220px] items-center justify-center bg-[#05050B] p-3 sm:h-[260px] sm:p-4 md:h-[300px] lg:h-[290px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cert.image}
          alt={`${cert.title} certificate`}
          loading={active ? "eager" : "lazy"}
          className="max-h-full max-w-full object-contain"
          draggable={false}
        />
      </div>

      <div className="border-t border-border px-3.5 py-3.5 sm:px-4 sm:py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">
          {cert.category}
        </p>
        <h4 className="mt-2 line-clamp-2 font-display text-[15px] font-semibold text-white sm:text-base">
          {cert.title}
        </h4>
        <ul className="mt-3 space-y-1.5">
          {cert.highlights.slice(0, 3).map((h) => (
            <li
              key={`${cert.id}-${h}`}
              className="flex gap-2 font-mono text-[11px] leading-relaxed text-white/50"
            >
              <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-primary/70" />
              <span className="line-clamp-1">{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}
