import { describe, expect, it } from "vitest";
import { resolveDescriptionLinks } from "../resolve-description-links";
import { getAgentContentIndex } from "../agent-content";
import { getAgentCatalog } from "../agent-discovery";
import { documentationAgentMarkdown } from "../agent-markdown";
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
});
