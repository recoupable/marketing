import { withPageMetadata } from "@/lib/seo";
import { WebsiteAgent } from "@/components/website-agent/WebsiteAgent";
import { workflowPlanCopy } from "@/lib/copy/workflow-plan";

export const metadata = withPageMetadata({
  title: "Your music team’s one-page automation brief",
  description: workflowPlanCopy.description,
  alternates: { canonical: "/workflow-plan" },
});
export default function WorkflowPlanPage() {
  return <WebsiteAgent />;
}
