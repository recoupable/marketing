import { describe, expect, it } from "vitest";
import { resolveDescriptionLinks } from "../resolve-description-links";
import { getAgentContentIndex } from "../agent-content/getAgentContentIndex";
import { getAgentCatalog } from "../agent-discovery/getAgentCatalog";
import { documentationAgentMarkdown, operationSpecification } from "../agent-markdown";
import type { DocPage } from "../docs";

describe("resolveDescriptionLinks", () => {
  it("prefixes docs-relative markdown links and leaves site links alone", () => {
    const input = "Start a [run](/api-reference/x), see [pricing](/pricing#usage) and [docs](/docs/credits).";
    expect(resolveDescriptionLinks(input)).toBe("Start a [run](/docs/api-reference/x), see [pricing](/pricing#usage) and [docs](/docs/credits).");
  });

  it("keeps every /agents/catalog.json description free of site-root api-reference links", () => {
    const catalog = getAgentCatalog(getAgentContentIndex());
    const broken = catalog.content.filter((item) => /\]\(\/api-reference\//.test(item.description)).map((item) => item.id);
    expect(broken).toEqual([]);
    expect(catalog.content.some((item) => item.description.includes("](/docs/api-reference/"))).toBe(true);
  });

  it("leaves markdown images alone and resolves links that carry a title", () => {
    const input = 'Shown as ![diagram](/assets/flow.png); read [runs](/api-reference/chat/runs "Chat runs").';
    expect(resolveDescriptionLinks(input)).toBe('Shown as ![diagram](/assets/flow.png); read [runs](/docs/api-reference/chat/runs "Chat runs").');
  });

  it("resolves docs-root links in the markdown served for reads and /docs/raw", async () => {
    const page = { title: "Runs", slug: "guides/runs", description: "Start with [runs](/api-reference/chat/runs).", body: "", category: "Guides", group: "Chat", searchText: "" } as unknown as DocPage;
    const markdown = await documentationAgentMarkdown(page);
    expect(markdown).toContain("](/docs/api-reference/chat/runs)");
    expect(markdown).not.toContain("](/api-reference/chat/runs)");
  });

  it("resolves docs-root links inside page bodies served for reads and /docs/raw", async () => {
    const page = { title: "Runs", slug: "api-reference/chat/runs", description: "Durable runs.", body: "Same engine as [`POST /api/chat`](/api-reference/chat/workflow). See [pricing](/pricing#usage).", category: "API", group: "Chat", searchText: "" } as unknown as DocPage;
    const markdown = await documentationAgentMarkdown(page);
    expect(markdown).toContain("](https://recoupable.dev/docs/api-reference/chat/workflow)");
    expect(markdown).toContain("](https://recoupable.dev/pricing#usage)");
    expect(markdown).not.toContain("](/api-reference/chat/workflow)");
  });

  it("resolves docs-root links inside the embedded operation slice", () => {
    const spec = { openapi: "3.1.0", info: { title: "t" }, paths: { "/api/chat/runs": { post: { summary: "Run", description: "Same engine as [`POST /api/chat`](/api-reference/chat/workflow).", requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/Body" } } } }, responses: { "200": { description: "See [status](/api-reference/chat/runs-status)." } } } } }, components: { schemas: { Body: { type: "object", properties: { sessionId: { type: "string", description: "Call [POST /api/sandbox](/api-reference/sandbox/create) first." } } } } } };
    const page = { title: "Runs", slug: "api-reference/chat/runs", api: { spec: "chat", path: "/api/chat/runs", method: "POST" } } as unknown as DocPage;
    const text = JSON.stringify(operationSpecification(page, spec));
    expect(text).toContain("](/docs/api-reference/chat/workflow)");
    expect(text).toContain("](/docs/api-reference/chat/runs-status)");
    expect(text).toContain("](/docs/api-reference/sandbox/create)");
    expect(text).not.toContain("](/api-reference/");
  });
});
