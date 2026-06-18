import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { claimCatalog } from "@/lib/valuation/claimCatalog";
import { siteConfig } from "@/lib/config";

const params = { snapshotId: "45f46690-19f0-4bce-994c-50f827f38d5e", token: "bearer-xyz", name: "Clairo Catalog" };

const okResponse = () =>
  new Response(JSON.stringify({ status: "success", catalog: { id: "cat-123" }, songs_added: 9 }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

describe("claimCatalog", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(okResponse()));
  });
  afterEach(() => vi.unstubAllGlobals());

  it("POSTs to /api/catalogs with the flat `snapshot` field (the live contract), not `from`", async () => {
    await claimCatalog(params);

    const fetchMock = vi.mocked(fetch);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${siteConfig.apiUrl}/catalogs`);
    expect(init?.method).toBe("POST");

    const body = JSON.parse(String(init?.body));
    expect(body).toEqual({ name: "Clairo Catalog", snapshot: params.snapshotId });
    // The old wrapper must be gone — the live endpoint ignores it and creates an empty catalog.
    expect(body).not.toHaveProperty("from");
    expect(body.snapshot).toBe(params.snapshotId);
  });

  it("sends the bearer and omits name when not provided", async () => {
    await claimCatalog({ snapshotId: params.snapshotId, token: params.token });

    const [, init] = vi.mocked(fetch).mock.calls[0];
    expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer bearer-xyz");
    const body = JSON.parse(String(init?.body));
    expect(body).toEqual({ snapshot: params.snapshotId });
  });

  it("returns the created catalog id", async () => {
    await expect(claimCatalog(params)).resolves.toBe("cat-123");
  });

  it("throws on a non-ok response", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ error: "Snapshot not found" }), { status: 404 }),
    );
    await expect(claimCatalog(params)).rejects.toThrow("Snapshot not found");
  });

  it("throws when no catalog id is returned", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ status: "success" }), { status: 200 }),
    );
    await expect(claimCatalog(params)).rejects.toThrow(/no id/i);
  });
});
