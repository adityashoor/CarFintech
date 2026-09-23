import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/content/services";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceBody } from "@/components/sections/ServiceBody";
import { Process } from "@/components/sections/Process";
import { LenderMarquee } from "@/components/sections/LenderMarquee";
import { AboutSection } from "@/components/sections/AboutSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { QuoteSection } from "@/components/quote/QuoteSection";
import { ArticlesPreview } from "@/components/sections/ArticlesPreview";
import { ServiceViewed } from "@/components/seo/ServiceViewed";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.seo.title,
    description: s.seo.description,
    alternates: { canonical: `${site.url}/${s.slug}` },
    openGraph: { title: `${s.seo.title} - ${site.name}`, description: s.seo.description, images: [{ url: s.heroImage }] },
  };
}

function splitTitle(title: string): string[] {
  if (title.length <= 20) return [title];
  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export default async function ServicePage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  return (
    <>
      <ServiceViewed slug={s.slug} />
      <PageHero
        eyebrow={s.category === "business" ? "Business finance" : "Consumer finance"}
        title={splitTitle(s.title)}
        subtitle={s.subtitle}
        image={s.heroImage}
        imageAlt={`${s.name} Car Fintech`}
        crumbs={[{ href: `/${s.slug}`, label: s.name }]}
      />
      <ServiceBody heading={s.introHeading} blocks={s.body} slug={s.slug} />
      <Process number="02" eyebrow="The process" heading={s.process.heading} steps={s.process.steps} dark={s.process.steps.length > 4} />
      <LenderMarquee compact />
      <AboutSection heading={s.aboutHeading} image={s.aboutImage} number="03" reverse />
      <Testimonials heading={s.reviewsHeading} />
      <FaqSection number="05" />
      <QuoteSection number="06" heading={["Get a Quote", `for ${s.name}`]} />
      <ArticlesPreview />
    </>
  );
}
