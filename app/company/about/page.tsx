import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { companyAboutCopy } from "@/lib/copy/company";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `About ${siteConfig.name} — Research Lab & Implementation Partner`,
  description: `${siteConfig.name} is a research lab and implementation partner for the agentic music industry — open-source skills, an API, and MCP integrations, put to work inside labels, catalogs, and platforms.`,
  path: "/company/about",
});

/**
 * Company: About — copy from lib/copy/company (single source for human + machine view).
 */
export default function AboutPage() {
  const c = companyAboutCopy;

  return (
    <main className="bg-(--background) text-(--foreground)">
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
          <h1 className="font-pixel text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-tight mb-8">
            {c.description}
          </h1>

          <p className="font-ui text-[clamp(1rem,1.4vw,1.1875rem)] leading-[1.6] text-(--foreground)/65 max-w-[640px] mb-12">
            {c.body}
          </p>

          <div
            className="rounded-2xl p-7 bg-(--background)"
            style={{ boxShadow: "0 0 0 1px var(--border)" }}
          >
            <p className="font-pixel text-[10px] uppercase tracking-[0.18em] text-(--foreground)/40 mb-4">
              Contact
            </p>
            <div className="flex flex-col gap-2 font-ui text-[15px]">
              <a
                href={`mailto:${c.contactEmail}`}
                className="text-(--foreground) hover:opacity-70 transition-opacity"
              >
                {c.contactEmail}
              </a>
              <a
                href={`mailto:${c.supportEmail}`}
                className="text-(--foreground) hover:opacity-70 transition-opacity"
              >
                {c.supportEmail}
              </a>
            </div>
            <p className="font-ui text-[12px] text-(--foreground)/40 mt-5">{c.legal}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
