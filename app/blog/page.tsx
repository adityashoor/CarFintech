import type { Metadata } from "next";
import { site } from "@/lib/site";
import { blogCategories, getArticles } from "@/lib/content/articles";
import { PageHero } from "@/components/sections/PageHero";
import { ArticleCard } from "@/components/sections/ArticlesPreview";
import { SectionHeading } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: { absolute: "Latest Articles from Car Fintech" },
  description: "Check out the latest blog posts from Car Fintech",
  alternates: { canonical: `${site.url}/blog` },
};

export default function BlogPage() {
  const all = getArticles();
  const [lead, ...others] = all;
  const secondary = others.slice(0, 3);
  const inCategory = new Set<string>();
  const groups = blogCategories.map((c) => {
    const items = all.filter((a) => a.category === c);
    items.forEach((a) => inCategory.add(a.slug));
    return { name: c, items };
  });
  const recent = all.filter((a) => !inCategory.has(a.slug));

  return (
    <>
      <PageHero eyebrow="Insights" title={["Latest Articles", "from Car Fintech"]} subtitle="Check out the latest blog posts from Car Fintech" compact actions={<span />} showBadge={false} crumbs={[{ href: "/blog", label: "Latest Articles" }]} />

      <section className="section-y bg-surface" aria-labelledby="featured-heading">
        <div className="container-x">
          <SectionHeading number="01" eyebrow="Featured Articles" title={["Featured Articles"]} size="title" />
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ArticleCard {...lead} large />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:col-span-5">
              {secondary.map((a) => (
                <ArticleCard key={a.slug} {...a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {groups.map((g, gi) =>
        g.items.length ? (
          <section key={g.name} className={gi % 2 === 0 ? "section-y bg-bg" : "section-y bg-surface"} aria-label={g.name}>
            <div className="container-x">
              <SectionHeading number={String(gi + 2).padStart(2, "0")} eyebrow="Category" title={[g.name]} size="title" />
              <Stagger className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
                {g.items.map((a) => (
                  <StaggerItem key={a.slug} className="h-full">
                    <ArticleCard {...a} />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        ) : null,
      )}

      <section className="section-y bg-bg" aria-label="Recent Articles">
        <div className="container-x">
          <SectionHeading number="05" eyebrow="Archive" title={["Recent Articles"]} size="title" />
          <Stagger className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.05} amount={0.05}>
            {recent.map((a) => (
              <StaggerItem key={a.slug} className="h-full">
                <ArticleCard {...a} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand title={["Ready to get started?"]} primary={{ href: "/get-quote", label: "Get a Quick Quote" }} secondary={{ href: "/book-appointment", label: "Book Appointment" }} />
    </>
  );
}
