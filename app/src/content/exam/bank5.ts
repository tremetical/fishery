import { qbank } from './types';

/*
 * Figure-based questions. Each references a training figure drawn by the
 * app (components/figures.tsx); the question data and the figure share one
 * source, so the keyed answer always matches the picture.
 */

export const sectionalFigQuestions = qbank('fg-sec', 'charts', [
  {
    slug: 'd-ceiling',
    figure: 'sectional-1',
    q: '(Refer to the figure.) The ceiling of the Class D airspace at HARBOR is —',
    choices: ['2,500 ft MSL', '2,500 ft AGL', '3,400 ft MSL'],
    answer: 0,
    why: 'The dashed box [25] gives the Class D ceiling in hundreds of feet MSL. (3,400 is the quadrangle MEF — different number, different job.)',
    cite: 'FAA Chart Users’ Guide',
  },
  {
    slug: 'obst-agl',
    figure: 'sectional-1',
    q: '(Refer to the figure.) The height of the charted obstruction above the GROUND is —',
    choices: ['2,049 ft', '1,149 ft', '900 ft'],
    answer: 1,
    why: 'The parenthetical number is AGL; the bold 2,049 is the top’s MSL elevation. The lightning marks mean it’s lit.',
    cite: 'FAA Chart Users’ Guide',
  },
  {
    slug: 'mef-read',
    figure: 'sectional-1',
    q: '(Refer to the figure.) The 3⁴ quadrangle figure means the highest terrain or obstruction in the quadrangle is —',
    choices: [
      'no higher than 3,400 ft MSL',
      'exactly 3,400 ft AGL',
      'a safe cruising altitude of 3,400 ft',
    ],
    answer: 0,
    why: 'The MEF is the highest feature rounded UP to the next 100 ft — 3,400 MSL here. It contains no buffer for you; add your own.',
    cite: 'FAA Chart Users’ Guide',
  },
  {
    slug: 'elk-comm',
    figure: 'sectional-1',
    q: '(Refer to the figure.) Approaching ELK MEADOW to land, you should —',
    choices: [
      'contact the tower on 118.3',
      'self-announce on the CTAF, 122.9',
      'request Special VFR from the VORTAC',
    ],
    answer: 1,
    why: 'ELK MEADOW is magenta — non-towered. Its data block lists 122.9; HARBOR’s tower frequency belongs to HARBOR.',
    cite: 'AIM 4-1-9; Chart Users’ Guide',
  },
  {
    slug: 'vignette-read',
    figure: 'sectional-1',
    q: '(Refer to the figure.) Inside the shaded magenta ring surrounding HARBOR, Class E airspace begins at —',
    choices: ['the surface', '700 ft AGL', '1,200 ft AGL'],
    answer: 1,
    why: 'The magenta vignette lowers the Class E floor to 700 AGL inside the ring (1,200 outside). The dashed blue circle is the Class D, a separate thing.',
    cite: 'AIM 3-2-6',
  },
  {
    slug: 'restricted-fig',
    figure: 'sectional-1',
    q: '(Refer to the figure.) Before flying through R-5501 you must —',
    choices: [
      'obtain permission if it is active (check status with FSS/ATC)',
      'merely monitor 121.5 while inside',
      'nothing — the hatched border is advisory',
    ],
    answer: 0,
    why: 'Blue-hatched R-#### = restricted area: invisible hazards like gunnery. Entry when active requires authorization; check times/status before flight.',
    cite: '14 CFR 73; AIM 3-4-3',
  },
  {
    slug: 'star-tower',
    figure: 'sectional-1',
    q: '(Refer to the figure.) The star after HARBOR’s tower frequency (CT-118.3 ★) tells you —',
    choices: [
      'the tower is part-time',
      'a rotating beacon is on the field',
      'the frequency is receive-only',
    ],
    answer: 0,
    why: 'The star after CT = part-time tower — after hours the Class D reverts (check the Chart Supplement) and 118.3 becomes the CTAF.',
    cite: 'FAA Chart Users’ Guide',
  },
  {
    slug: 'vortac-id',
    figure: 'sectional-1',
    q: '(Refer to the figure.) The SALISH navaid symbol — a hexagon with three filled lobes — is a —',
    choices: ['VOR-DME', 'VORTAC', 'NDB'],
    answer: 1,
    why: 'Hexagon + “propeller” lobes = VORTAC. A hexagon in a square is VOR-DME; a dotted magenta disc is an NDB.',
    cite: 'FAA Chart Users’ Guide',
  },
]);

export const perfFigQuestions = qbank('fg-perf', 'performance', [
  {
    slug: 'read-50ft',
    figure: 'perf-1',
    q: '(Refer to the figure.) Pressure altitude 2,000 ft, temperature 20°C, paved dry runway, no wind. The total distance to clear a 50-ft obstacle is —',
    choices: ['1,075 ft', '1,880 ft', '2,100 ft'],
    answer: 1,
    why: 'Row 2,000 ft, 20°C column, “50 ft” value: 1,880. (1,075 is the ground roll; 2,100 is the 40°C figure.)',
    cite: 'POH-style chart reading',
  },
  {
    slug: 'read-roll-hot-high',
    figure: 'perf-1',
    q: '(Refer to the figure.) At 4,000 ft pressure altitude and 40°C, the ground roll is —',
    choices: ['1,260 ft', '1,465 ft', '2,480 ft'],
    answer: 1,
    why: 'Bottom row, 40°C, roll column: 1,465 ft — nearly double the sea-level 0°C figure. That’s density altitude doing its work.',
    cite: 'POH-style chart reading',
  },
  {
    slug: 'grass-note',
    figure: 'perf-1',
    q: '(Refer to the figure.) Sea level, 20°C, but the runway is DRY GRASS. Per the notes, the ground roll becomes about —',
    choices: ['925 ft', '1,065 ft', '1,205 ft'],
    answer: 1,
    why: 'Note 2: +15% to the ground roll. 925 × 1.15 ≈ 1,064 ft. Chart notes are where these questions hide their answers.',
    cite: 'POH-style chart reading',
  },
  {
    slug: 'headwind-note',
    figure: 'perf-1',
    q: '(Refer to the figure.) Sea level, 0°C, with an 18-knot headwind. The 50-ft obstacle distance becomes about —',
    choices: ['1,170 ft', '1,460 ft', '1,315 ft'],
    answer: 0,
    why: 'Note 1: −10% per 9 kt of headwind → 18 kt = −20%. 1,460 × 0.8 = 1,168 ft.',
    cite: 'POH-style chart reading',
  },
  {
    slug: 'temp-trend',
    figure: 'perf-1',
    q: '(Refer to the figure.) At sea level, warming from 0°C to 40°C lengthens the 50-ft obstacle distance by about —',
    choices: ['350 ft (roughly 24%)', '90 ft (roughly 6%)', '700 ft (roughly 50%)'],
    answer: 0,
    why: '1,460 → 1,810 ft: +350 ft, ~24%. A hot afternoon is a performance penalty you can read straight off the table.',
    cite: 'POH-style chart reading',
  },
]);

export const wbFigQuestions = qbank('fg-wb', 'wb', [
  {
    slug: 'point-a',
    figure: 'wb-env-1',
    q: '(Refer to the figure.) Which plotted loading condition is within the normal-category envelope?',
    choices: ['Point A', 'Point B', 'Point C'],
    answer: 0,
    why: 'A (2,250 lb at 42") sits inside. B is forward of the sloped forward limit at its weight; C (48.2") is behind the 47.3" aft limit.',
    cite: 'PHAK Ch. 10',
  },
  {
    slug: 'point-b',
    figure: 'wb-env-1',
    q: '(Refer to the figure.) Point B (2,300 lb, CG 36.5") is —',
    choices: [
      'within limits',
      'out of limits — forward of the forward CG limit at that weight',
      'out of limits — over maximum gross weight',
    ],
    answer: 1,
    why: 'The forward limit slopes aft above 1,950 lb; at 2,300 lb it is ~37.7", so 36.5" is forward of it. Expect heavy pitch forces and possibly not enough elevator to flare.',
    cite: 'PHAK Ch. 10',
  },
  {
    slug: 'point-c',
    figure: 'wb-env-1',
    q: '(Refer to the figure.) The primary hazard of flying at Point C (aft of the envelope) is —',
    choices: [
      'a higher stall speed',
      'longitudinal instability and possibly unrecoverable stalls/spins',
      'excessive fuel burn',
    ],
    answer: 1,
    why: 'Aft-CG flight weakens the tail’s restoring moment: light, twitchy pitch and a stall that may not self-recover. (Higher stall speed is the FORWARD-CG penalty.)',
    cite: 'PHAK Ch. 10',
  },
]);

export const asiFigQuestions = qbank('fg-asi', 'systems', [
  {
    slug: 'vfe-read',
    figure: 'asi-1',
    q: '(Refer to the figure.) The maximum flaps-extended speed (VFE) shown is —',
    choices: ['85 knots', '129 knots', '47 knots'],
    answer: 0,
    why: 'VFE is the top of the WHITE arc — 85 kt here. 129 is VNO (top of green); 47 is VS1 (bottom of green).',
    cite: 'PHAK Ch. 8',
  },
  {
    slug: 'vno-read',
    figure: 'asi-1',
    q: '(Refer to the figure.) Maximum structural cruising speed (VNO) is —',
    choices: ['163 knots', '129 knots', '95 knots'],
    answer: 1,
    why: 'VNO is where green meets yellow: 129 kt. The yellow arc (129–163) is for smooth air only; the red line at 163 is VNE.',
    cite: 'PHAK Ch. 8',
  },
  {
    slug: 'needle-state',
    figure: 'asi-1',
    q: '(Refer to the figure.) At the indicated airspeed shown, full flap extension would be —',
    choices: [
      'permitted — the needle is in the white arc',
      'not permitted — the needle is above VFE',
      'required for the caution range',
    ],
    answer: 1,
    why: 'The needle shows ~95 kt, above the 85-kt top of the white arc — slow below VFE before adding flaps or you bend them.',
    cite: 'PHAK Ch. 8',
  },
  {
    slug: 'vs0-read',
    figure: 'asi-1',
    q: '(Refer to the figure.) The power-off stall speed in the LANDING configuration (VS0) is —',
    choices: ['40 knots', '47 knots', '60 knots'],
    answer: 0,
    why: 'VS0 is the bottom of the white arc — 40 kt. The bottom of the green (47) is VS1, the clean stall speed.',
    cite: 'PHAK Ch. 8',
  },
]);

export const vorFigQuestions = qbank('fg-vor', 'nav', [
  {
    slug: 'needle-side',
    figure: 'vor-1',
    q: '(Refer to the figure: OBS 030, FROM flag, needle deflected right.) Relative to the aircraft, the selected 030 course line lies —',
    choices: ['to the right', 'to the left', 'directly behind'],
    answer: 0,
    why: 'With correct sensing the needle points toward the course: deflected right = course is right of you (you are left of it). Heading doesn’t matter to the display.',
    cite: 'PHAK Ch. 16',
  },
  {
    slug: 'from-meaning',
    figure: 'vor-1',
    q: '(Refer to the figure.) The FROM indication means that flying the selected 030 course would take the aircraft —',
    choices: ['toward the station', 'away from the station', 'around the station'],
    answer: 1,
    why: 'FROM: the OBS course leads outbound. You are on the station’s 030 side (northeast semicircle) — the flag answers “which side am I on,” not “which way am I pointed.”',
    cite: 'PHAK Ch. 16',
  },
  {
    slug: 'dots-degrees',
    figure: 'vor-1',
    q: '(Refer to the figure.) A two-dot CDI deflection on a VOR represents roughly —',
    choices: ['2° off course', '4° off course', '10° off course'],
    answer: 1,
    why: 'Each dot ≈ 2°; full-scale (five dots) ≈ 10°. Two dots ≈ 4°. Close to the station that’s a sliver; 40 miles out it’s miles.',
    cite: 'PHAK Ch. 16; AIM 1-1-3',
  },
]);
