import { invalidInput } from "./invalidInput.ts";

export function requireObject(
  input: unknown,
  allowed: readonly string[],
  field = "input",
): Record<string, unknown> {
  if (
    input === null ||
    typeof input !== "object" ||
    Array.isArray(input) ||
    ![Object.prototype, null].includes(Object.getPrototypeOf(input))
  ) {
    return invalidInput([
      { field, message: "Must be an object containing the documented fields." },
    ]);
  }
  const unexpected = Reflect.ownKeys(input).filter(
    (key) => typeof key !== "string" || !allowed.includes(key),
  );
  if (unexpected.length)
    return invalidInput(
      unexpected.map((key) => ({
        field: `${field}.${String(key)}`,
        message: "Unknown field.",
      })),
    );
  return input as Record<string, unknown>;
}
