"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurFade } from "@/components/animations/BlurFade";
import { Button } from "@/components/ui/Button";
import { GoogleBadge } from "@/components/ui/GoogleBadge";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { site } from "@/lib/site";

export interface Crumb {
  href: string;
  label: string;
}

/**
 * Inner-page hero on a light surface: breadcrumb, eyebrow, the page's
 * published headline and supporting copy, the conversion actions, trust row,
 * and a photograph panel that eases upward as you scroll.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  crumbs,
  actions,
  aside,
  compact = false,
  showBadge = true,
}: {
  eyebrow?: string;
  title: string[];
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
  aside?: ReactNode;
  compact?: boolean;
  showBadge?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const hasVisual = Boolean(image || aside);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg-light mask-radial opacity-60" aria-hidden />
      <div className="pointer-events-none absolute -right-32 -top-20 -z-10 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[120px]" aria-hidden />

      <div className={cn("container-x pt-32 md:pt-40", compact ? "pb-12 md:pb-16" : "pb-16 md:pb-24")}>
        {crumbs && (
          <BlurFade inView={false}>
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted">
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
              {crumbs.map((c) => (
                <span key={c.href} className="flex items-center gap-1">
                  <ChevronRight size={12} />
                  <Link href={c.href} className="hover:text-ink">
                    {c.label}
                  </Link>
                </span>
              ))}
            </nav>
          </BlurFade>
        )}
        <div className={cn("grid grid-cols-1 gap-12", hasVisual && "lg:grid-cols-12 lg:items-center lg:gap-10")}>
          <div className={cn("max-w-3xl", hasVisual && "lg:col-span-6")}>
            {eyebrow && (
              <BlurFade inView={false} delay={0.05}>
                <p className="eyebrow mb-5 flex items-center gap-3 text-accent-deep">
                  <span aria-hidden className="h-px w-8 bg-accent" />
                  {eyebrow}
                </p>
              </BlurFade>
            )}
            <TextReveal as="h1" mode="controlled" visible lines={title} delay={0.1} className="font-heading text-display font-bold tracking-tight text-ink" />
            {subtitle && (
              <BlurFade inView={false} delay={0.4}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{subtitle}</p>
              </BlurFade>
            )}
            <BlurFade inView={false} delay={0.55} className="mt-8 flex flex-wrap items-center gap-3">
              {actions ?? (
                <>
                  <Button href="/get-quote" size="lg">
                    Get a Quote
                  </Button>
                  <Button href="/book-appointment" size="lg" variant="outline">
                    Book Appointment
                  </Button>
                </>
              )}
            </BlurFade>
            {showBadge && (
              <BlurFade inView={false} delay={0.7} className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6 text-sm text-muted">
                <GoogleBadge />
                <span>
                  Call Us <PhoneLink location="page_hero" className="font-semibold text-ink hover:text-accent-deep" />
                </span>
                <span className="hidden sm:inline">
                  {site.address.city}, {site.address.region}
                </span>
              </BlurFade>
            )}
          </div>
          {hasVisual && (
            <motion.div style={{ y: reduce ? 0 : panelY }} className="lg:col-span-6">
              <BlurFade inView={false} delay={0.35}>
                {aside ?? (
                  <div className="relative ml-auto aspect-[4/3] w-full max-w-[600px] overflow-hidden rounded-2xl bg-dark-2">
                    <motion.div style={{ y: reduce ? 0 : imgY }} className="absolute -inset-y-10 inset-x-0 will-change-transform">
                      <Image src={image!} alt={imageAlt} fill priority quality={95} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[60%_center]" />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                  </div>
                )}
              </BlurFade>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
