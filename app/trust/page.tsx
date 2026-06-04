import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Trust & Governance — Data, Ownership & AI Access",
  description:
    "How Recoup handles your data: you own what we build, access is scoped before work starts, and private skills live in your repos.",
  path: "/trust",
});

const CONTACT = `mailto:${siteConfig.contactEmail}?subject=Trust%20%26%20Governance`;

/* ── Data ──────────────────────────────────────────────────────────── */

const principles = [
  {
    k: "Ownership",
    title: "You own what we build",
    body: "Agents, skills, and workflows built in your engagement are yours. They live in your stack or a repository your organization controls — not locked inside our platform.",
  },
  {
    k: "Data use",
    title: "Data boundaries are scoped up front",
    body: "Your catalog, royalty figures, contracts, and audience data stay inside the agreed engagement boundary. Private work is not folded into public skills without approval.",
  },
  {
    k: "Repositories",
    title: "Org-owned skill repos",
    body: "Custom skills can live in a private repo your organization owns. Add or remove access like any other repo. The open repo and your private repo are kept separate.",
  },
  {
    k: "Access",
    title: "Scoped and revocable",
    body: "Agents only touch the systems you explicitly connect — Drive, royalty data, distributors — and you can revoke that access at any time. Nothing connects itself.",
  },
  {
    k: "Offboarding",
    title: "Your ownership stays intact",
    body: "When someone leaves your team — or when an engagement with us ends — the skills, repos, and agents stay with your organization. No knowledge walks out the door.",
  },
  {
    k: "Transparency",
    title: "Open by default, private when it matters",
    body: "The skills we publish are open source so you can read exactly what they do. The work specific to your roster and data is yours and stays out of the open repo.",
  },
] as const;

/* ── Page ───────────────────────────────────────────────────────────── */

export default function TrustPage() {
  return (
    <div className="bg-(--background) text-(--foreground)">
      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-20 sm:pb-24">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10 text-center">
          <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-6">
            Trust &amp; Governance
          </p>
          <h1 className="font-pixel text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.03] tracking-tight mb-6">
            Your data and your<br className="hidden sm:block" /> tools stay yours.
          </h1>
          <p className="text-(--foreground)/60 text-[clamp(1.0625rem,1.5vw,1.25rem)] font-ui leading-[1.55] max-w-[620px] mx-auto mb-9">
            For labels, catalogs, and rights owners the first question is always
            the same: who owns this, and is my proprietary data safe? Here are
            the guarantees we work under.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/consulting"
              className="cta-pulse font-ui font-semibold bg-(--foreground) text-(--background) px-9 py-4 rounded-full text-[15px] hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
            >
              Talk to us
            </Link>
            <a
              href={CONTACT}
              className="font-ui font-medium text-[15px] text-(--foreground)/55 hover:text-(--foreground) transition-colors flex items-center gap-1.5"
            >
              Email us a requirement <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 sm:py-28 border-t border-(--border)">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">
            The guarantees
          </p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05] mb-14 max-w-[640px]">
            Six commitments, in writing.
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {principles.map((p) => (
              <div
                key={p.title}
                className="flex flex-col rounded-2xl bg-(--background) p-7"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <p className="font-pixel text-[10px] text-(--foreground)/35 uppercase tracking-[0.18em] mb-3">
                  {p.k}
                </p>
                <h3 className="font-ui font-bold text-[19px] text-(--foreground) mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-[14px] text-(--foreground)/55 leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing band */}
      <section className="py-20 sm:py-28 bg-(--muted)/40">
        <div className="max-w-[640px] mx-auto px-6 sm:px-10 text-center">
          <div
            className="rounded-2xl bg-(--background) p-10 sm:p-12"
            style={{ boxShadow: "0 0 0 1px var(--border)" }}
          >
            <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">
              Have a requirement?
            </p>
            <h2 className="font-pixel text-[clamp(1.75rem,3.5vw,2.5rem)] tracking-tight leading-[1.08] mb-4">
              We&apos;ll put it in writing.
            </h2>
            <p className="text-[15px] text-(--foreground)/60 leading-relaxed mb-8">
              Specific data, security, or ownership needs? Tell us before any
              engagement starts and we&apos;ll commit to it on paper.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/consulting"
                className="font-ui font-semibold bg-(--foreground) text-(--background) px-8 py-3.5 rounded-full text-[15px] hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                Talk to us <ArrowRight size={15} />
              </Link>
              <a
                href={CONTACT}
                className="font-ui font-medium text-[15px] text-(--foreground)/55 hover:text-(--foreground) transition-colors"
              >
                Email us a requirement
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
