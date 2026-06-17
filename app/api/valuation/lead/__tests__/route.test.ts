import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/valuation/lead/route";
import { upsertValuationLead } from "@/lib/valuation/upsertValuationLead";
import { sendTelegramMessage } from "@/lib/telegram";

vi.mock("@/lib/valuation/upsertValuationLead", () => ({
  upsertValuationLead: vi.fn().mockResolvedValue({ success: true }),
}));
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
  artistId: "4LLpKhyESsyAXpc4laK94U",
  valueBand: { low: 1_000_000, central: 2_000_000, high: 3_000_000 },
  lifetimeStreams: 22_000_000_000,
  followerCount: 13_000_000,
};

describe("POST /api/valuation/lead", () => {
  beforeEach(() => vi.clearAllMocks());

  it("enriches Attio with the qualifying fields and pings Telegram", async () => {
    const res = await POST(req(validLead));
    expect(res.status).toBe(200);

    expect(upsertValuationLead).toHaveBeenCalledWith({
      email: "artist@example.com",
      artistName: "Mac Miller",
      artistId: "4LLpKhyESsyAXpc4laK94U",
      valueBand: { low: 1_000_000, central: 2_000_000, high: 3_000_000 },
      lifetimeStreams: 22_000_000_000,
      followerCount: 13_000_000,
    });
    const text = vi.mocked(sendTelegramMessage).mock.calls[0][0];
    expect(text).toContain("artist@example.com");
    expect(text).toContain("Artist: Mac Miller\n"); // name only — no artist-id suffix
    expect(text).toContain("$2,000,000");
  });

  it("400s on an invalid email and does not notify", async () => {
    const res = await POST(req({ ...validLead, email: "not-an-email" }));
    expect(res.status).toBe(400);
    expect(upsertValuationLead).not.toHaveBeenCalled();
    expect(sendTelegramMessage).not.toHaveBeenCalled();
  });

  it("400s when the value band is missing", async () => {
    const { valueBand: _omit, ...noBand } = validLead;
    const res = await POST(req(noBand));
    expect(res.status).toBe(400);
  });

  it("400s when artistId is missing (needed for the Spotify link + attributes)", async () => {
    const { artistId: _omit, ...noId } = validLead;
    const res = await POST(req(noId));
    expect(res.status).toBe(400);
  });

  it("still 200s but logs when the Attio enrichment fails (lead must not be silently lost)", async () => {
    vi.mocked(upsertValuationLead).mockResolvedValueOnce({
      success: false,
      error: "Attio person assert failed: 401",
    });
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(req(validLead));

    expect(res.status).toBe(200);
    expect(errSpy).toHaveBeenCalledWith(
      "[valuation/lead] Attio enrichment failed:",
      "Attio person assert failed: 401",
    );
    errSpy.mockRestore();
  });
});
