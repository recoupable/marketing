import { describe, expect, it } from "vitest";
import { accountInitial } from "@/lib/format/accountInitial";

describe("accountInitial", () => {
  it("returns the uppercased first letter of the email", () => {
    expect(accountInitial("sweets@recoupable.dev")).toBe("S");
  });

  it("keeps an already-uppercase first letter", () => {
    expect(accountInitial("Ana@example.com")).toBe("A");
  });

  it("skips non-alphanumeric leading characters", () => {
    expect(accountInitial(".dots.first@example.com")).toBe("D");
  });

  it("uses a digit when the email starts with one", () => {
    expect(accountInitial("9lives@example.com")).toBe("9");
  });

  it("falls back to ? when there is no email", () => {
    expect(accountInitial(undefined)).toBe("?");
    expect(accountInitial(null)).toBe("?");
    expect(accountInitial("")).toBe("?");
  });
});
