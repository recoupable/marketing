import { describe, expect, it } from "vitest";
import { GET as getLlms } from "@/app/llms.txt/route";
import { GET as getLlmsFull } from "@/app/llms-full.txt/route";
import { GET as getDocsLlms } from "@/app/docs/llms.txt/route";
import { docs } from "@/lib/docs";
import { docsLlmsFullText } from "@/lib/docs/docsLlmsFullText";
import { siteConfig } from "@/lib/config";

const pages = docs.filter(page => page.slug);
const quickstart = docs.find(page => page.slug === "quickstart")!;

describe("llms.txt documentation parity", () => {
  it("keeps the root index compact and links every document through its documentation index", async () => {
    const text = await getLlms().text();
    expect(text.length).toBeLessThan(30_000);
    expect(text).toContain(`${siteConfig.url}/docs/llms.txt)`);
    const documentation = await getDocsLlms().text();
    expect(documentation).toMatch(/^# Recoup documentation/);
    for (const page of pages) expect(documentation).toContain(`${siteConfig.url}/docs/${page.slug})`);
  });
});

describe("llms-full.txt documentation parity", () => {
  it("serves the marketing summaries followed by every documentation page's markdown", async () => {
    const text = await getLlmsFull().then(response => response.text());
    const documentation = await docsLlmsFullText(docs);
    expect(text.endsWith(documentation)).toBe(true);
    expect(text.indexOf("Content ID: page:")).toBeLessThan(text.indexOf(documentation));
    expect(documentation.match(/^Source: .*\/docs(\/|$)/gm)?.length ?? 0).toBe(docs.length);
    expect(text).toContain(`# ${quickstart.title}\n\nSource: ${siteConfig.url}/docs/quickstart\n`);
    expect(text).toContain("## Connect first");
  }, 60000);
});
