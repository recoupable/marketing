import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchAccountPlan } from "@/lib/account/fetchAccountPlan";

const ID = { status: "success", accountId: "acc_1" };

describe("fetchAccountPlan", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("resolves the account from the bearer, then reads its plan from the credits resource", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json(ID, { status: 200 }))
      .mockResolvedValueOnce(Response.json({ is_pro: false, plan: "starter" }, { status: 200 }));

    expect(await fetchAccountPlan("tok")).toBe("starter");

    const calls = vi.mocked(fetch).mock.calls;
    expect(String(calls[0][0])).toMatch(/\/api\/accounts\/id$/);
    expect(new Headers(calls[0][1]?.headers).get("Authorization")).toBe("Bearer tok");
    expect(String(calls[1][0])).toMatch(/\/api\/accounts\/acc_1\/credits$/);
    expect(new Headers(calls[1][1]?.headers).get("Authorization")).toBe("Bearer tok");
  });

  it("falls back to is_pro when the api does not send a plan field yet", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json(ID, { status: 200 }))
      .mockResolvedValueOnce(Response.json({ is_pro: true }, { status: 200 }));
    expect(await fetchAccountPlan("tok")).toBe("pro");

    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json(ID, { status: 200 }))
      .mockResolvedValueOnce(Response.json({ is_pro: false }, { status: 200 }));
    expect(await fetchAccountPlan("tok")).toBe("free");
  });

  it("returns null when either call fails, so the page renders signed-out copy", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({ error: "Unauthorized" }, { status: 401 }));
    expect(await fetchAccountPlan("tok")).toBeNull();

    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json(ID, { status: 200 }))
      .mockResolvedValueOnce(new Response(null, { status: 500 }));
    expect(await fetchAccountPlan("tok")).toBeNull();
  });
});
