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
      <div
        ref={success}
        tabIndex={-1}
        role="status"
        className="rounded-(--radius) bg-(--muted) p-7"
      >
        <h3 className="my-3 text-[1.45rem] leading-[1.3] font-semibold">
          {c.successTitle}
        </h3>
        <p className="mb-4 max-w-[65ch] text-[1.0625rem] leading-[1.7] text-(--muted-foreground)">
          {c.success}
        </p>
      </div>
    );

  return (
    <form
      onSubmit={submit}
      aria-label="Music video quote request"
      className="grid gap-5"
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
      <div className="grid grid-cols-2 gap-4 max-[761px]:grid-cols-1 max-[761px]:gap-5">
        <label className="grid gap-2 text-[15px] font-medium">
          {c.name}
          <input
            className="block min-h-12 w-full rounded-(--radius) border-0 bg-(--background) px-3.5 py-3 text-(--foreground) caret-(--foreground) shadow-[0_0_0_1px_var(--muted-foreground)] [font:inherit] placeholder:text-(--muted-foreground)"
            name="name"
            autoComplete="name"
            required
            maxLength={120}
          />
        </label>
        <label className="grid gap-2 text-[15px] font-medium">
          {c.email}
          <input
            className="block min-h-12 w-full rounded-(--radius) border-0 bg-(--background) px-3.5 py-3 text-(--foreground) caret-(--foreground) shadow-[0_0_0_1px_var(--muted-foreground)] [font:inherit] placeholder:text-(--muted-foreground)"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label className="grid gap-2 text-[15px] font-medium">
        {c.artist}
        <input
          className="block min-h-12 w-full rounded-(--radius) border-0 bg-(--background) px-3.5 py-3 text-(--foreground) caret-(--foreground) shadow-[0_0_0_1px_var(--muted-foreground)] [font:inherit] placeholder:text-(--muted-foreground)"
          name="artist"
          required
          maxLength={120}
        />
      </label>
      <label className="grid gap-2 text-[15px] font-medium">
        {c.song}
        <input
          className="block min-h-12 w-full rounded-(--radius) border-0 bg-(--background) px-3.5 py-3 text-(--foreground) caret-(--foreground) shadow-[0_0_0_1px_var(--muted-foreground)] [font:inherit] placeholder:text-(--muted-foreground)"
          name="song"
          type="url"
          placeholder="https://"
          required
          maxLength={2000}
        />
      </label>
      <label className="grid gap-2 text-[15px] font-medium">
        {c.brief}
        <textarea
          className="block min-h-12 w-full rounded-(--radius) border-0 bg-(--background) px-3.5 py-3 text-(--foreground) caret-(--foreground) shadow-[0_0_0_1px_var(--muted-foreground)] [font:inherit] placeholder:text-(--muted-foreground) resize-y"
          name="brief"
          required
          rows={4}
          maxLength={3000}
          aria-describedby="brief-hint"
        />
      </label>
      <p
        id="brief-hint"
        className="m-0 max-w-[65ch] text-sm leading-[1.5] text-(--muted-foreground)"
      >
        {c.briefHint}
      </p>
      <label className="flex min-h-11 cursor-pointer items-start gap-3 text-[15px] leading-[1.5] font-medium">
        <input
          className="mt-[3px] size-5 shrink-0 accent-(--primary)"
          name="rights"
          type="checkbox"
          required
        />
        <span>{c.rights}</span>
      </label>
      {error ? (
        <p
          role="alert"
          className="mb-4 max-w-[65ch] text-[1.0625rem] leading-[1.7] font-semibold text-(--foreground)"
        >
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-13 cursor-pointer items-center justify-center gap-3 rounded-(--radius) px-6 py-3.5 [font-family:var(--font-ui),sans-serif] text-base leading-[1.5] font-semibold no-underline hover:opacity-[0.86] bg-(--primary) text-(--primary-foreground) disabled:cursor-wait disabled:opacity-[0.55]"
      >
        {status === "sending" ? c.submitting : c.submit}
      </button>
      <p className="m-0 max-w-[65ch] text-sm leading-[1.5] text-(--muted-foreground)">
        {c.privacy}{" "}
        <a href="/privacy-policy" className="underline underline-offset-[3px]">
          Privacy policy
        </a>
      </p>
    </form>
  );
}
