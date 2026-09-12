import { generalInterests } from './inquiry-topics.ts';
import type { AgentDraft } from './agent-browser.ts';

const key = 'recoup:reviewed-agent-brief:v1';
const changed = 'recoup-agent-brief-changed';
let snapshot: AgentDraft | null = null;
let initialized = false;
let snapshotExpiresAt = 0;

export function parseAgentDraft(value: string | null, now = Date.now()): AgentDraft | null {
  try {
    const parsed = JSON.parse(value || 'null');
    if (!parsed || !Number.isFinite(parsed.expiresAt) || parsed.expiresAt <= now || parsed.expiresAt > now + 3_600_000) return null;
    const draft = parsed.draft;
    if (!draft || !generalInterests.some(interest => interest === draft.interest) || typeof draft.message !== 'string' || draft.message.length < 20 || draft.message.length > 5000) return null;
    return { interest: draft.interest, message: draft.message };
  } catch { return null; }
}

export function saveReviewedDraft(draft: AgentDraft) {
  try {
    snapshotExpiresAt = Date.now() + 3_600_000;
    window.sessionStorage.setItem(key, JSON.stringify({ draft, expiresAt: snapshotExpiresAt }));
    snapshot = draft;
    initialized = true;
    window.dispatchEvent(new Event(changed));
    return true;
  } catch { return false; }
}

export function getReviewedDraft() {
  if (!initialized && typeof window !== 'undefined') {
    try {
      const saved = window.sessionStorage.getItem(key);
      snapshot = parseAgentDraft(saved);
      snapshotExpiresAt = snapshot ? JSON.parse(saved!).expiresAt : 0;
    } catch { snapshot = null; }
    initialized = true;
  }
  if (snapshot && snapshotExpiresAt <= Date.now()) snapshot = null;
  return snapshot;
}

export function clearReviewedDraft() {
  try { window.sessionStorage.removeItem(key); } catch { /* Memory-only browsing remains usable. */ }
  snapshot = null;
  snapshotExpiresAt = 0;
  initialized = true;
  window.dispatchEvent(new Event(changed));
}

export function subscribeToReviewedDraft(listener: () => void) {
  let expiryTimer: ReturnType<typeof setTimeout>;
  function reschedule() {
    clearTimeout(expiryTimer);
    if (getReviewedDraft()) expiryTimer = setTimeout(clearReviewedDraft, Math.max(0, snapshotExpiresAt - Date.now()));
  }
  function onChange() { reschedule(); listener(); }
  window.addEventListener(changed, onChange);
  reschedule();
  return () => { window.removeEventListener(changed, onChange); clearTimeout(expiryTimer); };
}
