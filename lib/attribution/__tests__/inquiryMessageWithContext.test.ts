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

it("preserves creative identifiers and bounds both fully populated visits", () => {
  const tags = { utm_source: "x".repeat(100), utm_medium: "x".repeat(100), utm_campaign: "x".repeat(100), utm_content: "x".repeat(100), campaign_id: "a".repeat(32), ad_group_id: "b".repeat(32), ad_id: "c".repeat(32) };
  const message = inquiryMessageWithContext("x".repeat(5000), "Royalty reporting /royalty-reporting", { first: tags, current: { ...tags, ad_id: "d".repeat(32) } });
  expect(message.length).toBeLessThanOrEqual(6000);
  expect(message).toContain(`ad id=${"c".repeat(32)}`);
  expect(message).toContain(`ad id=${"d".repeat(32)}`);
});
