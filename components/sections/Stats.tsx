import { lenderCount } from "@/lib/content/lenders";
import { site } from "@/lib/site";
import { NumberTicker } from "@/components/animations/NumberTicker";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { Stars } from "@/components/ui/primitives";

/** Only figures that appear on the published site (rating, review count, logo count, approval window). */
export function Stats() {
  const items = [
    {
      label: `${site.reviews.source} rating`,
      value: <NumberTicker value={5} decimals={1} />,
      sub: <Stars size={12} />,
    },
    { label: "Client reviews", value: <NumberTicker value={site.reviews.count} />, sub: "5-star, verified on Google" },
    { label: "Lenders compared", value: <NumberTicker value={lenderCount} />, sub: "banks, credit unions, specialists" },
    { label: "Typical approval", value: <NumberTicker value={48} prefix="24–" suffix=" hrs" />, sub: "for straightforward applications" },
  ];
  return (
    <div className="border-y border-line bg-surface">
      <Stagger className="container-x grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x" stagger={0.1}>
        {items.map((it) => (
          <StaggerItem key={it.label} className="py-8 md:px-8 md:py-10 first:md:pl-0">
            <p className="eyebrow text-muted">{it.label}</p>
            <p className="mt-2 font-heading text-4xl font-bold tracking-tight text-ink tabular-nums md:text-5xl">{it.value}</p>
            <p className="mt-2 text-xs text-slate">{it.sub}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
