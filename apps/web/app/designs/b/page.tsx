import Link from "next/link";

export default function DesignB() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&family=Inter:wght@400;500&display=swap');
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "#3d5a80",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Geometric accent — warm coral circle, partially cropped right */}
        <div
          style={{
            position: "absolute",
            right: -120,
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(360px, 40vw, 560px)",
            height: "clamp(360px, 40vw, 560px)",
            borderRadius: "50%",
            backgroundColor: "#c45d3e",
            opacity: 0.85,
          }}
        />
        {/* Subtle inner ring */}
        <div
          style={{
            position: "absolute",
            right: -90,
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(280px, 32vw, 440px)",
            height: "clamp(280px, 32vw, 440px)",
            borderRadius: "50%",
            border: "1px solid rgba(250, 240, 225, 0.15)",
          }}
        />

        {/* Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "32px 48px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#faf0e5",
              letterSpacing: "0.5px",
            }}
          >
            Recoupable
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: "2px",
              color: "rgba(250, 240, 225, 0.6)",
            }}
          >
            <span style={{ cursor: "pointer" }}>PLATFORM</span>
            <span style={{ cursor: "pointer" }}>SOLUTIONS</span>
            <span style={{ cursor: "pointer" }}>DEVELOPERS</span>
            <span style={{ cursor: "pointer" }}>COMPANY</span>
          </div>
        </nav>

        {/* Hero content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 48px 80px",
            maxWidth: 720,
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Category label */}
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: "3px",
              color: "rgba(250, 240, 225, 0.5)",
              marginBottom: 24,
              display: "block",
            }}
          >
            AI-NATIVE INFRASTRUCTURE
          </span>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(48px, 6.5vw, 88px)",
              fontWeight: 400,
              color: "#faf0e5",
              lineHeight: 1.05,
              margin: "0 0 28px",
            }}
          >
            Your label.
            <br />
            <span style={{ fontStyle: "italic" }}>Run by agents.</span>
          </h1>

          {/* Subheader */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(16px, 1.8vw, 20px)",
              color: "rgba(250, 240, 225, 0.55)",
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 0 44px",
            }}
          >
            The AI-native record label platform. Agent infrastructure
            that handles research, content, distribution, and strategy —
            so you can focus on the music.
          </p>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Link
              href="https://chat.recoupable.com"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                letterSpacing: "2px",
                color: "#faf0e5",
                border: "1px solid rgba(250, 240, 225, 0.4)",
                padding: "14px 32px",
                borderRadius: 100,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              START BUILDING
            </Link>
            <Link
              href="https://chat.recoupable.com"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                letterSpacing: "1px",
                color: "rgba(250, 240, 225, 0.45)",
                textDecoration: "none",
              }}
            >
              READ THE DOCS →
            </Link>
          </div>
        </div>

        {/* Bottom rule */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 48,
            right: 48,
            borderTop: "1px solid rgba(250, 240, 225, 0.1)",
            paddingTop: 16,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: "1.5px",
            color: "rgba(250, 240, 225, 0.3)",
            zIndex: 10,
          }}
        >
          <span>© 2026 RECOUPABLE</span>
          <span>MUSIC × MACHINE INTELLIGENCE</span>
        </div>
      </div>
    </>
  );
}
