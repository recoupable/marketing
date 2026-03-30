import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { developersCopy } from "@/lib/copy/developers";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Developers | Recoupable",
  description: developersCopy.description,
  path: "/developers",
});

const sectionIcons: Record<string, string> = {
  api: "{ }",
  cli: ">_",
  mcp: "⇄",
  skills: "◈",
  "multi-model": "◉",
  sandboxes: "▢",
  docs: "📖",
};

export default function DevelopersPage() {
  const c = developersCopy;

  return (
    <div className="bg-[#0a0f14] text-[#e4e8ec] min-h-screen">
      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-sm font-mono tracking-widest uppercase text-(--brand) mb-4">
          Developer Platform
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          {c.title}
        </h1>
        <p className="text-xl md:text-2xl text-[#8b95a1] max-w-2xl mx-auto leading-relaxed">
          {c.description}
        </p>
      </header>

      {/* Code snippet */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <div className="rounded-xl border border-[#1e2a36] bg-[#0d1520] overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1e2a36]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-4 text-xs text-[#5a6673] font-mono">
              terminal
            </span>
          </div>
          <pre className="p-6 text-sm md:text-base font-mono leading-relaxed overflow-x-auto">
            <code>
              <span className="text-[#5a6673]">$</span>{" "}
              <span className="text-[#7ec8e3]">npm install</span>{" "}
              <span className="text-[#8b95a1]">-g</span>{" "}
              <span className="text-white">recoup</span>
              {"\n"}
              <span className="text-[#5a6673]">$</span>{" "}
              <span className="text-[#7ec8e3]">recoup research</span>{" "}
              <span className="text-[#a8d8a8]">&quot;Drake&quot;</span>{" "}
              <span className="text-[#8b95a1]">--platform</span>{" "}
              <span className="text-white">spotify</span>
            </code>
          </pre>
        </div>
      </section>

      {/* Sections grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="rounded-xl border border-[#1e2a36] bg-[#0d1520] p-6 scroll-mt-24 hover:border-(--brand)/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-(--brand)/10 text-(--brand) font-mono text-sm font-bold shrink-0">
                  {sectionIcons[section.id] ?? "•"}
                </span>
                <h2 className="text-lg font-semibold text-white">
                  {section.title}
                </h2>
              </div>
              <p className="text-sm text-[#8b95a1] leading-relaxed mb-4">
                {section.description}
              </p>
              {"linkLabel" in section &&
                section.linkLabel &&
                section.linkHref && (
                  <Link
                    href={section.linkHref}
                    className="text-sm text-(--brand) hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {section.linkLabel} →
                  </Link>
                )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24 text-center">
        <Link
          href={c.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-(--brand) text-white px-8 py-4 rounded-lg text-base font-semibold hover:brightness-110 transition-all shadow-lg shadow-(--brand)/20"
        >
          {c.ctaLabel} →
        </Link>
      </section>
    </div>
  );
}
