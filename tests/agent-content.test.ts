import { test, expect } from "vitest";
import posts from "../content/blog/posts.json" with { type: "json" };
import chapters from "../content/playbook/chapters.json" with { type: "json" };
import { AgentContentError } from "../lib/agent-content/AgentContentError.ts";
import { getAgentContentIndex } from "../lib/agent-content/getAgentContentIndex.ts";
import { readAgentContent } from "../lib/agent-content/readAgentContent.ts";
import { searchAgentContent } from "../lib/agent-content/searchAgentContent.ts";
import type { AgentReadInput, AgentSearchInput } from "../lib/agent-content/types.ts";
import { readableAgentMarkdown } from "../lib/agent-markdown.ts";
import { pageEntries } from "../lib/agent-content/pageEntries.ts";
import { siteConfig } from "../lib/config.ts";

const index = getAgentContentIndex();
const errorWith = (code: string, status = 400) => (error: unknown) => error instanceof AgentContentError && error.code === code && error.status === status;

async function completeRead(id: string, maxLength = 12000) {
  let offset = 0;
  let markdown = "";
  while (true) {
    const part = await readAgentContent({ id, offset, maxLength });
    expect(part.offset).toBe(offset);
    expect(Array.from(part.markdown).length <= maxLength).toBeTruthy();
    markdown += part.markdown;
    if (part.nextOffset === null) {
      expect(Array.from(markdown).length).toBe(part.totalLength);
      return markdown;
    }
    expect(part.nextOffset > offset, "Each continuation advances").toBeTruthy();
    offset = part.nextOffset;
  }
}

test("the fixed public registry covers published content with canonical URLs and accurate representations", () => {
  // Platform documentation is published at docs.recoupable.dev, not in this index.
  expect(index.some(item => item.id.startsWith("docs:"))).toBe(false);
  expect(index.filter(item => item.type === "blog").length).toBe(posts.length);
  expect(index.filter(item => item.type === "playbook").length).toBe(chapters.length);
  expect(index.filter(item => item.type === "page").length).toBe(pageEntries.length);
  for (const path of ["/workflow-plan", "/ask", "/training", "/podcast", "/case-studies", "/case-studies/royalty-reporting", "/case-studies/investment-review", "/case-studies/catalog-intelligence"]) {
    expect(index.some(item => item.id === `page:${path}`), `${path} is discoverable`).toBeTruthy();
  }
  expect(new Set(index.map(item => item.id)).size).toBe(index.length);
  for (const item of index) {
    expect(new URL(item.url).origin).toBe(new URL(siteConfig.url).origin);
    expect(!/\/designs(?:\/|$)|\/clients(?:\/|$)|\.local|\/source\//.test(item.url)).toBeTruthy();
    expect(["summary", "full"]).toContain(item.representation);
    if (item.type !== "page") expect(item.representation).toBe("full");
    expect(item.title && item.description).toBeTruthy();
  }
  expect(index.some(item => item.id === "page:/agents")).toBeTruthy();
  expect(index.some(item => item.id === "page:/start-project")).toBeTruthy();
  const copy = getAgentContentIndex();
  copy[0].title = "Changed by caller";
  expect(getAgentContentIndex()[0].title).not.toBe(copy[0].title);
});

test("workflow searches lead buyers to the relevant service and implementation", async () => {
  for (const [query, expected] of [
    ["royalty reporting", "page:/operations"],
    ["music fund due diligence", "page:/acquisitions"],
    ["connect our CRM to catalog data", "page:/build"],
    ["agent public website search", "page:/agents"],
  ]) expect((await searchAgentContent({ query })).results[0]?.id, query).toBe(expected);
});

test("search pagination is deterministic, filtered, and has no skipped or repeated entries", async () => {
  const first = await searchAgentContent({ query: "artist", type: "all", limit: 7 });
  expect(await searchAgentContent({ query: "artist", type: "all", limit: 7 })).toStrictEqual(first);
  expect(first.total > first.results.length).toBeTruthy();
  const ids = first.results.map(item => item.id);
  let cursor = first.nextCursor;
  while (cursor !== null) {
    const page = await searchAgentContent({ query: "artist", type: "all", limit: 7, cursor });
    expect(page.total).toBe(first.total);
    ids.push(...page.results.map(item => item.id));
    cursor = page.nextCursor;
  }
  expect(ids.length).toBe(first.total);
  expect(new Set(ids).size).toBe(first.total);
});

test("no matches return an empty result rather than a fabricated answer", async () => {
  expect(await searchAgentContent({ query: "zzzzunfindablezzzz" })).toStrictEqual({ query: "zzzzunfindablezzzz", results: [], total: 0, nextCursor: null });
  expect((await searchAgentContent({ query: "the and of" })).total).toBe(0);
});

test("search rejects malformed input and bounded-field violations", async () => {
  for (const input of [null, [], {}, { query: "" }, { query: "   " }, { query: "x".repeat(241) }, { query: "artist\nkey" }, { query: "artist", url: "https://example.com" }]) {
    await expect(searchAgentContent(input as AgentSearchInput)).rejects.toSatisfy(errorWith("INVALID_QUERY"));
  }
  await expect(searchAgentContent({ query: "x".repeat(240) })).resolves.toBeDefined();
  for (const limit of [0, 11, 1.5, null, "5", NaN]) await expect(searchAgentContent({ query: "artist", limit } as AgentSearchInput)).rejects.toSatisfy(errorWith("INVALID_LIMIT"));
  await expect(searchAgentContent({ query: "artist", type: "private" } as unknown as AgentSearchInput)).rejects.toSatisfy(errorWith("INVALID_TYPE"));
  for (const cursor of ["-1", "01", "1.2", "99999", "x".repeat(201), null]) await expect(searchAgentContent({ query: "artist", cursor } as AgentSearchInput)).rejects.toSatisfy(errorWith("INVALID_CURSOR"));
});

test("reads accept exact public IDs only, with no arbitrary URL or filesystem access", async () => {
  for (const id of ["https://example.com", "file:///etc/passwd", "../../private", "docs:../authentication", "docs:%2e%2e/private", "page:/contact?email=user@example.com", "page:/services#proof", "docs:" + "x".repeat(301)]) {
    await expect(readAgentContent({ id })).rejects.toSatisfy(errorWith("INVALID_ID"));
  }
  await expect(readAgentContent({ id: "docs:private-client-material" })).rejects.toSatisfy(errorWith("NOT_FOUND", 404));
  for (const input of [null, [], { id: "page:/services", url: "https://example.com" }]) await expect(readAgentContent(input as AgentReadInput)).rejects.toSatisfy(errorWith("INVALID_ID"));
  for (const offset of [-1, 1.5, null, Number.MAX_SAFE_INTEGER + 1]) await expect(readAgentContent({ id: "page:/services", offset } as AgentReadInput)).rejects.toSatisfy(errorWith("INVALID_OFFSET"));
  for (const maxLength of [0, 12001, 1.5, null]) await expect(readAgentContent({ id: "page:/services", maxLength } as AgentReadInput)).rejects.toSatisfy(errorWith("INVALID_MAX_LENGTH"));
});

test("read continuation preserves complete text, including a one-character page", async () => {
  const id = `blog:${[...posts].sort((a, b) => b.body.length - a.body.length)[0].slug}`;
  const first = await readAgentContent({ id });
  expect(Array.from(first.markdown).length).toBe(6000);
  expect(first.nextOffset).toBe(6000);
  const complete = await completeRead(id);
  expect(complete).toBe(await completeRead(id, 4097));
  const small = await completeRead("page:/agents");
  expect(small).toBe(await completeRead("page:/agents", 1));
  const end = await readAgentContent({ id, offset: first.totalLength });
  expect(end.markdown).toBe("");
  expect(end.nextOffset).toBe(null);
  await expect(readAgentContent({ id, offset: first.totalLength + 1 })).rejects.toSatisfy(errorWith("INVALID_OFFSET"));
});

test("marketing responses visibly identify summaries and point to the complete public page", async () => {
  const result = await readAgentContent({ id: "page:/services" });
  expect(result.representation).toBe("summary");
  expect(result.markdown).toMatch(/Representation: Summary of the public page/);
  expect(result.markdown.includes(`Source: ${siteConfig.url}/services`)).toBeTruthy();
  expect(result.markdown.includes(`](${siteConfig.url}/contact)`)).toBeTruthy();
  const publicTools = await readAgentContent({ id: "page:/agents" });
  expect(publicTools.markdown).toMatch(/do not access private account or client information/);
});

test("homepage summary preserves the free audit scope and separate implementation pricing", async () => {
  const result = await readAgentContent({ id: "page:/" });
  expect(result.markdown).toContain("We review one workflow and identify a practical first step.");
  expect(result.markdown).toContain("Implementation is scoped and priced separately.");
});

test("every public document is readable and playbook output preserves all chapter content", async () => {
  for (const item of index) {
    const result = await readAgentContent({ id: item.id });
    expect(result.markdown.startsWith('# '), item.id).toBeTruthy();
    expect(result.totalLength > 80, item.id).toBeTruthy();
  }
  for (const chapter of chapters) {
    const text = await completeRead(`playbook:${chapter.slug}`);
    for (const section of chapter.sections) {
      expect(text.includes(section.heading)).toBeTruthy();
      for (const field of ['paragraphs', 'items', 'steps'] as const) {
        for (const item of (section as Record<string, unknown>)[field] as string[] || []) expect(text.includes(item), `${chapter.slug} missing ${field}`).toBeTruthy();
      }
      for (const prompt of ('prompts' in section ? section.prompts : []) || []) {
        expect(text.includes(prompt.label)).toBeTruthy();
        expect(text.includes(prompt.text)).toBeTruthy();
      }
    }
  }
});

test("article responses retain published identity, dates, and full readable body", async () => {
  for (const post of posts) {
    const result = await readAgentContent({ id: `blog:${post.slug}` });
    expect(result.publishedAt).toBe(post.date);
    expect(result.updatedAt).toBe('updatedAt' in post ? post.updatedAt : undefined);
    const text = await completeRead(result.id);
    expect(text.includes(`Author: ${post.author}`)).toBeTruthy();
    expect(text.endsWith(readableAgentMarkdown(post.body, result.url) + '\n')).toBeTruthy();
  }
});

test("music-video discovery preserves the offer and quote destinations", async () => {
 const page = await readAgentContent({ id: "page:/music-videos", maxLength: 12000 });
 expect(page.representation).toBe("full");
 for (const content of ["Less than $10", "Plan fees and extra takes are separate", "Movamos el mundo", "Letal Xlug", "/music-videos#request", ".zip"]) expect(page.markdown.includes(content), content).toBeTruthy();
});
