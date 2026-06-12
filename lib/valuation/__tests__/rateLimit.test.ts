import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { checkRateLimit } from "../rateLimit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-12T12:00:00Z"));
  });
  afterEach(() => vi.useRealTimers());

  it("allows up to 3 runs per hour per ip, then blocks", () => {
    const ip = "1.2.3." + Math.floor(Math.random() * 255);
    expect(checkRateLimit(ip)).toBe(true);
    expect(checkRateLimit(ip)).toBe(true);
    expect(checkRateLimit(ip)).toBe(true);
    expect(checkRateLimit(ip)).toBe(false);
    vi.advanceTimersByTime(61 * 60 * 1000);
    expect(checkRateLimit(ip)).toBe(true);
  });
});
