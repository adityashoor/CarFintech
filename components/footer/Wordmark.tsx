"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Oversized, barely-there wordmark that drifts up as the footer comes into view. */
export function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} aria-hidden className="pointer-events-none select-none overflow-hidden">
      <motion.p
        style={{ y: reduce ? 0 : y, opacity: reduce ? 1 : opacity }}
        className="container-x -mb-[0.22em] whitespace-nowrap font-heading text-[clamp(4rem,14vw,15rem)] font-bold leading-none tracking-tight text-white/[0.045]"
      >
        Car Fintech
      </motion.p>
    </div>
  );
}
