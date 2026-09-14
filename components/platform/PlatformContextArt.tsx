import { platformCopy } from "@/lib/copy/platform";

export function PlatformContextArt() {
  const { artist, release, format } = platformCopy.preview;
  return (
    <div className="platform-context-art" aria-hidden="true">
      <div className="platform-context-artist">
        <div className="platform-context-avatar">MV</div>
        <div><span>Artist</span><strong>{artist}</strong></div>
        <span className="platform-context-star">✳</span>
      </div>
      <div className="platform-context-catalog">
        <div className="platform-context-catalog-top"><span>Catalog</span><span>↗</span></div>
        {[release, "Stay Close", "Afterglow"].map((track, index) => (
          <div className="platform-context-track" key={track}>
            <span className={`platform-context-thumb platform-context-thumb-${index}`} />
            <div><strong>{track}</strong><span>{artist}</span></div>
            <span className="platform-context-track-number">0{index + 1}</span>
          </div>
        ))}
      </div>
      <div className="platform-context-record">
        <div className="platform-record-disc" />
        <div className="platform-record-sleeve"><span>{artist} / {format}</span><strong>{release}</strong><div className="platform-record-waves" /></div>
      </div>
    </div>
  );
}
