import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/valuation/lead/route";
import { createAttioContact } from "@/lib/attio";
import { sendTelegramMessage } from "@/lib/telegram";

vi.mock("@/lib/attio", () => ({ createAttioContact: vi.fn().mockResolvedValue({ success: true }) }));
vi.mock("@/lib/telegram", () => ({ sendTelegramMessage: vi.fn().mockResolvedValue(true) }));

const req = (body: unknown) =>
  new Request("http://x/api/valuation/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const validLead = {
  email: "artist@example.com",
  artistName: "Mac Miller",
  valueBand: { low: 1_000_000, central: 2_000_000, high: 3_000_000 },
};

describe("POST /api/valuation/lead", () => {
  beforeEach(() => vi.clearAllMocks());

  it("upserts to Attio and pings Telegram with email + artist + value", async () => {
    const res = await POST(req(validLead));
    expect(res.status).toBe(200);

    expect(createAttioContact).toHaveBeenCalledWith({
      email: "artist@example.com",
      source: "catalog-valuation",
    });
    const text = vi.mocked(sendTelegramMessage).mock.calls[0][0];
    expect(text).toContain("artist@example.com");
    expect(text).toContain("Artist: Mac Miller\n"); // name only — no artist-id suffix
    expect(text).toContain("$2,000,000");
  });

  it("400s on an invalid email and does not notify", async () => {
    const res = await POST(req({ ...validLead, email: "not-an-email" }));
    expect(res.status).toBe(400);
    expect(createAttioContact).not.toHaveBeenCalled();
    expect(sendTelegramMessage).not.toHaveBeenCalled();
  });

  it("400s when the value band is missing", async () => {
    const { valueBand: _omit, ...noBand } = validLead;
    const res = await POST(req(noBand));
    expect(res.status).toBe(400);
  });

  it("still 200s but logs when the Attio upsert fails (lead must not be silently lost)", async () => {
    vi.mocked(createAttioContact).mockResolvedValueOnce({
      success: false,
      error: "Attio API error: 401",
    });
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(req(validLead));

    expect(res.status).toBe(200);
    expect(errSpy).toHaveBeenCalledWith(
      "[valuation/lead] Attio upsert failed:",
      "Attio API error: 401",
    );
    errSpy.mockRestore();
  });
});
