import { describe, expect, it } from "vitest";
import { inquiryMessageWithContext } from "../inquiryMessageWithContext";

describe("inquiryMessageWithContext", () => {
  it("prefixes the page context and appends first and latest visit sources without underscores", () => {
    const message = inquiryMessageWithContext("A useful brief.", "Project brief /start-project", {
      first: { utm_source: "chatgpt.com" },
      current: { utm_source: "pr95", utm_campaign: "sky" },
    });
    expect(message).toBe(
      "Website path: Project brief /start-project\n\nA useful brief.\n\nFirst visit source: source=chatgpt.com\nLatest visit source: source=pr95; campaign=sky",
    );
    expect(message).not.toContain("utm_");
  });
  it("omits the latest line when it repeats the first visit and omits both when untagged", () => {
    const same = inquiryMessageWithContext("Brief.", "AI transformation", { first: { utm_source: "x" }, current: { utm_source: "x" } });
    expect(same).toContain("First visit source: source=x");
    expect(same).not.toContain("Latest visit source");
    expect(inquiryMessageWithContext("Brief.", "AI transformation", {})).toBe("Website path: AI transformation\n\nBrief.");
  });
  it("keeps a maximum-length brief under the 6,000 character api limit", () => {
    const brief = "x".repeat(5000);
    const long = { utm_source: "a".repeat(64), utm_medium: "b".repeat(64), utm_campaign: "c".repeat(64) };
    const message = inquiryMessageWithContext(brief, "y".repeat(200), { first: long, current: { ...long, utm_source: "d".repeat(64) } });
    expect(message).toContain(brief);
    expect(message.length).toBeLessThan(6000);
  });
});
