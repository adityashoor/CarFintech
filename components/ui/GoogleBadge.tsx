import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Stars } from "./primitives";

/** "5.0 from 26 reviews" pill, the figures exactly as published. */
export function GoogleBadge({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <span className={cn("inline-flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-4", light ? "border-white/15 bg-white/10 text-white" : "border-ink/10 bg-surface text-ink", className)}>
      <span className="flex size-7 items-center justify-center rounded-full bg-white shadow-sm" aria-hidden>
        <GoogleG />
      </span>
      <span className="flex items-center gap-2 text-sm">
        <span className="font-heading font-bold">{site.reviews.rating}</span>
        <Stars size={12} />
        <span className={light ? "text-white/70" : "text-muted"}>from {site.reviews.count} reviews</span>
      </span>
    </span>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.2v3.1C3.2 21.3 7.3 24 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3c-.5-1.5-.5-3.1 0-4.6V6.6H1.2c-1.6 3.3-1.6 7.5 0 10.8l4.1-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.1 15.1 0 12 0 7.3 0 3.2 2.7 1.2 6.6l4.1 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
    </svg>
  );
}
