import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
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
    assert.equal(metadata.alternates.canonical, url);
    assert.equal(metadata.alternates.types["application/rss+xml"], `${siteUrl}/feed.xml`);
    assert.equal(metadata.openGraph.url, url);
    assert.equal(metadata.openGraph.title, post.title);
    assert.equal(metadata.twitter.description, blogDescription(post));
    assert.equal(metadata.openGraph.description, blogDescription(post));
    assert.equal(metadata.openGraph.publishedTime, post.date);
    assert.equal(metadata.openGraph.modifiedTime, post.updatedAt);
    assert.match(metadata.openGraph.images[0].url, /^https:\/\//);
    assert.match(metadata.twitter.images[0], /^https:\/\//);
    assert.equal(metadata.robots, undefined);
  }
});

test("structured authors distinguish the credited team from people without inventing biographies", () => {
  assert.equal(blogAuthor("Recoupable Team", siteUrl)["@type"], "Organization");
  assert.equal(blogAuthor("Sidney Swift", siteUrl)["@type"], "Person");
  assert.equal(blogAuthorContext("Sidney Swift")?.description, "Founder of Recoup");
  assert.deepEqual(blogAuthor("sweetman", siteUrl), { "@type": "Person", name: "sweetman" });
  assert.equal(blogAuthorContext("sweetman"), undefined);
});

test("article schemas preserve supplied dates, canonicalize images, and reference one publisher", () => {
  for (const post of posts) {
    const graph = JSON.parse(JSON.stringify(blogPostJsonLd(post, siteUrl)))["@graph"];
    const article = graph[0];
    assert.equal(article["@type"], "BlogPosting");
    assert.equal(article.publisher["@id"], `${siteUrl}/#organization`);
    assert.equal(article.datePublished, post.date);
    assert.equal(article.dateModified, post.updatedAt);
    assert.equal(article.mainEntityOfPage["@id"], `${siteUrl}/blog/${post.slug}`);
    if (post.coverImage) assert.match(article.image, /^https:\/\//);
    assert.equal(graph[1].itemListElement.at(-1).item, article.url);
  }
  const localCover = { ...posts[0], coverImage: "/images/sky/hero-clouds.webp", updatedAt: undefined };
  const article = JSON.parse(JSON.stringify(blogPostJsonLd(localCover, `${siteUrl}/`)))["@graph"][0];
  assert.equal(article.image, `${siteUrl}/images/sky/hero-clouds.webp`);
  assert.ok(!("dateModified" in article), "A missing source update date must not become a fabricated freshness signal");
});

test("weak imported excerpts are replaced by faithful useful summaries without changing article content", () => {
  const tutorial = posts.find(post => post.slug === "install-marketplace-claude-desktop")!;
  const before = JSON.stringify(tutorial);
  assert.match(blogDescription(tutorial), /Claude Desktop/);
  assert.notEqual(blogDescription(tutorial), "By Sidney Swift");
  assert.equal(JSON.stringify(tutorial), before);
});

test("related articles prioritize topic relevance and never recommend the current article", () => {
  const costs = posts.find(post => post.slug === "how-much-does-ai-music-marketing-cost")!;
  assert.equal(relatedBlogPosts(costs, posts)[0].slug, "ai-music-marketing-roi");
  const skills = posts.find(post => post.slug === "install-marketplace-claude-desktop")!;
  assert.equal(relatedBlogPosts(skills, posts)[0].slug, "bring-your-own-agent");
  for (const post of posts) {
    const related = relatedBlogPosts(post, posts);
    assert.equal(related.length, 2);
    assert.ok(related.every(candidate => candidate.slug !== post.slug));
    assert.equal(new Set(related.map(candidate => candidate.slug)).size, related.length);
  }
});

test("all documentation metadata is unique to its URL and does not expose Markdown markup", () => {
  const titles = new Set<string>();
  for (const page of docs) {
    const metadata = JSON.parse(JSON.stringify(documentationMetadata(page, page.slug, siteUrl)));
    const url = `${siteUrl}/docs${page.slug ? `/${page.slug}` : ""}`;
    assert.equal(metadata.alternates.canonical, url);
    assert.equal(metadata.alternates.types["text/markdown"], `${siteUrl}/docs/raw/${page.slug || "index"}.md`);
    assert.equal(metadata.openGraph.url, url);
    assert.ok(metadata.description.length > 0 && metadata.description.length <= 240);
    assert.ok(!/[`*]|\]\(/.test(metadata.description));
    assert.equal(metadata.twitter.description, metadata.description);
    assert.equal(metadata.robots, undefined);
    assert.ok(!titles.has(metadata.title), `Repeated search title: ${metadata.title}`);
    titles.add(metadata.title);
  }
  assert.equal(documentationMetadata(undefined, "api-reference", siteUrl).alternates?.types, undefined);
});

test("documentation breadcrumbs point only to real routes; navigation groups are not fake pages", () => {
  const realRoutes = new Set([`${siteUrl}/`, `${siteUrl}/docs`, `${siteUrl}/docs/api-reference`, ...docs.map(page => `${siteUrl}/docs${page.slug ? `/${page.slug}` : ""}`)]);
  for (const [page, key] of [...docs.map(page => [page, page.slug] as const), [undefined, "api-reference"] as const]) {
    const graph = JSON.parse(JSON.stringify(documentationJsonLd(page, key, siteUrl)))["@graph"];
    const article = graph[0];
    assert.equal(article["@type"], key && key !== "api-reference" ? "TechArticle" : "CollectionPage");
    assert.equal(article.publisher["@id"], `${siteUrl}/#organization`);
    assert.equal(article.dateModified, undefined);
    const crumbs: { item: string; position: number }[] = graph[1].itemListElement;
    assert.ok(crumbs.every(crumb => realRoutes.has(crumb.item)));
    assert.deepEqual(crumbs.map(crumb => crumb.position), crumbs.map((_, index) => index + 1));
    assert.equal(crumbs.at(-1)?.item, article.url);
    assert.equal(new Set(crumbs.map(crumb => crumb.item)).size, crumbs.length);
  }
});

test("blog collection schema contains exactly the visible article destinations", () => {
  const graph = JSON.parse(JSON.stringify(blogIndexJsonLd(posts, siteUrl)))["@graph"];
  assert.equal(graph[0]["@id"], `${siteUrl}/blog#blog`);
  const items: { url: string }[] = graph[1].mainEntity.itemListElement;
  assert.deepEqual(items.map(item => item.url), posts.map(post => `${siteUrl}/blog/${post.slug}`));
});
