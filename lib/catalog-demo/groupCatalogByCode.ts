import type { CatalogEntry } from "./types.ts";

export function groupCatalogByCode(
  catalog: readonly CatalogEntry[],
): Map<string, CatalogEntry[]> {
  const byCode = new Map<string, CatalogEntry[]>();
  for (const entry of catalog)
    byCode.set(entry.code, [...(byCode.get(entry.code) ?? []), entry]);
  return byCode;
}
