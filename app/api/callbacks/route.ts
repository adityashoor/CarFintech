import { getLeadService } from "@/lib/leads/service";
import { handleLead } from "@/lib/leads/handler";
import { callbackSchema } from "@/lib/validation/leads";

/** POST /api/callbacks */
export async function POST(request: Request) {
  return handleLead(request, callbackSchema, (data, page) => getLeadService().createCallback({ ...data, loanType: data.loanType || undefined }, page), "CB-0000-000000");
}
