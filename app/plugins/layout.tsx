import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Agent Plugins for Music | Recoup",
  description:
    "Install Recoup plugins into Claude Code, Cowork, Codex, or Cursor. Artist research, content creation, catalog deals, and more — powered by the Recoup API.",
  path: "/plugins",
});

export default function PluginsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
