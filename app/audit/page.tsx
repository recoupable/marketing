import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { auditCopy } from "@/lib/copy/audit";
import { AuditForm } from "@/components/audit/AuditForm";

export const metadata: Metadata = buildPageMetadata({
  title: "Free AI Readiness Audit for Music Companies | Recoup",
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
        <h1
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] mb-4"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              10+
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Platinum records
            </p>
          </div>
          <div>
            <div
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              Grammy
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Award-winning
            </p>
          </div>
          <div>
            <div
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              US Patent
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              AI innovation
            </p>
          </div>
          <div>
            <div
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              $2.5M
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              D2F campaign
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
