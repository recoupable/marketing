import { entries } from "./entries.ts";
import type { AgentContentMetadata } from "./types.ts";

export function getAgentContentIndex(): AgentContentMetadata[] {
  return entries.map((entry) => structuredClone(entry.metadata));
}
