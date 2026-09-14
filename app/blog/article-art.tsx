import type { ReactNode } from "react";

const ink = "#152e37",
  blue = "#087bab",
  lime = "#d6ff62",
  pale = "#e7f3f8",
  green = "#193730";

function Words({
  x,
  y,
  children,
  size = 28,
  fill = ink,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  fill?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={size}
      fontWeight="500"
      letterSpacing="-.6"
    >
      {children}
    </text>
  );
}
function Disc({
  x,
  y,
  r = 72,
  color = ink,
}: {
  x: number;
  y: number;
  r?: number;
  color?: string;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={color} />
      <circle
        cx={x}
        cy={y}
        r={r * 0.76}
        fill="none"
        stroke="white"
        strokeOpacity=".16"
        strokeWidth="2"
      />
      <circle
        cx={x}
        cy={y}
        r={r * 0.53}
        fill="none"
        stroke="white"
        strokeOpacity=".16"
        strokeWidth="2"
      />
      <circle cx={x} cy={y} r={r * 0.27} fill={lime} />
      <circle cx={x} cy={y} r="5" fill={color} />
    </g>
  );
}
function Sheet({
  x,
  y,
  title,
  width = 225,
  color = "white",
  children,
}: {
  x: number;
  y: number;
  title: string;
  width?: number;
  color?: string;
  children?: ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x="3"
        y="9"
        width={width}
        height="180"
        rx="16"
        fill={ink}
        opacity=".08"
      />
      <rect width={width} height="180" rx="16" fill={color} />
      <Words x={22} y={42} size={25}>
        {title}
      </Words>
      {children || (
        <>
          <path
            d={`M22 78H${width - 28}M22 102H${width - 65}M22 126H${width - 40}`}
            stroke={ink}
            opacity=".18"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </>
      )}
    </g>
  );
}
function Arrow({ d, color = blue }: { d: string; color?: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}
function Check({
  x,
  y,
  color = blue,
}: {
  x: number;
  y: number;
  color?: string;
}) {
  return (
    <path
      d={`m${x} ${y} 10 11 21-25`}
      fill="none"
      stroke={color}
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}
function Tile({
  x,
  y,
  label,
  color = "white",
  width = 210,
}: {
  x: number;
  y: number;
  label: string;
  color?: string;
  width?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height="68" rx="14" fill={color} />
      <Words x={x + 22} y={y + 44} size={26}>
        {label}
      </Words>
    </g>
  );
}

// Each composition is editorially assigned, never chosen by an article's list position.
const artwork: Record<
  string,
  { background: string; label: string; scene: ReactNode }
> = {
  "ai-music-marketing-guide-2026": {
    background: blue,
    label: "THE MUSIC MARKETING WORKFLOW",
    scene: (
      <>
        <Disc x={174} y={238} r={100} />
        <Words x={95} y={390} fill="white">
          Your music
        </Words>
        <Arrow d="M294 236H354m-16-16 16 16-16 16" color={lime} />
        <g transform="rotate(-5 500 230)">
          <Sheet x={385} y={128} width={278} title="Campaign brief" />
          <Tile
            x={435}
            y={319}
            label="Ready for review"
            color={lime}
            width={285}
          />
        </g>
      </>
    ),
  },
  "ai-for-music-managers": {
    background: "#e9f0e1",
    label: "ARTIST MANAGEMENT",
    scene: (
      <>
        <Sheet x={65} y={137} title="Weekly report" width={270}>
          <Check x={24} y={91} />
          <path
            d="M80 91H235M24 132H201"
            stroke={ink}
            strokeOpacity=".2"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </Sheet>
        <g transform="rotate(7 570 268)">
          <rect x="416" y="132" width="285" height="219" rx="22" fill={green} />
          <path d="m450 344-20 39 83-35" fill={green} />
          <Words x={447} y={185} fill={lime}>
            Artist check-in
          </Words>
          <circle cx="487" cy="249" r="26" fill={pale} />
          <circle cx="623" cy="249" r="26" fill={lime} />
          <path
            d="M522 249h66"
            stroke="white"
            strokeWidth="3"
            strokeDasharray="6 8"
          />
        </g>
      </>
    ),
  },
  "ai-ar-artist-discovery": {
    background: pale,
    label: "A&R · FIND THE SIGNAL",
    scene: (
      <>
        <circle
          cx="258"
          cy="263"
          r="148"
          fill="none"
          stroke={blue}
          strokeOpacity=".2"
          strokeWidth="2"
        />
        <circle
          cx="258"
          cy="263"
          r="95"
          fill="none"
          stroke={blue}
          strokeOpacity=".2"
          strokeWidth="2"
        />
        <path
          d="M110 263h296M258 115v296"
          stroke={blue}
          strokeOpacity=".2"
          strokeWidth="2"
        />
        {[
          [166, 225],
          [221, 335],
          [310, 179],
          [363, 289],
        ].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="9" fill={blue} />
        ))}
        <circle cx="279" cy="258" r="23" fill={lime} />
        <Arrow d="M303 258h137m-16-16 16 16-16 16" />
        <Sheet x={464} y={154} title="Artist shortlist" width={265}>
          <path
            d="M26 83h118M26 122h155"
            stroke={blue}
            strokeWidth="9"
            strokeLinecap="round"
          />
          <Check x={205} y={84} />
          <Check x={205} y={124} />
        </Sheet>
      </>
    ),
  },
  "ai-music-distribution-automation": {
    background: "#f3eee4",
    label: "DISTRIBUTION · METADATA & QC",
    scene: (
      <>
        <rect x="75" y="122" width="650" height="273" rx="18" fill="white" />
        <path
          d="M75 188h650M75 256h650M75 324h650"
          stroke={pale}
          strokeWidth="3"
        />
        <Words x={101} y={164}>
          Track
        </Words>
        <Words x={368} y={164}>
          ISRC
        </Words>
        <Words x={586} y={164}>
          Review
        </Words>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect
              x="100"
              y={208 + i * 68}
              width="31"
              height="31"
              rx="6"
              fill={[blue, green, lime][i]}
            />
            <path
              d={`M150 ${224 + i * 68}h140M370 ${224 + i * 68}h115`}
              stroke={ink}
              strokeOpacity=".2"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {i === 1 ? (
              <>
                <circle cx="613" cy="292" r="20" fill={lime} />
                <Words x={608} y={302}>
                  !
                </Words>
              </>
            ) : (
              <Check x={598} y={227 + i * 68} />
            )}
          </g>
        ))}
      </>
    ),
  },
  "music-label-ai-agents": {
    background: green,
    label: "AGENTS IN LABEL OPERATIONS",
    scene: (
      <>
        <path
          d="M270 166H351V345H270M351 255h99"
          fill="none"
          stroke="#8ca99b"
          strokeWidth="4"
        />
        <Tile x={68} y={133} label="Catalog" color={pale} />
        <Tile x={68} y={220} label="A&R" color={lime} />
        <Tile x={68} y={307} label="Artist ops" color={pale} />
        <Sheet x={466} y={162} width={264} title="Team review">
          <Check x={25} y={97} />
          <Words x={78} y={102} size={25}>
            Approve
          </Words>
          <path
            d="M25 141h190"
            stroke={ink}
            strokeOpacity=".2"
            strokeWidth="8"
          />
        </Sheet>
      </>
    ),
  },
  "why-artists-need-ai-agents": {
    background: "#deedf4",
    label: "FROM A TASK TO A WORKFLOW",
    scene: (
      <>
        <Tile x={67} y={135} label="One prompt" width={226} />
        <path
          d="M181 216v136"
          stroke={blue}
          strokeWidth="4"
          strokeDasharray="8 12"
        />
        <Tile x={67} y={362} label="One draft" width={226} />
        <path
          d="M380 120v304"
          stroke={blue}
          strokeOpacity=".16"
          strokeWidth="2"
        />
        <Tile x={445} y={125} label="Artist context" width={270} />
        <Arrow d="M580 205v34m-14-14 14 14 14-14" />
        <Tile
          x={445}
          y={255}
          label="Connected tools"
          color={lime}
          width={270}
        />
        <Arrow d="M580 335v30m-14-14 14 14 14-14" />
        <Words x={463} y={409}>
          Reviewed output
        </Words>
      </>
    ),
  },
  "ai-content-creation-musicians": {
    background: lime,
    label: "BUILD A MONTH OF CONTENT",
    scene: (
      <>
        <g transform="rotate(-8 176 260)">
          <rect x="80" y="143" width="190" height="244" rx="20" fill={green} />
          <circle cx="175" cy="248" r="46" fill="white" />
          <path d="m164 224 35 24-35 24z" fill={blue} />
          <Words x={106} y={353} fill="white">
            Source clips
          </Words>
        </g>
        <Arrow d="M298 260h65m-16-16 16 16-16 16" color={ink} />
        <rect x="402" y="130" width="325" height="274" rx="18" fill="white" />
        <Words x={427} y={174}>
          Content calendar
        </Words>
        {Array.from({ length: 28 }, (_, i) => (
          <rect
            key={i}
            x={429 + (i % 7) * 39}
            y={203 + Math.floor(i / 7) * 43}
            width="29"
            height="32"
            rx="5"
            fill={i % 5 === 0 ? blue : i % 3 === 0 ? green : pale}
          />
        ))}
      </>
    ),
  },
  "music-release-strategy-2026": {
    background: "#dceff7",
    label: "PLAN THE WHOLE RELEASE",
    scene: (
      <>
        <path d="M95 288h608" stroke={blue} strokeWidth="5" />
        <circle cx="158" cy="288" r="14" fill={blue} />
        <circle cx="630" cy="288" r="14" fill={blue} />
        <Disc x={393} y={254} r={103} />
        <Words x={74} y={225}>
          Pre-release
        </Words>
        <Words x={547} y={225}>
          Long tail
        </Words>
        <Words x={302} y={410}>
          Release week
        </Words>
        <path d="M158 313v46M630 313v46" stroke={blue} strokeWidth="3" />
      </>
    ),
  },
  "ai-catalog-marketing-passive-revenue": {
    background: "#e8eddc",
    label: "GIVE THE BACK CATALOG A NEW BRIEF",
    scene: (
      <>
        {[0, 1, 2].map((i) => (
          <g
            key={i}
            transform={`translate(${105 + i * 49} ${125 + i * 22}) rotate(-8)`}
          >
            <rect
              width="185"
              height="222"
              rx="10"
              fill={["#a4b99a", green, blue][i]}
            />
            <Disc x={93} y={108} r={65} />
          </g>
        ))}
        <Arrow d="M411 256h61m-16-16 16 16-16 16" />
        <Sheet x={498} y={166} title="New campaign" width={250} color={lime} />
      </>
    ),
  },
  "ai-for-record-labels": {
    background: blue,
    label: "THE LABEL MARKETING DESK",
    scene: (
      <>
        <rect x="75" y="126" width="650" height="275" rx="20" fill="white" />
        {["Content", "Campaigns", "Reports"].map((t, i) => (
          <g key={t}>
            <Words x={99 + i * 212} y={174} size={26}>
              {t}
            </Words>
            {[0, 1].map((j) => (
              <rect
                key={j}
                x={98 + i * 211}
                y={205 + j * 84}
                width="182"
                height="62"
                rx="9"
                fill={i === 1 ? lime : pale}
              />
            ))}
            <path
              d={`M115 ${234}h126M115 318h93`}
              transform={`translate(${i * 211} 0)`}
              stroke={ink}
              strokeOpacity=".23"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>
        ))}
      </>
    ),
  },
  "ai-music-manager-tools": {
    background: "#f0ede6",
    label: "CHOOSE TOOLS BY THE WORK",
    scene: (
      <>
        <rect x="116" y="112" width="568" height="293" rx="18" fill="white" />
        <Words x={147} y={158}>
          Tool evaluation
        </Words>
        {["Context", "Approvals", "Total cost"].map((t, i) => (
          <g key={t}>
            <path
              d={`M143 ${182 + i * 68}h512`}
              stroke={pale}
              strokeWidth="3"
            />
            <Words x={146} y={224 + i * 68}>
              {t}
            </Words>
            <Check x={438} y={216 + i * 68} />
            <circle
              cx="592"
              cy={214 + i * 68}
              r="18"
              fill={i === 1 ? lime : pale}
            />
          </g>
        ))}
      </>
    ),
  },
  "ai-music-marketing-roi": {
    background: green,
    label: "MEASURE THE NET BENEFIT",
    scene: (
      <>
        <Words x={79} y={161} size={33} fill="white">
          Value of time back
        </Words>
        <rect x="79" y="189" width="397" height="35" rx="8" fill={lime} />
        <Words x={79} y={291} size={33} fill="white">
          Full workflow cost
        </Words>
        <rect x="79" y="319" width="397" height="35" rx="8" fill="#8dafa0" />
        <path
          d="M548 154v220M535 154h27M535 374h27"
          stroke="white"
          strokeOpacity=".5"
          strokeWidth="3"
        />
        <Words x={590} y={237} fill={lime} size={52}>
          ROI?
        </Words>
        <Words x={582} y={282} size={24} fill="white">
          Test it.
        </Words>
        <Words x={79} y={414} size={24} fill="#bfd4c9">
          Include setup, review, and corrections.
        </Words>
      </>
    ),
  },
  "ai-music-marketing": {
    background: "#dbeef4",
    label: "CONTEXT MAKES THE CAMPAIGN",
    scene: (
      <>
        <Sheet x={82} y={117} title="Artist brief" width={244} />
        <Sheet
          x={463}
          y={210}
          title="Content drafts"
          width={252}
          color={lime}
        />
        <Arrow d="M351 218h36q35 0 35 35v40h24m-15-15 15 15-15 15" />
        <Disc x={196} y={359} r={59} />
      </>
    ),
  },
  "ai-replacing-music-marketing-teams": {
    background: "#eeeae0",
    label: "AUDIT THE WORK BEFORE THE ORG CHART",
    scene: (
      <>
        <rect x="66" y="140" width="668" height="240" rx="18" fill="white" />
        <path d="M400 158v203" stroke={pale} strokeWidth="3" />
        <Words x={94} y={192}>
          AI preparation
        </Words>
        <Words x={430} y={192}>
          Human decisions
        </Words>
        <Tile
          x={87}
          y={222}
          label="Drafts · reports"
          color={pale}
          width={288}
        />
        <Tile
          x={424}
          y={222}
          label="Voice · strategy"
          color={lime}
          width={287}
        />
        <Words x={97} y={342} size={24}>
          Compare total effort.
        </Words>
        <Words x={435} y={342} size={24}>
          Keep an owner.
        </Words>
      </>
    ),
  },
  "how-labels-use-ai": {
    background: blue,
    label: "FIVE WORKFLOWS FOR LABEL TEAMS",
    scene: (
      <>
        {[
          ["Catalog", 85, 130],
          ["Artist marketing", 335, 130],
          ["A&R", 85, 231],
          ["Localization", 335, 231],
          ["Performance review", 210, 332],
        ].map(([label, x, y], i) => (
          <Tile
            key={label}
            x={Number(x)}
            y={Number(y)}
            label={String(label)}
            color={i === 4 ? lime : "white"}
            width={i === 4 ? 380 : i % 2 === 0 ? 228 : 375}
          />
        ))}
      </>
    ),
  },
  "how-much-does-ai-music-marketing-cost": {
    background: "#e4ede6",
    label: "BUDGET BEYOND THE SUBSCRIPTION",
    scene: (
      <>
        <g transform="rotate(-4 400 265)">
          <rect x="191" y="111" width="418" height="315" rx="12" fill="white" />
          <Words x={224} y={161} size={32}>
            The complete cost
          </Words>
          {["Software + usage", "Setup + integration", "Review + support"].map(
            (t, i) => (
              <g key={t}>
                <Words x={225} y={223 + i * 58} size={27}>
                  {t}
                </Words>
              </g>
            ),
          )}
          <path d="M225 365h346" stroke={ink} strokeWidth="3" />
          <Words x={226} y={404} size={25}>
            Scope first. Then price.
          </Words>
        </g>
      </>
    ),
  },
  "independent-artist-marketing-guide": {
    background: lime,
    label: "A SMALL-BUDGET ARTIST PLAN",
    scene: (
      <>
        <g transform="rotate(-8 190 280)">
          <rect x="91" y="117" width="188" height="290" rx="30" fill={ink} />
          <rect x="105" y="157" width="160" height="196" rx="12" fill={pale} />
          <Disc x={186} y={253} r={59} />
          <path
            d="M170 135h34M163 381h47"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
        <Words x={363} y={185} size={40}>
          Start with
        </Words>
        <Words x={363} y={233} size={40}>
          what you have.
        </Words>
        <Tile x={358} y={281} label="Record · post · connect" width={370} />
      </>
    ),
  },
  "ai-playlist-pitching": {
    background: "#e4f1f8",
    label: "PLAYLIST FIT BEFORE THE PITCH",
    scene: (
      <>
        <rect x="73" y="143" width="269" height="254" rx="17" fill={ink} />
        <Words x={97} y={190} fill="white">
          Playlist shortlist
        </Words>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect
              x="99"
              y={220 + i * 49}
              width="27"
              height="27"
              rx="5"
              fill={i === 1 ? lime : blue}
            />
            <path
              d={`M143 ${234 + i * 49}h159`}
              stroke="white"
              strokeOpacity=".5"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>
        ))}
        <Arrow d="M368 274h60m-16-16 16 16-16 16" />
        <rect x="467" y="186" width="270" height="191" rx="16" fill="white" />
        <path
          d="m467 195 135 99 135-99"
          fill="none"
          stroke={blue}
          strokeWidth="4"
        />
        <Words x={477} y={149}>
          A relevant pitch
        </Words>
      </>
    ),
  },
  "chatgpt-vs-music-ai-agents": {
    background: "#f2eee7",
    label: "GENERAL CHAT / MUSIC WORKFLOWS",
    scene: (
      <>
        <rect x="63" y="149" width="271" height="186" rx="22" fill="white" />
        <path d="m83 325-9 33 53-26" fill="white" />
        <Words x={92} y={203}>
          Prompt
        </Words>
        <Words x={92} y={281} fill={blue}>
          Response
        </Words>
        <path
          d="M392 128v285"
          stroke={ink}
          strokeOpacity=".17"
          strokeWidth="2"
        />
        <Tile x={443} y={127} label="Artist context" width={285} color={pale} />
        <Tile
          x={443}
          y={233}
          label="Music data + tools"
          width={285}
          color={lime}
        />
        <Tile x={443} y={339} label="Recurring work" width={285} color={pale} />
        <path d="M584 195v38M584 301v38" stroke={blue} strokeWidth="4" />
      </>
    ),
  },
  "meta-bought-manus-agents-break": {
    background: green,
    label: "AGENT RELIABILITY · THE MISSING LAYER",
    scene: (
      <>
        <path
          d="M119 237h560"
          stroke="#89aa9e"
          strokeWidth="5"
          strokeDasharray="10 12"
        />
        <circle cx="140" cy="237" r="47" fill="white" />
        <Check x={123} y={241} />
        <circle cx="657" cy="237" r="47" fill="white" />
        <Check x={640} y={241} />
        <rect x="299" y="178" width="194" height="116" rx="19" fill={lime} />
        <Words x={326} y={246} size={35}>
          Recover
        </Words>
        <path
          d="M340 307v53h-94v-112m-14 14 14-14 14 14"
          fill="none"
          stroke={lime}
          strokeWidth="4"
        />
        <Words x={165} y={421} fill="white" size={28}>
          State. Retries. Work that resumes.
        </Words>
      </>
    ),
  },
  "recoup-in-2026": {
    background: blue,
    label: "RECOUP · THE 2026 ROADMAP",
    scene: (
      <>
        <Words x={65} y={257} size={105} fill="white">
          2026
        </Words>
        <path
          d="M80 292h230"
          stroke={lime}
          strokeWidth="7"
          strokeLinecap="round"
        />
        {[
          "Q1  Email + SMS",
          "Q2  Media creation",
          "Q3  Label services",
          "Q4  Open stack",
        ].map((t, i) => (
          <Tile
            key={t}
            x={360}
            y={112 + i * 82}
            label={t}
            width={375}
            color={i === 3 ? lime : "white"}
          />
        ))}
      </>
    ),
  },
  "open-labels": {
    background: "#dcecf2",
    label: "THE PROGRAMMABLE RECORD LABEL",
    scene: (
      <>
        <path
          d="M218 203v-58h367v58M217 324v68h367v-68"
          fill="none"
          stroke={blue}
          strokeWidth="4"
        />
        <Tile x={90} y={205} label="Label files" width={253} />
        <Tile x={451} y={205} label="Tools + data" width={253} />
        <rect x="276" y="305" width="252" height="87" rx="16" fill={green} />
        <Words x={300} y={359} fill={lime}>
          Resumable work
        </Words>
        <Words x={260} y={122} size={30}>
          Bash + shared context
        </Words>
      </>
    ),
  },
  "bring-your-own-agent": {
    background: green,
    label: "YOUR AGENT. RECOUP’S MUSIC TOOLS.",
    scene: (
      <>
        <rect x="67" y="165" width="272" height="190" rx="23" fill="white" />
        <Words x={95} y={224} size={33}>
          Your agent
        </Words>
        <path
          d="m104 255 24 20-24 20M151 297h39"
          stroke={blue}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <Arrow d="M355 262h68m-16-16 16 16-16 16" color={lime} />
        <Tile x={448} y={133} label="Music research" color={pale} width={282} />
        <Tile
          x={448}
          y={229}
          label="Catalog workflows"
          color={lime}
          width={282}
        />
        <Tile x={448} y={325} label="Content tools" color={pale} width={282} />
      </>
    ),
  },
};

export function ArticleArt({ slug }: { slug: string }) {
  const art = artwork[slug];
  if (!art) throw new Error(`Missing editorial thumbnail for ${slug}`);
  const light = art.background === blue || art.background === green;
  return (
    <svg
      viewBox="0 0 800 500"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="blog-article-illustration"
      data-article-art={slug}
    >
      <rect width="800" height="500" fill={art.background} />
      <text
        x="56"
        y="66"
        fill={light ? "#dbefec" : "#4b6871"}
        fontSize="20"
        fontFamily="IBM Plex Mono, monospace"
        letterSpacing="1.2"
      >
        {art.label}
      </text>
      {art.scene}
    </svg>
  );
}
