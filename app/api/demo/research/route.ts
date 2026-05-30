import { NextRequest, NextResponse } from "next/server";

const RECOUP_API = "https://api.recoupable.com/api";
const API_KEY =
  process.env.RECOUP_DEMO_API_KEY ??
  "recoup_sk_9yClzJeH7QqqAnORjahxW99-VTkxJX_QzGOMGjmC1Ok";

/* Simple in-memory rate limiter: 1 request per 5s per IP */
const hits = new Map<string, number>();
setInterval(() => hits.clear(), 60_000);

function rateOk(ip: string): boolean {
  const now = Date.now();
  const last = hits.get(ip) ?? 0;
  if (now - last < 5_000) return false;
  hits.set(ip, now);
  return true;
}

async function fetchEndpoint(path: string): Promise<unknown | null> {
  try {
    const res = await fetch(`${RECOUP_API}${path}`, {
      headers: { "x-api-key": API_KEY },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const artist = req.nextUrl.searchParams.get("artist")?.trim();
  if (!artist) {
    return NextResponse.json({ error: "artist parameter required" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!rateOk(ip)) {
    return NextResponse.json(
      { error: "Too many requests — try again in a few seconds" },
      { status: 429 },
    );
  }

  const encoded = encodeURIComponent(artist);

  const [profile, cities, similar, insights] = await Promise.all([
    fetchEndpoint(`/research/profile?artist=${encoded}`),
    fetchEndpoint(`/research/cities?artist=${encoded}`),
    fetchEndpoint(`/research/similar?artist=${encoded}&audience=high&genre=high&limit=5`),
    fetchEndpoint(`/research/insights?artist=${encoded}`),
  ]);

  // If profile is an error or null, the artist likely wasn't found
  if (!profile || (profile as Record<string, unknown>).error) {
    return NextResponse.json(
      { error: "Artist not found — try a different name" },
      { status: 404 },
    );
  }

  return NextResponse.json({
    profile,
    cities,
    similar,
    insights,
  });
}
