"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { CalendarCheck, ChevronRight, Mail, Phone, Quote } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import type { TeamMember } from "@/lib/content/team";
import { testimonials } from "@/lib/content/testimonials";
import { site } from "@/lib/site";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurFade } from "@/components/animations/BlurFade";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollTextReveal } from "@/components/animations/ScrollTextReveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { Spotlight } from "@/components/animations/Spotlight";
import { Button } from "@/components/ui/Button";
import { Avatar, SectionHeading, Stars } from "@/components/ui/primitives";

/** Drawn from the published bio: the areas the profile itself describes. */
const expertise = ["Consumer lending", "Commercial lending", "Vehicle finance", "Asset finance", "Equipment finance", "Complex & non-standard scenarios", "Lender relationships", "Transparent advice"];

/**
 * Director profile: cursor-lit hero with a 3D tilt portrait, expertise tags
 * that cascade in, the published biography revealed as you read, and the
 * reviews that name him. Built to make the person proud of the page.
 */
export function DirectorProfile({ member }: { member: TeamMember }) {
  const first = member.name.split(" ")[0];
  const reviews = testimonials.filter((t) => t.broker === first);
  const [lead, ...rest] = member.bio;

  return (
    <>
      <ProfileHero member={member} />

      {/* Biography with a sticky contact rail */}
      <section className="section-y bg-surface" aria-labelledby="bio-heading">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading number="01" eyebrow="Profile" title={[`About ${member.name}`]} />
            <ScrollTextReveal text={lead} className="mt-8 font-heading text-xl font-semibold leading-snug tracking-tight md:text-2xl" />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-3">
              {rest.map((p, i) => (
                <Reveal key={i} delay={0.05 * i} y={16}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-10">
              <p className="eyebrow mb-4 text-muted">Areas of expertise</p>
              <Stagger className="flex flex-wrap gap-2" stagger={0.05}>
                {expertise.map((tag) => (
                  <StaggerItem key={tag}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:bg-accent-soft">
                      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                      {tag}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal delay={0.15}>
                <Spotlight glow className="rounded-2xl border border-line bg-surface p-7 shadow-card">
                  <p className="eyebrow text-accent-deep">Work with {first}</p>
                  <p className="mt-3 font-heading text-2xl font-bold tracking-tight text-ink">Have a chat about your next purchase.</p>
                  <p className="mt-2 text-sm text-muted">Have a chat with one of our qualified brokers who will understand your situation and talk you through the next steps.</p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Button href="/book-appointment" arrow={false} block>
                      <CalendarCheck size={16} className="mr-2 inline" /> Book Appointment
                    </Button>
                    {member.phone && (
                      <Button href={`tel:${member.phone.tel}`} variant="outline" arrow={false} block>
                        <Phone size={16} className="mr-2 inline" /> {member.phone.display}
                      </Button>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="inline-flex items-center justify-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:underline">
                        <Mail size={15} /> {member.email}
                      </a>
                    )}
                  </div>
                  <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
                    <div>
                      <dt className="text-muted">Role</dt>
                      <dd className="mt-0.5 font-semibold text-ink">{member.role}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">Based in</dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {site.address.city}, {site.address.region}
                      </dd>
                    </div>
                  </dl>
                </Spotlight>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews that name him */}
      {reviews.length > 0 && (
        <section className="section-y bg-bg" aria-labelledby="director-reviews-heading">
          <div className="container-x">
            <SectionHeading number="02" eyebrow="Reviews" title={[`Clients on working with ${first}`]} />
            <Stagger className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2" stagger={0.12}>
              {reviews.map((r, i) => (
                <StaggerItem key={r.name} className="h-full">
                  <Spotlight as="article" glow className="flex h-full flex-col rounded-2xl border border-line bg-surface p-8 shadow-card">
                    <Quote className="size-8 text-accent-deep" strokeWidth={1.2} aria-hidden />
                    <p className="mt-5 flex-1 text-base leading-relaxed text-ink-3 md:text-lg">{r.quote}</p>
                    <footer className="mt-8 flex items-center gap-4">
                      <Avatar name={r.name} index={i + 1} />
                      <div>
                        <p className="font-heading font-bold text-ink">{r.name}</p>
                        <Stars size={12} />
                      </div>
                    </footer>
                  </Spotlight>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2} className="mt-8">
              <Link href="/#reviews" className="inline-flex items-center gap-1 text-sm font-semibold text-ink underline-offset-4 hover:underline">
                See all {site.reviews.count} reviews <ChevronRight size={14} />
              </Link>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}

function ProfileHero({ member }: { member: TeamMember }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // Cursor spotlight over the hero background.
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const smx = useSpring(mx, { stiffness: 120, damping: 24 });
  const smy = useSpring(my, { stiffness: 120, damping: 24 });
  const light = useTransform([smx, smy], ([x, y]) => `radial-gradient(600px circle at ${x}% ${y}%, rgb(113 128 147 / 0.18), transparent 60%)`);
  // 3D tilt for the portrait.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 200, damping: 22, mass: 0.5 });
  const spy = useSpring(py, { stiffness: 200, damping: 22, mass: 0.5 });
  const rotateX = useTransform(spy, [0, 1], [7, -7]);
  const rotateY = useTransform(spx, [0, 1], [-7, 7]);
  const glareX = useTransform(spx, [0, 1], ["20%", "80%"]);
  const glareY = useTransform(spy, [0, 1], ["20%", "80%"]);
  const glare = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(360px circle at ${x} ${y}, rgb(255 255 255 / 0.18), transparent 60%)`);

  function onMove(e: MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }
  function onPortraitMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onPortraitLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  const summary = member.bio[0].split(". ")[0] + ".";

  return (
    <section ref={ref} onMouseMove={onMove} className="relative isolate overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg-light mask-radial opacity-60" aria-hidden />
      {!reduce && <motion.div aria-hidden style={{ backgroundImage: light }} className="pointer-events-none absolute inset-0 -z-10" />}

      <div className="container-x grid grid-cols-1 items-center gap-12 pb-16 pt-32 md:pt-40 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="lg:col-span-6">
          <BlurFade inView={false}>
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted">
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
              <ChevronRight size={12} />
              <Link href="/about-us" className="hover:text-ink">
                About Us
              </Link>
              <ChevronRight size={12} />
              <span>{member.name}</span>
            </nav>
          </BlurFade>
          <BlurFade inView={false} delay={0.05}>
            <p className="eyebrow flex items-center gap-3 text-accent-deep">
              <span aria-hidden className="h-px w-8 bg-accent" />
              {member.role} · {site.name}
            </p>
          </BlurFade>
          <TextReveal as="h1" mode="controlled" visible lines={member.name.split(" ")} delay={0.1} className="mt-6 font-heading text-display-xl font-bold tracking-tight text-ink" />
          <BlurFade inView={false} delay={0.4}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">{summary}</p>
          </BlurFade>
          <BlurFade inView={false} delay={0.55} className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/book-appointment" size="lg" arrow={false}>
              <CalendarCheck size={16} className="mr-2 inline" /> Book Appointment
            </Button>
            {member.phone && (
              <Button href={`tel:${member.phone.tel}`} size="lg" variant="outline" arrow={false}>
                <Phone size={16} className="mr-2 inline" /> {member.phone.display}
              </Button>
            )}
          </BlurFade>
          <BlurFade inView={false} delay={0.75}>
            <ul className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
              {expertise.slice(0, 5).map((tag) => (
                <li key={tag} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-deep">
                  {tag}
                </li>
              ))}
            </ul>
          </BlurFade>
        </div>

        {/* Portrait */}
        <div className="lg:col-span-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.3 }} className="relative mx-auto w-full max-w-[440px] [perspective:1200px] lg:ml-auto">
            <motion.div
              onMouseMove={onPortraitMove}
              onMouseLeave={onPortraitLeave}
              style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-line bg-dark-2 shadow-card"
            >
              <Image src={member.image} alt={member.name} fill priority quality={95} sizes="(min-width: 1024px) 440px, 90vw" className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
              {!reduce && <motion.div aria-hidden style={{ backgroundImage: glare }} className="pointer-events-none absolute inset-0" />}
              <div className="absolute bottom-5 left-5 right-5 text-white [transform:translateZ(30px)]">
                <p className="eyebrow text-accent-bright">{member.role}</p>
                <p className="mt-1 font-heading text-xl font-bold">{member.name}</p>
              </div>
            </motion.div>
            {/* Floating proof */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.9 }}
              className="absolute -left-4 top-8 w-[220px] rounded-xl border border-line bg-surface p-4 shadow-card sm:-left-10"
            >
              <div className="flex items-center gap-2">
                <Stars size={12} />
                <span className="font-heading text-sm font-bold text-ink">{site.reviews.rating}</span>
              </div>
              <p className="mt-1 text-xs text-muted">from {site.reviews.count} Google reviews for the Car Fintech team</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 1.05 }}
              className={cn("absolute -bottom-6 right-0 w-[240px] rounded-xl border border-line bg-surface p-4 shadow-card sm:-right-6")}
            >
              <p className="eyebrow text-muted">Direct line</p>
              {member.phone && (
                <a href={`tel:${member.phone.tel}`} className="mt-1 block font-heading text-lg font-bold text-ink hover:text-accent-deep">
                  {member.phone.display}
                </a>
              )}
              <p className="mt-1 text-xs text-muted">Melbourne office, serving clients Australia-wide.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
