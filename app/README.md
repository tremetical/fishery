# Preflight ✈️

An offline-first study app for the FAA Private Pilot written exam and early
flight training. Built for a phone, one thumb, five-minute sessions, and
airplane mode.

> **This is a study aid.** The FAR/AIM, PHAK, Airplane Flying Handbook, and
> your CFI are the authorities. Cards flagged **UNVERIFIED** contain
> references the author could not fully confirm — treat them with suspicion
> and verify before relying on them. Regulations change; this app doesn't
> know when they do.

## What's inside

- **The path** — a Duolingo-style course: 14 ordered units (phonetic
  alphabet → radio calls → airspace → … → the written), each made of
  bite-size lessons, a hands-on drill, and a **checkpoint mini-test**
  (80% to pass, unlimited retries, fresh questions each attempt). Passing
  unlocks the next unit; the final unit requires a passing full-length sim.
  The Study tab is never locked, and the spaced-repetition engine keeps
  everything the path introduces coming back on schedule.
- **Spaced repetition** — an Anki-style SM-2 scheduler (learning steps, ease
  factor, lapse handling, ±5% fuzz) with **leech detection**: cards that
  keep failing get flagged as trouble spots and surfaced separately.
  ~290 cards across 13 decks, every one with an explanation and citation.
- **Radio trainer** — generated tail numbers, Puget Sound / Alaska airport
  idents, and full radio-call scenarios (taxi, hold short, takeoff, landing,
  call-ups, CTAF). Speech synthesis reads the controller's call; speech
  recognition (where available) checks your readback; everything degrades to
  say-it-aloud-and-self-grade.
- **Airspace explorer** — a tappable cross-section of Classes A–G.
- **METAR Lab** — endlessly generated, meteorologically coherent reports;
  call the flight category, then decode the whole thing.
- **W&B worksheet** — generated loading problems where every step of *your*
  arithmetic is checked: moments, totals, CG, and the go/no-go call.
- **Written exam** — a 98-question bank (3-choice, FAA style) with practice
  mode (instant feedback + citation) and a timed 60-question / 2:30
  simulation that survives an app kill mid-exam.
- **Progress** — streak, 30-day recall rate, per-deck mastery, review
  history, trouble spots, sim score history.
- **Three themes** — dark (default), day, and a red-on-black **night mode**
  that preserves dark adaptation before early flights.

## Architecture notes

- Vite + Preact + TypeScript. No router lib, no state lib. All content is
  typed TypeScript data in `src/content/`.
- **The no-leak rule**: a card's answer is never present in the DOM until
  revealed — conditional rendering, not CSS hiding. Regression-tested in
  `src/components/Flashcard.test.tsx`. Don't "optimize" this into a
  visibility toggle; transition frames and find-in-page will leak it.
- **The scheduler is pure** (`src/lib/srs.ts`): injected clock and RNG,
  pinned by 24 unit tests. If you change a constant, change a test.
- **Generators over canned data** where possible (`radiogen`, `metargen`,
  `wbgen`): prompts and answers derive from the same structure, so answers
  are correct by construction.
- Storage: IndexedDB with `navigator.storage.persist()`, JSON export/import
  backup (share-sheet aware), and an in-memory fallback so hostile webviews
  still run the app.
- PWA: full precache (~250 KB total) via Workbox — genuinely works in
  airplane mode; installable to the home screen. B612 (the Airbus cockpit
  typeface) is bundled locally.

## Develop

```bash
cd app
npm install
npm run dev        # local dev server
npm test           # scheduler + no-leak + content integrity tests
npm run build      # typecheck + production build (dist/)
```

## Deploy

Merging to `main` triggers `.github/workflows/deploy-preflight.yml`, which
builds and publishes to GitHub Pages. One-time setup: **repo Settings →
Pages → Source: GitHub Actions**. Then install it from the browser
(Share → Add to Home Screen on iOS, Install App on Android).

## Content authoring

Decks live in `src/content/decks/*.ts`, exam questions in
`src/content/exam/bank*.ts`. Card ids are stable (`deckId:slug`) and keyed
to review history — never rename a shipped slug; retire the card and add a
new one. Set `unverified: true` on anything you couldn't confirm against a
current source. `npm test` enforces id uniqueness and bank integrity.
