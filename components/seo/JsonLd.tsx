import { site } from "@/lib/site";
import type { Faq } from "@/lib/content/faqs";

function Script({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\u003c");
  return <div hidden data-jsonld="" dangerouslySetInnerHTML={{ __html: `<script type="application/ld+json">${json}</script>` }} />;
}

/** Organization + FinancialService + WebSite graph. Only published facts are emitted. */
export function SiteJsonLd() {
  const orgId = `${site.url}/#organization`;
  const address = {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  };
  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      logo: `${site.url}/images/brand/logo.webp`,
      telephone: site.phone.tel,
      address,
      identifier: [{ "@type": "PropertyValue", propertyID: "ABN", value: site.compliance.abn }],
      sameAs: Object.values(site.social),
    },
    {
      "@type": "FinancialService",
      "@id": `${site.url}/#localbusiness`,
      name: site.name,
      image: `${site.url}/opengraph-image.jpg`,
      url: site.url,
      telephone: site.phone.tel,
      address,
      areaServed: "AU",
      parentOrganization: { "@id": orgId },
      aggregateRating: { "@type": "AggregateRating", ratingValue: site.reviews.rating, reviewCount: site.reviews.count, bestRating: "5" },
    },
    { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: "en-AU", publisher: { "@id": orgId } },
  ];
  return <Script data={{ "@context": "https://schema.org", "@graph": graph }} />;
}

export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }}
    />
  );
}
