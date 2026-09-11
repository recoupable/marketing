import { createInquiryHandler } from "@/lib/inquiries";

import { siteConfig } from "@/lib/config";

export const runtime = "nodejs";
export const maxDuration = 30;

export const POST = createInquiryHandler({
  getApiUrl: () => siteConfig.apiUrl,
});
