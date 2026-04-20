import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Resources | ${siteConfig.name}`,
  description:
    "Blog, use cases, playbooks, and demos. Learn how to run your music business with AI agents.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 text-center">
      <h1 className="font-pixel text-[clamp(2rem,5vw,3.5rem)] tracking-tight mb-4">
        Resources
      </h1>
      <p className="text-[15px] text-(--foreground)/40 max-w-md mx-auto">
        Coming soon.
      </p>
    </div>
  );
}
