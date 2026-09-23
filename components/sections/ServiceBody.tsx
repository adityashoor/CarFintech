import type { ContentBlock } from "@/lib/content/services";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Eyebrow } from "@/components/ui/primitives";
import { SideCard } from "@/components/sections/SideCard";

export function Blocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-brand">
      {blocks.map((b, i) => {
        if (b.type === "h") return <h3 key={i}>{b.text}</h3>;
        if (b.type === "list")
          return (
            <ul key={i}>
              {b.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          );
        return <p key={i}>{b.text}</p>;
      })}
    </div>
  );
}

/**
 * Long-form service copy with a sticky conversion rail: the repayment
 * estimator pre-set for this product and a callback form.
 */
export function ServiceBody({ heading, blocks, slug, eyebrow = "Overview" }: { heading: string; blocks: ContentBlock[]; slug: string; eyebrow?: string }) {
  return (
    <section className="section-y bg-surface" aria-labelledby="overview-heading">
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal y={12} className="mb-5">
            <Eyebrow number="01">{eyebrow}</Eyebrow>
          </Reveal>
          <TextReveal as="h2" lines={[heading]} className="font-heading text-display-sm font-bold tracking-tight text-ink" />
          <Reveal delay={0.15} className="mt-6 max-w-3xl">
            <Blocks blocks={blocks} />
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SideCard slug={slug} />
          </div>
        </div>
      </div>
    </section>
  );
}
