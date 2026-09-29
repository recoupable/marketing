"use client";

import { useEffect, useRef } from "react";
import { SkyArrow } from "@/components/sky/arrow";
import { PageMark } from "@/components/sky/brand";

/** Focusing the heading announces the outcome once; no live region on top of it. */
export function InquirySuccessPanel({ qualified, onReset, consultation = false }: { qualified: boolean; onReset: () => void; consultation?: boolean }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, []);
  return <div className={`inquiry-form form-success${qualified ? " lead-inquiry" : ""}`}>
    <span className="inquiry-success-mark"><PageMark /></span>
    <h3 ref={heading} tabIndex={-1}>{consultation ? "Your request is in." : "Thanks. We’ll be in touch."}</h3>
    <p>{consultation ? "We’ll email you to arrange your consultation." : "Your inquiry is with Recoup. We’ll follow up by email."}</p>
    <button className="button" onClick={onReset}>Start another inquiry <SkyArrow /></button>
  </div>;
}
