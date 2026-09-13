export async function copyInquiryText(
  text: string,
  writeText?: (text: string) => Promise<void>,
): Promise<"copied" | "manual"> {
  if (!writeText) return "manual";
  try {
    await writeText(text);
    return "copied";
  } catch {
    return "manual";
  }
}
