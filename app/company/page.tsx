import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

const COMPANY_LINKS = [
  {
    label: "Vision",
    href: "/company/vision",
    blurb: "Where the agentic music industry is going, and the layer we're building for it.",
  },
  {
    label: `${siteConfig.name} Records`,
    href: "/company/recoup-records",
    blurb: "Our own label and artist — proof the tools carry weight on a real roster.",
  },
  {
    label: "About",
    href: "/company/about",
    blurb: "Who we are, how we work, and how to reach us.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: `Company — Research, Records & Music AI Team at ${siteConfig.name}`,
  description: `Meet ${siteConfig.name} — a research lab and implementation partner for the agentic music industry. Our vision, our own label, and who we are.`,
  path: "/company",
});

export default function CompanyPage() {
  return (
    <div className="bg-(--background) text-(--foreground)">
      <section className="pt-36 sm:pt-44 pb-24">
        <div className="max-w-[760px] mx-auto px-6 sm:px-10">
          <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-6">
            Company
          </p>
          <h1 className="font-pixel text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-tight mb-6">
            A research lab and implementation partner.
          </h1>
          <p className="font-ui text-[clamp(1rem,1.4vw,1.1875rem)] leading-[1.6] text-(--foreground)/60 max-w-[600px] mb-12">
            Recoup researches what AI can do for music, builds the open tools to
            do it, and implements them inside labels, catalogs, and platforms.
          </p>

          <div className="grid gap-4">
            {COMPANY_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group block rounded-2xl p-7 bg-(--background) transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-ui font-bold text-[18px]">{item.label}</span>
                  <ArrowUpRight
                    size={18}
                    className="text-(--foreground)/40 group-hover:text-(--foreground) transition-colors"
                  />
                </div>
                <p className="font-ui text-[14px] text-(--foreground)/55 leading-[1.5] mt-1.5">
                  {item.blurb}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
