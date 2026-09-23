"use client";

import { site } from "@/lib/site";
import { track } from "@/lib/analytics/track";

/** tel: link that reports a phone_clicked conversion. */
export function PhoneLink({ location, label, className }: { location: string; label?: string; className?: string }) {
  return (
    <a href={`tel:${site.phone.tel}`} className={className} onClick={() => track("phone_clicked", { location })}>
      {label ?? site.phone.display}
    </a>
  );
}
