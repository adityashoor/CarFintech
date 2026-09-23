import type { Metadata } from "next";
import { CalendarX2 } from "lucide-react";

export const metadata: Metadata = { title: "Preview ended", robots: { index: false, follow: false } };

/** Shown by the proxy once DEMO_EXPIRES has passed. */
export default function DemoExpiredPage() {
  return (
    <section className="flex min-h-[80vh] items-center bg-bg">
      <div className="container-x py-32 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
          <CalendarX2 size={22} />
        </span>
        <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight text-ink">This design preview has ended.</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">The evaluation period for this preview is over. Please contact the designer to arrange the next step.</p>
      </div>
    </section>
  );
}
