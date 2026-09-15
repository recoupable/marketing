'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SkyArrow } from '@/components/sky/arrow';
import { saveReviewedDraft } from '@/lib/agent-draft';
import type { AgentDraft } from '@/lib/agent-browser';

export function InquiryHandoff({ draft, label, readiness = false }: { draft: AgentDraft; label: string; readiness?: boolean }) {
  const router = useRouter();
  const [storageError, setStorageError] = useState(false);
  return <div className="mm-handoff">
    {(!readiness || storageError) && <details open={storageError || undefined}>
      <summary>Review the inquiry summary</summary>
      <pre>{draft.message}</pre>
    </details>}
    {readiness && <p>Want help with your next step? We’ll add all seven answers and this recommendation to your inquiry. Next, add your contact details and review before sending.</p>}
    <button type="button" className="sp-button" onClick={() => {
      if (saveReviewedDraft(draft)) router.push(readiness ? '/contact?brief=readiness' : '/contact');
      else setStorageError(true);
    }}>{label}<span><SkyArrow /></span></button>
    <p>{readiness ? 'Nothing is sent until you click “Send your inquiry” on the next page.' : 'Carry this summary to the inquiry form. You can edit it before sending.'}</p>
    {storageError && <p role="alert">Your browser couldn’t carry the summary over. Copy the text above and <a href="/contact">open the inquiry form</a>. Nothing has been sent.</p>}
  </div>;
}
