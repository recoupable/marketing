import { z } from "zod";

/** The pages that host an inquiry form; the api stores this as the lead's `source`. */
export const inquirySourceSchema = z.enum(["/contact", "/start-project", "/acquisitions/contact", "/operations/contact"]);

export type InquirySource = z.infer<typeof inquirySourceSchema>;
