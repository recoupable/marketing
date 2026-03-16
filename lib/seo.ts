import type { Metadata } from "next";
import { siteConfig } from "./config";
import type { PostFrontmatter, PostType } from "./post-schema";

/**
 * Build Next.js Metadata for a blog post.
 * Reads SEO fields from post frontmatter + site config defaults.
 */
export function buildPostMetadata(post: PostFrontmatter): Metadata {
  const title = post.seo.title || post.title;
  const description = post.seo.description || post.excerpt;
  const canonical =
    post.seo.canonical || `${siteConfig.url}/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: post.seo.keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.metadata.locale,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: [post.author],
      tags: post.tags,
      ...(post.coverImage && {
        images: [
          {
            url: `${siteConfig.url}${post.coverImage}`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(post.coverImage && {
        images: [`${siteConfig.url}${post.coverImage}`],
      }),
    },
  };
}

/**
 * Build Next.js Metadata for a static page (homepage, about, etc.).
 */
export function buildPageMetadata(options: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${siteConfig.url}${options.path || ""}`;

  return {
    title: options.title,
    description: options.description,
    alternates: { canonical: url },
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.metadata.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
    },
  };
}

/**
 * Map post type → JSON-LD @type.
 * - article, case-study, pillar → "Article"
 * - tutorial → "HowTo"
 * - announcement → "NewsArticle"
 */
function jsonLdTypeForPost(type: PostType): string {
  switch (type) {
    case "tutorial":
      return "HowTo";
    case "announcement":
      return "NewsArticle";
    default:
      return "Article";
  }
}

/**
 * Build JSON-LD structured data for a blog post.
 * Returns a script-ready object to embed in the page <head>.
 */
export function buildPostJsonLd(post: PostFrontmatter): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": jsonLdTypeForPost(post.type),
    headline: post.title,
    description: post.seo.description || post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    url: post.seo.canonical || `${siteConfig.url}/blog/${post.slug}`,
    ...(post.coverImage && {
      image: `${siteConfig.url}${post.coverImage}`,
    }),
    ...(post.seo.keywords && {
      keywords: post.seo.keywords.join(", "),
    }),
  };
}
