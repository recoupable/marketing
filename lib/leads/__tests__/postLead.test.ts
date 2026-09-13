import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const payload = { kind: "subscribe", source: "/footer", email: "ada@example.com" };

async function load() {
  return (await import("../postLead")).postLead;
}

describe("postLead", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_RECOUP_API_URL", "");
    vi.stubEnv("NEXT_PUBLIC_VERCEL_ENV", "preview");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("posts JSON to the leads endpoint under the configured api base with a timeout", async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json({ status: "success" }));
    const postLead = await load();
    expect(await postLead(payload, fetcher)).toEqual({ ok: true });
    const [url, init] = fetcher.mock.calls[0];
    expect(String(url)).toBe("https://test-recoup-api.vercel.app/api/leads");
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({ "Content-Type": "application/json" });
    expect(JSON.parse(init.body)).toEqual(payload);
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it("honours NEXT_PUBLIC_RECOUP_API_URL once, through siteConfig", async () => {
    vi.stubEnv("NEXT_PUBLIC_RECOUP_API_URL", "https://api-preview.example.dev/");
    const fetcher = vi.fn().mockResolvedValue(Response.json({ status: "success" }));
    await (await load())(payload, fetcher);
    expect(String(fetcher.mock.calls[0][0])).toBe("https://api-preview.example.dev/api/leads");
  });

  it("talks to the production api only in production", async () => {
    vi.stubEnv("NEXT_PUBLIC_VERCEL_ENV", "production");
    const fetcher = vi.fn().mockResolvedValue(Response.json({ status: "success" }));
    await (await load())(payload, fetcher);
    expect(String(fetcher.mock.calls[0][0])).toBe("https://recoup-api.vercel.app/api/leads");
  });

  it("reports ok only for a 200 whose body says status success", async () => {
    const postLead = await load();
    for (const response of [
      Response.json({ status: "success" }, { status: 202 }),
      new Response("OK"),
      Response.json({ status: "error" }),
      Response.json(null),
    ]) {
      const result = await postLead(payload, vi.fn().mockResolvedValue(response));
      expect(result.ok).toBe(false);
    }
  });

  it("surfaces the api's own error message on a non-2xx and falls back when the body is not JSON", async () => {
    const postLead = await load();
    const rejected = new Response(JSON.stringify({ status: "error", error: "email must be a valid email address" }), {
      status: 400, headers: { "Content-Type": "application/json" },
    });
    expect(await postLead(payload, vi.fn().mockResolvedValue(rejected))).toEqual({ ok: false, error: "email must be a valid email address" });
    const result = await postLead(payload, vi.fn().mockResolvedValue(new Response("boom", { status: 500 })));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("could not save");
  });

  it("returns the friendly message, never the raw error, when the transport rejects", async () => {
    const postLead = await load();
    const result = await postLead(payload, vi.fn().mockRejectedValue(new Error("socket hang up")));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("could not save");
      expect(result.error).not.toContain("socket hang up");
    }
    expect(console.error).toHaveBeenCalled();
  });
});
