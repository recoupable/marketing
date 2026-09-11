'use client';

import { useSyncExternalStore } from 'react';
import { getReviewedDraft, subscribeToReviewedDraft, clearReviewedDraft } from '@/lib/agent-draft';
import type { AgentDraft } from '@/lib/agent-browser';

export function AgentDraftImport({ onApply }: { onApply: (draft: AgentDraft) => void }) {
  const draft = useSyncExternalStore(subscribeToReviewedDraft, getReviewedDraft, () => null);
  if (!draft) return null;
  return <div className="agent-draft-import">
    <strong>Your prepared brief is ready.</strong>
    <p>Add it to the form, review your details, and send when you’re ready.</p>
    <button type="button" onClick={() => { onApply(draft); clearReviewedDraft(); }}>Use prepared brief</button>
    <button type="button" onClick={clearReviewedDraft}>Discard draft</button>
  </div>;
}
