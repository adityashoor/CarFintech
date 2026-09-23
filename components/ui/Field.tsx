"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-xl border bg-surface px-4 text-[15px] text-ink placeholder:text-slate transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-ink/40 disabled:opacity-60";
const controlDark = "border-white/15 bg-white/[0.06] text-white placeholder:text-white/40 focus:border-accent/60";

interface Wrap {
  label: string;
  error?: string;
  hint?: string;
  tone?: "dark" | "light";
  className?: string;
  optional?: boolean;
}

function Wrapper({ label, error, hint, tone = "dark", className, optional, children, htmlFor }: Wrap & { children: ReactNode; htmlFor?: string }) {
  const light = tone === "light";
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className={cn("flex items-baseline justify-between text-sm font-medium", light ? "text-white/80" : "text-ink")}>
        <span>{label}</span>
        {optional && <span className={cn("text-xs font-normal", light ? "text-white/40" : "text-slate")}>Optional</span>}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      ) : hint ? (
        <p className={cn("text-xs", light ? "text-white/40" : "text-slate")}>{hint}</p>
      ) : null}
    </div>
  );
}

type InputProps = Wrap & Omit<ComponentPropsWithoutRef<"input">, "className">;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, error, hint, tone = "dark", className, optional, id, ...rest }, ref) {
  const inputId = id ?? rest.name;
  return (
    <Wrapper label={label} error={error} hint={hint} tone={tone} className={className} optional={optional} htmlFor={inputId}>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        className={cn(control, "h-12", tone === "light" ? controlDark : "border-line", error && "border-danger focus:ring-danger/40")}
        {...rest}
      />
    </Wrapper>
  );
});

type TextareaProps = Wrap & Omit<ComponentPropsWithoutRef<"textarea">, "className">;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ label, error, hint, tone = "dark", className, optional, id, ...rest }, ref) {
  const inputId = id ?? rest.name;
  return (
    <Wrapper label={label} error={error} hint={hint} tone={tone} className={className} optional={optional} htmlFor={inputId}>
      <textarea
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        rows={4}
        className={cn(control, "py-3", tone === "light" ? controlDark : "border-line", error && "border-danger focus:ring-danger/40")}
        {...rest}
      />
    </Wrapper>
  );
});

type SelectProps = Wrap & Omit<ComponentPropsWithoutRef<"select">, "className"> & { options: Array<{ value: string; label: string }>; placeholder?: string };

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ label, error, hint, tone = "dark", className, optional, id, options, placeholder, ...rest }, ref) {
  const inputId = id ?? rest.name;
  return (
    <Wrapper label={label} error={error} hint={hint} tone={tone} className={className} optional={optional} htmlFor={inputId}>
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          className={cn(control, "h-12 appearance-none pr-10", tone === "light" ? controlDark : "border-line", error && "border-danger focus:ring-danger/40")}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value} className="text-ink">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className={cn("pointer-events-none absolute right-4 top-1/2 -translate-y-1/2", tone === "light" ? "text-white/50" : "text-slate")} />
      </div>
    </Wrapper>
  );
});

/** Pill-style choice group (asset type, purpose, frequency). */
export function ChoiceGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  tone = "dark",
  error,
  columns = 2,
}: {
  label: string;
  options: Array<{ value: T; label: string; icon?: ReactNode; hint?: string }>;
  value?: T;
  onChange: (v: T) => void;
  tone?: "dark" | "light";
  error?: string;
  columns?: 2 | 3;
}) {
  const light = tone === "light";
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className={cn("mb-2 text-sm font-medium", light ? "text-white/80" : "text-ink")}>{label}</legend>
      <div className={cn("grid grid-cols-1 gap-2", columns === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2")}>
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              aria-pressed={active}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                light
                  ? active
                    ? "border-accent bg-accent text-white shadow-glow"
                    : "border-white/15 bg-white/[0.04] text-white hover:border-white/40"
                  : active
                    ? "border-ink bg-ink text-surface"
                    : "border-line bg-surface text-ink hover:border-ink/40",
              )}
            >
              {o.icon && <span className={cn("shrink-0", active ? "" : light ? "text-accent-bright" : "text-slate")}>{o.icon}</span>}
              <span className="flex flex-col">
                <span>{o.label}</span>
                {o.hint && <span className={cn("text-xs font-normal", active ? "opacity-70" : light ? "text-white/40" : "text-slate")}>{o.hint}</span>}
              </span>
            </button>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}
