"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { BadgeCheck, Building2, Clock } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { lenderCount } from "@/lib/content/lenders";
import { site } from "@/lib/site";
import { EASE_OUT_EXPO } from "@/lib/utils";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/ui/Button";
import { GoogleBadge } from "@/components/ui/GoogleBadge";

const trust = [
  { Icon: Building2, text: `${lenderCount} lenders compared` },
  { Icon: BadgeCheck, text: "Licensed & accredited brokers" },
  { Icon: Clock, text: "Approvals in as little as 24–48 hrs" },
];

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Expansion hero. Opens as an editorial split (copy left, framed photograph
 * right). As the visitor scrolls, the section stays pinned while the frame
 * itself grows to fill the viewport (the photograph re-crops as the box
 * grows, so it is sharp and well composed at every step), the copy lifts
 * away, and a statement with the company's verified figures settles over
 * the photograph. Reduced-motion and small screens get the static split.
 */
export function Hero() {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [expand, setExpand] = useState(false);
  const [rect, setRect] = useState<{ top: number; right: number; bottom: number; left: number } | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  useIsoLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setExpand(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useIsoLayoutEffect(() => {
    if (!expand) return;
    const measure = () => {
      if (!frame.current || !stage.current) return;
      const f = frame.current.getBoundingClientRect();
      const s = stage.current.getBoundingClientRect();
      setRect({ top: f.top - s.top, left: f.left - s.left, right: s.right - f.right, bottom: s.bottom - f.bottom });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [expand]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const r = rect ?? { top: 0, right: 0, bottom: 0, left: 0 };
  const top = useTransform(scrollYProgress, [0, 0.55], [r.top, 0]);
  const right = useTransform(scrollYProgress, [0, 0.55], [r.right, 0]);
  const bottom = useTransform(scrollYProgress, [0, 0.55], [r.bottom, 0]);
  const left = useTransform(scrollYProgress, [0, 0.55], [r.left, 0]);
  const radius = useTransform(scrollYProgress, [0, 0.55], [16, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);
  const shade = useTransform(scrollYProgress, [0.25, 0.65], [0, 0.62]);
  const stmtOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const stmtY = useTransform(scrollYProgress, [0.5, 0.8], [40, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const cueDisplay = useTransform(scrollYProgress, (p) => (p > 0.14 ? "none" : "flex"));

  const copy = (
    <>
      <motion.p initial={{ opacity: 0, y: 10 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE_OUT_EXPO }} className="eyebrow flex items-center gap-3 text-accent-deep">
        <span aria-hidden className="h-px w-8 bg-accent" />
        Asset finance brokers · Melbourne · Australia-wide
      </motion.p>
      <TextReveal
        as="h1"
        mode="controlled"
        visible={ready}
        delay={0.1}
        lines={["Your Trusted", "Vehicle Finance", "Partner"]}
        className="mt-6 font-heading text-display-xl font-bold tracking-tight text-ink"
        lineClassName="[&:nth-child(2)]:text-accent-deep"
      />
      <motion.p initial={{ opacity: 0, y: 14 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.5 }} className="mt-6 max-w-lg text-lg leading-relaxed text-muted md:text-xl">
        At Car Fintech, we help individuals and businesses across Australia access smart asset finance solutions.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.65 }} className="mt-8 flex flex-wrap items-center gap-3">
        <Button href="/asset-finance" size="lg">
          Get Asset Finance
        </Button>
        <Button href="/get-quote" size="lg" variant="outline">
          Get a Quote
        </Button>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.9 }} className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:gap-8">
        <GoogleBadge />
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {trust.map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-2">
              <Icon size={15} className="shrink-0 text-accent-deep" />
              {text}
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );

  const photo = (scale: typeof imgScale | number) => (
    <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
      <Image src="/images/services/car-loans.webp" alt="Car Fintech" fill priority quality={95} sizes="100vw" className="object-cover object-[38%_center]" />
    </motion.div>
  );

  return (
    <section ref={section} className={expand ? "relative h-[220vh]" : "relative"}>
      <div ref={stage} className={expand ? "sticky top-0 h-screen overflow-hidden bg-surface" : "relative overflow-hidden bg-surface"}>
        <div className="pointer-events-none absolute inset-0 grid-bg-light mask-radial opacity-70" aria-hidden />
        <div className="pointer-events-none absolute -right-40 top-0 h-[640px] w-[640px] rounded-full bg-accent/10 blur-[120px]" aria-hidden />

        <div className={expand ? "container-x relative grid h-full grid-cols-12 items-center gap-10 pt-24" : "container-x grid grid-cols-1 items-center gap-12 pb-16 pt-32 md:pt-40 lg:grid-cols-12 lg:gap-10 lg:pb-24"}>
          <motion.div style={expand ? { opacity: copyOpacity, y: copyY } : undefined} className="col-span-12 lg:col-span-6">
            {copy}
          </motion.div>
          {/* The frame reserves the photograph's opening position; on large screens the animated box takes over. */}
          <div className="col-span-12 lg:col-span-6">
            <motion.div
              ref={frame}
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.35 }}
              className="relative ml-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden rounded-2xl sm:aspect-[5/6] lg:aspect-[4/5]"
            >
              {!expand && photo(1)}
            </motion.div>
          </div>
        </div>

        {expand && rect && (
          <>
            <motion.div style={{ top, right, bottom, left, borderRadius: radius }} className="absolute z-10 overflow-hidden bg-dark-2">
              {photo(imgScale)}
              <motion.div style={{ opacity: shade }} className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />
              <motion.div style={{ opacity: stmtOpacity, y: stmtY }} className="absolute inset-x-0 bottom-0 z-10 pb-20 text-white">
                <div className="container-x">
                  <p className="eyebrow text-accent-bright">Business &amp; consumer</p>
                  <p className="mt-4 max-w-3xl font-heading text-display font-bold tracking-tight">Vehicles, plant, equipment and more, financed through {lenderCount} lenders.</p>
                  <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/15 pt-8 md:grid-cols-4">
                    {[
                      ["5.0", `${site.reviews.source} rating`],
                      [String(site.reviews.count), "Client reviews"],
                      [String(lenderCount), "Lenders compared"],
                      ["24–48 hrs", "Typical approval"],
                    ].map(([v, l]) => (
                      <div key={l}>
                        <dt className="eyebrow text-white/60">{l}</dt>
                        <dd className="mt-1 font-heading text-2xl font-bold tabular-nums md:text-3xl">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </motion.div>
            </motion.div>
            <motion.div style={{ opacity: cueOpacity, display: cueDisplay }} className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
              <span className="relative h-10 w-px overflow-hidden bg-ink/15">
                <motion.span className="absolute inset-x-0 top-0 h-4 bg-accent" animate={{ y: [-16, 40] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
              </span>
              Scroll
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
