# Fishery — project memory

## What this project is

A Roblox game. Solo dev (can do art as well as scripting). Working title Fishery;
the current concept is an **anime character factory**, not a fishing game — the repo
name predates the pivot.

Existing assets the dev already has built elsewhere: a **Sword Factory-style
production line** and a **cleaning game**. The factory codebase is the intended
starting point.

## The concept — "Anime Factory" (settled 19 Aug 2026)

**Factory → squad → zone → boss wall → better factory.**

Characters are **summons that fight beside you**, not menu entries. This is the
whole point — an earlier design that assigned characters to job "posts" was
rejected as a spreadsheet with no gameplay.

**In the factory (~2 min at a time):** character models pop off the end of the
production line and physically land on a platform. Walk over, grab one, read it at
a glance from its model — big and glowing means a good pull. Throw it in the sell
chute or drag it into your squad. Hold E on machines to upgrade them; each machine
has a lever for **fast production vs lucky production**.

**In the world (~10 min at a time — this is the actual game):** pick three
characters, walk through a portal into a zone. They spawn beside you and
auto-attack. Each has **one big ability on a cooldown the player triggers** (keys
1/2/3). You move, position, dump abilities, kill things, grab drops. A boss at the
end of the zone **gates the next zone** — that wall is what makes the factory
matter.

### Machines (reskinned from Sword Factory)

| Machine | Attribute | Effect |
|---|---|---|
| Molder | Archetype | Model/appearance + base worth |
| Polisher | Condition | Scales stats + production speed |
| Classifier | Class | Which stat the character leans toward |
| Appraiser | Rarity | Worth + stats + visual FX |
| Enchanter | Trait | Multiplicative special effects |
| Upgrader | Level | Scales with player level |

### Stats — plain language only

**Damage**, **Speed** (attack rate + ability cooldown), **Luck** (drop rates while
in squad). No RPG jargon — "Charisma/Grit" style naming was explicitly rejected.

### Rarity ladder — TWO CURVES (the original single ladder was broken)

Odds: Common 1:2 · Uncommon 1:8 · Rare 1:40 · Epic 1:250 · Legendary 1:2,000 ·
Mythic 1:25,000 · Celestial 1:400,000 · Sovereign 1:10,000,000

The original design used the worth multipliers as BOTH sell value and power. Under
those numbers a pull is worth an expected **1.097x a Common** — the whole eight-tier
ladder is under 10% of income, a Mythic equals ~75 seconds of production, and a 2x
Luck pass would move income ~5%. That contradicts "a top pull is an event". Split it:

- **Sell value** `(1/p)^0.65` → **1 / 3.5 / 10 / 32 / 125 / 650 / 3,900 / 32,000**
  (EV 1.76x; ladder becomes 43% of income; 2x Luck becomes a real +43%)
- **Combat power** `M^0.4` → **1.0 / 1.15 / 1.35 / 1.75 / 2.4 / 3.6 / 6.1 / 11.0**

A Sovereign is 32,000x at the chute and 11x in a fight. **This cannot be retrofitted**
once players own Mythics — a nerf is a rating event and rating is distribution.

### Why it fits this dev

Each character costs one idle pose, one attack animation, one ability VFX — so the
art skill *is* the product, and the roster can grow ~5/week forever.

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
