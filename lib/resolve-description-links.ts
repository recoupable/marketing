import { resolveDocsHref } from "./docs-paths.ts";

// Documentation descriptions are authored with docs-root links such as
// [x](/api-reference/x); outside the docs renderer they need the /docs prefix.
// Images (![alt](/x)) are left alone; an optional link title is preserved.
export function resolveDescriptionLinks(text: string, siteUrl?: string) {
  return text.replace(
    /(!?)\[([^\]]*)\]\((\/[^)\s]+)(\s+"[^"]*")?\)/g,
    (match, image: string, label: string, href: string, title = "") => {
      if (image) return match;
      const resolved = resolveDocsHref(href);
      return `[${label}](${siteUrl ? new URL(resolved, siteUrl).href : resolved}${title})`;
    },
  );
}
