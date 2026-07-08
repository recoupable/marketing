import { afterEach, describe, expect, it, vi } from "vitest";
import { clearPendingIntent } from "../clearPendingIntent";
import { readPendingIntent } from "../readPendingIntent";
import { savePendingIntent } from "../savePendingIntent";
import { fakeSessionStorage } from "./fakeSessionStorage";

const artist = { id: "spotify-123", name: "Del Water Gap" };

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("clearPendingIntent", () => {
  it("removes a stored intent", () => {
    vi.stubGlobal("sessionStorage", fakeSessionStorage());
    savePendingIntent(artist, 1_000);
    clearPendingIntent();
    expect(readPendingIntent(2_000)).toBeNull();
  });

  it("is a no-op when sessionStorage is unavailable (SSR)", () => {
    expect(() => clearPendingIntent()).not.toThrow();
  });
});
