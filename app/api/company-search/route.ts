import { NextRequest, NextResponse } from "next/server";
import { parseCompanySuggestions } from "@/lib/website-agent/companyWebsite";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() || "";
  if (query.length < 3 || query.length > 80 || /[\u0000-\u001f\u007f]/.test(query))
    return NextResponse.json({ companies: [] });

  try {
    const response = await fetch(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(query)}`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(4000),
        next: { revalidate: 3600 },
      },
    );
    if (!response.ok) return NextResponse.json({ companies: [] });
    const companies = parseCompanySuggestions(await response.json());
    return NextResponse.json(
      { companies },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch {
    return NextResponse.json({ companies: [] });
  }
}
