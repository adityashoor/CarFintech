import data from "./articles.json";

export type ArticleBlock = { type: "h2" | "h3" | "h4" | "p" | "li"; text: string } | { type: "img"; src: string; alt: string };

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  dateAuthor: string | null;
  date: string | null;
  category: string | null;
  image: string;
  blocks: ArticleBlock[];
}

/** All 47 published articles, newest first (generated from carfintech.com.au/blog). */
export function getArticles(): Article[] {
  return data as Article[];
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

/** The blog index groups: Featured, then the three published categories, then everything else. */
export const blogCategories = ["Equipment Finance", "Business Loans", "Asset Finance"] as const;
