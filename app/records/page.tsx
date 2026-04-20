import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `${siteConfig.name} Records — A Label Run Entirely by AI Agents`,
  description: `${siteConfig.name} Records — our in-house music label, run entirely by AI agents. The proof the platform works: releases, marketing, and content all automated.`,
  path: "/records",
});

export default function RecordsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 text-center">
      <h1 className="font-pixel text-[clamp(2rem,5vw,3.5rem)] tracking-tight mb-4">
        {siteConfig.name} Records
      </h1>
      <p className="text-[15px] text-(--foreground)/40 max-w-md mx-auto">
        Coming soon.
      </p>
    </div>
  );
}
