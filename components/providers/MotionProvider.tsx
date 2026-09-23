"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Drops transform/layout animations (keeps opacity) when the OS asks for reduced motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
