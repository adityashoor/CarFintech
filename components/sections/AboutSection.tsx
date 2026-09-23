import Image from "next/image";
import { MapPin } from "lucide-react";
import { aboutParagraphs } from "@/lib/content/about";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ScrollTextReveal } from "@/components/animations/ScrollTextReveal";
import { Button } from "@/components/ui/Button";

/**
 * "About Car Fintech": the published paragraphs beside the published photograph.
 * The opening statement brightens word by word as it scrolls into view.
 */
export function AboutSection({
  heading = "About Car Fintech",
  image = "/images/services/about-square.webp",
  number = "05",
  reverse = false,
  cta = true,
}: {
  heading?: string;
  image?: string;
  number?: string;
  reverse?: boolean;
  cta?: boolean;
}) {
  const [lead, ...rest] = aboutParagraphs;
  return (
    <section className="section-y bg-surface" aria-labelledby="about-heading">
      <div className="container-x">
        <SectionHeading number={number} eyebrow="About" title={[heading]} />
        <ScrollTextReveal text={lead} className="mt-8 max-w-4xl font-heading text-xl font-semibold leading-snug tracking-tight md:text-2xl lg:text-[1.75rem]" />
        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className={cn("space-y-5 text-[15px] leading-relaxed text-ink-3 md:text-base lg:col-span-6", reverse && "lg:order-2")}>
            {rest.map((para, i) => (
              <Reveal key={i} delay={0.05 * i} y={16}>
                <p>{para}</p>
              </Reveal>
            ))}
            {cta && (
              <Reveal delay={0.2} className="flex flex-wrap gap-3 pt-3">
                <Button href="/book-appointment">Book Appointment</Button>
                <Button href="/about-us" variant="ghost">
                  Meet the team
                </Button>
              </Reveal>
            )}
          </div>
          <div className={cn("relative lg:col-span-6", reverse && "lg:order-1")}>
            <ImageReveal className="aspect-[4/3] overflow-hidden rounded-2xl" parallax>
              <Image src={image} alt="Car Fintech" fill quality={95} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </ImageReveal>
            <Reveal delay={0.4} className="absolute -bottom-6 left-6 right-6 sm:left-auto sm:right-8 sm:w-72">
              <div className="rounded-xl border border-line bg-surface p-5 shadow-card">
                <p className="eyebrow text-muted">Head office</p>
                <p className="mt-2 flex items-start gap-2 text-sm font-medium text-ink">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-accent-deep" />
                  {site.address.full}
                </p>
                <p className="mt-2 text-xs text-muted">Based in Melbourne, serving clients nationwide.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
