import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { linkArtistToAccount } from "@/lib/valuation/linkArtistToAccount";
import { siteConfig } from "@/lib/config";

const input = {
  artistId: "4LLpKhyESsyAXpc4laK94U",
  artistName: "Mac Miller",
  token: "privy-bearer-token",
};

describe("linkArtistToAccount", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 200 })));
  });
  afterEach(() => vi.unstubAllGlobals());

  it("POSTs the spotify_id + name to the api spotify-link route with the bearer", () => {
    linkArtistToAccount(input);

    const fetchMock = vi.mocked(fetch);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${siteConfig.apiUrl}/artists/spotify-link`);
    expect(init?.method).toBe("POST");
    expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer privy-bearer-token");
    expect(JSON.parse(String(init?.body))).toEqual({
      spotify_id: input.artistId,
      name: input.artistName,
    });
  });

  it("does nothing without a token — the account is derived from the bearer", () => {
    linkArtistToAccount({ ...input, token: null });
    expect(vi.mocked(fetch)).not.toHaveBeenCalled();
  });

  it("swallows network errors so a failed link never breaks the run", () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("network down"));
    expect(() => linkArtistToAccount(input)).not.toThrow();
  });
});
