import { describe, expect, it } from "vitest";
import { GET as getLlms } from "@/app/llms.txt/route";
import { GET as getLlmsFull } from "@/app/llms-full.txt/route";
import { docs } from "@/lib/docs";
import { docsLlmsFullText } from "@/lib/docs/docsLlmsFullText";
import { site } from "@/lib/site";

const pages = docs.filter(page => page.slug);
const quickstart = docs.find(page => page.slug === "quickstart")!;

describe("llms.txt documentation parity", () => {
  it("links every documentation page after the site sections", async () => {
    const text = await getLlms().text();
    expect(text.match(/\/docs\//g)?.length ?? 0).toBeGreaterThanOrEqual(pages.length);
    expect(text.indexOf("## Services and public pages")).toBeLessThan(text.indexOf("## Documentation"));
    expect(text.indexOf("## Documentation")).toBeLessThan(text.indexOf("## API reference"));
    for (const page of pages) expect(text).toContain(`${site.url}/docs/${page.slug})`);
  });
});

describe("llms-full.txt documentation parity", () => {
  it("serves the marketing summaries followed by every documentation page's markdown", async () => {
    const text = await getLlmsFull().then(response => response.text());
    const documentation = await docsLlmsFullText(docs);
    expect(text.endsWith(documentation)).toBe(true);
    expect(text.indexOf("Content ID: page:")).toBeLessThan(text.indexOf(documentation));
    expect(text.match(/^Source: .*\/docs(\/|$)/gm)?.length ?? 0).toBe(docs.length);
    expect(text).toContain(`# ${quickstart.title}\n\nSource: ${site.url}/docs/quickstart\n`);
    expect(text).toContain("## Quickest start");
  }, 60000);
});
