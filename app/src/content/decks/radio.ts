import { deck, type Card } from '../types';

/*
 * ICAO phonetic alphabet + FAA number pronunciation, per AIM 4-2-7.
 * The drill direction is production (see the character → say the word),
 * because saying it under pressure is the skill, not recognizing it.
 */

const LETTERS: [string, string, string][] = [
  ['A', 'Alfa', 'AL-fah'],
  ['B', 'Bravo', 'BRAH-voh'],
  ['C', 'Charlie', 'CHAR-lee'],
  ['D', 'Delta', 'DELL-tah'],
  ['E', 'Echo', 'ECK-oh'],
  ['F', 'Foxtrot', 'FOKS-trot'],
  ['G', 'Golf', 'GOLF'],
  ['H', 'Hotel', 'hoh-TEL'],
  ['I', 'India', 'IN-dee-ah'],
  ['J', 'Juliett', 'JEW-lee-ETT'],
  ['K', 'Kilo', 'KEY-loh'],
  ['L', 'Lima', 'LEE-mah'],
  ['M', 'Mike', 'MIKE'],
  ['N', 'November', 'no-VEM-ber'],
  ['O', 'Oscar', 'OSS-cah'],
  ['P', 'Papa', 'pah-PAH'],
  ['Q', 'Quebec', 'keh-BECK'],
  ['R', 'Romeo', 'ROW-me-oh'],
  ['S', 'Sierra', 'see-AIR-rah'],
  ['T', 'Tango', 'TANG-go'],
  ['U', 'Uniform', 'YOU-nee-form'],
  ['V', 'Victor', 'VIK-tah'],
  ['W', 'Whiskey', 'WISS-key'],
  ['X', 'X-ray', 'ECKS-ray'],
  ['Y', 'Yankee', 'YANG-key'],
  ['Z', 'Zulu', 'ZOO-loo'],
];

const DIGITS: [string, string, string][] = [
  ['0', 'Zero', 'ZEE-ro'],
  ['1', 'One', 'WUN'],
  ['2', 'Two', 'TOO'],
  ['3', 'Three', 'TREE'],
  ['4', 'Four', 'FOW-er'],
  ['5', 'Five', 'FIFE'],
  ['6', 'Six', 'SIX'],
  ['7', 'Seven', 'SEV-en'],
  ['8', 'Eight', 'AIT'],
  ['9', 'Niner', 'NIN-er'],
];

export const phoneticDeck = deck(
  {
    id: 'phonetic',
    subject: 'radio',
    title: 'Phonetic alphabet',
    description:
      'ICAO letters and FAA number pronunciation. Say each one out loud — production, not recognition.',
  },
  [
    ...LETTERS.map(([ch, word, pron]) => ({
      slug: ch.toLowerCase(),
      front: `Say it: **${ch}**`,
      back: word,
      why: `Pronounced **${pron}**.`,
      cite: 'AIM 4-2-7',
      speak: word,
    })),
    ...DIGITS.map(([ch, word, pron]) => ({
      slug: `d${ch}`,
      front: `Say it: **${ch}**`,
      back: word,
      why:
        `Pronounced **${pron}**.` +
        (ch === '9'
          ? ' “Niner” keeps 9 from being confused with the German “nein” and with 5.'
          : ch === '3' || ch === '5'
            ? ' The odd pronunciation survives static and radio clipping.'
            : ''),
      cite: 'AIM 4-2-7',
      speak: word,
    })),
  ],
);

/*
 * Standard words, phrases, and comm procedures. Citations are to the AIM,
 * Pilot/Controller Glossary (P/CG), and 14 CFR.
 */
const phrasCards: (Omit<Card, 'id'> & { slug: string })[] = [
  {
    slug: 'roger',
    front: 'What does **“Roger”** mean — and what does it NOT mean?',
    back: '“I have received all of your last transmission.”',
    why:
      'It is **not** a yes. Never answer a question (“are you holding short?”) with “Roger” — use **Affirmative** or **Negative**.',
    cite: 'P/CG “ROGER”',
  },
  {
    slug: 'wilco',
    front: 'What does **“Wilco”** mean?',
    back: 'I received your message, understand it, and **will comply**.',
    why: 'Roger + compliance. Saying “Roger, wilco” is redundant — wilco already includes it.',
    cite: 'P/CG “WILCO”',
  },
  {
    slug: 'affirm-neg',
    front: 'The standard words for **yes** and **no** on the radio?',
    back: '“Affirmative” and “Negative.”',
    why: '“Yes/no/yeah” die in static. Two long distinct words survive a scratchy transmission.',
    cite: 'P/CG',
  },
  {
    slug: 'standby',
    front: 'ATC says **“Stand by.”** What does that mean, and do you respond?',
    back: 'Wait — the controller will get back to you. No response is expected.',
    why:
      'It is not a clearance and not a denial. If it goes on and you need action, re-contact. “Stand by” after your call-up also means the frequency change or request is NOT approved yet.',
    cite: 'P/CG “STAND BY”',
  },
  {
    slug: 'unable',
    front: 'The word to use when you **cannot comply** with an instruction?',
    back: '“Unable.”',
    why:
      'One word, no apology needed. As PIC you must refuse instructions you can’t safely fly — “unable” is how. Follow with a reason or alternative if useful.',
    cite: 'P/CG “UNABLE”; 14 CFR 91.3',
  },
  {
    slug: 'immediately',
    front: 'ATC adds **“immediately”** to an instruction. What does it convey?',
    back: 'Expedite — compliance without delay is required to avoid an imminent situation.',
    why: 'It is a red-flag word. Act first, tidy up the radio call after.',
    cite: 'P/CG “IMMEDIATELY”',
  },
  {
    slug: 'say-again',
    front: 'You missed part of a transmission. What do you say?',
    back: '“Say again” (optionally: “say again all after …”).',
    why: 'Never guess at a clearance. Asking twice is free; a wrong readback is not.',
    cite: 'P/CG “SAY AGAIN”',
  },
  {
    slug: 'luaw',
    front: '**“Runway 17, line up and wait.”** What are you cleared to do?',
    back: 'Taxi onto Runway 17 and stop, aligned for departure. You are **not** cleared for takeoff.',
    why:
      'Takeoff requires the separate words “cleared for takeoff.” If you’ve waited unusually long, ask — controllers do occasionally forget you.',
    cite: 'P/CG “LINE UP AND WAIT”; AIM 5-2-5',
  },
  {
    slug: 'option',
    front: '**“Cleared for the option”** — what may you do?',
    back: 'Touch-and-go, low approach, missed approach, stop-and-go, or full-stop landing. Your choice.',
    why: 'Used in training so the instructor can decide late. Tell tower if you plan a full stop when practical.',
    cite: 'P/CG “CLEARED FOR THE OPTION”; AIM 4-3-22',
  },
  {
    slug: 'holdshort-readback',
    front: 'Which taxi instruction must **always** be read back, verbatim, with your callsign?',
    back: 'Hold short instructions — read back the words “hold short” and the runway/point, plus your callsign.',
    why:
      'Runway incursions kill people; this readback is the barrier. “Roger” is never an acceptable response to “hold short.”',
    cite: 'AIM 4-3-18',
  },
  {
    slug: 'taxi-to',
    front: 'Ground clears you: “Taxi to Runway 17 via Alpha.” May you **cross other runways** along route Alpha?',
    back: 'No — every runway crossing requires an explicit crossing instruction. And you must hold short of Runway 17 itself until cleared to line up or take off.',
    why:
      'Controllers must issue specific crossing instructions for each runway your route crosses. If the route seems to cross one and you heard no crossing clearance, stop and ask.',
    cite: 'AIM 4-3-18',
  },
  {
    slug: 'callup',
    front: 'The four elements of an **initial call-up**, in order?',
    back: '1. Who you’re calling  2. Who you are  3. Where you are  4. What you want.',
    why: '“Tacoma Tower, Skyhawk seven-three-one-tango-whiskey, ten miles south with information Bravo, inbound full stop.”',
    cite: 'AIM 4-2-3',
  },
  {
    slug: 'abbrev-callsign',
    front: 'When may you shorten “November seven three one tango whiskey” to “one tango whiskey”?',
    back: 'Only after ATC abbreviates it first.',
    why:
      'The controller owns the abbreviation. Also: use your aircraft type in place of “November” on initial contact (“Skyhawk 731TW”) so ATC knows your performance.',
    cite: 'AIM 4-2-4',
  },
  {
    slug: 'readability',
    front: '“How do you hear me?” — what does **“readability 3”** mean, on what scale?',
    back: 'Readable with difficulty, on the 1–5 scale: 1 unreadable, 2 readable now and then, 3 readable with difficulty, 4 readable, 5 perfectly readable.',
    cite: 'P/CG “RADIO CHECK”; AIM 4-2-3 table',
    unverified: true,
  },
  {
    slug: 'guard',
    front: 'The emergency frequency you should monitor when able?',
    back: '121.5 MHz (“Guard”).',
    why: 'FAA encourages monitoring 121.5 on a second radio. ELTs, intercepts, and lost-aircraft calls happen here.',
    cite: 'AIM 6-3-1',
  },
  {
    slug: 'mayday-panpan',
    front: '**“Mayday”** vs **“Pan-Pan”** — the difference?',
    back: 'Mayday ×3 = distress: immediate danger, priority over everything. Pan-Pan ×3 = urgency: concerned about safety but not in immediate danger.',
    why: 'A rough engine over hostile terrain is at least Pan-Pan. Do not be shy about upgrading — nobody bills you for the word.',
    cite: 'AIM 6-3-1, 6-3-2',
  },
  {
    slug: 'squawk-codes',
    front: 'Transponder codes: **VFR**, **hijack**, **comm failure**, **emergency**?',
    back: '1200 VFR · 7500 hijack · 7600 lost comms · 7700 emergency.',
    why: 'Mnemonic: “75 taken alive, 76 radio fix, 77 going to heaven.” Never dial through 75/76/77 when changing codes.',
    cite: 'AIM 4-1-20, 6-2-2, 6-4-2',
  },
  {
    slug: 'ctaf-format',
    front: 'Format of a **CTAF self-announce** at a non-towered field?',
    back: '“[Airport] traffic, [callsign], [position/intentions], [airport].”',
    why:
      '“Tacoma Narrows traffic, Skyhawk 731TW, left downwind Runway 17, full stop, Tacoma Narrows.” Ending with the airport name matters — several fields share one frequency.',
    cite: 'AIM 4-1-9',
  },
  {
    slug: 'traffic-sight',
    front: 'ATC calls traffic. Your two standard replies, seeing it vs not?',
    back: '“Traffic in sight” — or “Negative contact.”',
    why: '“Looking” is fine while you search, then close the loop. Don’t say “tally-ho”; save it for the fox hunt.',
    cite: 'P/CG “TRAFFIC IN SIGHT” / “NEGATIVE CONTACT”',
  },
  {
    slug: 'lightgun-sg',
    front: 'Light gun: **steady green** — in flight, and on the ground?',
    back: 'In flight: cleared to land. On ground: cleared for takeoff.',
    cite: 'AIM 4-3-13; 14 CFR 91.125',
  },
  {
    slug: 'lightgun-fg',
    front: 'Light gun: **flashing green** — in flight, and on the ground?',
    back: 'In flight: return for landing (expect steady green in time). On ground: cleared to taxi.',
    cite: 'AIM 4-3-13; 14 CFR 91.125',
  },
  {
    slug: 'lightgun-sr',
    front: 'Light gun: **steady red** — in flight, and on the ground?',
    back: 'In flight: give way to other aircraft and continue circling. On ground: stop.',
    cite: 'AIM 4-3-13; 14 CFR 91.125',
  },
  {
    slug: 'lightgun-fr',
    front: 'Light gun: **flashing red** — in flight, and on the ground?',
    back: 'In flight: airport unsafe — do not land. On ground: taxi clear of the runway in use.',
    cite: 'AIM 4-3-13; 14 CFR 91.125',
  },
  {
    slug: 'lightgun-fw',
    front: 'Light gun: **flashing white** — meaning (ground only)?',
    back: 'Return to your starting point on the airport.',
    why: 'There is no in-flight flashing-white signal — you can’t taxi back through the sky.',
    cite: 'AIM 4-3-13; 14 CFR 91.125',
  },
  {
    slug: 'lightgun-rg',
    front: 'Light gun: **alternating red and green** — meaning?',
    back: 'Exercise extreme caution (in flight or on the ground).',
    cite: 'AIM 4-3-13; 14 CFR 91.125',
  },
  {
    slug: 'altitude-phraseology',
    front: 'How do you say **4,500 ft** and **10,500 ft** on the radio?',
    back: '“Four thousand five hundred” and “One zero thousand five hundred.”',
    why: 'Altitudes above 9,900 use individual digits for the thousands: “one zero thousand,” never “ten thousand.”',
    cite: 'AIM 4-2-9',
    unverified: true,
  },
  {
    slug: 'freq-phraseology',
    front: 'How do you pronounce the frequency **118.5** on the radio?',
    back: '“One one eight point five.”',
    why: 'Digits individually, “point” for the decimal. (ICAO says “decimal,” US practice says “point.”)',
    cite: 'AIM 4-2-8',
    unverified: true,
  },
  {
    slug: 'who-first',
    front: 'You just switched to a busy tower frequency. What do you do **before** transmitting?',
    back: 'Listen first — make sure you’re not stepping on an exchange, then key up with a complete call.',
    why:
      'Blocked transmissions produce a squeal both parties lose. Also confirm you actually got the frequency right before assuming the silence means quiet.',
    cite: 'AIM 4-2-2',
  },
];

export const phraseologyDeck = deck(
  {
    id: 'phraseology',
    subject: 'radio',
    title: 'Phraseology & procedures',
    description:
      'Standard words, readbacks, light gun signals, and comm procedures — what to say and what it commits you to.',
  },
  phrasCards,
);
