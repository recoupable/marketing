import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { linkArtistToAccount } from "@/lib/valuation/linkArtistToAccount";
import { siteConfig } from "@/lib/config";

const artist = { id: "4LLpKhyESsyAXpc4laK94U", name: "Mac Miller" };
const token = "privy-bearer-token";

function mockFetchSequence() {
  const fetchMock = vi
    .fn()
    .mockResolvedValueOnce(
      new Response(JSON.stringify({ artist: { account_id: "acc-123" } }), {
        status: 201,
      }),
    )
    .mockResolvedValueOnce(new Response(null, { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("linkArtistToAccount", () => {
  beforeEach(() => mockFetchSequence());
  afterEach(() => vi.unstubAllGlobals());

  it("creates the artist (POST /api/artists) with the name + bearer", async () => {
    await linkArtistToAccount(artist, token);

    const fetchMock = vi.mocked(fetch);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${siteConfig.apiUrl}/artists`);
    expect(init?.method).toBe("POST");
    expect((init?.headers as Record<string, string>).Authorization).toBe(
      "Bearer privy-bearer-token",
    );
    expect(JSON.parse(String(init?.body))).toEqual({ name: artist.name });
  });

  it("attaches the Spotify social to the new artist (PATCH /api/artists/{id})", async () => {
    await linkArtistToAccount(artist, token);

    const fetchMock = vi.mocked(fetch);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const [url, init] = fetchMock.mock.calls[1];
    expect(url).toBe(`${siteConfig.apiUrl}/artists/acc-123`);
    expect(init?.method).toBe("PATCH");
    expect(JSON.parse(String(init?.body))).toEqual({
      profileUrls: { SPOTIFY: `https://open.spotify.com/artist/${artist.id}` },
    });
  });

  it("does nothing without a token — the account is derived from the bearer", async () => {
    await linkArtistToAccount(artist, null);
    expect(vi.mocked(fetch)).not.toHaveBeenCalled();
  });

  it("skips the PATCH if artist creation fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(new Response(null, { status: 500 })),
    );
    await linkArtistToAccount(artist, token);
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(1);
  });

  it("swallows network errors so a failed link never breaks the run", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValueOnce(new Error("network down")),
    );
    await expect(linkArtistToAccount(artist, token)).resolves.toBeUndefined();
  });
});
