"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Lender logo tile with a 21st.dev-style hover: the card tilts in 3D towards
 * the cursor, a highlight travels along the border and across the surface,
 * and the tile lifts. Logos stay in full colour at all times.
 */
export function LogoTile({ name, file, dark = false }: { name: string; file: string; dark?: boolean }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 260, damping: 22, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 260, damping: 22, mass: 0.4 });
  const rotateX = useTransform(sy, [0, 1], [9, -9]);
  const rotateY = useTransform(sx, [0, 1], [-9, 9]);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    px.set(x);
    py.set(y);
    e.currentTarget.style.setProperty("--mx", `${x * 100}%`);
    e.currentTarget.style.setProperty("--my", `${y * 100}%`);
  }
  function onMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className="shrink-0 [perspective:900px]" title={name}>
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={reduce ? undefined : { y: -6, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={cn(
          "group relative flex h-20 w-40 items-center justify-center rounded-xl border sm:h-[88px] sm:w-44",
          "spotlight glow-border transition-[box-shadow,border-color] duration-300 hover:shadow-glow",
          dark ? "border-white/10 bg-white/[0.04] hover:bg-white" : "border-line bg-white hover:border-accent/40",
        )}
      >
        <Image
          src={file}
          alt={`Logo for ${name}`}
          width={180}
          height={120}
          sizes="180px"
          className="h-12 w-auto max-w-[130px] object-contain transition-transform duration-500 ease-out-expo group-hover:scale-110 [transform:translateZ(24px)]"
        />
      </motion.div>
    </div>
  );
}
