"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { HackerText } from "@/components/ui/hacker-text";
import { useMatrixIlluminate } from "@/components/ui/matrix-illuminate";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const TECH_TREE: { title: string; items: string[] }[] = [
  { title: "WEB/", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind"] },
  { title: "BACKEND/", items: ["Node", "Express", "FastAPI"] },
  { title: "AI/", items: ["OpenAI", "LangChain", "Sentence Transformers"] },
  { title: "DATA/", items: ["MongoDB", "MySQL", "Redis"] },
  { title: "LANG/", items: ["C", "C++", "Java"] },
  { title: "TOOLS/", items: ["Git", "GitHub", "Docker", "Postman", "Vercel"] },
];

const SOCIALS = [
  { label: "LinkedIn", href: personalInfo.linkedin, Icon: LinkedinIcon },
  { label: "GitHub", href: personalInfo.github, Icon: GitBranch },
  { label: "Instagram", href: personalInfo.instagram, Icon: InstagramIcon },
].filter((s) => s.href);

/** Sui-style pyramid text mosaic for the footer payoff. */
const PAYOFF_LINES = [
  { text: "//", opacity: 0.35, size: "0.65rem" },
  { text: "DHRUV //", opacity: 0.42, size: "0.72rem" },
  { text: "SAXENA // DHRUV //", opacity: 0.48, size: "0.78rem" },
  { text: "DHRUV SAXENA // SAXENA //", opacity: 0.55, size: "0.85rem" },
  { text: "SAXENA // DHRUV // SAXENA // DHRUV //", opacity: 0.62, size: "0.92rem" },
  { text: "DHRUV // SAXENA // DHRUV SAXENA // SAXENA //", opacity: 0.7, size: "1rem" },
  { text: "SAXENA // DHRUV // SAXENA // DHRUV SAXENA // DHRUV //", opacity: 0.78, size: "1.05rem" },
  { text: "DHRUV SAXENA // SAXENA // DHRUV // SAXENA // DHRUV //", opacity: 0.85, size: "1.1rem" },
  { text: "SAXENA // DHRUV // SAXENA // DHRUV // SAXENA // DHRUV SAXENA //", opacity: 0.92, size: "1.15rem" },
  { text: "DHRUV // SAXENA // DHRUV SAXENA // SAXENA // DHRUV // SAXENA //", opacity: 1, size: "1.2rem" },
];

function FooterPayoff() {
  const lit = useMatrixIlluminate(PAYOFF_LINES.length, {
    tickMs: 120,
    minBurst: 1,
    maxBurst: 3,
    minHold: 200,
    maxHold: 500,
  });

  return (
    <div className="relative z-10 flex flex-col items-center px-6 pb-6 pt-4">
      {PAYOFF_LINES.map((line, i) => {
        const isLit = lit.has(i);
        return (
          <p
            key={i}
            className="whitespace-nowrap font-mono uppercase tracking-[0.12em] transition-all duration-500"
            style={{
              fontSize: line.size,
              color: isLit ? "#E9D5FF" : `rgba(192,132,252,${line.opacity})`,
              textShadow: isLit
                ? "0 0 8px rgba(192,132,252,0.7), 0 0 20px rgba(168,85,247,0.4)"
                : "0 0 4px rgba(192,132,252,0.12)",
            }}
          >
            <HackerText duration={1.25} disabledOnMobile={false}>
              {line.text}
            </HackerText>
          </p>
        );
      })}
    </div>
  );
}


export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="noise-overlay relative overflow-hidden border-t border-border bg-[#030307]">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 md:pt-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {TECH_TREE.map((group) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-primary">
                <HackerText duration={1.2}>{group.title}</HackerText>
              </h4>
              <ul className="space-y-2">
                {group.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-2 font-mono text-sm text-white/45"
                  >
                    <span className="inline-block h-2 w-2 shrink-0 border-b border-l border-primary/50" />
                    <HackerText
                      duration={1.2}
                      className="text-white/45 hover:text-white"
                    >
                      {it}
                    </HackerText>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-16 flex max-w-7xl flex-col gap-6 px-6 md:mt-20 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-black tracking-tight text-white md:text-2xl">
            <HackerText duration={1.25}>DHRUV SAXENA</HackerText>
          </p>
          <p className="mt-1 font-mono text-xs text-white/40">
            © {year} · AI Engineer / Full Stack Developer · Jaipur, India
          </p>
        </div>
        <div className="flex gap-3">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex h-11 w-11 items-center justify-center border border-border text-white/55 transition-all duration-300 hover:border-primary/40 hover:text-primary"
            >
              <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            </a>
          ))}
        </div>
      </div>

      <FooterPayoff />
    </footer>
  );
}
