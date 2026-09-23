"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-scrubbed statement: each word brightens from muted to ink as the
 * paragraph passes through the middle of the viewport (21st.dev "text reveal
 * on scroll"). Reads as a single sentence to assistive tech.
 */
export function ScrollTextReveal({ text, className, as: Tag = "p", tone = "dark" }: { text: string; className?: string; as?: "p" | "h2" | "h3"; tone?: "dark" | "light" }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  const MotionTag = motion[Tag];
  return (
    <MotionTag ref={ref as never} className={cn("flex flex-wrap", className)} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} reduce={!!reduce} tone={tone} />
      ))}
    </MotionTag>
  );
}

function Word({ word, progress, range, reduce, tone }: { word: string; progress: MotionValue<number>; range: [number, number]; reduce: boolean; tone: "dark" | "light" }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span aria-hidden className="relative mr-[0.28em] mt-[0.1em]">
      <span className={cn("absolute inset-0", tone === "light" ? "text-white" : "text-ink")} style={{ opacity: 0.18 }}>
        {word}
      </span>
      <motion.span style={{ opacity: reduce ? 1 : opacity }} className={tone === "light" ? "text-white" : "text-ink"}>
        {word}
      </motion.span>
    </span>
  );
}
