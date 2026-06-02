import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Trust & Governance — Data, Ownership, No-Train | ${siteConfig.name}`,
  description:
    "How Recoup handles your data: you own what we build, we never train on your data, and your skills live in repos your organization controls.",
  path: "/trust",
});

/* ── Data ──────────────────────────────────────────────────────────── */

const principles = [
  {
    title: "You own what we build",
    body: "Agents, skills, and workflows built in your engagement are yours. They live in your stack or a repository your organization controls — not locked inside our platform.",
  },
  {
    title: "We never train on your data",
    body: "Your catalog, royalty figures, contracts, and audience data are never used to train models, and never fold into the open skills we publish. Private work stays private.",
  },
  {
    title: "Org-owned skill repositories",
    body: "Custom skills can live in a private repo your organization owns. Add or remove access like any other repo. The open repo and your private repo are kept separate.",
  },
  {
    title: "Access is scoped and revocable",
    body: "Agents only touch the systems you explicitly connect — Drive, royalty data, distributors — and you can revoke that access at any time. Nothing connects itself.",
  },
  {
    title: "Offboarding keeps your ownership intact",
    body: "When someone leaves your team — or when an engagement with us ends — the skills, repos, and agents stay with your organization. No knowledge walks out the door.",
  },
  {
    title: "Open by default, private when it matters",
    body: "The skills we publish are open source so you can read exactly what they do. The work specific to your roster and data is yours and stays out of the open repo.",
  },
];

/* ── Page ───────────────────────────────────────────────────────────── */

export default function TrustPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <header className="mb-16">
        <p
          className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          Trust &amp; Governance
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Your data and your tools stay yours.
        </h1>
        <p className="text-lg text-[var(--muted)] leading-relaxed">
          For labels, catalogs, and rights owners, the first question is always
          the same: who owns this, and is my proprietary data safe? Here are the
          guarantees we work under.
        </p>
      </header>

      <div className="space-y-10">
        {principles.map((p) => (
          <section key={p.title}>
            <h2 className="text-lg font-bold mb-2">{p.title}</h2>
            <p className="text-[15px] text-[var(--muted)] leading-relaxed">{p.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-16 pt-10 border-t border-[var(--border)]">
        <p className="text-[15px] text-[var(--muted)] leading-relaxed mb-6">
          Have a specific data, security, or ownership requirement? We&apos;ll
          put it in writing before any engagement starts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/consulting"
            className="inline-flex items-center justify-center bg-[var(--foreground)] text-[var(--background)] px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Talk to us
          </Link>
          <a
            href={`mailto:${siteConfig.contactEmail}?subject=Trust%20%26%20Governance`}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors"
          >
            Email us a requirement
          </a>
        </div>
      </div>
    </main>
  );
}
