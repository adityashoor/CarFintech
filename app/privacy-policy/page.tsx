import type { Metadata } from "next";
import { site } from "@/lib/site";
import { privacyContact, privacyPolicy } from "@/lib/content/privacy";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "At Car Fintech, our Privacy Policy outlines how we handle any personal information we collect about you",
  alternates: { canonical: `${site.url}/privacy-policy` },
};

export default function PrivacyPage() {
  const headings = privacyPolicy.filter((b) => b.type === "h2") as Array<{ type: "h2"; text: string }>;
  const id = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return (
    <>
      <PageHero eyebrow="Legal" title={["Privacy Policy"]} compact actions={<span />} showBadge={false} crumbs={[{ href: "/privacy-policy", label: "Privacy Policy" }]} />
      <section className="section-y bg-surface">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav aria-label="On this page" className="lg:sticky lg:top-28">
              <p className="eyebrow mb-4 text-muted">On this page</p>
              <ul className="space-y-2 border-l border-line text-sm">
                {headings.map((h) => (
                  <li key={h.text}>
                    <a href={`#${id(h.text)}`} className="-ml-px block border-l border-transparent pl-4 text-muted hover:border-ink hover:text-ink">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <Reveal className="lg:col-span-8">
            <div className="prose-brand max-w-3xl">
              {privacyPolicy.map((b, i) => {
                if (b.type === "h2") return <h2 key={i} id={id(b.text)} className="scroll-mt-28">{b.text}</h2>;
                if (b.type === "h3") return <h3 key={i}>{b.text}</h3>;
                if (b.type === "list")
                  return (
                    <ul key={i}>
                      {b.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  );
                return <p key={i}>{b.text}</p>;
              })}
              <p>
                Email: <a href={`mailto:${privacyContact.email}`}>{privacyContact.email}</a>
              </p>
              <p>
                Phone: <a href={`tel:${privacyContact.phone.tel}`}>{privacyContact.phone.display}</a>
              </p>
              <p>Address: {privacyContact.address}</p>
              <h3>{privacyContact.oaic.name}</h3>
              <p>Website: {privacyContact.oaic.website}</p>
              <p>Phone: {privacyContact.oaic.phone}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
