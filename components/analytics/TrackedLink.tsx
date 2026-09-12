"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";

type TrackedLinkProps = {
  href: string;
  /** What the visitor chose, e.g. `free_audit` or `open_platform`. */
  cta: string;
  /** Where on the site the link sits, e.g. `header` or `pricing`. */
  placement: string;
  plan?: string;
  className?: string;
  children: ReactNode;
};

/** A link that reports `cta_clicked` and nothing about the visitor. */
export function TrackedLink({ href, cta, placement, plan, className, children }: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent("cta_clicked", { cta, placement, ...(plan ? { plan } : {}) })}
    >
      {children}
    </Link>
  );
}
