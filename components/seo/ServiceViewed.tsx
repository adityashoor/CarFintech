"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/track";

/** Fires the service_viewed conversion event once per page view. */
export function ServiceViewed({ slug }: { slug: string }) {
  useEffect(() => {
    track("service_viewed", { service: slug });
  }, [slug]);
  return null;
}
