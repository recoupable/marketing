import { NextResponse, type NextRequest } from "next/server";
import { negotiateDocsMarkdown } from "@/lib/docs/negotiateDocsMarkdown";

/**
 * Serves documentation pages as markdown to clients that ask for it.
 * Browser requests pass through unchanged; the
 * Vary: Accept header for /docs comes from next.config.ts (docsVaryHeader).
 */
export function proxy(request: NextRequest) {
  const target = negotiateDocsMarkdown(request.nextUrl.pathname, request.headers.get("accept"));
  return target ? NextResponse.rewrite(new URL(target, request.url)) : NextResponse.next();
}

export const config = { matcher: "/docs/:path*" };
