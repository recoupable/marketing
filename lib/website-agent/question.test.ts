import { expect, it } from "vitest";
import { questionSchema } from "./question";

const option = { label: "Simplify reporting", description: "Bring statement totals together." };
it("accepts a concise question with two or three choices", () => {
  expect(questionSchema.safeParse({ context: "You manage publishing rights.", question: "Where should we start?", options: [option, option] }).success).toBe(true);
});
it("rejects overwhelming choices and oversized copy", () => {
  expect(questionSchema.safeParse({ context: "", question: "Choose", options: Array(4).fill(option) }).success).toBe(false);
  expect(questionSchema.safeParse({ context: "x".repeat(181), question: "Choose", options: [option, option] }).success).toBe(false);
});
