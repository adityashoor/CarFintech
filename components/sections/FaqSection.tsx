import { CalendarCheck, Phone } from "lucide-react";
import { faqs } from "@/lib/content/faqs";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/primitives";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { FaqJsonLd } from "@/components/seo/JsonLd";

export function FaqSection({ number = "06" }: { number?: string }) {
  return (
    <section className="section-y bg-bg" aria-labelledby="faq-heading">
      <FaqJsonLd faqs={faqs} />
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading number={number} eyebrow="FAQ" title={["Frequently Asked", "Questions"]} />
          <Reveal delay={0.2} className="mt-8">
            <div className="rounded-2xl bg-dark p-7 text-white">
              <p className="font-heading text-xl font-bold tracking-tight">Ready to chat to one of our team?</p>
              <p className="mt-2 text-sm text-white/65">Have a chat with one of our qualified brokers who will understand your situation and talk you through the next steps.</p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href="/book-appointment" size="md" arrow={false}>
                  <CalendarCheck size={16} className="mr-2 inline" /> Book Appointment
                </Button>
                <PhoneLink
                  location="faq"
                  label={`Call ${site.phone.display}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-dark"
                />
                <span className="sr-only">
                  <Phone />
                </span>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal>
            <Accordion items={faqs.map((f, i) => ({ id: `faq-${i + 1}`, title: f.q, content: f.a }))} className="rounded-2xl border border-line bg-surface px-6 sm:px-8" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
