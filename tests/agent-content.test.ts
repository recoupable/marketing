import { test, expect } from "vitest";
import { ok } from "./support/ok.ts";
import docs from "../content/docs/manifest.json" with { type: "json" };
import posts from "../content/blog/posts.json" with { type: "json" };
import chapters from "../content/playbook/chapters.json" with { type: "json" };
import { AgentContentError, getAgentContentIndex, readAgentContent, searchAgentContent, type AgentReadInput, type AgentSearchInput } from "../lib/agent-content.ts";
import { documentationAgentMarkdown, operationSpecification, readableAgentMarkdown } from "../lib/agent-markdown.ts";
import { getDocSpec, type ApiObject } from "../lib/docs-server.ts";
import type { DocPage } from "../lib/docs.ts";
import { site } from "../lib/site.ts";

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
  expect(index.filter(item => item.type === "docs").length).toBe(docs.length);
  expect(index.filter(item => item.type === "blog").length).toBe(posts.length);
  expect(index.filter(item => item.type === "playbook").length).toBe(chapters.length);
  expect(index.filter(item => item.type === "page").length).toBe(23);
  for (const path of ["/case-studies", "/case-studies/royalty-reporting", "/case-studies/investment-review", "/case-studies/catalog-intelligence"]) {
    expect(index.some(item => item.id === `page:${path}`), `${path} is discoverable`).toBeTruthy();
  }
  expect(new Set(index.map(item => item.id)).size).toBe(index.length);
  for (const item of index) {
    expect(new URL(item.url).origin).toBe(new URL(site.url).origin);
    expect(!/\/designs(?:\/|$)|\/clients(?:\/|$)|\.local|\/source\//.test(item.url)).toBeTruthy();
    expect(item.representation).toBe(item.type === "page" && item.id !== "page:/music-videos" ? "summary" : "full");
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
  const musicVideo = await searchAgentContent({ query: "create music video", type: "docs" });
  expect(musicVideo.results.some(item => item.id === "docs:workflows/generate-music-video")).toBeTruthy();
});

test("exact API method and path prioritize the correct source operation", async () => {
  const result = await searchAgentContent({ query: "GET /api/artists", type: "docs" });
  expect(result.results[0].id).toBe("docs:api-reference/artists/list");
  expect(result.results[0].api?.method).toBe("GET");
  expect(result.results[0].api?.path).toBe("/api/artists");
  expect(result.results[0].api?.specificationUrl.startsWith(`${site.url}/docs/spec/`)).toBeTruthy();
});

test("search pagination is deterministic, filtered, and has no skipped or repeated entries", async () => {
  const first = await searchAgentContent({ query: "artist", type: "docs", limit: 7 });
  expect(await searchAgentContent({ query: "artist", type: "docs", limit: 7 })).toStrictEqual(first);
  expect(first.total > first.results.length).toBeTruthy();
  const ids = first.results.map(item => item.id);
  let cursor = first.nextCursor;
  while (cursor !== null) {
    const page = await searchAgentContent({ query: "artist", type: "docs", limit: 7, cursor });
    expect(page.total).toBe(first.total);
    expect(page.results.every(item => item.type === "docs")).toBeTruthy();
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
  await expect(searchAgentContent({ query: "x".repeat(240) })).resolves.not.toThrow();
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
  const id = "docs:api-reference/tasks/update";
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
  expect(result.markdown.includes(`Source: ${site.url}/services`)).toBeTruthy();
  expect(result.markdown.includes(`](${site.url}/contact)`)).toBeTruthy();
  const publicTools = await readAgentContent({ id: "page:/agents" });
  expect(publicTools.markdown).toMatch(/do not access private account or client information/);
});

test("MDX presentation becomes readable Markdown without losing prose, links, or executable examples", () => {
  const source = [
    '<CardGroup cols={2}>',
    '<Card title="Authentication" href="/authentication">',
    'Keep **API keys** on the server.',
    '</Card>',
    '</CardGroup>',
    '',
    '<Note>',
    'Read the [API operation](/api-reference/artists/list).',
    '</Note>',
    '',
    '```bash',
    'cat <<EOF',
    '<Card title="literal code">',
    '## Code heading',
    'EOF',
    '```',
    '',
    '| Field | Required |',
    '| --- | --- |',
    '| id | yes |',
    '',
    '[Raw guide](/quickstart.md)',
  ].join('\n');
  const text = readableAgentMarkdown(source, `${site.url}/docs/quickstart`, true);
  expect(text.includes(`[Authentication](${site.url}/docs/authentication)`)).toBeTruthy();
  expect(text.includes('Keep **API keys** on the server.')).toBeTruthy();
  expect(text.includes(`API operation](${site.url}/docs/api-reference/artists/list)`)).toBeTruthy();
  expect(text.includes('> **Note**')).toBeTruthy();
  expect(!text.includes('<CardGroup')).toBeTruthy();
  expect(text.includes('```bash\ncat <<EOF\n<Card title="literal code">\n## Code heading\nEOF\n```')).toBeTruthy();
  expect(text.includes('| Field | Required |\n| --- | --- |\n| id | yes |')).toBeTruthy();
  expect(text.includes(`[Raw guide](${site.url}/docs/raw/quickstart.md)`)).toBeTruthy();
});

function resolvePointer(value: ApiObject, pointer: string): unknown {
  return pointer.slice(2).split('/').map(part => part.replaceAll('~1', '/').replaceAll('~0', '~')).reduce((result: unknown, key) => result && typeof result === 'object' ? (result as ApiObject)[key] : undefined, value);
}
function references(value: unknown): string[] {
  if (!value || typeof value !== 'object') return [];
  return [...('$ref' in value && typeof value.$ref === 'string' ? [value.$ref] : []), ...Object.values(value).flatMap(references)];
}

test("all published API slices preserve effective authentication and close every local schema reference", async () => {
  let operations = 0;
  let refsChecked = 0;
  for (const page of docs as DocPage[]) {
    if (!page.api?.spec) continue;
    const spec = await getDocSpec(page.api.spec);
    const slice = operationSpecification(page, spec);
    ok(slice, page.slug);
    const operation = spec.paths[page.api.path][page.api.method.toLowerCase()];
    expect(slice.paths[page.api.path][page.api.method.toLowerCase()]).toStrictEqual(operation);
    expect(slice.security).toStrictEqual(spec.security);
    expect(slice.paths[page.api.path].parameters).toStrictEqual(spec.paths[page.api.path].parameters);
    for (const ref of references(slice)) {
      if (!ref.startsWith('#/')) continue;
      expect(resolvePointer(slice, ref), `${page.slug}: unresolved ${ref}`).not.toBe(undefined);
      refsChecked++;
    }
    for (const alternative of operation.security ?? spec.security ?? []) for (const scheme of Object.keys(alternative)) {
      if (spec.components?.securitySchemes?.[scheme]) expect(slice.components.securitySchemes[scheme]).toStrictEqual(spec.components.securitySchemes[scheme]);
      else expect(await documentationAgentMarkdown(page), `${page.slug}: missing security scheme must be disclosed`).toMatch(/Documentation gap:/);
    }
    operations++;
  }
  expect(operations > 150).toBeTruthy();
  expect(refsChecked > 100).toBeTruthy();
});

test("API Markdown includes source-specific authentication and full-specification pointers", async () => {
  const page = (docs as DocPage[]).find(page => page.slug === 'api-reference/artists/list')!;
  const text = await documentationAgentMarkdown(page);
  expect(text.includes(`Full OpenAPI specification: ${site.url}/docs/spec/${page.api!.spec}`)).toBeTruthy();
  expect(text.includes(`[Authentication guide](${site.url}/docs/authentication)`)).toBeTruthy();
  expect(text.includes('Its declared headers and parameters still apply.')).toBeTruthy();
  expect(text.includes('The account is derived from the API key or Bearer token.')).toBeTruthy();
  expect(await completeRead(`docs:${page.slug}`)).toBe(text);
});

test("operation slices preserve an explicit anonymous alternative without inventing a key requirement", () => {
  const page = { api: { method: 'GET', path: '/public', spec: 'public.json' } } as DocPage;
  const spec: ApiObject = { openapi: '3.0.3', info: { title: 'Test', version: '1' }, security: [{ ApiKey: [] }], paths: { '/public': { get: { security: [], responses: { '200': { description: 'Public response' } } } } }, components: { securitySchemes: { ApiKey: { type: 'apiKey', in: 'header', name: 'x-api-key' } } } };
  const before = JSON.stringify(spec);
  const slice = operationSpecification(page, spec)!;
  expect(slice.paths['/public'].get.security).toStrictEqual([]);
  expect(JSON.stringify(spec), 'No source mutation').toBe(before);
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
