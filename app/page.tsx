import { Hero } from "@/components/hero/Hero";
import { LenderMarquee } from "@/components/sections/LenderMarquee";
import { Highlights } from "@/components/sections/Highlights";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { EstimateSection } from "@/components/sections/EstimateSection";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { AboutSection } from "@/components/sections/AboutSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { QuoteSection } from "@/components/quote/QuoteSection";
import { ArticlesPreview } from "@/components/sections/ArticlesPreview";
import { CtaBand } from "@/components/sections/CtaBand";
import { simpleProcess } from "@/lib/content/process";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LenderMarquee compact />
      <Highlights />
      <ServicesBento />
      <EstimateSection />
      <Process number="03" eyebrow="How it works" heading="Initial consult to approval, handled for you" steps={simpleProcess("qualify for Asset Finance", "finance")} />
      <Testimonials />
      <AboutSection />
      <FaqSection />
      <QuoteSection />
      <ArticlesPreview />
      <CtaBand tone="dark" />
    </>
  );
}
