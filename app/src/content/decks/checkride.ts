import { deck, type Card } from '../types';

/*
 * Checkride preparation: the oral exam and the maneuvers standards.
 * Oral cards are framed as the examiner asks them — answer OUT LOUD in
 * complete sentences before revealing; the reveal is a model answer, not
 * a script. ACS tolerances marked unverified should be checked against
 * the CURRENT Private Pilot ACS (FAA-S-ACS-6) — it gets revised.
 */

const say = { sayAloud: true } as const;

const oralDocsCards: (Omit<Card, 'id'> & { slug: string })[] = [
  {
    slug: 'what-brings',
    front: '**Examiner:** “What documents did you bring today to show me you’re eligible for this checkride?”',
    back: 'Photo ID, pilot (student) certificate, medical, logbook with the required endorsements and experience, knowledge test report, and the IACRA application — plus the aircraft’s documents and maintenance records.',
    why: 'Walk it as two lists: MY papers, then the AIRPLANE’s papers. Examiners love organized answers.',
    cite: '14 CFR 61.39, 61.103',
    ...say,
  },
  {
    slug: 'priv-limits',
    front: '**Examiner:** “Once you pass today, what can’t you do with this certificate?”',
    back: 'Fly for compensation or hire (pro-rata expense sharing with a common purpose excepted), carry passengers for charity outside the rules, fly aircraft I’m not rated or endorsed for, or fly IFR/in IMC without an instrument rating.',
    cite: '14 CFR 61.113',
    ...say,
  },
  {
    slug: 'stay-current',
    front: '**Examiner:** “After today, what keeps this certificate usable next year? In five years?”',
    back: 'The certificate never expires — currency does: a flight review every 24 calendar months, a valid medical (or BasicMed), and 3 takeoffs/landings in 90 days to carry passengers (full-stop at night).',
    why: 'Distinguish CURRENT (legal) from PROFICIENT (safe) without being asked — it earns points.',
    cite: '14 CFR 61.56, 61.57, 61.23',
    ...say,
  },
  {
    slug: 'medical-lapse',
    front: '**Examiner:** “Your medical expires halfway through a planned cross-country month. What are your options?”',
    back: 'Renew it before it lapses; or operate under BasicMed if eligible; or stop acting as PIC when it expires. The medical must be valid when acting as PIC — planning around a known expiration is an ADM answer, not just a legal one.',
    cite: '14 CFR 61.23; Part 68',
    ...say,
  },
  {
    slug: 'aircraft-docs',
    front: '**Examiner:** “Show me this airplane is legal to fly today.”',
    back: 'ARROW documents aboard; then maintenance records: annual (and 100-hour if for hire), transponder/altimeter certs, ELT inspection and battery, AD compliance, and any discrepancies placarded or resolved under 91.213.',
    why: 'Bring the actual logbooks tabbed. Fumbling for the annual entry is a bad opening scene.',
    cite: '14 CFR 91.203, 91.409–417',
    ...say,
  },
  {
    slug: 'inop-scenario',
    front: '**Examiner:** “During preflight you find the landing light inoperative for today’s DAY flight. Walk me through your decision.”',
    back: 'Is it required by 91.205 day VFR? No. By the equipment list/ADs? Check. Then deactivate or remove, placard INOPERATIVE, and I decide it’s safe — 91.213(d). For a night flight for hire it would be required, so no-go until fixed.',
    cite: '14 CFR 91.205, 91.213(d)',
    ...say,
  },
  {
    slug: 'owner-vs-pic',
    front: '**Examiner:** “Who’s responsible for maintaining this airplane — and who’s responsible for it being airworthy this morning?”',
    back: 'The owner/operator maintains it (91.403); the PIC determines it’s airworthy and safe before EACH flight (91.7). Renters don’t get to outsource the second one.',
    cite: '14 CFR 91.7, 91.403',
    ...say,
  },
  {
    slug: 'required-inspections',
    front: '**Examiner:** “Recite the inspections this trainer needs, with their intervals.”',
    back: 'AAV1ATE: Annual (12 cal-mo), ADs (as published), VOR (30 days, IFR), 100-hour (for hire/instruction), Altimeter/pitot-static (24 cal-mo, IFR), Transponder (24 cal-mo), ELT (12 cal-mo; battery at 1 hr use or 50% life).',
    cite: '14 CFR 91.409, 91.411, 91.413, 91.207',
    ...say,
  },
  {
    slug: 'preventive-oral',
    front: '**Examiner:** “The nav light bulb is dead. Can YOU change it? What paperwork follows?”',
    back: 'Yes — preventive maintenance under Part 43 Appendix A, permitted for a pilot on an aircraft they operate. Log entry: description, date, my name, certificate number, signature.',
    cite: '14 CFR 43.3(g), 43.9',
    ...say,
  },
  {
    slug: 'logbook-endorsements',
    front: '**Examiner:** “Which endorsements are in your logbook for today?”',
    back: 'Knowledge test prep, and the checkride endorsements: prepared for the practical test and the 61.39 3-hours-in-2-months training. As a student I also carried solo and solo cross-country endorsements.',
    cite: '14 CFR 61.39, 61.87, 61.93',
    ...say,
  },
  {
    slug: 'deviation-report',
    front: '**Examiner:** “Mid-flight emergency — you break a regulation to handle it. What happens afterward?”',
    back: '91.3(b) authorizes deviating from any Part 91 rule to the extent required by the emergency. Afterward: a written report only IF the FAA requests one. Also worth knowing: NASA ASRS report within 10 days as a good practice.',
    cite: '14 CFR 91.3; AC 00-46',
    ...say,
  },
  {
    slug: 'hazmat-passengers',
    front: '**Examiner:** “Your passenger shows up with a full jerry can of gas ‘for the cabin, just in case.’ Your call?”',
    back: 'No. Beyond common sense, hazardous materials carriage has rules, fumes incapacitate, and unsecured liquids shift W&B and become projectiles. Offer the FBO’s fuel service instead.',
    cite: '49 CFR 175; 91.13',
    ...say,
    unverified: true,
  },
];

const oralXcCards: (Omit<Card, 'id'> & { slug: string })[] = [
  {
    slug: 'brief-sources',
    front: '**Examiner:** “How did you get today’s weather, and how would you for the planned cross-country?”',
    back: 'A standard briefing via 1800wxbrief/Leidos or an EFB’s brief function; aviationweather.gov for METARs/TAFs/GFA/prog charts; NOTAMs and TFRs in the same brief; PIREPs and AIRMETs/SIGMETs checked specifically.',
    cite: 'AIM 7-1-2 to 7-1-6; 91.103',
    ...say,
  },
  {
    slug: 'personal-minimums',
    front: '**Examiner:** “What are YOUR personal minimums, and how did you pick them?”',
    back: 'Numbers above the legal ones — e.g., 3,000/5 for local VFR, crosswind under my demonstrated comfort, fuel on the ground with an hour aboard — set calmly at the desk, not renegotiated in the air. They tighten when I’m tired or the airplane is unfamiliar.',
    why: 'Any thoughtful set works; having NONE is the failing answer.',
    cite: 'PHAK Ch. 2; AC 60-22',
    ...say,
  },
  {
    slug: 'go-nogo',
    front: '**Examiner:** “Ceiling 2,800 broken, tops unknown, destination forecast marginal. Talk me through go/no-go.”',
    back: 'PAVE the risks: Pilot (rest, currency), Aircraft (equipment, fuel), enVironment (that ceiling vs terrain and my minimums, escape routes, alternates), External pressure (why do I ‘need’ to go?). Marginal + no out = no-go or drive; a plan with hard divert triggers can be a conditional go.',
    cite: 'PHAK Ch. 2',
    ...say,
  },
  {
    slug: 'fuel-plan-oral',
    front: '**Examiner:** “Prove your fuel plan for the cross-country.”',
    back: 'Time en route from distance/groundspeed per leg, burn from the POH cruise table at my power setting, plus climb allowance, plus reserve — 30 min legal day VFR, one hour by my rule. State the numbers and where each came from.',
    cite: 'POH Section 5; 91.151; PHAK Ch. 16',
    ...say,
  },
  {
    slug: 'alt-choice',
    front: '**Examiner:** “What altitude did you file for the eastbound leg, and why?”',
    back: 'An odd-thousand + 500 (hemispheric for 0–179° magnetic course), high enough for terrain/obstacle margin and glide options, below any airspace ceiling issues, picked against winds aloft for groundspeed — and I’ll accept bumps for a big tailwind only to a point.',
    cite: '14 CFR 91.159; PHAK Ch. 16',
    ...say,
  },
  {
    slug: 'divert-oral',
    front: '**Examiner:** (in flight) “Weather ahead just went IFR. Divert me to your alternate — now.”',
    back: 'Turn approximately toward it immediately, then refine: estimated heading from the chart, distance in 10 NM chunks, time at current groundspeed, fuel check, new airspace/frequencies/field elevation brief. Fly first, compute second.',
    cite: 'AFH; Private Pilot ACS (diversion task)',
    ...say,
  },
  {
    slug: 'lost-comm-oral',
    front: '**Examiner:** “Radio quits 10 miles from our towered destination. What exactly do you do?”',
    back: 'Squawk 7600, stay VFR, observe the flow outside the Class D, enter the pattern, watch for light gun signals, rock wings to acknowledge by day, land, and phone the tower. If unsure of the signals I keep the AIM card on my kneeboard.',
    cite: 'AIM 4-2-13, 4-3-13; 91.125',
    ...say,
  },
  {
    slug: 'sup-oxygen-scenario',
    front: '**Examiner:** “You want to cross the Cascades at 13,500 to top some clouds. Any issues?”',
    back: 'Legal: crew oxygen required beyond 30 minutes there. Physiological: night vision and judgment degrade lower than that. Weather: tops, escape options, icing in any cloud at that altitude most of the year. And VFR-on-top of a solid layer traps you if it closes — I need holes at both ends and fuel to retreat.',
    cite: '14 CFR 91.211; PHAK Ch. 17',
    ...say,
  },
  {
    slug: 'tfr-check',
    front: '**Examiner:** “How do you make sure a stadium or VIP TFR doesn’t catch you today?”',
    back: 'TFRs come as FDC NOTAMs in the briefing; I check them again right before departure (they pop up fast), and graphically on the EFB. Sports TFRs: 3 NM/3,000 AGL over major venues at game time.',
    cite: '91.137–145; FDC NOTAMs',
    ...say,
  },
  {
    slug: 'night-legal-vs-smart',
    front: '**Examiner:** “The return leg lands 30 minutes after sunset. What changes?”',
    back: 'Legal: position lights on, 45-minute fuel reserve, and I must be night passenger-current for my friend aboard. Practical: dark-adaptation, black-hole illusion at the destination, and higher personal weather minimums at night.',
    cite: '91.151, 91.209, 61.57(b)',
    ...say,
  },
  {
    slug: 'special-emphasis',
    front: '**Examiner:** “What kills pilots like you, statistically — and what’s your defense?”',
    back: 'Loss of control (stall/spin low), VFR into IMC, fuel mismanagement, and CFIT. Defenses: coordinated flight and speed discipline in the pattern, hard weather-divert triggers, an hour of fuel on landing, and altitude/terrain awareness.',
    cite: 'AOPA Nall Report; ACS risk management',
    ...say,
    unverified: true,
  },
  {
    slug: 'wx-outs',
    front: '**Examiner:** “Define YOUR hard divert triggers for this flight.”',
    back: 'Examples: ceiling forcing me below my minimum en-route altitude, visibility under my personal minimum, any unforecast precip at temps near freezing, ETA fuel dropping below my one-hour floor — each trigger pre-decides the action: turn around or land at the named alternate.',
    cite: 'PHAK Ch. 2 (ADM)',
    ...say,
  },
];

const maneuversCards: (Omit<Card, 'id'> & { slug: string })[] = [
  {
    slug: 'steep-turn-std',
    front: '**Steep turns** — configuration and ACS tolerances?',
    back: '45° bank (±5°), 360° each direction: altitude ±100 ft, airspeed ±10 kt, roll-out heading ±10°.',
    why: 'Trim + a touch of power going in; the visual cue is the cowling on the horizon. Expect the overbanking tendency.',
    cite: 'Private Pilot ACS; AFH Ch. 9',
  },
  {
    slug: 'slowflight-std',
    front: '**Slow flight** — target condition and tolerances?',
    back: 'An airspeed where any increase in AOA or load would trigger the stall warning: altitude ±100 ft, heading ±10°, airspeed +10/−0 kt, bank ±10°.',
    why: 'The +10/−0 matters: never slower than target. Rudder is the primary wing-leveler here.',
    cite: 'Private Pilot ACS; AFH Ch. 4',
    unverified: true,
  },
  {
    slug: 'poweroff-stall',
    front: '**Power-off stall** — setup and the standard?',
    back: 'Landing configuration, stabilized descent, then smoothly to the stall; recover at the full stall: heading ±10° (or bank ≤20° in turning stalls), minimal altitude loss, prompt AOA reduction, power, clean up.',
    cite: 'Private Pilot ACS; AFH Ch. 5',
    unverified: true,
  },
  {
    slug: 'poweron-stall',
    front: '**Power-on stall** — what it rehearses and the trap?',
    back: 'The departure stall: takeoff configuration, climb pitch, full/near-full power to the stall. Trap: strong left-turning tendencies at the break — right rudder, keep coordinated or it becomes a spin entry.',
    cite: 'Private Pilot ACS; AFH Ch. 5',
  },
  {
    slug: 'ground-ref-alt',
    front: '**Ground reference maneuvers** — altitude band and the wind logic?',
    back: '600–1,000 ft AGL, ±100 ft, ±10 kt. Enter downwind; bank is steepest when groundspeed is highest (downwind) and shallowest upwind — the picture, not the bank, stays constant.',
    cite: 'Private Pilot ACS; AFH Ch. 6',
  },
  {
    slug: 'turns-point',
    front: '**Turns around a point** — what’s constant, what varies?',
    back: 'Constant RADIUS from the point; bank varies continuously with groundspeed (max downwind, min upwind). Two full turns, rolling out on the entry heading.',
    cite: 'AFH Ch. 6',
  },
  {
    slug: 's-turns',
    front: '**S-turns across a road** — the standard picture?',
    back: 'Equal half-circles either side of a road perpendicular to the wind, wings level crossing the road each time — same varying-bank logic as turns around a point.',
    cite: 'AFH Ch. 6',
  },
  {
    slug: 'rect-course',
    front: '**Rectangular course** — what is it secretly teaching?',
    back: 'The traffic pattern: wind-corrected legs at pattern altitude and distance, crab angles on each leg, and the turn timing that keeps the ground track square.',
    cite: 'AFH Ch. 6',
  },
  {
    slug: 'shortfield-to',
    front: '**Short-field takeoff** — technique and speed standard?',
    back: 'Full length, flaps per POH, brakes held to full power, rotate at the POH speed, climb at Vx (+10/−5 kt) until the obstacle is cleared, then Vy.',
    cite: 'Private Pilot ACS; AFH Ch. 5',
    unverified: true,
  },
  {
    slug: 'shortfield-ldg',
    front: '**Short-field landing** — the touchdown standard?',
    back: 'Stabilized approach at POH speed (+10/−5 kt), touch down within 200 ft BEYOND the specified point, no drift, then max braking/aft elevator.',
    why: 'Landing SHORT of the point is a bust, not a bonus — “beyond” is the word.',
    cite: 'Private Pilot ACS',
    unverified: true,
  },
  {
    slug: 'softfield-to',
    front: '**Soft-field takeoff** — what’s different and why?',
    back: 'Elevator full aft taxiing, no stop on the runway, lift off as early as possible in ground effect, accelerate IN ground effect to Vx/Vy, then climb. The goal: minimum time on (and load into) the soft surface.',
    cite: 'AFH Ch. 5',
  },
  {
    slug: 'softfield-ldg',
    front: '**Soft-field landing** — the touch?',
    back: 'Hold the nosewheel off with power as needed, touch down as slowly and softly as possible on the mains, keep the elevator coming back through the rollout, don’t stop where you’ll sink.',
    cite: 'AFH Ch. 8',
  },
  {
    slug: 'normal-ldg-std',
    front: '**Normal landing** — the ACS touchdown window?',
    back: 'Within 400 ft beyond the specified point, on centerline, no drift, longitudinal axis aligned — at an appropriate airspeed with a stabilized approach.',
    cite: 'Private Pilot ACS',
    unverified: true,
  },
  {
    slug: 'fwd-slip',
    front: '**Forward slip to landing** — mechanics and the caution?',
    back: 'Bank into the wind, opposite rudder, nose off-centerline — a drag machine to lose altitude without gaining speed. Caution: airspeed indications may be unreliable in the slip; know your POH’s note on slips with flaps.',
    cite: 'AFH Ch. 8',
  },
  {
    slug: 'goaround-std',
    front: '**Go-around** — the sequence the examiner wants to SEE?',
    back: 'Immediate decision, full power + carb heat off, pitch to stop the descent, flaps to the go-around setting, positive rate, remaining flaps up in increments, offset for traffic, announce it. Deciding EARLY is the graded skill.',
    cite: 'Private Pilot ACS; AFH Ch. 8',
  },
  {
    slug: 'emerg-descent',
    front: '**Emergency descent** — configuration idea?',
    back: 'Get down fast without overstressing: power idle, bank 30–45° for a descending turn (clears below, adds load to keep speed manageable), airspeed per POH — gear/flaps per POH limits.',
    cite: 'AFH Ch. 17; Private Pilot ACS',
    unverified: true,
  },
  {
    slug: 'engine-fail-task',
    front: '**Simulated engine failure** — what gets you the pass?',
    back: 'Immediate best-glide pitch/trim, a workable field chosen QUICKLY and kept, a real flow (fuel/mixture/mags/primer), simulated Mayday + 7700, and a stabilized approach that would have made the field. Chasing better fields is the classic bust.',
    cite: 'Private Pilot ACS; AFH Ch. 17',
  },
  {
    slug: 'hood-work',
    front: 'Why is there **hood time** on a VFR checkride, and the standard?',
    back: 'The VFR-into-IMC escape: straight-and-level, turns, climbs/descents by instruments, and unusual attitude recovery — proving you can survive the 180 back to visual conditions. Standards: roughly altitude ±200, heading ±20°, airspeed ±10 kt.',
    cite: 'Private Pilot ACS (basic instrument tasks)',
    unverified: true,
  },
  {
    slug: 'unusual-attitude',
    front: '**Unusual attitude recovery** — nose-high vs nose-low, in order?',
    back: 'Nose-high (slow, climbing): power UP, nose DOWN, then level wings. Nose-low (fast, diving): power IDLE, level WINGS, then ease the nose up. Order matters — pulling first in a nose-low spiral tightens it.',
    cite: 'AFH Ch. 4 (IR); Private Pilot ACS',
  },
  {
    slug: 'checkride-shape',
    front: 'What actually happens on checkride day — the shape of it?',
    back: 'Oral first (couple of hours: documents, planning scenario, systems, weather, ADM), then the flight: your planned XC start, a diversion, maneuvers, stalls, hood work, emergencies, and pattern work. Bust criteria: exceeding standards without prompt correction, or the examiner intervening.',
    cite: 'Private Pilot ACS; 61.43',
    ...say,
  },
  {
    slug: 'imsafe-checkride',
    front: '**Examiner (last question):** “You’re nervous. Should you even be flying this checkride today?”',
    back: 'Run IMSAFE out loud: illness, meds, stress, alcohol, fatigue, eating. Normal test nerves are fine; impairment is not — and saying “here’s how I self-assess” IS the correct answer to the trick question.',
    cite: 'PHAK Ch. 17',
    ...say,
  },
];

export const oralDocsDeck = deck(
  {
    id: 'oral-docs',
    subject: 'checkride',
    title: 'Oral: certificates & airworthiness',
    description:
      'The opening hour of every checkride: your papers, the airplane’s papers, and inop-equipment scenarios — answered out loud.',
  },
  oralDocsCards,
);

export const oralXcDeck = deck(
  {
    id: 'oral-xc',
    subject: 'checkride',
    title: 'Oral: planning & decision-making',
    description:
      'The cross-country scenario: weather calls, fuel proofs, diversions, personal minimums — the ADM conversation.',
  },
  oralXcCards,
);

export const maneuversDeck = deck(
  {
    id: 'maneuvers',
    subject: 'checkride',
    title: 'Maneuvers & ACS standards',
    description:
      'Every flight-test maneuver with its tolerances and technique — so the numbers are automatic before the flight.',
  },
  maneuversCards,
);
