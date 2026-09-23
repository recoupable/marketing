import type { z } from "zod/v3";
import type { questionSchema } from "./question";

export const aiSetupQuestion: z.infer<typeof questionSchema> = {
  context:
    "Choose the closest match. We’ll ask which tools and workflows you use next.",
  question: "How is your team using AI today?",
  options: [
    {
      label: "Not using AI yet",
      description: "No regular AI use in our team’s work.",
    },
    {
      label: "ChatGPT / Claude Team plan",
      description: "Shared AI chats; people still carry out the work.",
    },
    {
      label: "Agents accurately answer tough catalog and business questions",
      description: "Answers use our own catalog and business data.",
    },
    {
      label: "Agents complete full workflows autonomously",
      description: "They carry out multi-step work with little or no help.",
    },
  ],
};
