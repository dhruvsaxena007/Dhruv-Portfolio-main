"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Sui-style fast random text illumination.
 * Multiple segments flash independently with short, staggered durations.
 */
export function useMatrixIlluminate(
  cellCount: number,
  opts?: {
    tickMs?: number;
    minBurst?: number;
    maxBurst?: number;
    minHold?: number;
    maxHold?: number;
  }
) {
  const reduce = useReducedMotion();
  const {
    tickMs = 95,
    minBurst = 4,
    maxBurst = 14,
    minHold = 140,
    maxHold = 420,
  } = opts ?? {};

  const [lit, setLit] = React.useState<ReadonlySet<number>>(() => new Set());
  const expiryRef = React.useRef<Map<number, number>>(new Map());

  React.useEffect(() => {
    if (reduce || cellCount < 1) return;

    const id = setInterval(() => {
      const now = performance.now();
      const map = expiryRef.current;

      for (const [idx, exp] of [...map.entries()]) {
        if (exp <= now) map.delete(idx);
      }

      const n =
        minBurst + Math.floor(Math.random() * (maxBurst - minBurst + 1));
      for (let i = 0; i < n; i++) {
        const idx = Math.floor(Math.random() * cellCount);
        const hold = minHold + Math.random() * (maxHold - minHold);
        map.set(idx, now + hold);
      }

      setLit(new Set(map.keys()));
    }, tickMs);

    return () => {
      clearInterval(id);
      expiryRef.current.clear();
      setLit(new Set());
    };
  }, [reduce, cellCount, tickMs, minBurst, maxBurst, minHold, maxHold]);

  return lit;
}
