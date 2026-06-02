import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Partners — Embed Music Intelligence in Your Product | ${siteConfig.name}`,
  description:
    "For distributors, creator tools, and platforms: embed Recoup's music agents and API in your product. Usage-based and rev-share models, MCP-native, you keep your customer relationship.",
  path: "/partners",
});

/* ── Data ──────────────────────────────────────────────────────────── */

const audiences = [
  {
    title: "Distributors & DSPs",
    description:
      "Give your artists and labels AI workflows — release planning, analytics, content — without building a model team.",
  },
  {
    title: "Creator & artist tools",
    description:
      "Add music-aware agents to the product your users already log into, instead of sending them somewhere else.",
  },
  {
    title: "Catalog & rights platforms",
    description:
      "Surface diligence, royalty, and audience intelligence on top of the data you already hold.",
  },
];

const models = [
  {
    title: "Embed / OEM",
    description:
      "Run Recoup agents behind your own UI and brand. Your users never leave your product; you keep the customer relationship and the data boundary.",
  },
  {
    title: "API & MCP",
    description:
      "Call the Recoup API directly, or connect over MCP so any agent — yours or your customers' — can use our music tools with no custom glue code.",
  },
  {
    title: "Co-built agents",
    description:
      "We build the workflows with your team for your roster and stack, then hand them off into a repo your organization controls.",
  },
];

const commercials = [
  {
    q: "How does pricing work?",
    a: "Usage-based by default — you pay for what your users actually run. For embed/OEM deals we also do rev-share or platform licensing. We scope it to your volume on the first call; nothing here is a fixed public tier.",
  },
  {
    q: "Who pays for tokens?",
    a: "Your choice. You can bring your own model keys and pay providers directly, fold usage into your existing plans, or have us meter and bill it back. We're transparent about per-run cost either way.",
  },
  {
    q: "Do you train on our or our users' data?",
    a: "No. We never train models on your catalog, your users' data, or anything that runs through a partnership. Your data stays inside your boundary.",
  },
  {
    q: "What about agent discovery?",
    a: "Because the skills are open and MCP-native, agents can discover and call your integration the way they discover any tool — so you show up where your customers' agents already work, not just inside one app.",
  },
];

/* ── Page ───────────────────────────────────────────────────────────── */

export default function PartnersPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      {/* Hero */}
      <section className="text-center mb-20">
        <p
          className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          Partners
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Put music intelligence inside your product.
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          Recoup is built to plug in. If you run a distributor, a creator tool,
          or a catalog platform, you can offer your users music-aware agents
          without standing up a model team — and keep your brand, your customer,
          and your data boundary.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`mailto:${siteConfig.contactEmail}?subject=Partnership%20Inquiry`}
            className="inline-block bg-[var(--foreground)] text-[var(--background)] px-8 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Talk to partnerships
          </a>
          <a
            href={siteConfig.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors"
          >
            Read the API docs <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      {/* Who it's for */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-center mb-12">Who partners with us</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="rounded-xl p-6"
              style={{ boxShadow: "0 0 0 1px var(--border)" }}
            >
              <h3 className="font-bold mb-2">{a.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ways to partner */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-center mb-12">Ways to partner</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {models.map((m) => (
            <div
              key={m.title}
              className="rounded-xl p-6"
              style={{ boxShadow: "0 0 0 1px var(--border)" }}
            >
              <h3 className="font-bold mb-2">{m.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Commercials */}
      <section className="mb-24 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12">Commercials &amp; data</h2>
        <div className="space-y-6">
          {commercials.map((item) => (
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
        <h2 className="text-3xl font-bold mb-4">Let&apos;s scope an integration.</h2>
        <p className="text-[var(--muted)] max-w-xl mx-auto mb-8 leading-relaxed">
          Tell us what your users need and how you want to package it. We&apos;ll
          come back with the simplest way to embed it.
        </p>
        <a
          href={`mailto:${siteConfig.contactEmail}?subject=Partnership%20Inquiry`}
          className="inline-block bg-[var(--foreground)] text-[var(--background)] px-8 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Talk to partnerships
        </a>
      </section>
    </main>
  );
}
