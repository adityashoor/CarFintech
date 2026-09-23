"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Slow vertical drift tied to scroll position. `amount` is a percentage of the element height. */
export function Parallax({ children, amount = 10, className }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={className ?? "relative h-full w-full"}>
      <motion.div style={{ y: reduce ? 0 : y }} className="relative h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
