import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  env: { NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV ?? "development" },
  images: { remotePatterns: [{ protocol: "https", hostname: "i.scdn.co", pathname: "/image/**" }] },
  outputFileTracingIncludes: {
    "/docs/spec/*": ["./content/docs/source/api-reference/openapi/*.json"],
    "/docs/raw/*": ["./content/docs/source/api-reference/openapi/*.json"],
    "/agent-api/v1/*": ["./content/docs/source/api-reference/openapi/*.json"],
  },
  async redirects() {
    return [{ source: "/designs/sky", destination: "/", permanent: true }, { source: "/company/recoupable-records", destination: "/company/recoup-records", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Link", value: '</.well-known/api-catalog>; rel="api-catalog", </.well-known/ard.json>; rel="ard", </openapi.json>; rel="service-desc"; type="application/json", </sitemap.xml>; rel="sitemap", </agents.md>; rel="describedby"; type="text/markdown"' },
          ...((process.env.VERCEL_ENV === "preview" || process.env.NEXT_PUBLIC_SITE_INDEXABLE === "false") ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
        ],
      },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/agent-api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
    ];
  },
};

export default nextConfig;
