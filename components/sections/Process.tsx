"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ProcessStep } from "@/lib/content/process";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Sticky process: the step list on the left stays pinned and highlights as the
 * matching step scrolls through the middle of the viewport on the right. Works
 * for the three-step and seven-step processes alike.
 */
export function Process({
  heading,
  steps,
  eyebrow = "How it works",
  number,
  dark = false,
  cta = true,
}: {
  heading: string;
  steps: ProcessStep[];
  eyebrow?: string;
  number?: string;
  dark?: boolean;
  cta?: boolean;
}) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const els = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [steps.length]);

  const progress = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 100;

  return (
    <section className={cn("section-y", dark ? "bg-dark text-white" : "bg-surface")} aria-labelledby="process-heading">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Sticky rail */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading number={number} eyebrow={eyebrow} title={[heading]} tone={dark ? "light" : "dark"} as="h2" />
            <ol className="relative mt-10 hidden lg:block">
              <div className={cn("absolute bottom-3 left-[11px] top-3 w-px", dark ? "bg-white/10" : "bg-line")} aria-hidden>
                <motion.div className="w-full bg-accent" animate={{ height: `${progress}%` }} transition={{ duration: 0.6, ease: EASE_OUT_EXPO }} />
              </div>
              {steps.map((s, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li key={s.title} className="relative flex items-center gap-4 py-2.5 pl-10">
                    <span
                      className={cn(
                        "absolute left-0 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-colors duration-300",
                        on ? "border-accent bg-accent text-white" : done ? "border-accent bg-accent/20 text-accent-deep" : dark ? "border-white/20 bg-dark text-white/40" : "border-line bg-surface text-slate",
                        dark && done && "text-accent-bright",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className={cn("font-heading text-base font-semibold transition-colors duration-300", on ? (dark ? "text-white" : "text-ink") : dark ? "text-white/45" : "text-slate")}>{s.title}</span>
                  </li>
                );
              })}
            </ol>
            {cta && (
              <div className="mt-10">
                <Button href="/book-appointment" variant={dark ? "outline-light" : "outline"}>
                  Book Appointment
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Scrolling steps */}
        <ol className="space-y-5 lg:col-span-7 lg:space-y-8">
          {steps.map((s, i) => (
            <li
              key={s.title}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-index={i}
            >
              <Reveal delay={0.05} amount={0.3}>
                <div
                  className={cn(
                    "relative rounded-2xl border p-7 transition-colors duration-500 sm:p-9",
                    dark ? (i === active ? "border-accent/50 bg-white/[0.06]" : "border-white/10 bg-white/[0.03]") : i === active ? "border-accent/60 bg-surface shadow-card" : "border-line bg-bg",
                  )}
                >
                  <div className="flex items-start gap-5">
                    <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-lg font-numeric text-sm font-bold", dark ? "bg-accent text-white" : "bg-ink text-surface")}>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className={cn("font-heading text-xl font-bold tracking-tight sm:text-2xl", dark ? "text-white" : "text-ink")}>{s.title}</h3>
                      <p className={cn("mt-3 leading-relaxed", dark ? "text-white/65" : "text-muted")}>{s.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
