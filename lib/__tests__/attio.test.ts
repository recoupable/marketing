import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createAttioContact } from "@/lib/attio";

describe("createAttioContact", () => {
  beforeEach(() => {
    vi.stubEnv("ATTIO_API_KEY", "test-key");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 200 })));
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("sends matching_attribute as a query param, not in the body", async () => {
    const res = await createAttioContact({ email: "artist@example.com", source: "x" });
    expect(res.success).toBe(true);

    const [url, init] = vi.mocked(fetch).mock.calls[0];
    expect(String(url)).toContain("matching_attribute=email_addresses");
    const body = JSON.parse(String(init?.body));
    expect(body).not.toHaveProperty("matching_attribute");
    expect(body.data.values.email_addresses).toEqual([{ email_address: "artist@example.com" }]);
  });

  it("returns an error (does not throw) when the key is missing", async () => {
    vi.unstubAllEnvs();
    const res = await createAttioContact({ email: "a@b.com" });
    expect(res.success).toBe(false);
    expect(res.error).toContain("ATTIO_API_KEY");
  });

  it("returns the Attio error body on a non-ok response", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response("bad request", { status: 400 }));
    const res = await createAttioContact({ email: "a@b.com" });
    expect(res.success).toBe(false);
    expect(res.error).toContain("400");
  });
});
