import { describe, expect, it } from "vitest";
import { buildVideoRequest, videoRequestSchema } from "../buildVideoRequest";

const input = {
  name: " Test Artist ",
  email: "artist@example.com",
  artist: "Example",
  song: "https://example.com/song",
  brief: "A film by the sea.",
  rights: true as const,
};

describe("music-video lead capture", () => {
  it("retains the complete brief and campaign in fields the booking API persists", () => {
    const result = buildVideoRequest(
      input,
      { utm_source: "yt", utm_campaign: "movamos-el-mundo" },
      "request-123",
    );
    expect(result).toMatchObject({
      kind: "booking",
      source: "/music-videos",
      package: "music-video",
      name: "Test Artist",
    });
    for (const value of [
      input.song,
      input.brief,
      input.artist,
      "request-123",
      "movamos-el-mundo",
      '"utm_source":"yt"',
    ])
      expect(result.message).toContain(value);
  });
  it("rejects empty briefs, invalid emails, non-web song URLs and missing authority", () => {
    for (const patch of [
      { brief: "  " },
      { email: "invalid" },
      { song: "javascript:alert(1)" },
      { song: "ftp://example.com/song" },
      { rights: false },
    ]) {
      expect(videoRequestSchema.safeParse({ ...input, ...patch }).success).toBe(
        false,
      );
    }
  });
});
