import { siteConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/spotify/search?q=...
 *
 * Proxies artist search to the recoup API which holds Spotify credentials.
 * Returns a simplified array of { id, name, image, genre, followers }.
 */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q) {
    return NextResponse.json({ artists: [] });
  }

  try {
    const limit = req.nextUrl.searchParams.get("limit") || "10";
    const params = new URLSearchParams({
      q,
      type: "artist",
      limit,
    });

    const res = await fetch(`${siteConfig.apiUrl}/spotify/search?${params}`);

    if (!res.ok) {
      return NextResponse.json({ artists: [] }, { status: res.status });
    }

    const data = await res.json();
    const artists = (data.artists?.items ?? []).map(
      (a: {
        id: string;
        name: string;
        images: { url: string }[];
        genres: string[];
        followers: { total: number };
      }) => ({
        id: a.id,
        name: a.name,
        image: a.images?.[2]?.url ?? a.images?.[0]?.url ?? null,
        genre: a.genres?.[0] ?? null,
        followers: a.followers?.total ?? 0,
      }),
    );

    return NextResponse.json({ artists });
  } catch {
    return NextResponse.json({ artists: [] }, { status: 500 });
  }
}
