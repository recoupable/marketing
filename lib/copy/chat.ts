/**
 * Chat page copy — the hosted web app (chat.recoupable.com).
 *
 * This is the "use it now, nothing to install" half of the old Platform page.
 * Same skills as the open repo and Recoup OS, but running in a hosted workspace
 * for teams that don't want to wire up agents themselves.
 */
import { siteConfig } from "@/lib/config";

export const chatCopy = {
  title: "The hosted workspace for music teams.",
  description:
    "Chat is Recoup running for you — the same skills that power our own label, in a workspace your team can open in the browser. No install, no terminal, no setup.",
  primaryCta: { label: "Open Chat", href: siteConfig.appUrl, external: true },
  secondaryCta: { label: "See pricing", href: "/pricing", external: false },

  /** What you can do without building anything. */
  capabilities: [
    {
      title: "Research any artist",
      description:
        "Streaming data, audience, playlists, and competitive context — ask in plain language, get an answer grounded in real music data.",
    },
    {
      title: "Batch a release's content",
      description:
        "Go from one track to a month of short-form videos, covers, and a press kit, optimized for the platforms you ship on.",
    },
    {
      title: "Run catalog & label ops",
      description:
        "Audit catalogs, draft release plans, pitch playlists, and run the recurring work — with your context loaded, not re-explained every chat.",
    },
  ],

  /** Why hosted vs. installing skills yourself. */
  why: [
    "Nothing to install — open it in the browser and start.",
    "The same skills as the open repo and Recoup OS, kept current for you.",
    "Built for non-technical teams; no agents to wire up.",
    "Your private work stays yours — we never train on it.",
  ],

  ctaLabel: "Open Chat",
  ctaHref: siteConfig.appUrl,
} as const;

export type ChatCopy = typeof chatCopy;

export function chatToMarkdown(c: ChatCopy): string {
  const lines: string[] = [
    `# ${c.title} — ${siteConfig.name}`,
    "",
    c.description,
    "",
    `Open Chat: ${c.ctaHref}`,
    "",
    "## What you can do",
    "",
    ...c.capabilities.flatMap((cap) => [
      `### ${cap.title}`,
      "",
      cap.description,
      "",
    ]),
    "## Why hosted",
    "",
    ...c.why.map((w) => `- ${w}`),
  ];
  return lines.join("\n");
}
