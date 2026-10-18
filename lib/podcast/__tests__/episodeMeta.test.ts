import { expect, test } from "vitest";
import { episodeMeta } from "../episodeMeta.ts";

test("an episode's meta line reads its published date, then its length", () => {
  expect(episodeMeta({ date: "2026-10-18", durationSeconds: 1826 })).toBe("10/18/2026 · 30 min");
});
