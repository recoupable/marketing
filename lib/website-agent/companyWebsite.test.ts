import { describe, expect, it } from "vitest";
import {
  normalizeCompanyWebsite,
  parseCompanySuggestions,
} from "./companyWebsite";

describe("company website entry", () => {
  it.each([
    ["seekermusic.com", "https://seekermusic.com"],
    ["www.seekermusic.com", "https://seekermusic.com"],
    ["https://seekermusic.com", "https://seekermusic.com"],
    ["http://seekermusic.com", "https://seekermusic.com"],
  ])("normalizes %s", (input, expected) => {
    expect(normalizeCompanyWebsite(input)).toBe(expected);
  });

  it.each(["Seeker Music", "javascript:alert(1)", "example.com/path", "localhost"])(
    "does not treat %s as a domain",
    (input) => expect(normalizeCompanyWebsite(input)).toBeUndefined(),
  );

  it("keeps only unique, valid company suggestions", () => {
    expect(
      parseCompanySuggestions([
        { name: " Seeker  Music ", domain: "seekermusic.com" },
        { name: "Duplicate", domain: "www.seekermusic.com" },
        { name: "Unsafe", domain: "https://example.com/path" },
        { name: "Seeker UK", domain: "seekermusic.co.uk" },
      ]),
    ).toEqual([
      { name: "Seeker Music", domain: "seekermusic.com" },
      { name: "Seeker UK", domain: "seekermusic.co.uk" },
    ]);
  });
});
