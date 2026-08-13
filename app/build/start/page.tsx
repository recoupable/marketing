import type { Metadata } from "next";
import { Suspense } from "react";
import { buildPageMetadata } from "@/lib/seo";
import { BookingForm, type BookingPackage } from "@/app/advisory/book/BookingForm";

export const metadata: Metadata = buildPageMetadata({
  title: "Start a Custom Build | Recoupable",
  description:
    "Tell us what you want built. Custom, customer-owned AI technology for music businesses: agents, integrations, APIs, and full applications.",
  path: "/build/start",
});

/** The three /build tiers, submitted as the booking `package` (chat#1800 Phase 2). */
const BUILD_PACKAGES: readonly BookingPackage[] = [
  {
    id: "starter-build",
    name: "Starter Build",
    price: "from $2,500",
    desc: "A site, a skill, or a single agent",
  },
  {
    id: "custom-build",
    name: "Custom Build",
    price: "from $10k",
    desc: "Backends, MCP servers, APIs, full apps",
    popular: true,
  },
  {
    id: "care-plan",
    name: "Care Plan",
    price: "from $750/mo",
    desc: "Maintenance, monitoring, improvements",
  },
];

export default function BuildStartPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="max-w-2xl mx-auto px-6 py-24">
        <h1
          className="text-4xl font-bold mb-3"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          Start Your Build
        </h1>
        <p className="text-[var(--muted-foreground)] mb-10 text-lg">
          Tell us about your business and what you want built. We&apos;ll get
          back to you within 24 hours to scope it.
        </p>
        <Suspense fallback={<div className="animate-pulse h-96" />}>
          <BookingForm packages={BUILD_PACKAGES} source="/build/start" />
        </Suspense>
      </section>
    </main>
  );
}
