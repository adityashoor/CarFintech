import type { Metadata } from "next";
import { site } from "@/lib/site";
import { team } from "@/lib/content/team";
import { DirectorProfile } from "@/components/sections/DirectorProfile";
import { LenderMarquee } from "@/components/sections/LenderMarquee";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Chirag Babbar",
  description: "At Car Fintech, we're Asset Finance Brokers helping clients Australia-wide get a new Loan or refinance an existing Home or Investment Loan",
  alternates: { canonical: `${site.url}/chirag-babbar` },
};

const chirag = team.find((m) => m.slug === "chirag-babbar")!;

export default function ChiragPage() {
  return (
    <>
      <DirectorProfile member={chirag} />
      <LenderMarquee compact />
      <CtaBand tone="dark" title={["Ready to chat with", "the team at Car Fintech?"]} />
    </>
  );
}
