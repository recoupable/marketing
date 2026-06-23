"use client";

import dynamic from "next/dynamic";

// The valuation flow mounts Privy, which must not be prerendered (the valuation
// page uses `force-dynamic` for the same reason). The home page is a static
// client component and can't set route-segment config, so we load the flow
// client-only via `ssr: false` — the page stays static, the flow hydrates after.
const ValuationFlow = dynamic(
  () => import("@/app/valuation/ValuationAuthProvider").then(m => m.ValuationAuthProvider),
  {
    ssr: false,
    loading: () => (
      <div
        className="mt-12 h-[68px] w-full max-w-[560px] mx-auto rounded-2xl"
        style={{ boxShadow: "0 0 0 1px color-mix(in srgb, var(--foreground) 15%, transparent)" }}
        aria-hidden
      />
    ),
  }
);

/**
 * Home-page hero interaction: the catalog valuation flow (search → Privy
 * sign-in → valuation result), replacing the old chat demo. Reuses the exact
 * valuation flow from the /valuation page so the two stay in sync (chat#1814).
 */
export function HomeValuationHero() {
  return (
    <div className="w-full max-w-[560px] mx-auto text-left">
      <ValuationFlow />
    </div>
  );
}
