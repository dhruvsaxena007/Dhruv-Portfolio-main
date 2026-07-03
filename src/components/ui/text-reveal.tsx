"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn, splitWords, splitLines } from "@/lib/utils";

interface TextRevealProps extends Omit<HTMLMotionProps<"p">, "children"> {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  splitBy?: "words" | "lines" | "chars";
}

export function TextReveal({
  as: Component = "p",
  children,
  className,
  delay = 0,
  stagger = 0.05,
  duration = 0.5,
  splitBy = "words",
  ...props
}: TextRevealProps) {
  const text = typeof children === "string" ? children : "";
  const [isInView, setIsInView] = React.useState(false);
  const ref = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getSplitText = () => {
    switch (splitBy) {
      case "words":
        return splitWords(text);
      case "lines":
        return splitLines(text);
      case "chars":
        return text.split("");
      default:
        return [text];
    }
  };

  const splitText = getSplitText();

  if (!isInView || splitText.length <= 1) {
    return (
      <Component ref={ref} className={cn("opacity-0", className)} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <Component ref={ref} className={cn("flex flex-wrap", className)} {...props}>
      {splitText.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration,
            delay: delay + index * stagger,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: "inline-block" }}
        >
          {word}{splitBy === "words" && " "}
        </motion.span>
      ))}
    </Component>
  );
}

interface LineRevealProps extends Omit<HTMLMotionProps<"span">, "children"> {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}

export function LineReveal({
  as: Component = "span",
  children,
  className,
  delay = 0,
  stagger = 0.1,
  duration = 0.7,
  ref: _ref,
  ...props
}: LineRevealProps) {
  const text = typeof children === "string" ? children : "";
  const lines = splitLines(text);
  const [isInView, setIsInView] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const componentRef = React.useRef<HTMLElement>(null);

  const { style, className: _className, ...restProps } = props as React.HTMLAttributes<HTMLDivElement>;

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (componentRef.current) observer.observe(componentRef.current);
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  if (!isInView || lines.length <= 1) {
    return (
      <Component ref={componentRef} className={cn("opacity-0 block", className)} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <div ref={wrapperRef} className={cn("overflow-hidden", className)} {...restProps}>
      {lines.map((line, index) => (
        <motion.span
          key={index}
          className="block"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration,
            delay: delay + index * stagger,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {line}
        </motion.span>
      ))}
    </div>
  );
}