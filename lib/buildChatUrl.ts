/**
 * Build a chat app URL that carries purchase intent and UTM attribution
 * from marketing pages (the chat app's intent param handler consumes it).
 */
import { siteConfig } from "@/lib/config";

export function buildChatUrl({
  intent,
  campaign,
}: {
  intent?: string;
  campaign: string;
}): string {
  const params = new URLSearchParams();
  if (intent) params.set("intent", intent);
  params.set("utm_source", "marketing");
  params.set("utm_medium", "pricing");
  params.set("utm_campaign", campaign);
  return `${siteConfig.appUrl}/?${params.toString()}`;
}
