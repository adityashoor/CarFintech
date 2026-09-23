import { getLeadService } from "@/lib/leads/service";
import { handleLead } from "@/lib/leads/handler";
import { quoteSchema } from "@/lib/validation/leads";

/** POST /api/quotes: the only thing the quote form knows about. */
export async function POST(request: Request) {
  return handleLead(request, quoteSchema, (data, page) => getLeadService().createQuote(data, page), "CF-0000-000000");
}
