"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

/** Accessible accordion with animated height (one open at a time). */
export function Accordion({ items, className, tone = "dark", defaultOpen = 0 }: { items: AccordionItem[]; className?: string; tone?: "dark" | "light"; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<string | null>(defaultOpen === null ? null : (items[defaultOpen]?.id ?? null));
  const light = tone === "light";
  return (
    <div className={cn("divide-y", light ? "divide-white/10" : "divide-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id} className="py-1">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
                id={`${item.id}-button`}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className={cn(
                  "group flex w-full items-start justify-between gap-6 py-5 text-left font-heading text-base font-semibold tracking-tight transition-colors md:text-lg",
                  light ? "text-white hover:text-accent-bright" : "text-ink hover:text-ink-3",
                )}
              >
                <span className="flex gap-4">
                  <span className={cn("mt-0.5 font-numeric text-xs font-medium tabular-nums", light ? "text-accent-bright" : "text-slate")}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{item.title}</span>
                </span>
                <span
                  className={cn(
                    "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    light ? "border-white/20" : "border-ink/15",
                    isOpen && (light ? "rotate-45 bg-accent text-white border-accent" : "rotate-45 bg-ink text-surface border-ink"),
                  )}
                >
                  <Plus size={16} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${item.id}-panel`}
                  role="region"
                  aria-labelledby={`${item.id}-button`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                  className="overflow-hidden"
                >
                  <p className={cn("pb-6 pl-10 pr-4 text-[15px] leading-relaxed md:text-base", light ? "text-white/70" : "text-muted")}>{item.content}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
