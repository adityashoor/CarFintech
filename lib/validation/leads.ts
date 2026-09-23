import { z } from "zod";
import { services } from "@/lib/content/services";
import { ASSET_STATUS, CONTACT_PREFERENCES, PURPOSES } from "@/lib/leads/types";

const slugs = services.map((s) => s.slug) as [string, ...string[]];
const auPhone = /^(\+?61|0)[2-478]\d{8}$|^1[38]00\d{6,7}$|^13\d{4}$/;

const name = z.string({ message: "Please enter your name" }).trim().min(2, "Please enter your name").max(120, "That's a bit long");
const email = z.email({ message: "A valid email so we can reach you" });
const phone = z
  .string({ message: "Please enter your phone number" })
  .trim()
  .min(8, "Please enter your phone number")
  .refine((v) => auPhone.test(v.replace(/[\s()-]/g, "")), "Please enter an Australian phone number");
const optionalText = (max: number) => z.string().trim().max(max, "That's a bit long").optional().or(z.literal(""));

/** Shared by the multi-step form (client) and POST /api/quotes (server). */
export const quoteSchema = z.object({
  // Step 1
  loanType: z.enum(slugs, { message: "Choose what you'd like to finance" }),
  // Step 2
  purpose: z.enum(PURPOSES, { message: "Is this for business or personal use?" }),
  amount: z.number({ message: "Enter an amount" }).min(1000, "Minimum amount is $1,000").max(5_000_000, "Please call us for amounts over $5,000,000"),
  termYears: z.number({ message: "Choose a term" }).int().min(1).max(7),
  assetStatus: z.enum(ASSET_STATUS).optional(),
  assetDescription: optionalText(300),
  // Step 3
  businessName: optionalText(120),
  abn: optionalText(20),
  name,
  email,
  phone,
  contactPreference: z.enum(CONTACT_PREFERENCES),
  notes: optionalText(1000),
  consent: z.literal(true, { message: "Please agree to the privacy policy" }),
  // Honeypot: bots fill it, humans never see it.
  website: z.string().optional(),
});
export type QuoteFormValues = z.infer<typeof quoteSchema>;

export const QUOTE_STEPS = [
  { id: "type", title: "What are you financing?", fields: ["loanType"] },
  { id: "details", title: "Loan details", fields: ["purpose", "amount", "termYears", "assetStatus", "assetDescription"] },
  { id: "contact", title: "Your details", fields: ["businessName", "abn", "name", "email", "phone", "contactPreference", "notes", "consent"] },
] as const satisfies ReadonlyArray<{ id: string; title: string; fields: ReadonlyArray<keyof QuoteFormValues> }>;

export const callbackSchema = z.object({
  name,
  phone,
  loanType: z.enum(slugs).optional().or(z.literal("")),
  bestTime: optionalText(40),
  website: z.string().optional(),
});
export type CallbackFormValues = z.infer<typeof callbackSchema>;

export const referralSchema = z.object({
  referrerName: name,
  referrerEmail: email,
  referrerPhone: phone,
  friendName: name,
  friendPhone: phone,
  friendEmail: z.email("A valid email").optional().or(z.literal("")),
  loanType: z.enum(slugs).optional().or(z.literal("")),
  message: optionalText(500),
  consent: z.literal(true, { message: "Please confirm you have their permission" }),
  website: z.string().optional(),
});
export type ReferralFormValues = z.infer<typeof referralSchema>;
