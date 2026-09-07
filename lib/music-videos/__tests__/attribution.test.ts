import { afterEach, describe, expect, it, vi } from "vitest";
import { getVideoAttribution } from "../attribution";

afterEach(() => vi.unstubAllGlobals());

describe("offer attribution", () => {
  it("preserves the first tagged offer visit across subsequent navigation", () => {
    const saved = new Map<string, string>();
    const location = {
      search:
        "?utm_source=yt&utm_campaign=movamos-el-mundo&email=private@example.com",
    };
    vi.stubGlobal("window", {
      location,
      sessionStorage: {
        getItem: (k: string) => saved.get(k),
        setItem: (k: string, v: string) => saved.set(k, v),
      },
    });
    expect(getVideoAttribution()).toEqual({
      utm_source: "yt",
      utm_campaign: "movamos-el-mundo",
    });
    location.search = "?utm_source=x&utm_campaign=second-touch";
    expect(getVideoAttribution()).toEqual({
      utm_source: "yt",
      utm_campaign: "movamos-el-mundo",
    });
    expect([...saved.values()].join()).not.toContain("private");
  });
  it("works when storage is blocked and ignores invalid tags", () => {
    vi.stubGlobal("window", {
      location: {
        search:
          "?utm_source=ig&utm_campaign=a%40b.com&utm_content=reel&token=secret",
      },
      sessionStorage: {
        getItem: () => {
          throw new Error("blocked");
        },
        setItem: () => {
          throw new Error("blocked");
        },
      },
    });
    expect(getVideoAttribution()).toEqual({
      utm_source: "ig",
      utm_content: "reel",
    });
  });
  it("recovers from corrupt storage and leaves untagged traffic unattributed", () => {
    vi.stubGlobal("window", {
      location: { search: "" },
      sessionStorage: { getItem: () => "invalid-json" },
    });
    expect(getVideoAttribution()).toEqual({});
  });
});
