import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createDirectCheckoutSession } from "@/lib/checkout/createDirectCheckoutSession";

const SESSION = { id: "cs_test_123", url: "https://checkout.stripe.com/c/pay/cs_test_123" };
const SUCCESS = "https://teams.recoupable.dev/?checkout=success&session_id={CHECKOUT_SESSION_ID}";
const CANCEL = "https://recoupable.dev/pricing";

describe("createDirectCheckoutSession", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json(SESSION, { status: 200 })));
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts plan and URLs to the unauthenticated checkout endpoint with no auth header", async () => {
    const url = await createDirectCheckoutSession({ plan: "pro", successUrl: SUCCESS, cancelUrl: CANCEL });

    expect(url).toBe(SESSION.url);
    const [endpoint, init] = vi.mocked(fetch).mock.calls[0];
    expect(String(endpoint)).toMatch(/\/api\/subscriptions\/sessions$/);
    expect(init?.method).toBe("POST");
    expect(new Headers(init?.headers).has("Authorization")).toBe(false);
    expect(JSON.parse(String(init?.body))).toEqual({ plan: "pro", successUrl: SUCCESS, cancelUrl: CANCEL });
  });

  it("passes the Privy bearer when the visitor is signed in", async () => {
    await createDirectCheckoutSession({ plan: "starter", successUrl: SUCCESS, cancelUrl: CANCEL, token: "tok_privy" });
    const [, init] = vi.mocked(fetch).mock.calls[0];
    expect(new Headers(init?.headers).get("Authorization")).toBe("Bearer tok_privy");
    expect(JSON.parse(String(init?.body)).plan).toBe("starter");
  });

  it("surfaces the API error message on a non-ok response", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({ error: "starter_unavailable" }, { status: 400 }));
    await expect(
      createDirectCheckoutSession({ plan: "starter", successUrl: SUCCESS, cancelUrl: CANCEL }),
    ).rejects.toThrow("starter_unavailable");
  });

  it("throws a friendly error when a non-ok response has no error body", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 500 }));
    await expect(
      createDirectCheckoutSession({ plan: "pro", successUrl: SUCCESS, cancelUrl: CANCEL }),
    ).rejects.toThrow(/couldn't start checkout \(500\)/);
  });

  it("throws when the response has no checkout URL", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({ id: "cs_1" }, { status: 200 }));
    await expect(
      createDirectCheckoutSession({ plan: "pro", successUrl: SUCCESS, cancelUrl: CANCEL }),
    ).rejects.toThrow(/couldn't start checkout/);
  });
});
