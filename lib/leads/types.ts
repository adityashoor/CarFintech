/**
 * Lead pipeline domain types. The website only creates leads; everything
 * downstream (CRM, email, database) consumes these through lib/leads/service.ts.
 */
export const LEAD_STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "APPLICATION", "APPROVED", "SETTLED", "LOST"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const PURPOSES = ["business", "personal"] as const;
export type Purpose = (typeof PURPOSES)[number];

export const CONTACT_PREFERENCES = ["phone", "email"] as const;
export type ContactPreference = (typeof CONTACT_PREFERENCES)[number];

export const ASSET_STATUS = ["found", "looking", "refinance"] as const;
export type AssetStatus = (typeof ASSET_STATUS)[number];

/** What the multi-step quote form submits. */
export interface QuoteRequest {
  loanType: string;
  purpose: Purpose;
  amount: number;
  termYears: number;
  assetStatus?: AssetStatus;
  assetDescription?: string;
  businessName?: string;
  abn?: string;
  name: string;
  email: string;
  phone: string;
  contactPreference: ContactPreference;
  notes?: string;
}

export interface CallbackRequest {
  name: string;
  phone: string;
  loanType?: string;
  bestTime?: string;
}

export interface ReferralRequest {
  referrerName: string;
  referrerEmail: string;
  referrerPhone: string;
  friendName: string;
  friendPhone: string;
  friendEmail?: string;
  loanType?: string;
  message?: string;
}

interface Base {
  id: string;
  status: LeadStatus;
  createdAt: string;
  source: "website";
  page?: string;
}

export type QuoteLead = Base & { kind: "quote" } & QuoteRequest;
export type CallbackLead = Base & { kind: "callback" } & CallbackRequest;
export type ReferralLead = Base & { kind: "referral" } & ReferralRequest;
export type Lead = QuoteLead | CallbackLead | ReferralLead;
