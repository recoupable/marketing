import type { Metadata } from "next";
import { siteConfig } from "./config.ts";

export const searchDescription = "Recoup helps music funds and rightsholders adopt AI through strategy, custom systems, and team training. Explore royalty reporting, catalog review, and music AI tools.";

export function absoluteUrl(path: string) {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export function isSearchPreview(environment: Record<string, string | undefined> = process.env) {
  return environment.VERCEL_ENV === "preview" || environment.NEXT_PUBLIC_SITE_INDEXABLE === "false";
}

// Next replaces nested metadata, rather than merging each Open Graph field.
// Keep a page's canonical URL, description, and share preview together.
export function withPageMetadata(metadata: Metadata): Metadata {
  const title = typeof metadata.title === "string" ? metadata.title : metadata.title && "absolute" in metadata.title ? metadata.title.absolute : "Recoup";
  const canonical = metadata.alternates?.canonical;
  const path = typeof canonical === "string" ? canonical : canonical instanceof URL ? canonical.toString() : "/";
  const description = metadata.description || searchDescription;
  const image = { url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "Recoup: AI transformation for music funds and rightsholders" };
  return {
    ...metadata,
    description,
    alternates: { ...metadata.alternates, types: { "application/rss+xml": absoluteUrl("/feed.xml"), ...metadata.alternates?.types } },
    openGraph: { type: "website", siteName: siteConfig.name, locale: "en_US", title, description, url: absoluteUrl(path), images: [image], ...metadata.openGraph },
    twitter: { card: "summary_large_image", title, description, images: [image], ...metadata.twitter },
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: siteConfig.name,
        url: absoluteUrl("/"),
        logo: { "@type": "ImageObject", url: absoluteUrl("/images/recoup-logo.svg"), width: 256, height: 256 },
        description: "AI transformation, custom software, and team training for music funds and rightsholders.",
        founder: { "@type": "Person", "@id": absoluteUrl("/about#sidney-swift"), name: "Sidney Swift", url: absoluteUrl("/about#sidney-swift") },
        sameAs: [siteConfig.githubOrganizationUrl],
        email: siteConfig.contactEmail,
      },
      { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: siteConfig.name, url: absoluteUrl("/"), inLanguage: "en", publisher: { "@id": absoluteUrl("/#organization") } },
    ],
  };
}

export { buildPostMetadata, buildPageMetadata, buildPostJsonLd } from "./legacy-seo.ts";
