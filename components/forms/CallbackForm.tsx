"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { services } from "@/lib/content/services";
import { track } from "@/lib/analytics/track";
import { cn } from "@/lib/utils";
import { callbackSchema, type CallbackFormValues } from "@/lib/validation/leads";
import { Input, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

/** "Request a Callback": name + phone, posts to /api/callbacks. */
export function CallbackForm({ tone = "dark", defaultSlug, className }: { tone?: "dark" | "light"; defaultSlug?: string; className?: string }) {
  const light = tone === "light";
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState } = useForm<CallbackFormValues>({
    resolver: zodResolver(callbackSchema),
    defaultValues: { loanType: (defaultSlug ?? "") as CallbackFormValues["loanType"], bestTime: "", website: "" },
  });

  async function onSubmit(values: CallbackFormValues) {
    setError(null);
    try {
      const res = await fetch("/api/callbacks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Something went wrong");
      track("callback_submitted", { type: values.loanType || "unspecified" });
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please call us.");
    }
  }

  if (done) {
    return (
      <div className={cn("rounded-2xl p-6 text-center", light ? "bg-white/[0.06] text-white" : "border border-line bg-surface text-ink", className)}>
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-white">
          <Check size={22} strokeWidth={2.5} />
        </span>
        <p className="mt-4 font-heading text-lg font-bold">Thanks, we&apos;ll call you back.</p>
        <p className={cn("mt-1 text-sm", light ? "text-white/60" : "text-muted")}>One of our qualified brokers will be in touch to talk you through the next steps.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn("rounded-2xl p-5", light ? "bg-white/[0.06]" : "border border-line bg-surface", className)} aria-label="Request a callback">
      <p className={cn("font-heading text-lg font-bold tracking-tight", light ? "text-white" : "text-ink")}>Request a Callback</p>
      <p className={cn("mt-1 text-sm", light ? "text-white/60" : "text-muted")}>Have a chat with one of our qualified brokers who will understand your situation and talk you through the next steps.</p>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("website")} />
      <div className="mt-5 grid grid-cols-1 gap-4">
        <Input label="Your name" tone={tone} autoComplete="name" placeholder="Full name" error={formState.errors.name?.message} {...register("name")} />
        <Input label="Phone" tone={tone} type="tel" autoComplete="tel" placeholder="04xx xxx xxx" error={formState.errors.phone?.message} {...register("phone")} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="What is it for?" tone={tone} optional placeholder="Choose" options={services.map((s) => ({ value: s.slug, label: s.name }))} error={formState.errors.loanType?.message} {...register("loanType")} />
          <Select
            label="Best time to call"
            tone={tone}
            optional
            placeholder="Any time"
            options={[
              { value: "morning", label: "Morning" },
              { value: "afternoon", label: "Afternoon" },
              { value: "evening", label: "Early evening" },
            ]}
            {...register("bestTime")}
          />
        </div>
        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}
        <Button type="submit" block magnetic={false} disabled={formState.isSubmitting} arrow={!formState.isSubmitting}>
          {formState.isSubmitting ? (
            <>
              <Loader2 size={16} className="mr-2 inline animate-spin" /> Sending
            </>
          ) : (
            "Request a Callback"
          )}
        </Button>
      </div>
    </form>
  );
}
