import { AgentContentError } from "./AgentContentError.ts";
import type { AgentContentErrorCode } from "./types.ts";

export function validateFields(
  input: unknown,
  fields: string[],
  code: AgentContentErrorCode,
): void {
  if (
    !input ||
    typeof input !== "object" ||
    Array.isArray(input) ||
    ![Object.prototype, null].includes(Object.getPrototypeOf(input))
  )
    throw new AgentContentError(
      code,
      "Provide an object containing the documented fields.",
    );
  if (
    Reflect.ownKeys(input).some(
      (key) => typeof key !== "string" || !fields.includes(key),
    )
  )
    throw new AgentContentError(code, "Use only the documented fields.");
}
