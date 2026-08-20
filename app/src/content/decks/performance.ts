import { deck } from '../types';

export const performanceDeck = deck(
  {
    id: 'performance',
    subject: 'performance',
    title: 'Performance',
    description:
      'Density altitude, takeoff/landing numbers, and the margins that keep chart optimism from killing you.',
  },
  [
    {
      slug: 'da-def',
      front: 'Define **density altitude**.',
      back: 'Pressure altitude corrected for nonstandard temperature — the altitude the airplane FEELS like it’s at.',
      why: 'High, hot, and humid all raise DA. High DA = less lift, less power, less prop thrust — everything worse at once.',
      cite: 'PHAK Ch. 11',
    },
    {
      slug: 'pa-compute',
      front: 'How do you find **pressure altitude** without touching the airplane?',
      back: 'PA ≈ field elevation + (29.92 − altimeter setting) × 1,000.',
      why: 'KTIW at 294 ft with altimeter 30.12: 294 + (29.92−30.12)×1000 = 94 ft. Or just set 29.92 and read the altimeter.',
      cite: 'PHAK Ch. 11',
    },
    {
      slug: 'da-effects',
      front: 'High density altitude: what happens to your **takeoff roll** and **climb**?',
      back: 'Longer roll (same INDICATED liftoff speed = higher TRUE speed = more distance) and a shallower climb from reduced power and thrust.',
      why: 'The airplane doesn’t know the altitude — it knows the density. Summer afternoon in the mountains is the trap.',
      cite: 'PHAK Ch. 11',
    },
    {
      slug: 'humidity',
      front: 'Effect of **humidity** on performance?',
      back: 'Water vapor is lighter than dry air — humid air is LESS dense, so performance decreases (charts usually don’t even account for it; add margin).',
      cite: 'PHAK Ch. 11',
    },
    {
      slug: 'headwind-component',
      front: 'Runway 17, wind 140° at 10 kt. Rough headwind/crosswind split?',
      back: '30° off: headwind ≈ 8–9 kt (cos30°), crosswind ≈ 5 kt (sin30° = half the wind).',
      why: 'Rules of thumb: 30° off = half the wind is crosswind; 45° = ~70%; 60°+ = treat it all as crosswind.',
      cite: 'PHAK Ch. 11',
    },
    {
      slug: 'tailwind-cost',
      front: 'Why is even a small **tailwind** on takeoff so expensive?',
      back: 'You must accelerate to groundspeed = liftoff airspeed + tailwind: a 10% groundspeed increase adds ~21% to takeoff distance — typical charts show a 10-kt tailwind adding 50%+.',
      cite: 'PHAK Ch. 11; POH charts',
    },
    {
      slug: 'grass-slope',
      front: 'Effect of **grass** and **upslope** on takeoff distance?',
      back: 'Both increase it — dry grass can add ~15–30% roll (POH notes vary); slope trades: take off downhill/land uphill when wind allows and terrain permits.',
      cite: 'POH performance notes',
      unverified: true,
    },
    {
      slug: 'fifty-percent',
      front: 'The margin rule of thumb for POH takeoff/landing numbers?',
      back: 'Add at least 50% to book numbers — charts were flown by test pilots with new engines and perfect technique.',
      why: 'If the 50-ft-obstacle number × 1.5 doesn’t fit the runway, it doesn’t fit.',
      cite: 'FAA guidance / AFH',
    },
    {
      slug: 'weight-effect',
      front: 'Effect of **weight** on: takeoff distance, climb, cruise, stall speed, landing?',
      back: 'All worse: longer roll, weaker climb, slower cruise, higher stall speed, longer landing roll.',
      cite: 'PHAK Ch. 11',
    },
    {
      slug: 'chart-interp',
      front: 'Conditions fall between chart lines (e.g., 2,300 lb between 2,200 and 2,400 columns). What do you do?',
      back: 'Interpolate between values — or use the more conservative column. Never round toward optimism.',
      cite: 'PHAK Ch. 11',
    },
    {
      slug: 'ias-tas',
      front: 'How does **TAS** relate to **IAS** as you climb (fixed IAS)?',
      back: 'TAS increases ~2% per 1,000 ft — thinner air means less dynamic pressure at the same true speed.',
      why: 'Your pattern INDICATED speeds stay the same at high-elevation airports, but true (and ground) speed are higher — hence the longer float and roll.',
      cite: 'PHAK Ch. 11',
    },
    {
      slug: 'std-lapse',
      front: 'Standard temperature at sea level and at 6,000 ft?',
      back: '15°C at sea level, lapsing ~2°C/1,000 ft → about 3°C at 6,000.',
      why: 'Comparing actual vs standard temp tells you which way density altitude is off.',
      cite: 'PHAK Ch. 11',
    },
    {
      slug: 'service-ceiling',
      front: '**Service ceiling** vs **absolute ceiling**?',
      back: 'Service: altitude where max climb rate drops to 100 fpm. Absolute: climb rate zero (Vx = Vy).',
      cite: 'PHAK Ch. 11',
    },
    {
      slug: 'cruise-charts',
      front: 'What does the POH cruise chart trade against power setting?',
      back: 'True airspeed vs fuel flow/endurance at each altitude and RPM — higher power: faster but thirstier; the chart is how you plan real fuel burns.',
      cite: 'POH Section 5',
    },
    {
      slug: 'landing-da',
      front: 'Does high density altitude lengthen the **landing** roll too? Why?',
      back: 'Yes — same indicated approach speed means higher TRUE (and ground) speed, so more energy to dissipate.',
      cite: 'PHAK Ch. 11',
    },
    {
      slug: 'max-endurance-range',
      front: '**Max endurance** vs **max range** speed — which is slower and when do you want each?',
      back: 'Endurance (min fuel per HOUR) is slower — holding/delaying. Range (min fuel per MILE) is faster, near best L/D — stretching a trip or a glide-adjacent diversion.',
      cite: 'PHAK Ch. 11',
    },
  ],
);
