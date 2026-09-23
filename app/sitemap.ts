import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/content/services";
import { getArticles } from "@/lib/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/get-quote`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${site.url}/book-appointment`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/about-us`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/chirag-babbar`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/refer-a-friend`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${site.url}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
  const svc: MetadataRoute.Sitemap = services.map((s) => ({ url: `${site.url}/${s.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 }));
  const posts: MetadataRoute.Sitemap = getArticles().map((a) => ({ url: `${site.url}/blog/${a.slug}`, lastModified: now, changeFrequency: "yearly", priority: 0.4 }));
  return [...fixed, ...svc, ...posts];
}
