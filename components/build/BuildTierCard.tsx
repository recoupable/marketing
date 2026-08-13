import { Check } from "lucide-react";
import type { buildCopy } from "@/lib/copy/build";

/**
 * Pricing tier card for the /build page. Mirrors the advisory PackageCard
 * treatment so the two halves of the services ladder read as one system.
 */
export function BuildTierCard({ tier }: { tier: (typeof buildCopy.tiers)[number] }) {
  const isHighlighted = tier.highlighted;

  return (
    <div
      className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
        isHighlighted
          ? "bg-[#080808] text-white md:-mt-4 md:mb-[-16px]"
          : "border border-[var(--border)] bg-[var(--background)]"
      }`}
      style={isHighlighted ? { boxShadow: "0 25px 60px -15px rgba(0,0,0,0.5)" } : undefined}
    >
      {"badge" in tier && tier.badge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="text-[9px] uppercase tracking-wider bg-white text-black px-4 py-1.5 rounded-full shadow-lg"
            style={{ fontFamily: "var(--font-bitmap), monospace" }}
          >
            {tier.badge}
          </span>
        </div>
      )}

      <h3 className="font-bold text-lg mb-0.5">{tier.name}</h3>
      <p
        className={`text-[10px] uppercase tracking-wide mb-4 ${
          isHighlighted ? "text-white/60" : "text-[var(--muted-foreground)]"
        }`}
      >
        {tier.description}
      </p>

      <div className="mb-6">
        <span className="text-3xl font-bold">{tier.price}</span>
      </div>

      <ul className="space-y-3 mb-8 text-sm">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check
              size={16}
              className={`mt-0.5 shrink-0 ${isHighlighted ? "text-white" : "text-[var(--foreground)]"}`}
            />
            <span className={isHighlighted ? "text-white/90" : "text-[var(--muted-foreground)]"}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={tier.ctaHref}
        className={`block w-full text-center py-3 rounded-lg text-sm font-medium transition-colors ${
          isHighlighted
            ? "bg-white text-black hover:bg-white/90"
            : "border border-[var(--border)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
        }`}
      >
        {tier.ctaLabel}
      </a>
    </div>
  );
}
