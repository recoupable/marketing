import { sourceReference } from "./sourceReference.ts";
import { sourceRows } from "./sourceRows.ts";
import type { CatalogEntry, CatalogFixture } from "./types.ts";

export function parseCatalog(fixture: CatalogFixture): CatalogEntry[] {
  return sourceRows(
    fixture,
    "catalog.csv",
    "entry_id,catalog_code,title,artist",
  ).map(([entryId, code, title, artist], index) => ({
    entryId,
    code,
    title,
    artist,
    source: sourceReference(fixture, "catalog.csv", index + 2),
  }));
}
