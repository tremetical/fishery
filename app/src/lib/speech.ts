/*
 * Speech synthesis + recognition wrappers. Everything degrades gracefully:
 * no voice APIs → the drills fall back to "say it aloud, reveal, self-grade".
 */

export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

let current: SpeechSynthesisUtterance | null = null;

export function speak(text: string, rate = 0.92): Promise<void> {
  return new Promise((resolve) => {
    if (!canSpeak()) return resolve();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.onend = () => {
      if (current === u) current = null;
      resolve();
    };
    u.onerror = () => resolve();
    current = u;
    window.speechSynthesis.speak(u);
  });
}

export function stopSpeaking(): void {
  if (canSpeak()) window.speechSynthesis.cancel();
  current = null;
}

// ---- recognition (progressive enhancement only) ----

type RecognitionCtor = new () => SpeechRecognitionLike;

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: unknown) => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

export function recognitionAvailable(): boolean {
  const w = window as unknown as Record<string, unknown>;
  return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
}

/**
 * Listen once and return the transcript, or null on any failure.
 * Callers must treat null as "recognition unavailable", not "wrong answer".
 */
export function listenOnce(timeoutMs = 8000): { stop: () => void; result: Promise<string | null> } {
  const w = window as unknown as Record<string, unknown>;
  const Ctor = (w.SpeechRecognition || w.webkitSpeechRecognition) as
    | RecognitionCtor
    | undefined;
  if (!Ctor) return { stop: () => {}, result: Promise.resolve(null) };

  let rec: SpeechRecognitionLike;
  try {
    rec = new Ctor();
  } catch {
    return { stop: () => {}, result: Promise.resolve(null) };
  }

  rec.lang = 'en-US';
  rec.interimResults = false;
  rec.continuous = false;
  rec.maxAlternatives = 1;

  let done = false;
  const result = new Promise<string | null>((resolve) => {
    const finish = (v: string | null) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolve(v);
    };
    const timer = setTimeout(() => {
      try {
        rec.abort();
      } catch {
        /* already stopped */
      }
      finish(null);
    }, timeoutMs);

    rec.onresult = (e) => {
      const t = e.results[0]?.[0]?.transcript ?? null;
      finish(t);
    };
    rec.onerror = () => finish(null);
    rec.onend = () => finish(null);
    try {
      rec.start();
    } catch {
      finish(null);
    }
  });

  return {
    stop: () => {
      try {
        rec.stop();
      } catch {
        /* noop */
      }
    },
    result,
  };
}
