import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { companyVisionCopy } from "@/lib/copy/company";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Vision — The Layer the Agentic Music Industry Runs On",
  description: `${siteConfig.name} builds the open music layer for AI agents and helps labels, catalogs, and platforms put it to work inside real teams.`,
  path: "/company/vision",
});

/**
 * Company: Vision — copy from lib/copy/company (single source for human + machine view).
 */
export default function VisionPage() {
  const c = companyVisionCopy;

  return (
    <div className="bg-(--background) text-(--foreground)">
      <section className="pt-36 sm:pt-44 pb-24">
        <div className="max-w-[760px] mx-auto px-6 sm:px-10">
          <Link
            href="/company"
            className="inline-flex items-center gap-1.5 font-ui text-[13px] text-(--foreground)/45 hover:text-(--foreground) transition-colors mb-10"
          >
            <ArrowLeft size={14} /> Company
          </Link>

          <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-6">
            {c.title}
          </p>
          <h1 className="font-pixel text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-tight mb-10">
            {c.anchor}
          </h1>

          <div className="space-y-6 max-w-[640px]">
            {c.paragraphs.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="font-ui text-[clamp(1rem,1.4vw,1.1875rem)] leading-[1.6] text-(--foreground)/65"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link
              href="/consulting"
              className="font-ui font-semibold text-[14px] text-(--foreground) inline-flex items-center gap-1.5 group"
            >
              Work with us <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/company/recoup-records"
              className="font-ui font-semibold text-[14px] text-(--foreground)/60 hover:text-(--foreground) transition-colors"
            >
              See how we dogfood it
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
