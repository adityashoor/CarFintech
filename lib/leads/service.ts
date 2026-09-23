import type { CallbackLead, CallbackRequest, QuoteLead, QuoteRequest, ReferralLead, ReferralRequest } from "./types";

/**
 * Abstraction between the website and whatever ends up storing leads.
 * Route handlers only ever talk to this interface, so swapping console for a
 * database, HubSpot or an email relay never touches the frontend.
 */
export interface LeadService {
  createQuote(data: QuoteRequest, page?: string): Promise<QuoteLead>;
  createCallback(data: CallbackRequest, page?: string): Promise<CallbackLead>;
  createReferral(data: ReferralRequest, page?: string): Promise<ReferralLead>;
}

/** Customer-facing reference, e.g. CF-2026-4F3A9C. */
export function generateLeadId(prefix = "CF", now = new Date()): string {
  const rand = crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
  return `${prefix}-${now.getUTCFullYear()}-${rand}`;
}

function base(prefix: string, page?: string) {
  const now = new Date();
  return { id: generateLeadId(prefix, now), status: "NEW" as const, createdAt: now.toISOString(), source: "website" as const, page };
}

/** Default implementation: logs to the server console. Proves the pipeline end to end. */
export class ConsoleLeadService implements LeadService {
  async createQuote(data: QuoteRequest, page?: string): Promise<QuoteLead> {
    const lead: QuoteLead = { kind: "quote", ...base("CF", page), ...data };
    console.info("[leads] quote", JSON.stringify(lead));
    return lead;
  }
  async createCallback(data: CallbackRequest, page?: string): Promise<CallbackLead> {
    const lead: CallbackLead = { kind: "callback", ...base("CB", page), ...data };
    console.info("[leads] callback", JSON.stringify(lead));
    return lead;
  }
  async createReferral(data: ReferralRequest, page?: string): Promise<ReferralLead> {
    const lead: ReferralLead = { kind: "referral", ...base("RF", page), ...data };
    console.info("[leads] referral", JSON.stringify(lead));
    return lead;
  }
}

let instance: LeadService | undefined;

/** Factory. LEAD_SERVICE selects the backend without touching call sites. */
export function getLeadService(): LeadService {
  if (instance) return instance;
  switch (process.env.LEAD_SERVICE) {
    // case "database": instance = new DatabaseLeadService(); break;
    // case "hubspot":  instance = new HubspotLeadService();  break;
    // case "email":    instance = new EmailLeadService();    break;
    case "console":
    default:
      instance = new ConsoleLeadService();
  }
  return instance;
}
