import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendPlaygroundRequest } from "@/lib/docs/playground/sendPlaygroundRequest";

const request = { method: "GET", url: "https://x.dev/api/artists", headers: { "x-api-key": "sk" } };

describe("sendPlaygroundRequest", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.spyOn(performance, "now").mockReturnValueOnce(1000).mockReturnValueOnce(1250);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns status, timing, headers and a pretty JSON body", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('{"ok":true}', { status: 200, statusText: "OK", headers: { "content-type": "application/json", "x-foo": "bar" } }));
    const result = await sendPlaygroundRequest(request);
    expect(fetch).toHaveBeenCalledWith("https://x.dev/api/artists", { method: "GET", headers: { "x-api-key": "sk" }, body: undefined, signal: expect.any(AbortSignal) });
    expect(result).toMatchObject({ status: 200, statusText: "OK", body: '{\n  "ok": true\n}', isJson: true, elapsedMs: 250 });
    expect("headers" in result && result.headers).toContainEqual(["x-foo", "bar"]);
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
  it("does not render a binary body as text", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(new Uint8Array([0, 255, 1, 2]), { status: 200, headers: { "content-type": "audio/mpeg" } }));
    const result = await sendPlaygroundRequest(request);
    expect(result).toMatchObject({ status: 200, isJson: false, body: "Binary response (audio/mpeg, 4 bytes). Run the curl above to save it to a file." });
  });
  it("reports a timeout in plain words", async () => {
    vi.mocked(fetch).mockRejectedValue(new DOMException("The operation was aborted due to timeout", "TimeoutError"));
    const result = await sendPlaygroundRequest(request);
    expect(result).toMatchObject({ error: "The api did not answer within 30 seconds." });
  });
});
