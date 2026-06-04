import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Partners — Embed Music Intelligence in Your Product",
  description:
    "Embed music agents in your product for distributors, creator tools, and platforms. Usage-based pricing, MCP-native, and you keep the customer.",
  path: "/partners",
});

const CONTACT = `mailto:${siteConfig.contactEmail}?subject=Partnership%20Inquiry`;

/* ── Data ──────────────────────────────────────────────────────────── */

const audiences = [
  {
    k: "Distribution",
    title: "Distributors & DSPs",
    body: "Give your artists and labels AI workflows — release planning, analytics, content — without building a model team.",
  },
  {
    k: "Creator tools",
    title: "Creator & artist tools",
    body: "Add music-aware agents to the product your users already log into, instead of sending them somewhere else.",
  },
  {
    k: "Catalog",
    title: "Catalog & rights platforms",
    body: "Surface diligence, royalty, and audience intelligence on top of the data you already hold.",
  },
] as const;

const models = [
  {
    k: "Embed",
    title: "Embed / OEM",
    body: "Run Recoup agents behind your own UI and brand. Your users never leave your product; you keep the customer relationship and the data boundary.",
  },
  {
    k: "API & MCP",
    title: "API & MCP",
    body: "Call the Recoup API directly, or connect over MCP so any agent — yours or your customers' — can use our music tools with no custom glue code.",
  },
  {
    k: "Co-built",
    title: "Co-built agents",
    body: "We build the workflows with your team for your roster and stack, then hand them off into a repo your organization controls.",
  },
] as const;

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
    q: "How do you handle our or our users' data?",
    a: "We scope data access and reuse terms before integration work starts. Your data stays inside the agreed boundary, and private partnership work is not folded into public skills without approval.",
  },
  {
    q: "What about agent discovery?",
    a: "Because the skills are open and MCP-native, agents can discover and call your integration the way they discover any tool — so you show up where your customers' agents already work, not just inside one app.",
  },
] as const;

/* ── Page ───────────────────────────────────────────────────────────── */

export default function PartnersPage() {
  return (
    <div className="bg-(--background) text-(--foreground)">
      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-20 sm:pb-24">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10 text-center">
          <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-6">
            Partners
          </p>
          <h1 className="font-pixel text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.03] tracking-tight mb-6">
            Put music intelligence<br className="hidden sm:block" /> inside your product.
          </h1>
          <p className="text-(--foreground)/60 text-[clamp(1.0625rem,1.5vw,1.25rem)] font-ui leading-[1.55] max-w-[640px] mx-auto mb-9">
            Recoup is built to plug in. If you run a distributor, a creator tool,
            or a catalog platform, you can offer your users music-aware agents
            without standing up a model team — and keep your brand, your
            customer, and your data boundary.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={CONTACT}
              className="cta-pulse font-ui font-semibold bg-(--foreground) text-(--background) px-9 py-4 rounded-full text-[15px] hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
            >
              Talk to partnerships
            </a>
            <a
              href={siteConfig.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui font-medium text-[15px] text-(--foreground)/55 hover:text-(--foreground) transition-colors flex items-center gap-1.5"
            >
              Read the API docs <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Who partners with us */}
      <section className="py-20 sm:py-28 border-t border-(--border)">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">
            Who partners with us
          </p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05] mb-14 max-w-[640px]">
            Built for teams with users.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="flex flex-col rounded-2xl bg-(--background) p-7"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <p className="font-pixel text-[10px] text-(--foreground)/35 uppercase tracking-[0.18em] mb-3">
                  {a.k}
                </p>
                <h3 className="font-ui font-bold text-[18px] text-(--foreground) mb-2 leading-snug">
                  {a.title}
                </h3>
                <p className="text-[14px] text-(--foreground)/55 leading-relaxed">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to partner */}
      <section className="py-20 sm:py-28 bg-(--muted)/40">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">
            Ways to partner
          </p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05] mb-14 max-w-[640px]">
            Three ways to plug in.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {models.map((m) => (
              <div
                key={m.title}
                className="flex flex-col rounded-2xl bg-(--background) p-7"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <p className="font-pixel text-[10px] text-(--foreground)/35 uppercase tracking-[0.18em] mb-3">
                  {m.k}
                </p>
                <h3 className="font-ui font-bold text-[18px] text-(--foreground) mb-2 leading-snug">
                  {m.title}
                </h3>
                <p className="text-[14px] text-(--foreground)/55 leading-relaxed">
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercials & data */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[720px] mx-auto px-6 sm:px-10">
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4 text-center">
            Commercials &amp; data
          </p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3rem)] tracking-tight leading-[1.05] mb-12 text-center">
            How a deal comes together.
          </h2>
          <div className="space-y-2">
            {commercials.map((item) => (
              <details key={item.q} className="group border-b border-(--border) py-4">
                <summary className="cursor-pointer font-ui font-semibold text-[15px] flex items-center justify-between gap-4 list-none">
                  {item.q}
                  <span className="shrink-0 text-(--foreground)/40 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14px] text-(--foreground)/55 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative py-28 sm:py-36 overflow-hidden dark-section-cta">
        <div className="max-w-[760px] mx-auto px-6 text-center relative z-10">
          <h2 className="font-pixel text-[clamp(2.25rem,6vw,4rem)] tracking-tight leading-[0.98] text-white mb-9">
            Let&apos;s scope<br />an integration.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={CONTACT}
              className="cta-pulse font-ui font-semibold bg-white text-[#0a0a0a] px-9 py-4 rounded-full text-[15px] hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5"
            >
              Talk to partnerships
            </a>
            <a
              href={siteConfig.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui font-medium text-sm text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5"
            >
              Read the API docs <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
