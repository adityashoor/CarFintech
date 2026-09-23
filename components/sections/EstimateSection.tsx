import { Calculator, FileCheck2, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";
import { RepaymentCalculator } from "@/components/calculator/RepaymentCalculator";

const points = [
  { Icon: Calculator, title: "Know your numbers first", text: "Model the amount, term, rate and balloon before you talk to a dealer or a lender." },
  { Icon: FileCheck2, title: "Carry it into your quote", text: "Your inputs pre-fill the quote form, so nothing is typed twice." },
  { Icon: ShieldCheck, title: "No credit check", text: "Estimates are indicative and private. A licensed broker reviews every enquiry." },
];

/** Repayment estimator as its own section: sticky explainer on the left, the tool on the right. */
export function EstimateSection() {
  return (
    <section className="section-y bg-bg" aria-labelledby="estimate-heading" id="estimate">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading number="02" eyebrow="Repayment estimator" title={["See what your", "repayments could look like"]} description="Move the sliders to model a loan in seconds. When the numbers work, request a quote and a broker takes it from there." />
            <ul className="mt-10 space-y-6">
              {points.map(({ Icon, title, text }, i) => (
                <Reveal key={title} delay={0.1 * i}>
                  <li className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface text-accent-deep shadow-card">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-heading font-bold text-ink">{title}</p>
                      <p className="mt-1 text-sm text-muted">{text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <RepaymentCalculator tone="dark" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
