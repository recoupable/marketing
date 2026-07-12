import { describe, it, expect } from "vitest";
import { nlsBandFromSpotifyGross } from "../nlsBandFromSpotifyGross";

describe("nlsBandFromSpotifyGross", () => {
  it("grosses up to all DSPs then nets out distribution and royalties", () => {
    const band = nlsBandFromSpotifyGross(1_000_000);
    const net = (1 - 0.15) * (1 - 0.25);

    expect(band.low).toBeCloseTo(1_000_000 * 1.25 * net);
    expect(band.central).toBeCloseTo(1_000_000 * 1.4 * net);
    expect(band.high).toBeCloseTo(1_000_000 * 1.6 * net);
  });

  it("returns zero band for zero gross", () => {
    expect(nlsBandFromSpotifyGross(0)).toEqual({ low: 0, central: 0, high: 0 });
  });
});
