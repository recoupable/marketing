import type { Metadata } from "next";
import { Check } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Consulting for Music Companies | Recoupable",
  description:
    "Work directly with Sidney Swift on AI strategy for your label, distributor, or music company. From implementation plans to team training.",
  path: "/consulting",
});

/* ── Data ──────────────────────────────────────────────────────────── */

const credentials = [
  { stat: "10+", label: "Platinum Records", detail: "Grammy-winning production credits" },
  { stat: "$2.5M", label: "D2F Campaign", detail: "Direct-to-fan revenue generated" },
  { stat: "US", label: "Patent Holder", detail: "AI-driven music technology" },
  { stat: "1000+", label: "Artists Served", detail: "Through Recoupable's AI agents" },
];

const offerings = [
  {
    title: "1:1 Strategy Sessions",
    description:
      "Work directly with Sidney to map out how AI fits into your operation — no generic playbooks, just tailored strategy based on what you're actually building.",
  },
  {
    title: "Custom AI Implementation Plans",
    description:
      "A concrete roadmap for integrating AI into your workflows. Artist development, catalog management, marketing automation — scoped to your team and catalog.",
  },
  {
    title: "Team Training",
    description:
      "Get your team fluent in the tools that matter. Hands-on sessions covering AI workflows, prompt engineering, and the platforms reshaping the industry.",
  },
  {
    title: "Ongoing Advisory",
    description:
      "Retained access for companies that want a strategic partner, not a one-off consultant. Monthly check-ins, async support, and priority access.",
  },
];

const audiences = [
  { title: "Labels", description: "From indie imprints to majors looking to modernize A&R, marketing, and catalog strategy with AI." },
  { title: "Distributors", description: "Streamline operations, surface insights from your catalog data, and give your clients a competitive edge." },
  { title: "Management Companies", description: "Scale what your team can do for artists without scaling headcount. AI-assisted strategy, content, and revenue ops." },
  { title: "Catalog Owners", description: "Unlock value from your masters with AI-driven marketing, sync licensing intelligence, and audience development." },
];

const socialProof = [
  "Founded Recoupable — AI agent infrastructure for music businesses",
  "Interned for Lil Wayne at Young Money / Cash Money",
  "Produced for Beyoncé, Nicki Minaj",
  "10+ platinum records, Grammy wins",
  "Ran a $2.5M direct-to-fan campaign",
  "US patent holder in AI music technology",
  "Built the AI agent stack used by artists and labels daily",
];

const faq = [
  {
    q: "What does a typical consulting engagement look like?",
    a: "It depends on where you are. Some companies need a single strategy session to get clarity. Others want a multi-week implementation sprint with their team. We'll scope it together on the first call.",
  },
  {
    q: "Do I need technical expertise on my team?",
    a: "No. Sidney translates between the technical and business sides — that's the whole point. You'll leave with a plan your team can actually execute, regardless of their technical background.",
  },
  {
    q: "Is this just about Recoupable's products?",
    a: "Not at all. Consulting covers the full AI landscape relevant to music — tools, workflows, strategy, build-vs-buy decisions. If Recoupable's platform is the right fit, great. If not, you'll still walk away with a clear plan.",
  },
  {
    q: "How is this different from the Advisory page?",
    a: "Advisory is a structured, ongoing engagement with defined packages. Consulting is flexible — book a session, get a plan, go execute. Start here if you want to explore before committing to a retained relationship.",
  },
  {
    q: "What's the time commitment?",
    a: "Sessions are typically 60–90 minutes. Implementation plans take 1–2 weeks to deliver after the initial session. Training can be a single half-day or spread across multiple sessions.",
  },
];

/* ── Components ────────────────────────────────────────────────────── */

function CredentialCard({ stat, label, detail }: { stat: string; label: string; detail: string }) {
  return (
    <div className="text-center p-6">
      <div className="text-4xl font-bold mb-1" style={{ fontFamily: "var(--font-bitmap), monospace" }}>
        {stat}
      </div>
      <div className="text-sm font-semibold uppercase tracking-wide mb-2">{label}</div>
      <p className="text-xs text-[var(--muted)]">{detail}</p>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────── */

export default function ConsultingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      {/* Hero */}
      <section className="text-center mb-20">
        <p
          className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          Consulting
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          AI Strategy for Music Companies
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          Sidney Swift built the AI infrastructure that runs music businesses.
          Now you can work with him directly — whether you need a strategy
          session, an implementation plan, or a partner who speaks both AI and
          A&amp;R.
        </p>
      </section>

      {/* Credentials */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24 border border-[var(--border)] rounded-2xl py-8">
        {credentials.map((c) => (
          <CredentialCard key={c.label} {...c} />
        ))}
      </section>

      {/* What You Get */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-center mb-12">What You Get</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {offerings.map((item) => (
            <div key={item.title} className="border border-[var(--border)] rounded-xl p-6">
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who This Is For */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-center mb-12">Who This Is For</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {audiences.map((w) => (
            <div key={w.title} className="flex gap-4">
              <div className="shrink-0 w-1 bg-[var(--foreground)] rounded-full" />
              <div>
                <h3 className="font-bold mb-1">{w.title}</h3>
                <p className="text-sm text-[var(--muted)]">{w.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mb-24 text-center">
        <div className="border border-[var(--border)] rounded-2xl p-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Start a Conversation</h2>
          <p className="text-[var(--muted)] mb-2 leading-relaxed">
            Sessions start at <span className="font-semibold text-[var(--foreground)]">$500</span>.
            Scope and pricing depend on what you need — one call, an implementation sprint, or ongoing advisory.
          </p>
          <p className="text-sm text-[var(--muted)] mb-8">
            No pitch deck required. Just tell us what you&apos;re working on.
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}?subject=Consulting%20Inquiry`}
            className="inline-block bg-[var(--foreground)] text-[var(--background)] px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Book a Call
          </a>
        </div>
      </section>

      {/* Social Proof */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-center mb-12">Sidney Swift</h2>
        <div className="max-w-2xl mx-auto">
          <ul className="space-y-3">
            {socialProof.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check size={16} className="mt-0.5 shrink-0 text-[var(--foreground)]" />
                <span className="text-sm text-[var(--muted)]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-24 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faq.map((item) => (
            <details key={item.q} className="group border-b border-[var(--border)] pb-4">
              <summary className="cursor-pointer font-medium text-sm flex items-center justify-between">
                {item.q}
                <span className="ml-4 text-[var(--muted)] group-open:rotate-45 transition-transform text-lg">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="text-center py-16 border-t border-[var(--border)]">
        <h2 className="text-3xl font-bold mb-4">Ready to move?</h2>
        <p className="text-[var(--muted)] max-w-xl mx-auto mb-8 leading-relaxed">
          The music industry is adopting AI whether you&apos;re ready or not.
          The question is whether you lead or catch up.
        </p>
        <a
          href={`mailto:${siteConfig.contactEmail}?subject=Consulting%20Inquiry`}
          className="inline-block bg-[var(--foreground)] text-[var(--background)] px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Get in Touch
        </a>
      </section>
    </main>
  );
}
