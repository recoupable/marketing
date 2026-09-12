import { ImageResponse } from "next/og";

export const alt = "Recoup: AI transformation for music funds and rightsholders";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "white", padding: 20, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", borderRadius: 32, padding: "42px 50px", background: "linear-gradient(130deg, #066dc7 0%, #078fe4 65%, #37baff 100%)", color: "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="34" height="39" viewBox="48 41 127 141" fill="white"><path d="M118.106 41C112.845 41 108.581 45.2558 108.581 50.5056V88.3242C108.581 93.9241 106.846 99.3868 103.613 103.964C98.5169 111.179 90.2239 115.471 81.3785 115.471H57.525C52.2645 115.471 48 119.727 48 124.977V172.304C48 177.554 52.2645 181.81 57.525 181.81H104.894C110.155 181.81 114.419 177.554 114.419 172.304V139.968C114.419 133.432 116.445 127.056 120.218 121.714L120.885 120.77C126.833 112.348 136.512 107.339 146.836 107.339H165.475C170.736 107.339 175 103.083 175 97.833V50.5056C175 45.2558 170.736 41 165.475 41H118.106Z" /></svg>
            <span style={{ fontSize: 41, fontWeight: 700, letterSpacing: -1.5 }}>Recoup</span>
          </div>
          <div style={{ display: "flex", borderRadius: 30, padding: "14px 22px", background: "#d6ff62", color: "#173527", fontSize: 18 }}>Built for the business of music.</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 73, fontWeight: 600, letterSpacing: -3, lineHeight: 1.05 }}>AI transformation.</div>
          <div style={{ fontSize: 73, fontWeight: 600, letterSpacing: -3, lineHeight: 1.05, color: "#bde8ff" }}>Built for music.</div>
          <div style={{ fontSize: 24, marginTop: 12 }}>For music funds, catalog owners, and rightsholders.</div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["AI strategy", "Custom systems", "Team training"].map(label => <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, borderRadius: 14, background: "rgba(255,255,255,.13)", border: "1px solid rgba(255,255,255,.24)", padding: "18px 24px", fontSize: 20 }}><span style={{ color: "#d6ff62" }}>+</span>{label}</div>)}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
