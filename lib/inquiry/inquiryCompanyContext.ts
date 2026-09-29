/** A domain is a research hint, never a verified company or employer. */
export function inquiryCompanyContext(email: string): string {
  const domain = email.trim().toLowerCase().split("@").at(-1);
  return `Company: Not provided\nEmail domain (company unverified): ${domain}`;
}
