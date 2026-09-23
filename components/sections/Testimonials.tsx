"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { testimonials } from "@/lib/content/testimonials";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import { SectionHeading, Avatar, Stars } from "@/components/ui/primitives";
import { GoogleBadge } from "@/components/ui/GoogleBadge";
import { Marquee } from "@/components/animations/Marquee";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Reviews: a featured rotating quote (21st.dev "animated testimonials") beside
 * a vertical marquee of every published review.
 */
export function Testimonials({ heading = "Our Latest Reviews", dark = true }: { heading?: string; dark?: boolean }) {
  const featured = testimonials.filter((t) => t.quote.length > 80);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % featured.length), 7000);
    return () => window.clearInterval(id);
  }, [paused, featured.length]);

  const t = featured[i];

  return (
    <section className={cn("section-y relative overflow-hidden", dark ? "bg-dark text-white" : "bg-surface")} aria-labelledby="reviews-heading" id="reviews">
      {dark && <div className="pointer-events-none absolute inset-0 grid-bg mask-radial opacity-50" aria-hidden />}
      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading number="04" eyebrow="Reviews" title={[heading]} tone={dark ? "light" : "dark"} />
          <Reveal className="md:mb-2">
            <GoogleBadge tone={dark ? "light" : "dark"} />
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Featured */}
          <div className="lg:col-span-7" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <Reveal className="h-full">
              <div className={cn("relative flex h-full flex-col rounded-2xl border p-8 sm:p-10", dark ? "border-white/10 bg-white/[0.04]" : "border-line bg-bg")}>
                <Quote className={cn("size-10", dark ? "text-accent-bright" : "text-ink")} strokeWidth={1.2} aria-hidden />
                <div className="relative mt-6 flex-1">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.blockquote
                      key={t.name}
                      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                    >
                      <p className={cn("text-lg leading-relaxed md:text-xl", dark ? "text-white/90" : "text-ink")}>{t.quote}</p>
                      <footer className="mt-8 flex items-center gap-4">
                        <Avatar name={t.name} index={i} />
                        <div>
                          <p className="font-heading font-bold">{t.name}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <Stars size={12} />
                            {t.broker && <span className={cn("text-xs", dark ? "text-white/50" : "text-muted")}>worked with {t.broker}</span>}
                          </div>
                        </div>
                      </footer>
                    </motion.blockquote>
                  </AnimatePresence>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {featured.map((f, n) => (
                      <button
                        key={f.name}
                        type="button"
                        aria-label={`Show review ${n + 1}`}
                        onClick={() => setI(n)}
                        className={cn("h-1.5 rounded-full transition-all duration-300", n === i ? "w-8 bg-accent" : dark ? "w-3 bg-white/20" : "w-3 bg-line")}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      aria-label="Previous review"
                      onClick={() => setI((i - 1 + featured.length) % featured.length)}
                      className={cn("flex size-10 items-center justify-center rounded-full border transition-colors", dark ? "border-white/15 hover:bg-white hover:text-dark" : "border-line hover:bg-ink hover:text-surface")}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next review"
                      onClick={() => setI((i + 1) % featured.length)}
                      className={cn("flex size-10 items-center justify-center rounded-full border transition-colors", dark ? "border-white/15 hover:bg-white hover:text-dark" : "border-line hover:bg-ink hover:text-surface")}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Vertical marquee of all reviews */}
          <div className="relative h-[520px] overflow-hidden mask-fade-y lg:col-span-5">
            <Marquee vertical duration={45} gap="1rem" className="h-full">
              {testimonials.map((r, n) => (
                <article key={r.name} className={cn("w-full rounded-2xl border p-5", dark ? "border-white/10 bg-white/[0.05]" : "border-line bg-surface shadow-card")}>
                  <div className="flex items-center gap-3">
                    <Avatar name={r.name} index={n + 2} className="size-9 text-xs" />
                    <div>
                      <p className="text-sm font-semibold">{r.name}</p>
                      <Stars size={10} />
                    </div>
                  </div>
                  <p className={cn("mt-3 line-clamp-4 text-sm leading-relaxed", dark ? "text-white/70" : "text-muted")}>{r.quote}</p>
                </article>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
