import type { JSX } from 'preact';

/*
 * Training figures for figure-based exam questions. Drawn by the app (SVG/
 * HTML) in the style of sectional charts, POH tables, and instruments —
 * NOT real locations or a real POH. Questions and figures derive from the
 * same data here, so answers are correct by construction. All colors run
 * through theme tokens, so figures stay legible in day/dark/night modes.
 *
 * The real knowledge test uses the FAA Airman Knowledge Testing Supplement
 * (FAA-CT-8080) — flip through a copy before test day so its print style
 * is familiar.
 */

/* ---------- Figure 1: sectional-style excerpt ---------- */

function SectionalFigure(): JSX.Element {
  return (
    <svg viewBox="0 0 380 300" style="width:100%" role="img" aria-label="Sectional chart style training figure">
      {/* land */}
      <rect x="0" y="0" width="380" height="300" fill="var(--surface-2)" />
      {/* Class E 700ft vignette (magenta ring w/ soft inside) */}
      <circle cx="120" cy="180" r="104" fill="var(--special)" fill-opacity="0.10" />
      <circle cx="120" cy="180" r="104" fill="none" stroke="var(--special)" stroke-width="7" stroke-opacity="0.35" />
      {/* Class D dashed blue around towered airport */}
      <circle cx="120" cy="180" r="58" fill="none" stroke="var(--info)" stroke-width="1.8" stroke-dasharray="6 4" />
      {/* D ceiling box [25] */}
      <g transform="translate(150,128)">
        <rect x="0" y="0" width="28" height="16" fill="none" stroke="var(--info)" stroke-dasharray="3 2" />
        <text x="14" y="12" text-anchor="middle" font-size="11" fill="var(--info)" font-family="var(--font-mono)">25</text>
      </g>

      {/* towered airport: blue circle with runway ticks + beacon star + services ticks */}
      <g stroke="var(--info)" fill="none">
        <circle cx="120" cy="180" r="13" stroke-width="2" />
        <line x1="112" y1="188" x2="128" y2="172" stroke-width="4" />
        {/* fuel ticks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            key={a}
            x1={120 + 15 * Math.cos((a * Math.PI) / 180)}
            y1={180 + 15 * Math.sin((a * Math.PI) / 180)}
            x2={120 + 19 * Math.cos((a * Math.PI) / 180)}
            y2={180 + 19 * Math.sin((a * Math.PI) / 180)}
            stroke-width="1.6"
          />
        ))}
      </g>
      <path d="M120 158 l2.5 5.5 6 .5 -4.5 4 1.5 6 -5.5 -3.2 -5.5 3.2 1.5 -6 -4.5 -4 6 -.5 z" fill="var(--info)" />
      <text x="120" y="216" text-anchor="middle" font-size="10" font-weight="bold" fill="var(--info)">HARBOR (HBR)</text>
      <text x="120" y="228" text-anchor="middle" font-size="8.5" fill="var(--info)" font-family="var(--font-mono)">CT-118.3 ★ · 312 L 50 · 122.95</text>

      {/* non-towered magenta airport upper right */}
      <g stroke="var(--special)" fill="none">
        <circle cx="300" cy="70" r="11" stroke-width="2" />
        <line x1="293" y1="63" x2="307" y2="77" stroke-width="4" />
      </g>
      <text x="300" y="94" text-anchor="middle" font-size="9.5" font-weight="bold" fill="var(--special)">ELK MEADOW</text>
      <text x="300" y="105" text-anchor="middle" font-size="8.5" fill="var(--special)" font-family="var(--font-mono)">1180 · 26 · 122.9</text>

      {/* obstruction with numbers */}
      <g transform="translate(228,196)">
        <path d="M0 22 L7 0 L14 22 Z M2 16 h10" fill="none" stroke="var(--text)" stroke-width="1.6" />
        <path d="M7 0 l-4 -7 M7 0 l4 -7" stroke="var(--caution)" stroke-width="1.3" fill="none" />
        <text x="20" y="8" font-size="9.5" font-weight="bold" fill="var(--text)" font-family="var(--font-mono)">2049</text>
        <text x="20" y="19" font-size="9" fill="var(--text-dim)" font-family="var(--font-mono)">(1149)</text>
      </g>

      {/* MEF */}
      <text x="330" y="180" font-size="22" font-weight="bold" fill="var(--info)" font-family="var(--font-mono)">
        3<tspan font-size="13" dy="-7">4</tspan>
      </text>

      {/* VOR compass rose + VORTAC symbol upper-left */}
      <g transform="translate(60,60)">
        <circle r="42" fill="none" stroke="var(--info)" stroke-width="0.8" opacity="0.7" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
          <line
            key={a}
            x1={38 * Math.sin((a * Math.PI) / 180)}
            y1={-38 * Math.cos((a * Math.PI) / 180)}
            x2={42 * Math.sin((a * Math.PI) / 180)}
            y2={-42 * Math.cos((a * Math.PI) / 180)}
            stroke="var(--info)"
            stroke-width="1"
          />
        ))}
        {/* VORTAC: hexagon + 3 lobes */}
        <path d="M-7 -4 L0 -8 L7 -4 L7 4 L0 8 L-7 4 Z" fill="none" stroke="var(--info)" stroke-width="1.6" />
        <rect x="-3" y="-12" width="6" height="4" fill="var(--info)" />
        <rect x="5" y="6" width="6" height="4" fill="var(--info)" transform="rotate(120)" />
        <rect x="5" y="6" width="6" height="4" fill="var(--info)" transform="rotate(-120)" />
        <text x="0" y="-48" text-anchor="middle" font-size="8.5" fill="var(--info)" font-family="var(--font-mono)">SALISH 114.2 SAL</text>
      </g>

      {/* victor airway */}
      <line x1="60" y1="60" x2="300" y2="70" stroke="var(--info)" stroke-width="4" opacity="0.35" />
      <text x="185" y="58" font-size="9" fill="var(--info)" font-family="var(--font-mono)">V-287</text>

      {/* restricted area lower right */}
      <g>
        <path d="M270 240 L370 225 L370 295 L280 295 Z" fill="none" stroke="var(--info)" stroke-width="2" />
        <path d="M270 240 L370 225 M275 252 L370 238 M280 264 L370 251" stroke="var(--info)" stroke-width="1" opacity="0.6" />
        <text x="322" y="278" text-anchor="middle" font-size="10" font-weight="bold" fill="var(--info)" font-family="var(--font-mono)">R-5501</text>
      </g>

      {/* checkpoint flag */}
      <g transform="translate(196,150)">
        <line x1="0" y1="0" x2="0" y2="-14" stroke="var(--special)" stroke-width="1.6" />
        <path d="M0 -14 L11 -10.5 L0 -7 Z" fill="var(--special)" />
        <text x="14" y="-4" font-size="8.5" fill="var(--special)">BRIDGE</text>
      </g>

      {/* parachute symbol */}
      <g transform="translate(58,258)" stroke="var(--special)" fill="none" stroke-width="1.4">
        <path d="M-7 0 A7 7 0 0 1 7 0" />
        <path d="M-7 0 L0 9 L7 0" />
        <circle cx="0" cy="11" r="1.6" fill="var(--special)" />
      </g>

      <text x="8" y="293" font-size="8" fill="var(--text-faint)">TRAINING FIGURE — chart-style symbology, not a real location</text>
    </svg>
  );
}

/* ---------- Figure 2: takeoff performance table ---------- */

export const PERF_TABLE = {
  // short-field takeoff, flaps 10°, paved level dry runway, no wind, 2,400 lb
  // rows: pressure altitude; cols: temp °C → [ground roll, total over 50 ft]
  temps: [0, 20, 40],
  rows: [
    { pa: 'Sea level', roll: [795, 925, 1065], fifty: [1460, 1625, 1810] },
    { pa: '2,000 ft', roll: [925, 1075, 1240], fifty: [1685, 1880, 2100] },
    { pa: '4,000 ft', roll: [1080, 1260, 1465], fifty: [1975, 2210, 2480] },
  ],
  notes: [
    'Short-field technique, flaps 10°, paved level dry runway, zero wind, 2,400 lb.',
    'NOTE 1: Decrease distances 10% for each 9 knots of headwind.',
    'NOTE 2: For operation on dry grass, increase the “ground roll” figure by 15%.',
  ],
};

function PerfTableFigure(): JSX.Element {
  const t = PERF_TABLE;
  return (
    <div style="overflow-x:auto">
      <table style="border-collapse:collapse; width:100%; font-family:var(--font-mono); font-size:11.5px">
        <thead>
          <tr>
            <th style="border:1px solid var(--line-strong); padding:4px" rowSpan={2}>Press. alt</th>
            {t.temps.map((c) => (
              <th key={c} style="border:1px solid var(--line-strong); padding:4px" colSpan={2}>{c}°C</th>
            ))}
          </tr>
          <tr>
            {t.temps.map((c) => (
              <>
                <th key={c + 'r'} style="border:1px solid var(--line-strong); padding:4px; font-weight:400">roll</th>
                <th key={c + 'f'} style="border:1px solid var(--line-strong); padding:4px; font-weight:400">50 ft</th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {t.rows.map((r) => (
            <tr key={r.pa}>
              <td style="border:1px solid var(--line); padding:4px">{r.pa}</td>
              {t.temps.map((_, i) => (
                <>
                  <td style="border:1px solid var(--line); padding:4px; text-align:right">{r.roll[i]}</td>
                  <td style="border:1px solid var(--line); padding:4px; text-align:right">{r.fifty[i]}</td>
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div class="tiny dim" style="margin-top:6px">
        {t.notes.map((n) => (
          <div key={n}>{n}</div>
        ))}
      </div>
      <div class="tiny faint">TRAINING FIGURE — POH-style data for a fictional trainer.</div>
    </div>
  );
}

/* ---------- Figure 3: W&B envelope ---------- */

function WbEnvelopeFigure(): JSX.Element {
  // CG 33–49" → x 40–360 ; weight 1500–2600 → y 155–10
  const X = (cg: number) => 40 + ((cg - 33) / 16) * 320;
  const Y = (w: number) => 155 - ((w - 1500) / 1100) * 145;
  const path = `M ${X(35)} ${Y(1500)} L ${X(35)} ${Y(1950)} L ${X(38.5)} ${Y(2400)} L ${X(47.3)} ${Y(2400)} L ${X(47.3)} ${Y(1500)} Z`;
  return (
    <svg viewBox="0 0 380 195" style="width:100%" role="img" aria-label="Weight and balance envelope training figure">
      {[34, 38, 42, 46].map((cg) => (
        <line key={cg} x1={X(cg)} y1={Y(2600)} x2={X(cg)} y2={Y(1500)} stroke="var(--line)" stroke-width="0.6" />
      ))}
      {[1600, 1800, 2000, 2200, 2400].map((w) => (
        <line key={w} x1={X(33)} y1={Y(w)} x2={X(49)} y2={Y(w)} stroke="var(--line)" stroke-width="0.6" />
      ))}
      <path d={path} fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6" />
      <g fill="var(--text-dim)" font-size="9" font-family="var(--font-mono)">
        {[34, 38, 42, 46].map((cg) => (
          <text key={cg} x={X(cg)} y="176" text-anchor="middle">{cg}"</text>
        ))}
        {[1600, 2000, 2400].map((w) => (
          <text key={w} x="36" y={Y(w) + 3} text-anchor="end">{w}</text>
        ))}
        <text x="200" y="192" text-anchor="middle">CG — inches aft of datum</text>
      </g>
      {/* plotted points A, B, C */}
      <g font-size="10" font-weight="bold" font-family="var(--font-mono)">
        <circle cx={X(42)} cy={Y(2250)} r="5" fill="var(--info)" />
        <text x={X(42) + 9} y={Y(2250) + 4} fill="var(--info)">A</text>
        <circle cx={X(36.5)} cy={Y(2300)} r="5" fill="var(--special)" />
        <text x={X(36.5) + 9} y={Y(2300) + 4} fill="var(--special)">B</text>
        <circle cx={X(48.2)} cy={Y(2100)} r="5" fill="var(--caution)" />
        <text x={X(48.2) + 9} y={Y(2100) + 4} fill="var(--caution)">C</text>
      </g>
      <text x="8" y="12" font-size="8" fill="var(--text-faint)">TRAINING FIGURE — normal category envelope, fictional trainer</text>
    </svg>
  );
}

/* ---------- Figure 4: airspeed indicator ---------- */

export const ASI = { vs0: 40, vs1: 47, vfe: 85, vno: 129, vne: 163 };

function AsiFigure(): JSX.Element {
  // map 30–170 kt to angle 210°→510° (clockwise dial)
  const ang = (kt: number) => ((kt - 30) / 140) * 300 + 120;
  const arc = (from: number, to: number, r: number, color: string, w: number) => {
    const a1 = (ang(from) * Math.PI) / 180;
    const a2 = (ang(to) * Math.PI) / 180;
    const large = ang(to) - ang(from) > 180 ? 1 : 0;
    return (
      <path
        d={`M ${100 + r * Math.sin(a1)} ${100 - r * Math.cos(a1)} A ${r} ${r} 0 ${large} 1 ${100 + r * Math.sin(a2)} ${100 - r * Math.cos(a2)}`}
        fill="none"
        stroke={color}
        stroke-width={w}
      />
    );
  };
  return (
    <svg viewBox="0 0 200 200" style="width:min(100%,300px); display:block; margin:0 auto" role="img" aria-label="Airspeed indicator training figure">
      <circle cx="100" cy="100" r="96" fill="var(--surface-2)" stroke="var(--line-strong)" stroke-width="2" />
      {arc(ASI.vs0, ASI.vfe, 78, 'var(--text)', 6)}
      {arc(ASI.vs1, ASI.vno, 86, 'var(--accent)', 6)}
      {arc(ASI.vno, ASI.vne, 86, 'var(--caution)', 6)}
      {arc(ASI.vne, ASI.vne + 3, 86, 'var(--warning)', 8)}
      {[40, 60, 80, 100, 120, 140, 160].map((kt) => {
        const a = (ang(kt) * Math.PI) / 180;
        return (
          <g key={kt}>
            <line
              x1={100 + 62 * Math.sin(a)} y1={100 - 62 * Math.cos(a)}
              x2={100 + 70 * Math.sin(a)} y2={100 - 70 * Math.cos(a)}
              stroke="var(--text)" stroke-width="2"
            />
            <text x={100 + 50 * Math.sin(a)} y={100 - 50 * Math.cos(a) + 4} text-anchor="middle" font-size="12" fill="var(--text)" font-family="var(--font-mono)">
              {kt}
            </text>
          </g>
        );
      })}
      <text x="100" y="150" text-anchor="middle" font-size="9" fill="var(--text-dim)">AIRSPEED · KNOTS</text>
      {/* needle at 95 kt */}
      <line x1="100" y1="100" x2={100 + 58 * Math.sin((ang(95) * Math.PI) / 180)} y2={100 - 58 * Math.cos((ang(95) * Math.PI) / 180)} stroke="var(--text)" stroke-width="3.5" />
      <circle cx="100" cy="100" r="6" fill="var(--text)" />
      <text x="100" y="196" text-anchor="middle" font-size="7.5" fill="var(--text-faint)">TRAINING FIGURE</text>
    </svg>
  );
}

/* ---------- Figure 5: VOR indicator ---------- */

function VorFigure(): JSX.Element {
  return (
    <svg viewBox="0 0 200 200" style="width:min(100%,300px); display:block; margin:0 auto" role="img" aria-label="VOR indicator training figure">
      <circle cx="100" cy="100" r="96" fill="var(--surface-2)" stroke="var(--line-strong)" stroke-width="2" />
      {/* compass card: 030 at top */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const shown = (deg + 30) % 360; // card rotated so 030 is up
        const a = (deg * Math.PI) / 180;
        return (
          <text
            key={deg}
            x={100 + 74 * Math.sin(a)}
            y={100 - 74 * Math.cos(a) + 4}
            text-anchor="middle"
            font-size="10"
            fill="var(--text-dim)"
            font-family="var(--font-mono)"
          >
            {shown === 0 ? 'N' : shown / 10}
          </text>
        );
      })}
      <path d="M100 10 l-5 10 h10 z" fill="var(--caution)" />
      {/* CDI scale dots */}
      {[-40, -30, -20, -10, 10, 20, 30, 40].map((dx) => (
        <circle key={dx} cx={100 + dx} cy="100" r="2" fill="var(--text-faint)" />
      ))}
      {/* needle deflected right (2 dots) */}
      <line x1="120" y1="55" x2="120" y2="145" stroke="var(--text)" stroke-width="3.5" />
      {/* TO/FROM: FROM triangle pointing down */}
      <path d="M138 112 l6 -10 h-12 z" transform="rotate(180 138 107)" fill="var(--accent)" />
      <text x="138" y="130" text-anchor="middle" font-size="8" fill="var(--accent)">FROM</text>
      <text x="62" y="126" text-anchor="middle" font-size="8" fill="var(--text-dim)">OBS 030</text>
      <text x="100" y="196" text-anchor="middle" font-size="7.5" fill="var(--text-faint)">TRAINING FIGURE</text>
    </svg>
  );
}

/* ---------- registry ---------- */

export const FIGURES: Record<string, { title: string; render: () => JSX.Element }> = {
  'sectional-1': { title: 'Chart excerpt (training figure)', render: SectionalFigure },
  'perf-1': { title: 'Short-field takeoff distance (training figure)', render: PerfTableFigure },
  'wb-env-1': { title: 'CG envelope (training figure)', render: WbEnvelopeFigure },
  'asi-1': { title: 'Airspeed indicator (training figure)', render: AsiFigure },
  'vor-1': { title: 'VOR indicator (training figure)', render: VorFigure },
};

export function Figure(props: { id: string }): JSX.Element | null {
  const f = FIGURES[props.id];
  if (!f) return null;
  return (
    <div class="panel" style="padding: 10px; margin: 10px 0; background: var(--surface-2)">
      {f.render()}
    </div>
  );
}
