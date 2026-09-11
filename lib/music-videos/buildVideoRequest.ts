import { z } from "zod";
import type { VideoAttribution } from "./attribution";

export const videoRequestSchema = z.object({
  name: z.string().trim().min(1, "Add your name.").max(120),
  email: z.string().trim().email("Add a valid email address.").max(254),
  artist: z.string().trim().min(1, "Add the artist’s name.").max(120),
  song: z
    .string()
    .trim()
    .url("Add a link to the song.")
    .max(2000)
    .refine(
      (value) => /^https?:\/\//i.test(value),
      "Use an https or http song link.",
    ),
  brief: z
    .string()
    .trim()
    .min(1, "Tell us a little about your video.")
    .max(3000),
  rights: z.literal(true, {
    errorMap: () => ({ message: "Confirm that you can discuss this release." }),
  }),
});

/** The existing booking contract retains message and source in the CRM note. */
export function buildVideoRequest(
  input: z.infer<typeof videoRequestSchema>,
  attribution: VideoAttribution,
  requestId: string,
) {
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
      `Offer attribution: ${JSON.stringify(attribution)}`,
    ].join("\n\n"),
  };
}
