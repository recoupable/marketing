import Link from "next/link";

export default function DesignC() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@400;600;800&display=swap');
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* ── LEFT SIDE: Culture ── */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            color: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "40px 48px",
          }}
        >
          {/* Top: brand + status */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              RECOUPABLE
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#28a745",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  color: "#28a745",
                  letterSpacing: "1px",
                }}
              >
                SYSTEM ACTIVE
              </span>
            </div>
          </div>

          {/* Center: headline + subheader */}
          <div style={{ maxWidth: 420 }}>
            <h1
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(36px, 4vw, 56px)",
                fontWeight: 800,
                lineHeight: 1.05,
                margin: "0 0 20px",
                letterSpacing: "-1px",
              }}
            >
              YOUR LABEL.
              <br />
              RUN BY
              <br />
              AGENTS.
            </h1>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                color: "#666",
                lineHeight: 1.6,
                margin: "0 0 32px",
              }}
            >
              AI-native infrastructure for record labels.
              Research, content, distribution, and strategy —
              all handled by autonomous agents.
            </p>

            <Link
              href="https://chat.recoupable.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#0a0a0a",
                border: "2px solid #28a745",
                padding: "12px 28px",
                textDecoration: "none",
                letterSpacing: "0.5px",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#28a745",
                  display: "inline-block",
                }}
              />
              INITIALIZE SYSTEM
            </Link>
          </div>

          {/* Bottom: version bar */}
          <div
            style={{
              borderTop: "1px solid #e0e0e0",
              paddingTop: 16,
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              color: "#aaa",
              letterSpacing: "1.5px",
              display: "flex",
              gap: 24,
            }}
          >
            <span>[VERSION 2.4.1]</span>
            <span>DATA_INGEST: OK</span>
            <span>LOC: GLOBAL</span>
          </div>
        </div>

        {/* ── RIGHT SIDE: System ── */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#0a0a0a",
            color: "#28a745",
            fontFamily: "'Space Mono', monospace",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "40px 48px",
          }}
        >
          {/* Top: feed header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 12, letterSpacing: "2px" }}>
              LIVE INGEST FEED
            </span>
            <span
              style={{
                fontSize: 11,
                color: "#ff4444",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#ff4444",
                  display: "inline-block",
                }}
              />
              REC
            </span>
          </div>

          {/* Center: log entries */}
          <div style={{ fontSize: 13, lineHeight: 2.2 }}>
            <div style={{ color: "rgba(40, 167, 69, 0.4)" }}>
              ──────────────────────────────────────
            </div>
            <div>
              <span style={{ color: "rgba(40, 167, 69, 0.5)" }}>14:02:11</span>
              {"  "}SCAN:{"     "}
              <span style={{ color: "#4edf72" }}>Spotify_Viral_50</span>
            </div>
            <div>
              <span style={{ color: "rgba(40, 167, 69, 0.5)" }}>14:02:14</span>
              {"  "}DETECTED:{" "}
              <span style={{ color: "#4edf72" }}>ISRC_USRC12345678</span>
            </div>
            <div>
              <span style={{ color: "rgba(40, 167, 69, 0.5)" }}>14:02:15</span>
              {"  "}ANALYZE:{"  "}Acoustic_Features...
            </div>
            <div>
              <span style={{ color: "rgba(40, 167, 69, 0.5)" }}>14:02:18</span>
              {"  "}SCORE:{"    "}
              <span style={{ color: "#fff", fontWeight: 700 }}>87.4</span>{" "}
              (HIGH_VELOCITY)
            </div>
            <div>
              <span style={{ color: "rgba(40, 167, 69, 0.5)" }}>14:02:19</span>
              {"  "}ACTION:{"   "}
              <span style={{ color: "#4edf72" }}>Generate_Contract_Draft</span>
            </div>
            <div>
              <span style={{ color: "rgba(40, 167, 69, 0.5)" }}>14:02:22</span>
              {"  "}ENRICH:{"   "}Social_Profiles_Linked
            </div>
            <div>
              <span style={{ color: "rgba(40, 167, 69, 0.5)" }}>14:02:25</span>
              {"  "}STATUS:{"   "}
              <span style={{ color: "#28a745" }}>PIPELINE_COMPLETE ✓</span>
            </div>
            <div style={{ color: "rgba(40, 167, 69, 0.4)" }}>
              ──────────────────────────────────────
            </div>
          </div>

          {/* Bottom: action button */}
          <div>
            <Link
              href="https://chat.recoupable.com"
              style={{
                display: "block",
                textAlign: "center",
                border: "1px solid #28a745",
                padding: "14px",
                fontSize: 12,
                letterSpacing: "2px",
                color: "#28a745",
                textDecoration: "none",
              }}
            >
              SUBMIT AUDIO FILE [WAV]
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
