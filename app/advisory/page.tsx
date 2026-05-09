import type { Metadata } from "next";
import { Check } from "lucide-react";
import { advisoryCopy } from "@/lib/copy/advisory";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Advisory for Music Companies | Recoupable",
  description: advisoryCopy.description,
  path: "/advisory",
});

/* ── Credential badges ─────────────────────────────────────────────── */
function CredentialCard({
  stat,
  label,
  detail,
}: {
  stat: string;
  label: string;
  detail: string;
}) {
  return (
    <div className="text-center p-6">
      <div
        className="text-4xl font-bold mb-1"
        style={{ fontFamily: "var(--font-bitmap), monospace" }}
      >
        {stat}
      </div>
      <div className="text-sm font-semibold uppercase tracking-wide mb-2">
        {label}
      </div>
      <p className="text-xs text-[var(--muted)]">{detail}</p>
    </div>
  );
}

/* ── Package card ──────────────────────────────────────────────────── */
function PackageCard({
  pkg,
}: {
  pkg: (typeof advisoryCopy.packages)[number];
}) {
  const isHighlighted = pkg.highlighted;

  return (
    <div
      className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
        isHighlighted
          ? "bg-[#080808] text-white md:-mt-4 md:mb-[-16px]"
          : "border border-[var(--border)] bg-[var(--background)]"
      }`}
      style={
        isHighlighted
          ? { boxShadow: "0 25px 60px -15px rgba(0,0,0,0.5)" }
          : undefined
      }
    >
      {"badge" in pkg && pkg.badge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="text-[9px] uppercase tracking-wider bg-white text-black px-4 py-1.5 rounded-full shadow-lg"
            style={{ fontFamily: "var(--font-bitmap), monospace" }}
          >
            {pkg.badge}
          </span>
        </div>
      )}

      <h3 className="font-bold text-lg mb-0.5">{pkg.name}</h3>
      <p
        className={`text-[10px] uppercase tracking-wide mb-4 ${
          isHighlighted ? "text-white/60" : "text-[var(--muted)]"
        }`}
      >
        {pkg.description}
      </p>

      <div className="mb-6">
        <span className="text-3xl font-bold">{pkg.price}</span>
      </div>

      <ul className="space-y-3 mb-8 text-sm">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check
              size={16}
              className={`mt-0.5 shrink-0 ${
                isHighlighted ? "text-white" : "text-[var(--foreground)]"
              }`}
            />
            <span
              className={isHighlighted ? "text-white/90" : "text-[var(--muted)]"}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={pkg.ctaHref}
        className={`block w-full text-center py-3 rounded-lg text-sm font-medium transition-colors ${
          isHighlighted
            ? "bg-white text-black hover:bg-white/90"
            : "border border-[var(--border)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
        }`}
      >
        {pkg.ctaLabel}
      </a>
    </div>
  );
}

/* ── Main page ─────────────────────────────────────────────────────── */
export default function AdvisoryPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      {/* Hero */}
      <section className="text-center mb-20">
        <p
          className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          AI Advisory
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          {advisoryCopy.headline}
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          {advisoryCopy.subheadline}
        </p>
      </section>

      {/* Credentials */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24 border border-[var(--border)] rounded-2xl py-8">
        {advisoryCopy.credentials.map((c) => (
          <CredentialCard key={c.label} {...c} />
        ))}
      </section>

      {/* What You Get */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-center mb-12">What You Get</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {advisoryCopy.whatYouGet.map((item) => (
            <div
              key={item.title}
              className="border border-[var(--border)] rounded-xl p-6"
            >
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Who It's For */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-center mb-12">Who This Is For</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {advisoryCopy.whoItsFor.map((w) => (
            <div key={w.title} className="flex gap-4">
              <div className="shrink-0 w-1 bg-[var(--foreground)] rounded-full" />
              <div>
                <h3 className="font-bold mb-1">{w.title}</h3>
                <p className="text-sm text-[var(--muted)]">{w.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-center mb-12">Packages</h2>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {advisoryCopy.packages.map((pkg) => (
            <PackageCard key={pkg.name} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-24 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {advisoryCopy.faq.map((item) => (
            <details
              key={item.q}
              className="group border-b border-[var(--border)] pb-4"
            >
              <summary className="cursor-pointer font-medium text-sm flex items-center justify-between">
                {item.q}
                <span className="ml-4 text-[var(--muted)] group-open:rotate-45 transition-transform text-lg">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="text-center py-16 border-t border-[var(--border)]">
        <h2 className="text-3xl font-bold mb-4">
          {advisoryCopy.closingCta.headline}
        </h2>
        <p className="text-[var(--muted)] max-w-xl mx-auto mb-8 leading-relaxed">
          {advisoryCopy.closingCta.subheadline}
        </p>
        <a
          href={advisoryCopy.closingCta.ctaHref}
          className="inline-block bg-[var(--foreground)] text-[var(--background)] px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {advisoryCopy.closingCta.ctaLabel}
        </a>
      </section>
    </main>
  );
}
