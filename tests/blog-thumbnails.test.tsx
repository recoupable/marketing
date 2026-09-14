import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/lib/blog";
import { BlogArt } from "@/app/blog/blog-art";

const render = (post: (typeof blogPosts)[number], feature = false) =>
  renderToStaticMarkup(
    createElement(BlogArt, {
      slug: post.slug,
      image: post.coverImage,
      feature,
    }),
  );

describe("editorial blog thumbnails", () => {
  it("has a distinct reviewed illustration or cover for every published article", () => {
    const thumbnails = blogPosts.map((post, i) => render(post, i === 0));
    // Ignore identifiers: uniqueness must come from the composition, not its slug.
    const visuals = thumbnails.map((html) =>
      html.replace(/data-article-art="[^"]*"/g, ""),
    );
    expect(new Set(visuals).size).toBe(blogPosts.length);
    expect(
      thumbnails.every(
        (html) =>
          html.includes("<svg") ||
          html.includes("<img") ||
          html.includes("blog-art-feature"),
      ),
    ).toBe(true);
    expect(thumbnails.join("")).not.toMatch(
      /One story\.|More ways to tell it\.|blog-art-agents/,
    );
  });

  it("keeps article artwork stable when the archive is reordered or filtered", () => {
    const posts = blogPosts.slice(1);
    const bySlug = new Map(posts.map((post) => [post.slug, render(post)]));
    for (const post of [...posts]
      .reverse()
      .filter((post) => post.category === "Music and AI")) {
      expect(render(post)).toBe(bySlug.get(post.slug));
    }
  });

  it("retains the two relevant original covers and replaces the other archival covers", () => {
    const kept = new Set([
      "sandbox-for-record-labels",
      "install-marketplace-claude-desktop",
    ]);
    for (const post of blogPosts.filter((post) => post.coverImage)) {
      expect(render(post).includes("<img")).toBe(kept.has(post.slug));
    }
  });
});
