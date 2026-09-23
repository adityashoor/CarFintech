import { NextResponse } from "next/server";

/** Exchanges the demo access code for the signed cookie the proxy checks. */
export async function POST(request: Request) {
  const code = process.env.DEMO_ACCESS_CODE;
  if (!code) return NextResponse.json({ ok: false, error: "Demo gate is not enabled" }, { status: 404 });
  const form = await request.formData();
  const given = String(form.get("code") ?? "");
  const next = String(form.get("next") ?? "/");
  if (given !== code) {
    return NextResponse.redirect(new URL(`/demo-access?error=1&next=${encodeURIComponent(next)}`, request.url), 303);
  }
  const data = new TextEncoder().encode(`granted::${code}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const value = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const res = NextResponse.redirect(new URL(next.startsWith("/") ? next : "/", request.url), 303);
  res.cookies.set("demo_access", value, { httpOnly: true, sameSite: "lax", secure: new URL(request.url).protocol === "https:", path: "/", maxAge: 60 * 60 * 24 * Number(process.env.DEMO_COOKIE_DAYS || 7) });
  return res;
}
