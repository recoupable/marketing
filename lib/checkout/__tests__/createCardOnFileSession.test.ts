import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createCardOnFileSession } from "@/lib/checkout/createCardOnFileSession";

const SESSION = {
  id: "cs_test_setup_123",
  url: "https://checkout.stripe.com/c/pay/cs_test_setup_123",
};

describe("createCardOnFileSession", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json(SESSION, { status: 200 })),
    );
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts the success URL to the card-on-file endpoint with the bearer", async () => {
    const url = await createCardOnFileSession(
      "https://chat.recoupable.dev/?checkout=card-saved",
      "tok_privy",
    );

    expect(url).toBe(SESSION.url);
    const [endpoint, init] = vi.mocked(fetch).mock.calls[0];
    expect(String(endpoint)).toMatch(/\/api\/subscriptions\/card-on-file$/);
    expect(init?.method).toBe("POST");
    expect(new Headers(init?.headers).get("Authorization")).toBe("Bearer tok_privy");
    expect(JSON.parse(String(init?.body))).toEqual({
      successUrl: "https://chat.recoupable.dev/?checkout=card-saved",
    });
  });

  it("surfaces the API error message when the request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json({ error: "unauthorized" }, { status: 401 })),
    );

    await expect(
      createCardOnFileSession("https://chat.recoupable.dev/", "bad_token"),
    ).rejects.toThrow("unauthorized");
  });

  it("throws with the status when the response carries no URL", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json({ id: "cs_test" }, { status: 200 })),
    );

    await expect(
      createCardOnFileSession("https://chat.recoupable.dev/", "tok"),
    ).rejects.toThrow(/couldn't start card setup/);
  });

  it("throws when the body is not JSON", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("gateway timeout", { status: 504 })),
    );

    await expect(
      createCardOnFileSession("https://chat.recoupable.dev/", "tok"),
    ).rejects.toThrow(/504/);
  });
});
