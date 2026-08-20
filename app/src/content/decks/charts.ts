import { deck } from '../types';

/*
 * Sectional chart symbology. Best studied with a real Seattle sectional
 * open in your lap — every one of these appears within 30 NM of KTIW.
 */

export const chartsDeck = deck(
  {
    id: 'charts',
    subject: 'charts',
    title: 'Sectional symbology',
    description:
      'Airports, obstructions, airspace boundary line styles, navaids, and the fine print in each quadrangle.',
  },
  [
    {
      slug: 'blue-magenta-apt',
      front: 'Airport printed in **blue** vs **magenta** — the difference?',
      back: 'Blue: has a control tower. Magenta: no tower.',
      why: 'KTIW, KRNT, KOLM are blue; KPWT and KPLU are magenta.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'apt-shape',
      front: 'When is an airport drawn with its actual **runway layout** instead of a circle?',
      back: 'Hard-surfaced runways longer than 8,069 ft — or shorter hard runways get the circle with runway orientation inside; all-water or unpaved use other symbols.',
      why: 'Circle-with-runways = paved 1,500–8,069 ft. Big airports like KSEA show true layout.',
      cite: 'FAA Chart Users’ Guide',
      unverified: true,
    },
    {
      slug: 'apt-ticks',
      front: 'Small **ticks** around an airport circle mean?',
      back: 'Fuel is available and the field is attended (at least during normal working hours).',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'apt-star',
      front: 'A **star** on top of the airport symbol means?',
      back: 'A rotating beacon operates sunset to sunrise.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'apt-r',
      front: '“Pvt” or an **R** in the airport symbol?',
      back: 'Private airport — use only with prior permission (an R in a circle is a restricted/private field marker).',
      cite: 'FAA Chart Users’ Guide',
      unverified: true,
    },
    {
      slug: 'apt-data-line',
      front: 'Decode the airport data block: `TACOMA NARROWS (TIW)  CT-118.5 ★  ATIS 124.05  294  L 50  122.95`',
      back: 'Name/ID · control tower 118.5 (★ = part-time) · ATIS frequency · field elevation 294 ft MSL · L = lighting sunset–sunrise · runway 5,000 ft · UNICOM 122.95.',
      why: 'The star after the tower frequency is the tell that the D goes away at night.',
      cite: 'FAA Chart Users’ Guide',
      unverified: true,
    },
    {
      slug: 'mef',
      front: 'The big blue **quadrangle number** like 4³ — what is the MEF?',
      back: 'Maximum Elevation Figure: the highest terrain or obstruction in that lat/long quadrangle, rounded UP to the next hundred feet (here 4,300 MSL).',
      why: 'It is not a safe clearance altitude — add your own margin. It already includes allowances for unknown obstacles.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'obst-symbols',
      front: 'Obstruction symbols: plain vs with a “double” shape — what splits them?',
      back: 'Single symbol: below 1,000 AGL. Taller symbol (looks like a double spire): 1,000 AGL or higher. Lightning marks = lit at night.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'obst-numbers',
      front: 'An obstruction shows `2049` over `(1149)` — decode.',
      back: 'Top of the obstacle is 2,049 ft MSL; (1,149) is its height AGL.',
      why: 'MSL for your altimeter, AGL for your imagination.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'obst-uc',
      front: '`UC` beside an obstruction symbol?',
      back: 'Under construction — height shown may not be final, and lighting may not exist yet.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'line-b',
      front: 'Airspace line: **solid blue** ring around a big airport?',
      back: 'Class B boundary (with altitudes like `100/30` = 10,000 MSL ceiling / 3,000 floor for that shelf).',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'line-c',
      front: 'Airspace line: **solid magenta** rings?',
      back: 'Class C — each ring labeled with ceiling/floor in hundreds of feet MSL, e.g. `40/12` = 4,000 ceiling, 1,200 floor; `SFC` as the floor on the core.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'line-d',
      front: 'Airspace line: **dashed blue**?',
      back: 'Class D — with the ceiling in a dashed box, e.g. [25] = 2,500 MSL (a minus sign means “up to but not including”).',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'line-e-sfc',
      front: 'Airspace line: **dashed magenta**?',
      back: 'Class E surface area — controlled airspace to the ground, usually protecting instrument approaches.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'magenta-vignette',
      front: 'The fuzzy **magenta shading** (vignette) — what’s inside vs outside?',
      back: 'Inside the shaded ring: Class E starts at 700 AGL. Outside: E starts at 1,200 AGL (or as charted).',
      why: 'Below those floors you’re in Class G. The soft edge of the vignette faces the 700-ft side.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'blue-vignette',
      front: 'The fuzzy **blue vignette** on a sectional?',
      back: 'Outside/hard side: Class G extends up to 14,500 MSL. Soft side: Class E begins at 1,200 AGL.',
      why: 'Mostly seen out west and in Alaska — relevant to where you’re headed.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'vor-symbol',
      front: 'Chart symbols: **VOR** vs **VORTAC** vs **VOR-DME**?',
      back: 'VOR: plain hexagon with center dot. VORTAC: hexagon with three filled “propeller” lobes. VOR-DME: hexagon inside a square.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'ndb-symbol',
      front: 'Chart symbol for an **NDB**?',
      back: 'A magenta circle of small dots with a center dot.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'victor',
      front: 'Light blue lines labeled like **V-2** are what?',
      back: 'Victor airways — 8 NM wide corridors between VORs, from 1,200 AGL up to (not including) 18,000 MSL.',
      cite: 'AIM 5-3-6; Chart Users’ Guide',
    },
    {
      slug: 'isogonic',
      front: 'The dashed magenta line labeled **15°E** across the chart?',
      back: 'Isogonic line — magnetic variation. Subtract easterly variation from true course to get magnetic (“East is least”).',
      why: 'Puget Sound is around 15°E variation.',
      cite: 'PHAK Ch. 16; Chart Users’ Guide',
    },
    {
      slug: 'sua-chart',
      front: 'How do **restricted/prohibited** areas vs **MOAs** appear?',
      back: 'R/P/W/A areas: blue hatched borders labeled R-6703, P-51, etc. MOAs: magenta hatched borders with the MOA name.',
      why: 'Times, altitudes, and controlling agency live in the chart margin table — read it before assuming cold.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'flag-checkpoint',
      front: 'A magenta **flag** symbol marks what?',
      back: 'A VFR checkpoint — a visual reporting point ATC expects you to know by name.',
      why: 'Approach may say “report the Narrows Bridge.” The flags tell you which landmarks count.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'parachute',
      front: 'A small **parachute** symbol near an airport?',
      back: 'Parachute jumping activity — expect jumpers and jump planes climbing/descending aggressively. Check the Chart Supplement for times.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'glider-ultralight',
      front: 'A **G** in a circle... vs glider/hang-glider symbols on charts?',
      back: 'Glider, ultralight, and hang glider activity symbols mark soaring sites — traffic without transponders or radios, often near ridges.',
      cite: 'FAA Chart Users’ Guide',
      unverified: true,
    },
    {
      slug: 'ctaf-circle-c',
      front: 'The **C in a solid circle** after a frequency?',
      back: 'CTAF — the common traffic advisory frequency for that airport.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'contours',
      front: 'Terrain on sectionals: what do color tiers and contour lines give you?',
      back: 'Elevation banding (green low → brown high) with contour lines and spot elevations; the highest terrain on the chart face is noted in the title block.',
      cite: 'FAA Chart Users’ Guide',
    },
    {
      slug: 'wac-scale',
      front: 'Sectional chart **scale** and update cycle?',
      back: '1:500,000 (about 7 NM per inch), revised every 56 days.',
      why: 'Terminal Area Charts (around Bravos like Seattle) are 1:250,000 — twice the detail; use the TAC when threading the veil.',
      cite: 'FAA Chart Users’ Guide',
    },
  ],
);
