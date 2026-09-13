import { z } from "zod";

export const videoRequestSchema = z.object({
  name: z.string().trim().min(1, "Add your name.").max(120, "Keep your name to 120 characters."),
  email: z.string().trim().email("Add a valid email address.").max(254, "Keep your email to 254 characters."),
  artist: z.string().trim().min(1, "Add the artist’s name.").max(120, "Keep the artist name to 120 characters."),
  song: z
    .string()
    .trim()
    .url("Add a link to the song.")
    .max(2000, "Keep the song link to 2,000 characters.")
    .refine((value) => /^https?:\/\//i.test(value), "Use an https or http song link."),
  brief: z.string().trim().min(1, "Tell us a little about your video.").max(3000, "Keep the brief to 3,000 characters."),
  rights: z.literal(true, {
    errorMap: () => ({ message: "Confirm that you can discuss this release." }),
  }),
});

export type VideoRequestInput = z.infer<typeof videoRequestSchema>;
