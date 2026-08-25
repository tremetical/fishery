# Fishery — Design Direction

Market read and concept gauntlet, 14 August 2026.
Companion to the visual write-up published alongside this doc.

---

## 1. Market read

Third-party tracker figures — they disagree with each other and with Roblox's own
numbers. Magnitudes only.

| Experience | CCU (Aug) | Peak | Genre | Why it earns |
|---|---|---|---|---|
| Steal a Brainrot | ~189K | 25.8M | Steal-tycoon | Theft creates fear-based return. Est. ~$1.4M/mo. |
| Grow a Garden 2 | 450–505K | — | Idle-grow | Offline accrual + multiplicative mutations. Most *sustained* number on the board. |
| Vet Clinic | — | 736,948 | Horror | 1.4B visits since 10 May launch. Cold-starts can still go vertical. |
| Murder Mystery 2 | ~341K avg | ~1.0M | Social deduction | +72% MoM in July on trade-economy lock-in. |
| 99 Nights in the Forest | 180–360K | — | Co-op survival | Session-based, permadeath stakes. |
| Blox Fruits | ~249K | — | Anime RPG | Gacha rolls funding a long progression ladder. |
| Fisch | — | 1M+ | Fishing | 4.6B visits, 400,000+ catch variations. |
| Build a Base RNG | ~15–25K | — | RNG + defense | Launched 31 May 2026. 31.4M visits / 99% rating in ten weeks, then flat. |

Two framing facts:

- Roblox took **$6.8B in bookings** last year, revenue up 36% Y/Y. The pie is growing.
- Concentration is severe: in several subgenres **the top two titles hold 80%+ of revenue**.
  A competent clone into an occupied slot is now a losing move.

## 2. The five primitives

Strip the top earners down and the same five mechanisms appear. Not genre — the
load-bearing psychology underneath genre.

1. **Variable-ratio roll** — unpredictable reward on a fast cadence.
2. **Persistent visible asset** — converts play into sunk cost and identity.
3. **Offline accrual** — the asset earns while you're gone, so *returning is itself a reward*.
4. **Social stake** — others can see what you have, or take it. Pride, or fear.
5. **Time-gated scarcity** — weather, events, rotating rarities. Sets check-in frequency.

Coverage (● = strong, ○ = absent):

| Experience | Roll | Asset | Offline | Stake | Scarcity | Missing |
|---|---|---|---|---|---|---|
| Build a Base RNG | ●●● | ●●● | ○○○ | ●○○ | ●●○ | **Offline + stake** |
| Grow a Garden 2 | ●●○ | ●●● | ●●● | ●●○ | ●●● | No threat, display only |
| Steal a Brainrot | ●○○ | ●●● | ●●● | ●●● | ●●● | Weak roll |
| Fisch | ●●● | ●●○ | ○○○ | ●●○ | ●●○ | Offline |

**Build a Base RNG has neither offline accrual nor a social stake.** That is why it hit
31M visits in ten weeks then settled at 15–25K CCU instead of climbing to Grow a Garden's
half million. It gives a great reason to keep playing and no reason to come back tomorrow.
Steal a Brainrot has the inverse problem — superb return engine, thin core loop.

**Thesis:** the target design carries all five at once. A variable-ratio roll feeding a
persistent asset, which earns while you sleep, which others can threaten, on a scarcity clock.

## 3. Monetization physics

The standard RNG kit (2× Luck, Auto-Roll, slots) converts well and then stops. Permanent
passes are one-time; once owned, spend goes to zero.

Whale revenue comes from **repeatable consumables attached to something the player fears
losing**. Shields out-earn damage boosts in every base-raid game shipped; insurance is the
highest-margin item in extraction games.

This makes retention and monetization the same decision: you cannot sell protection until
the game creates something worth protecting. **Primitive 4 is the monetization engine.**

| Tier | Price | Item | Repeats | Job |
|---|---|---|---|---|
| Entry | 49–99 R$ | Small luck flask, starter bundle | Yes | Break the first-purchase seal — biggest cliff in the funnel |
| Core | 199–399 R$ | 2× Luck, Auto-Collect, +Storage | No | Baseline ARPPU |
| Committed | 499–999 R$ | 3× Luck, Auto-Roll, second plot | No | Caps out the non-whale |
| **Protection** | 99–499 R$ | Shields, haul insurance, revives | **Yes** | **Whale engine.** Priced against fear, weekly cadence, uncapped |
| Recurring | ~800 R$/mo | Season pass | Yes | Floor revenue + scarcity clock in one object |
| Stacking | Variable | Mutation rerolls | Yes | Uncapped ceiling — needs multiplicative rarity |

Net of the 30% marketplace fee, DevEx converts at $0.0038/R$: a 199 R$ pass nets ~$0.53.
Volume is the whole game.

## 4. Concept slate

All seven use the Fishery fiction. Fishing gives one rare advantage: the roll is
**diegetic**. Casting *is* the variable-ratio pull but reads as a game action, not a slot
machine. Matters for feel and for policy.

| # | Concept | Core loop |
|---|---|---|
| A | **Abyssal Haul** — extraction RNG | cast → descend → better odds deeper → BANK or DIVE → stock fishery |
| B | **Poacher's Coast** — steal-tycoon RNG | roll → stock → earn offline → get raided → defend / revenge |
| C | **Mutate a Fish** — multiplicative chase | catch → roll mutations → stack multipliers → reroll → flex |
| D | **Reef Exhibit** — display tycoon | roll → exhibit → visitors pay → expand → earn offline |
| E | **Trawler Wars** — clan layer | join crew → pool rolls → contest territory → split spoils |
| F | **The Fish Market** — economy-first | catch → list → prices float → speculate |
| G | **Base RNG+** — the safe play | roll → place → defend waves → earn offline |

## 5. Gauntlet — Stage 0: kill screens

Six binary questions. Not scored; any failure kills the concept or forces redesign.

| Concept | K1 Thumbnail | K2 Reward <30s | K3 Return trigger | K4 Whale sink | K5 8-wk v1 | K6 Policy | Result |
|---|---|---|---|---|---|---|---|
| A · Abyssal Haul | Pass | Pass | **Fix** | Pass | Pass | Pass | Survives — K3 only passes once hauls stock something earning offline |
| B · Poacher's Coast | Pass | Pass | Pass | Pass | **Tight** | Pass | Survives — live raiding + persistence + anti-grief in 8 weeks is optimistic |
| C · Mutate a Fish | Pass | Pass | **Fix** | Pass | Pass | Pass | Survives — needs a scarcity clock |
| D · Reef Exhibit | Pass | Pass | **Weak** | **Weak** | Pass | Pass | Survives barely — nothing lost means nothing protective to sell |
| E · Trawler Wars | Pass | **FAIL** | Pass | Pass | **FAIL** | Pass | **Killed** — solo player gets nothing pre-crew; not an 8-week build |
| F · The Fish Market | Weak | **FAIL** | **FAIL** | Pass | Tight | Pass | **Killed** — cold-start death, nothing to trade at minute one |
| G · Base RNG+ | Pass | Pass | Pass | Pass | Pass | Pass | Survives Stage 0, dies at Stage 1 on defensibility |

E and F are real games — just not *first* games. Both are month-three layers on a
population that already exists.

## 6. Gauntlet — Stage 1: weighted scoring

Retention 35%, monetization 30%, virality 15%, feasibility 10%, defensibility 10%.

| Concept | Ret | Mon | Vir | Feas | Def | **Total** |
|---|---|---|---|---|---|---|
| A · Abyssal Haul | 8 | 9 | 8 | 7 | 8 | **8.20** |
| B · Poacher's Coast | 9 | 9 | 9 | 5 | 4 | **8.10** |
| C · Mutate a Fish | 7 | 8 | 7 | 9 | 5 | **7.30** |
| G · Base RNG+ | 7 | 8 | 5 | 8 | 2 | **6.60** |
| D · Reef Exhibit | 6 | 5 | 5 | 8 | 6 | **5.75** |

A and B finish a tenth apart and get there differently. B is the better *game* on retention
and virality, scoring lower only because it's a hard build in the most-cloned genre. A
trades some stickiness for an unoccupied loop.

## 7. Gauntlet — Stage 2: red team

**Against A.** The loop is solitary and inward-facing. Roblox growth is social and
clip-driven; a tense private decision at 400m produces no spectacle. Extraction also churns
casuals — losing a big haul is exactly when a nine-year-old closes the app for good.
*Mitigation:* surface into a shared dock where hauls are announced on arrival; auto-capture
replay clips of near-death surfaces; cap losses at 50% above a depth threshold, with total
loss as an opt-in deep-water risk.

**Against B.** Launching into the platform's most contested genre ~14 months after Steal a
Brainrot's peak, against an incumbent holding the algorithm slot, in a market where the top
two take 80%+. Open raiding also means new players get farmed and quit D1.
*Mitigation:* bracket raids by progression, 72-hour new-account immunity. Neither fixes the
positioning problem, which is the real one.

**Against C.** A pure number-chase burns out — no place, no base, no identity. Realistic
ceiling 30–60K CCU, not half a million, because there's nothing to *own*.
*Mitigation:* none preserving it standalone. Outstanding subsystem, mediocre game.

## 8. Verdict

**Build A, with B's return engine and C's rarity math.**

The three survivors fail in complementary places. A has an unoccupied core loop and a weak
reason to return. B has the best return engine attached to the most crowded genre. C has
the best rarity mathematics and nothing to attach it to.

Composed, they are the all-five-primitives game:

- **Roll** — dive-and-extract, depth-gated odds
- **Asset** — a persistent fishery stocked by hauls
- **Offline** — the fishery earns while away
- **Stake** — a *bounded poaching window*
- **Scarcity** — event tides

On primitive 4, do **not** take Steal a Brainrot's open theft. Take a **bounded poaching
window**: the fishery is vulnerable only for a short, known period each day, defended by a
rolled warden or a bought shield. Keeps the fear-based return trigger and the protection
revenue; removes the constant-victimhood churn. Also sidesteps the "another steal game"
positioning trap.

### Build order

1. **Weeks 1–2 · The hook.** Cast, catch, sell. Nothing else. If the first catch doesn't
   land inside 30 seconds and feel good, no system depth saves it.
2. **Weeks 3–4 · The decision.** Depth tiers, oxygen clock, bank-or-dive. Ship haul
   insurance here — first-purchase item, needs the most live tuning.
3. **Weeks 5–6 · The return.** Persistent fishery, offline accrual, a named welcome-back
   number. Add 2× Luck and Auto-Collect.
4. **Weeks 7–8 · The chase.** Multiplicative mutations, rarity index, first tide event.
5. **Month 3 · The stake.** Poaching window and shields. Then trading (F) and crews (E)
   once population supports them.

### What has to be true

- **Bank-or-dive must be genuinely tense within three minutes.** If players always dive or
  always bank, the core decision is miscalibrated and the game is a grinder. Playtest this
  before building anything else.
- **Offline accrual must be nameable but not sufficient.** "You earned 4.2M while away" is
  the return hook; if it out-earns active play, the dive loop dies.
- **The median player buys insurance once in week one.** First-purchase conversion is the
  whole funnel. Price it to be bought, not to be profitable — the profitable purchases are
  downstream.

### Design constraint

Roblox requires disclosed odds on paid random-item mechanics, and several jurisdictions
regulate them further. The clean structure — and the higher-converting one — is what Build
a Base RNG already does: **keep the roll free**, driven by earned currency, and sell rate
modifiers, convenience and protection. Diegetic fishing helps; a cast reads as gameplay in
a way a crate opening does not.

---

## Sources

Tracker figures are third-party estimates used for magnitude only.

- [PocketGamer.biz — Roblox revenue up 36% Y/Y](https://www.pocketgamer.biz/roblox-revenue-up-36-yy-as-grow-a-garden-and-steal-a-brainrot-drive-multiple-milestones/)
- [Game Developer — Grow a Garden concurrency](https://www.gamedeveloper.com/business/roblox-s-grow-a-garden-had-nearly-22-million-concurrent-users-in-july)
- [Steal a Brainrot — Wikipedia](https://en.wikipedia.org/wiki/Steal_a_Brainrot)
- [RoWatcher — Steal a Brainrot revenue estimate](https://rowatcher.com/games/7709344486/steal-a-brainrot)
- [Rolimon's — Build a base RNG](https://www.rolimons.com/game/99108783264633)
- [Bloxodes — Build a Base RNG stats](https://bloxodes.com/stats/games/build-a-base-rng-10253235584)
- [MaxPower Gaming — Roblox top games, July 2026](https://www.maxpowergaming.co/post/roblox-top-games-july-26)
- [BloxQuiz — live player counts](https://www.bloxquiz.gg/stats/most-played)
- [Fischipedia — Fisch](https://fischipedia.org/wiki/Fisch)
- [Naavik — The State of UGC Games (2026)](https://naavik.co/deep-dives/the-state-of-ugc-games-2026/)
- [UGCCraft — game pass pricing and retention](https://ugccraft.com/blog/roblox-game-passes-pricing-guide/)
- [Roblox Creator Hub — monetization docs](https://create.roblox.com/docs/production/monetization)
