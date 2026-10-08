import { afterEach, describe, expect, it, vi } from "vitest";
import { GET as download } from "@/app/api/label-kit/download/route";
import { POST as checkout } from "@/app/api/label-kit/checkout/route";
const blobGet = vi.hoisted(() => vi.fn());
vi.mock("@vercel/blob", () => ({ get: blobGet }));
const accountId = "00000000-0000-4000-8000-000000000001";
const request = () =>
  new Request("https://recoupable.dev/api/label-kit/download", {
    headers: { Authorization: "Bearer test" },
  });
function mockSubscription(status: string, plan: string | null) {
  return vi
    .fn()
    .mockResolvedValueOnce(Response.json({ accountId }))
    .mockResolvedValueOnce(Response.json({ status, plan }));
}
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});
describe("protected plugin delivery", () => {
  it("does not trust a checkout success parameter", async () => {
    const response = await download(
      new Request(
        "https://recoupable.dev/api/label-kit/download?checkout=returned",
      ),
    );
    expect(response.status).toBe(401);
    expect(blobGet).not.toHaveBeenCalled();
  });
  it.each([
    ["canceled", "starter"],
    ["past_due", "pro"],
    ["trialing", "pro"],
    ["none", null],
    ["active", "free"],
  ])("denies %s / %s", async (status, plan) => {
    vi.stubGlobal("fetch", mockSubscription(status!, plan));
    expect((await download(request())).status).toBe(403);
    expect(blobGet).not.toHaveBeenCalled();
  });
  it("fetches identity from the API and streams private files only for active subscribers", async () => {
    const fetch = mockSubscription("active", "starter");
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
    expect(fetch.mock.calls[1][0]).toContain(
      `/accounts/${accountId}/subscription`,
    );
    expect(blobGet).toHaveBeenCalledWith("label-kit/v1.zip", {
      access: "private",
      token: "private-test-token",
      useCache: false,
    });
  });
  it("fails closed on expired auth, upstream failures, and missing files", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 401 })),
    );
    expect((await download(request())).status).toBe(401);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    expect((await download(request())).status).toBe(503);
    vi.stubGlobal("fetch", mockSubscription("active", "starter"));
    vi.stubEnv("LABEL_KIT_BLOB_PATH", "");
    expect((await download(request())).status).toBe(503);
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
    vi.stubEnv("NEXT_PUBLIC_PRIVY_APP_ID", "test");
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
      successUrl:
        "https://recoupable.dev/label-in-a-box/setup?checkout=returned",
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
