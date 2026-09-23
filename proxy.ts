import { NextResponse, type NextRequest } from "next/server";

/**
 * Demo gate (Next 16 proxy). Active only when DEMO_ACCESS_CODE is set:
 *  - visitors must present the access code once (?access=CODE or the form at
 *    /demo-access); a signed cookie then admits them for DEMO_COOKIE_DAYS.
 *  - after DEMO_EXPIRES (ISO date) every page shows /demo-expired.
 * Production deployments simply leave these variables unset.
 */
const PUBLIC = [/^\/demo-access$/, /^\/demo-expired$/, /^\/api\/demo-access$/, /^\/_next\//, /^\/images\//, /^\/(icon|apple-icon|opengraph-image|favicon)/, /^\/robots\.txt$/];

async function sign(value: string): Promise<string> {
  const data = new TextEncoder().encode(`${value}::${process.env.DEMO_ACCESS_CODE}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function proxy(request: NextRequest) {
  const code = process.env.DEMO_ACCESS_CODE;
  if (!code) return NextResponse.next();

  const { pathname, searchParams } = request.nextUrl;
  if (PUBLIC.some((re) => re.test(pathname))) return NextResponse.next();

  const expires = process.env.DEMO_EXPIRES;
  if (expires && Date.now() > Date.parse(expires)) {
    return NextResponse.rewrite(new URL("/demo-expired", request.url));
  }

  const expected = await sign("granted");
  if (request.cookies.get("demo_access")?.value === expected) return NextResponse.next();

  // One-time link: /?access=CODE
  if (searchParams.get("access") === code) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("access");
    const res = NextResponse.redirect(url);
    res.cookies.set("demo_access", expected, { httpOnly: true, sameSite: "lax", secure: request.nextUrl.protocol === "https:", path: "/", maxAge: 60 * 60 * 24 * Number(process.env.DEMO_COOKIE_DAYS || 7) });
    return res;
  }

  const url = request.nextUrl.clone();
  url.pathname = "/demo-access";
  url.search = `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
