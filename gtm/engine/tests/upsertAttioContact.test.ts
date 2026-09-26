import test from "node:test";
import assert from "node:assert/strict";
import { upsertAttioContact } from "../lib/upsertAttioContact.ts";
import type { SegmentedContact } from "../lib/segmentation.js";

const contact: SegmentedContact = {
  privy_id: "fixture",
  email: " PERSON@example.invalid ",
  signup_date: "2026-01-01",
  last_active: null,
  days_since_active: null,
  login_method: "email",
  accepted_terms: true,
  is_guest: false,
  segment: "new",
};

test("asserts email through query matching and cannot replay extra source fields", async () => {
  let calls = 0;
  const request: typeof fetch = async (url, init) => {
    calls++;
    assert.equal(
      String(url),
      "https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses",
    );
    assert.equal(init?.method, "PUT");
    assert.deepEqual(JSON.parse(String(init?.body)), {
      data: {
        values: {
          email_addresses: [{ email_address: "person@example.invalid" }],
        },
      },
    });
    assert.ok(init?.signal);
    return Response.json({ data: { id: { record_id: "existing-person" } } });
  };
  const imported = {
    ...contact,
    company: "obsolete-company-id",
    name: "Unverified",
  };
  assert.deepEqual(await upsertAttioContact("fixture-key", imported, request), {
    success: true,
  });
  assert.deepEqual(await upsertAttioContact("fixture-key", imported, request), {
    success: true,
  });
  assert.equal(calls, 2);
});

test("missing email makes no request", async () => {
  const request: typeof fetch = async () => {
    throw new Error("must not call");
  };
  for (const email of [null, "  "]) {
    assert.deepEqual(
      await upsertAttioContact("fixture", { ...contact, email }, request),
      { success: false, error: "No email" },
    );
  }
});

test("rejects unsuccessful and malformed responses without leaking their body", async () => {
  for (const response of [
    new Response("private details", { status: 429 }),
    Response.json({}),
    new Response("invalid json"),
  ]) {
    const result = await upsertAttioContact(
      "fixture",
      contact,
      async () => response,
    );
    assert.equal(result.success, false);
    assert.doesNotMatch(result.error!, /private details|person@/);
  }
});

test("uncertain requests are reported once without automatic retries", async () => {
  let calls = 0;
  const result = await upsertAttioContact("fixture", contact, async () => {
    calls++;
    throw new Error("secret private contact");
  });
  assert.equal(calls, 1);
  assert.equal(result.success, false);
  assert.match(result.error!, /verify record before retrying/);
  assert.doesNotMatch(result.error!, /secret|private contact/);
});
