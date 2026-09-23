import type { ElementType, ReactNode } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";

export function Container({ as: Tag = "div", className, children, id }: { as?: ElementType; className?: string; children: ReactNode; id?: string }) {
  return (
    <Tag id={id} className={cn("container-x", className)}>
      {children}
    </Tag>
  );
}

/** Small numeric label above a heading: "01 — SERVICES". */
export function Eyebrow({ number, children, className, tone = "dark" }: { number?: string; children: ReactNode; className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-3", tone === "light" ? "text-white/70" : "text-muted", className)}>
      {number && (
        <>
          <span className={tone === "light" ? "text-accent-bright" : "text-ink"}>{number}</span>
          <span aria-hidden className="h-px w-6 bg-current opacity-40" />
        </>
      )}
      <span>{children}</span>
    </span>
  );
}

interface HeadingProps {
  number?: string;
  eyebrow?: string;
  /** One string per line, revealed independently. */
  title: string[];
  description?: ReactNode;
  size?: "display" | "display-sm" | "display-xl" | "title";
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({ number, eyebrow, title, description, size = "display-sm", align = "left", tone = "dark", className, as = "h2" }: HeadingProps) {
  return (
    <div className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal y={12} className="mb-5">
          <Eyebrow number={number} tone={tone}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <TextReveal
        as={as}
        lines={title}
        className={cn(
          "font-heading font-bold tracking-tight",
          tone === "light" ? "text-white" : "text-ink",
          size === "display-xl" && "text-display-xl",
          size === "display" && "text-display",
          size === "display-sm" && "text-display-sm",
          size === "title" && "text-title",
        )}
      />
      {description && (
        <Reveal delay={0.25} className={cn("mt-6 max-w-2xl text-lg leading-relaxed", tone === "light" ? "text-white/70" : "text-muted", align === "center" && "mx-auto")}>
          {description}
        </Reveal>
      )}
    </div>
  );
}

export function Badge({ children, className, tone = "dark" }: { children: ReactNode; className?: string; tone?: "dark" | "light" | "accent" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-numeric text-[11px] font-medium uppercase tracking-[0.14em]",
        tone === "dark" && "border-ink/10 bg-surface text-ink",
        tone === "light" && "border-white/15 bg-white/10 text-white",
        tone === "accent" && "border-accent/40 bg-accent/15 text-accent-bright",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Stars({ className, size = 14 }: { className?: string; size?: number }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-star", className)} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

const palette = ["bg-ink text-surface", "bg-slate text-white", "bg-accent text-white", "bg-ink-3 text-surface", "bg-slate-3 text-ink", "bg-accent-soft text-ink"];

export function Avatar({ name, className, index = 0 }: { name: string; className?: string; index?: number }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
  return (
    <span className={cn("inline-flex size-11 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold", palette[index % palette.length], className)} aria-hidden>
      {initials}
    </span>
  );
}
