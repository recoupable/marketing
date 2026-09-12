"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureReferralAttribution } from "@/lib/referral-attribution";

export function ReferralCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => { captureReferralAttribution(searchParams.toString()); }, [pathname, searchParams]);
  return null;
}
