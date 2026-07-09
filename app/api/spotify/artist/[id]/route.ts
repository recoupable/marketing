import { siteConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/spotify/artist/[id]
 *
 * Fetches a single Spotify artist by ID via the Recoup API proxy.
 * Returns { id, name, image, genre, followers } or 404.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "missing id" }, { status: 400 });
  }

  try {
    const res = await fetch(`${siteConfig.apiUrl}/spotify/artist/${id}`);
    if (!res.ok) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    const a = await res.json();
    return NextResponse.json({
      id: a.id ?? id,
      name: a.name ?? "Unknown Artist",
      image: a.images?.[0]?.url ?? null,
      genre: a.genres?.[0] ?? null,
      followers: a.followers?.total ?? 0,
    });
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 502 });
  }
}
