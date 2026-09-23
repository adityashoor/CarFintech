"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CalendarCheck, Check, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { services } from "@/lib/content/services";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics/track";
import { cn, EASE_OUT_EXPO, formatAud } from "@/lib/utils";
import { QUOTE_STEPS, quoteSchema, type QuoteFormValues } from "@/lib/validation/leads";
import { ChoiceGroup, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { PhoneLink } from "@/components/ui/PhoneLink";

type Step = (typeof QUOTE_STEPS)[number];

/**
 * Multi-step quote request. Validates per step with the same Zod schema the
 * API uses, prefills from the calculator's query string, and posts to
 * /api/quotes. Dark by default (it sits on the ink surface).
 */
export function QuoteForm({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const params = useSearchParams();
  const light = tone === "light";
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [done, setDone] = useState<{ id: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const prefillType = params.get("type") ?? "";
  const prefillAmount = Number(params.get("amount")) || 0;
  const prefillTerm = Number(params.get("term")) || 5;
  const prefillService = services.find((s) => s.slug === prefillType);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    defaultValues: {
      loanType: (prefillService?.slug ?? "") as QuoteFormValues["loanType"],
      purpose: prefillService?.category === "business" ? "business" : prefillService ? "personal" : undefined,
      amount: prefillAmount || (prefillService?.calc.default ?? 30000),
      termYears: Math.min(7, Math.max(1, prefillTerm)),
      assetDescription: "",
      businessName: "",
      abn: "",
      name: "",
      email: "",
      phone: "",
      contactPreference: "phone",
      notes: "",
      consent: undefined as unknown as true,
      website: "",
    },
  });
  const { control, register, handleSubmit, trigger, watch, formState, setValue, clearErrors } = form;
  const loanType = watch("loanType");
  const purpose = watch("purpose");
  const amount = watch("amount");
  const service = useMemo(() => services.find((s) => s.slug === loanType), [loanType]);
  // Errors are surfaced only for steps the visitor has tried to leave, fields they touched, or after a submit attempt.
  const [attempted, setAttempted] = useState(-1);
  const fieldStep = (name: keyof QuoteFormValues) => QUOTE_STEPS.findIndex((s) => (s.fields as readonly string[]).includes(name));
  const err = (name: keyof QuoteFormValues): string | undefined => {
    const m = formState.errors[name]?.message;
    if (!m) return undefined;
    const touched = Boolean(formState.touchedFields[name]);
    return touched || formState.submitCount > 0 || fieldStep(name) <= attempted ? String(m) : undefined;
  };

  useEffect(() => {
    track("quote_started", { prefilled: !!prefillService });
    if (prefillService) setStep(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function next() {
    const current: Step = QUOTE_STEPS[step];
    setAttempted((a) => Math.max(a, step));
    const ok = await trigger(current.fields as unknown as Array<keyof QuoteFormValues>, { shouldFocus: true });
    if (!ok) return;
    track("quote_step_completed", { step: current.id });
    setDirection(1);
    setStep((s) => Math.min(s + 1, QUOTE_STEPS.length - 1));
  }
  function back() {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  }

  async function onSubmit(values: QuoteFormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/quotes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Something went wrong");
      track("quote_completed", { type: values.loanType, purpose: values.purpose, amount: values.amount });
      setDone({ id: json.lead.id });
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Something went wrong. Please call us.");
    }
  }

  const progress = ((step + 1) / QUOTE_STEPS.length) * 100;
  const shell = cn("rounded-2xl p-6 sm:p-8", light ? "glass-dark text-white" : "border border-line bg-surface text-ink shadow-card", className);

  if (done) {
    return (
      <div className={shell}>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE_OUT_EXPO }} className="text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent text-white">
            <Check size={30} strokeWidth={2.5} />
          </span>
          <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight sm:text-3xl">Thanks, we&apos;ve got your details.</h3>
          <p className={cn("mt-3", light ? "text-white/70" : "text-muted")}>
            One of our qualified brokers will be in touch shortly to understand your situation and talk you through the next steps.
          </p>
          <p className={cn("mt-4 font-numeric text-xs uppercase tracking-widest", light ? "text-white/50" : "text-slate")}>Reference {done.id}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/book-appointment" arrow={false}>
              <CalendarCheck size={16} className="mr-2 inline" /> Book Appointment
            </Button>
            <Button href="/" variant={light ? "outline-light" : "outline"}>
              Back to home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const label = (i: number) => QUOTE_STEPS[i].title;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={shell} aria-label="Get a quote">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4">
        <ol className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium">
          {QUOTE_STEPS.map((s, i) => (
            <li key={s.id} className={cn("flex items-center gap-2", i === step ? (light ? "text-accent-bright" : "text-ink") : light ? "text-white/40" : "text-slate")}>
              <span className={cn("flex size-5 items-center justify-center rounded-full font-numeric text-[10px]", i < step ? "bg-accent text-white" : i === step ? (light ? "bg-white text-dark" : "bg-ink text-surface") : light ? "bg-white/10" : "bg-line")}>
                {i < step ? <Check size={11} strokeWidth={3} /> : i + 1}
              </span>
              <span className="hidden sm:inline">{label(i)}</span>
            </li>
          ))}
        </ol>
        <span className={cn("font-numeric text-xs", light ? "text-white/50" : "text-slate")}>
          {step + 1}/{QUOTE_STEPS.length}
        </span>
      </div>
      <div className={cn("mt-3 h-1 overflow-hidden rounded-full", light ? "bg-white/10" : "bg-line")}>
        <motion.div className="h-full bg-accent" animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: EASE_OUT_EXPO }} />
      </div>

      {/* Honeypot */}
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("website")} />

      <div className="relative mt-8 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          >
            <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">{label(step)}</h3>

            {step === 0 && (
              <div className="mt-6">
                <Controller
                  control={control}
                  name="loanType"
                  render={({ field }) => (
                    <ChoiceGroup
                      label="Choose the closest match"
                      tone={tone}
                      columns={2}
                      value={field.value}
                      error={err("loanType")}
                      onChange={(v) => {
                        field.onChange(v);
                        clearErrors("loanType");
                        const s = services.find((x) => x.slug === v);
                        if (s) {
                          setValue("purpose", s.category === "business" ? "business" : "personal");
                          if (!prefillAmount) setValue("amount", s.calc.default);
                        }
                      }}
                      options={services.map((s) => ({ value: s.slug, label: s.name, icon: <ServiceIcon icon={s.icon} size={20} />, hint: s.category === "business" ? "Business" : "Consumer" }))}
                    />
                  )}
                />
              </div>
            )}

            {step === 1 && (
              <div className="mt-6 grid grid-cols-1 gap-5">
                <Controller
                  control={control}
                  name="purpose"
                  render={({ field }) => (
                    <ChoiceGroup
                      label="Is this for business or personal use?"
                      tone={tone}
                      value={field.value}
                      onChange={(v) => {
                        field.onChange(v);
                        clearErrors("purpose");
                      }}
                      error={err("purpose")}
                      options={[
                        { value: "business", label: "Business", hint: "ABN holders, sole traders, companies" },
                        { value: "personal", label: "Personal", hint: "PAYG and personal use" },
                      ]}
                    />
                  )}
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input
                    label="How much would you like to borrow?"
                    tone={tone}
                    type="number"
                    inputMode="numeric"
                    min={1000}
                    step={500}
                    placeholder="e.g. 35000"
                    hint={amount ? `About ${formatAud(Number(amount))}` : undefined}
                    error={err("amount")}
                    {...register("amount", { valueAsNumber: true })}
                  />
                  <Select
                    label="Preferred loan term"
                    tone={tone}
                    error={err("termYears")}
                    options={[1, 2, 3, 4, 5, 6, 7].map((y) => ({ value: String(y), label: `${y} ${y === 1 ? "year" : "years"}` }))}
                    {...register("termYears", { valueAsNumber: true })}
                  />
                </div>
                <Controller
                  control={control}
                  name="assetStatus"
                  render={({ field }) => (
                    <ChoiceGroup
                      label="Where are you up to?"
                      tone={tone}
                      columns={3}
                      value={field.value}
                      onChange={field.onChange}
                      options={[
                        { value: "found", label: "Found it", hint: "I know what I'm buying" },
                        { value: "looking", label: "Still looking", hint: "Want pre-approval" },
                        { value: "refinance", label: "Refinancing", hint: "Existing loan" },
                      ]}
                    />
                  )}
                />
                <Input
                  label={service ? `Tell us about the ${service.name.toLowerCase().replace(/ loans?| finance/g, "")} you have in mind` : "Tell us about the asset"}
                  tone={tone}
                  optional
                  placeholder="e.g. 2023 Toyota HiLux SR5, private sale"
                  error={err("assetDescription")}
                  {...register("assetDescription")}
                />
              </div>
            )}

            {step === 2 && (
              <div className="mt-6 grid grid-cols-1 gap-5">
                {purpose === "business" && (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Input label="Business name" tone={tone} optional placeholder="Your trading name" error={err("businessName")} {...register("businessName")} />
                    <Input label="ABN" tone={tone} optional inputMode="numeric" placeholder="11 digits" error={err("abn")} {...register("abn")} />
                  </div>
                )}
                <Input label="Your name" tone={tone} autoComplete="name" placeholder="Full name" error={err("name")} {...register("name")} />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input label="Email" tone={tone} type="email" autoComplete="email" placeholder="you@example.com" error={err("email")} {...register("email")} />
                  <Input label="Phone" tone={tone} type="tel" autoComplete="tel" placeholder="04xx xxx xxx" error={err("phone")} {...register("phone")} />
                </div>
                <Controller
                  control={control}
                  name="contactPreference"
                  render={({ field }) => (
                    <ChoiceGroup
                      label="How should we contact you?"
                      tone={tone}
                      value={field.value}
                      onChange={field.onChange}
                      options={[
                        { value: "phone", label: "Call me", hint: "Fastest" },
                        { value: "email", label: "Email me" },
                      ]}
                    />
                  )}
                />
                <Textarea label="Anything else we should know?" tone={tone} optional placeholder="Credit history, timing, trade-in, anything that helps us find the right lender." error={err("notes")} {...register("notes")} />
                <label className={cn("flex items-start gap-3 text-sm", light ? "text-white/75" : "text-muted")}>
                  <input type="checkbox" className="mt-1 size-4 accent-[#718093]" {...register("consent")} />
                  <span>
                    I agree to Car Fintech contacting me about my enquiry and I have read the{" "}
                    <Link href="/privacy-policy" className={cn("underline underline-offset-2", light ? "text-white" : "text-ink")}>
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {err("consent") && (
                  <p role="alert" className="-mt-3 text-xs text-danger">
                    {err("consent")}
                  </p>
                )}
                {serverError && (
                  <p role="alert" className="rounded-xl border border-danger/40 bg-danger/10 p-3 text-sm text-danger">
                    {serverError}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className={cn("flex items-center gap-2 text-xs", light ? "text-white/45" : "text-slate")}>
          <ShieldCheck size={14} className="shrink-0" />
          No credit check at this stage. No obligation.
        </div>
        <div className="flex gap-2">
          {step > 0 && (
            <button type="button" onClick={back} className={cn("inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold", light ? "text-white/80 hover:text-white" : "text-muted hover:text-ink")}>
              <ArrowLeft size={16} /> Back
            </button>
          )}
          {step < QUOTE_STEPS.length - 1 ? (
            <Button key="continue" type="button" onClick={next} size="lg" magnetic={false}>
              Continue
            </Button>
          ) : (
            <Button key="submit" type="submit" size="lg" magnetic={false} disabled={formState.isSubmitting} arrow={!formState.isSubmitting}>
              {formState.isSubmitting ? (
                <>
                  <Loader2 size={16} className="mr-2 inline animate-spin" /> Sending
                </>
              ) : (
                "Request my quote"
              )}
            </Button>
          )}
        </div>
      </div>
      <p className={cn("mt-5 text-center text-xs sm:text-left", light ? "text-white/40" : "text-slate")}>
        Prefer to talk? Call us on <PhoneLink location="quote_form" className={cn("font-semibold", light ? "text-white/80" : "text-ink")} />, {site.address.city}.
      </p>
    </form>
  );
}
