import type { Metadata } from "next";
import type { BlogPost } from "./blog";

const absolute = (path: string, siteUrl: string) => new URL(path, `${siteUrl.replace(/\/$/, "")}/`).href;

// These imported posts had a byline or opening fragment in the summary field.
// Keep the original article intact; give readers a useful description of it.
const articleDescriptions: Record<string, string> = {
  "install-marketplace-claude-desktop": "Install the Recoup Skills & Plugins Marketplace in Claude Desktop, add Recoup skills, and connect your music workspace.",
  "bring-your-own-agent": "Connect your own AI agent to Recoup with its API, CLI, and MCP server, and bring music workflows into the tools you already use.",
  "open-labels": "How Recoup's API and agent tools let you build a programmable record label around your artists, catalog, and music workflows.",
  "sandbox-for-record-labels": "Use Recoup sandboxes to give your music team's AI agents a file system, documents, and tools for working with artist context.",
};

export const blogDescription = (post: BlogPost) => articleDescriptions[post.slug] || post.excerpt;

export function blogAuthor(author: string, siteUrl: string) {
  if (author === "Recoupable Team") {
    return { "@type": "Organization", name: author, url: absolute("/about", siteUrl) };
  }
  if (author === "Sidney Swift") {
    return { "@type": "Person", "@id": absolute("/about#sidney-swift", siteUrl), name: author, url: absolute("/about#sidney-swift", siteUrl), jobTitle: "Founder of Recoup" };
  }
  // Retain credited names, including handles. Do not infer a real name or bio.
  return { "@type": "Person", name: author };
}

export function blogAuthorContext(author: string) {
  if (author === "Sidney Swift") return { description: "Founder of Recoup", href: "/about#sidney-swift" };
  if (author === "Recoupable Team") return { description: "The team behind Recoup", href: "/about" };
  return undefined;
}

export function blogPostMetadata(post: BlogPost, siteUrl: string): Metadata {
  const description = blogDescription(post);
  const url = absolute(`/blog/${post.slug}`, siteUrl);
  const image = absolute(post.coverImage || "/opengraph-image", siteUrl);
  const authorContext = blogAuthorContext(post.author);
  return {
    title: post.title,
    description,
    authors: [{ name: post.author, ...(authorContext ? { url: absolute(authorContext.href, siteUrl) } : {}) }],
    alternates: { canonical: url, types: { "application/rss+xml": absolute("/feed.xml", siteUrl) } },
    openGraph: {
      title: post.title, description, url, siteName: "Recoup", locale: "en_US", type: "article",
      publishedTime: post.date,
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      authors: [post.author], images: [{ url: image, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description, images: [image] },
  };
}

function breadcrumb(items: { name: string; url: string }[], id: string) {
  return {
    "@type": "BreadcrumbList", "@id": id,
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: item.url })),
  };
}

export function blogPostJsonLd(post: BlogPost, siteUrl: string) {
  const url = absolute(`/blog/${post.slug}`, siteUrl);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting", "@id": `${url}#article`, url,
        headline: post.title, description: blogDescription(post), datePublished: post.date,
        ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
        ...(post.coverImage ? { image: absolute(post.coverImage, siteUrl) } : {}),
        author: blogAuthor(post.author, siteUrl),
        publisher: { "@id": absolute("/#organization", siteUrl) },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        isPartOf: { "@id": absolute("/blog#blog", siteUrl) },
        articleSection: post.category, inLanguage: "en",
      },
      breadcrumb([
        { name: "Home", url: absolute("/", siteUrl) },
        { name: "Blog", url: absolute("/blog", siteUrl) },
        { name: post.title, url },
      ], `${url}#breadcrumb`),
    ],
  };
}

export function blogIndexJsonLd(posts: readonly BlogPost[], siteUrl: string) {
  const url = absolute("/blog", siteUrl);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Blog", "@id": `${url}#blog`, name: "Recoup blog", url, inLanguage: "en", publisher: { "@id": absolute("/#organization", siteUrl) } },
      { "@type": "CollectionPage", "@id": url, name: "Recoup blog: AI and the business of music", url,
        mainEntity: { "@type": "ItemList", itemListElement: posts.map((post, index) => ({ "@type": "ListItem", position: index + 1, name: post.title, url: absolute(`/blog/${post.slug}`, siteUrl) })) },
      },
      breadcrumb([{ name: "Home", url: absolute("/", siteUrl) }, { name: "Blog", url }], `${url}#breadcrumb`),
    ],
  };
}

const articleTopics: Record<string, string[]> = {
  "your-ai-lives-in-one-persons-head": ["strategy", "agents", "operations"],
  "automate-royalty-reporting-with-existing-files": ["operations", "catalog", "costs"],
  "teach-ai-with-past-investment-memos": ["catalog", "research", "strategy"],
  "roll-out-ai-beyond-first-team": ["strategy", "operations", "agents"],
  "show-your-board-ai-roi": ["costs", "strategy", "operations"],

  "music-executive-guide-ai-agents": ["strategy", "agents"],
  "why-artists-need-ai-agents": ["agents", "artists"],
  "ai-content-creation-musicians": ["content", "artists", "marketing"],
  "music-release-strategy-2026": ["releases", "marketing", "artists"],
  "ai-ar-artist-discovery": ["labels", "research"],
  "ai-catalog-marketing-passive-revenue": ["catalog", "marketing", "labels"],
  "ai-for-record-labels": ["labels", "strategy", "operations"],
  "ai-music-distribution-automation": ["operations", "catalog", "releases"],
  "ai-music-manager-tools": ["managers", "agents", "marketing"],
  "ai-music-marketing-roi": ["costs", "marketing", "strategy"],
  "ai-music-marketing": ["marketing", "content", "artists"],
  "ai-replacing-music-marketing-teams": ["labels", "marketing", "operations"],
  "how-labels-use-ai": ["labels", "catalog", "marketing"],
  "how-much-does-ai-music-marketing-cost": ["costs", "marketing", "strategy"],
  "independent-artist-marketing-guide": ["artists", "marketing", "releases"],
  "ai-for-music-managers": ["managers", "agents", "operations"],
  "ai-music-marketing-guide-2026": ["marketing", "content", "releases"],
  "ai-playlist-pitching": ["research", "releases", "marketing"],
  "chatgpt-vs-music-ai-agents": ["agents", "strategy"],
  "meta-bought-manus-agents-break": ["agents", "engineering"],
  "music-label-ai-agents": ["labels", "agents", "operations"],
  "recoup-in-2026": ["platform", "labels", "strategy"],
  "sandbox-for-record-labels": ["platform", "engineering", "agents"],
  "open-labels": ["platform", "engineering", "agents"],
  "install-marketplace-claude-desktop": ["platform", "skills", "agents"],
  "bring-your-own-agent": ["platform", "skills", "agents"],
};

export function relatedBlogPosts(post: BlogPost, posts: readonly BlogPost[], limit = 2) {
  const topics = new Set(articleTopics[post.slug] || []);
  const score = (candidate: BlogPost) => (articleTopics[candidate.slug] || []).filter(topic => topics.has(topic)).length * 3 + Number(candidate.category === post.category);
  return posts.filter(candidate => candidate.slug !== post.slug)
    .sort((a, b) => score(b) - score(a) || b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
    .slice(0, limit);
}
