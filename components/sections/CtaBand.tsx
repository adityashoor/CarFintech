import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { PhoneLink } from "@/components/ui/PhoneLink";

/** Full-width conversion band. Defaults to the published "Ready to chat…" line. */
export function CtaBand({
  title = ["Ready to chat with", "the team at Car Fintech?"],
  text = "Have a chat with one of our qualified brokers who will understand your situation and talk you through the next steps.",
  primary = { href: "/book-appointment", label: "Book Appointment" },
  secondary = { href: "/get-quote", label: "Get a Quote" },
  tone = "accent",
}: {
  title?: string[];
  text?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
  tone?: "accent" | "dark";
}) {
  const accent = tone === "accent";
  return (
    <section className={cn("relative overflow-hidden", accent ? "bg-accent text-white" : "bg-dark text-white")}>
      <div className={cn("pointer-events-none absolute inset-0", accent ? "grid-bg mask-radial opacity-40" : "grid-bg mask-radial opacity-60")} aria-hidden />
      <div className="container-x relative flex flex-col gap-10 py-20 md:py-24 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <TextReveal as="h2" lines={title} className="font-heading text-display-sm font-bold tracking-tight" />
          <Reveal delay={0.2} className={cn("mt-5 max-w-lg text-base leading-relaxed md:text-lg", accent ? "text-white/80" : "text-white/70")}>
            <p>{text}</p>
          </Reveal>
        </div>
        <Reveal delay={0.3} className="flex flex-col items-start gap-4 lg:items-end">
          <div className="flex flex-wrap gap-3">
            <Button href={primary.href} variant={accent ? "inverse" : "primary"} size="lg">
              {primary.label}
            </Button>
            {secondary && (
              <Button href={secondary.href} variant="outline-light" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
          <p className={cn("text-sm", accent ? "text-white/70" : "text-white/50")}>
            Or call us on <PhoneLink location="cta_band" className="font-semibold underline underline-offset-4" /> · {site.address.city}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
