import { describe, expect, it } from "vitest";
import sitemap from "../sitemap";
import { blogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";

const blogImportDate = /^2026-09-10/;

describe("sitemap blog lastModified", () => {
  it("never publishes the blog import date as a modification date", () => {
    const entries = sitemap().filter((entry) => entry.url.includes("/blog/"));
    expect(entries).toHaveLength(blogPosts.length);
    expect(blogPosts.filter((post) => blogImportDate.test(post.updatedAt ?? "")).map((post) => post.slug)).toEqual([]);
    for (const entry of entries) expect(String(entry.lastModified ?? ""), entry.url).not.toMatch(blogImportDate);
  });

  it("falls back to the publication date when a post has no updatedAt", () => {
    const post = blogPosts.find((candidate) => !candidate.updatedAt);
    expect(post).toBeDefined();
    const entry = sitemap().find((candidate) => candidate.url === `${siteConfig.url}/blog/${post!.slug}`);
    expect(entry?.lastModified).toBe(post!.date);
  });
});
