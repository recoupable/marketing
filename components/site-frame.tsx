"use client";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { ReferralCapture } from "@/components/referral-capture";
import { BrowserAgentTools } from "@/components/agents/browser-agent-tools";
import { SkySiteHeader } from "@/components/sky/site-header";
import { SkySiteFooter } from "@/components/sky/site-footer";
import { ScrollMotion } from "@/components/motion/scroll-motion";
import { AudienceMode } from "@/components/agents/audience-mode";
import "./sky/site.css";
import "./sky/navigation.css";
import "./sky/navigation-mobile.css";
import "./sky/navigation-mobile-menu.css";
import "./sky/navigation-panels.css";
import "./motion/hover.css";
import "./sky/materials.css";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The Brand Studio has its own navigation and main landmark.
  if (pathname === "/brand" || pathname.startsWith("/brand/"))
    return <>{children}</>;
  const isFocusedLanding = pathname === "/workflow-plan" || pathname === "/ask";
  return (
    <>
      <Suspense fallback={null}>
        <ReferralCapture />
      </Suspense>
      <div className="sky-site">
        {isFocusedLanding ? (
          <main id="main">{children}</main>
        ) : (
          <AudienceMode
            key={pathname}
            pathname={pathname}
            header={(toggle) => <SkySiteHeader audienceToggle={toggle} />}
          >
            <main id="main">{children}</main>
            <SkySiteFooter />
          </AudienceMode>
        )}
      </div>
      <ScrollMotion />
      <BrowserAgentTools />
    </>
  );
}
