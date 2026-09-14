export function NavServiceArt({ kind }: { kind: "advisory" | "build" | "training" }) {
  return <svg className={`ss-nav-art ss-nav-art-${kind}`} viewBox="0 0 200 120" fill="none" aria-hidden="true">
    {kind === "advisory" ? <>
      <rect x="38" y="13" width="124" height="98" rx="8" fill="white" stroke="#d4e4eb" />
      <path d="M54 30h54M54 39h32" stroke="#9cb9c5" strokeWidth="3" strokeLinecap="round" />
      <path d="m59 90 27-19 24 5 29-22" stroke="#087bab" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {[ [59,90], [86,71], [110,76], [139,54] ].map(([x,y]) => <circle key={x} cx={x} cy={y} r="5" fill="#d6ff62" stroke="#365e57" />)}
    </> : kind === "build" ? <>
      <rect x="27" y="18" width="146" height="70" rx="8" fill="#193730" />
      <path d="m60 40-12 13 12 13m31-26 12 13-12 13m-10-32-9 36" stroke="#d6ff62" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M117 43h37m-37 10h25m-25 10h32" stroke="#8caaa0" strokeWidth="3" strokeLinecap="round" />
      <path d="M100 88v13H58m42 0h42" stroke="#80a596" />
      {[45,87,129].map(x => <rect key={x} x={x} y="98" width="26" height="14" rx="4" fill="white" stroke="#80a596" />)}
    </> : <>
      <rect x="37" y="12" width="126" height="73" rx="7" fill="white" stroke="#cbd8bb" />
      <rect x="49" y="24" width="38" height="46" rx="5" fill="#d6ff62" />
      <path d="m58 46 7 7 13-16" stroke="#527130" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M100 32h45m-45 12h33m-33 12h40" stroke="#9aae91" strokeWidth="3" strokeLinecap="round" />
      {[65,100,135].map(x => <g key={x}><circle cx={x} cy="94" r="7" fill="#759468" /><path d={`M${x-12} 114v-4a12 12 0 0 1 24 0v4`} fill="#c4d5b3" /></g>)}
    </>}
  </svg>;
}
