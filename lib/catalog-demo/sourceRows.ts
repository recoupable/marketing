import type { CatalogFixture, SourceName } from "./types.ts";

// The fixture uses unquoted CSV without commas inside fields. It is not an upload parser.
export function sourceRows(
  fixture: CatalogFixture,
  file: SourceName,
  header: string,
): string[][] {
  const lines = fixture.sources[file];
  if (lines[0] !== header) throw new Error(`Unexpected header in ${file}.`);
  const width = header.split(",").length;
  return lines.slice(1).map((line) => {
    const fields = line.split(",");
    if (fields.length !== width || fields.some((field) => !field)) {
      throw new Error(`Invalid fixture row in ${file}.`);
    }
    return fields;
  });
}
