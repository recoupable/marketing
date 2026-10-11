import { podcastCopy } from "@/lib/copy/podcast";
import { formatTimestamp } from "@/lib/podcast/formatTimestamp";
import type { Transcript } from "@/lib/podcast/transcriptSchema";
import { CopyTranscriptButton } from "./CopyTranscriptButton";

/**
 * The full transcript in a closed <details>: server-rendered, so the text is in the page's HTML for search
 * while staying out of the reader's way. Timestamps open the video at that moment when there is one.
 */
export function EpisodeTranscript({ slug, transcript, youtube }: { slug: string; transcript: Transcript; youtube?: string }) {
  const copy = podcastCopy.episode.transcript;
  const id = `transcript-${slug}`;
  const at = (seconds: number) => (youtube ? `${youtube}${youtube.includes("?") ? "&" : "?"}t=${Math.floor(seconds)}s` : undefined);
  return (
    <details className="group mt-10 max-w-[680px] rounded-2xl border border-[#deeaee]">
      <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 [&::-webkit-details-marker]:hidden">
        <span className="text-[17px] font-medium tracking-[-0.02em]">{copy.heading}</span>
        <span className="text-[13px] text-[#586f78] group-open:hidden">{copy.show}</span>
        <span className="text-[13px] text-[#586f78] hidden group-open:inline">{copy.hide}</span>
      </summary>
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#deeaee]">
          <p className="text-[13px] text-[#586f78]">{copy.note}</p>
          <CopyTranscriptButton targetId={id} slug={slug} label={copy.copy} copiedLabel={copy.copied} />
        </div>
        <div id={id}>
          {transcript.map((turn) => {
            const href = at(turn.start);
            const stamp = formatTimestamp(turn.start);
            return (
              <div key={`${turn.start}-${turn.speaker}`} data-turn={`${turn.speaker} [${stamp}]`} className="pt-5">
                <p className="!m-0 text-[13px] font-[550] text-[#173527]">
                  {turn.speaker}{" "}
                  {href ? <a className="font-normal text-[#586f78] hover:text-[#087bab]" href={href} target="_blank" rel="noopener noreferrer">{stamp}</a> : <span className="font-normal text-[#586f78]">{stamp}</span>}
                </p>
                {turn.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)} className="!mt-2 text-[15px] !leading-[1.7] text-[#22343c]">{paragraph}</p>)}
              </div>
            );
          })}
        </div>
      </div>
    </details>
  );
}
