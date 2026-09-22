import { NextRequest, NextResponse } from "next/server";
import { cleanDomain } from "@/lib/website-agent/companyWebsite";

export async function GET(request: NextRequest) {
  const domain = cleanDomain(request.nextUrl.searchParams.get("domain") || "");
  if (!domain) return new NextResponse(null, { status: 400 });

  try {
    const response = await fetch(`https://icons.duckduckgo.com/ip3/${domain}.ico`, {
      headers: { Accept: "image/*" },
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 2_592_000 },
    });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.startsWith("image/"))
      return new NextResponse(null, { status: 404 });
    const image = await response.arrayBuffer();
    if (image.byteLength > 64_000)
      return new NextResponse(null, { status: 413 });
    return new NextResponse(image, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=2592000, immutable",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
