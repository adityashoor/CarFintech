"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "outline-light" | "inverse" | "ghost" | "ghost-light";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-lg font-heading font-semibold tracking-tight transition-[background-color,color,border-color,box-shadow] duration-300 disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap";

const variants: Record<Variant, string> = {
  /** Brand blue (the original site's button colour). The one primary CTA. */
  primary: "bg-accent text-white hover:bg-accent-deep shadow-[0_8px_30px_-10px_rgb(113_128_147/0.55)]",
  dark: "bg-ink text-surface hover:bg-ink-3",
  /** For light sections. */
  outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-surface",
  /** For dark sections. */
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white hover:text-dark",
  inverse: "bg-white text-dark hover:bg-accent hover:text-white",
  ghost: "px-0 text-ink underline-offset-4 hover:underline",
  "ghost-light": "px-0 text-white underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  magnetic?: boolean;
  block?: boolean;
  className?: string;
  children: ReactNode;
}

type LinkButtonProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const MAX_X = 8;
const MAX_Y = 6;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", arrow = true, magnetic = true, block = false, className, children, ...rest } = props;

  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });
  const enabled = magnetic && !reduce && !variant.startsWith("ghost");

  function onMouseMove(e: MouseEvent<HTMLElement>) {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-MAX_X, Math.min(MAX_X, dx * 0.18)));
    y.set(Math.max(-MAX_Y, Math.min(MAX_Y, dy * 0.28)));
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = cn(base, variants[variant], !variant.startsWith("ghost") && sizes[size], block && "w-full", className);
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && <Arrow />}
    </>
  );

  return (
    <motion.span style={{ x: sx, y: sy }} className={block ? "block w-full" : "inline-block"} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {"href" in rest && typeof rest.href === "string" ? (
        <Link className={classes} {...(rest as LinkButtonProps)}>
          {content}
        </Link>
      ) : (
        <button type="button" className={classes} {...(rest as NativeButtonProps)}>
          {content}
        </button>
      )}
    </motion.span>
  );
}

function Arrow() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="relative z-10 size-4 shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
      <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
