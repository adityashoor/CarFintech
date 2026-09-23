import type { Metadata } from "next";
import { Lock } from "lucide-react";

export const metadata: Metadata = { title: "Private demo", robots: { index: false, follow: false } };

/** Access-code screen shown by the proxy when the demo gate is on. */
export default async function DemoAccessPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" ? sp.next : "/";
  const error = sp.error === "1";
  return (
    <section className="flex min-h-[80vh] items-center bg-bg">
      <div className="container-x py-32">
        <form method="post" action="/api/demo-access" className="mx-auto w-full max-w-md rounded-2xl border border-line bg-surface p-8 shadow-card">
          <span className="flex size-11 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
            <Lock size={20} />
          </span>
          <h1 className="mt-5 font-heading text-2xl font-bold tracking-tight text-ink">Private design preview</h1>
          <p className="mt-2 text-sm text-muted">This preview is shared for evaluation only. Enter the access code you were given to continue.</p>
          <input type="hidden" name="next" value={next} />
          <label htmlFor="code" className="mt-6 block text-sm font-medium text-ink">
            Access code
          </label>
          <input id="code" name="code" type="password" autoComplete="off" required className="mt-1.5 h-12 w-full rounded-xl border border-line bg-surface px-4 text-ink focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-accent/60" />
          {error && (
            <p role="alert" className="mt-2 text-xs text-danger">
              That code was not recognised.
            </p>
          )}
          <button type="submit" className="mt-5 flex h-12 w-full items-center justify-center rounded-lg bg-accent font-heading text-sm font-semibold text-white transition-colors hover:bg-accent-deep">
            Continue
          </button>
          <p className="mt-6 text-[11px] leading-relaxed text-slate">Design and code are the property of their author and are provided for evaluation only. Copying, reproducing or reusing any part of this preview without written permission is not permitted.</p>
        </form>
      </div>
    </section>
  );
}
