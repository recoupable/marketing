import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Pricing — Plans for Artists, Managers & Labels | ${siteConfig.name}`,
  description: `Start free. Scale when ready. ${siteConfig.name} pricing for artists, managers, labels, and developers building on AI music agent infrastructure.`,
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 text-center">
      <h1 className="font-pixel text-[clamp(2rem,5vw,3.5rem)] tracking-tight mb-4">
        Pricing
      </h1>
      <p className="text-[15px] text-(--foreground)/40 max-w-md mx-auto">
        Coming soon.
      </p>
    </div>
  );
}
