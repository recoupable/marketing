import { siteConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

interface SpotifyTrack {
  id: string;
  name: string;
  preview_url: string | null;
  duration_ms: number;
  external_urls?: { spotify?: string };
  album?: { images?: { url: string }[] };
}

/**
 * GET /api/spotify/artist-top-track?id=<spotify_artist_id>
 *
 * Returns the first top-track (up to 5) that has a usable `preview_url`.
 * Used by the marketing HeroDemo to attach an audible preview to each
 * artist card. About 30% of Spotify tracks have no preview these days, so
 * we iterate through the artist's top results until we find one — falling
 * back to `null` if all top 5 are silent (renderer hides the play button).
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ track: null }, { status: 400 });
  }

  try {
    const params = new URLSearchParams({ id, market: "US" });
    const res = await fetch(
      `${siteConfig.apiUrl}/spotify/artist/topTracks?${params}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      return NextResponse.json({ track: null }, { status: res.status });
    }

    const data = await res.json();
    const tracks: SpotifyTrack[] = data.tracks ?? [];
    const playable = tracks.slice(0, 5).find((t) => t.preview_url);
    if (!playable) {
      return NextResponse.json({ track: null });
    }

    return NextResponse.json({
      track: {
        id: playable.id,
        name: playable.name,
        previewUrl: playable.preview_url,
        durationMs: playable.duration_ms,
        spotifyUrl: playable.external_urls?.spotify ?? null,
        image:
          playable.album?.images?.[2]?.url ??
          playable.album?.images?.[0]?.url ??
          null,
      },
    });
  } catch {
    return NextResponse.json({ track: null }, { status: 500 });
  }
}
