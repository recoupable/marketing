import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import "../transformation.css";
import { ButtonLink } from "@/components/ui";
import { InquiryForm } from "@/components/inquiry-form";
import { generalInterests } from "@/lib/inquiry-topics";
import {
  getImmersiveProjectBrief,
  getImmersiveWorkflow,
} from "@/lib/immersive-workflows";
import { site } from "@/lib/site";

export const metadata: Metadata = withPageMetadata({
  title: "Let’s put AI to work",
  description:
    "Talk with Recoup about AI transformation for music funds and rightsholders: strategy, custom systems, and team training.",
  alternates: { canonical: "/contact" },
});
export const dynamic = "force-dynamic";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{
    workflow?: string | string[];
    project?: string | string[];
  }>;
}) {
  const { workflow, project } = await searchParams;
  const selectedProject = getImmersiveWorkflow(project);
  const requestedInterest =
    typeof workflow === "string" &&
    generalInterests.some((interest) => interest === workflow)
      ? workflow
      : undefined;
  // Preserve an explicit choice; a known project can begin with a scoped build.
  const initialInterest =
    requestedInterest ?? (selectedProject ? "Custom systems" : "Not sure yet");
  const initialBrief = getImmersiveProjectBrief(project);

  return (
    <section className="transformation-contact contact-layout section-padding">
      <div className="contact-copy">
        <h1>Let’s put AI to work.</h1>
        <p>
          Tell us what your team does today and what you’d like to improve.
          A few sentences are enough.
        </p>
        <p>
          On the first call, we’ll talk through the workflow, the tools you use,
          and a useful first project. If we decide to work together, we’ll agree
          on scope, deliverables, and price before starting.
        </p>
        <p><Link className="sp-text-link" href="/start-project">Have a project in mind? Share a fuller brief.</Link></p>
        <div className="contact-details">
          <span className="mono">OR EMAIL US</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {site.booking && (
            <div style={{ marginTop: 20 }}>
              <ButtonLink href={site.booking}>Book a conversation</ButtonLink>
            </div>
          )}
        </div>
      </div>
      <InquiryForm
        key={`${initialInterest}:${selectedProject?.id ?? "general"}`}
        connected={true}
        initialInterest={initialInterest}
        initialBrief={initialBrief}
      />
    </section>
  );
}
