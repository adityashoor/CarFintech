"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { track } from "@/lib/analytics/track";
import { cn } from "@/lib/utils";

/**
 * The same Calendly event the original site embeds (calendly.com/carfintech-admin/30min),
 * loaded as a direct iframe with the event header hidden, sized so the calendar
 * and time slots fit without an inner scrollbar, in the brand colours.
 */
export function CalendlyEmbed({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    track("appointment_viewed");
  }, []);
  const src = `${url}?hide_gdpr_banner=1&hide_event_type_details=1&hide_landing_page_details=1&background_color=ffffff&text_color=0f1519&primary_color=718093`;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-[#f2f2f2] shadow-card">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-muted" aria-live="polite">
          <Loader2 size={22} className="animate-spin text-accent-deep" />
          Loading available times
        </div>
      )}
      <iframe
        src={src}
        title="Book an appointment with Car Fintech"
        onLoad={() => setLoaded(true)}
        className={cn("block w-full transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0")}
        style={{ height: "clamp(720px, 96vh, 880px)" }}
        loading="eager"
        allow="payment"
      />
      <noscript>
        <a href={url} className="block p-8 text-center underline">
          Open the booking calendar
        </a>
      </noscript>
    </div>
  );
}
