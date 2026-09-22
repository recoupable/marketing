import { WebsiteAgent } from "@/components/website-agent/WebsiteAgent";
import { withPageMetadata } from "@/lib/seo";
export const metadata = withPageMetadata({
  title: "Ask Recoup",
  description: "Ask about Recoup, our tools, and AI for your music business.",
  alternates: { canonical: "/ask" },
});
export default function AskPage() {
  return <WebsiteAgent mode="faq" />;
}
