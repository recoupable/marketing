"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check, Terminal } from "lucide-react";
import { pluginsCopy } from "@/lib/copy/plugins";
import type { Plugin } from "@/lib/copy/plugins";

/* ── reveal-on-scroll ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          io.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return {
    ref,
    cls: `transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] ${
      v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`,
  };
}

/* ── copy button ── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="ml-2 p-1 rounded hover:bg-white/10 transition-colors shrink-0"
      title="Copy install command"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-400" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-neutral-500" />
      )}
    </button>
  );
}

/* ── plugin card ── */
function PluginCard({ plugin, index }: { plugin: Plugin; index: number }) {
  const { ref, cls } = useReveal();
  return (
    <div
      ref={ref}
      className={cls}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="h-full rounded-xl bg-neutral-900/50 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] p-6 sm:p-8 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{plugin.name}</h3>
            <span className="text-xs text-neutral-500 mt-1 block">
              {plugin.skillCount} skill{plugin.skillCount !== 1 ? "s" : ""}
              {" · "}
              {plugin.audience}
            </span>
          </div>
          <a
            href={plugin.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            GitHub →
          </a>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-400 leading-relaxed mb-5">
          {plugin.description}
        </p>

        {/* Capabilities */}
        <ul className="space-y-1.5 mb-6 flex-1">
          {plugin.capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-2 text-sm">
              <Check className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />
              <span className="text-neutral-300">{cap}</span>
            </li>
          ))}
        </ul>

        {/* Install command */}
        <div className="flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2.5 font-mono text-xs text-neutral-400 overflow-hidden">
          <Terminal className="w-3.5 h-3.5 shrink-0 text-neutral-600" />
          <code className="truncate flex-1">{plugin.installCommand}</code>
          <CopyButton text={plugin.installCommand} />
        </div>
      </div>
    </div>
  );
}

/* ── step card ── */
function StepCard({
  step,
  index,
}: {
  step: (typeof pluginsCopy.steps)[number];
  index: number;
}) {
  const { ref, cls } = useReveal();
  return (
    <div
      ref={ref}
      className={cls}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="text-center">
        <div
          className="text-4xl font-bold text-white/10 mb-3"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          {step.number}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
        <p className="text-sm text-neutral-400 leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}

/* ── page ── */
export default function PluginsPage() {
  const c = pluginsCopy;

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Hero */}
      <header className="text-center mb-20">
        <div className="inline-block rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium tracking-wide uppercase mb-6 text-neutral-400">
          Plugin Marketplace
        </div>
        <h1
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] mb-4 text-white"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          {c.title}
        </h1>
        <p className="text-[15px] text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          {c.subtitle}
        </p>

        {/* Compatible-with badges */}
        <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
          {c.compatibleWith.map((tool) => (
            <span
              key={tool}
              className="rounded-full bg-white/5 px-3 py-1 text-xs text-neutral-400 border border-white/5"
            >
              {tool}
            </span>
          ))}
        </div>
      </header>

      {/* Plugin grid */}
      <section className="grid gap-6 sm:grid-cols-2 mb-24">
        {c.plugins.map((plugin, i) => (
          <PluginCard key={plugin.id} plugin={plugin} index={i} />
        ))}
      </section>

      {/* How it works */}
      <section className="mb-24">
        <h2
          className="text-2xl font-bold text-white text-center mb-12"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          How it works
        </h2>
        <div className="grid gap-12 sm:grid-cols-3">
          {c.steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <div className="rounded-xl bg-neutral-900/50 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] px-8 py-12">
          <h2
            className="text-2xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-bitmap), monospace" }}
          >
            Ready to plug in?
          </h2>
          <p className="text-sm text-neutral-400 mb-8 max-w-md mx-auto">
            Get your API key, install a plugin, and let your AI agent run your
            music business.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://developers.recoupable.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-md text-sm font-medium hover:bg-neutral-200 transition-colors"
            >
              Get API Key <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 border border-white/10 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-white/5 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
