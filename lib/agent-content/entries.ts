import { blogEntries } from "./blogEntries.ts";
import { docsEntries } from "./docsEntries.ts";
import { pageEntries } from "./pageEntries.ts";
import { playbookEntries } from "./playbookEntries.ts";
import type { AgentContentEntry } from "./types.ts";

export const entries: AgentContentEntry[] = [
  ...pageEntries,
  ...docsEntries,
  ...blogEntries,
  ...playbookEntries,
];
