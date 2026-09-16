import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { SelectedPlanAside } from "@/components/inquiry/SelectedPlanAside";
import { generalInterests, podcastGuestInterest } from "@/lib/inquiry-topics";
import { startProjectCopy } from "@/lib/inquiry/startProjectCopy";
import {
  getImmersiveProjectBrief,
  getImmersiveWorkflow,
} from "@/lib/immersive-workflows";
import { withPageMetadata } from "@/lib/seo";
import { parsePricingSelection, pricingSelectionLabel } from "@/lib/pricing";
import "../transformation.css";
import "./lead-page.css";

type StartProjectSearchParams = Promise<{
  workflow?: string | string[];
  project?: string | string[];
  plan?: string | string[];
  billing?: string | string[];
}>;

const auditMetadata = {
  title: "Get a free AI audit for your music business",
  description:
    "Find where AI could help your music business. Request a free review of one workflow and a practical first step, or discuss your selected Recoup plan.",
};
const guestMetadata = {
  title: "Be a guest on the Recoup Podcast",
  description: "Run a label, a fund, a publisher or a management company? Tell us who you are and what you would talk about, and we reply with recording times.",
};

/** The guest URL is the destination of every invite email, so it carries its own title and description. */
export async function generateMetadata({ searchParams }: { searchParams: StartProjectSearchParams }): Promise<Metadata> {
  const { workflow } = await searchParams;
  const guest = workflow === podcastGuestInterest;
  return withPageMetadata({ ...(guest ? guestMetadata : auditMetadata), alternates: { canonical: "/start-project" } });
}

export const dynamic = "force-dynamic";

export default async function StartProjectPage({
  searchParams,
}: {
  searchParams: StartProjectSearchParams;
}) {
  const { workflow, project, plan, billing } = await searchParams;
  const pricingSelection = parsePricingSelection(plan, billing);
  const freeAudit = !pricingSelection;
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
  const copy = startProjectCopy({ interest: initialInterest, freeAudit });

  return (
    <section className="lead-page" aria-labelledby="lead-page-title">
      <div className="lead-page-copy">
        <p className="sp-kicker">{copy.kicker}</p>
        <h1 id="lead-page-title">{copy.title}</h1>
        <p className="lead-page-intro">{copy.intro}</p>
        <div className="lead-page-next">
          <h2>{copy.nextTitle}</h2>
          <p>{copy.next}</p>
        </div>
      </div>
      <div className="lead-page-form">
        {pricingSelection && <SelectedPlanAside selection={pricingSelection} />}
        <InquiryForm
          source="/start-project"
          plan={pricingSelection?.plan}
          key={`${initialInterest}:${selectedProject?.id ?? "general"}:${pricingSelection?.plan ?? "none"}:${pricingSelection?.billing ?? "monthly"}`}
          qualified={copy.qualified}
          freeAudit={freeAudit && copy.qualified}
          connected={true}
          initialInterest={initialInterest}
          initialBrief={initialBrief}
          pricingContext={pricingContext}
        />
      </div>
    </section>
  );
}
