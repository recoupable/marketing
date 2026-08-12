import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { notifyLeadCaptured } from "@/lib/notifyLeadCaptured";

const lead = {
  email: "ada@example.com",
  source: "/advisory/book",
  name: "Ada Lovelace",
  company: "Test Co",
};

describe("notifyLeadCaptured", () => {
  beforeEach(() => {
    vi.stubEnv("RECOUP_API_URL", "https://api.example.dev");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 200 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("posts the lead to the notification endpoint", async () => {
    await notifyLeadCaptured(lead);

    const [url, init] = vi.mocked(fetch).mock.calls[0];
    expect(String(url)).toBe("https://api.example.dev/api/notifications/lead");
    expect(init?.method).toBe("POST");
    expect(JSON.parse(String(init?.body))).toMatchObject({
      email: "ada@example.com",
      source: "/advisory/book",
      company: "Test Co",
    });
  });

  // The lead is already in Attio by the time this runs. A paging outage must not
  // turn a captured lead into an error shown to the visitor. chat#1800.
  it("never throws when the notifier returns an error status", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response("nope", { status: 500 }));
    await expect(notifyLeadCaptured(lead)).resolves.toBeUndefined();
    expect(console.error).toHaveBeenCalled();
  });

  it("never throws when the network call rejects", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("socket hang up"));
    await expect(notifyLeadCaptured(lead)).resolves.toBeUndefined();
    expect(console.error).toHaveBeenCalled();
  });

  it("falls back to the production api host when RECOUP_API_URL is unset", async () => {
    vi.stubEnv("RECOUP_API_URL", "");
    await notifyLeadCaptured(lead);
    expect(String(vi.mocked(fetch).mock.calls[0][0])).toBe(
      "https://api.recoupable.dev/api/notifications/lead",
    );
  });
});
