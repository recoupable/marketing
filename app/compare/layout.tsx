import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Dashboards vs Agent Plugins — Why BYOA Wins | ${siteConfig.name}`,
  description:
    "Compare traditional music AI dashboards to Recoup's agent-native plugins. See why labels are switching from another app to tools that work inside Claude, Cursor, and Codex.",
  path: "/compare",
});

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
