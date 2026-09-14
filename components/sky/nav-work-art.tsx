export function NavWorkArt() {
  return <svg className="ss-nav-work-art" viewBox="0 0 320 120" fill="none" aria-hidden="true">
    <path d="M20 113C70 113 71 37 127 37S204 95 300 10M-10 72C61 72 75 5 143 5S229 74 336 47" stroke="#acd5e5" strokeOpacity=".45" />
    <g transform="rotate(-7 118 68)">
      <rect x="49" y="28" width="137" height="83" rx="8" fill="#e9f4f8" stroke="#b3d7e4" />
      <path d="M63 45h33M63 54h51" stroke="#8eafbc" strokeWidth="3" strokeLinecap="round" />
      <path d="M64 92v-17m14 17V64m14 28V71m14 21V59" stroke="#1684b0" strokeWidth="7" strokeLinecap="round" />
    </g>
    <g transform="rotate(5 207 61)">
      <rect x="139" y="13" width="137" height="91" rx="8" fill="white" stroke="#c0dce7" />
      <path d="M153 29h52M153 40h31" stroke="#7597a6" strokeWidth="3" strokeLinecap="round" />
      {[57, 73, 89].map(y => <g key={y}><circle cx="157" cy={y} r="5" fill="#eaf5d9" /><path d={`m154 ${y} 2 2 4-4`} stroke="#648d39" strokeWidth="1.5" strokeLinecap="round" /><path d={`M170 ${y}h85`} stroke="#e1ebef" strokeWidth="4" strokeLinecap="round" /></g>)}
    </g>
  </svg>;
}
