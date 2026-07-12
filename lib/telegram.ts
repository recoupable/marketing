/**
 * Send a message to the internal Telegram channel via the Bot API.
 *
 * Server-only — reads `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` (never exposed
 * to the browser). Used for valuation-lead pings (chat#1798). Never throws:
 * a notification failure must not fail the lead capture or the user's run.
 *
 * @param text - The message text.
 * @returns true on a successful send, false otherwise.
 */
export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("[telegram] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not configured");
    return false;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });
    if (!res.ok) {
      console.error("[telegram] sendMessage failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[telegram] sendMessage error:", error);
    return false;
  }
}
