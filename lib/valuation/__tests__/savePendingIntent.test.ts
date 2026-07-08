import { afterEach, describe, expect, it, vi } from "vitest";
import { savePendingIntent } from "../savePendingIntent";
import { PENDING_INTENT_KEY } from "../pendingIntent";
import { fakeSessionStorage } from "./fakeSessionStorage";

const artist = { id: "spotify-123", name: "Del Water Gap" };

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("savePendingIntent", () => {
  it("persists the artist and timestamp under the namespaced key", () => {
    const storage = fakeSessionStorage();
    vi.stubGlobal("sessionStorage", storage);

    savePendingIntent(artist, 1_000);

    const raw = storage.getItem(PENDING_INTENT_KEY);
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw as string)).toEqual({ artist, savedAt: 1_000 });
  });

  it("is a no-op when sessionStorage is unavailable (SSR)", () => {
    expect(() => savePendingIntent(artist)).not.toThrow();
  });

  it("swallows storage write errors (private mode quotas)", () => {
    vi.stubGlobal("sessionStorage", {
      ...fakeSessionStorage(),
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
    });
    expect(() => savePendingIntent(artist)).not.toThrow();
  });
});
