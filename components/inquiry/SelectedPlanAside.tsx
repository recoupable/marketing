import Link from "next/link";
import { planPrice, pricingPlans, type PricingSelection } from "@/lib/pricing";

/** The plan a visitor arrived with from /pricing, shown beside the brief so they can change it. */
export function SelectedPlanAside({ selection }: { selection: PricingSelection }) {
  const plan = pricingPlans.find((item) => item.id === selection.plan);
  const price = plan ? planPrice(plan.id, selection.billing) : undefined;
  return (
    <aside className="lead-selected-plan" aria-label="Selected plan">
      <div>
        <p className="lead-selected-plan-label">Selected plan</p>
        <h2>{plan?.name ?? "Enterprise"}</h2>
        {price ? (
          <>
            <p className="lead-selected-plan-price"><strong>{price.monthly}</strong> / month</p>
            <p className="lead-selected-plan-terms">{price.terms} · USD</p>
          </>
        ) : <p className="lead-selected-plan-terms">Custom engagement. We’ll scope it together.</p>}
      </div>
      <Link href="/pricing">Change plan</Link>
    </aside>
  );
}
