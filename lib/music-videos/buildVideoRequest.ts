import type { AcquisitionTags } from "../attribution/AcquisitionTags.ts";
import { describeAcquisitionTags } from "../attribution/describeAcquisitionTags.ts";
import { videoRequestSchema, type VideoRequestInput } from "./videoRequestSchema.ts";

/** The existing booking contract retains message and source in the CRM note. */
export function buildVideoRequest(input: VideoRequestInput, attribution: AcquisitionTags | undefined, requestId: string) {
  const data = videoRequestSchema.parse(input);
  return {
    kind: "booking",
    source: "/music-videos",
    package: "music-video",
    name: data.name,
    email: data.email,
    message: [
      `Music video quote request: ${requestId}`,
      `Artist: ${data.artist}`,
      `Song: ${data.song}`,
      `Brief: ${data.brief}`,
      "Submitter confirms they are the artist or authorized to discuss this release.",
      `Offer attribution: ${describeAcquisitionTags(attribution) || "none"}`,
    ].join("\n\n"),
  };
}
