import { leadQualificationEntries, type LeadQualification } from "./lead-qualification.ts";

type InquiryEmailFields = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  qualification?: LeadQualification;
};

export function prepareInquiryEmail(recipient: string, fields: InquiryEmailFields) {
  const subject = `Let’s build: ${fields.company}`;
  const details = fields.qualification
    ? `\n\nProject details\n${leadQualificationEntries(fields.qualification).map(([label, value]) => `${label}: ${value}`).join("\n")}`
    : "";
  const body = `Name: ${fields.name}\nEmail: ${fields.email}\nCompany: ${fields.company}\nInterested in: ${fields.interest}${details}\n\n${fields.message}`;
  return {
    href: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    text: `To: ${recipient}\nSubject: ${subject}\n\n${body}`,
  };
}

/** The endpoint returns exactly { ok: true } after saving or recognizing a saved retry. */
export async function hasInquiryReceipt(response: Response): Promise<boolean> {
  if (response.status !== 200 || response.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() !== "application/json") return false;
  try {
    const receipt: unknown = await response.json();
    return typeof receipt === "object" && receipt !== null && !Array.isArray(receipt)
      && Object.keys(receipt).length === 1 && "ok" in receipt && receipt.ok === true;
  } catch {
    return false;
  }
}

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
