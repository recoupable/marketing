import { expect } from "vitest";

/** Truthiness assertion that also narrows the checked value's type for the code that follows. */
export function ok(value: unknown, message?: string): asserts value {
  expect(value, message).toBeTruthy();
}
