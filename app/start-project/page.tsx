import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { generalInterests } from "@/lib/inquiry-topics";
import {
  getImmersiveProjectBrief,
  getImmersiveWorkflow,
} from "@/lib/immersive-workflows";
import { withPageMetadata } from "@/lib/seo";
import { parsePricingSelection, planPrice, pricingPlans, pricingSelectionLabel } from "@/lib/pricing";
import "../transformation.css";
import "./lead-page.css";

export const metadata: Metadata = withPageMetadata({
  title: "Get a free AI audit for your music business",
  description:
    "Find where AI could help your music business. Request a free review of one workflow and a practical first step, or discuss your selected Recoup plan.",
  alternates: { canonical: "/start-project" },
});

export const dynamic = "force-dynamic";

export default async function StartProjectPage({
  searchParams,
}: {
  searchParams: Promise<{
    workflow?: string | string[];
    project?: string | string[];
    plan?: string | string[];
    billing?: string | string[];
  }>;
}) {
  const { workflow, project, plan, billing } = await searchParams;
  const pricingSelection = parsePricingSelection(plan, billing);
  const freeAudit = !pricingSelection;
  const selectedPlan = pricingPlans.find((item) => item.id === pricingSelection?.plan);
  const selectedPrice = selectedPlan && pricingSelection
    ? planPrice(selectedPlan.id, pricingSelection.billing)
    : undefined;
  const pricingContext = pricingSelection ? pricingSelectionLabel(pricingSelection) : undefined;
  const planInterest = pricingSelection?.plan === "advisory" ? "AI strategy"
    : pricingSelection?.plan === "partner" ? "Custom systems"
      : pricingSelection?.plan === "enterprise" ? "Not sure yet" : undefined;
  const selectedProject = getImmersiveWorkflow(project);
  const requestedInterest =
    typeof workflow === "string" &&
    generalInterests.some((interest) => interest === workflow)
      ? workflow
      : undefined;
  const initialInterest =
    requestedInterest ?? planInterest ?? (selectedProject ? "Custom systems" : "Not sure yet");
  const initialBrief = getImmersiveProjectBrief(project);

  return (
    <section className="lead-page" aria-labelledby="lead-page-title">
      <div className="lead-page-copy">
        <p className="sp-kicker">{freeAudit ? "Free AI audit" : "Start a project"}</p>
        <h1 id="lead-page-title">{freeAudit ? "Get your free AI audit." : "Let’s build something useful."}</h1>
        <p className="lead-page-intro">
          {freeAudit
            ? "Bring one workflow your team wants to improve. We’ll review how it works today, where AI could help, and a practical first step."
            : "Tell us about your team, the work you want to improve, and what a useful result would look like. A few sentences are enough."}
        </p>
        <div className="lead-page-next">
          <h2>What happens next</h2>
          <p>
            {freeAudit
              ? "Share a few details below and we’ll follow up to arrange your audit. The audit is free. Any implementation is scoped and priced separately."
              : "We’ll discuss the project together. If we decide to work together, we’ll agree on scope and pricing before starting."}
          </p>
        </div>
      </div>
      <div className="lead-page-form">
        {pricingSelection && (
          <aside className="lead-selected-plan" aria-label="Selected plan">
            <div>
              <p className="lead-selected-plan-label">Selected plan</p>
              <h2>{selectedPlan?.name ?? "Enterprise"}</h2>
              {selectedPrice ? (
                <>
                  <p className="lead-selected-plan-price"><strong>{selectedPrice.monthly}</strong> / month</p>
                  <p className="lead-selected-plan-terms">{selectedPrice.terms} · USD</p>
                </>
              ) : <p className="lead-selected-plan-terms">Custom engagement. We’ll scope it together.</p>}
            </div>
            <Link href="/pricing">Change plan</Link>
          </aside>
        )}
        <InquiryForm
          key={`${initialInterest}:${selectedProject?.id ?? "general"}:${pricingSelection?.plan ?? "none"}:${pricingSelection?.billing ?? "monthly"}`}
          qualified
          freeAudit={freeAudit}
          connected={true}
          initialInterest={initialInterest}
          initialBrief={initialBrief}
          pricingContext={pricingContext}
        />
      </div>
    </section>
  );
}
