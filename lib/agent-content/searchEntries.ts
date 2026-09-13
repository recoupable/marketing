import { entries } from "./entries.ts";
import { tokens } from "./tokens.ts";

export const searchEntries = entries.map((entry) => ({
  entry,
  title: new Set(tokens(entry.metadata.title)),
  description: new Set(tokens(entry.metadata.description)),
  keywords: new Set(tokens(entry.keywords)),
  body: new Set(tokens(entry.searchable)),
}));
