import { resolveDocsHref } from "./docs-paths.ts";

// Documentation descriptions are authored with docs-root links such as
// ](/api-reference/x); outside the docs renderer they need the /docs prefix.
export function resolveDescriptionLinks(text: string) {
  return text.replace(/\]\((\/[^)\s]+)\)/g, (_, href: string) => `](${resolveDocsHref(href)})`);
}
