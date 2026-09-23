"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { createRef, useMemo, type RefObject } from "react";
import { highlightServices, type Service } from "@/lib/content/services";
import { SectionHeading } from "@/components/ui/primitives";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

/**
 * "At Car Fintech we help clients Australia-wide": the three featured products
 * as stacking cards. Each card pins near the top while the next slides over it,
 * scaling and dimming the one beneath (21st.dev "sticky card stack").
 */
export function Highlights() {
  const refs = useMemo(() => highlightServices.map(() => createRef<HTMLDivElement>()), []);
  return (
    <section className="section-y bg-surface" aria-labelledby="highlights-heading">
      <div className="container-x">
        <SectionHeading
          number="01"
          eyebrow="What we do"
          title={["At Car Fintech we help", "clients Australia-wide"]}
          description="Whether it's for personal use or business operations, our brokers compare lenders and handle the paperwork from application to settlement."
        />
        <div className="mt-14">
          {highlightServices.map((s, i) => (
            <StackCard key={s.slug} service={s} index={i} total={highlightServices.length} selfRef={refs[i]} nextRef={refs[i + 1]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({ service: s, index, total, selfRef, nextRef }: { service: Service; index: number; total: number; selfRef: RefObject<HTMLDivElement | null>; nextRef?: RefObject<HTMLDivElement | null> }) {
  const reduce = useReducedMotion();
  // Progress of the *next* card travelling from the bottom of the viewport to the top: that is when this one gets covered.
  const { scrollYProgress } = useScroll({ target: nextRef ?? selfRef, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.45]);
  const last = index === total - 1;
  return (
    <div ref={selfRef} className="sticky mb-6 last:mb-0" style={{ top: `calc(6.5rem + ${index * 1.25}rem)` }}>
      <motion.article style={{ scale: reduce || last ? 1 : scale, transformOrigin: "top center" }} className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="relative aspect-[16/10] lg:col-span-6 lg:aspect-auto lg:min-h-[440px]">
            <Image src={s.cardImage} alt={`${s.name} Car Fintech`} fill quality={95} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority={index === 0} />
          </div>
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-numeric text-xs tracking-[0.2em] text-slate">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
                <span className="flex size-11 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
                  <ServiceIcon icon={s.icon} size={22} />
                </span>
              </div>
              <h3 className="mt-8 font-heading text-display-sm font-bold tracking-tight text-ink">{s.name}</h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted md:text-lg">{s.short}</p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href={`/${s.slug}`} className="group inline-flex h-12 items-center gap-2 rounded-lg bg-ink px-6 text-sm font-semibold text-surface transition-colors hover:bg-accent hover:text-white">
                Explore {s.name}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/get-quote" className="text-sm font-semibold text-ink underline-offset-4 hover:underline">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
        <motion.div aria-hidden style={{ opacity: reduce || last ? 0 : dim }} className="pointer-events-none absolute inset-0 bg-dark" />
      </motion.article>
    </div>
  );
}
