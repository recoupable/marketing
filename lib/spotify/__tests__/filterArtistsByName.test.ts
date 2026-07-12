import { describe, expect, it } from "vitest";
import { filterArtistsByName } from "@/lib/spotify/filterArtistsByName";
import type { SpotifyArtist } from "@/lib/spotify/types";

const artist = (id: string, name: string): SpotifyArtist => ({
  id,
  name,
  image: null,
  genre: null,
  followers: 0,
});

describe("filterArtistsByName", () => {
  const list = [artist("1", "Drake"), artist("2", "Doja Cat"), artist("3", "SZA")];

  it("matches case-insensitively on a substring of the name", () => {
    expect(filterArtistsByName(list, "dr")).toEqual([artist("1", "Drake")]);
    expect(filterArtistsByName(list, "DO")).toEqual([artist("2", "Doja Cat")]);
  });

  it("matches an interior substring, not just a prefix", () => {
    expect(filterArtistsByName(list, "cat")).toEqual([artist("2", "Doja Cat")]);
  });

  it("returns all artists for an empty query", () => {
    expect(filterArtistsByName(list, "")).toEqual(list);
  });

  it("returns an empty array when nothing matches", () => {
    expect(filterArtistsByName(list, "zzz")).toEqual([]);
  });
});
