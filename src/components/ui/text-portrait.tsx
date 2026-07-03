"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  PORTRAIT_LINES,
  PORTRAIT_COLS,
  PORTRAIT_ROWS,
  PORTRAIT_PATTERNS,
} from "./portrait-data";
import { useMatrixIlluminate } from "./matrix-illuminate";

const TONES = ["#A78BFA", "#C084FC", "#F8F5FF"] as const;
const CELL_W = 40;
const CELL_H = 35;
const ROW_GAP = 1;
const VIEW_W = PORTRAIT_COLS * CELL_W;
const VIEW_H = PORTRAIT_ROWS * (CELL_H + ROW_GAP);

interface TextPortraitProps {
  className?: string;
  intensity?: number;
  animate?: boolean;
  delay?: number;
}

function PortraitSvg({ intensity, animate }: { intensity: number; animate: boolean }) {
  const reduce = useReducedMotion();
  const lit = useMatrixIlluminate(PORTRAIT_LINES.length, {
    tickMs: 110,
    minBurst: 2,
    maxBurst: 6,
    minHold: 120,
    maxHold: 320,
  });

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Text portrait of Dhruv Saxena composed from DHRUV, SAXENA and //"
      className="block h-full w-full overflow-visible"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <defs>
        {PORTRAIT_LINES.map((line, i) => {
          const x = line.c0 * CELL_W;
          const y = line.r * (CELL_H + ROW_GAP);
          const w = (line.c1 - line.c0 + 1) * CELL_W;
          return (
            <clipPath key={`clip-${i}`} id={`pr-${i}`}>
              <rect x={x} y={y} width={w} height={CELL_H} />
            </clipPath>
          );
        })}
      </defs>

      {PORTRAIT_LINES.map((line, i) => {
        const isLit = animate && !reduce && lit.has(i);
        const x = line.c0 * CELL_W;
        const y = line.r * (CELL_H + ROW_GAP) + CELL_H * 0.84;
        const fill = TONES[line.tone];
        const baseOp = Math.min(1, line.o * intensity);
        const op = isLit ? Math.min(1, baseOp + 0.06) : baseOp;
        const fs = CELL_H * line.s;
        const pattern = PORTRAIT_PATTERNS[line.p] ?? PORTRAIT_PATTERNS[0];
        const spanW = (line.c1 - line.c0 + 1) * CELL_W;
        const charW = fs * 0.54;
        const reps = Math.ceil(spanW / (pattern.length * charW)) + 1;
        const text = pattern.repeat(reps);

        return (
          <text
            key={i}
            x={x}
            y={y}
            clipPath={`url(#pr-${i})`}
            fill={fill}
            fillOpacity={op}
            style={{
              fontFamily:
                'var(--font-jetbrains-mono), "JetBrains Mono", monospace',
              fontSize: fs,
              fontWeight: line.w,
              letterSpacing: "0.05em",
              transition: isLit ? "fill-opacity 0.14s ease-out" : "fill-opacity 0.35s ease-out",
              filter: isLit
                ? "drop-shadow(0 0 5px rgba(243,232,255,0.65))"
                : undefined,
            }}
          >
            {text}
          </text>
        );
      })}
    </svg>
  );
}

const MemoPortraitSvg = React.memo(PortraitSvg);

export function TextPortrait({
  className,
  intensity = 1,
  animate = true,
  delay = 0,
}: TextPortraitProps) {
  return (
    <motion.div
      className={cn("relative mx-auto w-full select-none", className)}
      style={{
        width: "min(96vw, 920px)",
        aspectRatio: `${VIEW_W} / ${VIEW_H}`,
        maxHeight: "85vh",
      }}
      initial={{ opacity: 0, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <MemoPortraitSvg intensity={intensity} animate={animate} />
    </motion.div>
  );
}

export function TextPortraitHero(props: TextPortraitProps) {
  return <TextPortrait {...props} />;
}
export function TextPortraitLarge(props: TextPortraitProps) {
  return <TextPortrait {...props} />;
}
export function TextPortraitCompact(props: TextPortraitProps) {
  return <TextPortrait intensity={0.94} {...props} />;
}
