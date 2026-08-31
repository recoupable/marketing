import { describe, expect, it } from "vitest";
import {
  ATTRIBUTION_COOKIE_MAX_AGE,
  getFirstTouchAttribution,
  readAttributionCookie,
  serializeAttributionCookie,
} from "@/lib/attribution";

const firstTouch = {
  source: "instagram",
  medium: "social",
  campaign: "artist-launch",
  landing: "/pricing",
  ts: "2026-08-27T10:00:00.000Z",
};

describe("attribution capture", () => {
  it("normalizes explicit UTM values into a first-touch cookie payload", () => {
    expect(
      getFirstTouchAttribution(
        "https://recoupable.dev/pricing?UTM_SOURCE=instagram&UTM_MEDIUM=social&utm_campaign=artist-launch",
        "2026-08-27T10:00:00.000Z",
      ),
    ).toEqual(firstTouch);
  });

  it("ignores referrer-only visits", () => {
    expect(
      getFirstTouchAttribution(
        "https://recoupable.dev/pricing",
        "2026-08-27T10:00:00.000Z",
        "https://www.instagram.com/recoupable",
      ),
    ).toBeNull();
  });

  it("keeps an existing first-touch cookie unchanged", () => {
    const cookie = serializeAttributionCookie(firstTouch, false);

    expect(readAttributionCookie(cookie)).toEqual(firstTouch);
    expect(
      getFirstTouchAttribution(
        "https://recoupable.dev/pricing?utm_source=x&utm_medium=social&utm_campaign=later",
        "2026-08-28T10:00:00.000Z",
        undefined,
        cookie,
      ),
    ).toBeNull();
  });

  it("serializes the required first-party cookie attributes", () => {
    const cookie = serializeAttributionCookie(firstTouch, true);

    expect(cookie).toContain("rcp_attr=");
    expect(cookie).toContain("Domain=.recoupable.dev");
    expect(cookie).toContain(`Max-Age=${ATTRIBUTION_COOKIE_MAX_AGE}`);
    expect(cookie).toContain("Path=/");
    expect(cookie).toContain("SameSite=Lax");
    expect(cookie).toContain("Secure");
  });
});
