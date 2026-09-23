"use client";

import { useState } from "react";
import { Calculator, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";
import { RepaymentCalculator } from "@/components/calculator/RepaymentCalculator";
import { CallbackForm } from "@/components/forms/CallbackForm";
import { Reveal } from "@/components/animations/Reveal";

/** Sticky rail on service pages: estimate repayments or request a callback. */
export function SideCard({ slug }: { slug: string }) {
  const [tab, setTab] = useState<"calc" | "callback">("calc");
  return (
    <Reveal delay={0.2}>
      <div className="rounded-2xl bg-dark p-2 text-white shadow-card">
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-white/5 p-1" role="tablist">
          {[
            { id: "calc" as const, label: "Estimate repayments", Icon: Calculator },
            { id: "callback" as const, label: "Request a Callback", Icon: PhoneCall },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn("flex h-10 items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-all", tab === id ? "bg-accent text-white shadow" : "text-white/70 hover:text-white")}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>
        <div className="p-2 pt-3">
          {tab === "calc" ? <RepaymentCalculator tone="light" compact defaultSlug={slug} lockType className="rounded-2xl" /> : <CallbackForm tone="light" defaultSlug={slug} />}
        </div>
      </div>
    </Reveal>
  );
}
