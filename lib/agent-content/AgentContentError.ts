import type { AgentContentErrorCode } from "./types.ts";

export class AgentContentError extends Error {
  readonly status: 400 | 404;
  readonly code: AgentContentErrorCode;
  constructor(code: AgentContentErrorCode, message: string) {
    super(message);
    this.name = "AgentContentError";
    this.code = code;
    this.status = code === "NOT_FOUND" ? 404 : 400;
  }
}
