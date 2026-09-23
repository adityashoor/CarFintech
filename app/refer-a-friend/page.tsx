import type { Metadata } from "next";
import { Gift, Send, UserPlus } from "lucide-react";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ReferralForm } from "@/components/forms/ReferralForm";
import { SectionHeading } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { Reveal } from "@/components/animations/Reveal";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Refer a Friend",
  description: "At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide get a new Loan or refinance their loan. Refer a friend and be rewarded on settlement",
  alternates: { canonical: `${site.url}/refer-a-friend` },
};

const steps = [
  { Icon: UserPlus, text: "You realise a friend or family member could benefit from our help with a new loan." },
  { Icon: Send, text: "You ask for their permission and enter their details for us to reach out." },
  { Icon: Gift, text: "Once the loan is settled, we'll send you a $200 gift card." },
];

const terms = [
  "A successful referral is achieved once the loan has settled with the lender.",
  "Minimum loan size - $10,000",
  "Loan must be settled within 12 months from the date referral was received",
  "This referral program begins on 1st June 2024.",
  "$200 you receive will be in the form of a gift card only and will be sent digitally via your choice of sms or e-mail within 3 business days after the loan has settled.",
];

export default function ReferPage() {
  return (
    <>
      <PageHero
        eyebrow="Refer a Friend"
        title={["Refer a Client"]}
        subtitle="We recognise and reward the advocacy of our clients. Refer a friend and receive a reward on settlement."
        image="/images/services/personal-loans.webp"
        crumbs={[{ href: "/refer-a-friend", label: "Refer a Friend" }]}
        actions={<span />}
        showBadge={false}
      />
      <section className="section-y bg-surface">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading number="01" eyebrow="Refer a Client" title={["Introduce a friend, colleague or family member and receive a $200 gift card."]} size="title" />
            <Reveal delay={0.15} className="mt-5">
              <p className="text-lg text-muted">It only takes 3 simple steps.</p>
            </Reveal>
            <Stagger className="mt-8 space-y-4" stagger={0.12}>
              {steps.map(({ Icon, text }, i) => (
                <StaggerItem key={text}>
                  <div className="flex gap-4 rounded-2xl border border-line bg-bg p-5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
                      <Icon size={20} />
                    </span>
                    <div>
                      <p className="font-numeric text-xs uppercase tracking-widest text-slate">Step {i + 1}</p>
                      <p className="mt-1 text-ink">{text}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.3} className="mt-6">
              <p className="text-sm text-muted">Terms &amp; conditions apply, see below for details.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <ReferralForm />
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section-y bg-bg" aria-labelledby="terms-heading">
        <div className="container-x">
          <SectionHeading number="02" eyebrow="Terms & Conditions" title={["Terms & Conditions"]} size="title" />
          <Reveal className="mt-6 max-w-3xl">
            <p className="text-muted">Eligibility for the $200 gift card is based on this criteria</p>
            <ul className="mt-4 space-y-3">
              {terms.map((t) => (
                <li key={t} className="flex gap-3 text-sm text-ink-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <Testimonials />
      <CtaBand />
    </>
  );
}
