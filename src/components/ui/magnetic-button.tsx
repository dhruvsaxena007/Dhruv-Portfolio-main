"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  as?: React.ElementType;
  href?: string;
  download?: boolean;
  disabled?: boolean;
  className?: string;
  onMouseMove?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  onMouseLeave?: () => void;
  whileTap?: { scale?: number } | string;
  whileHover?: { scale?: number } | string;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

export function MagneticButton({
  children,
  as: Component = "button",
  href,
  download,
  disabled,
  className,
  onMouseMove,
  onMouseLeave,
  whileTap = { scale: 0.96 },
  whileHover = { scale: 1.02 },
  type = "button",
  style,
}: MagneticButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const anchorRef = React.useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const isAnchor = typeof Component === "string" && Component === "a";

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const currentRef = isAnchor ? anchorRef : buttonRef;
    if (!currentRef.current) return;
    const rect = currentRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
    onMouseMove?.(e);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    onMouseLeave?.();
  };

  const baseClassName = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25",
    className
  );

  const commonProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: "transform 0.3s ease-out",
      ...style,
    },
    whileTap,
    whileHover,
    disabled,
  };

  if (isAnchor) {
    return (
      <motion.a
        ref={anchorRef}
        {...commonProps}
        href={href}
        download={download}
        className={baseClassName}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      {...commonProps}
      className={baseClassName}
      type={type}
    >
      {children}
    </motion.button>
  );
}