import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { site } from "@/lib/site";
import { getArticle, getArticles } from "@/lib/content/articles";
import { ArticleCard } from "@/components/sections/ArticlesPreview";
import { BlurFade } from "@/components/animations/BlurFade";
import { Reveal } from "@/components/animations/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/primitives";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.subtitle,
    alternates: { canonical: `${site.url}/blog/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.subtitle, images: [{ url: a.image }] },
  };
}

const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const outline = a.blocks.filter((b) => b.type === "h2" || b.type === "h3") as Array<{ type: "h2" | "h3"; text: string }>;
  const related = getArticles()
    .filter((x) => x.slug !== a.slug && (a.category ? x.category === a.category : true))
    .slice(0, 3);

  // Group consecutive list items into a <ul>.
  const rendered: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = (key: string) => {
    if (list.length) {
      rendered.push(
        <ul key={key}>
          {list.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };
  a.blocks.forEach((b, i) => {
    if (b.type === "li") {
      list.push(b.text);
      return;
    }
    flush(`ul-${i}`);
    if (b.type === "img") rendered.push(<Image key={i} src={b.src} alt={b.alt} width={1200} height={675} className="my-8 rounded-xl" />);
    else if (b.type === "h2")
      rendered.push(
        <h2 key={i} id={slugify(b.text)} className="scroll-mt-28">
          {b.text}
        </h2>,
      );
    else if (b.type === "h3")
      rendered.push(
        <h3 key={i} id={slugify(b.text)} className="scroll-mt-28">
          {b.text}
        </h3>,
      );
    else if (b.type === "h4") rendered.push(<h4 key={i}>{b.text}</h4>);
    else rendered.push(<p key={i}>{b.text}</p>);
  });
  flush("ul-end");

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden bg-surface pb-12 pt-32 md:pt-40">
          <div className="pointer-events-none absolute inset-0 -z-10 grid-bg-light mask-radial opacity-60" aria-hidden />
          <div className="container-x">
            <BlurFade inView={false}>
              <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted">
                <Link href="/" className="hover:text-ink">
                  Home
                </Link>
                <ChevronRight size={12} />
                <Link href="/blog" className="hover:text-ink">
                  Latest Articles
                </Link>
              </nav>
            </BlurFade>
            <div className="max-w-4xl">
              {a.category && (
                <BlurFade inView={false} delay={0.05}>
                  <Badge>{a.category}</Badge>
                </BlurFade>
              )}
              <BlurFade inView={false} delay={0.1}>
                <h1 className="mt-5 font-heading text-display-sm font-bold tracking-tight text-ink">{a.title}</h1>
              </BlurFade>
              {a.subtitle && (
                <BlurFade inView={false} delay={0.25}>
                  <p className="mt-5 max-w-2xl text-lg text-muted">{a.subtitle}</p>
                </BlurFade>
              )}
              {a.dateAuthor && (
                <BlurFade inView={false} delay={0.35}>
                  <p className="mt-6 font-numeric text-xs uppercase tracking-widest text-slate">{a.dateAuthor}</p>
                </BlurFade>
              )}
            </div>
          </div>
        </header>

        <div className="container-x">
          <Reveal>
            <div className="relative aspect-[21/9] overflow-hidden rounded-2xl shadow-card">
              <Image src={a.image} alt={`Hero Image for ${a.title}`} fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="container-x grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              {outline.length > 0 && (
                <nav aria-label="Article outline">
                  <p className="eyebrow mb-4 text-muted">In this article</p>
                  <ul className="space-y-2 border-l border-line text-sm">
                    {outline.map((h) => (
                      <li key={h.text} className={h.type === "h3" ? "pl-3" : ""}>
                        <a href={`#${slugify(h.text)}`} className="-ml-px block border-l border-transparent pl-4 text-muted hover:border-ink hover:text-ink">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <div className="mt-8 rounded-xl bg-dark p-5 text-white">
                <p className="font-heading font-bold">Ready to get started?</p>
                <p className="mt-1 text-sm text-white/60">Leave your details and we&apos;ll share a quote.</p>
                <Button href="/get-quote" size="sm" className="mt-4">
                  Get a Quick Quote
                </Button>
              </div>
            </div>
          </aside>
          <div className="lg:col-span-8">
            <div className="prose-brand max-w-3xl text-[17px]">{rendered}</div>
            <p className="mt-12 max-w-3xl border-t border-line pt-6 text-xs leading-relaxed text-slate">{site.disclaimer}</p>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-y bg-bg" aria-label="Related articles">
          <div className="container-x">
            <p className="eyebrow mb-4 text-muted">Keep reading</p>
            <h2 className="font-heading text-title font-bold tracking-tight text-ink">More from Car Fintech</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((r) => (
                <ArticleCard key={r.slug} {...r} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand tone="dark" title={["Ready to get started?"]} primary={{ href: "/get-quote", label: "Get a Quick Quote" }} />
    </>
  );
}
