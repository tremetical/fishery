import { deck } from '../types';

/*
 * The airport environment: signs, markings, and lighting. Runway incursions
 * are the FAA's forever-crusade, and this is exactly what they test.
 */

export const airportDeck = deck(
  {
    id: 'airport',
    subject: 'procedures',
    title: 'Airport signs, markings & lighting',
    description:
      'Every painted line and lit sign between the ramp and the runway — and what each one demands of you.',
  },
  [
    {
      slug: 'sign-mandatory',
      front: 'A **red sign with white characters** is what category, with what demand?',
      back: 'Mandatory instruction sign — runway holding positions, no-entry. Do not pass without a clearance (towered) or a careful look (non-towered).',
      cite: 'AIM 2-3-8',
    },
    {
      slug: 'sign-location',
      front: '**Black sign, yellow characters, yellow border** — meaning?',
      back: 'Location sign: “you are ON taxiway Bravo” (or runway). Black square, you’re there.',
      cite: 'AIM 2-3-9',
    },
    {
      slug: 'sign-direction',
      front: '**Yellow sign with black characters and an arrow**?',
      back: 'Direction sign: taxiway Bravo is that way. Arrays are arranged left-to-right by turn direction.',
      cite: 'AIM 2-3-10',
    },
    {
      slug: 'sign-runway-both',
      front: 'A runway sign reading **“17-35”** vs one reading **“17”** alone?',
      back: '“17-35”: you’re at a holding position where both ends are usable. “17” with an arrow: the sign points toward the Runway 17 threshold direction.',
      cite: 'AIM 2-3-8',
      unverified: true,
    },
    {
      slug: 'sign-distance-remaining',
      front: 'Black signs with single white **numbers** along a runway?',
      back: 'Distance remaining, in thousands of feet. “4” = 4,000 ft of runway left.',
      cite: 'AIM 2-3-13',
    },
    {
      slug: 'sign-ils',
      front: 'The **ILS critical area** holding sign and marking?',
      back: 'Red “ILS” sign; ladder-shaped hold marking on the pavement. Hold there only when instructed — usually IFR weather in force.',
      cite: 'AIM 2-3-5, 2-3-8',
    },
    {
      slug: 'mark-runway-hold',
      front: 'Runway holding position marking: **four yellow lines** — decode the sides.',
      back: 'Two solid + two dashed. Approach from the solid side: HOLD until cleared. On the dashed side: you are on the runway — cross and clear.',
      why: 'Exiting: keep rolling until your whole aircraft is past the marking, THEN stop and clean up.',
      cite: 'AIM 2-3-5',
    },
    {
      slug: 'mark-taxiway',
      front: 'Taxiway centerline and edge markings — colors and styles?',
      back: 'Continuous yellow centerline; double solid yellow edges (do not cross), double dashed edges (crossing permitted — pavement beyond is usable).',
      cite: 'AIM 2-3-4',
    },
    {
      slug: 'mark-nonmovement',
      front: 'One solid + one dashed yellow line across the ramp boundary?',
      back: 'The non-movement/movement area boundary — solid side is the ramp (yours), dashed side is ATC’s. Cross only with ground’s clearance.',
      cite: 'AIM 2-3-6',
      unverified: true,
    },
    {
      slug: 'mark-threshold',
      front: 'How do you read runway **threshold stripes**?',
      back: 'The stripe count encodes runway width: 8 stripes = 100 ft, 12 = 150 ft (4 = 60 ft, 6 = 75 ft).',
      cite: 'AIM 2-3-3',
      unverified: true,
    },
    {
      slug: 'mark-aiming',
      front: 'The two broad white blocks ~1,000 ft down the runway?',
      back: 'Aiming point markings — your visual target for a normal landing (the touchdown zone marks flank them on precision runways).',
      cite: 'AIM 2-3-3',
    },
    {
      slug: 'mark-closed',
      front: 'A large yellow or white **X** on a runway means?',
      back: 'Closed runway — no takeoff, landing, or taxi on it. A lighted/flashing X means the same at night.',
      cite: 'AIM 2-3-3',
    },
    {
      slug: 'light-runway-edge',
      front: 'Runway vs taxiway **edge light** colors?',
      back: 'Runway edges: white (yellow in the last 2,000 ft on instrument runways). Taxiway edges: blue. Taxiway centerline (bigger airports): green.',
      why: '“Blue is where you taxi, white is where you fly.” Landing between blue lights is a story you don’t want.',
      cite: 'AIM 2-1-4, 2-1-10',
    },
    {
      slug: 'light-threshold',
      front: 'The split red/green lights at a runway end?',
      back: 'Threshold lights: green facing approach (start of usable runway), red facing the runway (its end).',
      cite: 'AIM 2-1-5',
    },
    {
      slug: 'light-reil',
      front: 'What are **REILs**?',
      back: 'Runway End Identifier Lights — synchronized white flashers at the threshold, for picking the runway out of city light clutter.',
      cite: 'AIM 2-1-3',
    },
    {
      slug: 'light-pcl',
      front: '**Pilot-controlled lighting** — how do you work it?',
      back: 'Key the mic on the CTAF: 7 clicks = high intensity, 5 = medium, 3 = low. Start with 7, then adjust; it stays on ~15 minutes.',
      why: 'Click 7 again on final if it’s been a while — having the lights time out in the flare is a classic.',
      cite: 'AIM 2-1-8',
    },
    {
      slug: 'runway-numbers',
      front: 'Runway 17’s number comes from what, and when does it change?',
      back: 'Magnetic heading rounded to the nearest 10° (≈170°). Magnetic variation drifts over decades — runways occasionally get renumbered.',
      cite: 'AIM 2-3-3',
    },
    {
      slug: 'wind-indicators',
      front: 'The **segmented circle** — what two things does it tell you?',
      back: 'Wind/landing direction (windsock or tetrahedron in the middle) and traffic pattern direction (the L-shaped extensions show which side the pattern is on for each runway).',
      cite: 'AIM 4-3-4',
    },
    {
      slug: 'windsock-speed',
      front: 'A fully extended windsock suggests roughly what wind?',
      back: 'About 15 knots or more (they’re calibrated to stand out straight around 15 kt).',
      cite: 'AIM 4-3-4',
      unverified: true,
    },
    {
      slug: 'hotspot',
      front: 'A **hot spot** (circled HS on airport diagrams) marks what?',
      back: 'A location with a history/risk of runway incursions or collisions — complex intersections, confusing geometry. Brief them before taxiing.',
      cite: 'AIM 2-1-23; Chart Supplement',
      unverified: true,
    },
    {
      slug: 'progressive-taxi',
      front: 'Unsure of the taxi route at a big unfamiliar airport — what do you ask for?',
      back: '“Request progressive taxi” — ground gives you turn-by-turn instructions. Free, and infinitely cheaper than a runway incursion.',
      cite: 'AIM 4-3-18; P/CG',
    },
    {
      slug: 'lahso-lights',
      front: 'Where do you find the **available landing distance** for a LAHSO clearance?',
      back: 'Published in the Chart Supplement (and often on the ATIS). If you don’t know the number, the answer to LAHSO is “unable.”',
      cite: 'AIM 4-3-11',
    },
  ],
);
