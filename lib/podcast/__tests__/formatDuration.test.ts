import { expect, test } from "vitest";
import { formatDuration } from "../formatDuration.ts";

test("durations read as whole minutes the way the reference cards do", () => {
  expect(formatDuration(2437)).toBe("40 min");
  expect(formatDuration(3619)).toBe("60 min");
  expect(formatDuration(59)).toBe("1 min");
});
