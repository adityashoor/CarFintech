"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/utils";

/** 21st.dev-style blur-fade: elements settle in from a soft blur. */
export function BlurFade({
  children,
  className,
  delay = 0,
  y = 16,
  inView = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  inView?: boolean;
}) {
  const visible = { opacity: 1, y: 0, filter: "blur(0px)" };
  const hidden = { opacity: 0, y, filter: "blur(8px)" };
  return (
    <motion.div
      initial={hidden}
      {...(inView ? { whileInView: visible, viewport: { once: true, amount: 0.2 } } : { animate: visible })}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
