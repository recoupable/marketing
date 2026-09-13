import { NextRequest, NextResponse } from "next/server";

// Permanent redirect for every request and method: agents read the site index at /llms.txt.
function redirectToLlms(request: NextRequest) {
  return NextResponse.redirect(new URL("/llms.txt", request.url), 301);
}

export { redirectToLlms as GET, redirectToLlms as HEAD, redirectToLlms as POST, redirectToLlms as PUT, redirectToLlms as PATCH, redirectToLlms as DELETE, redirectToLlms as OPTIONS };
