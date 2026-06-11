import { NextRequest, NextResponse } from "next/server";
import { getCatalogPlaycounts } from "@/lib/valuation/getCatalogPlaycounts";
import { computeCatalogValuation } from "@/lib/valuation/computeCatalogValuation";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * POST /api/valuation/result { albumIds, earliestReleaseDate, probe? }
 *
 * probe: true reads only the given (small) album subset to check capture
 * progress cheaply; the full read aggregates everything and returns the
 * valuation band. Reads charge 5 credits/album to the marketing org.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const albumIds: string[] = Array.isArray(body.albumIds) ? body.albumIds : [];
  if (albumIds.length === 0) {
    return NextResponse.json({ error: "albumIds is required" }, { status: 400 });
  }

  try {
    const counts = await getCatalogPlaycounts(albumIds);

    if (body.probe || counts.captured < counts.total) {
      return NextResponse.json({
        state: counts.captured === counts.total ? "captured" : "capturing",
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
      ...valuation,
    });
  } catch (error) {
    console.error("[valuation] result failed:", error);
    return NextResponse.json({ error: "valuation read failed" }, { status: 502 });
  }
}
