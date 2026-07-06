import { describe, expect, it } from "vitest";
import { partitionMeasuredAlbums } from "@/lib/valuation/partitionMeasuredAlbums";
import type { MeasuredAlbum } from "@/components/valuation/types";

const album = (id: string, streams: number): MeasuredAlbum => ({
  id,
  streams,
  tracks: [{ name: `${id}-t1`, streams }],
});

describe("partitionMeasuredAlbums", () => {
  it("splits zero-stream releases out of the measured list", () => {
    const { measured, unmeasured } = partitionMeasuredAlbums([
      album("a", 100),
      album("b", 0),
      album("c", 50),
      album("d", 0),
    ]);
    expect(measured.map(a => a.id)).toEqual(["a", "c"]);
    expect(unmeasured.map(a => a.id)).toEqual(["b", "d"]);
  });

  it("sorts measured releases by streams, biggest first", () => {
    const { measured } = partitionMeasuredAlbums([
      album("small", 1),
      album("big", 1_000_000),
      album("mid", 500),
    ]);
    expect(measured.map(a => a.id)).toEqual(["big", "mid", "small"]);
  });

  it("returns no unmeasured releases when everything has streams", () => {
    const { measured, unmeasured } = partitionMeasuredAlbums([
      album("a", 2),
      album("b", 1),
    ]);
    expect(measured).toHaveLength(2);
    expect(unmeasured).toEqual([]);
  });

  it("returns everything as unmeasured when nothing has streams", () => {
    const { measured, unmeasured } = partitionMeasuredAlbums([
      album("a", 0),
      album("b", 0),
    ]);
    expect(measured).toEqual([]);
    expect(unmeasured).toHaveLength(2);
  });

  it("handles an empty catalog", () => {
    expect(partitionMeasuredAlbums([])).toEqual({
      measured: [],
      unmeasured: [],
    });
  });

  it("does not mutate the input array", () => {
    const input = [album("low", 1), album("high", 2)];
    partitionMeasuredAlbums(input);
    expect(input.map(a => a.id)).toEqual(["low", "high"]);
  });
});
