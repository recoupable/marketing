import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { isSearchPreview } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  if (isSearchPreview()) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    // Search crawlers, including OAI-SearchBot, inherit this public access.
    // Training-crawler policy is separate; no new training restriction is set here.
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
