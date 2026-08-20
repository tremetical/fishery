import type { JSX } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { store } from '../lib/store';

/*
 * Interactive airspace cross-section — the PHAK figure, but tappable.
 * Altitude axis is non-linear (compressed up high) so the low-altitude
 * airspace you actually fly in gets the pixels.
 */

type ClassId = 'A' | 'B' | 'C' | 'D' | 'E' | 'G';

interface ClassInfo {
  name: string;
  dims: string;
  entry: string;
  equip: string;
  vfrMin: string;
  chart: string;
  note?: string;
}

const INFO: Record<ClassId, ClassInfo> = {
  A: {
    name: 'Class A',
    dims: '18,000 ft MSL up to and including FL600.',
    entry: 'IFR only: IFR flight plan, clearance, instrument-rated pilot.',
    equip: 'IFR equipment; altimeter on 29.92 (flight levels).',
    vfrMin: 'VFR not permitted.',
    chart: 'Not charted — it’s everywhere up there.',
  },
  B: {
    name: 'Class B',
    dims: 'Surface to ~10,000 ft MSL (Seattle: 10,000), in an upside-down wedding cake of shelves.',
    entry: 'ATC clearance — you must hear “cleared into the Class Bravo.” Private certificate (or endorsed student; some Bravos prohibit student solos, KSEA included).',
    equip: 'Two-way radio, Mode C transponder, ADS-B Out — required in the Bravo, above it, and throughout the 30 NM Mode C veil.',
    vfrMin: '3 SM visibility, clear of clouds.',
    chart: 'Solid blue lines; shelf altitudes like 100/30 (10,000 ceiling / 3,000 floor).',
    note: 'Cites: 14 CFR 91.131, 91.155, 91.215, 91.225.',
  },
  C: {
    name: 'Class C',
    dims: 'Core: 5 NM radius, surface to 4,000 ft above airport. Shelf: 10 NM, 1,200–4,000 ft above airport.',
    entry: 'Two-way radio communications established (they say your callsign). No clearance words needed.',
    equip: 'Two-way radio, Mode C, ADS-B Out (in and above the C).',
    vfrMin: '3 SM · 500 below / 1,000 above / 2,000 horizontal.',
    chart: 'Solid magenta rings with ceiling/floor numbers per ring.',
    note: 'Cites: 14 CFR 91.130, 91.155.',
  },
  D: {
    name: 'Class D',
    dims: 'Typically ~4 NM radius, surface to 2,500 ft above the airport (KTIW, KOLM, KRNT).',
    entry: 'Two-way radio communications established with the tower.',
    equip: 'Two-way radio.',
    vfrMin: '3 SM · 500 / 1,000 / 2,000.',
    chart: 'Dashed blue circle; ceiling in a dashed box, e.g. [25] = 2,500 MSL.',
    note: 'Tower closed? Check the Chart Supplement — usually reverts to E or G. Cites: 91.129, 91.155.',
  },
  E: {
    name: 'Class E',
    dims: 'Controlled airspace that isn’t A/B/C/D. Floors: surface (dashed magenta), 700 AGL (magenta vignette), 1,200 AGL (blue vignette / most everywhere), or 14,500 MSL. Tops at 18,000.',
    entry: 'None for VFR — no radio, no clearance.',
    equip: 'None below 10,000 MSL. ADS-B Out at/above 10,000 MSL (above 2,500 AGL).',
    vfrMin: 'Below 10,000 MSL: 3 SM · 500/1,000/2,000. At/above 10,000: 5 SM · 1,000/1,000/1 SM.',
    chart: 'Magenta/blue vignette edges; dashed magenta for surface areas.',
    note: 'Cites: 14 CFR 91.155, 91.225; AIM 3-2-6.',
  },
  G: {
    name: 'Class G',
    dims: 'Uncontrolled: surface up to the overlying Class E floor (700 or 1,200 AGL typically; up to 14,500 in remote areas).',
    entry: 'None. Nobody is providing separation — see and avoid.',
    equip: 'None.',
    vfrMin: 'Day ≤1,200 AGL: 1 SM, clear of clouds · Night ≤1,200: 3 SM, 500/1,000/2,000 (pattern exception: 1 SM COC) · Day above 1,200 & <10,000 MSL: 1 SM, 500/1,000/2,000 · At/above 10,000 MSL: 5 SM, 1,000/1,000/1 SM.',
    chart: 'It’s what’s left under the vignettes.',
    note: 'Cite: 14 CFR 91.155 table.',
  },
};

const ROWS: { k: keyof ClassInfo; label: string }[] = [
  { k: 'dims', label: 'Dimensions' },
  { k: 'entry', label: 'Entry' },
  { k: 'equip', label: 'Equipment' },
  { k: 'vfrMin', label: 'VFR minimums' },
  { k: 'chart', label: 'On the chart' },
];

export function ToolAirspacePage(): JSX.Element {
  const [sel, setSelRaw] = useState<ClassId>('B');
  const explored = useRef<Set<ClassId>>(new Set(['B']));
  const setSel = (id: ClassId) => {
    if (!explored.current.has(id)) {
      explored.current.add(id);
      void store.bumpDrill('airspace');
    }
    setSelRaw(id);
  };
  const info = INFO[sel];

  const cls = (id: ClassId) => `as-region ${sel === id ? 'as-sel' : ''}`;

  return (
    <div class="stack">
      <h1 class="page-h">
        Airspace explorer
        <span class="sub">Tap a region — or a letter — to see its rules.</span>
      </h1>

      <div class="panel" style="padding: 8px">
        <svg viewBox="0 0 380 262" class="as-svg" role="img" aria-label="Airspace cross-section diagram">
          {/* Class E background (floor 1,200 AGL generally) */}
          <rect class={cls('E')} onClick={() => setSel('E')} x="0" y="66" width="380" height="126" fill="var(--as-e)" />
          {/* E down to 700 in the vignette zone (right) */}
          <rect class={cls('E')} onClick={() => setSel('E')} x="306" y="192" width="74" height="12" fill="var(--as-e)" />

          {/* Class G below */}
          <rect class={cls('G')} onClick={() => setSel('G')} x="0" y="204" width="380" height="28" fill="var(--as-g)" />
          <rect class={cls('G')} onClick={() => setSel('G')} x="0" y="192" width="306" height="12" fill="var(--as-g)" />

          {/* Class A on top */}
          <rect class={cls('A')} onClick={() => setSel('A')} x="0" y="16" width="380" height="50" fill="var(--as-b)" opacity="0.9" />

          {/* Class B wedding cake (left) */}
          <g class={cls('B')} onClick={() => setSel('B')}>
            <rect x="2" y="110" width="116" height="28" fill="var(--as-b)" />
            <rect x="14" y="138" width="92" height="24" fill="var(--as-b)" />
            <rect x="28" y="162" width="64" height="70" fill="var(--as-b)" />
          </g>

          {/* Class D cylinder (center) */}
          <rect class={cls('D')} onClick={() => setSel('D')} x="140" y="168" width="52" height="64" fill="var(--as-d)" />

          {/* Class C cake (right-center) */}
          <g class={cls('C')} onClick={() => setSel('C')}>
            <rect x="202" y="152" width="92" height="40" fill="var(--as-c)" />
            <rect x="216" y="192" width="64" height="40" fill="var(--as-c)" />
          </g>

          {/* ground */}
          <rect x="0" y="232" width="380" height="4" fill="var(--line-strong)" />

          {/* airports */}
          <g fill="var(--text)" font-size="9" font-family="var(--font-mono)" text-anchor="middle">
            <rect x="52" y="228" width="16" height="4" fill="var(--text)" />
            <text x="60" y="246">SEA</text>
            <rect x="158" y="228" width="16" height="4" fill="var(--text)" />
            <text x="166" y="246">TIW</text>
            <rect x="240" y="228" width="16" height="4" fill="var(--text)" />
            <text x="248" y="246">C</text>
            <rect x="336" y="228" width="16" height="4" fill="var(--text)" />
            <text x="344" y="246">PWT</text>
          </g>

          {/* altitude labels */}
          <g fill="var(--text-dim)" font-size="8.5" font-family="var(--font-mono)">
            <text x="4" y="14">FL600</text>
            <text x="376" y="63" text-anchor="end">18,000 MSL</text>
            <text x="376" y="107" text-anchor="end">10,000 MSL</text>
            <line x1="0" y1="66" x2="380" y2="66" stroke="var(--line-strong)" stroke-dasharray="4 3" stroke-width="0.8" />
            <line x1="120" y1="110" x2="380" y2="110" stroke="var(--line)" stroke-dasharray="2 3" stroke-width="0.6" />
            <text x="196" y="165" text-anchor="end">4,000</text>
            <text x="138" y="182" text-anchor="end">2,500</text>
            <text x="300" y="190" text-anchor="end">1,200 AGL</text>
            <text x="376" y="202" text-anchor="end">700</text>
          </g>

          {/* class letters */}
          <g class="as-letters" font-size="17" font-weight="bold" text-anchor="middle" fill="var(--text)">
            <text x="190" y="48" onClick={() => setSel('A')}>A</text>
            <text x="60" y="200" onClick={() => setSel('B')}>B</text>
            <text x="248" y="178" onClick={() => setSel('C')}>C</text>
            <text x="166" y="205" onClick={() => setSel('D')}>D</text>
            <text x="190" y="140" onClick={() => setSel('E')}>E</text>
            <text x="264" y="224" onClick={() => setSel('G')}>G</text>
          </g>
        </svg>

        <div class="seg mt" role="tablist" aria-label="Airspace class">
          {(['A', 'B', 'C', 'D', 'E', 'G'] as ClassId[]).map((id) => (
            <button key={id} class={sel === id ? 'active' : ''} onClick={() => setSel(id)}>
              {id}
            </button>
          ))}
        </div>
      </div>

      <div class="panel">
        <h2 style="margin-bottom: 10px">{info.name}</h2>
        {ROWS.map(({ k, label }) => (
          <div key={k} class="mt" style="margin-top: 8px">
            <div class="tiny dim" style="text-transform: uppercase; letter-spacing: 0.07em">
              {label}
            </div>
            <div class="small">{info[k]}</div>
          </div>
        ))}
        {info.note && <p class="tiny faint mt">{info.note}</p>}
      </div>
    </div>
  );
}
