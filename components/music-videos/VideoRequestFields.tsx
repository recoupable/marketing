import { musicVideosCopy } from "@/lib/copy/music-videos";

export function VideoRequestFields() {
  const c = musicVideosCopy.form;
  return <>
    <div className="mv-form-pair">
      <label className="mv-field">
        {c.name}
        <input className="mv-input" name="name" autoComplete="name" required maxLength={120} />
      </label>
      <label className="mv-field">
        {c.email}
        <input className="mv-input" name="email" type="email" autoComplete="email" required maxLength={254} />
      </label>
    </div>
    <label className="mv-field">
      {c.artist}
      <input className="mv-input" name="artist" required maxLength={120} />
    </label>
    <label className="mv-field">
      {c.song}
      <input className="mv-input" name="song" type="url" placeholder="https://" required maxLength={2000} />
    </label>
    <label className="mv-field">
      {c.brief}
      <textarea className="mv-input" name="brief" required rows={4} maxLength={3000} aria-describedby="brief-hint" />
    </label>
    <p id="brief-hint" className="mv-field-hint">{c.briefHint}</p>
    <label className="mv-rights">
      <input name="rights" type="checkbox" required />
      <span>{c.rights}</span>
    </label>
  </>;
}
