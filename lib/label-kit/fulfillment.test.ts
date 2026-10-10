import { afterEach, describe, expect, it, vi } from "vitest";
import { GET as download } from "@/app/api/label-kit/download/route";
import { POST as checkout } from "@/app/api/label-kit/checkout/route";
const blobGet = vi.hoisted(() => vi.fn());
vi.mock("@vercel/blob", () => ({ get: blobGet }));
const sessionId = "cs_test_123456789012345678901234";
const request = () =>
  new Request("https://recoupable.dev/api/label-kit/download", {
    headers: { "X-Plugin-Purchase": sessionId },
  });
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});
describe("protected plugin delivery", () => {
  it("does not trust a checkout success parameter or missing purchase proof", async () => {
    const response = await download(
      new Request(
        "https://recoupable.dev/api/label-kit/download?checkout=returned",
      ),
    );
    expect(response.status).toBe(401);
    expect(blobGet).not.toHaveBeenCalled();
  });
  it("rejects malformed purchase proof before verification", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    expect(
      (
        await download(
          new Request("https://recoupable.dev/api/label-kit/download", {
            headers: { "X-Plugin-Purchase": "bad" },
          }),
        )
      ).status,
    ).toBe(401);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("denies purchases rejected by Stripe verification", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(Response.json({ allowed: false }, { status: 403 })),
    );
    expect((await download(request())).status).toBe(403);
    expect(blobGet).not.toHaveBeenCalled();
  });
  it("verifies the private purchase link and streams private files without account login", async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ allowed: true }));
    vi.stubGlobal("fetch", fetch);
    vi.stubEnv("LABEL_KIT_BLOB_PATH", "label-kit/v1.zip");
    vi.stubEnv("LABEL_KIT_BLOB_READ_WRITE_TOKEN", "private-test-token");
    blobGet.mockResolvedValue({
      statusCode: 200,
      stream: new Blob(["zip"]).stream(),
    });
    const response = await download(request());
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("zip");
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(fetch.mock.calls[0][0]).toContain("/plugin/download-access");
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({ sessionId });
    expect(blobGet).toHaveBeenCalledWith("label-kit/v1.zip", {
      access: "private",
      token: "private-test-token",
      useCache: false,
    });
  });
  it("fails closed on upstream failures and missing configuration", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json({ allowed: false })),
    );
    expect((await download(request())).status).toBe(503);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    expect((await download(request())).status).toBe(503);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json({ allowed: true })),
    );
    vi.stubEnv("LABEL_KIT_BLOB_PATH", "");
    expect((await download(request())).status).toBe(503);
    expect(blobGet).not.toHaveBeenCalled();
  });
});
describe("Starter checkout", () => {
  const req = (origin = "https://recoupable.dev") =>
    new Request("https://recoupable.dev/api/label-kit/checkout", {
      method: "POST",
      headers: { origin },
    });
  function enable() {
    vi.stubEnv("LABEL_KIT_CHECKOUT_ENABLED", "true");
    vi.stubEnv("LABEL_KIT_BLOB_PATH", "label-kit/v1.zip");
    vi.stubEnv("LABEL_KIT_BLOB_READ_WRITE_TOKEN", "test");
  }
  it("rejects cross-origin and disabled checkout", async () => {
    expect((await checkout(req("https://evil.example"))).status).toBe(403);
    vi.stubEnv("LABEL_KIT_CHECKOUT_ENABLED", "");
    expect((await checkout(req())).status).toBe(503);
  });
  it("fixes the plan and return URLs server-side", async () => {
    enable();
    const fetch = vi
      .fn()
      .mockResolvedValue(
        Response.json({ url: "https://checkout.stripe.com/c/pay/test" }),
      );
    vi.stubGlobal("fetch", fetch);
    expect((await checkout(req())).status).toBe(200);
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
      plan: "starter",
      fulfillment: "recoup-plugin",
      successUrl:
        "https://recoupable.dev/label-in-a-box/setup#purchase={CHECKOUT_SESSION_ID}",
      cancelUrl: "https://recoupable.dev/label-in-a-box?checkout=canceled",
    });
  });
  it("rejects unexpected redirects", async () => {
    enable();
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(Response.json({ url: "https://evil.example/" })),
    );
    expect((await checkout(req())).status).toBe(503);
  });
});
