import Link from "next/link";

export default function DesignD() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background:
            "linear-gradient(145deg, #0d1117 0%, #161b22 40%, #0d1117 100%)",
          overflow: "hidden",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {/* Ambient glow spots */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "30%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(88, 166, 255, 0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "20%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(136, 98, 235, 0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "rgba(200, 210, 220, 0.5)",
            zIndex: 20,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "rgba(200, 210, 220, 0.8)" }}>
              Recoupable OS
            </span>
            <span style={{ color: "rgba(200, 210, 220, 0.25)" }}>|</span>
            <span>Workspace 1</span>
          </div>
          <span>0.9.4_beta</span>
        </div>

        {/* Card container — positioned absolutely for layered depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Card 1: LEFT / BEHIND — product nav sidebar */}
          <div
            style={{
              position: "absolute",
              left: "8%",
              top: "50%",
              transform: "translateY(-50%) rotate(-2deg)",
              width: 240,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 16,
              padding: "28px 24px",
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "2px",
                color: "rgba(200, 210, 220, 0.4)",
                marginBottom: 24,
              }}
            >
              KNOWLEDGE GRAPH
            </div>
            {[
              { label: "Topic Clusters", active: true },
              { label: "AI Agents", active: false },
              { label: "Research Feed", active: false },
              { label: "Content Pipeline", active: false },
              { label: "Distribution", active: false },
              { label: "Analytics", active: false },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "10px 12px",
                  marginBottom: 4,
                  borderRadius: 8,
                  fontSize: 13,
                  color: item.active
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(200, 210, 220, 0.45)",
                  backgroundColor: item.active
                    ? "rgba(88, 166, 255, 0.12)"
                    : "transparent",
                  borderLeft: item.active
                    ? "2px solid rgba(88, 166, 255, 0.6)"
                    : "2px solid transparent",
                }}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Card 2: CENTER / FRONT — hero message */}
          <div
            style={{
              position: "relative",
              width: "min(480px, 90vw)",
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 20,
              padding: "48px 40px",
              zIndex: 10,
              textAlign: "center",
            }}
          >
            {/* Subtle top accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "20%",
                right: "20%",
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(88, 166, 255, 0.4), transparent)",
              }}
            />

            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "3px",
                color: "rgba(88, 166, 255, 0.6)",
                marginBottom: 28,
              }}
            >
              AGENT WORKSPACE
            </div>

            <h1
              style={{
                fontSize: "clamp(24px, 3vw, 32px)",
                fontWeight: 600,
                color: "rgba(240, 245, 250, 0.95)",
                lineHeight: 1.4,
                margin: "0 0 16px",
              }}
            >
              Connect your artist.
              <br />
              Analyze the data.
              <br />
              Deploy the system.
            </h1>

            <p
              style={{
                fontSize: 14,
                color: "rgba(200, 210, 220, 0.5)",
                lineHeight: 1.7,
                margin: "0 0 36px",
              }}
            >
              Your AI-native record label — research, content, and
              distribution agents working autonomously.
            </p>

            <Link
              href="https://chat.recoupable.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "rgba(240, 245, 250, 0.95)",
                color: "#0d1117",
                padding: "12px 28px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "0.3px",
              }}
            >
              Initialize Workspace →
            </Link>
          </div>

          {/* Card 3: RIGHT / BEHIND — system operations */}
          <div
            style={{
              position: "absolute",
              right: "8%",
              top: "50%",
              transform: "translateY(-50%) rotate(1.5deg)",
              width: 220,
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 16,
              padding: "28px 24px",
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "2px",
                color: "rgba(200, 210, 220, 0.4)",
                marginBottom: 28,
              }}
            >
              SYSTEM OPERATIONS
            </div>

            {[
              { num: "01", label: "COLLECT", desc: "Ingest streams + social" },
              { num: "02", label: "PROCESS", desc: "Score and rank signals" },
              { num: "03", label: "GENERATE", desc: "Deploy content agents" },
            ].map((step) => (
              <div key={step.num} style={{ marginBottom: 24 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 10,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 20,
                      fontWeight: 500,
                      color: "rgba(136, 98, 235, 0.5)",
                    }}
                  >
                    {step.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      letterSpacing: "1.5px",
                      color: "rgba(240, 245, 250, 0.7)",
                    }}
                  >
                    {step.label}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "rgba(200, 210, 220, 0.35)",
                    margin: 0,
                    paddingLeft: 34,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
