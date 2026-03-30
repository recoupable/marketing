import Link from "next/link";

export default function DesignA() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "#fafaf5",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          color: "#1a1a1a",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 40px",
          }}
        >
          {/* Logo icon */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #345A5D, #4a7c7f)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            R
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Link
              href="https://chat.recoupable.com"
              style={{
                fontSize: 14,
                color: "#666",
                textDecoration: "none",
              }}
            >
              Sign In
            </Link>
            <Link
              href="https://chat.recoupable.com"
              style={{
                fontSize: 14,
                color: "#fff",
                backgroundColor: "#345A5D",
                padding: "8px 20px",
                borderRadius: 100,
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 24px",
            gap: 28,
            marginTop: -40,
          }}
        >
          {/* Pill badge */}
          <Link
            href="https://chat.recoupable.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 8px 6px 16px",
              borderRadius: 100,
              border: "1px solid #e0ddd5",
              backgroundColor: "#fff",
              fontSize: 13,
              color: "#555",
              textDecoration: "none",
            }}
          >
            <span style={{ fontWeight: 500, color: "#345A5D" }}>
              Artist Intelligence
            </span>
            <span
              style={{
                backgroundColor: "#f0ede5",
                padding: "4px 12px",
                borderRadius: 100,
                fontSize: 12,
                color: "#888",
              }}
            >
              See how it works →
            </span>
          </Link>

          {/* Headline */}
          <div>
            <h1
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                lineHeight: 1.1,
                margin: 0,
                color: "#1a1a1a",
              }}
            >
              Meet Your New AI
            </h1>
            <h1
              style={{
                fontSize: "clamp(44px, 7vw, 80px)",
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: 1.1,
                margin: "4px 0 0",
                color: "#1a1a1a",
              }}
            >
              Record Label
            </h1>
          </div>

          {/* Subheader */}
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "#777",
              maxWidth: 460,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Spend more time doing what you love. Let agents handle the rest.
          </p>

          {/* Chat input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: 520,
              backgroundColor: "#fff",
              border: "1px solid #e0ddd5",
              borderRadius: 14,
              padding: "6px 6px 6px 20px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <input
              type="text"
              placeholder="Ask me anything about your artist..."
              readOnly
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 15,
                color: "#999",
                backgroundColor: "transparent",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <button
              style={{
                backgroundColor: "#345A5D",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "10px 24px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Send
            </button>
          </div>

          {/* Product screenshot placeholder */}
          <div
            style={{
              width: "100%",
              maxWidth: 700,
              height: 180,
              border: "2px dashed #d5d2ca",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#bbb",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: 2,
              marginTop: 8,
            }}
          >
            PRODUCT SCREENSHOT
          </div>
        </div>
      </div>
    </>
  );
}
