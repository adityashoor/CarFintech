import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteSection } from "@/components/quote/QuoteSection";
import { LenderMarquee } from "@/components/sections/LenderMarquee";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "Get Quote",
  description: "At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide get a new Loan or refinance an existing Home or Investment Loan",
  alternates: { canonical: `${site.url}/get-quote` },
};

export default function GetQuotePage() {
  return (
    <>
      <PageHero eyebrow="Get started" title={["Get a Quote"]} subtitle="Leave your details and we'll share a quote." compact actions={<span />} crumbs={[{ href: "/get-quote", label: "Get a Quote" }]} />
      <QuoteSection number="01" heading={["Tell us what", "you're financing"]} intro="Three quick steps. A qualified broker reviews every enquiry and comes back to you with options from our lender network." />
      <LenderMarquee compact />
      <Testimonials dark={false} />
      <FaqSection number="03" />
    </>
  );
}
