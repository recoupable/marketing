import { describe, expect, it } from "vitest";
import { oneLine } from "../oneLine";

describe("oneLine", () => {
  it("collapses newlines, carriage returns, and runs of whitespace into single spaces", () => {
    expect(oneLine("  A\r\nspecial\n\n  page \t here ")).toBe(
      "A special page here",
    );
  });
});
