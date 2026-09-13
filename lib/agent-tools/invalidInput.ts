import { AgentToolInputError } from "./AgentToolInputError.ts";
import type { AgentToolIssue } from "./types.ts";

export function invalidInput(issues: AgentToolIssue[]): never {
  throw new AgentToolInputError("INVALID_INPUT", issues);
}
