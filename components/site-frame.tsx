"use client";
import { Suspense } from "react";
import { ReferralCapture } from "@/components/referral-capture";
import { BrowserAgentTools } from "@/components/agents/browser-agent-tools";
import { SkySiteHeader } from "@/components/sky/site-header";
import { SkySiteFooter } from "@/components/sky/site-footer";
import { ScrollMotion } from "@/components/motion/scroll-motion";
import "./sky/site.css";
import "./sky/navigation.css";
import "./motion/hover.css";
import "./sky/materials.css";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <ReferralCapture />
      </Suspense>
      <div className="sky-site">
        <SkySiteHeader />
        <main id="main">{children}</main>
        <SkySiteFooter />
      </div>
      <ScrollMotion />
      <BrowserAgentTools />
    </>
  );
}
