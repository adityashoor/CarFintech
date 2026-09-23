"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import { Parallax } from "./Parallax";

/**
 * Uncovers a photograph with clip-path while it settles from a slight zoom.
 * Put a `fill` <Image> inside and give the wrapper a size. The outer wrapper
 * is observed and never clipped itself.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  parallax = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left";
  parallax?: boolean;
}) {
  const from = direction === "up" ? "inset(100% 0% 0% 0%)" : "inset(0% 100% 0% 0%)";
  const clipVariants = { hidden: { clipPath: from }, visible: { clipPath: "inset(0% 0% 0% 0%)" } };
  const zoomVariants = { hidden: { scale: 1.15 }, visible: { scale: 1 } };
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className={cn("relative overflow-hidden", className)}>
      <motion.div variants={clipVariants} transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay }} className="absolute inset-0">
        <motion.div variants={zoomVariants} transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay }} className="absolute inset-0">
          {parallax ? <Parallax amount={8}>{children}</Parallax> : children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
