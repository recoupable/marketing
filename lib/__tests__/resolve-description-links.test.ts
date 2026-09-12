import { describe, expect, it } from "vitest";
import { resolveDescriptionLinks } from "../resolve-description-links";
import { getAgentContentIndex } from "../agent-content";
import { getAgentCatalog } from "../agent-discovery";

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
});
