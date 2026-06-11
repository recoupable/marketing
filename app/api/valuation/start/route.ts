import { NextRequest, NextResponse } from "next/server";
import { startCatalogSnapshot } from "@/lib/valuation/startCatalogSnapshot";
import { checkRateLimit } from "@/lib/valuation/rateLimit";

export const dynamic = "force-dynamic";

/**
 * POST /api/valuation/start { artistId }
 *
 * Kicks the one-click catalog valuation: resolves the artist's releases and
 * fires a self-mapping play-count snapshot (chat#1795). Rate-limited per IP —
 * each run spends real money (actor ~$0.003/album + 5 credits/album reads).
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit reached — try again in an hour." },
      { status: 429 },
    );
  }

  const { artistId } = await req.json().catch(() => ({}));
  if (!artistId || typeof artistId !== "string") {
    return NextResponse.json({ error: "artistId is required" }, { status: 400 });
  }

  try {
    const started = await startCatalogSnapshot(artistId);
    return NextResponse.json(started, { status: 202 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "valuation start failed";
    const status = message.includes("no albums") ? 404 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
