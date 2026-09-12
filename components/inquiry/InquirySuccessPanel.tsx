"use client";

import { useEffect, useRef } from "react";
import { SkyArrow } from "@/components/sky/arrow";
import { PageMark } from "@/components/sky/brand";

export function InquirySuccessPanel({ qualified, onReset }: { qualified: boolean; onReset: () => void }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, []);
  return <div className={`inquiry-form form-success${qualified ? " lead-inquiry" : ""}`} role="status">
    <span className="inquiry-success-mark"><PageMark /></span>
    <h3 ref={heading} tabIndex={-1}>Thanks. We’ll be in touch.</h3>
    <p>Your inquiry is with Recoup. We’ll follow up by email.</p>
    <button className="button" onClick={onReset}>Start another inquiry <SkyArrow /></button>
  </div>;
}
