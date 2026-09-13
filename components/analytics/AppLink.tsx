"use client";

import type { ReactNode } from "react";
import { appLink } from "@/lib/appLink";
import { useReferralAttribution } from "@/lib/attribution/useReferralAttribution";
import { TrackedLink } from "./TrackedLink";

type AppLinkProps = {
  placement: string;
  /** A path inside the app, e.g. `/catalogs/<id>`; the root when omitted. */
  path?: string;
  cta?: string;
  plan?: string;
  className?: string;
  children: ReactNode;
};

/** Opens the app with marketing UTM tags, the visitor's own campaign winning, and reports the click. */
export function AppLink({ placement, path, cta = "open_platform", plan, className, children }: AppLinkProps) {
  const attribution = useReferralAttribution();
  return (
    <TrackedLink href={appLink(placement, { path, attribution })} cta={cta} placement={placement} plan={plan} className={className}>
      {children}
    </TrackedLink>
  );
}
