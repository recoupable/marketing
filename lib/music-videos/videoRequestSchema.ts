import { z } from "zod";

export const videoRequestSchema = z.object({
  name: z.string().trim().min(1, "Add your name.").max(120),
  email: z.string().trim().email("Add a valid email address.").max(254),
  artist: z.string().trim().min(1, "Add the artist’s name.").max(120),
  song: z
    .string()
    .trim()
    .url("Add a link to the song.")
    .max(2000)
    .refine((value) => /^https?:\/\//i.test(value), "Use an https or http song link."),
  brief: z.string().trim().min(1, "Tell us a little about your video.").max(3000),
  rights: z.literal(true, {
    errorMap: () => ({ message: "Confirm that you can discuss this release." }),
  }),
});

export type VideoRequestInput = z.infer<typeof videoRequestSchema>;
