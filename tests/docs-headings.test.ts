import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
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
  assert.deepEqual(headings, [
    { title: "Actual setup with API & tools", id: "actual-setup-with-api-tools" },
    { title: "Notes", id: "notes" },
    { title: "Notes", id: "notes-2" },
    { title: "Notes-2", id: "notes-2-2" },
    { title: "Final step", id: "final-step" },
  ]);
  const html = render(compiled);
  for (const heading of headings) assert.ok(html.includes(`id="${heading.id}"`));
  assert.ok(html.includes('id="subsection"'));
  assert.ok(html.includes("## Setup checklist"), "The code example remains complete");
  assert.ok(!html.includes('id="setup-checklist"'));
});

test("every imported contents link has exactly one matching rendered section", () => {
  const pages: { slug: string; compiled?: string; headings: { title: string; id: string }[] }[] = JSON.parse(readFileSync(new URL("../content/docs/manifest.json", import.meta.url), "utf8"));
  let checked = 0;
  for (const page of pages) {
    if (!page.compiled) continue;
    const html = render(page.compiled);
    const ids = [...html.matchAll(/<h[23]\s[^>]*id="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `Repeated section IDs on ${page.slug}`);
    for (const heading of page.headings) {
      assert.equal(ids.filter(id => id === heading.id).length, 1, `Broken contents target ${page.slug}#${heading.id}`);
      checked++;
    }
  }
  assert.ok(checked > 40);
  for (const slug of ["workflows/create-artist", "workflows/generate-music-video"]) {
    const page = pages.find(page => page.slug === slug)!;
    assert.ok(!page.headings.some(heading => ["notes", "setup-checklist", "pipeline-checklist"].includes(heading.id)));
  }
});
