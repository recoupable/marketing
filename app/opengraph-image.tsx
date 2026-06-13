import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

/**
 * Default branded OG image (W-36) — applied by Next.js to every route that
 * doesn't define its own opengraph-image. Achromatic to match the brand;
 * blog posts still override with their cover image via buildPostMetadata.
 */
export const runtime = "edge";
export const alt = siteConfig.metadata.defaultTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", color: "#fff", fontSize: 34, fontWeight: 700 }}>
          ♪ Recoup
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#fff",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          <span>Research &amp; AI implementation</span>
          <span style={{ color: "rgba(255,255,255,0.55)" }}>for the agentic music industry.</span>
        </div>
        <div style={{ display: "flex", color: "rgba(255,255,255,0.45)", fontSize: 26 }}>
          recoupable.com
        </div>
      </div>
    ),
    { ...size },
  );
}
