import { expect, test } from "vitest";
import { inquiryLabels } from "../../../components/inquiry/inquiryLabels.ts";

test("guest mode relabels the form as a podcast invitation", () => {
  const labels = inquiryLabels({ qualified: false, freeAudit: false, connected: true, guest: true });
  expect(labels.formLabel).toBe("Podcast guest request");
  expect(labels.websitePath).toBe("Podcast guest /start-project");
  expect(labels.messageLabel).toMatch(/talk about/i);
  expect(labels.submit).toBe("Request an invite");
});
