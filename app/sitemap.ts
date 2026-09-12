import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { blogPosts } from "@/lib/blog";
import { docsRoutes } from "@/lib/docs";
import { publicRoutes } from "@/lib/public-routes";
import { isSearchPreview } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  if (isSearchPreview()) return [];
  const publicationDates = new Map(blogPosts.map(post => [`/blog/${post.slug}`, post.updatedAt ?? post.date]));
  return [...new Set([...publicRoutes, ...docsRoutes, ...blogPosts.map(({ slug }) => `/blog/${slug}`)])].map((path) => ({
    url: `${site.url}${path}`,
    // Only publish a modification date we actually know, never the build time.
    ...(publicationDates.has(path) ? { lastModified: publicationDates.get(path) } : {}),
  }));
}
