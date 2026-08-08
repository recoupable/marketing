import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitSubscriberToAttio } from "@/lib/submitSubscriberToAttio";
import { createAttioContact } from "@/lib/attio";
import { notifyLeadCaptured } from "@/lib/notifyLeadCaptured";

vi.mock("@/lib/attio", () => ({ createAttioContact: vi.fn() }));
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
});
