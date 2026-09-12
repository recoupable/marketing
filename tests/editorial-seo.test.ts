import { readFileSync } from "node:fs";
import { test, expect } from "vitest";
import type { BlogPost } from "../lib/blog";
import type { DocPage } from "../lib/docs";
import {
  blogAuthor, blogAuthorContext, blogDescription, blogIndexJsonLd, blogPostJsonLd,
  blogPostMetadata, documentationJsonLd, documentationMetadata, relatedBlogPosts,
} from "../lib/editorial-seo.ts";

const siteUrl = "https://recoupable.dev";
const posts: BlogPost[] = JSON.parse(readFileSync(new URL("../content/blog/posts.json", import.meta.url), "utf8"));
const docs: DocPage[] = JSON.parse(readFileSync(new URL("../content/docs/manifest.json", import.meta.url), "utf8"));

test("article metadata is page-specific and preserves production/preview robots inheritance", () => {
  for (const post of posts) {
    const metadata = JSON.parse(JSON.stringify(blogPostMetadata(post, siteUrl)));
    const url = `${siteUrl}/blog/${post.slug}`;
    expect(metadata.alternates.canonical).toBe(url);
    expect(metadata.alternates.types["application/rss+xml"]).toBe(`${siteUrl}/feed.xml`);
    expect(metadata.openGraph.url).toBe(url);
    expect(metadata.openGraph.title).toBe(post.title);
    expect(metadata.twitter.description).toBe(blogDescription(post));
    expect(metadata.openGraph.description).toBe(blogDescription(post));
    expect(metadata.openGraph.publishedTime).toBe(post.date);
    expect(metadata.openGraph.modifiedTime).toBe(post.updatedAt);
    expect(metadata.openGraph.images[0].url).toMatch(/^https:\/\//);
    expect(metadata.twitter.images[0]).toMatch(/^https:\/\//);
    expect(metadata.robots).toBe(undefined);
  }
});

test("structured authors distinguish the credited team from people without inventing biographies", () => {
  expect(blogAuthor("Recoupable Team", siteUrl)["@type"]).toBe("Organization");
  expect(blogAuthor("Sidney Swift", siteUrl)["@type"]).toBe("Person");
  expect(blogAuthorContext("Sidney Swift")?.description).toBe("Founder of Recoup");
  expect(blogAuthor("sweetman", siteUrl)).toStrictEqual({ "@type": "Person", name: "sweetman" });
  expect(blogAuthorContext("sweetman")).toBe(undefined);
});

test("article schemas preserve supplied dates, canonicalize images, and reference one publisher", () => {
  for (const post of posts) {
    const graph = JSON.parse(JSON.stringify(blogPostJsonLd(post, siteUrl)))["@graph"];
    const article = graph[0];
    expect(article["@type"]).toBe("BlogPosting");
    expect(article.publisher["@id"]).toBe(`${siteUrl}/#organization`);
    expect(article.datePublished).toBe(post.date);
    expect(article.dateModified).toBe(post.updatedAt);
    expect(article.mainEntityOfPage["@id"]).toBe(`${siteUrl}/blog/${post.slug}`);
    if (post.coverImage) expect(article.image).toMatch(/^https:\/\//);
    expect(graph[1].itemListElement.at(-1).item).toBe(article.url);
  }
  const localCover = { ...posts[0], coverImage: "/images/sky/hero-clouds.webp", updatedAt: undefined };
  const article = JSON.parse(JSON.stringify(blogPostJsonLd(localCover, `${siteUrl}/`)))["@graph"][0];
  expect(article.image).toBe(`${siteUrl}/images/sky/hero-clouds.webp`);
  expect(!("dateModified" in article), "A missing source update date must not become a fabricated freshness signal").toBeTruthy();
});

test("weak imported excerpts are replaced by faithful useful summaries without changing article content", () => {
  const tutorial = posts.find(post => post.slug === "install-marketplace-claude-desktop")!;
  const before = JSON.stringify(tutorial);
  expect(blogDescription(tutorial)).toMatch(/Claude Desktop/);
  expect(blogDescription(tutorial)).not.toBe("By Sidney Swift");
  expect(JSON.stringify(tutorial)).toBe(before);
});

test("related articles prioritize topic relevance and never recommend the current article", () => {
  const costs = posts.find(post => post.slug === "how-much-does-ai-music-marketing-cost")!;
  expect(relatedBlogPosts(costs, posts)[0].slug).toBe("ai-music-marketing-roi");
  const skills = posts.find(post => post.slug === "install-marketplace-claude-desktop")!;
  expect(relatedBlogPosts(skills, posts)[0].slug).toBe("bring-your-own-agent");
  for (const post of posts) {
    const related = relatedBlogPosts(post, posts);
    expect(related.length).toBe(2);
    expect(related.every(candidate => candidate.slug !== post.slug)).toBeTruthy();
    expect(new Set(related.map(candidate => candidate.slug)).size).toBe(related.length);
  }
});

test("all documentation metadata is unique to its URL and does not expose Markdown markup", () => {
  const titles = new Set<string>();
  for (const page of docs) {
    const metadata = JSON.parse(JSON.stringify(documentationMetadata(page, page.slug, siteUrl)));
    const url = `${siteUrl}/docs${page.slug ? `/${page.slug}` : ""}`;
    expect(metadata.alternates.canonical).toBe(url);
    expect(metadata.alternates.types["text/markdown"]).toBe(`${siteUrl}/docs/raw/${page.slug || "index"}.md`);
    expect(metadata.openGraph.url).toBe(url);
    expect(metadata.description.length > 0 && metadata.description.length <= 240).toBeTruthy();
    expect(!/[`*]|\]\(/.test(metadata.description)).toBeTruthy();
    expect(metadata.twitter.description).toBe(metadata.description);
    expect(metadata.robots).toBe(undefined);
    expect(!titles.has(metadata.title), `Repeated search title: ${metadata.title}`).toBeTruthy();
    titles.add(metadata.title);
  }
  expect(documentationMetadata(undefined, "api-reference", siteUrl).alternates?.types).toBe(undefined);
});

test("documentation breadcrumbs point only to real routes; navigation groups are not fake pages", () => {
  const realRoutes = new Set([`${siteUrl}/`, `${siteUrl}/docs`, `${siteUrl}/docs/api-reference`, ...docs.map(page => `${siteUrl}/docs${page.slug ? `/${page.slug}` : ""}`)]);
  for (const [page, key] of [...docs.map(page => [page, page.slug] as const), [undefined, "api-reference"] as const]) {
    const graph = JSON.parse(JSON.stringify(documentationJsonLd(page, key, siteUrl)))["@graph"];
    const article = graph[0];
    expect(article["@type"]).toBe(key && key !== "api-reference" ? "TechArticle" : "CollectionPage");
    expect(article.publisher["@id"]).toBe(`${siteUrl}/#organization`);
    expect(article.dateModified).toBe(undefined);
    const crumbs: { item: string; position: number }[] = graph[1].itemListElement;
    expect(crumbs.every(crumb => realRoutes.has(crumb.item))).toBeTruthy();
    expect(crumbs.map(crumb => crumb.position)).toStrictEqual(crumbs.map((_, index) => index + 1));
    expect(crumbs.at(-1)?.item).toBe(article.url);
    expect(new Set(crumbs.map(crumb => crumb.item)).size).toBe(crumbs.length);
  }
});

test("blog collection schema contains exactly the visible article destinations", () => {
  const graph = JSON.parse(JSON.stringify(blogIndexJsonLd(posts, siteUrl)))["@graph"];
  expect(graph[0]["@id"]).toBe(`${siteUrl}/blog#blog`);
  const items: { url: string }[] = graph[1].mainEntity.itemListElement;
  expect(items.map(item => item.url)).toStrictEqual(posts.map(post => `${siteUrl}/blog/${post.slug}`));
});
