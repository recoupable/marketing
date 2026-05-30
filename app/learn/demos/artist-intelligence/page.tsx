import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { ArtistIntelligenceDemo } from "./ArtistIntelligenceDemo";

export const metadata: Metadata = buildPageMetadata({
  title: `Artist Intelligence — Live Demo | ${siteConfig.name}`,
  description:
    "See what Recoup knows about any artist. Live streaming analytics, audience intelligence, competitive positioning, and AI-powered insights.",
  path: "/learn/demos/artist-intelligence",
});

export default function ArtistIntelligencePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <ArtistIntelligenceDemo />
    </div>
  );
}
