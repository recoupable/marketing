"use client";

import { useEffect } from "react";
import {
  getFirstTouchAttribution,
  readAttributionCookie,
  serializeAttributionCookie,
} from "@/lib/attribution";

export function AttributionCapture() {
  useEffect(() => {
    if (readAttributionCookie(document.cookie)) return;

    const attribution = getFirstTouchAttribution(
      window.location.href,
      new Date().toISOString(),
      document.referrer,
      document.cookie,
    );
    if (!attribution) return;

    document.cookie = serializeAttributionCookie(
      attribution,
      window.location.protocol === "https:",
    );
  }, []);

  return null;
}
