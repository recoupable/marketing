import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { readCatalogMeasurements } from "@/lib/valuation/readCatalogMeasurements";

const ok = (measurements: unknown[]) => ({
  ok: true,
  status: 200,
  json: async () => ({ measurements }),
});
const status = (s: number) => ({ ok: false, status: s, json: async () => ({}) });

describe("readCatalogMeasurements", () => {
  beforeEach(() => vi.stubGlobal("fetch", vi.fn()));
  afterEach(() => vi.unstubAllGlobals());

  it("aggregates streams and sends the bearer token", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce(
      ok([{ isrc: "A", name: "t1", value: 100 }, { isrc: "B", name: "t2", value: 50 }]) as never,
    );

    const out = await readCatalogMeasurements(["alb1"], "tok");

    expect(out.captured).toBe(1);
    expect(out.total).toBe(1);
    expect(out.totalStreams).toBe(150);
    expect(out.trackCount).toBe(2);
    expect(out.creditsExhausted).toBe(false);
    // bearer forwarded
    const headers = fetchMock.mock.calls[0][1]?.headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer tok");
  });

  it("dedupes a recording shared across releases (largest release claims it)", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(ok([{ isrc: "X", name: "hit", value: 999 }]) as never) // single
      .mockResolvedValueOnce(
        ok([{ isrc: "X", name: "hit", value: 999 }, { isrc: "Y", name: "b", value: 10 }]) as never,
      ); // album (2 tracks → claims X)

    const out = await readCatalogMeasurements(["single", "album"], "tok");

    // X counted once (by the larger release), so total = 999 + 10, not 999*2 + 10
    expect(out.totalStreams).toBe(1009);
    expect(out.trackCount).toBe(2);
  });

  it("stops on a 402 and returns a partial result (credits exhausted)", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(ok([{ isrc: "A", name: "t", value: 100 }]) as never) // album1 lands
      .mockResolvedValueOnce(status(402) as never); // album2 → out of credits

    const out = await readCatalogMeasurements(["a1", "a2", "a3"], "tok");

    expect(out.creditsExhausted).toBe(true);
    expect(out.captured).toBe(1); // only a1 measured
    expect(out.total).toBe(3);
    expect(out.totalStreams).toBe(100);
    // a3 was never fetched — fan-out stopped at the 402
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(2);
  });

  it("skips a 404 (album not captured yet) without failing", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(status(404) as never)
      .mockResolvedValueOnce(ok([{ isrc: "A", name: "t", value: 42 }]) as never);

    const out = await readCatalogMeasurements(["a1", "a2"], "tok");

    expect(out.captured).toBe(1);
    expect(out.totalStreams).toBe(42);
    expect(out.creditsExhausted).toBe(false);
  });
});
