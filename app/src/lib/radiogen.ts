/*
 * Generators for radio drills: tail numbers, airport identifiers, and full
 * radio-call scenarios. The expected answer is derived from the same
 * structured data as the prompt, so it is correct by construction.
 *
 * Airports are weighted toward Puget Sound + Alaska fields the user will
 * actually fly around. Runway numbers are real; frequencies and scenario
 * details are PLAUSIBLE PRACTICE DATA, not current real-world values.
 */

export interface Airport {
  id: string; // ICAO ident
  name: string; // spoken facility name
  towered: boolean;
  runways: string[]; // e.g. '17', '35', '16R'
  region: 'puget' | 'alaska';
}

export const AIRPORTS: Airport[] = [
  { id: 'KTIW', name: 'Tacoma Narrows', towered: true, runways: ['17', '35'], region: 'puget' },
  { id: 'KPWT', name: 'Bremerton National', towered: false, runways: ['2', '20'], region: 'puget' },
  { id: 'KOLM', name: 'Olympia Regional', towered: true, runways: ['17', '35', '8', '26'], region: 'puget' },
  { id: 'KBFI', name: 'Boeing Field', towered: true, runways: ['14L', '32R', '14R', '32L'], region: 'puget' },
  { id: 'KPAE', name: 'Paine Field', towered: true, runways: ['16R', '34L', '16L', '34R'], region: 'puget' },
  { id: 'KRNT', name: 'Renton', towered: true, runways: ['16', '34'], region: 'puget' },
  { id: 'KSEA', name: 'Seattle-Tacoma', towered: true, runways: ['16L', '16C', '16R', '34L', '34C', '34R'], region: 'puget' },
  { id: 'KPLU', name: 'Pierce County', towered: false, runways: ['17', '35'], region: 'puget' },
  { id: 'KSHN', name: 'Sanderson Field', towered: false, runways: ['5', '23'], region: 'puget' },
  { id: 'KCLS', name: 'Chehalis-Centralia', towered: false, runways: ['16', '34'], region: 'puget' },
  { id: 'KAWO', name: 'Arlington', towered: false, runways: ['16', '34'], region: 'puget' },
  { id: 'PANC', name: 'Anchorage', towered: true, runways: ['7L', '25R', '7R', '25L', '15', '33'], region: 'alaska' },
  { id: 'PAMR', name: 'Merrill Field', towered: true, runways: ['7', '25', '16', '34'], region: 'alaska' },
  { id: 'PAFA', name: 'Fairbanks', towered: true, runways: ['2L', '20R', '2R', '20L'], region: 'alaska' },
  { id: 'PAJN', name: 'Juneau', towered: true, runways: ['8', '26'], region: 'alaska' },
  { id: 'PAKT', name: 'Ketchikan', towered: false, runways: ['11', '29'], region: 'alaska' },
  { id: 'PAHO', name: 'Homer', towered: false, runways: ['4', '22'], region: 'alaska' },
];

const PHONETIC: Record<string, string> = {
  A: 'Alfa', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot',
  G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliett', K: 'Kilo', L: 'Lima',
  M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo',
  S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey',
  X: 'X-ray', Y: 'Yankee', Z: 'Zulu',
  '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
  '5': 'Fife', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Niner',
};

export function spellPhonetic(s: string): string {
  return [...s.toUpperCase()]
    .filter((c) => PHONETIC[c])
    .map((c) => PHONETIC[c])
    .join(' ');
}

/** "17" -> "one seven", "16R" -> "one six right" */
export function sayRunway(rwy: string): string {
  const words: string[] = [];
  for (const ch of rwy.toUpperCase()) {
    if (ch === 'L') words.push('left');
    else if (ch === 'R') words.push('right');
    else if (ch === 'C') words.push('center');
    else words.push(PHONETIC[ch]?.toLowerCase() ?? ch);
  }
  return words.join(' ');
}

export type Rng = () => number;

function pick<T>(arr: readonly T[], rng: Rng): T {
  return arr[Math.floor(rng() * arr.length)];
}

function pickDigit(rng: Rng): string {
  return String(Math.floor(rng() * 10));
}

// Valid N-number letters exclude I and O (too similar to 1 and 0).
const N_LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ';

/** Random plausible US registration, e.g. N731TW. First digit non-zero. */
export function randomTailNumber(rng: Rng = Math.random): string {
  const first = String(1 + Math.floor(rng() * 9));
  const style = rng();
  if (style < 0.45) {
    // N + 3 digits + 2 letters (very common on trainers)
    return `N${first}${pickDigit(rng)}${pickDigit(rng)}${pick([...N_LETTERS], rng)}${pick([...N_LETTERS], rng)}`;
  } else if (style < 0.7) {
    // N + 4 digits + 1 letter
    return `N${first}${pickDigit(rng)}${pickDigit(rng)}${pickDigit(rng)}${pick([...N_LETTERS], rng)}`;
  } else if (style < 0.9) {
    // N + 5 digits
    return `N${first}${pickDigit(rng)}${pickDigit(rng)}${pickDigit(rng)}${pickDigit(rng)}`;
  }
  // N + 2 digits + 2 letters
  return `N${first}${pickDigit(rng)}${pick([...N_LETTERS], rng)}${pick([...N_LETTERS], rng)}`;
}

export function randomAirport(rng: Rng = Math.random): Airport {
  // puget-heavy weighting: ~75/25
  const pool =
    rng() < 0.75
      ? AIRPORTS.filter((a) => a.region === 'puget')
      : AIRPORTS.filter((a) => a.region === 'alaska');
  return pick(pool, rng);
}

// ---- radio call scenarios ----

export interface CallScenario {
  kind: string;
  /** what you hear (or the situation) */
  prompt: string;
  /** spoken version of the prompt for TTS, if it's a controller call */
  promptSpeak?: string;
  /** the expected transmission out of your mouth */
  expected: string;
  expectedSpeak: string;
  /** teaching note shown after reveal */
  note: string;
  /** keywords that must appear in a correct readback (for mic checking) */
  keywords: string[];
}

const TAXIWAYS = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'K', 'M'];

/** Short spoken callsign, type + last three, as used after initial contact. */
function shortCall(tail: string, rng: Rng): { written: string; spoken: string } {
  const type = pick(['Skyhawk', 'Cessna', 'Cherokee', 'Warrior', 'Archer'], rng);
  const last3 = tail.slice(-3);
  return {
    written: `${type} ${last3}`,
    spoken: `${type} ${spellPhonetic(last3)}`,
  };
}

export function makeScenario(rng: Rng = Math.random): CallScenario {
  const kind = pick(
    ['taxi', 'takeoff', 'landing', 'callup', 'ctaf-downwind', 'holdshort'] as const,
    rng,
  );
  const towered = AIRPORTS.filter((a) => a.towered);
  const untowered = AIRPORTS.filter((a) => !a.towered);
  const tail = randomTailNumber(rng);
  const cs = shortCall(tail, rng);

  switch (kind) {
    case 'taxi': {
      const apt = pick(towered, rng);
      const rwy = pick(apt.runways, rng);
      const twys = [pick(TAXIWAYS, rng), pick(TAXIWAYS, rng)].filter(
        (v, i, a) => a.indexOf(v) === i,
      );
      const route = twys.join(', ');
      const routeSpoken = twys.map((t) => PHONETIC[t]).join(', ');
      const instr = `${cs.written}, ${apt.name} Ground, Runway ${rwy}, taxi via ${route}`;
      const expected = `Runway ${rwy}, taxi via ${route}, ${cs.written}`;
      return {
        kind: 'Taxi clearance',
        prompt: `Ground says:\n“${instr}”`,
        promptSpeak: `${cs.spoken}, ${apt.name} ground, runway ${sayRunway(rwy)}, taxi via ${routeSpoken}`,
        expected: `“${expected}”`,
        expectedSpeak: `Runway ${sayRunway(rwy)}, taxi via ${routeSpoken}, ${cs.spoken}`,
        note: 'Read back the runway and route, end with your callsign. If any hold-short had been included, those exact words must be read back too.',
        keywords: ['runway', rwy.toLowerCase(), ...twys.map((t) => PHONETIC[t].toLowerCase())],
      };
    }
    case 'holdshort': {
      const apt = pick(towered.filter((a) => a.runways.length > 2), rng);
      const rwy = pick(apt.runways, rng);
      let cross = pick(apt.runways, rng);
      if (cross === rwy) cross = apt.runways[(apt.runways.indexOf(rwy) + 2) % apt.runways.length];
      const twy = pick(TAXIWAYS, rng);
      const instr = `${cs.written}, Runway ${rwy}, taxi via ${twy}, hold short of Runway ${cross}`;
      const expected = `Runway ${rwy}, taxi via ${twy}, hold short of Runway ${cross}, ${cs.written}`;
      return {
        kind: 'Hold short — mandatory readback',
        prompt: `${apt.name} Ground says:\n“${instr}”`,
        promptSpeak: `${cs.spoken}, runway ${sayRunway(rwy)}, taxi via ${PHONETIC[twy]}, hold short of runway ${sayRunway(cross)}`,
        expected: `“${expected}”`,
        expectedSpeak: `Runway ${sayRunway(rwy)}, taxi via ${PHONETIC[twy]}, hold short of runway ${sayRunway(cross)}, ${cs.spoken}`,
        note: 'Hold-short instructions must be read back verbatim with your callsign — “Roger” is never acceptable. (AIM 4-3-18)',
        keywords: ['hold short', 'runway', cross.toLowerCase()],
      };
    }
    case 'takeoff': {
      const apt = pick(towered, rng);
      const rwy = pick(apt.runways, rng);
      const wind = `${pick(['calm', '170 at 8', '350 at 6', '160 at 10', '200 at 7'], rng)}`;
      const instr = `${cs.written}, ${apt.name} Tower, wind ${wind}, Runway ${rwy}, cleared for takeoff`;
      const expected = `Runway ${rwy}, cleared for takeoff, ${cs.written}`;
      return {
        kind: 'Takeoff clearance',
        prompt: `Tower says:\n“${instr}”`,
        promptSpeak: `${cs.spoken}, ${apt.name} tower, wind ${wind === 'calm' ? 'calm' : wind.replace(' at ', ', at ')}, runway ${sayRunway(rwy)}, cleared for takeoff`,
        expected: `“${expected}”`,
        expectedSpeak: `Runway ${sayRunway(rwy)}, cleared for takeoff, ${cs.spoken}`,
        note: 'Read back the runway and the clearance. Wind is advisory — no need to read it back.',
        keywords: ['runway', rwy.toLowerCase(), 'cleared for takeoff'],
      };
    }
    case 'landing': {
      const apt = pick(towered, rng);
      const rwy = pick(apt.runways, rng);
      const instr = `${cs.written}, Runway ${rwy}, cleared to land`;
      const expected = `Runway ${rwy}, cleared to land, ${cs.written}`;
      return {
        kind: 'Landing clearance',
        prompt: `${apt.name} Tower says:\n“${instr}”`,
        promptSpeak: `${cs.spoken}, runway ${sayRunway(rwy)}, cleared to land`,
        expected: `“${expected}”`,
        expectedSpeak: `Runway ${sayRunway(rwy)}, cleared to land, ${cs.spoken}`,
        note: 'Always read back the runway with a landing clearance — wrong-runway landings are a real killer.',
        keywords: ['runway', rwy.toLowerCase(), 'cleared to land'],
      };
    }
    case 'callup': {
      const apt = pick(towered, rng);
      const dir = pick(['north', 'south', 'east', 'west', 'northeast', 'southwest'], rng);
      const miles = 5 + Math.floor(rng() * 11);
      const atis = pick(['Alfa', 'Bravo', 'Charlie', 'Delta', 'Echo'], rng);
      const expected = `${apt.name} Tower, ${cs.written.split(' ')[0]} ${tail.slice(1)}, ${miles} miles ${dir} with information ${atis}, inbound full stop`;
      return {
        kind: 'Initial call-up (towered)',
        prompt: `You're a ${cs.written.split(' ')[0]}, tail **${tail}**, ${miles} miles ${dir} of **${apt.name}** (${apt.id}) with ATIS information ${atis}, inbound to land.\n\nMake the initial call.`,
        expected: `“${expected}”`,
        expectedSpeak: `${apt.name} tower, ${cs.written.split(' ')[0]} ${spellPhonetic(tail.slice(1))}, ${miles} miles ${dir}, with information ${atis}, inbound full stop`,
        note: 'Who you’re calling, who you are (full callsign on first contact), where you are, what you want. Type instead of “November” helps ATC picture your speed.',
        keywords: ['tower', dir, 'information', atis.toLowerCase()],
      };
    }
    default: {
      const apt = pick(untowered, rng);
      const rwy = pick(apt.runways, rng);
      const leg = pick(['left downwind', 'left base', 'final', 'crosswind'], rng);
      const expected = `${apt.name} traffic, ${cs.written}, ${leg} Runway ${rwy}, full stop, ${apt.name}`;
      return {
        kind: 'CTAF self-announce (non-towered)',
        prompt: `You're at **${apt.name}** (${apt.id}), non-towered, turning **${leg}** for Runway ${rwy}, planning a full stop.\n\nMake the CTAF call.`,
        expected: `“${expected}”`,
        expectedSpeak: `${apt.name} traffic, ${cs.spoken}, ${leg}, runway ${sayRunway(rwy)}, full stop, ${apt.name}`,
        note: 'Airport name opens AND closes the call — several fields often share the CTAF frequency. Position, intentions, done.',
        keywords: ['traffic', leg.split(' ').pop()!, 'runway', rwy.toLowerCase()],
      };
    }
  }
}

/** Spell-it drill item: a tail number or airport ident to say phonetically. */
export interface SpellItem {
  label: string;
  display: string;
  answer: string;
  note?: string;
}

export function makeSpellItem(rng: Rng = Math.random): SpellItem {
  if (rng() < 0.6) {
    const tail = randomTailNumber(rng);
    return {
      label: 'Tail number',
      display: tail,
      answer: spellPhonetic(tail),
      note: 'On initial contact use the full callsign. After ATC shortens it, you may too.',
    };
  }
  const apt = randomAirport(rng);
  return {
    label: `Airport — ${apt.name}`,
    display: apt.id,
    answer: spellPhonetic(apt.id),
  };
}
