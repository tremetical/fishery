/*
 * METAR generator: builds a raw report from structured truth, so the decode
 * and flight category shown after reveal are correct by construction.
 * Scenario presets keep the elements meteorologically coherent (fog comes
 * with tiny temp/dewpoint spreads, thunderstorms with gusts and CBs, etc.).
 */

import type { Rng } from './radiogen';

const STATIONS = [
  'KTIW', 'KPWT', 'KOLM', 'KBFI', 'KPAE', 'KRNT', 'KSEA', 'KPLU', 'KSHN',
  'KCLS', 'KAWO', 'PANC', 'PAMR', 'PAFA', 'PAJN', 'PAKT', 'PAHO',
];

export interface SkyLayer {
  amount: 'FEW' | 'SCT' | 'BKN' | 'OVC';
  base: number; // feet AGL
  cb?: boolean;
}

export interface Metar {
  station: string;
  day: number;
  hour: number;
  minute: number;
  windDir: number | 'VRB' | 'CALM';
  windSpeed: number;
  gust?: number;
  visibility: number; // statute miles
  weather: string[]; // codes like '-RA', 'BR'
  sky: SkyLayer[]; // empty = CLR
  temp: number;
  dewpoint: number;
  altimeter: number; // e.g. 29.92
}

export type Category = 'VFR' | 'MVFR' | 'IFR' | 'LIFR';

function pick<T>(arr: readonly T[], rng: Rng): T {
  return arr[Math.floor(rng() * arr.length)];
}
function ri(min: number, max: number, rng: Rng): number {
  return min + Math.floor(rng() * (max - min + 1));
}

type Preset = 'clear' | 'nice' | 'marginal' | 'rain' | 'fog' | 'storm' | 'snow';

export function makeMetar(rng: Rng = Math.random): Metar {
  const preset = pick(
    ['clear', 'nice', 'nice', 'marginal', 'marginal', 'rain', 'rain', 'fog', 'storm', 'snow'] as Preset[],
    rng,
  );
  const station = pick(STATIONS, rng);
  const day = ri(1, 28, rng);
  const hour = ri(0, 23, rng);
  const minute = pick([53, 56, 47, 15, 35], rng);

  let windDir: Metar['windDir'] = ri(1, 36, rng) * 10;
  let windSpeed = ri(4, 14, rng);
  let gust: number | undefined;
  let visibility = 10;
  let weather: string[] = [];
  let sky: SkyLayer[] = [];
  let temp = ri(8, 24, rng);
  let spread = ri(4, 12, rng);
  const altimeter = 29.5 + Math.round(rng() * 100) / 100;

  switch (preset) {
    case 'clear':
      if (rng() < 0.4) {
        windDir = 'CALM';
        windSpeed = 0;
      }
      sky = rng() < 0.5 ? [] : [{ amount: 'FEW', base: ri(40, 120, rng) * 100 }];
      break;
    case 'nice':
      sky = [
        { amount: pick(['FEW', 'SCT'] as const, rng), base: ri(30, 60, rng) * 100 },
        { amount: pick(['SCT', 'BKN'] as const, rng), base: ri(80, 150, rng) * 100 },
      ];
      break;
    case 'marginal':
      visibility = pick([3, 4, 5], rng);
      weather = [pick(['BR', '-RA', 'HZ'], rng)];
      sky = [
        { amount: 'SCT', base: ri(12, 20, rng) * 100 },
        { amount: pick(['BKN', 'OVC'] as const, rng), base: ri(15, 30, rng) * 100 },
      ];
      spread = ri(2, 4, rng);
      break;
    case 'rain':
      visibility = pick([2, 3, 4, 6], rng);
      weather = [pick(['-RA', 'RA', '-DZ'], rng), 'BR'];
      sky = [
        { amount: 'SCT', base: ri(6, 12, rng) * 100 },
        { amount: 'BKN', base: ri(10, 25, rng) * 100 },
        { amount: 'OVC', base: ri(30, 50, rng) * 100 },
      ];
      spread = ri(1, 3, rng);
      temp = ri(6, 14, rng);
      windSpeed = ri(8, 18, rng);
      if (rng() < 0.4) gust = windSpeed + ri(6, 12, rng);
      break;
    case 'fog':
      visibility = pick([0.25, 0.5, 0.75, 1], rng);
      weather = [visibility < 0.625 ? 'FG' : 'BR'];
      sky =
        rng() < 0.5
          ? [{ amount: 'OVC', base: ri(1, 4, rng) * 100 }]
          : [{ amount: 'BKN', base: ri(2, 5, rng) * 100 }];
      windDir = rng() < 0.5 ? 'CALM' : windDir;
      windSpeed = windDir === 'CALM' ? 0 : ri(2, 5, rng);
      temp = ri(4, 12, rng);
      spread = pick([0, 1], rng);
      break;
    case 'storm':
      visibility = pick([1, 2, 3, 5], rng);
      weather = [pick(['TSRA', '+TSRA', 'VCTS'], rng)];
      sky = [
        { amount: 'SCT', base: ri(15, 25, rng) * 100 },
        { amount: 'BKN', base: ri(25, 45, rng) * 100, cb: true },
      ];
      windSpeed = ri(12, 22, rng);
      gust = windSpeed + ri(10, 20, rng);
      temp = ri(18, 30, rng);
      spread = ri(2, 6, rng);
      break;
    case 'snow':
      visibility = pick([0.5, 0.75, 1, 2], rng);
      weather = [pick(['-SN', 'SN'], rng)];
      sky = [
        { amount: 'BKN', base: ri(8, 15, rng) * 100 },
        { amount: 'OVC', base: ri(15, 30, rng) * 100 },
      ];
      temp = ri(-6, 0, rng);
      spread = ri(1, 3, rng);
      break;
  }

  return {
    station,
    day,
    hour,
    minute,
    windDir,
    windSpeed,
    gust,
    visibility,
    weather,
    sky,
    temp,
    dewpoint: temp - spread,
    altimeter,
  };
}

function pad(n: number, len = 2): string {
  return String(Math.abs(n)).padStart(len, '0');
}

function visToStr(v: number): string {
  const whole = Math.floor(v);
  const frac = v - whole;
  const fracStr = frac === 0.25 ? '1/4' : frac === 0.5 ? '1/2' : frac === 0.75 ? '3/4' : '';
  if (whole === 0) return `${fracStr}SM`;
  return fracStr ? `${whole} ${fracStr}SM` : `${whole}SM`;
}

function tempToStr(t: number): string {
  return t < 0 ? `M${pad(t)}` : pad(t);
}

export function rawMetar(m: Metar): string {
  const parts = [m.station, `${pad(m.day)}${pad(m.hour)}${pad(m.minute)}Z`];
  if (m.windDir === 'CALM') parts.push('00000KT');
  else if (m.windDir === 'VRB') parts.push(`VRB${pad(m.windSpeed)}KT`);
  else parts.push(`${pad(m.windDir, 3)}${pad(m.windSpeed)}${m.gust ? `G${pad(m.gust)}` : ''}KT`);
  parts.push(visToStr(m.visibility));
  parts.push(...m.weather);
  if (m.sky.length === 0) parts.push('CLR');
  else parts.push(...m.sky.map((l) => `${l.amount}${pad(l.base / 100, 3)}${l.cb ? 'CB' : ''}`));
  parts.push(`${tempToStr(m.temp)}/${tempToStr(m.dewpoint)}`);
  parts.push(`A${pad(Math.round(m.altimeter * 100), 4)}`);
  return parts.join(' ');
}

/** Ceiling: lowest broken or overcast layer, in feet AGL (null = none). */
export function ceiling(m: Metar): number | null {
  const c = m.sky.filter((l) => l.amount === 'BKN' || l.amount === 'OVC');
  return c.length ? Math.min(...c.map((l) => l.base)) : null;
}

export function category(m: Metar): Category {
  const c = ceiling(m) ?? Infinity;
  const v = m.visibility;
  if (c < 500 || v < 1) return 'LIFR';
  if (c < 1000 || v < 3) return 'IFR';
  if (c <= 3000 || v <= 5) return 'MVFR';
  return 'VFR';
}

const WX_WORDS: Record<string, string> = {
  RA: 'rain', '-RA': 'light rain', '+RA': 'heavy rain',
  DZ: 'drizzle', '-DZ': 'light drizzle',
  SN: 'snow', '-SN': 'light snow',
  BR: 'mist', FG: 'fog', HZ: 'haze',
  TSRA: 'thunderstorm with rain', '+TSRA': 'thunderstorm with heavy rain',
  VCTS: 'thunderstorm in the vicinity',
};

const AMOUNT_WORDS = { FEW: 'few', SCT: 'scattered', BKN: 'broken', OVC: 'overcast' };

/** Plain-English decode, line by line — derived from the same structure. */
export function decodeMetar(m: Metar): string[] {
  const lines: string[] = [];
  lines.push(`${m.station}, observed day ${m.day} at ${pad(m.hour)}${pad(m.minute)} Zulu`);
  if (m.windDir === 'CALM') lines.push('Wind calm');
  else if (m.windDir === 'VRB') lines.push(`Wind variable at ${m.windSpeed} kt`);
  else
    lines.push(
      `Wind from ${pad(m.windDir, 3)}° true at ${m.windSpeed} kt${m.gust ? `, gusting ${m.gust}` : ''}`,
    );
  lines.push(`Visibility ${m.visibility} statute mile${m.visibility === 1 ? '' : 's'}`);
  for (const w of m.weather) lines.push(`Weather: ${WX_WORDS[w] ?? w}`);
  if (m.sky.length === 0) lines.push('Sky clear');
  else
    for (const l of m.sky)
      lines.push(
        `${AMOUNT_WORDS[l.amount]} at ${l.base.toLocaleString()} ft AGL${l.cb ? ' (cumulonimbus!)' : ''}`,
      );
  const c = ceiling(m);
  lines.push(c === null ? 'No ceiling' : `Ceiling: ${c.toLocaleString()} ft`);
  lines.push(`Temperature ${m.temp}°C, dewpoint ${m.dewpoint}°C (spread ${m.temp - m.dewpoint}°)`);
  lines.push(`Altimeter ${m.altimeter.toFixed(2)} inHg`);
  return lines;
}
