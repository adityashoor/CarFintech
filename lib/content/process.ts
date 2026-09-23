export interface ProcessStep {
  title: string;
  text: string;
}

/** The seven-step lending process published on the heavy-vehicle, caravan, motorbike, debt-consolidation and secured/unsecured pages. */
export const detailedProcess: ProcessStep[] = [
  {
    title: "Initial Consultation",
    text: "We start by understanding your specific vehicle financing needs through a comprehensive discussion. Our experienced brokers will assess your financial situation, vehicle requirements, and budget to determine the best approach for your circumstances. This consultation can be conducted over the phone, online, or in person at our Melbourne office.",
  },
  {
    title: "Document Collection",
    text: "Once we understand your needs, we'll guide you through gathering the necessary documentation. This typically includes proof of income, identification, bank statements, and details about the vehicle you wish to finance. Our team will provide you with a complete checklist and assist you throughout this process to ensure everything is in order.",
  },
  {
    title: "Lender Comparison",
    text: "Using our extensive network of trusted lenders across Australia, we compare multiple financing options to find the most suitable deals for your situation. We analyse interest rates, loan terms, fees, and conditions from various banks, credit unions, and specialist vehicle finance providers to present you with the best available options.",
  },
  {
    title: "Pre-Approval Process",
    text: "With your preferred option selected, we submit your application for pre-approval. This step provides you with confidence when negotiating with dealers or private sellers, as you'll know exactly how much you can borrow and under what terms. Pre-approval typically takes 24-48 hours depending on the lender.",
  },
  {
    title: "Vehicle Selection and Valuation",
    text: "Once pre-approved, you can confidently search for your ideal vehicle within your approved budget. When you find the right car, truck, or commercial vehicle, the lender will conduct a valuation to ensure the vehicle meets their security requirements and represents good value for money.",
  },
  {
    title: "Final Approval and Documentation",
    text: "After the vehicle valuation is complete, we finalise your loan application and coordinate the completion of all legal documentation. Our team reviews all contracts and explains the terms and conditions before you sign, ensuring you fully understand your obligations and rights as a borrower.",
  },
  {
    title: "Settlement and Vehicle Delivery",
    text: "The final step involves coordinating settlement between all parties. We manage the payment process, ensuring funds are transferred securely to the seller while you receive your vehicle registration and keys. Our team remains available to answer any questions even after settlement is complete.",
  },
];

/** The three-step process. `qualify` / `approved` carry each page's exact wording. */
export function simpleProcess(qualify: string, approved: string, brokers: "brokers" | "Brokers" = "brokers"): ProcessStep[] {
  return [
    {
      title: "Initial Consult",
      text: `Have a chat with one of our qualified ${brokers} who will understand your situation and talk you through the next steps.`,
    },
    {
      title: "Fact Find",
      text: `We'll work with you to understand a bit more about your situation (including your financials, assets etc.) to make sure you ${qualify}.`,
    },
    {
      title: "Approval",
      text: `We'll work to find an appropriate lender for your loan, taking into account your situation and loan type. We'll then handle the paperwork to get your ${approved} approved.`,
    },
  ];
}
