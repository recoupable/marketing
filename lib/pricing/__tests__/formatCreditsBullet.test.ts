import { describe, expect, it } from "vitest";
import { formatCreditsBullet } from "../formatCreditsBullet";

/**
 * Credits are dollars (micro-dollars in the ledger). The plan card states the
 * monthly budget as money plus an outcome count so a visitor can compare tiers
 * without knowing the unit. Median cost of one scheduled report run over the
 * 30 days to 2026-08-28 was $0.766 (42 runs, usage_events).
 */
describe("formatCreditsBullet", () => {
  it("states the Pro budget as dollars and about 130 report runs", () => {
    expect(formatCreditsBullet(99.99, 0.766)).toBe(
      "$99.99 in agent credits every month, about 130 report runs",
    );
  });

  it("states the Free budget as dollars and about 4 report runs", () => {
    expect(formatCreditsBullet(3.33, 0.766)).toBe(
      "$3.33 in agent credits every month, about 4 report runs",
    );
  });

  it("uses the singular for a single run", () => {
    expect(formatCreditsBullet(0.8, 0.766)).toBe(
      "$0.80 in agent credits every month, about 1 report run",
    );
  });
});
