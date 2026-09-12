import { describe, expect, it } from "vitest";
import { getLlmsText } from "@/lib/agent-discovery/getLlmsText";
import { getLlmsFullText } from "@/lib/agent-discovery/getLlmsFullText";
import { docs } from "@/lib/docs";

const index = [{ id: "page:services", type: "page", title: "Services", description: "Consulting.", url: "/services" }];

describe("llms.txt documentation parity", () => {
  it("links every documentation page after the site sections", () => {
    const text = getLlmsText(index, docs);
    expect(text.match(/\/docs\//g)?.length).toBeGreaterThanOrEqual(185);
    expect(text.indexOf("## Services and public pages")).toBeLessThan(text.indexOf("## Documentation"));
    expect(text.indexOf("## Documentation")).toBeLessThan(text.indexOf("## API reference"));
    for (const page of docs.filter(page => page.slug)) expect(text).toContain(`/docs/${page.slug})`);
  });

  it("describes llms-full.txt as carrying the platform documentation", () => {
    expect(getLlmsFullText(index)).toMatch(/complete platform documentation/);
  });
});
