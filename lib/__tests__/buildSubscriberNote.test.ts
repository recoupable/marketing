import { describe, it, expect } from "vitest";
import { buildSubscriberNote } from "@/lib/buildSubscriberNote";

describe("buildSubscriberNote", () => {
  it("returns null when there is nothing qualifying to record", () => {
    expect(buildSubscriberNote({ email: "ada@example.com" })).toBeNull();
    expect(
      buildSubscriberNote({ email: "ada@example.com", utm_campaign: "blog-cta" }),
    ).toBeNull();
  });

  it("titles the note by campaign so audits and calculators are distinguishable", () => {
    const note = buildSubscriberNote({
      email: "ada@example.com",
      company: "Test Co",
      utm_campaign: "ai-audit",
    });
    expect(note?.title).toBe("Lead: ai-audit");
  });

  it("records the company, which Zod previously stripped", () => {
    const note = buildSubscriberNote({ email: "ada@example.com", company: "Test Co" });
    expect(note?.content).toContain("Company: Test Co");
  });

  it("records every audit answer and the score", () => {
    const note = buildSubscriberNote({
      email: "ada@example.com",
      company: "Test Co",
      utm_campaign: "ai-audit",
      audit_score: "high",
      audit_answers: { roster_size: "16-50", budget: "$5,000-$15,000" },
    });
    expect(note?.content).toContain("Audit score: high");
    expect(note?.content).toContain("roster_size: 16-50");
    expect(note?.content).toContain("budget: $5,000-$15,000");
  });

  it("records the ROI inputs and results", () => {
    const note = buildSubscriberNote({
      email: "ada@example.com",
      utm_campaign: "roi-calculator",
      roi_inputs: { rosterSize: 15, contentSpend: 5000 },
      roi_results: { annualSavings: 42000, recommendedPlan: "Pro" },
    });
    expect(note?.content).toContain("rosterSize: 15");
    expect(note?.content).toContain("annualSavings: 42000");
    expect(note?.content).toContain("recommendedPlan: Pro");
  });

  it("records the attribution the helper accepts but has never sent to Attio", () => {
    const note = buildSubscriberNote({
      email: "ada@example.com",
      company: "Test Co",
      utm_source: "newsletter",
      utm_medium: "lead-magnet",
      utm_campaign: "ai-audit",
      source_post_slug: "some-post",
    });
    expect(note?.content).toContain("utm_source: newsletter");
    expect(note?.content).toContain("utm_medium: lead-magnet");
    expect(note?.content).toContain("source_post_slug: some-post");
  });

  it("never emits undefined for absent fields", () => {
    const note = buildSubscriberNote({ email: "ada@example.com", company: "Test Co" });
    expect(note?.content).not.toContain("undefined");
  });
});
