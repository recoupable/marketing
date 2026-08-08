import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { postCapture } from "@/lib/postCapture";

describe("postCapture", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 200 })));
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts the payload to the capture endpoint", async () => {
    await postCapture("/api/subscribe", { email: "ada@example.com" });

    const [url, init] = vi.mocked(fetch).mock.calls[0];
    expect(String(url)).toBe("/api/subscribe");
    expect(init?.method).toBe("POST");
    expect(JSON.parse(String(init?.body))).toEqual({ email: "ada@example.com" });
  });

  it("reports ok on a 200", async () => {
    expect(await postCapture("/api/subscribe", {})).toEqual({ ok: true });
  });

  // The whole point: a non-2xx must reach the caller instead of being discarded.
  it("reports the server's message on a non-2xx", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ error: "We could not save your details." }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      }),
    );

    expect(await postCapture("/api/subscribe", {})).toEqual({
      ok: false,
      error: "We could not save your details.",
    });
  });

  it("falls back to a generic message when the error body is not JSON", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response("gateway timeout", { status: 504 }));

    const result = await postCapture("/api/subscribe", {});
    expect(result.ok).toBe(false);
    expect((result as { error: string }).error).toBeTruthy();
  });

  it("reports failure instead of throwing when the network call rejects", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("offline"));

    const result = await postCapture("/api/subscribe", {});
    expect(result.ok).toBe(false);
    expect((result as { error: string }).error).toContain("offline");
  });
});
