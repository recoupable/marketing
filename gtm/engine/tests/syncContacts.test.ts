import test from "node:test";
import assert from "node:assert/strict";
import { syncContacts } from "../lib/syncContacts.ts";
import type { SegmentedContact } from "../lib/segmentation.js";

const contacts: SegmentedContact[] = [{
  privy_id: "fixture-only", email: "test@example.invalid", signup_date: "2026-01-01",
  last_active: null, days_since_active: null, login_method: "email", accepted_terms: true,
  is_guest: false, segment: "churned",
}];

test("default preview never calls CRM and contains no contact details", async () => {
  const messages: string[] = [];
  const result = await syncContacts({
    contacts,
    upsert: async () => { throw new Error("CRM must not be called"); },
    log: (message) => messages.push(message),
  });
  assert.deepEqual(result, { synced: 0, failed: 0 });
  assert.match(messages.join("\n"), /PREVIEW/);
  assert.doesNotMatch(messages.join("\n"), /test@example|fixture-only|2026-01-01/);
});

test("apply calls only supplied contacts and reports partial failure", async () => {
  let calls = 0;
  const errors: string[] = [];
  const result = await syncContacts({
    contacts: [...contacts, ...contacts], apply: true,
    upsert: async () => (++calls === 1 ? { success: true } : { success: false, error: "HTTP 400" }),
    log: () => {}, error: (message) => errors.push(message),
  });
  assert.equal(calls, 2);
  assert.deepEqual(result, { synced: 1, failed: 1 });
  assert.match(errors[0], /HTTP 400/);
  assert.doesNotMatch(errors[0], /test@example/);
});
