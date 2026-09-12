import { NextRequest, NextResponse } from "next/server";

// Permanent redirect for every request: agents read the site index at /llms.txt.
export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/llms.txt", request.url), 301);
}
