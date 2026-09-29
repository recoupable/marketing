import { inquiryCompanyContext } from "./inquiryCompanyContext.ts";
import { leadQualificationEntries, type LeadQualification } from "../lead-qualification.ts";

type InquiryEmailFields = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  qualification?: LeadQualification;
};

export function prepareInquiryEmail(recipient: string, fields: InquiryEmailFields) {
  const subject = `Let’s build: ${fields.company || fields.interest}`;
  const details = fields.qualification
    ? `\n\nProject details\n${leadQualificationEntries(fields.qualification).map(([label, value]) => `${label}: ${value}`).join("\n")}`
    : "";
  const body = `Name: ${fields.name}\nEmail: ${fields.email}\n${fields.company ? `Company: ${fields.company}` : inquiryCompanyContext(fields.email)}\nInterested in: ${fields.interest}${details}\n\n${fields.message}`;
  return {
    href: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    text: `To: ${recipient}\nSubject: ${subject}\n\n${body}`,
  };
}
