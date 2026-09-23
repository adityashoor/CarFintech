import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { businessServices, consumerServices, type Service } from "@/lib/content/services";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { Reveal } from "@/components/animations/Reveal";
import { Spotlight } from "@/components/animations/Spotlight";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Button } from "@/components/ui/Button";

/**
 * "Our Services" as two fixed, symmetrical groups: four business products in a
 * row of four and six consumer products in two rows of three. Every card
 * shares one anatomy: photograph, icon, name, published line, link.
 */
export function ServicesBento() {
  return (
    <section className="section-y bg-bg" aria-labelledby="services-heading" id="services">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading number="02" eyebrow="Our Services" title={["Finance for every", "vehicle and asset"]} />
          <Button href="/get-quote" variant="outline" className="md:mb-2">
            Get a Quote
          </Button>
        </div>

        <Group
          eyebrow="Business"
          title="Business finance"
          text="For ABN holders, sole traders and companies: vehicles, plant, equipment and working capital."
          items={businessServices}
          columns="lg:grid-cols-4"
          className="mt-14"
        />
        <Group
          eyebrow="Consumer"
          title="Consumer finance"
          text="Personal and lifestyle finance, from your first car to a caravan for the family."
          items={consumerServices}
          columns="lg:grid-cols-3"
          className="mt-16 border-t border-line pt-14"
        />
      </div>
    </section>
  );
}

function Group({ eyebrow, title, text, items, columns, className }: { eyebrow: string; title: string; text: string; items: Service[]; columns: string; className?: string }) {
  return (
    <div className={className}>
      <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-accent-deep">{eyebrow}</p>
          <h3 className="mt-2 font-heading text-title font-bold tracking-tight text-ink">{title}</h3>
        </div>
        <p className="max-w-md text-sm text-muted">{text}</p>
      </Reveal>
      <Stagger className={cn("mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2", columns)} stagger={0.07}>
        {items.map((s) => (
          <StaggerItem key={s.slug} className="h-full">
            <ServiceCard service={s} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function ServiceCard({ service: s }: { service: Service }) {
  return (
    <Spotlight as="article" glow className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-glow">
      <Link href={`/${s.slug}`} className="flex h-full flex-col" aria-label={`${s.name}: see more`}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image src={s.cardImage} alt={`${s.name} Car Fintech`} fill quality={90} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-105" />
          <span className="absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-lg bg-surface/90 text-accent-deep shadow-card backdrop-blur">
            <ServiceIcon icon={s.icon} size={20} />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h4 className="font-heading text-lg font-bold tracking-tight text-ink">{s.name}</h4>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.short}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
            See More
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Spotlight>
  );
}
