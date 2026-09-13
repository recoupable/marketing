import { entries } from "./entries.ts";

export const registry = new Map(
  entries.map((entry) => [entry.metadata.id, entry]),
);
