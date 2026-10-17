import { readdirSync } from "node:fs";
import { expect, test } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "../proxy";
import { entryForPath } from "../lib/agent-content/entryForPath";
import { markdownResponse } from "../lib/agent-content/markdownResponse";
import { agentMarkdownPath } from "../lib/agent-markdown-path";
import { publicRoutes } from "../lib/public-routes";
import { blogPosts } from "../lib/blog";
import { readableAgentMarkdown } from "../lib/agent-markdown";
import { docsRoutes } from "../lib/docs";
import { readEpisodes } from "../lib/podcast/readEpisodes";
import { readTranscript } from "../lib/podcast/readTranscript";
import { playbookEntries } from "../lib/agent-content/playbookEntries";
import { getAgentCatalog } from "../lib/agent-discovery/getAgentCatalog";
import { getAgentContentIndex } from "../lib/agent-content/getAgentContentIndex";
import { nextConfig } from "../next.config";
import { OPTIONS } from "../app/agent-api/v1/markdown/route";

const read = (path: string) =>
  markdownResponse(
    new Request(
      `https://recoupable.dev/agent-api/v1/markdown?${new URLSearchParams({ path })}`,
    ),
  );
const rewrite = (path: string, accept?: string) =>
  proxy(
    new NextRequest(`https://recoupable.dev${path}`, {
      headers: accept ? { accept } : {},
    }),
  );
const pageFiles = (
  readdirSync(new URL("../app", import.meta.url), {
    recursive: true,
  }) as string[]
).filter((file) => /(?:^|\/)page\.[jt]sx?$/.test(file));
const staticPaths = pageFiles
  .filter((file) => !file.includes("["))
  .map((file) => `/${file.replace(/(?:^|\/)page\.[jt]sx?$/, "")}`);
const paths = [
  ...new Set([
    ...staticPaths,
    ...publicRoutes.map((path) => path || "/"),
    ...docsRoutes,
    ...blogPosts.map((post) => `/blog/${post.slug}`),
    ...readEpisodes().map((episode) => `/podcast/${episode.slug}`),
  ]),
];

test("every actual page, sitemap route, blog, and podcast has a published Markdown document", async () => {
  // A new dynamic family must supply its published paths to this audit.
  expect(pageFiles.filter((file) => file.includes("[")).sort()).toEqual([
    "blog/[slug]/page.tsx",
    "case-studies/[slug]/page.tsx",
    "docs/[[...slug]]/page.tsx",
    "podcast/[slug]/page.tsx",
  ]);
  for (const path of paths) {
    const entry = entryForPath(path);
    expect(entry, `Missing Markdown for ${path}`).toBeDefined();
    const response = await read(path);
    expect(response.status, path).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/markdown");
    expect(await response.text(), path).toMatch(/^# .+\n/);
  }
});

test("every page has a raw URL and preserves browser HTML", () => {
  for (const path of paths) {
    const raw = rewrite(agentMarkdownPath(path));
    expect(raw.headers.get("x-middleware-rewrite"), path).toBeTruthy();
    expect(
      rewrite(path, "text/markdown").headers.get("x-middleware-rewrite"),
      path,
    ).toBeTruthy();
    const human = rewrite(path, "text/html,application/xhtml+xml,*/*;q=0.8");
    expect(human.headers.get("x-middleware-rewrite"), path).toBeNull();
    expect(human.headers.get("link"), path).toContain(
      `<${agentMarkdownPath(path)}>`,
    );
  }
  expect(agentMarkdownPath("/")).toBe("/index.md");
  expect(agentMarkdownPath("/blog/")).toBe("/blog.md");
});

test("the archive lists every published blog and each article preserves its complete body", async () => {
  const archive = await (await read("/blog")).text();
  for (const post of blogPosts) {
    const entry = entryForPath(`/blog/${post.slug}`)!;
    const body = await (await read(`/blog/${post.slug}`)).text();
    expect(archive).toContain(`](${entry.metadata.url})`);
    expect(archive).toContain(`](${entry.metadata.url}.md)`);
    expect(body).toContain(
      readableAgentMarkdown(post.body, entry.metadata.url),
    );
    expect(body).toContain(`Author: ${post.author}`);
    expect(entry.metadata.representation).toBe("full");
  }
});

test("long playbooks and published podcast transcripts are returned without truncation", async () => {
  const playbook = await (await read("/playbook/download")).text();
  for (const chapter of playbookEntries)
    expect(playbook).toContain(await chapter.markdown());
  for (const episode of readEpisodes()) {
    const text = await (await read(`/podcast/${episode.slug}`)).text();
    for (const paragraph of episode.summary) expect(text).toContain(paragraph);
    for (const turn of readTranscript(episode.slug) ?? [])
      for (const paragraph of turn.paragraphs)
        expect(text).toContain(paragraph);
  }
});

test("unknown paths and user data cannot become arbitrary reads", async () => {
  for (const path of [
    "/not-a-page",
    "/blog/no-such-article",
    "https://example.com",
    "/../package.json",
    "/content/blog/posts.json",
    "/.env",
    "/label-in-a-box/setup?session_id=private",
  ]) {
    expect((await read(path)).status, path).toBe(404);
  }
  for (const query of [
    "",
    "path=/blog&path=/about",
    "path=/blog&url=https://example.com",
  ]) {
    expect(
      (
        await markdownResponse(
          new Request(`https://recoupable.dev/agent-api/v1/markdown?${query}`),
        )
      ).status,
    ).toBe(404);
  }
  expect(entryForPath("/privacy-policy")).toBe(entryForPath("/privacy"));
  expect(entryForPath("/terms-of-use")).toBe(entryForPath("/terms"));
});

test("negotiation respects media preferences and leaves existing machine endpoints and assets alone", () => {
  for (const accept of [
    "*/*",
    "text/html,text/plain",
    "text/markdown;q=0",
    "text/markdown;q=0, text/plain",
    "text/html,text/markdown;q=0.5",
  ])
    expect(
      rewrite("/blog", accept).headers.get("x-middleware-rewrite"),
    ).toBeNull();
  for (const accept of [
    "text/plain",
    "text/html;q=0.5,text/markdown",
    " TEXT/Markdown ; Q=0.8 , text/html;q=0.7",
  ])
    expect(
      rewrite("/blog", accept).headers.get("x-middleware-rewrite"),
    ).toContain("path=%2Fblog");
  for (const path of [
    "/agents.md",
    "/llms.txt",
    "/agents/catalog.json",
    "/api/inquiries",
    "/agent-api/v1/read",
    "/docs/raw/index.md",
    "/docs/spec/accounts.json",
    "/playbook/recoup-ai-music-playbook.md",
    "/brand/background-study.md",
    "/brand/product-brief.md",
    "/images/photo.png",
  ])
    expect(
      rewrite(path, "text/markdown").headers.get("x-middleware-rewrite"),
      path,
    ).toBeNull();
});

test("Markdown clients can preflight the public endpoint", () => {
  const response = OPTIONS();
  expect(response.status).toBe(204);
  expect(response.headers.get("access-control-allow-origin")).toBe("*");
  expect(response.headers.get("access-control-allow-methods")).toContain("GET");
});

test("Markdown alternates are discoverable and negotiated responses vary on Accept", async () => {
  const catalog = getAgentCatalog(getAgentContentIndex());
  for (const item of catalog.content.filter((item) => !new URL(item.url).hash))
    expect(item.markdownUrl).toBe(
      new URL(agentMarkdownPath(new URL(item.url).pathname), item.url).href,
    );
  expect(await nextConfig.headers!()).toContainEqual({
    source: "/:path*",
    headers: [{ key: "Vary", value: "Accept" }],
  });
  const response = await read("/blog");
  expect(response.headers.get("vary")).toBe("Accept");
  expect(response.headers.get("link")).toContain('rel="canonical"');
});
