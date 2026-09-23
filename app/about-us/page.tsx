import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { LenderMarquee } from "@/components/sections/LenderMarquee";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "About Car Fintech",
  description: "At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide get a new Loan or refinance an existing Home or Investment Loan",
  alternates: { canonical: `${site.url}/about-us` },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={["About", "Car Fintech"]}
        subtitle="Melbourne's leading asset finance broker, specialising in vehicle financing solutions for clients across Australia."
        image="/images/services/hero-home.webp"
        crumbs={[{ href: "/about-us", label: "About Car Fintech" }]}
      />
      <AboutSection number="01" cta={false} />
      <TeamGrid />
      <LenderMarquee compact />
      <Testimonials />
      <FaqSection number="04" />
      <CtaBand />
    </>
  );
}
