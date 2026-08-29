import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeCopy } from "@/lib/copy/home";
import { pricingCopy } from "@/lib/copy/pricing";
import { PlanCard } from "@/components/pricing/PlanCard";

/**
 * The three plan cards on the homepage, above the closing pitch, sourced
 * from the same copy as /pricing so the two surfaces never disagree. Clicks
 * are tagged `surface: "home"`.
 */
export function PricingStrip() {
  const { eyebrow, title, compareLabel, compareHref } = homeCopy.pricingStrip;
  return (
    <section className="py-24 sm:py-32 bg-(--background) text-(--foreground)">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
        <div className="text-center mb-14">
          <p
            className="text-[10px] uppercase tracking-widest text-(--muted-foreground) mb-4"
            style={{ fontFamily: "var(--font-bitmap), monospace" }}
          >
            {eyebrow}
          </p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-tight max-w-2xl mx-auto">
            {title}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {pricingCopy.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} surface="home" />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={compareHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4 hover:opacity-80"
          >
            {compareLabel} <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
