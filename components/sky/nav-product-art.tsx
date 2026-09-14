export function NavProductArt({ kind }: { kind: "platform" | "skills" | "developers" }) {
  return <svg className={`ss-nav-art ss-nav-art-${kind}`} viewBox="0 0 200 120" fill="none" aria-hidden="true">
    {kind === "platform" ? <>
      <rect x="25" y="17" width="150" height="94" rx="8" fill="white" stroke="#d4e4eb" />
      <path d="M25 37h150M61 37v74" stroke="#e5edf0" />
      <circle cx="36" cy="27" r="2" fill="#9ab5c1" /><circle cx="43" cy="27" r="2" fill="#cedee5" />
      <path d="M35 50h15M35 61h11M35 72h14" stroke="#c4d9e2" strokeWidth="3" strokeLinecap="round" />
      {[49, 70, 91].map((y, i) => <g key={y}>
        <rect x="72" y={y - 5} width="14" height="14" rx="4" fill={["#087fb9", "#d6e6c4", "#efce97"][i]} />
        <path d={`M95 ${y}h${45 - i * 7}M95 ${y + 7}h30`} stroke="#b8cdd5" strokeWidth="3" strokeLinecap="round" />
        <circle cx="157" cy={y + 2} r="3" fill="#dbe9ee" />
      </g>)}
    </> : kind === "skills" ? <>
      <g transform="rotate(-12 63 66)"><rect x="29" y="26" width="59" height="79" rx="7" fill="white" stroke="#d8e1ce" /><path d="M43 44h29M43 53h20M43 88h13" stroke="#9bac9e" strokeWidth="3" strokeLinecap="round" /></g>
      <g transform="rotate(12 140 66)"><rect x="111" y="26" width="59" height="79" rx="7" fill="#17392f" /><path d="M126 44h27M126 53h19M126 88h12" stroke="#8aaa9a" strokeWidth="3" strokeLinecap="round" /></g>
      <rect x="70" y="16" width="61" height="86" rx="7" fill="#d6ff62" stroke="#c8ec60" />
      <path d="M86 35h29M86 44h19M86 84h12" stroke="#668735" strokeWidth="3" strokeLinecap="round" />
      <path d="m87 65 8 8 16-19" stroke="#234833" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </> : <>
      <path d="M100 70v24M48 94h104" stroke="#73998b" />
      <rect x="29" y="19" width="142" height="57" rx="8" fill="#15372d" stroke="#456958" />
      <path d="m56 38-9 9 9 9m19-18 9 9-9 9m-8-23-5 27" stroke="#d6ff62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M104 41h46M104 51h29M104 61h38" stroke="#8ea99e" strokeWidth="3" strokeLinecap="round" />
      {[48, 100, 152].map(x => <rect key={x} x={x - 14} y="88" width="28" height="16" rx="4" fill="#f4f9f6" stroke="#8faf9e" />)}
    </>}
  </svg>;
}
