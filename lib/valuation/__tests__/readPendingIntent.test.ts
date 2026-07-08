import { afterEach, describe, expect, it, vi } from "vitest";
import { readPendingIntent } from "../readPendingIntent";
import { savePendingIntent } from "../savePendingIntent";
import {
  PENDING_INTENT_KEY,
  PENDING_INTENT_MAX_AGE_MS,
} from "../pendingIntent";
import { fakeSessionStorage } from "./fakeSessionStorage";

const artist = {
  id: "spotify-123",
  name: "Del Water Gap",
  image: "https://i.scdn.co/x.jpg",
  followers: 42,
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("readPendingIntent", () => {
  it("returns null when nothing is stored", () => {
    vi.stubGlobal("sessionStorage", fakeSessionStorage());
    expect(readPendingIntent()).toBeNull();
  });

  it("round-trips an artist saved by savePendingIntent", () => {
    vi.stubGlobal("sessionStorage", fakeSessionStorage());
    savePendingIntent(artist, 1_000);
    expect(readPendingIntent(2_000)).toEqual(artist);
  });

  it("returns the intent just inside the max age", () => {
    vi.stubGlobal("sessionStorage", fakeSessionStorage());
    savePendingIntent(artist, 1_000);
    expect(readPendingIntent(1_000 + PENDING_INTENT_MAX_AGE_MS)).toEqual(
      artist,
    );
  });

  it("ignores intents older than the max age", () => {
    vi.stubGlobal("sessionStorage", fakeSessionStorage());
    savePendingIntent(artist, 1_000);
    expect(readPendingIntent(1_001 + PENDING_INTENT_MAX_AGE_MS)).toBeNull();
  });

  it("returns null for malformed JSON", () => {
    const storage = fakeSessionStorage();
    storage.setItem(PENDING_INTENT_KEY, "{not json");
    vi.stubGlobal("sessionStorage", storage);
    expect(readPendingIntent()).toBeNull();
  });

  it("returns null when the stored shape is invalid", () => {
    const storage = fakeSessionStorage();
    storage.setItem(
      PENDING_INTENT_KEY,
      JSON.stringify({ artist: { name: "no id" }, savedAt: 1_000 }),
    );
    vi.stubGlobal("sessionStorage", storage);
    expect(readPendingIntent(2_000)).toBeNull();
  });

  it("returns null when the timestamp is missing", () => {
    const storage = fakeSessionStorage();
    storage.setItem(PENDING_INTENT_KEY, JSON.stringify({ artist }));
    vi.stubGlobal("sessionStorage", storage);
    expect(readPendingIntent(2_000)).toBeNull();
  });

  it("returns null when sessionStorage is unavailable (SSR)", () => {
    expect(readPendingIntent()).toBeNull();
  });
});
