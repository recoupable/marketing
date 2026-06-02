import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllResearchEntries } from "@/lib/research";
import { siteConfig } from "@/lib/config";

/**
 * Dynamic sitemap — auto-includes all published posts + static pages.
 * Uses `updatedAt` from frontmatter for lastmod signals to search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.date),
    changeFrequency: "monthly",
    priority: post.type === "pillar" ? 0.9 : 0.7,
  }));

  const researchEntries: MetadataRoute.Sitemap = getAllResearchEntries().map(
    (entry) => ({
      url: `${siteConfig.url}/research/${entry.slug}`,
      lastModified: new Date(entry.date),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteConfig.url}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${siteConfig.url}/research`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/platform`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/consulting`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/pricing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/developers`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/partners`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/trust`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/company`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/company/vision`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/company/recoup-records`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/company/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/privacy-policy`, lastModified: new Date("2025-07-24"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/terms-of-use`, lastModified: new Date("2025-07-24"), changeFrequency: "yearly", priority: 0.3 },
  ];

  return [...staticPages, ...researchEntries, ...postEntries];
}
