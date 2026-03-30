import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { platformCopy } from "@/lib/copy/platform";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Platform | Recoupable",
  description: platformCopy.description,
  path: "/platform",
});

const sectionIcons: Record<string, React.ReactNode> = {
  "deep-context": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="12" stroke="var(--brand)" strokeWidth="2" />
      <circle cx="14" cy="14" r="6" fill="var(--brand)" opacity="0.3" />
      <circle cx="14" cy="14" r="3" fill="var(--brand)" />
    </svg>
  ),
  "content-pipeline": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="3" y="6" width="8" height="8" rx="2" stroke="var(--brand)" strokeWidth="2" />
      <rect x="17" y="6" width="8" height="8" rx="2" stroke="var(--brand)" strokeWidth="2" />
      <rect x="10" y="16" width="8" height="8" rx="2" fill="var(--brand)" opacity="0.3" />
      <line x1="11" y1="10" x2="17" y2="10" stroke="var(--brand)" strokeWidth="2" />
    </svg>
  ),
  agents: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M14 4L24 10V18L14 24L4 18V10L14 4Z" stroke="var(--brand)" strokeWidth="2" />
      <circle cx="14" cy="14" r="4" fill="var(--brand)" opacity="0.3" />
    </svg>
  ),
  workflows: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M4 8h8M4 14h20M4 20h14" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="8" r="3" fill="var(--brand)" opacity="0.3" />
      <circle cx="22" cy="20" r="3" fill="var(--brand)" />
    </svg>
  ),
  integrations: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="4" stroke="var(--brand)" strokeWidth="2" />
      <line x1="14" y1="2" x2="14" y2="8" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="20" x2="14" y2="26" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="14" x2="8" y2="14" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="14" x2="26" y2="14" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "data-layer": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <ellipse cx="14" cy="8" rx="10" ry="4" stroke="var(--brand)" strokeWidth="2" />
      <path d="M4 8v6c0 2.2 4.5 4 10 4s10-1.8 10-4V8" stroke="var(--brand)" strokeWidth="2" />
      <path d="M4 14v6c0 2.2 4.5 4 10 4s10-1.8 10-4v-6" stroke="var(--brand)" strokeWidth="2" opacity="0.4" />
    </svg>
  ),
  "api-cli": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="3" y="5" width="22" height="18" rx="3" stroke="var(--brand)" strokeWidth="2" />
      <path d="M8 13l3 3-3 3" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="19" x2="20" y2="19" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export default function PlatformPage() {
  const c = platformCopy;

  return (
    <div className="w-full">
      {/* ── Hero ── */}
      <header className="max-w-5xl mx-auto px-4 pt-20 pb-8 text-center">
        <p className="text-sm font-medium tracking-widest uppercase text-[var(--brand)] mb-4">
          Platform
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] mb-6 max-w-3xl mx-auto leading-[1.1]">
          One system that runs your music business
        </h1>
        <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
          {c.description}
        </p>
      </header>

      {/* ── Hero Screenshot ── */}
      <div className="max-w-5xl mx-auto px-4 mb-24">
        <div className="relative rounded-xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--muted)] aspect-video flex items-center justify-center">
          <span className="text-[var(--muted-foreground)] text-sm font-mono">PLATFORM SCREENSHOT</span>
        </div>
      </div>

      {/* ── Sections — alternating layout ── */}
      <div className="space-y-24 sm:space-y-32 mb-24">
        {c.sections.map((section, i) => {
          const isEven = i % 2 === 0;
          const hasImage = section.id === "content-pipeline";

          return (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 max-w-6xl mx-auto px-4"
            >
              <div
                className={`flex flex-col gap-8 lg:gap-16 items-center ${
                  hasImage
                    ? "lg:flex-row"
                    : isEven
                      ? "lg:flex-row"
                      : "lg:flex-row-reverse"
                }`}
              >
                {/* Text side */}
                <div className={`flex-1 ${hasImage ? "lg:max-w-md" : "lg:max-w-lg"}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--brand)]/10 flex items-center justify-center shrink-0">
                      {sectionIcons[section.id]}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--foreground)]">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-[var(--muted-foreground)] leading-relaxed text-base sm:text-lg">
                    {section.description}
                  </p>
                </div>

                {/* Visual side */}
                {hasImage ? (
                  <div className="flex-1 relative rounded-xl overflow-hidden border border-[var(--border)] shadow-lg bg-[var(--muted)] aspect-video flex items-center justify-center">
                    <span className="text-[var(--muted-foreground)] text-xs font-mono">CONTENT PIPELINE</span>
                  </div>
                ) : (
                  <div className="flex-1 hidden lg:flex items-center justify-center">
                    <div className="w-full max-w-sm aspect-square rounded-2xl bg-[var(--muted)]/50 border border-[var(--border)] flex items-center justify-center">
                      <div className="w-16 h-16 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center scale-[2]">
                        {sectionIcons[section.id]}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* ── What this is not — dark callout ── */}
      <section className="bg-[var(--foreground)] text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
            {c.notSection.title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {c.notSection.items.map((item) => (
              <div
                key={item}
                className="flex gap-3 p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <span className="text-[var(--brand)] shrink-0 mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform="rotate(45 10 10)" />
                  </svg>
                </span>
                <p className="text-white/80 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="py-20 text-center">
        <p className="text-[var(--muted-foreground)] mb-6 text-lg">
          Ready to run your music business with agents?
        </p>
        <Link
          href={c.ctaHref}
          className="inline-block bg-[var(--brand)] text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[var(--brand)]/20"
        >
          {c.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
