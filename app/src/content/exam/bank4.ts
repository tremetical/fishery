import { qbank } from './types';

/* Navigation questions plus a second wave across the other areas. */

export const navQuestions = qbank('xn', 'nav', [
  {
    slug: 'gs-time',
    q: 'Groundspeed 90 knots. Time to fly 135 NM?',
    choices: ['1 hour 20 minutes', '1 hour 30 minutes', '1 hour 45 minutes'],
    answer: 1,
    why: '135 ÷ 90 = 1.5 hours. At 90 kt you cover 1.5 NM per minute — 135/1.5 = 90 minutes.',
    cite: 'PHAK Ch. 16',
  },
  {
    slug: 'fuel-req',
    q: 'Burn rate 9 GPH, groundspeed 120 kt, distance 210 NM. Fuel required (no reserve)?',
    choices: ['about 12.5 gallons', 'about 15.8 gallons', 'about 18.9 gallons'],
    answer: 1,
    why: '210/120 = 1.75 hr × 9 GPH = 15.75 gal. Then add your reserve on top before calling it a plan.',
    cite: 'PHAK Ch. 16',
  },
  {
    slug: 'tvmdc',
    q: 'True course 180°, variation 16°E, deviation +2°. The compass heading (no wind) is —',
    choices: ['166°', '198°', '162°'],
    answer: 0,
    why: '180 − 16 (east is least) = 164 magnetic; +2 deviation = 166 compass.',
    cite: 'PHAK Ch. 16',
  },
  {
    slug: 'vor-radial',
    q: 'You are directly east of a VOR. You are on the — radial.',
    choices: ['090', '270', '180'],
    answer: 0,
    why: 'Radials radiate outward FROM the station — east of the station is the 090 radial, regardless of which way you’re flying.',
    cite: 'PHAK Ch. 16',
  },
  {
    slug: 'vor-heading-independent',
    q: 'A VOR CDI needle deflects left. This means —',
    choices: [
      'the selected course is to your left, regardless of heading',
      'you must turn left',
      'you are left of the selected course',
    ],
    answer: 0,
    why: 'The CDI shows position relative to the OBS course and ignores heading entirely. With proper (non-reverse) sensing, the needle points toward the course.',
    cite: 'PHAK Ch. 16',
  },
  {
    slug: 'vot',
    q: 'Checking a VOR receiver on a VOT, the proper indication is —',
    choices: [
      '0° FROM or 180° TO, within ±4°',
      '180° FROM or 0° TO, within ±4°',
      'any radial, within ±6°',
    ],
    answer: 0,
    why: 'A VOT radiates the 360 radial everywhere: set 000 and get FROM, or 180 and get TO — “Cessna 182.” Tolerance ±4°.',
    cite: '14 CFR 91.171; AIM 1-1-4',
  },
  {
    slug: 'lat-nm',
    q: 'One minute of latitude equals approximately —',
    choices: ['1 statute mile', '1 nautical mile', '10 nautical miles'],
    answer: 1,
    why: 'That’s the definition-adjacent trick that turns the chart’s latitude scale into a distance ruler. (Longitude minutes shrink toward the poles.)',
    cite: 'PHAK Ch. 16',
  },
  {
    slug: 'flightplan-close',
    q: 'You forget to close your VFR flight plan after landing. What happens?',
    choices: [
      'Nothing until 24 hours pass',
      'Search and rescue procedures begin ~30 minutes after your ETA',
      'The FAA issues an automatic deviation',
    ],
    answer: 1,
    why: 'The entire function of a VFR flight plan is SAR. Not closing it launches people looking for your wreck — close it by phone/FSS immediately on landing.',
    cite: 'AIM 5-1-14',
  },
  {
    slug: 'diversion-first',
    q: 'Weather ahead forces a diversion. Your FIRST action should be —',
    choices: [
      'compute an exact heading with the plotter',
      'turn toward the alternate approximately, then refine course, time, and fuel',
      'descend to get below the weather while deciding',
    ],
    answer: 1,
    why: 'Turn first — away from the problem — then do math. Precision can follow; flying toward deteriorating weather while computing cannot.',
    cite: 'AFH; PHAK Ch. 16',
  },
  {
    slug: 'ded-update',
    q: 'A checkpoint arrives 3 minutes later than planned. The correct response is to —',
    choices: [
      'ignore small errors and continue on flight-plan times',
      'recompute groundspeed and revise the ETA and fuel-at-destination',
      'increase power to get back on schedule',
    ],
    answer: 1,
    why: 'Late checkpoints mean a real headwind change. Chasing the plan with power burns the reserve you may need; update the plan instead.',
    cite: 'PHAK Ch. 16',
  },
]);

export const regs2Questions = qbank('xr2', 'regs', [
  {
    slug: 'svfr-request',
    q: 'Special VFR in a Class D surface area requires —',
    choices: [
      '1 SM visibility, clear of clouds, and an ATC clearance the pilot requests',
      '3 SM visibility and two-way communications',
      'only that the tower is open',
    ],
    answer: 0,
    why: 'SVFR must be requested by the pilot: 1 SM and clear of clouds, day (night adds instrument rating + IFR aircraft).',
    cite: '14 CFR 91.157',
  },
  {
    slug: 'complex-endorse',
    q: 'To act as PIC of an airplane with retractable gear, flaps, and a controllable propeller you need —',
    choices: [
      'a complex airplane endorsement',
      'a high-performance endorsement',
      'a new practical test',
    ],
    answer: 0,
    why: 'That combination defines “complex.” High-performance is separate: any engine over 200 hp. Both are one-time instructor endorsements.',
    cite: '14 CFR 61.31',
  },
  {
    slug: 'night-currency-trap',
    q: 'You made 3 touch-and-goes at 10 pm last month. May you carry passengers at night tonight?',
    choices: [
      'Yes — any 3 night landings count',
      'No — night currency landings must be to a FULL STOP',
      'Yes, if within 90 days',
    ],
    answer: 1,
    why: 'Night passenger currency requires 3 full-stop landings in the 1-hour-after-sunset window. Touch-and-goes only count for day currency.',
    cite: '14 CFR 61.57(b)',
  },
  {
    slug: 'right-seat-pax',
    q: 'Your non-pilot friend wants to “fly a bit” from the right seat in cruise. Legal?',
    choices: [
      'No — only certificated pilots may manipulate controls',
      'Yes — the PIC may allow it; responsibility stays with the PIC',
      'Only with an instructor aboard',
    ],
    answer: 1,
    why: 'Part 91 doesn’t prohibit a passenger touching the controls; the PIC remains fully responsible (and they log nothing).',
    cite: '14 CFR 91.3; 61.51',
    unverified: true,
  },
  {
    slug: 'oxygen-1230',
    q: 'You cruise at 13,000 ft MSL for 45 minutes. Regulation requires —',
    choices: [
      'oxygen for the flight crew after the first 30 minutes',
      'oxygen for everyone aboard',
      'nothing below 14,000 ft',
    ],
    answer: 0,
    why: '12,500–14,000: crew on oxygen for the time beyond 30 minutes. Passengers must only be PROVIDED oxygen above 15,000.',
    cite: '14 CFR 91.211',
  },
  {
    slug: 'accident-def',
    q: 'Which event meets the NTSB definition of an “accident”?',
    choices: [
      'A gear-up landing scraping the belly skin',
      'Substantial damage affecting structural strength or flight characteristics',
      'Any event requiring an insurance claim',
    ],
    answer: 1,
    why: 'Accident = death/serious injury or SUBSTANTIAL damage (affecting structure/performance and normally requiring major repair). Simple skin scrapes usually don’t qualify.',
    cite: '49 CFR 830.2',
  },
  {
    slug: 'careless-scope',
    q: 'Buzzing a friend’s house at 200 ft over open farmland, no people or structures within 500 ft. Which rule still gets you?',
    choices: [
      'None — 91.119 was satisfied',
      '91.13 careless or reckless operation, plus any hazard on the eventual pull-up',
      'Only local ordinances',
    ],
    answer: 1,
    why: '91.13 is the catch-all: endangering life or property. Low passes for show routinely convert “legal-ish” into certificate action — and into stall/spin statistics.',
    cite: '14 CFR 91.13, 91.119',
  },
]);

export const performance2Questions = qbank('xf2', 'performance', [
  {
    slug: 'pa-2000',
    q: 'Field elevation 2,000 ft, altimeter 30.42. Pressure altitude?',
    choices: ['approximately 1,500 ft', 'approximately 2,500 ft', 'approximately 2,000 ft'],
    answer: 0,
    why: '(29.92 − 30.42) = −0.50 × 1,000 = −500. High pressure LOWERS pressure altitude: 2,000 − 500 = 1,500.',
    cite: 'PHAK Ch. 11',
  },
  {
    slug: 'da-hot-day',
    q: 'Same airport, same altimeter setting — the afternoon temperature climbs 15°C. Density altitude —',
    choices: ['is unchanged', 'increases roughly 1,800 ft', 'decreases as the air expands'],
    answer: 1,
    why: 'DA rises ~120 ft per °C above standard. Hot afternoons quietly move your sea-level airport into the mountains.',
    cite: 'PHAK Ch. 11',
  },
  {
    slug: 'grass-slope-both',
    q: 'Departing uphill on wet grass with a light tailwind, the POH ground roll figure will be —',
    choices: [
      'roughly accurate',
      'dramatically understated — every factor stacks against you',
      'overstated, since grass is smooth',
    ],
    answer: 1,
    why: 'Grass, slope, and tailwind each add distance and they multiply in effect. Stacked penalties are how planes end up in the fence at book-legal weights.',
    cite: 'POH notes; PHAK Ch. 11',
  },
  {
    slug: 'headwind-effect',
    q: 'Compared with calm wind, landing with a 10-kt headwind makes the ground roll —',
    choices: ['shorter', 'longer', 'unchanged — wind only affects takeoff'],
    answer: 0,
    why: 'Headwind lowers groundspeed at the same approach airspeed — less energy to dissipate, shorter roll. That’s why you land into the wind.',
    cite: 'PHAK Ch. 11',
  },
  {
    slug: 'va-turbulence',
    q: 'Entering turbulence at max gross, you slow to Va. Later, much lighter after fuel burn, the correct speed is —',
    choices: ['the same Va', 'slower than the published max-gross Va', 'faster, since the plane is lighter'],
    answer: 1,
    why: 'Va decreases with weight — light airplanes reach damaging g more easily. POHs publish Va at two or three weights for exactly this reason.',
    cite: 'PHAK Ch. 5, 11',
  },
]);

export const airspace2Questions = qbank('xa2', 'airspace', [
  {
    slug: 'night-g-vfr',
    q: 'Class G at 700 ft AGL at night (outside any traffic pattern) requires —',
    choices: [
      '1 SM, clear of clouds',
      '3 SM and 500/1,000/2,000 cloud clearance',
      '5 SM and 1,000/1,000/1 SM',
    ],
    answer: 1,
    why: 'Night in Class G at/below 1,200 AGL: 3 SM and standard cloud clearances — except within ½ mile of the runway in the pattern (1 SM, COC).',
    cite: '14 CFR 91.155',
  },
  {
    slug: 'towered-in-g',
    q: 'A control tower operates at an airport surrounded ONLY by Class G/E (no D charted). Talking to the tower is —',
    choices: [
      'optional — advisory only',
      'required within 4 NM up to 2,500 AGL when the tower is operating',
      'required within 10 NM',
    ],
    answer: 1,
    why: '91.126(d)/91.127: even without charted Class D, an operating tower must be talked to within 4 NM, surface to 2,500 AGL.',
    cite: '14 CFR 91.126(d)',
    unverified: true,
  },
  {
    slug: 'e-begins',
    q: 'Outside any shading or surface areas, Class E over the US generally begins at —',
    choices: ['700 ft AGL', '1,200 ft AGL', '14,500 ft MSL'],
    answer: 1,
    why: 'The default floor across most of the contiguous US is 1,200 AGL (the old blue-vignette network now covers nearly everything). 14,500 applies only where charted otherwise.',
    cite: 'AIM 3-2-6',
  },
  {
    slug: 'bravo-vfr-alt',
    q: 'While being vectored VFR inside Class B, the hemispheric cruising altitude rule —',
    choices: [
      'still applies above 3,000 AGL',
      'does not apply — fly ATC-assigned altitudes',
      'applies only above 10,000 ft',
    ],
    answer: 1,
    why: '91.159 excepts aircraft holding or being provided ATC altitude assignments — in the Bravo you fly what ATC gives you.',
    cite: '14 CFR 91.159; 91.131',
    unverified: true,
  },
]);

export const weather2Questions = qbank('xw2', 'weather', [
  {
    slug: 'fb-9900',
    q: 'A winds-aloft forecast shows `9900`. This means —',
    choices: ['wind 990° — a misprint', 'light and variable (less than 5 knots)', '99 kt from due north'],
    answer: 1,
    why: '9900 is the light-and-variable code. Directions above 36 encode winds over 99 kt (subtract 50, add 100 kt).',
    cite: 'AC 00-45',
  },
  {
    slug: 'wind-shift-pass',
    q: 'The surest indication a front has passed your position is —',
    choices: ['rising temperature', 'a wind shift', 'clearing skies'],
    answer: 1,
    why: 'Wind shift (with a pressure minimum) marks frontal passage; temperature and sky changes vary by front type.',
    cite: 'PHAK Ch. 12',
  },
  {
    slug: 'ice-climb-freezing-rain',
    q: 'Flying in rain at −2°C with rapid clear icing. The layer most likely to end it is —',
    choices: [
      'colder air below',
      'warmer air above, where the rain originates',
      'drier air at the same altitude',
    ],
    answer: 1,
    why: 'Freezing rain requires a warm (above 0°C) layer aloft. For a VFR pilot the practical answer is a 180 and land — but the exam wants the physics.',
    cite: 'PHAK Ch. 12',
  },
  {
    slug: 'convective-sigmet-implied',
    q: 'A Convective SIGMET implies which hazards, without listing them?',
    choices: [
      'severe turbulence, severe icing, and low-level wind shear',
      'IFR ceilings only',
      'mountain obscuration',
    ],
    answer: 0,
    why: 'Thunderstorms come bundled: convective SIGMETs imply severe turbulence, severe icing, and LLWS for ALL aircraft — no separate advisory issued.',
    cite: 'AIM 7-1-6',
  },
  {
    slug: 'unstable-signs',
    q: 'Showery precipitation, cumuliform clouds, and a rough ride with excellent visibility between clouds indicate —',
    choices: ['stable air', 'unstable air', 'an inversion'],
    answer: 1,
    why: 'The unstable-air signature. Stable air is the smooth, gray, steady-drizzle, poor-visibility package.',
    cite: 'PHAK Ch. 12',
  },
]);

export const systems2Questions = qbank('xs2', 'systems', [
  {
    slug: 'mag-off-check',
    q: 'During the mag check, switching to one magneto produces NO rpm drop. This suggests —',
    choices: [
      'a perfectly healthy ignition system',
      'a broken ground (P-lead) — that magneto may fire even with the key OFF',
      'fouled spark plugs',
    ],
    answer: 1,
    why: 'Some drop is normal and expected. No drop means the “off” side may not actually be grounding — a hot mag, and a hot prop on the ground.',
    cite: 'PHAK Ch. 7',
  },
  {
    slug: 'asi-vno',
    q: 'The green arc on the airspeed indicator ends at its top at —',
    choices: ['VNE', 'VNO — maximum structural cruising speed', 'VFE'],
    answer: 1,
    why: 'Green ends at VNO; the yellow caution arc runs VNO→VNE (smooth air only); the red line is VNE.',
    cite: 'PHAK Ch. 8',
  },
  {
    slug: 'alt-static-effect',
    q: 'Opening the alternate static source (vented to the cabin) typically makes the altimeter read —',
    choices: ['slightly low', 'slightly high', 'exactly the same'],
    answer: 1,
    why: 'Cabin pressure is slightly below outside static in flight — instruments read a bit high (ASI too). The POH lists corrections.',
    cite: 'PHAK Ch. 8',
  },
  {
    slug: 'carb-descent',
    q: 'Why apply carburetor heat BEFORE reducing power for descent?',
    choices: [
      'to warm the cabin during the descent',
      'at low power, venturi icing is most likely and exhaust heat (the heat source) is weakest',
      'to prevent shock cooling',
    ],
    answer: 1,
    why: 'Closed throttle = maximum ice risk and minimum heat available. Applying it while power (and exhaust heat) is still up is the standard technique.',
    cite: 'PHAK Ch. 7',
  },
]);

export const procedures2Questions = qbank('xp2', 'procedures', [
  {
    slug: 'sign-redwhite',
    q: 'A red sign with white characters at a taxiway intersection is —',
    choices: [
      'a location sign — you are here',
      'a mandatory instruction sign — do not proceed without clearance',
      'a distance-remaining sign',
    ],
    answer: 1,
    why: 'Red/white = mandatory (runway holding positions, no-entry). Black with yellow = location; yellow with black = direction.',
    cite: 'AIM 2-3-8',
  },
  {
    slug: 'blue-lights',
    q: 'At night you find yourself rolling between BLUE edge lights. You are —',
    choices: ['on a runway', 'on a taxiway', 'on a closed surface'],
    answer: 1,
    why: 'Blue edges = taxiway. Runway edges are white. Landing or departing between blue lights is a reportable bad day.',
    cite: 'AIM 2-1-4, 2-1-10',
  },
  {
    slug: 'pcl-clicks',
    q: 'To turn pilot-controlled lighting to maximum intensity you key the mic —',
    choices: ['3 times', '5 times', '7 times'],
    answer: 2,
    why: '7 clicks = high, 5 = medium, 3 = low, all within 5 seconds on the CTAF. Start with 7 and step down.',
    cite: 'AIM 2-1-8',
  },
  {
    slug: 'chevron-use',
    q: 'The chevron-marked pavement before the threshold may be used for —',
    choices: ['taxi only', 'takeoff roll only', 'no aircraft operations at all'],
    answer: 2,
    why: 'Chevrons mark blast pad/stopway/EMAS — structurally or operationally unusable. (Displaced-threshold ARROWS allow taxi/takeoff/rollout.)',
    cite: 'AIM 2-3-3',
  },
  {
    slug: 'four-cs',
    q: 'Realizing you are lost, the recommended sequence begins with —',
    choices: [
      'descend to read water towers',
      'climb, then communicate and confess to ATC/FSS',
      'circle the last known checkpoint until fuel requires a decision',
    ],
    answer: 1,
    why: 'Climb (visibility, radio/nav reception), communicate, confess, comply — and conserve fuel while you sort it out. Descending shrinks your world.',
    cite: 'AFH Ch. 16',
    unverified: true,
  },
]);

export const wb2Questions = qbank('xb2', 'wb', [
  {
    slug: 'moment-calc',
    q: '180-lb pilot at station 37.0. The moment is —',
    choices: ['6,660 lb-in', '4,860 lb-in', '7,020 lb-in'],
    answer: 0,
    why: '180 × 37 = 6,660. Weight × arm, every row, every time.',
    cite: 'PHAK Ch. 10',
  },
  {
    slug: 'over-aft',
    q: 'Your computed CG is 0.3 inch aft of the limit. The most effective fix is usually —',
    choices: [
      'moving weight from the aft baggage area forward, then recomputing',
      'flying gently until fuel burn fixes it',
      'recomputing with standard weights',
    ],
    answer: 0,
    why: 'Move mass forward (bags to a forward compartment, heavy passenger to the front seat) and recompute. Taking off out of limits and hoping is how aft-CG stall accidents start.',
    cite: 'PHAK Ch. 10',
  },
  {
    slug: 'useful-load-calc',
    q: 'Max gross 2,400 lb, basic empty weight 1,680 lb. With a 190-lb pilot and 40 gal of fuel, payload remaining is —',
    choices: ['290 lb', '530 lb', '240 lb'],
    answer: 0,
    why: 'Useful load 720 − 190 pilot − 240 fuel (40×6) = 290 lb for passengers and bags.',
    cite: 'PHAK Ch. 10',
  },
]);

export const aeromed2Questions = qbank('xm2', 'aeromed', [
  {
    slug: 'night-adaptation-loss',
    q: 'After 30 minutes of dark adaptation, a few seconds of bright white light —',
    choices: [
      'has no lasting effect',
      'can destroy much of the adaptation, requiring many minutes to recover',
      'improves subsequent night vision',
    ],
    answer: 1,
    why: 'The rods’ photopigment bleaches quickly and regenerates slowly. Red light and dim panels exist to protect the investment.',
    cite: 'AIM 8-1-6',
  },
  {
    slug: 'alcohol-altitude',
    q: 'Alcohol’s effects at altitude are —',
    choices: [
      'reduced by the cooler air',
      'amplified — histotoxic hypoxia stacks with altitude hypoxia',
      'unchanged from sea level',
    ],
    answer: 1,
    why: 'Alcohol blocks oxygen use in the cells while altitude reduces its supply. The 8-hour rule is a minimum, not a target.',
    cite: 'PHAK Ch. 17; 91.17',
  },
  {
    slug: 'somatogravic-goaround',
    q: 'On a night go-around, full power creates the false sensation of —',
    choices: [
      'a steep climb, tempting you to push the nose down',
      'a descending turn',
      'yawing left',
    ],
    answer: 0,
    why: 'Somatogravic illusion: acceleration reads as pitch-up in the inner ear. Pilots have flown perfectly good airplanes into the ground correcting a “climb” that wasn’t. Trust the attitude indicator.',
    cite: 'AIM 8-1-5',
  },
]);
