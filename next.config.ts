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
      {
        // Duplicate "Coming soon" stub folded into the real proof page.
        source: "/records",
        destination: "/company/recoup-records",
        permanent: true,
      },
      {
        // Old "Platform" page split into Products → Skills + Chat (see IA-PLAN.md).
        source: "/platform",
        destination: "/skills",
        permanent: true,
      },
      {
        // Off-brand SaaS-era "solutions" page → the canonical product story.
        source: "/solutions",
        destination: "/skills",
        permanent: true,
      },
      {
        // Old case-studies page with unverifiable claims → real proof page.
        source: "/results",
        destination: "/company/recoup-records",
        permanent: true,
      },
      {
        // "Coming soon" resources stub → developer surface.
        source: "/resources",
        destination: "/developers",
        permanent: true,
      },
      {
        // ROI calculator carried stale pricing/savings claims → consulting.
        source: "/calculator",
        destination: "/consulting",
        permanent: true,
      },
      {
        // Off-brand lead-magnet playbook → the real open tools.
        source: "/playbook",
        destination: "/skills",
        permanent: true,
      },
      {
        source: "/playbook/download",
        destination: "/skills",
        permanent: true,
      },
      {
        // "Learn" hub folded into the blog (the live content surface).
        source: "/learn",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/learn/demos",
        destination: "/blog",
        permanent: true,
      },
      {
        // Research folded into the unified /blog hub (essays are a filter now).
        source: "/research",
        destination: "/blog?type=essay",
        permanent: true,
      },
      {
        // Every research essay keeps its slug under the unified hub.
        source: "/research/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
