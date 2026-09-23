import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-dark text-white">
      <div className="container-x py-40 text-center">
        <p className="eyebrow text-accent-bright">404</p>
        <h1 className="mt-4 font-heading text-display font-bold tracking-tight">This page has moved on.</h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">The page you were after does not exist. Head back to the homepage or get a quote and we will point you in the right direction.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/get-quote" variant="outline-light">
            Get a Quote
          </Button>
        </div>
        <p className="mt-10 text-xs text-white/40">
          Looking for an article? <Link href="/blog" className="underline">Browse the blog</Link>.
        </p>
      </div>
    </section>
  );
}
