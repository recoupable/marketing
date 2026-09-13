import { describe, expect, it } from "vitest";
import { appLink } from "../appLink";

describe("appLink", () => {
  it("tags the app root with the marketing campaign and the placement as medium", () => {
    expect(appLink("pricing")).toBe(
      "https://app.recoupable.dev/?utm_source=marketing&utm_medium=pricing&utm_campaign=sky",
    );
  });

  it("keeps deep links such as a catalog report", () => {
    expect(appLink("valuation", { path: "/catalogs/abc-123" })).toBe(
      "https://app.recoupable.dev/catalogs/abc-123?utm_source=marketing&utm_medium=valuation&utm_campaign=sky",
    );
  });

  it("lets the visitor's own campaign tags win over the defaults", () => {
    expect(appLink("pricing", { attribution: { current: { utm_source: "pr95", utm_campaign: "launch" } } })).toBe(
      "https://app.recoupable.dev/?utm_source=pr95&utm_medium=pricing&utm_campaign=launch",
    );
    expect(appLink("pricing", { attribution: { first: { utm_medium: "newsletter" } } })).toBe(
      "https://app.recoupable.dev/?utm_source=marketing&utm_medium=newsletter&utm_campaign=sky",
    );
  });

  it("ignores tags that are not campaign labels", () => {
    expect(appLink("pricing", { attribution: { current: { utm_source: "person@example.com" } } })).toBe(
      "https://app.recoupable.dev/?utm_source=marketing&utm_medium=pricing&utm_campaign=sky",
    );
  });
});
