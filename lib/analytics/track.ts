/**
 * Conversion events. One call site, many sinks: GA4 via gtag, GTM via
 * dataLayer. Meta Pixel / Clarity can be added here without touching components.
 */
export type AnalyticsEvent =
  | "quote_started"
  | "quote_step_completed"
  | "quote_completed"
  | "calculator_used"
  | "calculator_cta_clicked"
  | "phone_clicked"
  | "email_clicked"
  | "appointment_viewed"
  | "callback_submitted"
  | "referral_submitted"
  | "service_viewed";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, props: Props = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...props });
  window.gtag?.("event", event, props);
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, props);
  }
}
