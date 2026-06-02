import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      {
        // Advisory folded into Consulting for the research+consulting positioning.
        source: "/advisory",
        destination: "/consulting",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
