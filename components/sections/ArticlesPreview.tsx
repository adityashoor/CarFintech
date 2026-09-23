import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getArticles } from "@/lib/content/articles";
import { SectionHeading } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { Button } from "@/components/ui/Button";

export function ArticleCard({ slug, title, subtitle, date, image, category, large = false }: { slug: string; title: string; subtitle?: string; date?: string | null; image: string; category?: string | null; large?: boolean }) {
  return (
    <article className="group flex h-full flex-col">
      <Link href={`/blog/${slug}`} className="flex h-full flex-col">
        <div className={large ? "relative aspect-[16/9] overflow-hidden rounded-2xl" : "relative aspect-[16/10] overflow-hidden rounded-2xl"}>
          <Image src={image} alt={title} fill sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-105" />
          {category && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink backdrop-blur">{category}</span>}
          <span className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-accent text-white opacity-0 transition-opacity group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </div>
        <div className="flex flex-1 flex-col pt-5">
          {date && <p className="font-numeric text-xs uppercase tracking-wider text-slate">{date}</p>}
          <h3 className={large ? "mt-2 font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl" : "mt-2 font-heading text-lg font-bold tracking-tight text-ink"}>{title}</h3>
          {subtitle && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{subtitle}</p>}
        </div>
      </Link>
    </article>
  );
}

/** "Latest Articles from Car Fintech": the three most recent posts. */
export function ArticlesPreview() {
  const latest = getArticles().slice(0, 3);
  return (
    <section className="section-y bg-surface" aria-labelledby="articles-heading">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading number="08" eyebrow="Insights" title={["Latest Articles", "from Car Fintech"]} />
          <Button href="/blog" variant="outline" className="md:mb-2">
            View all articles
          </Button>
        </div>
        <Stagger className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3" stagger={0.1}>
          {latest.map((a) => (
            <StaggerItem key={a.slug} className="h-full">
              <ArticleCard {...a} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
