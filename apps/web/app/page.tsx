import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { HeroChatInput } from "@/components/home/HeroChatInput";

const AGENTS = [
  { cat: "Create", color: "#e8f5e9", name: "5 Viral Content Ideas", desc: "Analyzes current viral trends and gives you 5 authentic content ideas with high viral potential and..." },
  { cat: "Connect", color: "#e3f2fd", name: "Add Your Spin to Trends", desc: "Shows you how to authentically participate in current trending topics with unique angle strategies..." },
  { cat: "Connect", color: "#e3f2fd", name: "Artist Cross-Promotion Finder", desc: "Finds compatible artists for mutual audience growth with fanbase overlap analysis and..." },
  { cat: "Report", color: "#fff3e0", name: "Brand Audit", desc: "Comprehensive multi-platform artist brand audit across all channels" },
  { cat: "Plan", color: "#f3e5f5", name: "Brand Redesign with Visual Mockups", desc: "Analyzes your current brand perception and creates visual mockups of your refreshed identity with..." },
  { cat: "Connect", color: "#e3f2fd", name: "Comment Response Priority", desc: "Tells you exactly which comments across all platforms to respond to first for maximum..." },
];

const AVATARS = ["#e8b4b8", "#b4c7e8", "#b8e8b4", "#e8d4b4", "#d4b4e8"];

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/LighmodeSkyBG.png" alt="" fill priority className="object-cover object-top pointer-events-none select-none" aria-hidden="true" />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "256px 256px" }} aria-hidden="true" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col items-center pt-24 sm:pt-28 px-4">
            <Link href="/platform" className="inline-flex items-center gap-1 rounded-full bg-[#1a1a1a] p-1 pr-3 mb-8 hover:bg-black transition-colors">
              <span className="inline-flex items-center gap-1 bg-white text-[#1a1a1a] text-xs font-ui font-medium px-3 py-1 rounded-full">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="2.5"/><circle cx="16" cy="8" r="2.5"/><circle cx="8" cy="16" r="2.5"/><circle cx="16" cy="16" r="2.5"/><path d="M10.5 8h3M8 10.5v3M16 10.5v3M10.5 16h3"/></svg>
                Artist Intelligence
              </span>
              <span className="inline-flex items-center gap-1 text-white text-xs font-ui font-medium">
                See how it works
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </span>
            </Link>

            <h1 className="text-center mb-4">
              <span className="block font-ui font-semibold text-[2rem] sm:text-[2.5rem] md:text-[2.75rem] text-[#1a1a1a] leading-tight tracking-tight">
                Meet Your New AI
              </span>
              <span className="block font-display italic text-[3.5rem] sm:text-[5rem] md:text-[6rem] text-[#1a1a1a] leading-[0.9] mt-2">
                Record Label
              </span>
            </h1>

            <p className="text-center text-[#1a1a1a]/60 text-base sm:text-lg max-w-xl mx-auto mb-10">
              Spend more time doing what you love. Let agents handle the rest.
            </p>

            <div className="chat-glow-ring rounded-2xl w-full max-w-xl">
              <HeroChatInput />
            </div>

            {/* Label logos */}
            <p className="text-xs text-[#1a1a1a]/40 mt-14 mb-6 font-ui">We&apos;ve worked with the best in the business</p>
            <div className="flex items-center gap-6 sm:gap-10 opacity-50 grayscale">
              {[
                { name: "Atlantic", style: "font-bold text-base tracking-tight" },
                { name: "Rostrum Records", style: "font-bold text-xs uppercase tracking-widest" },
                { name: "300", style: "font-bold text-lg italic" },
                { name: "Warner Records", style: "font-bold text-xs uppercase tracking-wide" },
                { name: "Fat Beats", style: "font-bold text-sm italic" },
                { name: "Warner Chappell", style: "font-semibold text-xs uppercase tracking-wide" },
              ].map((label) => (
                <span key={label.name} className={`text-[#1a1a1a] whitespace-nowrap font-ui ${label.style}`}>
                  {label.name}
                </span>
              ))}
            </div>
          </div>

          <div
            className="w-full mt-[-1rem] sm:mt-[-2rem]"
            style={{ maskImage: "linear-gradient(to bottom, transparent 2%, black 18%, black 85%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 2%, black 18%, black 85%, transparent 100%)" }}
          >
            <Image src="/images/Recoupable_Illustration_1.png" alt="A person and their AI agent sitting together on a hillside, looking out at a futuristic city" width={2400} height={1200} priority className="w-full h-auto block" />
          </div>

          {/* Browser mockup */}
          <div className="max-w-4xl mx-auto px-4 mt-[-6rem] sm:mt-[-8rem] md:mt-[-10rem] relative z-10 pb-20">
            <div className="rounded-xl border border-[#333] shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2a] border-b border-[#333]">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-[#333] rounded-md px-3 py-1 text-xs text-[#888] text-center border border-[#444]">recoupable.com</div>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
              </div>

              <div className="bg-white flex">
                {/* Sidebar */}
                <div className="w-44 sm:w-48 border-r border-[#e5e5e5] p-4 hidden sm:block shrink-0">
                  <div className="flex items-center gap-2 mb-5">
                    <Image src="/brand/icon-lightmode.svg" alt="" width={20} height={20} className="h-5 w-5" />
                    <span className="font-ui font-bold text-sm text-[#1a1a1a]">Recoupable</span>
                  </div>
                  <button className="w-full bg-[#1a1a1a] text-white text-xs font-ui font-semibold py-2 px-3 rounded-lg mb-5">New Chat</button>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2 text-[#1a1a1a] font-medium bg-[#f5f5f5] rounded-lg px-2 py-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      Agents
                    </div>
                    <div className="flex items-center gap-2 text-[#1a1a1a]/60 px-2 py-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-5"/><path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>
                      Tasks
                    </div>
                    <div className="flex items-center gap-2 text-[#1a1a1a]/60 px-2 py-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                      Files
                    </div>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#e5e5e5]">
                    <p className="text-[10px] text-[#1a1a1a]/30 uppercase tracking-wide mb-2">Recent Chats</p>
                    <div className="space-y-1.5 text-xs text-[#1a1a1a]/50">
                      <p className="truncate">Cat Image Creation</p>
                      <p className="truncate">Ghibli-Style Cover</p>
                    </div>
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 p-5 sm:p-6 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-ui font-bold text-lg text-[#1a1a1a]">Agents</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#1a1a1a]/40">Public</span>
                      <div className="w-8 h-4 bg-[#e5e5e5] rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm" /></div>
                      <span className="bg-[#1a1a1a] text-white text-xs font-ui font-semibold py-1.5 px-3 rounded-lg inline-flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Create
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#1a1a1a]/50 mb-4">Unlock the potential of your roster with intelligent, task-focused agents.</p>
                  <div className="flex gap-2 flex-wrap mb-5">
                    {["Recommended", "Create", "Connect", "Report", "Plan", "Research"].map((tag, i) => (
                      <span key={tag} className={`text-xs px-3 py-1 rounded-full font-medium ${i === 0 ? "bg-[#1a1a1a] text-white" : "text-[#1a1a1a]/60 border border-[#e5e5e5]"}`}>{tag}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {AGENTS.map((agent, i) => (
                      <div key={agent.name} className={`border border-[#e5e5e5] rounded-lg p-3 ${i === 0 ? "shadow-md border-[#d4d4d4]" : ""}`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: agent.color === "#e8f5e9" ? "#4caf50" : agent.color === "#e3f2fd" ? "#2196f3" : agent.color === "#fff3e0" ? "#ff9800" : "#9c27b0" }} />
                          <span className="text-[10px] text-[#1a1a1a]/40 uppercase tracking-wide">{agent.cat}</span>
                        </div>
                        <p className="text-xs font-ui font-semibold text-[#1a1a1a] mb-1 leading-snug">{agent.name}</p>
                        <p className="text-[10px] text-[#1a1a1a]/40 leading-tight line-clamp-2">{agent.desc}</p>
                        <div className="flex gap-2 mt-2">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d4d4d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d4d4d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Avatars */}
                <div className="w-12 border-l border-[#e5e5e5] py-4 hidden sm:flex flex-col items-center gap-3 shrink-0">
                  {AVATARS.map((bg, i) => (
                    <div key={i} className="w-8 h-8 rounded-full" style={{ background: `linear-gradient(135deg, ${bg}, ${bg}88)` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="py-16 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "22", label: "videos created in 2 hours" },
              { stat: "40+", label: "AI agents ready to deploy" },
              { stat: "10x", label: "faster than manual marketing" },
              { stat: "0", label: "team members needed" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-display italic text-[2.5rem] sm:text-[3rem] text-[var(--foreground)] leading-none">{item.stat}</p>
                <p className="text-sm text-[var(--muted-foreground)] mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-section text-center mb-4">How it works</h2>
          <p className="text-center text-[var(--muted-foreground)] text-lead max-w-lg mx-auto mb-16">
            Three steps. No team required. Your agents handle the rest.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Connect your music", desc: "Link your catalog, socials, and distribution. One pipeline. All your data flows in automatically.", icon: "M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101" },
              { step: "02", title: "Deploy agents", desc: "Choose from 40+ agents or create your own. Each one handles a specific task — content, research, growth, or operations.", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
              { step: "03", title: "They run. You create.", desc: "Agents execute autonomously. You get results — videos, strategies, audience insights — without lifting a finger.", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-[var(--foreground)] text-[var(--background)] mx-auto mb-5 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} />{item.step === "02" && <circle cx="9" cy="7" r="4"/>}</svg>
                </div>
                <p className="font-pixel text-[10px] uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-2">{item.step}</p>
                <h3 className="font-ui font-semibold text-lg text-[var(--foreground)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT MAKES THIS DIFFERENT ═══ */}
      <section className="py-20 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-section text-center mb-4">Not a chatbot. Not a tool.</h2>
          <p className="text-center text-[var(--muted-foreground)] text-lead max-w-lg mx-auto mb-16">
            Recoupable is infrastructure that runs your music business.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Agents that execute", desc: "Not suggestions. Not templates. Agents that do the work — create content, find fans, run campaigns, analyze data." },
              { title: "Built for music", desc: "Every agent understands releases, catalog, audience, and revenue. Not a generic AI tool forced into a music workflow." },
              { title: "One system, every entry point", desc: "Web app. Slack. Email. CLI. API. Same agents, same data, same results — wherever you work." },
              { title: "Your data stays yours", desc: "Your catalog, your fans, your strategy. Agents work inside your context, not a shared model." },
            ].map((item) => (
              <div key={item.title} className="border border-[var(--border)] rounded-xl p-6 hover:border-[var(--foreground)]/20 transition-colors">
                <h3 className="font-ui font-semibold text-lg text-[var(--foreground)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROOF ═══ */}
      <section className="py-20 bg-[var(--muted)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Image src="/pfps/Sid_PFP_New.png" alt="Sidney Swift" width={64} height={64} className="rounded-full mx-auto mb-6" />
          <blockquote className="font-display italic text-section text-[var(--foreground)] mb-4">
            &ldquo;10pm: sit down to make content. Midnight: 22 finished videos. Captioned. Formatted. Queued.&rdquo;
          </blockquote>
          <p className="text-sm text-[var(--muted-foreground)]">Sidney Swift, Founder — we run our label on it.</p>
        </div>
      </section>

      {/* ═══ CLOSING CTA ═══ */}
      <section className="py-24 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display italic text-section text-[var(--foreground)] mb-4">
            Ready to run your label with agents?
          </h2>
          <p className="text-lead text-[var(--muted-foreground)] mb-10 max-w-md mx-auto">
            Start for free. No credit card. Deploy your first agent in under a minute.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href={siteConfig.appUrl}
              className="inline-flex items-center justify-center bg-[var(--foreground)] text-[var(--background)] px-8 py-3.5 rounded-full text-base font-ui font-semibold hover:opacity-90 transition-opacity duration-200"
            >
              Get started free
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center justify-center border border-[var(--border)] px-8 py-3.5 rounded-full text-base font-ui font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors duration-200"
            >
              See the platform
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
