# Fishery — project memory

## What this project is

A Roblox game. Solo dev (can do art as well as scripting). Working title Fishery;
the current concept is an **anime character factory**, not a fishing game — the repo
name predates the pivot.

Existing assets the dev already has built elsewhere: a **Sword Factory-style
production line** and a **cleaning game**. The factory codebase is the intended
starting point.

## The concept — "Anime Factory" (settled 20 Aug 2026)

**Factory → sell/display/ascend → zones.** Characters are produced by the existing
Sword Factory-style line, not rolled from a button.

**Three things you do with a character** (this is the core, and it is borrowed from
Fisch's Personal Aquarium, which pays 25%/hr of a fish's value online AND offline):

1. **Sell** commons down the chute for scrap.
2. **Display** rares in your **Hall** — they pay passive income hourly, online and
   offline, forever. Slots are limited, so a better rare means evicting an older one.
   The Hall is public: other players walk past it. That is the flex and the art payoff.
3. **Ascend** a character — pick ONE attribute, pay scrap, roll to push it. Copied
   deliberately from Sword Factory's Ascender, which the dev singled out as the best
   mechanic in that game: it gives agency over a thing you already own, and turns
   "perfect except the rarity" from a heartbreak into a project.

**Combat:** take 3 characters to zone islands reached from your own island. They
auto-attack; the player triggers one ultimate each (keys 1/2/3, ~14s base cooldown).

### Machines (reskinned from Sword Factory)

| Machine | Attribute | Effect |
|---|---|---|
| Molder | Archetype | Model/appearance + base worth |
| Appraiser | Rarity | Worth + stats + visual FX |
| Classifier | Class | Which stat the character leans toward (later) |
| Enchanter | Trait | Multiplicative special effects (later) |

Two at launch (Molder, Appraiser), four ever. Polisher and Upgrader deleted.

### Stats — plain language only

**Damage**, **Speed** (attack rate + ability cooldown), **Luck** (drop rates while
in squad). No RPG jargon — "Charisma/Grit" style naming was explicitly rejected.

## Hard-won constraints (do not relitigate)

- **No real anime characters.** Gamefam DMCA'd Anime Adventures and Anime Fighting
  Simulator X in 2023 and both were removed. Roblox pulls a game in ~24h on a valid
  notice. Original characters in an anime *style* only.
- **Brainrot is dead** — algorithmically filtered since April 2026. Escape Tsunami
  fell ~97% (1.25M CCU June to 36.5K August).
- **Expeditions/send-a-squad-on-a-timer is not gameplay.** Optional overnight side
  system at most.
- **Monetize gently.** Sailor Piece earns ~$2.13M/mo positioned as "fully playable
  for free"; Sol's RNG gives auto-roll away. Rating is distribution.

## The 2026 discovery algorithm (June rework)

Signals: **first-play bounce** (explicit negative), session quality, and retention
split across **D1 / D2-7 / D8-28** (window went 7d to 28d). **Spend is measured
separately.** Benchmarks: **D1 >20%, D7 >8%**.

The single most-rewarded behavior is **returning within 24-48h for a second,
shorter session** — NOT long sessions. Design sessions that *complete* and point at
tomorrow.

Up-and-Coming ranks **growth velocity relative to your own baseline**, so every
update re-spikes it. Ship lean, patch weekly.

## Environment notes

- Rojo project. `rojo build -o Fishery.rbxlx`, `rojo serve`.
- Third-party Roblox stats APIs (rolimons, romonitorstats, ccucheck, ggaid, rtrack,
  bloxquiz, and Roblox's own API) are **403-blocked by the egress policy** in this
  session. WebSearch works; direct scraping does not.
- Prior research lives in `docs/`. Note `docs/chance-mechanics.md` chased
  press-your-luck staking and was a misread of the brief — superseded by
  `docs/roll-mechanics.md`.

## Corrections from the multi-agent analysis (20 Aug 2026)

Full spec: **`docs/build-document.md`** — that is the working document, these are the
load-bearing corrections.

- **Factory is TWO machines at launch** (Molder, Appraiser), four ever (+Classifier,
  +Enchanter). Polisher and Upgrader deleted. A six-machine factory competes with the
  zone for attention and needed five separate governors to stop it. The belt and the
  physical character drop stay — that is the differentiator.
- **Total Luck is hard-capped at 5.0x.** Roblox's Paid Random Items policy requires
  live, dynamically-updating on-screen odds while a sold luck boost is active. Above
  ~5x the Common tier rounds to 0% and the distribution stops being one — that is a
  policy violation, not a balance issue. No Robux reroll or lock tokens (named in the
  policy); rerolls stay earned.
- **Bounce is TWO measured buckets**, `<60s` and `61-180s`, needing different fixes;
  most departures are sub-60s. Discovery playtime is **capped at 60 min/user/day**, so
  optimizing past that buys nothing algorithmically.
- **Squad size is 3, forever, by any means.** No 4th/5th slot as a product.
- **No trading, in any form.** A factory mints items; one duped Sovereign kills the
  rare-pull broadcast layer.
- **The Sword Factory codebase is NOT in this repo** (verified — only the Rojo
  scaffold and docs). Any estimate that assumed "it's a reskin" is unverified.
- **UNRUN, load-bearing test:** build ONE complete Archetype end to end (model, rig,
  idle, attack, ultimate VFX, 8 rarity variants) and time it honestly. The 5/week
  cadence claim was never stress-tested and the roster, Index, weekly patch and
  marketing channel all rest on it. >12 hours means everything re-scales to 2/week.

## Rejected directions and why (do not re-pitch)

- **Racer Factory.** Killed by genre data: the biggest Roblox racing game is Midnight
  Racing Tokyo at ~1.3K CCU, NitroLab Drag Racing has ~104 players, and racing sessions
  average 5-6 min — the worst bracket measured.
- **Fish as the factory output.** In fishing games the *verb is catching*; a factory
  deletes the catching and leaves a conveyor that spits out payouts. Steal the aquarium
  mechanic, not the fish.
- **"One Guy"** (single character, everything is fuel) — dev rejected it outright.
- **Defend the Factory / base defense.** Slot is crowded: Anime RNG Defense, Anime
  Defense RNG, Defend ur Base with Anime, Anime Battle RNG, plus Plants vs Brainrots
  averaging ~856K CCU.
- **Expeditions / assign-to-posts menus.** Not gameplay.

## Session-length benchmarks (target bracket is 30-40 min)

Social hangout 45-60+ · Tycoon 38-45 (idle-inflated) · **Simulator/RPG 30-40** ·
Fish It ~30 · FISH.OS 18.1 · Build A Ring Farm 15.8 · Build to Defend Loot 10.6 ·
Racing 5-6 · Deagle Arena 5.7
