/**
 * Standard amortising-loan maths. Indicative only; the UI must always say so.
 */
export type Frequency = "weekly" | "fortnightly" | "monthly";

export const PERIODS_PER_YEAR: Record<Frequency, number> = {
  weekly: 52,
  fortnightly: 26,
  monthly: 12,
};

export interface RepaymentInput {
  amount: number;
  /** Annual percentage rate, e.g. 7.5 */
  annualRate: number;
  /** Term in years. */
  years: number;
  frequency: Frequency;
  /** Optional balloon / residual paid at the end, as a fraction of amount (0 to 0.5). */
  balloonPct?: number;
}

export interface RepaymentResult {
  repayment: number;
  totalRepaid: number;
  totalInterest: number;
  balloon: number;
  periods: number;
}

export function calculateRepayment({ amount, annualRate, years, frequency, balloonPct = 0 }: RepaymentInput): RepaymentResult {
  const ppy = PERIODS_PER_YEAR[frequency];
  const n = Math.max(1, Math.round(years * ppy));
  const r = annualRate / 100 / ppy;
  const balloon = amount * balloonPct;
  let repayment: number;
  if (r === 0) {
    repayment = (amount - balloon) / n;
  } else {
    const pv = amount - balloon / Math.pow(1 + r, n);
    repayment = (pv * r) / (1 - Math.pow(1 + r, -n));
  }
  const totalRepaid = repayment * n + balloon;
  return { repayment, totalRepaid, totalInterest: totalRepaid - amount, balloon, periods: n };
}
