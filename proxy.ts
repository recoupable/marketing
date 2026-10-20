import { NextResponse, type NextRequest } from "next/server";
import { agentMarkdownPath } from "@/lib/agent-markdown-path";
import { negotiatePageMarkdown } from "@/lib/negotiate-page-markdown";
import { negotiateDocsMarkdown } from "@/lib/docs/negotiateDocsMarkdown";

/** Negotiate public Markdown while keeping the browser's HTML route intact. */
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const accept = request.headers.get("accept");
  const target =
    negotiateDocsMarkdown(path, accept) ?? negotiatePageMarkdown(path, accept);
  if (target) return NextResponse.rewrite(new URL(target, request.url));
  const response = NextResponse.next();
  if (/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?\/?$/.test(path)) {
    response.headers.append(
      "Link",
      `<${agentMarkdownPath(path)}>; rel="alternate"; type="text/markdown"`,
    );
  }
  return response;
}

export const config = {
  matcher: "/((?!api/|agent-api/|mcp(?:/|$)|_next/|\\.well-known/).*)",
};
