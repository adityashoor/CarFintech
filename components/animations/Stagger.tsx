"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/utils";

const container = {
  hidden: {},
  visible: (stagger: number) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

/** Parent observed once; children inherit the variants and cascade in. */
export function Stagger({ children, className, stagger = 0.08, amount = 0.15 }: { children: ReactNode; className?: string; stagger?: number; amount?: number }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount }} variants={container} custom={stagger} className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}
