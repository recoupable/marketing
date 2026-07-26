import { describe, it, expect } from "vitest";
import { formatElapsedSeconds } from "../formatElapsedSeconds";

describe("formatElapsedSeconds", () => {
  it("formats zero", () => {
    expect(formatElapsedSeconds(0)).toBe("0s");
  });

  it("formats sub-minute values as seconds", () => {
    expect(formatElapsedSeconds(42)).toBe("42s");
    expect(formatElapsedSeconds(59)).toBe("59s");
  });

  it("formats whole minutes", () => {
    expect(formatElapsedSeconds(60)).toBe("1m 0s");
    expect(formatElapsedSeconds(120)).toBe("2m 0s");
  });

  it("formats minutes with remaining seconds", () => {
    expect(formatElapsedSeconds(75)).toBe("1m 15s");
    expect(formatElapsedSeconds(129)).toBe("2m 9s");
  });

  it("clamps negative input to zero", () => {
    expect(formatElapsedSeconds(-3)).toBe("0s");
  });

  it("floors fractional seconds", () => {
    expect(formatElapsedSeconds(41.9)).toBe("41s");
  });
});
