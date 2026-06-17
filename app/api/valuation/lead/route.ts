import { NextResponse } from "next/server";
import { z } from "zod";
import { createAttioContact } from "@/lib/attio";
import { sendTelegramMessage } from "@/lib/telegram";

const bandSchema = z.object({ low: z.number(), central: z.number(), high: z.number() });

const leadSchema = z.object({
  email: z.string().email("a valid email is required"),
  artistName: z.string().min(1, "artistName is required"),
  valueBand: bandSchema,
});

const usd = (n: number) =>
  `$${Math.round(n).toLocaleString("en-US")}`;

/**
 * POST /api/valuation/lead — capture a valuation lead on run success (chat#1798).
 *
 * Persists the contact to Attio (system of record) and pings the internal
 * Telegram channel with the email + looked-up artist + value band. Fires on
 * every successful valuation; the Telegram send is best-effort and never fails
 * the request.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { email, artistName, valueBand } = parsed.data;

  // Attio is the system of record. Don't fail the (fire-and-forget) request on
  // an Attio error — the user's valuation already succeeded — but log it so a
  // dropped lead is observable rather than silently lost.
  const attio = await createAttioContact({ email, source: "catalog-valuation" });
  if (!attio.success) {
    console.error("[valuation/lead] Attio upsert failed:", attio.error);
  }

  await sendTelegramMessage(
    `💰 Valuation lead\n` +
      `Email: ${email}\n` +
      `Artist: ${artistName}\n` +
      `Estimated catalog value: ${usd(valueBand.central)} ` +
      `(range ${usd(valueBand.low)}–${usd(valueBand.high)})`,
  );

  return NextResponse.json({ success: true });
}
