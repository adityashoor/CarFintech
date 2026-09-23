import { Suspense } from "react";
import { QuoteForm } from "./QuoteForm";
import { SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";
import { BadgeCheck, Clock, Lock } from "lucide-react";

const points = [
  { Icon: Clock, title: "Two minutes, no paperwork", text: "Tell us what you're financing and how to reach you. We take it from there." },
  { Icon: BadgeCheck, title: "Lenders compared for you", text: "Banks, credit unions and specialist finance providers, matched to your situation." },
  { Icon: Lock, title: "No credit check at this stage", text: "Your enquiry is assessed by a licensed broker before anything goes to a lender." },
];

/** Homepage / service-page quote section (the original site's "#quote-form" anchor). */
export function QuoteSection({ number = "07", heading = ["Get a Quote"], intro = "Leave your details and we'll share a quote." }: { number?: string; heading?: string[]; intro?: string }) {
  return (
    <section id="quote-form" className="section-y relative overflow-hidden bg-dark text-white scroll-mt-24" aria-labelledby="quote-heading">
      <div className="pointer-events-none absolute inset-0 grid-bg mask-radial opacity-50" aria-hidden />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[140px]" aria-hidden />
      <div className="container-x relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading number={number} eyebrow="Get started" title={heading} tone="light" description={intro} />
          <ul className="mt-10 space-y-6">
            {points.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={0.1 * i}>
                <li className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-bright">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="font-heading font-bold">{title}</p>
                    <p className="mt-1 text-sm text-white/60">{text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <Suspense fallback={<div className="h-[520px] rounded-2xl glass-dark" />}>
              <QuoteForm tone="light" />
            </Suspense>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
