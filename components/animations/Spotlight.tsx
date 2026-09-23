"use client";

import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card whose highlight follows the pointer via --mx/--my (CSS: .spotlight and
 * .glow-border in globals.css). Pure CSS after the pointer position is set.
 */
export function Spotlight({
  children,
  className,
  as: Tag = "div",
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "a";
  glow?: boolean;
}) {
  function onMouseMove(e: MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <Tag onMouseMove={onMouseMove} className={cn(glow ? "glow-border" : "spotlight", className)}>
      {children}
    </Tag>
  );
}
