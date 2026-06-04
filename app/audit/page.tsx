import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { auditCopy } from "@/lib/copy/audit";
import { AuditForm } from "@/components/audit/AuditForm";

export const metadata: Metadata = buildPageMetadata({
  title: "Free AI Readiness Audit for Music Companies",
  description: auditCopy.description,
  path: "/audit",
});

export default function AuditPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      {/* Hero */}
      <header className="text-center mb-16">
        <div className="inline-block rounded-full border border-[var(--border)] px-4 py-1.5 text-xs font-medium tracking-wide uppercase mb-6">
          Free — Takes 2 Minutes
        </div>
        <h1 className="font-pixel text-[clamp(2rem,5vw,3.5rem)] tracking-tight leading-[1.1] mb-4">
          {auditCopy.headline}
        </h1>
        <p className="text-[15px] text-[var(--muted-foreground)] max-w-xl mx-auto">
          {auditCopy.subheadline}
        </p>
      </header>

      {/* Audit Form */}
      <AuditForm />

      {/* Trust signals */}
      <div className="mt-20 pt-12 border-t border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="font-pixel text-xl mb-1">
              You own it
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Agents and skills live in your stack
            </p>
          </div>
          <div>
            <div className="font-pixel text-xl mb-1">
              Scoped access
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Data boundaries are set up front
            </p>
          </div>
          <div>
            <div className="font-pixel text-xl mb-1">
              Proven on a roster
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              The same tools run our own label
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
