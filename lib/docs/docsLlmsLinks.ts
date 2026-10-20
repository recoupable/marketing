import { docHref } from "../docs-paths.ts";
import { siteConfig } from "../config.ts";

export type DocsLinkPage = { slug: string; title: string; description: string; api?: unknown };

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
const label = (value: string) => oneLine(value).replace(/[\\[\]]/g, "\\$&");
const line = (page: DocsLinkPage, descriptions: boolean) => `- [${label(page.title)}](${new URL(docHref(page.slug), siteConfig.url).href})${descriptions ? `: ${oneLine(page.description)}` : ""}`;

/** llms.txt sections listing every documentation page: guides first, then endpoint references. */
export function docsLlmsLinks(pages: readonly DocsLinkPage[], descriptions = true): string {
  const guides = pages.filter(page => !page.api).map(page => line(page, descriptions)).join("\n");
  const endpoints = pages.filter(page => page.api).map(page => line(page, descriptions)).join("\n");
  return `## Documentation\n\n${guides}\n\n## API reference\n\n${endpoints}`;
}
