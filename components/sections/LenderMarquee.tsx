import { lenders, lenderCount } from "@/lib/content/lenders";
import { Marquee } from "@/components/animations/Marquee";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";
import { LogoTile } from "@/components/ui/LogoTile";

/** "We work with Australia's biggest lenders": two counter-rotating rows of the published lender logos. */
export function LenderMarquee({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  const half = Math.ceil(lenders.length / 2);
  const rowA = lenders.slice(0, half);
  const rowB = lenders.slice(half);
  return (
    <section className={cn(dark ? "bg-dark text-white" : "bg-bg", compact ? "py-14" : "section-y")} aria-labelledby="lenders-heading">
      <div className="container-x">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className={cn("eyebrow mb-3", dark ? "text-accent-bright" : "text-muted")}>Lender network</p>
            <h2 id="lenders-heading" className={cn("font-heading text-display-sm font-bold tracking-tight", dark ? "text-white" : "text-ink")}>
              We work with Australia&apos;s biggest lenders
            </h2>
          </div>
          <p className={cn("max-w-sm text-sm leading-relaxed", dark ? "text-white/60" : "text-muted")}>
            {lenderCount} banks, credit unions and specialist finance providers, compared for you in one application.
          </p>
        </Reveal>
      </div>
      <div className="space-y-4 py-3 mask-fade-x">
        <Marquee duration={70} gap="1rem">
          {rowA.map((l) => (
            <LogoTile key={l.name} {...l} dark={dark} />
          ))}
        </Marquee>
        <Marquee duration={80} reverse gap="1rem">
          {rowB.map((l) => (
            <LogoTile key={l.name} {...l} dark={dark} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
