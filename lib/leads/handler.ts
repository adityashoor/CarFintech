import { z, type ZodType } from "zod";

interface Created {
  id: string;
  status: string;
  createdAt: string;
}

/**
 * Shared route-handler plumbing: parse JSON, validate with the same schema
 * the client uses, answer honeypot hits with a fake success, and hand the
 * clean payload to the configured lead service.
 */
export async function handleLead<T extends { website?: string; consent?: boolean }>(
  request: Request,
  schema: ZodType<T>,
  create: (data: Omit<T, "website" | "consent">, page?: string) => Promise<Created>,
  fakeId: string,
): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Validation failed", fields: z.flattenError(parsed.error).fieldErrors }, { status: 422 });
  }
  const { website, consent: _consent, ...data } = parsed.data;
  void _consent;
  if (website) return Response.json({ ok: true, lead: { id: fakeId, status: "NEW" } });
  try {
    const page = request.headers.get("referer") ?? undefined;
    const lead = await create(data as Omit<T, "website" | "consent">, page);
    return Response.json({ ok: true, lead: { id: lead.id, status: lead.status, createdAt: lead.createdAt } }, { status: 201 });
  } catch (err) {
    console.error("[leads] create failed", err);
    return Response.json({ ok: false, error: "Could not submit your request. Please call us on 1300 600 002." }, { status: 500 });
  }
}
