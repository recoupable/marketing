"use client";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isCloudPreview = pathname === "/preview/sky-scroll";
  const isHome = pathname === "/" || isCloudPreview;
  const content = isHome ? <main id="main">{children}</main>
      : <div className="sky-site"><main id="main">{children}</main><SkySiteFooter /></div>;
  return <><Suspense fallback={null}><ReferralCapture /></Suspense>
    <div className={`sky-site sky-header-shell${isCloudPreview ? " sky-header-overlay" : ""}`}>
      <SkySiteHeader tone={isCloudPreview ? "sky" : "paper"} />
    </div>
    {content}<ScrollMotion /><BrowserAgentTools /></>;
}
