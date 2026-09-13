import type { UtilityToolName } from "./types.ts";
import { utilityToolNames } from "./utilityToolNames.ts";

export function isUtilityToolName(name: string): name is UtilityToolName {
  return (utilityToolNames as readonly string[]).includes(name);
}
