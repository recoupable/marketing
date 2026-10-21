import { resolveDescriptionLinks } from "./resolve-description-links.ts";

// Source specs link docs-root paths in every summary and description; a slice
// published for agents outside the docs renderer needs the /docs prefix.
export function resolveSpecLinks<T>(value: T, siteUrl?: string): T {
  if (Array.isArray(value)) return value.map(entry => resolveSpecLinks(entry, siteUrl)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) =>
      [key, ["summary", "description"].includes(key) && typeof entry === "string" ? resolveDescriptionLinks(entry, siteUrl) : resolveSpecLinks(entry, siteUrl)])) as T;
  }
  return value;
}
