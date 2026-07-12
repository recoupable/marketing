import { describe, it, expect } from "vitest";
import { formatCompact } from "../formatCompact";

describe("formatCompact", () => {
  it("formats billions", () => {
    expect(formatCompact(23_313_699_417)).toBe("23B");
  });

  it("formats millions", () => {
    expect(formatCompact(118_000_000)).toBe("118M");
  });

  it("passes small numbers through", () => {
    expect(formatCompact(131)).toBe("131");
  });
});
