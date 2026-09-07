"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { musicVideosCopy } from "@/lib/copy/music-videos";
import { getVideoAttribution } from "@/lib/music-videos/attribution";
import {
  buildVideoRequest,
  videoRequestSchema,
} from "@/lib/music-videos/buildVideoRequest";
import { postCapture } from "@/lib/postCapture";

export function VideoRequestForm() {
  const c = musicVideosCopy.form;
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const started = useRef(false);
  const sending = useRef(false);
  const requestId = useRef<string | null>(null);
  const success = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getVideoAttribution();
  }, []);
  useEffect(() => {
    if (status === "success") success.current?.focus();
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const fields = new FormData(event.currentTarget);
    const parsed = videoRequestSchema.safeParse({
      name: fields.get("name"),
      email: fields.get("email"),
      artist: fields.get("artist"),
      song: fields.get("song"),
      brief: fields.get("brief"),
      rights: fields.get("rights") === "on",
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      setStatus("error");
      return;
    }
    sending.current = true;
    setStatus("sending");
    setError("");
    const attribution = getVideoAttribution();
    requestId.current ??= crypto.randomUUID();
    const captured = await postCapture(
      buildVideoRequest(parsed.data, attribution, requestId.current),
    );
    sending.current = false;
    if (!captured.ok) {
      setError(c.error);
      setStatus("error");
      try {
        track("music_video_request_failed", attribution);
      } catch {
        /* Best effort. */
      }
      return;
    }
    setStatus("success");
    // Success means the capture API accepted the lead, never just a button click.
    // Contact details, song URLs and free-text briefs never enter analytics.
    try {
      track("music_video_request_received", {
        ...attribution,
        request_id: requestId.current,
      });
    } catch {
      /* Best effort. */
    }
  }

  if (status === "success")
    return (
      <div ref={success} tabIndex={-1} role="status" className="mv-success">
        <h3>{c.successTitle}</h3>
        <p>{c.success}</p>
      </div>
    );

  return (
    <form
      onSubmit={submit}
      aria-label="Music video quote request"
      className="mv-form"
      onFocus={() => {
        if (!started.current) {
          started.current = true;
          try {
            track("music_video_form_started", getVideoAttribution());
          } catch {
            /* Best effort. */
          }
        }
      }}
    >
      <div className="mv-form-row">
        <label>
          {c.name}
          <input name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label>
          {c.email}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        {c.artist}
        <input name="artist" required maxLength={120} />
      </label>
      <label>
        {c.song}
        <input
          name="song"
          type="url"
          placeholder="https://"
          required
          maxLength={2000}
        />
      </label>
      <label>
        {c.brief}
        <textarea
          name="brief"
          required
          rows={4}
          maxLength={3000}
          aria-describedby="brief-hint"
        />
      </label>
      <p id="brief-hint" className="mv-hint">
        {c.briefHint}
      </p>
      <label className="mv-checkbox">
        <input name="rights" type="checkbox" required />
        <span>{c.rights}</span>
      </label>
      {error ? <p role="alert">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mv-button"
      >
        {status === "sending" ? c.submitting : c.submit}
      </button>
      <p className="mv-hint">
        {c.privacy} <a href="/privacy-policy">Privacy policy</a>
      </p>
    </form>
  );
}
