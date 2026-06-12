import { NextRequest, NextResponse } from "next/server";
import { getCatalogPlaycounts } from "@/lib/valuation/getCatalogPlaycounts";
import { computeCatalogValuation } from "@/lib/valuation/computeCatalogValuation";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * POST /api/valuation/result { albumIds, earliestReleaseDate, probe? }
 *
 * probe: true reads only the given (small) album subset to check capture
 * progress cheaply. The full read aggregates every album that has landed and
 * values what's measured — albums whose tracks lack ISRCs or displayed counts
 * never return playcounts, so requiring 100% coverage would hang real indie
 * catalogs (found live: LA EQUIS). Coverage is reported as capturedAlbums /
 * albumCount. Reads charge 5 credits/album to the marketing org.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const albumIds: string[] = Array.isArray(body.albumIds) ? body.albumIds : [];
  if (albumIds.length === 0) {
    return NextResponse.json({ error: "albumIds is required" }, { status: 400 });
  }

  try {
    const counts = await getCatalogPlaycounts(albumIds);

    if (body.probe || counts.captured === 0) {
      return NextResponse.json({
        state: counts.captured > 0 ? "captured" : "capturing",
        captured: counts.captured,
        total: counts.total,
      });
    }

    const valuation = computeCatalogValuation({
      totalStreams: counts.totalStreams,
      earliestReleaseDate: body.earliestReleaseDate ?? null,
    });
    return NextResponse.json({
      state: "done",
      trackCount: counts.trackCount,
      albumCount: counts.total,
      capturedAlbums: counts.captured,
      albums: counts.albums,
      ...valuation,
    });
  } catch (error) {
    console.error("[valuation] result failed:", error);
    return NextResponse.json({ error: "valuation read failed" }, { status: 502 });
  }
}
