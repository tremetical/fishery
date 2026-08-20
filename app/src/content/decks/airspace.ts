import { deck } from '../types';

/*
 * Airspace: dimensions, entry requirements, equipment, and the VFR weather
 * minimums table (14 CFR 91.155). Examples use Puget Sound airspace the
 * user actually flies under: KSEA Class B, KTIW/KOLM/KRNT Class D, etc.
 */

export const airspaceDeck = deck(
  {
    id: 'airspace',
    subject: 'airspace',
    title: 'Airspace A–G',
    description:
      'Dimensions, entry requirements, equipment, speed limits, and VFR weather minimums for every class.',
  },
  [
    // ---- Class A ----
    {
      slug: 'a-dims',
      front: 'Class **A** — where does it start and end?',
      back: '18,000 ft MSL up to and including FL600, over the contiguous US and out to 12 NM offshore.',
      why: 'You will not visit it as a VFR private pilot: IFR only.',
      cite: '14 CFR 71.33; AIM 3-2-2',
    },
    {
      slug: 'a-entry',
      front: 'Requirements to operate in Class **A**?',
      back: 'IFR flight plan and clearance, instrument-rated pilot, altimeter set to 29.92.',
      why: 'Everyone flies flight levels on 29.92 up there, so altimetry is common to all.',
      cite: '14 CFR 91.135, 91.121',
    },
    // ---- Class B ----
    {
      slug: 'b-dims',
      front: 'Typical shape and ceiling of Class **B**?',
      back: 'An upside-down wedding cake, surface to ~10,000 ft MSL (Seattle’s Bravo tops at 10,000), with wider shelves as you go up.',
      why: 'Shelves are drawn to contain arriving/departing airline traffic on their climb and descent profiles.',
      cite: 'AIM 3-2-3',
    },
    {
      slug: 'b-entry',
      front: 'The magic words you MUST hear before entering Class **B**?',
      back: '“Cleared into the Class Bravo airspace.”',
      why: 'Two-way contact is NOT enough for Bravo — unlike C and D. If they say your callsign but no clearance, stay out.',
      cite: '14 CFR 91.131; AIM 3-2-3',
    },
    {
      slug: 'b-equip',
      front: 'Equipment required in Class **B** (and above it)?',
      back: 'Two-way radio, Mode C transponder, and ADS-B Out — required within and above the Bravo, and everywhere inside the 30 NM Mode C veil.',
      cite: '14 CFR 91.131, 91.215, 91.225',
    },
    {
      slug: 'b-student',
      front: 'Can a student pilot fly in Class **B**?',
      back: 'Yes, with specific ground/flight training and a logbook endorsement for that Bravo — but some Class B airports prohibit student solo operations entirely.',
      why: 'KSEA is on the prohibited list for solo students.',
      cite: '14 CFR 61.95, 91.131(b)',
      unverified: true,
    },
    {
      slug: 'b-vfr-min',
      front: 'VFR weather minimums inside Class **B**?',
      back: '3 SM visibility, clear of clouds.',
      why: 'The most lenient cloud rule of any controlled airspace — ATC is separating everyone from everyone, so you only need to stay out of the clouds yourself.',
      cite: '14 CFR 91.155',
    },
    {
      slug: 'b-private',
      front: 'Minimum pilot certificate to take off or land at the **primary** Class B airport?',
      back: 'Private pilot — or a student/recreational/sport pilot with the required endorsements, except at the listed airports where student solos are prohibited.',
      cite: '14 CFR 91.131(b)',
    },
    // ---- Class C ----
    {
      slug: 'c-dims',
      front: 'Standard dimensions of Class **C**?',
      back: 'Core: 5 NM radius, surface to 4,000 ft above the airport. Shelf: 10 NM radius, 1,200 to 4,000 ft above the airport.',
      why: 'Think “5 and 10, up to 4.” Numbers are above airport elevation, not MSL.',
      cite: 'AIM 3-2-4',
    },
    {
      slug: 'c-entry',
      front: 'What must happen before you enter Class **C**?',
      back: 'Two-way radio communications established — the controller says your callsign.',
      why: '“Skyhawk 731TW, standby” = communications established, you may enter. “Aircraft calling, standby” = NOT established, stay out.',
      cite: '14 CFR 91.130; AIM 3-2-4',
    },
    {
      slug: 'c-equip',
      front: 'Equipment required in and above Class **C**?',
      back: 'Two-way radio, Mode C transponder, ADS-B Out (required in the C and above it up to 10,000 MSL).',
      cite: '14 CFR 91.130, 91.215, 91.225',
    },
    {
      slug: 'c-vfr-min',
      front: 'VFR minimums in Class **C**?',
      back: '3 SM visibility; 500 below, 1,000 above, 2,000 horizontal from clouds.',
      why: 'The standard “3–152s” (3 SM, 500/1000/2000) applies to C, D, and E below 10,000.',
      cite: '14 CFR 91.155',
    },
    // ---- Class D ----
    {
      slug: 'd-dims',
      front: 'Typical dimensions of Class **D**?',
      back: 'About a 4 NM radius from the surface up to 2,500 ft above the airport (charted ceiling in a dashed blue box, in hundreds of feet MSL).',
      why: 'Tacoma Narrows and Olympia are Class D — the ceiling number on the sectional like [25] means 2,500 MSL.',
      cite: 'AIM 3-2-5',
    },
    {
      slug: 'd-entry',
      front: 'Entry requirement for Class **D**?',
      back: 'Two-way radio communications established with the tower before entering.',
      why: 'Same rule as Class C: callsign heard = in; “aircraft calling” = out.',
      cite: '14 CFR 91.129; AIM 3-2-5',
    },
    {
      slug: 'd-part-time',
      front: 'What happens to Class **D** when the tower closes for the night?',
      back: 'It reverts to Class E surface area or Class G — check the Chart Supplement for that airport.',
      why: 'KTIW tower is part-time. After hours you self-announce on the CTAF (usually the tower frequency).',
      cite: 'AIM 3-2-5; Chart Supplement',
    },
    {
      slug: 'd-vfr-min',
      front: 'VFR minimums in Class **D**?',
      back: '3 SM; 500 below, 1,000 above, 2,000 horizontal.',
      cite: '14 CFR 91.155',
    },
    // ---- Class E ----
    {
      slug: 'e-what',
      front: 'What is Class **E** airspace, in one sentence?',
      back: 'All controlled airspace that isn’t A, B, C, or D — the general-purpose controlled airspace where IFR traffic gets separation.',
      why: '“Controlled” means IFR service exists there, not that VFR needs permission. VFR needs no clearance or radio in Class E.',
      cite: 'AIM 3-2-6',
    },
    {
      slug: 'e-floors',
      front: 'The common **floors** of Class E, and how each is charted?',
      back: '700 AGL inside magenta shading · 1,200 AGL inside blue shading (or outside the magenta) · surface, inside a dashed magenta line · 14,500 MSL where nothing else applies.',
      why: 'The soft side of the magenta vignette is the 700-ft side. Surface E exists to protect instrument approaches all the way down.',
      cite: 'AIM 3-2-6',
    },
    {
      slug: 'e-vfr-below10',
      front: 'Class **E** VFR minimums **below 10,000 MSL**?',
      back: '3 SM; 500 below, 1,000 above, 2,000 horizontal.',
      cite: '14 CFR 91.155',
    },
    {
      slug: 'e-vfr-above10',
      front: 'Class **E** VFR minimums **at or above 10,000 MSL**?',
      back: '5 SM; 1,000 below, 1,000 above, 1 SM horizontal.',
      why: 'Above 10,000 there’s no 250-knot speed limit — faster closure needs more room to see and avoid.',
      cite: '14 CFR 91.155',
    },
    // ---- Class G ----
    {
      slug: 'g-what',
      front: 'What is Class **G**, and where does it end?',
      back: 'Uncontrolled airspace — from the surface up to the floor of the overlying Class E (700 AGL, 1,200 AGL, or higher).',
      why: 'No ATC separation services for anyone. See-and-avoid plus weather minimums are the whole safety system.',
      cite: 'AIM 3-3-1',
    },
    {
      slug: 'g-day-low',
      front: 'Class **G** VFR minimums, **day**, at or below 1,200 AGL?',
      back: '1 SM visibility, clear of clouds.',
      why: 'The loosest minimums anywhere — pattern work at a rural strip under an overcast is legal at 1 mile, clear of clouds. Legal ≠ smart.',
      cite: '14 CFR 91.155',
    },
    {
      slug: 'g-night-low',
      front: 'Class **G** VFR minimums, **night**, at or below 1,200 AGL?',
      back: '3 SM; 500/1,000/2,000 — except in the traffic pattern within ½ mile of the runway: 1 SM, clear of clouds.',
      cite: '14 CFR 91.155',
    },
    {
      slug: 'g-day-mid',
      front: 'Class **G** VFR minimums, **day**, above 1,200 AGL but below 10,000 MSL?',
      back: '1 SM; 500 below, 1,000 above, 2,000 horizontal.',
      cite: '14 CFR 91.155',
    },
    {
      slug: 'g-high',
      front: 'Class **G** VFR minimums above 1,200 AGL **and** at/above 10,000 MSL?',
      back: '5 SM; 1,000 below, 1,000 above, 1 SM horizontal — day or night.',
      cite: '14 CFR 91.155',
    },
    // ---- speed limits ----
    {
      slug: 'speed-250',
      front: 'Speed limit **below 10,000 ft MSL**?',
      back: '250 knots indicated.',
      cite: '14 CFR 91.117(a)',
    },
    {
      slug: 'speed-200',
      front: 'Speed limit at or below **2,500 AGL within 4 NM** of a Class C or D primary airport?',
      back: '200 knots indicated (also 200 kt under Class B shelves and in VFR corridors through a Bravo).',
      cite: '14 CFR 91.117(b),(c)',
    },
    // ---- special use ----
    {
      slug: 'sua-prohibited',
      front: '**Prohibited area** — may you enter?',
      back: 'No. Flight is prohibited at all times without specific authorization (think P-56 over the White House).',
      cite: 'AIM 3-4-2',
    },
    {
      slug: 'sua-restricted',
      front: '**Restricted area** — may you enter?',
      back: 'Not when it’s active/“hot” without permission from the controlling agency. When cold, ATC can clear you through — or check its times on the chart margin and with FSS.',
      why: 'They contain invisible hazards: artillery, aerial gunnery, missiles. Restricted ≠ empty-looking.',
      cite: '14 CFR 73; AIM 3-4-3',
    },
    {
      slug: 'sua-moa',
      front: '**MOA** — may VFR aircraft enter?',
      back: 'Yes, no clearance needed even when active — but military aircraft may be maneuvering aggressively. Exercise extreme caution; check status with ATC/FSS first.',
      cite: 'AIM 3-4-5',
    },
    {
      slug: 'sua-warning',
      front: '**Warning area** — what is it and where?',
      back: 'Like a restricted area, but over international waters beyond 3 NM offshore (the US can’t legally prohibit flight there). Hazardous activity — same caution.',
      cite: 'AIM 3-4-4',
    },
    {
      slug: 'sua-alert',
      front: '**Alert area** — meaning?',
      back: 'High volume of pilot training or unusual aerial activity. No clearance needed; all pilots equally responsible for see-and-avoid.',
      cite: 'AIM 3-4-6',
    },
    {
      slug: 'sua-cfa',
      front: '**Controlled firing area** — why isn’t it charted?',
      back: 'Activities stop when spotters see an approaching aircraft, so it poses no hazard to you — hence not shown on charts.',
      why: 'Favorite trick question: the CFA is the one SUA type that never appears on your sectional.',
      cite: 'AIM 3-4-7',
    },
    {
      slug: 'tfr',
      front: 'Where do you find out about **TFRs** before a flight?',
      back: 'NOTAMs — via your briefing (1800wxbrief, ForeFlight, FSS). TFRs pop up for VIP movement, fires, disasters, stadiums.',
      why: 'The stadium TFR (3 NM, 3,000 AGL, major sporting events) catches pilots constantly. A TFR bust means a certificate action, possibly an intercept.',
      cite: '14 CFR 91.137–91.145; FDC NOTAMs',
    },
    {
      slug: 'adsb-where',
      front: 'Where is **ADS-B Out** required (rule airspace)?',
      back: 'Class A, B, C; within the 30 NM Mode C veil; above B and C up to 10,000 MSL; Class E at/above 10,000 MSL (except below 2,500 AGL).',
      why: 'Effectively: anywhere a Mode C transponder was already required.',
      cite: '14 CFR 91.225',
    },
    {
      slug: 'modec-veil',
      front: 'The **Mode C veil** — what and where?',
      back: '30 NM radius around Class B primary airports (like KSEA): Mode C transponder + ADS-B Out required, even under the shelves outside the Bravo itself.',
      why: 'Tacoma Narrows sits inside Seattle’s veil — your trainer needs ADS-B Out just to fly the pattern there.',
      cite: '14 CFR 91.215(b), 91.225',
    },
    {
      slug: 'trsa',
      front: 'What is a **TRSA**?',
      back: 'Terminal Radar Service Area — radar services for VFR on a voluntary basis around some Class D airports. Participation encouraged, not required.',
      why: 'Charted with solid black/gray rings. A leftover category that never became Class C.',
      cite: 'AIM 3-5-6',
    },
    {
      slug: 'sfra-example',
      front: 'What’s a **Special Flight Rules Area** (SFRA)?',
      back: 'Airspace with its own bespoke rules in Part 93 — e.g., the Washington DC SFRA requiring special training and flight plans.',
      cite: '14 CFR 93',
    },
    {
      slug: 'vfr-cruise-alt',
      front: 'VFR cruising altitudes above **3,000 AGL**: which rule?',
      back: 'Magnetic course 0–179°: odd thousands + 500 (3,500, 5,500…). Course 180–359°: even thousands + 500 (4,500, 6,500…).',
      why: '“East is odd, west is even odder.” Based on magnetic COURSE, not heading.',
      cite: '14 CFR 91.159',
    },
    {
      slug: 'nsa',
      front: '**National Security Area** on a chart — what does it ask of you?',
      back: 'Voluntarily avoid flying through it; avoidance can become mandatory by NOTAM.',
      cite: 'AIM 3-5-7',
    },
    {
      slug: 'below-b-shelf',
      front: 'You’re under a Class B shelf, outside it, squawking 1200. Legal? What applies?',
      back: 'Legal — no clearance needed below the shelf. You still need Mode C + ADS-B inside the 30 NM veil, 200 kt limit, and the Class E/G minimums for your altitude.',
      why: 'This is everyday flying around Seattle: thread beneath the 3,000 and 5,000 shelves VFR without talking to anyone. Chart-reading is the skill.',
      cite: '14 CFR 91.117, 91.215, 91.225',
    },
  ],
);
