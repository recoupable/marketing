"use client";

import { ArrowUpRight } from "lucide-react";
import { useAccountPlan } from "@/hooks/useAccountPlan";
import { pricingCopy } from "@/lib/copy/pricing";
import { PlanCheckoutButton } from "@/components/pricing/PlanCheckoutButton";

/**
 * Signed-in state above the plan cards: names the visitor's current plan and
 * offers the one next step (Pro checkout straight to Stripe, or the app when
 * already on Pro). Renders nothing while signed out or unresolved, so the
 * signed-out page is unchanged.
 */
export function CurrentPlanBanner() {
  const plan = useAccountPlan();
  if (!plan) return null;
  const c = pricingCopy.signedIn;

  return (
    <div className="max-w-3xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl px-6 py-4 shadow-[0_0_0_1px_var(--border)]">
      <p className="font-medium">{c.planLabel(plan)}</p>
      {plan === "pro" ? (
        <a
          href={c.openAppHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4 hover:opacity-80"
        >
          {c.openAppCta} <ArrowUpRight size={14} />
        </a>
      ) : (
        <div className="w-full sm:w-auto sm:min-w-[220px]">
          <PlanCheckoutButton
            plan="pro"
            surface="pricing"
            label={c.upgradeCta}
            note={c.upgradeNote}
            className="bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 block w-full text-center py-2.5 rounded-lg text-sm font-medium transition-opacity"
          />
        </div>
      )}
    </div>
  );
}
