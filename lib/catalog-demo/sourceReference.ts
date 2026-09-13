import type { CatalogFixture, SourceName, SourceReference } from "./types.ts";

export function sourceReference(
  fixture: CatalogFixture,
  file: SourceName,
  line: number,
): SourceReference {
  const text = fixture.sources[file][line - 1];
  if (text === undefined) throw new Error(`Missing source: ${file}:${line}`);
  return { file, line, text };
}
