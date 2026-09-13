"use client";

import { useRef, useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { currentReferralAttribution } from "@/lib/attribution/currentReferralAttribution";
import { effectiveAcquisitionTags } from "@/lib/attribution/effectiveAcquisitionTags";
import { musicVideosCopy } from "@/lib/copy/music-videos";
import { postLead } from "@/lib/leads/postLead";
import { buildVideoRequest } from "@/lib/music-videos/buildVideoRequest";
import { videoRequestSchema } from "@/lib/music-videos/videoRequestSchema";

export type VideoRequestStatus = "idle" | "sending" | "success" | "error";

/** Submission lifecycle for the quote form; contact details, song URLs and briefs never enter analytics. */
export function useVideoRequestSubmit() {
  const [status, setStatus] = useState<VideoRequestStatus>("idle");
  const [error, setError] = useState("");
  const started = useRef(false);
  const sending = useRef(false);
  const requestId = useRef<string | null>(null);

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackEvent("music_video_form_started", effectiveAcquisitionTags(currentReferralAttribution()));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const fields = new FormData(event.currentTarget);
    const parsed = videoRequestSchema.safeParse({
      name: fields.get("name"), email: fields.get("email"), artist: fields.get("artist"),
      song: fields.get("song"), brief: fields.get("brief"), rights: fields.get("rights") === "on",
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      setStatus("error");
      return;
    }
    sending.current = true;
    setStatus("sending");
    setError("");
    const attribution = effectiveAcquisitionTags(currentReferralAttribution());
    requestId.current ??= crypto.randomUUID();
    const captured = await postLead(buildVideoRequest(parsed.data, attribution, requestId.current));
    sending.current = false;
    if (!captured.ok) {
      setError(musicVideosCopy.form.error);
      setStatus("error");
      trackEvent("music_video_request_failed", attribution);
      return;
    }
    // Success means the api accepted the lead, never just a button click.
    setStatus("success");
    trackEvent("music_video_request_received", { ...attribution, request_id: requestId.current });
  }

  return { status, error, submit, markStarted };
}
