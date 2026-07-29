/**
 * Build a chat app URL that carries UTM attribution from marketing pages,
 * optionally flagging a completed checkout (the Stripe success redirect).
 */
import { siteConfig } from "@/lib/config";

export function buildChatUrl({
  checkout,
  campaign,
}: {
  checkout?: string;
  campaign: string;
}): string {
  const params = new URLSearchParams();
  if (checkout) params.set("checkout", checkout);
  params.set("utm_source", "marketing");
  params.set("utm_medium", "pricing");
  params.set("utm_campaign", campaign);
  return `${siteConfig.appUrl}/?${params.toString()}`;
}
