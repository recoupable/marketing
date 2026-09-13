"use client";

import { useEffect, useRef } from "react";
import { SkyArrow } from "@/components/sky/arrow";
import { musicVideosCopy } from "@/lib/copy/music-videos";
import { useVideoRequestSubmit } from "@/hooks/useVideoRequestSubmit";
import { VideoRequestFields } from "./VideoRequestFields";

export function VideoRequestForm() {
  const c = musicVideosCopy.form;
  const { status, error, submit, markStarted } = useVideoRequestSubmit();
  const success = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") success.current?.focus();
  }, [status]);

  if (status === "success")
    return (
      <div ref={success} tabIndex={-1} role="status" className="mv-form-success">
        <h3>{c.successTitle}</h3>
        <p>{c.success}</p>
      </div>
    );

  return (
    <form onSubmit={submit} onFocus={markStarted} aria-label="Music video quote request" aria-busy={status === "sending"} className="mv-form">
      <VideoRequestFields />
      {error ? <p role="alert" className="mv-form-error">{error}</p> : null}
      <button type="submit" disabled={status === "sending"} className="sp-button">
        {status === "sending" ? c.submitting : c.submit}<span><SkyArrow /></span>
      </button>
      <p className="mv-field-hint">
        {c.privacy}{" "}
        <a href="/privacy" className="mv-text-link">Privacy policy</a>
      </p>
    </form>
  );
}
