import Link from "next/link";

export default function DesignE() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;700&display=swap');
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "#0c0f14",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Radial amber glow from center */}
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70vw",
            height: "70vh",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(212, 168, 67, 0.07) 0%, rgba(212, 168, 67, 0.02) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* System metadata — top corners */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 36,
            display: "flex",
            alignItems: "center",
            gap: 8,
            zIndex: 20,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#d4a843",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              letterSpacing: "2px",
              color: "rgba(240, 235, 227, 0.3)",
            }}
          >
            SYS.ONLINE
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 28,
            right: 36,
            zIndex: 20,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              letterSpacing: "2px",
              color: "rgba(240, 235, 227, 0.3)",
            }}
          >
            v2.1
          </span>
        </div>

        {/* Hero content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 24px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Brand name */}
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 14,
              letterSpacing: "4px",
              color: "rgba(240, 235, 227, 0.35)",
              marginBottom: 48,
              textTransform: "uppercase",
            }}
          >
            Recoupable
          </span>

          {/* Headline: serif italic × sans bold */}
          <h1
            style={{
              fontSize: "clamp(44px, 7vw, 84px)",
              lineHeight: 1.1,
              margin: "0 0 32px",
              color: "#f0ebe3",
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Your
            </span>{" "}
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "-1px",
              }}
            >
              label.
            </span>
            <br />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Run by
            </span>{" "}
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "-1px",
              }}
            >
              agents.
            </span>
          </h1>

          {/* Subheader — Sidney's story feel */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(16px, 2vw, 22px)",
              color: "rgba(240, 235, 227, 0.45)",
              maxWidth: 540,
              lineHeight: 1.7,
              margin: "0 0 48px",
            }}
          >
            I built the label I wished existed when I was an artist —
            one where agents handle research, content, and distribution
            so you never have to choose between creating and running a business.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link
              href="https://chat.recoupable.com"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#0c0f14",
                backgroundColor: "#d4a843",
                padding: "14px 36px",
                borderRadius: 2,
                textDecoration: "none",
                boxShadow: "0 0 24px rgba(212, 168, 67, 0.15)",
              }}
            >
              Start Free
            </Link>
            <Link
              href="https://chat.recoupable.com"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#f0ebe3",
                border: "1px solid rgba(240, 235, 227, 0.2)",
                padding: "14px 36px",
                borderRadius: 2,
                textDecoration: "none",
              }}
            >
              Watch Demo
            </Link>
          </div>
        </div>

        {/* Bottom ambient line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent 10%, rgba(212, 168, 67, 0.15) 50%, transparent 90%)",
          }}
        />
      </div>
    </>
  );
}
