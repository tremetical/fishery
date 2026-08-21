import { deck } from '../types';

/*
 * Ground zero. Every other deck in this app quietly assumes you already
 * know what MSL means, what a pattern is, or that "stall" has nothing to do
 * with the engine. This deck assumes none of it — plain English first, the
 * aviation word second. It is deliberately the first unit in the path.
 *
 * Rule for authoring here: if a card uses a term, that term is either
 * everyday English or was defined by an earlier card in this same deck.
 */

export const basicsDeck = deck(
  {
    id: 'basics',
    subject: 'basics',
    title: 'Start here: the words everyone assumes you know',
    description:
      'The vocabulary and ideas the rest of ground school takes for granted. No prior knowledge needed.',
  },
  [
    // ---- who makes the rules ----
    {
      slug: 'faa',
      front: 'Who is the **FAA**, and why do they matter to you?',
      back: 'Federal Aviation Administration — the US government agency that writes the flying rules, issues pilot certificates, and runs air traffic control.',
      why: 'Everything you study for is ultimately an FAA requirement.',
    },
    {
      slug: 'far-aim',
      front: 'What are the **FARs** and the **AIM**?',
      back: 'FARs = Federal Aviation Regulations, the actual law. AIM = Aeronautical Information Manual, the FAA’s official how-to guide.',
      why: 'Regulations say what you MUST do; the AIM explains how things work and what is recommended. Cards here cite both.',
    },
    {
      slug: 'cfr-numbers',
      front: 'A citation like **14 CFR 91.155** — how do you read that?',
      back: 'Title 14 of the Code of Federal Regulations, Part 91, section 155. “Part 91” is the general operating rules you fly under.',
      why: 'You will see 14 CFR and FAR used interchangeably for the same thing.',
    },
    {
      slug: 'certificate-not-license',
      front: 'Pilots earn a **certificate**, not a license. What is a **rating**?',
      back: 'The certificate is the level (student, private, commercial). A rating adds privileges to it — like airplane single-engine land, or instrument.',
    },
    {
      slug: 'ppl-privileges',
      front: 'What does a **Private Pilot certificate** let you do — and not do?',
      back: 'Carry passengers and fly for your own travel and fun. You may not be paid to fly. You may share operating costs (fuel, oil, rental, fees) pro-rata with passengers.',
      cite: '14 CFR 61.113',
    },
    {
      slug: 'three-tests',
      front: 'What three tests stand between you and a private pilot certificate?',
      back: '1) The **written** (knowledge test, multiple choice). 2) The **oral**, and 3) the **practical** (“checkride”) — oral and flight are one event with an examiner.',
      why: 'This app is aimed mostly at the written, with a checkride-prep section for the other two.',
    },
    {
      slug: 'acs',
      front: 'What is the **ACS**?',
      back: 'Airman Certification Standards — the FAA document listing exactly what you must know and be able to do, and to what tolerance, to pass.',
      why: 'It is the answer key to your checkride. Your examiner works from it.',
    },
    {
      slug: 'cfi',
      front: 'What is a **CFI**?',
      back: 'Certified Flight Instructor — the instructor who teaches you, signs your logbook, and endorses you as ready for each milestone.',
      why: 'Your CFI outranks this app on every disagreement.',
    },
    {
      slug: 'dual-solo-pic',
      front: '**Dual**, **solo**, and **PIC** — what do these logbook words mean?',
      back: 'Dual = flying with an instructor. Solo = alone in the aircraft. PIC = Pilot in Command, the person legally responsible for the flight.',
    },

    // ---- parts of the airplane ----
    {
      slug: 'control-surfaces',
      front: 'Name the three main **control surfaces** and what each one moves.',
      back: 'Ailerons (on the wings) roll it. Elevator (on the tail) pitches the nose up/down. Rudder (the vertical tail) yaws the nose left/right.',
      why: 'Yoke left/right = ailerons. Yoke fore/aft = elevator. Feet on pedals = rudder.',
    },
    {
      slug: 'three-axes',
      front: 'The three **axes** an airplane rotates about?',
      back: 'Longitudinal (nose to tail) — roll. Lateral (wingtip to wingtip) — pitch. Vertical — yaw.',
      why: 'Each control surface moves the plane about one axis: aileron/roll, elevator/pitch, rudder/yaw.',
    },
    {
      slug: 'flaps',
      front: 'What do **flaps** do?',
      back: 'Extend from the back of the wing to add lift and drag, letting you fly slower and descend more steeply. Mostly used for landing.',
    },
    {
      slug: 'trim',
      front: 'What is **trim** for?',
      back: 'It holds a control pressure for you so you can fly hands-light. You trim to a speed, then stop fighting the yoke.',
      why: 'A well-trimmed airplane will hold its speed with you barely touching it.',
    },
    {
      slug: 'empennage',
      front: 'What is the **empennage**?',
      back: 'The tail assembly — vertical stabilizer plus rudder, horizontal stabilizer plus elevator.',
    },
    {
      slug: 'yoke-throttle',
      front: 'In simple terms, what do the **yoke** and **throttle** control?',
      back: 'Yoke (or stick) sets the pitch attitude, which mostly controls airspeed. Throttle sets engine power, which mostly controls whether you climb or descend.',
      why: 'Beginners expect “pull back to go up.” Pull back and you slow down; add power and you climb. They work together.',
    },

    // ---- how it flies ----
    {
      slug: 'four-forces',
      front: 'The **four forces** acting on an airplane in flight?',
      back: 'Lift (up), weight (down), thrust (forward), drag (back).',
      why: 'In steady level flight at constant speed they balance: lift = weight, thrust = drag.',
    },
    {
      slug: 'angle-of-attack',
      front: 'What is **angle of attack** — in plain English?',
      back: 'The angle between the wing and the air actually hitting it. Not the same as how nose-high the airplane looks.',
      why: 'This one idea explains stalls, slow flight, and most of aerodynamics. Worth over-learning.',
    },
    {
      slug: 'stall-plain',
      front: 'What is a **stall**? (This is the most misunderstood word in aviation.)',
      back: 'The wing exceeds its critical angle of attack and stops producing enough lift. The **engine has nothing to do with it**.',
      why: 'A wing can stall at any airspeed and any attitude. Recovery is always: reduce angle of attack — lower the nose.',
    },
    {
      slug: 'stall-speed-flaps',
      front: 'Why does an airplane stall at a **lower speed** with flaps down?',
      back: 'Flaps let the wing make the same lift at a lower speed, so you can fly slower before reaching the critical angle of attack.',
    },

    // ---- speed and altitude ----
    {
      slug: 'knots',
      front: 'What is a **knot**, and why not miles per hour?',
      back: 'One nautical mile per hour. A nautical mile is one minute of latitude, so it maps directly onto charts. 1 kt ≈ 1.15 mph.',
    },
    {
      slug: 'msl-agl',
      front: '**MSL** vs **AGL** — what is the difference?',
      back: 'MSL = height above mean sea level. AGL = height above the ground right below you.',
      why: 'Your altimeter reads MSL. Cloud bases and pattern altitudes are often quoted AGL. Mixing them up is a classic exam trap.',
    },
    {
      slug: 'field-elevation',
      front: 'What is **field elevation**?',
      back: 'The airport’s height above sea level, in feet MSL, measured at the highest point of the usable runways.',
      why: 'Sitting on the ground at a 300 ft field, a correct altimeter reads about 300 — not zero.',
    },
    {
      slug: 'altimeter-setting',
      front: 'Why do you set a number like **29.92** or **30.10** in the altimeter?',
      back: 'It is the local sea-level air pressure in inches of mercury. Pressure changes daily, so you correct the altimeter to match.',
      why: 'You get it from ATIS, an automated station, or ATC. Set it wrong and every altitude you fly is wrong.',
    },
    {
      slug: 'pattern-altitude',
      front: 'What is **pattern altitude**, typically?',
      back: 'The altitude you fly the rectangular circuit around an airport — commonly 1,000 ft AGL for light airplanes.',
    },

    // ---- the airport ----
    {
      slug: 'runway-numbers',
      front: 'Why is a runway numbered **16** at one end and **34** at the other?',
      back: 'The number is its magnetic direction divided by ten. 160° one way, 340° the opposite way — always 18 apart.',
      why: 'Runway 16 points roughly southeast; you land on it heading about 160°.',
    },
    {
      slug: 'which-runway',
      front: 'How is the **runway in use** normally chosen?',
      back: 'The one most closely aligned into the wind — you want to take off and land into a headwind.',
      why: 'A headwind means a slower speed over the ground, so shorter takeoff and landing distances.',
    },
    {
      slug: 'windsock',
      front: 'What does a **windsock** tell you?',
      back: 'Which way the wind is blowing (it points away from where the wind comes from) and roughly how strong — a fully extended sock means a stiff wind.',
    },
    {
      slug: 'traffic-pattern',
      front: 'Name the legs of the **traffic pattern**, in order.',
      back: 'Upwind, crosswind, downwind, base, final.',
      why: 'It is a rectangle around the runway. Downwind runs opposite your landing direction; final lines you up to land.',
    },
    {
      slug: 'taxiway-runway-paint',
      front: 'How do you tell a **taxiway** from a **runway** by its paint?',
      back: 'Taxiway markings and centerlines are **yellow**. Runway markings are **white**.',
      why: 'Yellow = getting there. White = where you fly from.',
    },
    {
      slug: 'hold-short',
      front: 'What are you being told by four yellow lines — two solid, two dashed?',
      back: 'A runway holding position marking. Stop before it unless you have a clearance (towered) or have checked it is clear (non-towered).',
      why: 'You cross from the solid side; the dashed side is for exiting the runway.',
      cite: 'AIM 2-3-5',
    },

    // ---- talking to people ----
    {
      slug: 'towered-vs-not',
      front: 'What is the difference between a **towered** and a **non-towered** airport?',
      back: 'Towered: a controller issues instructions and clearances you must follow. Non-towered: no controller — pilots announce their positions and work it out by standard practice.',
      why: 'Most small airports are non-towered. KTIW is non-towered; KSEA is towered.',
    },
    {
      slug: 'ctaf',
      front: 'What is **CTAF**?',
      back: 'Common Traffic Advisory Frequency — the shared radio frequency pilots use at a non-towered airport to announce what they are doing.',
    },
    {
      slug: 'atis',
      front: 'What is **ATIS**, and why does it have a letter?',
      back: 'Automatic Terminal Information Service — a looping recording of the current weather, runway in use, and notices at a busy airport. Each new recording gets the next letter: Alpha, Bravo, Charlie…',
      why: 'Saying “with information Bravo” tells the controller you already have that recording, so they need not read it to you.',
    },
    {
      slug: 'awos-asos',
      front: 'What are **AWOS** and **ASOS**?',
      back: 'Automated weather stations that broadcast current conditions by radio and phone at smaller airports — the automated cousins of ATIS.',
    },
    {
      slug: 'radio-call-shape',
      front: 'What four things does a standard radio call contain?',
      back: 'Who you are calling, who you are, where you are, and what you want.',
      why: '“Tacoma traffic, Skyhawk 12345, ten miles south, inbound landing, Tacoma.” Same four slots every time.',
    },
    {
      slug: 'phonetic-why',
      front: 'Why say “Alpha Bravo Charlie” instead of “A B C”?',
      back: 'Radios are noisy and many letters sound alike. The phonetic alphabet makes each one unmistakable.',
    },
    {
      slug: 'atc-job',
      front: 'What is **ATC** actually there to do?',
      back: 'Air Traffic Control keeps aircraft separated and traffic flowing. They give instructions, traffic advisories, and clearances.',
      why: 'As a VFR pilot you are still responsible for seeing and avoiding other aircraft — ATC helps, it does not absolve you.',
    },
    {
      slug: 'transponder',
      front: 'What is a **transponder**, and what is a **squawk code**?',
      back: 'A box that replies to radar so you show up as a labeled target. The squawk code is the four-digit number ATC assigns you.',
    },
    {
      slug: 'squawk-1200',
      front: 'What code do you squawk when flying **VFR** with no ATC assignment?',
      back: '**1200**.',
      cite: 'AIM 4-1-20',
    },

    // ---- rules of the sky ----
    {
      slug: 'vfr-ifr',
      front: '**VFR** vs **IFR** — the plain-English difference?',
      back: 'VFR (Visual Flight Rules): you navigate and avoid others by looking outside, so you need decent weather. IFR: you fly by instruments under ATC control, and can operate in cloud.',
      why: 'Your private certificate is VFR. Instrument flying is a separate rating.',
    },
    {
      slug: 'why-airspace',
      front: 'Why does **airspace** get divided into classes at all?',
      back: 'Busier airspace needs tighter control. The classes set how much ATC involvement, equipment, and weather margin is required where.',
      why: 'Roughly: A is the high-altitude airliner world, B the busiest airports, C and D smaller towered fields, E general controlled airspace, G uncontrolled.',
    },
    {
      slug: 'see-and-avoid',
      front: 'What does **see and avoid** mean?',
      back: 'In visual conditions every pilot is responsible for watching for other aircraft and maneuvering to avoid them — regardless of who else is watching.',
      cite: '14 CFR 91.113',
    },
    {
      slug: 'sectional',
      front: 'What is a **sectional chart**?',
      back: 'The VFR paper/digital map of an area — terrain, airports, airspace, obstacles, frequencies — drawn for navigating by looking outside.',
    },
    {
      slug: 'cross-country',
      front: 'What makes a flight a **cross-country** for certificate purposes?',
      back: 'It includes a landing at a point more than 50 nautical miles straight-line from the original departure point.',
      why: 'Shorter trips still count as flight time — just not toward the cross-country requirement.',
      cite: '14 CFR 61.1',
    },

    // ---- the machine and the preflight ----
    {
      slug: 'preflight-inspection',
      front: 'What is a **preflight inspection**?',
      back: 'A walk-around and cockpit check before every flight, following the aircraft’s checklist, to confirm the airplane is airworthy and has enough fuel and oil.',
      cite: '14 CFR 91.103',
    },
    {
      slug: 'runup',
      front: 'What is the **run-up**?',
      back: 'A pre-takeoff engine check in a designated area — you set higher power and verify the magnetos, engine instruments, and controls before committing to fly.',
    },
    {
      slug: 'magnetos',
      front: 'Why does a piston airplane have **two magnetos**?',
      back: 'Each fires its own set of spark plugs independently of the electrical system. Two means redundancy — and slightly better combustion.',
      why: 'This is why the engine keeps running if the alternator or battery quits.',
    },
    {
      slug: 'mixture',
      front: 'What does the **mixture** control do?',
      back: 'Sets the fuel-to-air ratio. Air thins with altitude, so you lean the mixture as you climb to keep the ratio right.',
    },
    {
      slug: 'avgas-sump',
      front: 'What is **100LL**, and why do you **sump** the tanks?',
      back: '100LL is the standard blue aviation gasoline. Sumping drains a small sample from each tank to check for water and contamination before flight.',
      why: 'Water sinks below fuel, so it collects at the drain — that is exactly why you check there.',
    },
    {
      slug: 'density-altitude-plain',
      front: 'What is **density altitude**, roughly?',
      back: 'What altitude the air *feels* like to the airplane. Hot, high, and humid air is thin, so the airplane performs as if it were much higher up.',
      why: 'Thin air = less lift, less thrust, longer takeoff roll, weaker climb.',
    },
    {
      slug: 'wb-why',
      front: 'Why does **weight and balance** matter?',
      back: 'Too heavy and the airplane cannot climb or stop in the distance available. Loaded outside its balance limits it may be unstable or unrecoverable from a stall.',
    },

    // ---- the pilot ----
    {
      slug: 'medical',
      front: 'What is a **medical certificate**?',
      back: 'An FAA-issued document from an aviation medical examiner saying you are medically fit to fly. A third-class medical covers private pilot privileges.',
      why: 'You need one (or BasicMed, an alternative path) before you solo.',
    },
    {
      slug: 'adm',
      front: 'What is **ADM**?',
      back: 'Aeronautical Decision Making — the structured habit of recognizing risk and choosing well, especially about whether to fly at all.',
      why: 'More accidents come from decisions than from stick-and-rudder skill.',
    },
    {
      slug: 'imsafe',
      front: 'What does the **IMSAFE** checklist check?',
      back: 'Illness, Medication, Stress, Alcohol, Fatigue, Emotion — a self-assessment of whether *you* are fit to fly today.',
    },
    {
      slug: 'aviate-navigate',
      front: 'What is the priority order when things go wrong?',
      back: '**Aviate, navigate, communicate** — fly the airplane first, figure out where you are going second, talk on the radio last.',
      why: 'Plenty of accidents involve a crew troubleshooting while nobody flew the airplane.',
    },
  ],
);
