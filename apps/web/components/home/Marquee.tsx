import { Fragment } from "react";

const KEYWORDS = [
  "ARTIST INTEL",
  "CONTENT ENGINE",
  "AUTOMATED ROUTING",
  "GLOBAL DSP INGEST",
  "AGENT DEPLOY",
  "CATALOG SYNC",
  "AUDIENCE GRAPH",
  "RELEASE OPS",
] as const;

function MarqueeSequence({ id }: { id: string }) {
  return (
    <div className="flex shrink-0 items-center gap-x-4 px-6">
      {KEYWORDS.map((keyword, index) => (
        <Fragment key={`${id}-${keyword}`}>
          {index > 0 ? (
            <span className="font-mono text-sm font-normal select-none opacity-40">·</span>
          ) : null}
          <span className="font-sans text-sm font-bold uppercase tracking-normal">
            {keyword}
          </span>
        </Fragment>
      ))}
    </div>
  );
}

/**
 * Full-width brutalist ticker — duplicated sequence + CSS marquee for a seamless loop.
 */
export function Marquee() {
  return (
    <div
      className="w-full overflow-hidden border-y border-(--border) bg-(--muted) py-3 text-(--brand)"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        <MarqueeSequence id="a" />
        <MarqueeSequence id="b" />
      </div>
    </div>
  );
}
