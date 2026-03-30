/**
 * Signature visual: HUD-style bounding box + terminal readout (CSS-only, no photo).
 * Staggered readout lines via scoped keyframes — server component, no client JS.
 */
export function VisionOverlay() {
  return (
    <section
      className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d0d0d] via-[#111] to-[#0a0a0a] px-4 py-12"
      aria-label="Product vision: culture analysis visualization"
    >
      <style>{`
        @keyframes vision-readout-fade {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .vision-readout-line {
          opacity: 0;
          animation: vision-readout-fade 0.45s ease-out forwards;
        }
        .vision-readout-delay-1 {
          animation-delay: 0.2s;
        }
        .vision-readout-delay-2 {
          animation-delay: 0.55s;
        }
        .vision-readout-delay-3 {
          animation-delay: 0.9s;
        }
        .vision-readout-delay-4 {
          animation-delay: 1.2s;
        }
      `}</style>

      {/* Subtle scan / noise mood */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="relative mx-auto aspect-[16/10] min-h-[240px] w-full max-w-3xl border-2 border-[#c8ff00] bg-[#0d0d0d]/80">
          {/* Corner L-brackets (viewfinder) */}
          <span
            className="pointer-events-none absolute -left-px -top-px z-20 block h-5 w-5 border-l-2 border-t-2 border-[#c8ff00]"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute -right-px -top-px z-20 block h-5 w-5 border-r-2 border-t-2 border-[#c8ff00]"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute -bottom-px -left-px z-20 block h-5 w-5 border-b-2 border-l-2 border-[#c8ff00]"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute -bottom-px -right-px z-20 block h-5 w-5 border-b-2 border-r-2 border-[#c8ff00]"
            aria-hidden
          />

          {/* Top-center label */}
          <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
            <span className="inline-block whitespace-nowrap rounded-full bg-[#c8ff00] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-black">
              SUBJECT_08X
            </span>
          </div>

          {/* Subject / artist placeholder */}
          <div className="relative flex h-full min-h-[inherit] flex-col items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#0d0d0d] to-[#080808]"
              aria-hidden
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse 45% 70% at 50% 45%, rgba(80,80,80,0.35) 0%, transparent 65%)",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath fill='%23ffffff' fill-opacity='0.15' d='M40 8c8 0 14 6 14 14 0 5-2 9-6 12 10 4 16 14 16 26v6H16v-6c0-12 6-22 16-26-4-3-6-7-6-12 0-8 6-14 14-14z'/%3E%3C/svg%3E")`,
                backgroundSize: "min(45%, 200px)",
                backgroundPosition: "50% 42%",
                backgroundRepeat: "no-repeat",
              }}
              aria-hidden
            />
            <p className="relative z-10 select-none text-center font-mono text-2xl font-bold uppercase tracking-[0.35em] text-[var(--foreground)]/15 sm:text-3xl md:text-4xl">
              ARTIST PROFILE
            </p>
          </div>

          {/* Terminal readout + deployment badge */}
          <div className="absolute bottom-3 left-3 z-20 max-w-[min(100%-1.5rem,320px)] space-y-2">
            <div className="border border-[#c8ff00]/25 bg-black/75 px-3 py-2.5 font-mono text-[10px] leading-relaxed text-[var(--foreground)] backdrop-blur-sm sm:text-[11px]">
              <p className="vision-readout-line vision-readout-delay-1 text-[var(--muted-foreground)]">
                &gt; VIBE_ANALYSIS: IN PROGRESS
              </p>
              <p className="vision-readout-line vision-readout-delay-2 text-[var(--muted-foreground)]">
                &gt; AESTHETIC_SCORE:{" "}
                <span className="text-[var(--foreground)]">94.2%</span>
              </p>
              <p className="vision-readout-line vision-readout-delay-3 text-[var(--muted-foreground)]">
                &gt; GENRE_PROB:{" "}
                <span className="text-[var(--foreground)]">
                  DREAM POP (91%)
                </span>
              </p>
            </div>
            <div className="vision-readout-line vision-readout-delay-4 inline-block rounded-sm bg-[#c8ff00] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wide text-black sm:text-[10px]">
              [ READY FOR DEPLOYMENT ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
