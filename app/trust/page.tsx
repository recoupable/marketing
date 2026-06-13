import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/marketing/ContactForm";

export const metadata: Metadata = buildPageMetadata({
  title: "Trust & Governance — Data, Ownership & AI Access",
  description:
    "How Recoup handles your data: you own what we build, access is scoped before work starts, and private skills live in your repos.",
  path: "/trust",
});

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
            <a
              href="#contact"
              className="cta-pulse font-ui font-semibold bg-(--foreground) text-(--background) px-9 py-4 rounded-full text-[15px] hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start an Owned Build
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

      {/* Owned Build track (W-22) */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10">
          <div
            className="rounded-2xl bg-(--muted)/40 p-8 sm:p-10"
            style={{ boxShadow: "0 0 0 1px var(--border)" }}
          >
            <p className="font-pixel text-[10px] text-(--foreground)/35 uppercase tracking-[0.18em] mb-3">
              The engagement
            </p>
            <h2 className="font-pixel text-[clamp(1.5rem,3vw,2.25rem)] tracking-tight leading-[1.1] mb-4">
              Owned Build
            </h2>
            <p className="text-[15px] text-(--foreground)/60 leading-relaxed max-w-[620px] mb-6">
              Our build engagement is structured so the guarantees above are the
              default, not an add-on. We scope the data boundary first, build the
              agents and skills into a repository your organization owns, and hand
              over full control — so nothing is locked inside our platform and
              nothing walks out the door when an engagement ends.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[14px] text-(--foreground)/70">
              {[
                "Org-owned private repo from day one",
                "Data boundary scoped and signed before work starts",
                "Scoped, revocable access to your systems",
                "Everything stays yours at offboarding",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="text-(--foreground)/40 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact form (W-13) */}
      <section id="contact" className="py-20 sm:py-28 bg-(--muted)/40 scroll-mt-24">
        <div className="max-w-[640px] mx-auto px-6 sm:px-10">
          <div className="text-center mb-8">
            <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">
              Have a requirement?
            </p>
            <h2 className="font-pixel text-[clamp(1.75rem,3.5vw,2.5rem)] tracking-tight leading-[1.08] mb-4">
              We&apos;ll put it in writing.
            </h2>
            <p className="text-[15px] text-(--foreground)/60 leading-relaxed">
              Specific data, security, or ownership needs? Tell us before any
              engagement starts and we&apos;ll commit to it on paper.
            </p>
          </div>
          <div
            className="rounded-2xl bg-(--background) p-7 sm:p-9"
            style={{ boxShadow: "0 0 0 1px var(--border)" }}
          >
            <ContactForm source="trust-owned-build" />
          </div>
        </div>
      </section>
    </div>
  );
}
