import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { blogPosts } from "@/lib/blog";
import { publicRoutes } from "@/lib/public-routes";
import { episodePath } from "@/lib/podcast/episodePath";
import { readEpisodes } from "@/lib/podcast/readEpisodes";
import { isSearchPreview } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  if (isSearchPreview()) return [];
  const episodes = readEpisodes();
  const publicationDates = new Map([...blogPosts.map(post => [`/blog/${post.slug}`, post.updatedAt ?? post.date] as const), ...episodes.map(episode => [episodePath(episode.slug), episode.date] as const)]);
  return [...new Set([...publicRoutes, ...blogPosts.map(({ slug }) => `/blog/${slug}`), ...episodes.map(({ slug }) => episodePath(slug))])].map((path) => ({
    url: `${siteConfig.url}${path}`,
    // Only publish a modification date we actually know, never the build time.
    ...(publicationDates.has(path) ? { lastModified: publicationDates.get(path) } : {}),
  }));
}
