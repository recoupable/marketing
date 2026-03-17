import { NextRequest } from "next/server";
import { getMarkdownForPath } from "@/lib/copy/index";

/**
 * Returns markdown for the given path. Copy lives in lib/copy; markdown
 * is derived from the same source as the human pages (single source of truth).
 */
export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("path") ?? "/";
  const markdown = getMarkdownForPath(pathname);
  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
