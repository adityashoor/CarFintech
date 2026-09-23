"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Gift, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { services } from "@/lib/content/services";
import { track } from "@/lib/analytics/track";
import { referralSchema, type ReferralFormValues } from "@/lib/validation/leads";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

/** "Refer a Client": your details + theirs, posts to /api/referrals. */
export function ReferralForm() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState } = useForm<ReferralFormValues>({
    resolver: zodResolver(referralSchema),
    defaultValues: { loanType: "", friendEmail: "", message: "", website: "", consent: undefined as unknown as true },
  });

  async function onSubmit(values: ReferralFormValues) {
    setError(null);
    try {
      const res = await fetch("/api/referrals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Something went wrong");
      track("referral_submitted", { type: values.loanType || "unspecified" });
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please call us.");
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 text-center shadow-card">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent text-white">
          <Check size={26} strokeWidth={2.5} />
        </span>
        <h3 className="mt-5 font-heading text-2xl font-bold tracking-tight text-ink">Thanks for the referral.</h3>
        <p className="mt-2 text-muted">We&apos;ll reach out to them shortly. Once the loan is settled, we&apos;ll send you a $200 gift card.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8" aria-label="Refer a client">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
          <Gift size={20} />
        </span>
        <div>
          <p className="font-heading text-xl font-bold tracking-tight text-ink">Refer a Client</p>
          <p className="text-sm text-muted">Enter their details for us to reach out.</p>
        </div>
      </div>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("website")} />

      <fieldset className="mt-7">
        <legend className="eyebrow mb-4 text-muted">Your details</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input label="Your name" placeholder="Full name" autoComplete="name" error={formState.errors.referrerName?.message} {...register("referrerName")} />
          <Input label="Your email" type="email" autoComplete="email" placeholder="you@example.com" error={formState.errors.referrerEmail?.message} {...register("referrerEmail")} />
          <Input label="Your phone" type="tel" autoComplete="tel" placeholder="04xx xxx xxx" error={formState.errors.referrerPhone?.message} {...register("referrerPhone")} />
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="eyebrow mb-4 text-muted">Who are you referring?</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input label="Their name" placeholder="Full name" error={formState.errors.friendName?.message} {...register("friendName")} />
          <Input label="Their phone" type="tel" placeholder="04xx xxx xxx" error={formState.errors.friendPhone?.message} {...register("friendPhone")} />
          <Input label="Their email" type="email" optional placeholder="them@example.com" error={formState.errors.friendEmail?.message} {...register("friendEmail")} />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <Select label="What do they need?" optional placeholder="Choose a loan type" options={services.map((s) => ({ value: s.slug, label: s.name }))} error={formState.errors.loanType?.message} {...register("loanType")} />
          <Textarea label="Anything we should know?" optional placeholder="Timing, what they're buying, best way to reach them." error={formState.errors.message?.message} {...register("message")} />
        </div>
      </fieldset>

      <label className="mt-6 flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" className="mt-1 size-4 accent-[#718093]" {...register("consent")} />
        <span>
          I have their permission to share their details and I have read the{" "}
          <Link href="/privacy-policy" className="text-ink underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {formState.errors.consent && (
        <p role="alert" className="mt-2 text-xs text-danger">
          {formState.errors.consent.message}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-4 text-sm text-danger">
          {error}
        </p>
      )}
      <Button type="submit" size="lg" className="mt-7" magnetic={false} disabled={formState.isSubmitting} arrow={!formState.isSubmitting}>
        {formState.isSubmitting ? (
          <>
            <Loader2 size={16} className="mr-2 inline animate-spin" /> Sending
          </>
        ) : (
          "Send referral"
        )}
      </Button>
    </form>
  );
}
