"use client";

import { useEffect, useRef, useState } from "react";
import { SkyArrow } from "@/components/sky/arrow";
import { copyInquiryText } from "@/lib/inquiry/copyInquiryText";
import type { PreparedEmail } from "./useInquirySubmit";

type InquiryRecoveryPanelProps = { status: "error" | "email"; preparedEmail: PreparedEmail; qualified: boolean };

/** The visitor's inquiry, kept and ready to send by email when the form could not deliver it. */
export function InquiryRecoveryPanel({ status, preparedEmail, qualified }: InquiryRecoveryPanelProps) {
  const heading = useRef<HTMLParagraphElement>(null);
  const preparedText = useRef<HTMLTextAreaElement>(null);
  const [copyStatus, setCopyStatus] = useState<"copied" | "manual" | null>(null);
  useEffect(() => { if (qualified) heading.current?.focus(); }, [qualified]);

  async function copyInquiry() {
    const clipboard = navigator.clipboard;
    const result = await copyInquiryText(preparedEmail.text, clipboard?.writeText.bind(clipboard));
    setCopyStatus(result);
    if (result === "manual") {
      preparedText.current?.focus();
      preparedText.current?.select();
    }
  }

  return <div className="inquiry-recovery">
    <p ref={heading} tabIndex={-1} role={status === "error" ? "alert" : "status"}>
      {status === "error"
        ? "We couldn’t confirm delivery. Your details are still here. Try again, or send the prepared inquiry by email."
        : "Your email draft is ready. Nothing has been sent yet. Open it in your email app, or copy the inquiry into a new message."}
    </p>
    <div className="inquiry-recovery-actions">
      <a href={preparedEmail.href}>Open email draft <SkyArrow /></a>
      <button type="button" onClick={copyInquiry}>{copyStatus === "copied" ? "Copied" : "Copy inquiry"}</button>
    </div>
    <label htmlFor="prepared-inquiry">Prepared inquiry</label>
    <textarea id="prepared-inquiry" ref={preparedText} readOnly value={preparedEmail.text} rows={9} />
    <p className="inquiry-copy-status" role="status">{copyStatus === "copied"
      ? "Inquiry copied. Paste it into your email app to send."
      : copyStatus === "manual" ? "Copy wasn’t available. The inquiry is selected. Use your device’s copy command." : "You can also select and copy the text above."}</p>
  </div>;
}
