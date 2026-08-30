import { describe, expect, it } from "vitest";
import { getPlanCardClasses } from "../getPlanCardClasses";

/**
 * The highlighted (Pro) card must be the highest-contrast element on the page
 * in both themes: it inverts the page palette (foreground as its background),
 * so it is white on the dark theme and black on the light theme. Hard-coded
 * near-black and white values made it vanish on the dark theme.
 */
describe("getPlanCardClasses", () => {
  const hl = getPlanCardClasses(true);
  const plain = getPlanCardClasses(false);

  it("inverts the page palette on the highlighted card", () => {
    expect(hl.card).toContain("bg-[var(--foreground)]");
    expect(hl.card).toContain("text-[var(--background)]");
  });

  it("inverts the CTA, check icons and badge with the card", () => {
    expect(hl.cta).toContain("bg-[var(--background)]");
    expect(hl.cta).toContain("text-[var(--foreground)]");
    expect(hl.check).toContain("text-[var(--background)]");
    expect(hl.badge).toContain("bg-[var(--background)]");
    expect(hl.badge).toContain("text-[var(--foreground)]");
  });

  it("uses no hard-coded theme colors on the highlighted card", () => {
    const all = Object.values(hl).join(" ");
    expect(all).not.toMatch(/#080808|bg-white|text-white|text-black/);
  });

  it("keeps the shadow-as-border on the highlighted card", () => {
    expect(hl.card).toMatch(/shadow-\[0_0_0_1px/);
  });

  it("keeps secondary text at 70% or more so it reads on the inverted card", () => {
    for (const cls of [hl.eyebrow, hl.description, hl.period, hl.feature]) {
      const m = cls.match(/\/(\d+)\b/);
      expect(m, cls).not.toBeNull();
      expect(Number(m?.[1])).toBeGreaterThanOrEqual(70);
    }
  });

  it("leaves the plain card on the page palette with a border", () => {
    expect(plain.card).toContain("bg-[var(--background)]");
    expect(plain.card).toContain("border");
    expect(plain.cta).not.toContain("bg-[var(--background)]");
  });
});
