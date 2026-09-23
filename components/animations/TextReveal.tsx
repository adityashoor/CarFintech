"use client";

import { motion } from "motion/react";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

const lineVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1 },
};

type Tag = "h1" | "h2" | "h3" | "p" | "div";

interface Props {
  /** One entry per visual line. */
  lines: string[];
  as?: Tag;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  mode?: "inView" | "controlled";
  visible?: boolean;
  once?: boolean;
}

/**
 * Line-by-line mask reveal. The heading element is the one observed; the
 * lines only carry variants (a translated line sits outside its clipped box,
 * so observing it directly would never fire).
 */
export function TextReveal({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  mode = "inView",
  visible = false,
  once = true,
}: Props) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(mode === "inView" ? { whileInView: "visible", viewport: { once, amount: 0.3 } } : { animate: visible ? "visible" : "hidden" })}
    >
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((line, i) => (
        <span key={i} aria-hidden className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <motion.span
            className={cn("block will-change-transform", lineClassName)}
            variants={lineVariants}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
