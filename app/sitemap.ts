import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content";
import { siteConfig } from "@/lib/config";

/**
 * Dynamic sitemap — every content entry lives under the unified /blog hub
 * (essays, guides, tutorials, updates) plus the static pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const contentEntries: MetadataRoute.Sitemap = getAllContent().map((entry) => ({
    url: `${siteConfig.url}/blog/${entry.slug}`,
    lastModified: new Date(entry.updatedAt || entry.date),
    changeFrequency: "monthly",
    priority: entry.category === "essay" ? 0.8 : 0.7,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteConfig.url}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/platform`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/consulting`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/pricing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/developers`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/partners`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/diligence`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/audit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/trust`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/company`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/company/vision`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/company/recoup-records`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/company/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/privacy-policy`, lastModified: new Date("2025-07-24"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/terms-of-use`, lastModified: new Date("2025-07-24"), changeFrequency: "yearly", priority: 0.3 },
  ];

  return [...staticPages, ...contentEntries];
}
