export function NavServiceArt({ kind }: { kind: "advisory" | "build" | "training" }) {
  return <svg className={`ss-nav-art ss-nav-art-${kind}`} viewBox="0 0 200 120" fill="none" aria-hidden="true">
    {kind === "advisory" ? <>
      <rect x="38" y="13" width="124" height="98" rx="8" fill="white" stroke="#d4e4eb" />
      <path d="M54 30h54M54 39h32" stroke="#9cb9c5" strokeWidth="3" strokeLinecap="round" />
      <path d="m59 90 27-19 24 5 29-22" stroke="#087bab" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {[ [59,90], [86,71], [110,76], [139,54] ].map(([x,y]) => <circle key={x} cx={x} cy={y} r="5" fill="#d6ff62" stroke="#365e57" />)}
    </> : kind === "build" ? <>
      <rect x="29" y="29" width="127" height="80" rx="8" fill="#c0d3c9" />
      <rect x="39" y="19" width="127" height="80" rx="8" fill="white" stroke="#91b3a2" />
      <path d="M39 38h127" stroke="#dce7e1" />
      <circle cx="49" cy="29" r="2" fill="#88a899" /><circle cx="56" cy="29" r="2" fill="#c4d8ce" />
      <rect x="50" y="48" width="31" height="39" rx="4" fill="#193730" />
      <path d="M59 59h13m-13 7h9m-9 7h11" stroke="#9dbcae" strokeWidth="2" strokeLinecap="round" />
      <rect x="89" y="48" width="65" height="13" rx="4" fill="#e7f0ea" />
      <rect x="89" y="68" width="28" height="19" rx="4" stroke="#9ebcaa" strokeDasharray="3 3" />
      <rect x="124" y="68" width="30" height="19" rx="4" fill="#c6dece" />
      <path d="M24 58h-7v30h7M175 40h8v-9" stroke="#86aa98" strokeLinecap="round" />
      <g transform="rotate(-9 112 85)">
        <rect x="94" y="70" width="36" height="30" rx="5" fill="#d6ff62" stroke="#afce53" />
        <path d="M105 85h14m-7-7v14" stroke="#426526" strokeWidth="2" strokeLinecap="round" />
      </g>
      <path d="m130 87 4 24 6-8 10-1-20-15Z" fill="#193730" stroke="white" strokeWidth="2" strokeLinejoin="round" />
    </> : <>
      <rect x="37" y="12" width="126" height="73" rx="7" fill="white" stroke="#cbd8bb" />
      <rect x="49" y="24" width="38" height="46" rx="5" fill="#d6ff62" />
      <path d="m58 46 7 7 13-16" stroke="#527130" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M100 32h45m-45 12h33m-33 12h40" stroke="#9aae91" strokeWidth="3" strokeLinecap="round" />
      {[65,100,135].map(x => <g key={x}><circle cx={x} cy="94" r="7" fill="#759468" /><path d={`M${x-12} 114v-4a12 12 0 0 1 24 0v4`} fill="#c4d5b3" /></g>)}
    </>}
  </svg>;
}
