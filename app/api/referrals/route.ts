import { getLeadService } from "@/lib/leads/service";
import { handleLead } from "@/lib/leads/handler";
import { referralSchema } from "@/lib/validation/leads";

/** POST /api/referrals */
export async function POST(request: Request) {
  return handleLead(
    request,
    referralSchema,
    (data, page) => getLeadService().createReferral({ ...data, loanType: data.loanType || undefined, friendEmail: data.friendEmail || undefined }, page),
    "RF-0000-000000",
  );
}
