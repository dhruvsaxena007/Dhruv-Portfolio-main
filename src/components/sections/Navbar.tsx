"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/data/personal";
import { HackerText } from "@/components/ui/hacker-text";

const NAV = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

const SECTION_IDS = ["about", "work", "experience", "contact"];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border bg-[#050510]/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20"
          aria-label="Main navigation"
        >
          <a href="#top" className="font-display text-lg font-black tracking-tight text-white md:text-xl">
            <HackerText duration={1.15}>DHRUV SAXENA</HackerText>
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {NAV.map((item) => (
              <div key={item.label} className="relative">
                <HackerText
                  href={item.href}
                  duration={1.15}
                  className={cn(
                    "font-mono text-xs uppercase tracking-[0.2em] transition-colors",
                    active === item.href.slice(1)
                      ? "text-white"
                      : "text-white/50 hover:text-white"
                  )}
                  aria-label={item.label}
                >
                  {item.label}
                </HackerText>
                {active === item.href.slice(1) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-2 left-0 h-px w-full bg-primary"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </div>
            ))}
          </div>

          <a
            href={personalInfo.resumeUrl}
            download
            className="hidden bg-primary px-5 py-2 font-mono text-xs uppercase tracking-widest text-white transition-all duration-300 hover:bg-primary/90 md:inline-block"
          >
            <HackerText duration={1.15}>RESUME</HackerText>
          </a>

          <button
            className="p-2 text-white/70 transition-colors hover:text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </motion.header>

      <motion.div
        className="fixed inset-0 z-40 bg-[#030307]/97 backdrop-blur-lg md:hidden"
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex h-full flex-col items-center justify-center gap-10">
          {[...NAV, { label: "RESUME", href: personalInfo.resumeUrl }].map(
            (item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-bold tracking-tight text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: open ? 0.05 * i : 0 }}
              >
                {item.label}
              </motion.a>
            )
          )}
        </div>
      </motion.div>
    </>
  );
}
