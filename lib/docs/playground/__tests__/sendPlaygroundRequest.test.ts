import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendPlaygroundRequest } from "@/lib/docs/playground/sendPlaygroundRequest";

const request = { method: "GET", url: "https://x.dev/api/artists", headers: { "x-api-key": "sk" } };

describe("sendPlaygroundRequest", () => {
  beforeEach(() => vi.stubGlobal("fetch", vi.fn()));
  afterEach(() => vi.unstubAllGlobals());

  it("returns status, timing, headers and a pretty JSON body", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('{"ok":true}', { status: 200, statusText: "OK", headers: { "content-type": "application/json", "x-foo": "bar" } }));
    const result = await sendPlaygroundRequest(request);
    expect(fetch).toHaveBeenCalledWith("https://x.dev/api/artists", { method: "GET", headers: { "x-api-key": "sk" }, body: undefined });
    expect(result).toMatchObject({ status: 200, statusText: "OK", body: '{\n  "ok": true\n}', isJson: true });
    expect("headers" in result && result.headers).toContainEqual(["x-foo", "bar"]);
    expect(result.elapsedMs).toBeGreaterThanOrEqual(0);
  });
  it("keeps a non-JSON error body as text", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response("Bad gateway", { status: 502, statusText: "Bad Gateway" }));
    const result = await sendPlaygroundRequest(request);
    expect(result).toMatchObject({ status: 502, body: "Bad gateway", isJson: false });
  });
  it("reports a network failure as text instead of throwing", async () => {
    vi.mocked(fetch).mockRejectedValue(new TypeError("Failed to fetch"));
    const result = await sendPlaygroundRequest(request);
    expect(result).toMatchObject({ error: "Failed to fetch" });
  });
});
