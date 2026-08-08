import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitBookingToAttio } from "@/lib/submitBookingToAttio";
import { createAttioContact } from "@/lib/attio";
import { createAttioNote } from "@/lib/createAttioNote";
import { notifyLeadCaptured } from "@/lib/notifyLeadCaptured";

vi.mock("@/lib/attio", () => ({ createAttioContact: vi.fn() }));
vi.mock("@/lib/createAttioNote", () => ({ createAttioNote: vi.fn() }));
vi.mock("@/lib/notifyLeadCaptured", () => ({
  notifyLeadCaptured: vi.fn().mockResolvedValue(undefined),
}));

const submission = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Test Co",
  package: "retained-advisor" as const,
  role: "Label Owner / GM",
  rosterSize: "21-50 artists",
};

describe("submitBookingToAttio", () => {
  beforeEach(() => {
    vi.mocked(createAttioContact).mockReset();
    vi.mocked(createAttioNote).mockReset();
    vi.mocked(notifyLeadCaptured).mockClear();
  });

  it("reports success once the person and the note both land", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: true, recordId: "rec_1" });
    vi.mocked(createAttioNote).mockResolvedValue({ success: true });

    expect(await submitBookingToAttio(submission)).toEqual({ ok: true });
    expect(createAttioNote).toHaveBeenCalledWith(
      expect.objectContaining({
        recordId: "rec_1",
        title: "Advisory Inquiry: Retained Advisor ($5,000/mo)",
      }),
    );
  });

  // The regression: the old route logged this and returned {success:true} anyway,
  // so every advisory lead since 2026-06-17 was reported as captured. chat#1800.
  it("FAILS when the person upsert fails — never reports success", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({
      success: false,
      error: "Attio API error: 400",
    });

    const result = await submitBookingToAttio(submission);
    expect(result.ok).toBe(false);
    expect(result).toMatchObject({ error: expect.stringContaining("400") });
    expect(createAttioNote).not.toHaveBeenCalled();
  });

  it("FAILS when the upsert returns no record id, since the note cannot be attached", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: true });

    const result = await submitBookingToAttio(submission);
    expect(result.ok).toBe(false);
    expect(createAttioNote).not.toHaveBeenCalled();
  });

  // The note IS the inquiry — a person row with no note is an unqualified email
  // address that no human will ever action.
  it("FAILS when the note fails, even though the person was created", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: true, recordId: "rec_1" });
    vi.mocked(createAttioNote).mockResolvedValue({
      success: false,
      error: "Attio note error: 400",
    });

    const result = await submitBookingToAttio(submission);
    expect(result.ok).toBe(false);
    expect(result).toMatchObject({ error: expect.stringContaining("note") });
  });

  it("passes the submitter's name through to the contact upsert", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: true, recordId: "rec_1" });
    vi.mocked(createAttioNote).mockResolvedValue({ success: true });

    await submitBookingToAttio(submission);
    expect(createAttioContact).toHaveBeenCalledWith(
      expect.objectContaining({ email: "ada@example.com", name: "Ada Lovelace" }),
    );
  });

  it("pages a human once the lead is stored, carrying the triage fields", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: true, recordId: "rec_1" });
    vi.mocked(createAttioNote).mockResolvedValue({ success: true });

    await submitBookingToAttio(submission);
    expect(notifyLeadCaptured).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "ada@example.com",
        source: "/advisory/book",
        company: "Test Co",
        role: "Label Owner / GM",
        package: "Retained Advisor ($5,000/mo)",
      }),
    );
  });

  it("does not page a human when the lead was never stored", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: false, error: "400" });

    await submitBookingToAttio(submission);
    expect(notifyLeadCaptured).not.toHaveBeenCalled();
  });

  // A paging outage must not undo a successful capture.
  it("still reports success when paging fails", async () => {
    vi.mocked(createAttioContact).mockResolvedValue({ success: true, recordId: "rec_1" });
    vi.mocked(createAttioNote).mockResolvedValue({ success: true });
    vi.mocked(notifyLeadCaptured).mockRejectedValueOnce(new Error("api down"));

    expect(await submitBookingToAttio(submission)).toEqual({ ok: true });
  });
});
