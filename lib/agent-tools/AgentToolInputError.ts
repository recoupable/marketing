import type { AgentToolIssue } from "./types.ts";

export class AgentToolInputError extends Error {
  readonly code: "INVALID_INPUT" | "UNKNOWN_TOOL";
  readonly issues: AgentToolIssue[];

  constructor(
    code: "INVALID_INPUT" | "UNKNOWN_TOOL",
    issues: AgentToolIssue[],
  ) {
    super(
      code === "UNKNOWN_TOOL"
        ? "Unknown utility tool."
        : "Some tool inputs are missing or invalid.",
    );
    this.name = "AgentToolInputError";
    this.code = code;
    this.issues = issues;
  }
}
