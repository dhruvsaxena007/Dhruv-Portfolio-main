"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\_-#";
const DEFAULT_DURATION = 1.35;

export interface HackerTextProps {
  children: string;
  className?: string;
  duration?: number;
  glowColor?: string;
  scrambleCharset?: string;
  disabledOnMobile?: boolean;
  as?: React.ElementType;
  href?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

function randChar(charset: string) {
  return charset[Math.floor(Math.random() * charset.length)];
}

/**
 * Premium hacker text: on hover the letters scramble and resolve, the text
 * lifts slightly, letter-spacing widens, and a purple glow fades in.
 * Custom rAF logic — no heavy libraries. Cleans up on unmount.
 */
export function HackerText({
  children,
  className,
  duration = DEFAULT_DURATION,
  glowColor = "#C084FC",
  scrambleCharset = DEFAULT_CHARSET,
  disabledOnMobile = true,
  as: Component = "span",
  href,
  onClick,
  "aria-label": ariaLabel,
}: HackerTextProps) {
  const text = children;
  const [display, setDisplay] = React.useState(text);
  const [hovered, setHovered] = React.useState(false);
  const [isTouch, setIsTouch] = React.useState(false);
  const reduce = useReducedMotion();

  const rafRef = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  React.useEffect(() => setDisplay(text), [text]);

  const run = React.useCallback(
    (reveal: boolean) => {
      if (reduce) {
        setDisplay(text);
        return;
      }
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
      const start = performance.now();
      const total = duration * 1000;

      const tick = (now: number) => {
        const p = Math.min((now - start) / total, 1);
        const eased = 1 - Math.pow(1 - p, 2.2);
        // reveal: settle left->right. un-reveal: scramble more over time.
        const settled = reveal ? eased : 1 - eased;
        const out = text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            return i / text.length < settled ? ch : randChar(scrambleCharset);
          })
          .join("");
        setDisplay(out);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplay(reveal ? text : text);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [duration, reduce, scrambleCharset, text]
  );

  const disabled = disabledOnMobile && isTouch;

  const enter = React.useCallback(() => {
    if (disabled) return;
    setHovered(true);
    run(true);
  }, [disabled, run]);

  const leave = React.useCallback(() => {
    if (disabled) return;
    setHovered(false);
    run(true); // resolve back cleanly to the real text
  }, [disabled, run]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const style: React.CSSProperties = {
    display: "inline-block",
    cursor: disabled ? "inherit" : "pointer",
    transition:
      "text-shadow 0.4s cubic-bezier(.25,.46,.45,.94), letter-spacing 0.3s cubic-bezier(.25,.46,.45,.94), transform 0.3s cubic-bezier(.25,.46,.45,.94), filter 0.3s ease, color 0.3s ease",
    letterSpacing: hovered ? "0.08em" : undefined,
    transform: hovered ? "translateY(-2px)" : undefined,
    filter: hovered ? "blur(0px)" : undefined,
    textShadow: hovered
      ? `0 0 8px ${glowColor}, 0 0 16px ${glowColor}59, 0 0 32px ${glowColor}26`
      : undefined,
    willChange: "transform, letter-spacing, text-shadow",
  };

  const common = {
    className: cn("relative", className),
    style,
    onMouseEnter: enter,
    onMouseLeave: leave,
    onFocus: enter,
    onBlur: leave,
    onClick,
    "aria-label": ariaLabel || text,
  };

  if (href) {
    return (
      <a href={href} {...common}>
        {display}
      </a>
    );
  }

  return <Component {...common}>{display}</Component>;
}

/** Alias requested in the brief: <DHackerText>DHRUV SAXENA</DHackerText> */
export const DHackerText = HackerText;
