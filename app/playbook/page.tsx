import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { playbookCopy } from "@/lib/copy/playbook";
import { PlaybookForm } from "@/components/lead-capture/PlaybookForm";

export const metadata: Metadata = buildPageMetadata({
  title: "Free AI Music Marketing Playbook | Recoupable",
  description:
    "42 pages of real AI workflows, prompts, and automations for artists, managers, and labels. Written by a Grammy-winning producer. Download free.",
  path: "/playbook",
});

export default function PlaybookPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      {/* Hero */}
      <header className="text-center mb-16">
        <div className="inline-block rounded-full border border-[var(--border)] px-4 py-1.5 text-xs font-medium tracking-wide uppercase mb-6">
          Free Download — 42 Pages
        </div>
        <h1
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] mb-4"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          {playbookCopy.headline}
        </h1>
        <p className="text-[15px] text-[var(--muted-foreground)] max-w-xl mx-auto mb-2">
          {playbookCopy.subheadline}
        </p>
        <p className="text-xs text-[var(--muted-foreground)]/60 italic">
          {playbookCopy.credibility}
        </p>
      </header>

      {/* Email capture — above the fold */}
      <section className="mb-20">
        <PlaybookForm />
      </section>

      {/* What's inside */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-center mb-10">
          What&apos;s Inside
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {playbookCopy.chapters.map((ch) => (
            <div
              key={ch.number}
              className="rounded-xl border border-[var(--border)] p-6 hover:border-[var(--foreground)]/20 transition-colors"
            >
              <div className="text-xs font-mono text-[var(--muted-foreground)] mb-2">
                Chapter {ch.number}
              </div>
              <h3 className="font-semibold text-sm mb-1">{ch.title}</h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                {ch.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-center mb-8">
          Who This Is For
        </h2>
        <ul className="max-w-md mx-auto space-y-3">
          {playbookCopy.whoItsFor.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-[var(--muted-foreground)]"
            >
              <span className="text-green-500 mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Social proof */}
      <section className="text-center mb-20">
        <div
          className="text-4xl font-bold mb-1"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          {playbookCopy.socialProof.stat}
        </div>
        <p className="text-sm text-[var(--muted-foreground)]">
          {playbookCopy.socialProof.label}
        </p>
      </section>

      {/* Bottom CTA */}
      <section className="text-center rounded-2xl border border-[var(--border)] p-10 mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-3">
          {playbookCopy.bottomCta.headline}
        </h2>
        <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto mb-8">
          {playbookCopy.bottomCta.subheadline}
        </p>
        <PlaybookForm />
      </section>

      {/* Advisory upsell */}
      <div className="text-center text-xs text-[var(--muted-foreground)]">
        Want hands-on help implementing these strategies?{" "}
        <a
          href="/advisory"
          className="underline hover:text-[var(--foreground)] transition-colors"
        >
          Book an AI strategy session with Sidney →
        </a>
      </div>
    </div>
  );
}
