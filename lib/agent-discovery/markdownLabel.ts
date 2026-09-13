import { oneLine } from "./oneLine.ts";

export const markdownLabel = (value: string) =>
  oneLine(value).replace(/[\\[\]]/g, "\\$&");
