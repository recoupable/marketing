import assert from "node:assert/strict";
import test from "node:test";
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
    assert.equal(part.offset, offset);
    assert.ok(Array.from(part.markdown).length <= maxLength);
    markdown += part.markdown;
    if (part.nextOffset === null) {
      assert.equal(Array.from(markdown).length, part.totalLength);
      return markdown;
    }
    assert.ok(part.nextOffset > offset, "Each continuation advances");
    offset = part.nextOffset;
  }
}

test("the fixed public registry covers published content with canonical URLs and accurate representations", () => {
  assert.equal(index.filter(item => item.type === "docs").length, docs.length);
  assert.equal(index.filter(item => item.type === "blog").length, posts.length);
  assert.equal(index.filter(item => item.type === "playbook").length, chapters.length);
  assert.equal(index.filter(item => item.type === "page").length, 22);
  for (const path of ["/case-studies", "/case-studies/royalty-reporting", "/case-studies/investment-review", "/case-studies/catalog-intelligence"]) {
    assert.ok(index.some(item => item.id === `page:${path}`), `${path} is discoverable`);
  }
  assert.equal(new Set(index.map(item => item.id)).size, index.length);
  for (const item of index) {
    assert.equal(new URL(item.url).origin, new URL(site.url).origin);
    assert.ok(!/\/designs(?:\/|$)|\/clients(?:\/|$)|\.local|\/source\//.test(item.url));
    assert.equal(item.representation, item.type === "page" ? "summary" : "full");
    assert.ok(item.title && item.description);
  }
  assert.ok(index.some(item => item.id === "page:/agents"));
  assert.ok(index.some(item => item.id === "page:/start-project"));
  const copy = getAgentContentIndex();
  copy[0].title = "Changed by caller";
  assert.notEqual(getAgentContentIndex()[0].title, copy[0].title);
});

test("workflow searches lead buyers to the relevant service and implementation", async () => {
  for (const [query, expected] of [
    ["royalty reporting", "page:/operations"],
    ["music fund due diligence", "page:/acquisitions"],
    ["connect our CRM to catalog data", "page:/build"],
    ["agent public website search", "page:/agents"],
  ]) assert.equal((await searchAgentContent({ query })).results[0]?.id, expected, query);
  const musicVideo = await searchAgentContent({ query: "create music video", type: "docs" });
  assert.ok(musicVideo.results.some(item => item.id === "docs:workflows/generate-music-video"));
});

test("exact API method and path prioritize the correct source operation", async () => {
  const result = await searchAgentContent({ query: "GET /api/artists", type: "docs" });
  assert.equal(result.results[0].id, "docs:api-reference/artists/list");
  assert.equal(result.results[0].api?.method, "GET");
  assert.equal(result.results[0].api?.path, "/api/artists");
  assert.ok(result.results[0].api?.specificationUrl.startsWith(`${site.url}/docs/spec/`));
});

test("search pagination is deterministic, filtered, and has no skipped or repeated entries", async () => {
  const first = await searchAgentContent({ query: "artist", type: "docs", limit: 7 });
  assert.deepEqual(await searchAgentContent({ query: "artist", type: "docs", limit: 7 }), first);
  assert.ok(first.total > first.results.length);
  const ids = first.results.map(item => item.id);
  let cursor = first.nextCursor;
  while (cursor !== null) {
    const page = await searchAgentContent({ query: "artist", type: "docs", limit: 7, cursor });
    assert.equal(page.total, first.total);
    assert.ok(page.results.every(item => item.type === "docs"));
    ids.push(...page.results.map(item => item.id));
    cursor = page.nextCursor;
  }
  assert.equal(ids.length, first.total);
  assert.equal(new Set(ids).size, first.total);
});

test("no matches return an empty result rather than a fabricated answer", async () => {
  assert.deepEqual(await searchAgentContent({ query: "zzzzunfindablezzzz" }), { query: "zzzzunfindablezzzz", results: [], total: 0, nextCursor: null });
  assert.equal((await searchAgentContent({ query: "the and of" })).total, 0);
});

test("search rejects malformed input and bounded-field violations", async () => {
  for (const input of [null, [], {}, { query: "" }, { query: "   " }, { query: "x".repeat(241) }, { query: "artist\nkey" }, { query: "artist", url: "https://example.com" }]) {
    await assert.rejects(searchAgentContent(input as AgentSearchInput), errorWith("INVALID_QUERY"));
  }
  await assert.doesNotReject(searchAgentContent({ query: "x".repeat(240) }));
  for (const limit of [0, 11, 1.5, null, "5", NaN]) await assert.rejects(searchAgentContent({ query: "artist", limit } as AgentSearchInput), errorWith("INVALID_LIMIT"));
  await assert.rejects(searchAgentContent({ query: "artist", type: "private" } as unknown as AgentSearchInput), errorWith("INVALID_TYPE"));
  for (const cursor of ["-1", "01", "1.2", "99999", "x".repeat(201), null]) await assert.rejects(searchAgentContent({ query: "artist", cursor } as AgentSearchInput), errorWith("INVALID_CURSOR"));
});

test("reads accept exact public IDs only, with no arbitrary URL or filesystem access", async () => {
  for (const id of ["https://example.com", "file:///etc/passwd", "../../private", "docs:../authentication", "docs:%2e%2e/private", "page:/contact?email=user@example.com", "page:/services#proof", "docs:" + "x".repeat(301)]) {
    await assert.rejects(readAgentContent({ id }), errorWith("INVALID_ID"));
  }
  await assert.rejects(readAgentContent({ id: "docs:private-client-material" }), errorWith("NOT_FOUND", 404));
  for (const input of [null, [], { id: "page:/services", url: "https://example.com" }]) await assert.rejects(readAgentContent(input as AgentReadInput), errorWith("INVALID_ID"));
  for (const offset of [-1, 1.5, null, Number.MAX_SAFE_INTEGER + 1]) await assert.rejects(readAgentContent({ id: "page:/services", offset } as AgentReadInput), errorWith("INVALID_OFFSET"));
  for (const maxLength of [0, 12001, 1.5, null]) await assert.rejects(readAgentContent({ id: "page:/services", maxLength } as AgentReadInput), errorWith("INVALID_MAX_LENGTH"));
});

test("read continuation preserves complete text, including a one-character page", async () => {
  const id = "docs:api-reference/tasks/update";
  const first = await readAgentContent({ id });
  assert.equal(Array.from(first.markdown).length, 6000);
  assert.equal(first.nextOffset, 6000);
  const complete = await completeRead(id);
  assert.equal(complete, await completeRead(id, 4097));
  const small = await completeRead("page:/agents");
  assert.equal(small, await completeRead("page:/agents", 1));
  const end = await readAgentContent({ id, offset: first.totalLength });
  assert.equal(end.markdown, "");
  assert.equal(end.nextOffset, null);
  await assert.rejects(readAgentContent({ id, offset: first.totalLength + 1 }), errorWith("INVALID_OFFSET"));
});

test("marketing responses visibly identify summaries and point to the complete public page", async () => {
  const result = await readAgentContent({ id: "page:/services" });
  assert.equal(result.representation, "summary");
  assert.match(result.markdown, /Representation: Summary of the public page/);
  assert.ok(result.markdown.includes(`Source: ${site.url}/services`));
  assert.ok(result.markdown.includes(`](${site.url}/contact)`));
  const publicTools = await readAgentContent({ id: "page:/agents" });
  assert.match(publicTools.markdown, /do not access private account or client information/);
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
  assert.ok(text.includes(`[Authentication](${site.url}/docs/authentication)`));
  assert.ok(text.includes('Keep **API keys** on the server.'));
  assert.ok(text.includes(`API operation](${site.url}/docs/api-reference/artists/list)`));
  assert.ok(text.includes('> **Note**'));
  assert.ok(!text.includes('<CardGroup'));
  assert.ok(text.includes('```bash\ncat <<EOF\n<Card title="literal code">\n## Code heading\nEOF\n```'));
  assert.ok(text.includes('| Field | Required |\n| --- | --- |\n| id | yes |'));
  assert.ok(text.includes(`[Raw guide](${site.url}/docs/raw/quickstart.md)`));
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
    assert.ok(slice, page.slug);
    const operation = spec.paths[page.api.path][page.api.method.toLowerCase()];
    assert.deepEqual(slice.paths[page.api.path][page.api.method.toLowerCase()], operation);
    assert.deepEqual(slice.security, spec.security);
    assert.deepEqual(slice.paths[page.api.path].parameters, spec.paths[page.api.path].parameters);
    for (const ref of references(slice)) {
      if (!ref.startsWith('#/')) continue;
      assert.notEqual(resolvePointer(slice, ref), undefined, `${page.slug}: unresolved ${ref}`);
      refsChecked++;
    }
    for (const alternative of operation.security ?? spec.security ?? []) for (const scheme of Object.keys(alternative)) {
      if (spec.components?.securitySchemes?.[scheme]) assert.deepEqual(slice.components.securitySchemes[scheme], spec.components.securitySchemes[scheme]);
      else assert.match(await documentationAgentMarkdown(page), /Documentation gap:/, `${page.slug}: missing security scheme must be disclosed`);
    }
    operations++;
  }
  assert.ok(operations > 150);
  assert.ok(refsChecked > 100);
});

test("API Markdown includes source-specific authentication and full-specification pointers", async () => {
  const page = (docs as DocPage[]).find(page => page.slug === 'api-reference/artists/list')!;
  const text = await documentationAgentMarkdown(page);
  assert.ok(text.includes(`Full OpenAPI specification: ${site.url}/docs/spec/${page.api!.spec}`));
  assert.ok(text.includes(`[Authentication guide](${site.url}/docs/authentication)`));
  assert.ok(text.includes('Its declared headers and parameters still apply.'));
  assert.ok(text.includes('The account is derived from the API key or Bearer token.'));
  assert.equal(await completeRead(`docs:${page.slug}`), text);
});

test("operation slices preserve an explicit anonymous alternative without inventing a key requirement", () => {
  const page = { api: { method: 'GET', path: '/public', spec: 'public.json' } } as DocPage;
  const spec: ApiObject = { openapi: '3.0.3', info: { title: 'Test', version: '1' }, security: [{ ApiKey: [] }], paths: { '/public': { get: { security: [], responses: { '200': { description: 'Public response' } } } } }, components: { securitySchemes: { ApiKey: { type: 'apiKey', in: 'header', name: 'x-api-key' } } } };
  const before = JSON.stringify(spec);
  const slice = operationSpecification(page, spec)!;
  assert.deepEqual(slice.paths['/public'].get.security, []);
  assert.equal(JSON.stringify(spec), before, 'No source mutation');
});

test("every public document is readable and playbook output preserves all chapter content", async () => {
  for (const item of index) {
    const result = await readAgentContent({ id: item.id });
    assert.ok(result.markdown.startsWith('# '), item.id);
    assert.ok(result.totalLength > 80, item.id);
  }
  for (const chapter of chapters) {
    const text = await completeRead(`playbook:${chapter.slug}`);
    for (const section of chapter.sections) {
      assert.ok(text.includes(section.heading));
      for (const field of ['paragraphs', 'items', 'steps'] as const) {
        for (const item of (section as Record<string, unknown>)[field] as string[] || []) assert.ok(text.includes(item), `${chapter.slug} missing ${field}`);
      }
      for (const prompt of ('prompts' in section ? section.prompts : []) || []) {
        assert.ok(text.includes(prompt.label));
        assert.ok(text.includes(prompt.text));
      }
    }
  }
});

test("article responses retain published identity, dates, and full readable body", async () => {
  for (const post of posts) {
    const result = await readAgentContent({ id: `blog:${post.slug}` });
    assert.equal(result.publishedAt, post.date);
    assert.equal(result.updatedAt, 'updatedAt' in post ? post.updatedAt : undefined);
    const text = await completeRead(result.id);
    assert.ok(text.includes(`Author: ${post.author}`));
    assert.ok(text.endsWith(readableAgentMarkdown(post.body, result.url) + '\n'));
  }
});
