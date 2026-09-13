import { readFileSync } from "node:fs";
import { test, expect } from "vitest";
import { compile, runSync } from "@mdx-js/mdx";
import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as runtime from "react/jsx-runtime";
import { docsHeadingPlugin } from "../scripts/docs-headings.ts";

function render(compiled: string) {
  const { default: Content } = runSync(compiled, { ...runtime, baseUrl: import.meta.url });
  const components = Object.fromEntries(["Card", "CardGroup", "CodeGroup", "Note", "Info", "Tip", "Warning"].map(name => [name, ({ children }: { children: ReactNode }) => createElement("div", null, children)]));
  return renderToStaticMarkup(createElement(Content, { components }));
}

test("parsed contents preserve real section headings while excluding Markdown inside code blocks", async () => {
  const headings: { title: string; id: string }[] = [];
  const source = [
    "## Actual **setup** with `API` & [tools](https://example.com)",
    "",
    "```bash",
    'cat > "RECOUP.md" <<EOF',
    "## Setup checklist",
    "## Notes",
    "EOF",
    "```",
    "",
    "## Notes",
    "",
    "## Notes",
    "",
    "## Notes-2",
    "",
    "### Subsection",
    "",
    "## Final step",
  ].join("\n");
  const compiled = String(await compile(source, { outputFormat: "function-body", remarkPlugins: [docsHeadingPlugin(headings)] }));
  expect(headings).toStrictEqual([
    { title: "Actual setup with API & tools", id: "actual-setup-with-api-tools" },
    { title: "Notes", id: "notes" },
    { title: "Notes", id: "notes-2" },
    { title: "Notes-2", id: "notes-2-2" },
    { title: "Final step", id: "final-step" },
  ]);
  const html = render(compiled);
  for (const heading of headings) expect(html.includes(`id="${heading.id}"`)).toBeTruthy();
  expect(html.includes('id="subsection"')).toBeTruthy();
  expect(html.includes("## Setup checklist"), "The code example remains complete").toBeTruthy();
  expect(!html.includes('id="setup-checklist"')).toBeTruthy();
});

test("every imported contents link has exactly one matching rendered section", () => {
  const pages: { slug: string; compiled?: string; headings: { title: string; id: string }[] }[] = JSON.parse(readFileSync(new URL("../content/docs/manifest.json", import.meta.url), "utf8"));
  let checked = 0;
  for (const page of pages) {
    if (!page.compiled) continue;
    const html = render(page.compiled);
    const ids = [...html.matchAll(/<h[23]\s[^>]*id="([^"]+)"/g)].map(match => match[1]);
    expect(new Set(ids).size, `Repeated section IDs on ${page.slug}`).toBe(ids.length);
    for (const heading of page.headings) {
      expect(ids.filter(id => id === heading.id).length, `Broken contents target ${page.slug}#${heading.id}`).toBe(1);
      checked++;
    }
  }
  expect(checked > 40).toBeTruthy();
  for (const slug of ["workflows/create-artist", "workflows/generate-music-video"]) {
    const page = pages.find(page => page.slug === slug)!;
    expect(!page.headings.some(heading => ["notes", "setup-checklist", "pipeline-checklist"].includes(heading.id))).toBeTruthy();
  }
});
