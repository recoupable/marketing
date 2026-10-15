import { withPageMetadata } from "@/lib/seo";
import { companyMapCopy as copy } from "@/lib/copy/company-map";
import { CompanyMap } from "@/components/company-map/CompanyMap";
import { PageCTA } from "@/components/sky/page-ui";
import "./company-map.css";

export const metadata = withPageMetadata({
  title: "Agentic Music Company: Explore the Operating Model",
  description: copy.description,
  alternates: { canonical: "/company-map" },
});

export default function CompanyMapPage() {
  return (
    <div className="sky-subpage company-map-page">
      <CompanyMap />
      <PageCTA
        title="Put the model to work in your company."
        description="Start with your team, your catalog and the work that needs to connect. We’ll help you turn the model into a system your company can use."
      />
    </div>
  );
}
