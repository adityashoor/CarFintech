import type { Metadata } from "next";
import { CalendarClock, MessageSquareText, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { CalendlyEmbed } from "@/components/forms/CalendlyEmbed";
import { SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { LenderMarquee } from "@/components/sections/LenderMarquee";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { simpleProcess } from "@/lib/content/process";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: "At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide get started with their Loan by booking an appointment with our experts",
  alternates: { canonical: `${site.url}/book-appointment` },
};

const steps = simpleProcess("qualify for Asset Finance", "finance");

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book an appointment"
        title={["Book an", "Appointment"]}
        subtitle="At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide get started with their Loan by booking an appointment with our experts"
        image="/images/services/business-loans.webp"
        crumbs={[{ href: "/book-appointment", label: "Book Appointment" }]}
        actions={<span />}
        compact
      />
      <section className="section-y bg-surface">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading number="01" eyebrow="30 minutes, free" title={["Pick a time that", "suits you"]} />
            <ol className="mt-8 space-y-5">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={0.1 * i}>
                  <li className="flex gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink font-numeric text-xs font-bold text-surface">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-heading font-bold text-ink">{s.title}</p>
                      <p className="mt-1 text-sm text-muted">{s.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.3} className="mt-8 rounded-2xl bg-dark p-6 text-white">
              <p className="flex items-center gap-2 font-heading font-bold">
                <CalendarClock size={18} className="text-accent-bright" /> Prefer to talk now?
              </p>
              <p className="mt-2 text-sm text-white/65">Call us and one of our qualified brokers will understand your situation and talk you through the next steps.</p>
              <PhoneLink location="book_page" label={`Call ${site.phone.display}`} className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white" />
              <span className="sr-only">
                <Phone /> <MessageSquareText />
              </span>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <CalendlyEmbed url={site.calendly} />
            </Reveal>
          </div>
        </div>
      </section>
      <LenderMarquee compact />
      <Testimonials />
      <FaqSection number="03" />
    </>
  );
}
