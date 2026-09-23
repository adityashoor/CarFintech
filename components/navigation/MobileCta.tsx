"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics/track";

/** Sticky bottom bar on phones: call + quote. Hidden on the quote page itself. */
export function MobileCta() {
  const pathname = usePathname();
  if (pathname === "/get-quote") return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 md:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <div className="flex gap-2 rounded-2xl border border-line bg-surface/95 p-2 shadow-card backdrop-blur-md">
        <a
          href={`tel:${site.phone.tel}`}
          onClick={() => track("phone_clicked", { location: "mobile_sticky" })}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-ink/15 bg-surface text-sm font-semibold text-ink"
        >
          <Phone size={16} /> Call Us
        </a>
        <Link href="/get-quote" className="flex h-12 flex-[1.4] items-center justify-center rounded-xl bg-accent text-sm font-semibold text-white">
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
