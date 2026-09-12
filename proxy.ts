import { NextResponse, type NextRequest } from "next/server";
import { negotiateDocsMarkdown } from "@/lib/docs/negotiateDocsMarkdown";

/**
 * Serves documentation pages as markdown to clients that ask for it, the way
 * docs.recoupable.dev does. Browser requests pass through unchanged apart from
 * Vary: Accept, so shared caches keep the HTML and markdown variants apart.
 */
export function proxy(request: NextRequest) {
  const target = negotiateDocsMarkdown(request.nextUrl.pathname, request.headers.get("accept"));
  const response = target ? NextResponse.rewrite(new URL(target, request.url)) : NextResponse.next();
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = { matcher: "/docs/:path*" };
