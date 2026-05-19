import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/customer-logos/[slug]": ["./design/logos/customers/**/*.svg"],
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
