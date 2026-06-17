import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Surface Vercel's build environment to the client bundle so the valuation
  // flow can target the matching Recoup API (preview→test, prod→prod). The
  // Privy bearer is app-scoped: a preview token only verifies against the test
  // API. Vercel sets VERCEL_ENV automatically; default to development locally.
  env: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV ?? "development",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/image/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/company/recoupable-records",
        destination: "/company/recoup-records",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
