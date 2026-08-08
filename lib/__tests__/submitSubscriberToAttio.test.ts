import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitSubscriberToAttio } from "@/lib/submitSubscriberToAttio";
import { createAttioContact } from "@/lib/attio";
import { createAttioNote } from "@/lib/createAttioNote";
import { notifyLeadCaptured } from "@/lib/notifyLeadCaptured";

vi.mock("@/lib/attio", () => ({ createAttioContact: vi.fn() }));
vi.mock("@/lib/createAttioNote", () => ({
  createAttioNote: vi.fn().mockResolvedValue({ success: true }),
}));
vi.mock("@/lib/notifyLeadCaptured", () => ({
  notifyLeadCaptured: vi.fn().mockResolvedValue(undefined),
}));

const subscriber = {
  email: "ada@example.com",
  name: "Ada Lovelace",
  utm_campaign: "ai-audit",
  utm_medium: "lead-magnet",
};

describe("submitSubscriberToAttio", () => {
  beforeEach(() => {
    vi.mocked(createAttioContact).mockReset();
    vi.mocked(createAttioNote).mockReset().mockResolvedValue({ success: true });
    vi.mocked(notifyLeadCaptured).mockClear();
  });

  it("stores the subscriber and reports success", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: true, recordId: "rec_1" });
    expect(await submitSubscriberToAttio(subscriber)).toEqual({ ok: true });
  });

  it("reports failure with the upstream reason when the upsert fails", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({
      success: false,
      error: "Attio API error: 400",
    });

    const result = await submitSubscriberToAttio(subscriber);
    expect(result.ok).toBe(false);
    expect(result).toMatchObject({ error: expect.stringContaining("400") });
  });

  it("pages a human with the campaign as the source", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: true, recordId: "rec_1" });

    await submitSubscriberToAttio(subscriber);
    expect(notifyLeadCaptured).toHaveBeenCalledWith(
      expect.objectContaining({ email: "ada@example.com", source: "ai-audit" }),
    );
  });

  it("falls back to a generic source when no campaign was supplied", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: true, recordId: "rec_1" });

    await submitSubscriberToAttio({ email: "ada@example.com" });
    expect(notifyLeadCaptured).toHaveBeenCalledWith(
      expect.objectContaining({ source: "website" }),
    );
  });

  it("does not page a human when the lead was never stored", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: false, error: "400" });

    await submitSubscriberToAttio(subscriber);
    expect(notifyLeadCaptured).not.toHaveBeenCalled();
  });

  it("still reports success when paging fails", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: true, recordId: "rec_1" });
    vi.mocked(notifyLeadCaptured).mockRejectedValueOnce(new Error("api down"));

    expect(await submitSubscriberToAttio(subscriber)).toEqual({ ok: true });
  });

  // Zod stripped these and the audit's only qualifying data was binned. chat#1800.
  it("writes the audit answers, score and company as a note", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: true, recordId: "rec_1" });

    await submitSubscriberToAttio({
      ...subscriber,
      company: "Test Co",
      audit_score: "high",
      audit_answers: { roster_size: "16-50" },
    });

    expect(createAttioNote).toHaveBeenCalledWith(
      expect.objectContaining({ recordId: "rec_1", title: "Lead: ai-audit" }),
    );
    const { content } = vi.mocked(createAttioNote).mock.calls[0][0];
    expect(content).toContain("Company: Test Co");
    expect(content).toContain("Audit score: high");
    expect(content).toContain("roster_size: 16-50");
  });

  it("writes the ROI inputs and results as a note", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: true, recordId: "rec_1" });

    await submitSubscriberToAttio({
      email: "ada@example.com",
      utm_campaign: "roi-calculator",
      roi_inputs: { rosterSize: 15 },
      roi_results: { annualSavings: 42000 },
    });

    const { content } = vi.mocked(createAttioNote).mock.calls[0][0];
    expect(content).toContain("rosterSize: 15");
    expect(content).toContain("annualSavings: 42000");
  });

  it("writes no note for a plain newsletter signup", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: true, recordId: "rec_1" });

    await submitSubscriberToAttio({ email: "ada@example.com", utm_campaign: "blog-cta" });
    expect(createAttioNote).not.toHaveBeenCalled();
  });

  // The contact is stored either way; losing the detail must not lose the lead.
  it("still reports success when only the note fails", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: true, recordId: "rec_1" });
    vi.mocked(createAttioNote).mockResolvedValue({ success: false, error: "400" });

    expect(await submitSubscriberToAttio({ ...subscriber, company: "Test Co" })).toEqual({
      ok: true,
    });
  });

  it("carries the company into the notification", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: true, recordId: "rec_1" });

    await submitSubscriberToAttio({ ...subscriber, company: "Test Co" });
    expect(notifyLeadCaptured).toHaveBeenCalledWith(
      expect.objectContaining({ company: "Test Co" }),
    );
  });
});
