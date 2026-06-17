import { NextResponse } from "next/server";
import { z } from "zod";
import { upsertValuationLead } from "@/lib/valuation/upsertValuationLead";
import { sendTelegramMessage } from "@/lib/telegram";
import { usd } from "@/lib/format/usd";

const bandSchema = z.object({ low: z.number(), central: z.number(), high: z.number() });

const leadSchema = z.object({
  email: z.string().email("a valid email is required"),
  artistName: z.string().min(1, "artistName is required"),
  artistId: z.string().min(1, "artistId is required"),
  valueBand: bandSchema,
  lifetimeStreams: z.number(),
  followerCount: z.number().optional(),
});

/**
 * POST /api/valuation/lead — capture a valuation lead on run success (chat#1798).
 *
 * Persists a qualified, pipeline-staged lead to Attio (system of record) and
 * pings the internal Telegram channel with the email + looked-up artist + value
 * band. Fires on every successful valuation; both writes are best-effort and
 * never fail the (fire-and-forget) request.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { email, artistName, artistId, valueBand, lifetimeStreams, followerCount } = parsed.data;

  // Attio is the system of record. Don't fail the request on an Attio error —
  // the user's valuation already succeeded — but log it so a dropped lead is
  // observable rather than silently lost.
  const attio = await upsertValuationLead({
    email,
    artistName,
    artistId,
    valueBand,
    lifetimeStreams,
    followerCount,
  });
  if (!attio.success) {
    console.error("[valuation/lead] Attio enrichment failed:", attio.error);
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
