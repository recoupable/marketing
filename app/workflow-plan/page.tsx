import { withPageMetadata } from "@/lib/seo";
import { WebsiteAgent } from "@/components/website-agent/WebsiteAgent";
import { aiScorecardCopy } from "@/lib/copy/ai-scorecard";

export const metadata = withPageMetadata({
  title: aiScorecardCopy.title,
  description: aiScorecardCopy.description,
  alternates: { canonical: "/workflow-plan" },
});
export default function WorkflowPlanPage() {
  return <WebsiteAgent />;
}
