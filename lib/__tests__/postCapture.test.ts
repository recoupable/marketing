import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { postCapture } from "@/lib/postCapture";

describe("postCapture", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 200 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("posts the payload to the api leads endpoint", async () => {
    await postCapture({ kind: "subscribe", source: "/audit", email: "ada@example.com" });

    const [url, init] = vi.mocked(fetch).mock.calls[0];
    expect(String(url)).toBe("https://api.recoupable.dev/api/leads");
    expect(init?.method).toBe("POST");
    expect(JSON.parse(String(init?.body))).toEqual({
      kind: "subscribe",
      source: "/audit",
      email: "ada@example.com",
    });
  });

  it("honours NEXT_PUBLIC_RECOUP_API_URL for previews", async () => {
    vi.stubEnv("NEXT_PUBLIC_RECOUP_API_URL", "https://api-preview.example.dev");
    await postCapture({ kind: "subscribe", source: "/audit", email: "a@b.com" });
    expect(String(vi.mocked(fetch).mock.calls[0][0])).toBe(
      "https://api-preview.example.dev/api/leads",
    );
  });

  it("reports ok on a 200", async () => {
    expect(
      await postCapture({ kind: "subscribe", source: "/audit", email: "a@b.com" }),
    ).toEqual({ ok: true });
  });

  // The whole point: a non-2xx must reach the caller instead of being discarded.
  it("reports the server's message on a non-2xx", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ error: "We could not save this lead." }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      }),
    );

    expect(await postCapture({ kind: "booking", source: "/advisory/book" })).toEqual({
      ok: false,
      error: "We could not save this lead.",
    });
  });

  it("falls back to a generic message when the error body is not JSON", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response("boom", { status: 500 }));
    const result = await postCapture({ kind: "subscribe", source: "/roi" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("could not save");
  });

  it("reports rather than throws when the network call rejects", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("socket hang up"));
    const result = await postCapture({ kind: "subscribe", source: "/roi" });
    expect(result).toEqual({ ok: false, error: "socket hang up" });
  });
});
