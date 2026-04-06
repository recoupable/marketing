import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

const CAPABILITIES = [
  { name: "Research", desc: "Artist profiles, audience data, competitor analysis, chart tracking" },
  { name: "Content", desc: "Videos, images, captions, social posts — from artist context, not templates" },
  { name: "Catalog", desc: "Ingest, normalize, and manage music catalogs at scale" },
  { name: "Distribution", desc: "Post to socials, pitch to playlists, schedule releases" },
];

const CODE_LINES = [
  { dim: true, text: "# Install the CLI" },
  { dim: false, text: "npm install -g @recoupable/cli" },
  { dim: true, text: "" },
  { dim: true, text: "# Research an artist" },
  { dim: false, text: "recoup research \"Gatsby Grace\"" },
  { dim: false, text: "recoup research metrics \"Gatsby Grace\" --source spotify" },
  { dim: false, text: "recoup research similar \"Gatsby Grace\" --json" },
];

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-(--background)">
        {/* Dot grid background */}
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="pt-32 sm:pt-40 pb-20 sm:pb-28">
            {/* Badge */}
            <Link href={siteConfig.docsUrl} className="inline-flex items-center gap-1.5 rounded-full border border-(--border) px-4 py-1.5 mb-10 hover:border-(--foreground)/30 transition-colors group">
              <span className="inline-flex items-center gap-1.5 font-pixel text-[11px] text-(--muted-foreground) group-hover:text-(--foreground) transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                MCP-native &middot; REST API &middot; CLI
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 transition-opacity"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </span>
            </Link>

            {/* Headline */}
            <h1 className="mb-6">
              <span className="block font-pixel text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] text-(--foreground) leading-[1.05] tracking-tight">
                The music API
              </span>
              <span className="block font-pixel text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] text-(--foreground)/25 leading-[1.05] tracking-tight">
                for agents.
              </span>
            </h1>

            {/* Sub */}
            <p className="text-lg sm:text-xl text-(--muted-foreground) max-w-2xl mb-12 leading-relaxed">
              Research. Content. Catalog. Distribution. 40+ endpoints, MCP-native, CLI-ready.<br className="hidden sm:block" />
              Plug your agent in — or use ours. We run a label on the same tools to prove they work.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap mb-20">
              <Link
                href={siteConfig.appUrl}
                className="inline-flex items-center justify-center bg-(--foreground) text-(--background) px-7 py-3 rounded-full text-sm font-ui font-semibold hover:opacity-90 transition-opacity"
              >
                Get your API key
              </Link>
              <Link
                href={siteConfig.docsUrl}
                className="inline-flex items-center gap-2 text-sm font-ui font-medium text-(--muted-foreground) hover:text-(--foreground) transition-colors"
              >
                Read the docs
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </Link>
            </div>

            {/* Terminal code block */}
            <div className="max-w-2xl">
              <div className="rounded-xl border border-(--border) overflow-hidden shadow-lg">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-(--muted) border-b border-(--border)">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-(--border)" />
                    <span className="w-2.5 h-2.5 rounded-full bg-(--border)" />
                    <span className="w-2.5 h-2.5 rounded-full bg-(--border)" />
                  </div>
                  <span className="font-pixel text-[11px] text-(--muted-foreground) ml-2">terminal</span>
                </div>
                <div className="bg-(--background) p-5 overflow-x-auto">
                  <pre className="font-pixel text-[13px] leading-relaxed">
                    {CODE_LINES.map((line, i) => (
                      <div key={i} className={line.dim ? "text-(--muted-foreground)/50" : "text-(--foreground)"}>{line.text || "\u00A0"}</div>
                    ))}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Social proof bar */}
          <div className="border-t border-(--border) py-10">
            <p className="font-pixel text-[11px] text-(--muted-foreground) uppercase tracking-widest mb-6">Powering agents at</p>
            <div className="flex items-center gap-8 sm:gap-12 flex-wrap opacity-40">
              {[
                { name: "Atlantic", style: "font-bold text-base tracking-tight" },
                { name: "Rostrum", style: "font-bold text-xs uppercase tracking-widest" },
                { name: "300", style: "font-bold text-xl italic" },
                { name: "Warner", style: "font-bold text-xs uppercase tracking-wide" },
                { name: "Fat Beats", style: "font-bold text-sm italic" },
              ].map((label) => (
                <span key={label.name} className={`text-(--foreground) whitespace-nowrap font-ui ${label.style}`}>
                  {label.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CAPABILITIES ═══ */}
      <section className="py-20 border-t border-(--border)">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {CAPABILITIES.map((cap) => (
              <div key={cap.name} className="group">
                <h3 className="font-pixel text-sm text-(--foreground) mb-2">{cap.name}</h3>
                <p className="text-sm text-(--muted-foreground) leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="py-16 border-t border-(--border)">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "40+", label: "API endpoints" },
              { stat: "8", label: "labels and distributors" },
              { stat: "3", label: "entry points: API, MCP, CLI" },
              { stat: "<1m", label: "to first request" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-display italic text-[2.5rem] sm:text-[3rem] text-(--foreground) leading-none">{item.stat}</p>
                <p className="text-sm text-(--muted-foreground) mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-20 bg-(--muted)">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-section text-center mb-4">How it works</h2>
          <p className="text-center text-(--muted-foreground) text-lead max-w-lg mx-auto mb-16">
            Three ways in. One music toolkit. Any agent.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Connect via API, MCP, or CLI", desc: "One API key. Your agent connects through REST endpoints, an MCP server, or the command line — whichever fits your stack.", icon: "M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101" },
              { step: "02", title: "Give your agent music capabilities", desc: "Artist research, content creation, catalog management, distribution tools. 40+ endpoints that turn any agent into a music industry operator.", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
              { step: "03", title: "It runs. You ship.", desc: "Your agent researches artists, creates content, manages catalogs, and distributes — autonomously. Or use our agents if you don't have your own.", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-(--foreground) text-(--background) mx-auto mb-5 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} />{item.step === "02" && <circle cx="9" cy="7" r="4"/>}</svg>
                </div>
                <p className="font-pixel text-[10px] uppercase tracking-[0.2em] text-(--muted-foreground) mb-2">{item.step}</p>
                <h3 className="font-ui font-semibold text-lg text-(--foreground) mb-2">{item.title}</h3>
                <p className="text-sm text-(--muted-foreground) leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT MAKES THIS DIFFERENT ═══ */}
      <section className="py-20 border-t border-(--border)">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-section text-center mb-4">Why teams build on Recoupable</h2>
          <p className="text-center text-(--muted-foreground) text-lead max-w-lg mx-auto mb-16">
            Not another music AI app. The infrastructure layer that music agents run on.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Agent-native from day one", desc: "Built for AI agents first, not retrofitted. MCP server, REST API, and CLI — designed so any agent can plug in and operate." },
              { title: "Deep music context", desc: "Every endpoint understands releases, catalog, audience, and revenue. Not a generic API with a music skin." },
              { title: "We dogfood it", desc: "We run our own AI-native record label on these exact tools. If it works for us, it works for your agents." },
              { title: "Your stack, your agents", desc: "Use your own agent framework, your own models, your own orchestration. We provide the music capabilities — you decide how to use them." },
            ].map((item) => (
              <div key={item.title} className="border border-(--border) rounded-xl p-6 hover:border-(--foreground)/20 transition-colors">
                <h3 className="font-ui font-semibold text-lg text-(--foreground) mb-2">{item.title}</h3>
                <p className="text-sm text-(--muted-foreground) leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROOF ═══ */}
      <section className="py-20 bg-(--muted)">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Image src="/pfps/Sid_PFP_New.png" alt="Sidney Swift" width={64} height={64} className="rounded-full mx-auto mb-6" />
          <blockquote className="font-display italic text-section text-(--foreground) mb-4">
            &ldquo;We built these tools for agents. Then we ran an entire record label on them to prove they work.&rdquo;
          </blockquote>
          <p className="text-sm text-(--muted-foreground)">Sidney Swift, Founder — 22 videos in 2 hours, zero editing.</p>
        </div>
      </section>

      {/* ═══ CLOSING CTA ═══ */}
      <section className="py-24 border-t border-(--border)">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display italic text-section text-(--foreground) mb-4">
            Give your agent the music industry.
          </h2>
          <p className="text-lead text-(--muted-foreground) mb-10 max-w-md mx-auto">
            Free API key. First request in under a minute. No credit card required.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href={siteConfig.appUrl}
              className="inline-flex items-center justify-center bg-(--foreground) text-(--background) px-8 py-3.5 rounded-full text-base font-ui font-semibold hover:opacity-90 transition-opacity duration-200"
            >
              Get your API key
            </Link>
            <Link
              href={siteConfig.docsUrl}
              className="inline-flex items-center justify-center border border-(--border) px-8 py-3.5 rounded-full text-base font-ui font-medium text-(--foreground) hover:bg-(--muted) transition-colors duration-200"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
