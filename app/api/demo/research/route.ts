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

async function fetchGet(path: string): Promise<unknown | null> {
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

async function fetchPost(
  path: string,
  body: Record<string, unknown>,
): Promise<unknown | null> {
  try {
    const res = await fetch(`${RECOUP_API}${path}`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30_000),
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
    return NextResponse.json(
      { error: "artist parameter required" },
      { status: 400 },
    );
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

  // Try Chartmetric-backed endpoints (may fail if CM token is expired)
  const [profile, cities, similar, insights] = await Promise.all([
    fetchGet(`/research/profile?artist=${encoded}`),
    fetchGet(`/research/cities?artist=${encoded}`),
    fetchGet(`/research/similar?artist=${encoded}&audience=high&genre=high&limit=5`),
    fetchGet(`/research/insights?artist=${encoded}`),
  ]);

  // Check if Chartmetric data came back (profile is non-null and no error)
  const profileOk =
    profile &&
    !(profile as Record<string, unknown>).error &&
    (profile as Record<string, unknown>).name;

  if (profileOk) {
    return NextResponse.json({ profile, cities, similar, insights, source: "live" });
  }

  // Fallback: use web intelligence to get a research summary
  const webResult = await fetchPost("/research/web", {
    query: `${artist} music artist streaming stats Spotify listeners followers label genre`,
    max_results: 5,
    country: "US",
  });

  if (!webResult) {
    return NextResponse.json(
      { error: "Artist not found — try a different name" },
      { status: 404 },
    );
  }

  // Return web intelligence results as a different shape
  return NextResponse.json({
    profile: null,
    cities: null,
    similar: null,
    insights: null,
    web: webResult,
    source: "web",
    artistQuery: artist,
  });
}
