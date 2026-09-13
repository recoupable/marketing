import { resolveDescriptionLinks } from "./resolve-description-links.ts";

// Source specs link docs-root paths in every summary and description; a slice
// published for agents outside the docs renderer needs the /docs prefix.
export function resolveSpecLinks<T>(value: T): T {
  if (Array.isArray(value)) return value.map(resolveSpecLinks) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) =>
      [key, ["summary", "description"].includes(key) && typeof entry === "string" ? resolveDescriptionLinks(entry) : resolveSpecLinks(entry)])) as T;
  }
  return value;
}
