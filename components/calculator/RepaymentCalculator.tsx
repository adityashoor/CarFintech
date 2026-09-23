"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Info } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { services, type Service } from "@/lib/content/services";
import { calculateRepayment, type Frequency } from "@/lib/finance/repayments";
import { track } from "@/lib/analytics/track";
import { cn, formatAud } from "@/lib/utils";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

const frequencies: Array<{ value: Frequency; label: string }> = [
  { value: "weekly", label: "Weekly" },
  { value: "fortnightly", label: "Fortnightly" },
  { value: "monthly", label: "Monthly" },
];

const balloons = [0, 0.1, 0.2, 0.3];

function pct(v: number, min: number, max: number) {
  return `${((v - min) / (max - min)) * 100}%`;
}

/**
 * Interactive repayment estimator: the lead magnet. Every figure is indicative
 * and the visitor controls the rate; the CTA hands the inputs to the quote
 * form so nothing is typed twice.
 */
export function RepaymentCalculator({
  defaultSlug = "car-loans",
  tone = "light",
  compact = false,
  className,
  lockType = false,
}: {
  defaultSlug?: string;
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
  lockType?: boolean;
}) {
  const initial = services.find((s) => s.slug === defaultSlug) ?? services[0];
  const [service, setService] = useState<Service>(initial);
  const [amount, setAmount] = useState(initial.calc.default);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(initial.calc.rate);
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [balloon, setBalloon] = useState(0);
  const touched = useRef(false);

  const light = tone === "light"; // "light" = on a dark surface
  const { min, max } = service.calc;

  const result = useMemo(
    () => calculateRepayment({ amount, annualRate: rate, years, frequency, balloonPct: service.calc.balloon ? balloon : 0 }),
    [amount, rate, years, frequency, balloon, service.calc.balloon],
  );

  useEffect(() => {
    if (!touched.current) return;
    const id = window.setTimeout(() => track("calculator_used", { type: service.slug, amount, years, rate, frequency }), 800);
    return () => window.clearTimeout(id);
  }, [service.slug, amount, years, rate, frequency]);

  function pick(s: Service) {
    touched.current = true;
    setService(s);
    setAmount(Math.min(Math.max(s.calc.default, s.calc.min), s.calc.max));
    setRate(s.calc.rate);
    if (!s.calc.balloon) setBalloon(0);
  }

  const quoteHref = `/get-quote?type=${service.slug}&amount=${Math.round(amount)}&term=${years}`;
  const label = cn(light ? "text-white/70" : "text-muted", "text-xs font-medium uppercase tracking-[0.12em] font-numeric");
  const value = cn("font-numeric text-sm font-semibold tabular-nums", light ? "text-white" : "text-ink");

  return (
    <div
      className={cn(
        "relative rounded-2xl p-5 sm:p-6",
        light ? "glass-dark dark-range text-white" : "border border-line bg-surface text-ink shadow-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={label}>Repayment estimate</p>
          <h3 className={cn("mt-1 font-heading text-lg font-bold tracking-tight sm:text-xl", light ? "text-white" : "text-ink")}>Estimate your repayments</h3>
        </div>
        <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", light ? "bg-accent text-white" : "bg-accent-soft text-accent-deep")}>
          <ServiceIcon icon={service.icon} size={20} />
        </span>
      </div>

      {!lockType && (
        <div className="mt-5 -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 contain-inline-size [scrollbar-width:none]" data-lenis-prevent>
          {services.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => pick(s)}
              aria-pressed={s.slug === service.slug}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                s.slug === service.slug
                  ? light
                    ? "border-accent bg-accent text-white"
                    : "border-ink bg-ink text-surface"
                  : light
                    ? "border-white/15 text-white/80 hover:border-white/50"
                    : "border-line text-muted hover:border-ink/40 hover:text-ink",
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      <div className={cn("mt-5 grid grid-cols-1 gap-5", !compact && "sm:grid-cols-2")}>
        <Slider
          id="calc-amount"
          label="Loan amount"
          display={formatAud(amount)}
          min={min}
          max={max}
          step={amount > 200000 ? 5000 : 500}
          value={amount}
          onChange={(v) => {
            touched.current = true;
            setAmount(v);
          }}
          light={light}
          labelClass={label}
          valueClass={value}
        />
        <Slider
          id="calc-years"
          label="Loan term"
          display={`${years} ${years === 1 ? "year" : "years"}`}
          min={1}
          max={7}
          step={1}
          value={years}
          onChange={(v) => {
            touched.current = true;
            setYears(v);
          }}
          light={light}
          labelClass={label}
          valueClass={value}
        />
        <Slider
          id="calc-rate"
          label="Interest rate (indicative)"
          display={`${rate.toFixed(2)}% p.a.`}
          min={4}
          max={20}
          step={0.05}
          value={rate}
          onChange={(v) => {
            touched.current = true;
            setRate(v);
          }}
          light={light}
          labelClass={label}
          valueClass={value}
        />
        <div>
          <div className="flex items-center justify-between">
            <span className={label}>Repayments</span>
          </div>
          <div className={cn("mt-2 grid grid-cols-3 rounded-xl p-1", light ? "bg-white/10" : "bg-bg")}>
            {frequencies.map((f) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={frequency === f.value}
                onClick={() => {
                  touched.current = true;
                  setFrequency(f.value);
                }}
                className={cn(
                  "h-9 rounded-lg text-xs font-semibold transition-all",
                  frequency === f.value ? (light ? "bg-accent text-white shadow" : "bg-ink text-surface shadow") : light ? "text-white/70" : "text-muted",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          {service.calc.balloon && (
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className={cn(label, "normal-case tracking-normal")}>Balloon</span>
              <div className="flex gap-1">
                {balloons.map((b) => (
                  <button
                    key={b}
                    type="button"
                    aria-pressed={balloon === b}
                    onClick={() => {
                      touched.current = true;
                      setBalloon(b);
                    }}
                    className={cn(
                      "h-7 rounded-md px-2 text-[11px] font-semibold transition-colors",
                      balloon === b ? (light ? "bg-white text-dark" : "bg-ink text-surface") : light ? "bg-white/10 text-white/70" : "bg-bg text-muted",
                    )}
                  >
                    {b === 0 ? "None" : `${b * 100}%`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={cn("mt-6 rounded-2xl p-5", light ? "bg-white/[0.06]" : "bg-bg")}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={label}>Estimated {frequency} repayment</p>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={Math.round(result.repayment)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className={cn("mt-1 font-heading text-4xl font-bold tracking-tight tabular-nums sm:text-5xl", light ? "text-white" : "text-ink")}
              >
                {formatAud(result.repayment)}
              </motion.p>
            </AnimatePresence>
          </div>
          <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-1 text-xs", light ? "text-white/60" : "text-muted")}>
            <dt>Total interest</dt>
            <dd className={cn("text-right font-numeric tabular-nums", light ? "text-white" : "text-ink")}>{formatAud(result.totalInterest)}</dd>
            <dt>Total repaid</dt>
            <dd className={cn("text-right font-numeric tabular-nums", light ? "text-white" : "text-ink")}>{formatAud(result.totalRepaid)}</dd>
            {result.balloon > 0 && (
              <>
                <dt>Balloon at end</dt>
                <dd className={cn("text-right font-numeric tabular-nums", light ? "text-white" : "text-ink")}>{formatAud(result.balloon)}</dd>
              </>
            )}
          </dl>
        </div>
        <Link
          href={quoteHref}
          onClick={() => track("calculator_cta_clicked", { type: service.slug, amount, years })}
          className={cn(
            "group mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full font-heading text-sm font-semibold transition-colors",
            light ? "bg-accent text-white hover:bg-accent-deep" : "bg-ink text-surface hover:bg-ink-3",
          )}
        >
          Get my personalised {service.name} quote
          <svg aria-hidden viewBox="0 0 20 20" className="size-4 transition-transform group-hover:translate-x-1">
            <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <p className={cn("mt-3 flex items-start gap-1.5 text-[11px] leading-snug", light ? "text-white/45" : "text-slate")}>
        <Info size={12} className="mt-0.5 shrink-0" />
        Estimates only. Your actual rate, fees and repayments depend on the lender, your credit profile and the asset. This is general information and not financial advice.
      </p>
    </div>
  );
}

function Slider({
  id,
  label,
  display,
  min,
  max,
  step,
  value,
  onChange,
  light,
  labelClass,
  valueClass,
}: {
  id: string;
  label: string;
  display: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  light: boolean;
  labelClass: string;
  valueClass: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        <span className={valueClass}>{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn("mt-2.5", light && "[&::-webkit-slider-thumb]:border-ink")}
        style={{ "--pct": pct(value, min, max), background: light ? `linear-gradient(to right, var(--color-accent) 0 ${pct(value, min, max)}, rgb(255 255 255 / 0.18) ${pct(value, min, max)} 100%)` : undefined } as React.CSSProperties}
        aria-valuetext={display}
      />
    </div>
  );
}
