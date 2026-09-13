/**
 * Header rule for next.config.ts. Every /docs response varies on Accept
 * because the proxy serves markdown or HTML for the same path. It lives in
 * the config rather than the proxy because the page renderer replaces any
 * Vary value set earlier in the request, while config headers are applied
 * to the finished response.
 */
export const docsVaryHeader = { source: "/docs/:path*", headers: [{ key: "Vary", value: "Accept" }] };
