import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createCheckoutSession } from "@/lib/checkout/createCheckoutSession";

const SESSION = { id: "cs_test_123", url: "https://checkout.stripe.com/c/pay/cs_test_123" };

describe("createCheckoutSession", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json(SESSION, { status: 200 })),
    );
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts the success URL to the subscriptions sessions endpoint with the bearer", async () => {
    const url = await createCheckoutSession("https://chat.recoupable.dev/?checkout=success", "tok_privy");

    expect(url).toBe(SESSION.url);
    const [endpoint, init] = vi.mocked(fetch).mock.calls[0];
    expect(String(endpoint)).toMatch(/\/api\/subscriptions\/sessions$/);
    expect(init?.method).toBe("POST");
    expect(new Headers(init?.headers).get("Authorization")).toBe("Bearer tok_privy");
    expect(JSON.parse(String(init?.body))).toEqual({
      successUrl: "https://chat.recoupable.dev/?checkout=success",
    });
  });

  it("surfaces the API error message on a non-ok response", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      Response.json({ error: "unauthorized" }, { status: 401 }),
    );
    await expect(createCheckoutSession("https://x.example", "tok")).rejects.toThrow(
      "unauthorized",
    );
  });

  it("throws a friendly error when a non-ok response has no error body", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 500 }));
    await expect(createCheckoutSession("https://x.example", "tok")).rejects.toThrow(
      /couldn't start checkout \(500\)/,
    );
  });

  it("throws when the response has no checkout URL", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({ id: "cs_1" }, { status: 200 }));
    await expect(createCheckoutSession("https://x.example", "tok")).rejects.toThrow(
      /couldn't start checkout/,
    );
  });
});
