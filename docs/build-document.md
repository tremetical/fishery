# THE FISHERY BUILD DOCUMENT
**Resolved from 8 system analyses + 1 adversarial critique. 20 Aug 2026.**

Verified before writing: `/home/user/fishery` contains `src/shared/Hello.luau`, `src/server/init.server.luau`, `src/client/init.client.luau` and a baseplate `default.project.json`. 624 KB, 7 commits, 6 of them docs. **The Sword Factory codebase is not here.** Roblox's discovery doc confirms first-play bounce is bucketed at `<60s` **and** `61-180s`, playtime is capped at 60 min/user/game/day, and play days split D1 / D2-7 / D8-28. The Paid Random Items policy confirms that any sold luck boost requires numerically explained impact **and dynamically updated live odds on screen while active**.

---

# 1. The three things that matter most

## 1.1 — Cut the factory to a belt and two machines, because the codebase that justified six does not exist

Six of eight analyses priced their work against "code the dev already owns." That discount is void. Every `effort: low` rating touching machines, item spawning, prestige, banking or the tutorial is unverified and should be re-read as `effort: medium` minimum.

This is fortunate, because it forces the decision three analyses reached independently and none were permitted to say. A2 (the analysis *assigned to defend the factory*) names as its own top risk: "the factory cannibalizes world time... the game becomes Sword Factory X with anime art." A3: "the zone is the game." A4: "protect combat feel and the boss-wall burst check above every progression system listed here." A2 then proposes **five separate mechanical governors** — wallet cap, storage cap, level cap tied to zones, rarity ceiling tied to zones, combat-only levelling — whose entire purpose is stopping players enjoying the factory too much. When half a design needs five governors to stop it eating the other half, you do not build a sixth governor. You build less of that half.

**The call:** the belt and the physical character drop stay — that is the ten seconds no competitor has. The *machine economy* is cut to **two machines at launch (Molder, Appraiser), four ever (+ Classifier, + Enchanter)**. Polisher and Upgrader are deleted, their effects folded into the Appraiser roll and combat-earned Ult Ranks respectively. No movable grid. No parallel lines at launch. No Retool/Blueprints. No throw-to-sell.

This removes roughly 40% of the slate's build volume and every one of A2's governors becomes unnecessary, because a two-machine factory cannot out-compete a zone for attention.

## 1.2 — Split rarity into two curves: sell value steep, combat power flat. This is the one irreversible decision.

A8's central finding is the best analytical work in the slate and I reproduced it: under CLAUDE.md's ladder as written, EV of a pull is **1.097× a Common**. The whole eight-tier ladder is 9.7% of income, Mythic-and-above is 0.1%, doubling Luck moves income ~5%, and a 1-in-25,000 Mythic is worth 25 Commons — about 75 seconds of production. "A top-tier pull must be a screen-filling event" is contradicted by the payout table one section below it.

Two curves, one module, shipped week 1:

- **SELL VALUE** = `(1/p)^0.65` normalized to Common. → **1 / 3.5 / 10 / 32 / 125 / 650 / 3,900 / 32,000**. EV rises to **1.76×**, the ladder becomes 43% of income, 2× Luck becomes **+43% income** — a product you can honestly sell.
- **COMBAT POWER** = `M^0.4` on CLAUDE.md's worth multipliers. → **1.0 / 1.15 / 1.35 / 1.75 / 2.4 / 3.6 / 6.1 / 11.0**. A3 and A8 converge here (11.0× and 12.0×); **A4's 3.2× is wrong** and eats itself — under A4's own numbers a Common with a top trait at max Condition (6.4 power) beats a naked Sovereign (2.56), which is the premise of the game inverted.

A Sovereign is 32,000× a Common at the chute and 11× in a fight. Nineteen hours of production, and about two zones of skip. Retrofitting this after players own Mythics is a nerf, and a nerf is a rating event, and rating is distribution.

## 1.3 — Ship the first 180 seconds as a hard-scripted deterministic sequence hitting BOTH bounce buckets, ending on a 6-hour physical countdown

A1 asserts the bounce window is "60–180 seconds, not 30" and places the session peak at 1:50. The doc measures **both** buckets and `<60s` is where most departures happen. A1 built its beat sheet on a false dichotomy.

Both buckets get a designed payload, and the session terminates on a physical object with a clock on it — the only thing in this entire slate that actually targets the algorithm's most-rewarded behaviour (return in 24-48h for a shorter second session).

Bounce sits upstream of D1, which sits upstream of everything. This is 4-5 days of bespoke, non-reusable work producing 180 seconds of game, and it is the highest-return work in the project.

---

# 2. Resolved contradictions

| # | Conflict | Resolution | Why |
|---|---|---|---|
| 2.1 | Factory-first (A1/A2/A7) vs Zone-first (A3) | **Factory cold-open, portal at 0:40, first kill 0:52.** Both. | The physical drop is the thumbnail promise and the differentiator; combat is the retention. Compress rather than choose. A/B trigger defined in §5. |
| 2.2 | First object: Rare (A1/A7) / Common (A3) / Epic (A6 referral) | **Pull 1 = Rare, scripted server-side, identical for every player including referrals.** | Common under-promises the game. Epic-for-referrals miscalibrates the ladder permanently for the exact cohort you're trying to keep. Referrals get a cosmetic, never power. |
| 2.3 | Rarity→damage: 11.0× / 12.0× / 3.2× | **11.0× (`M^0.4`).** A4's compressed band is deleted. | See §1.2. A4's band is self-defeating arithmetic. |
| 2.4 | A8 sell curve (Sovereign = 32,000 scrap) vs A2 wallet cap (2× remaining tier cost) | **A8 wins. Wallet cap deleted.** Hoarding is controlled by bank-slot cost `1.6^N` and by Refit. | A2's cap destroys ~99% of a Sovereign's value on contact and makes A8's late-game sink structurally impossible. They cannot both ship; the sell curve is load-bearing and the cap is a governor made unnecessary by §1.1. |
| 2.5 | Luck stacking: A5 caps at 6.0×, A2's QUALITY throttle is ×9 alone, A4 designs for 16.8× | **Hard cap 5.0× total, published, enforced in the odds module. A2's throttle capped at ×2.5. A4's Ascension luck curve deleted.** | Recomputed under the correct p-set: Common hits 0% at L=6.47, so A5's own 6.0× is too loose. At L=5.0 the Common floor is 22.7%. Above the cap the distribution stops being a distribution — that is a **policy violation, not a balance problem**. |
| 2.6 | Rerolls: sold for Robux (A5) / forbidden (A4) / scrap-priced (A8) | **Scrap only. No Robux reroll SKU, ever.** | Roblox policy names re-roll tokens explicitly. Keeping rerolls earned confines the entire paid-random surface to Luck products, which is one odds panel instead of two regimes. |
| 2.7 | Offline: 3 characters (A6) vs 2,400 (A8) — an 800× spread | **Fixed 15 sealed crates/hour, 8h cap = 120 crates max, contents rolled at current Luck.** Decoupled from the online production curve entirely. | Trivially tunable, can never out-earn active play, and 120 crates is a ~60-second opening ceremony — the strongest first minute of a returning session. A6's 3 makes the physical pile impossible; A8's 2,400 makes it a lag event. |
| 2.8 | Ult cooldown 9/12/18/25s × Guard window 4/6/8s | **Base 14s, floor 10s via Speed. Guard = 20% max HP, full regen in 5s, ults do 8× Guard damage. First session: 8s cooldown.** Interaction verified: three held ults dump inside ~2s and break Guard; two do not. | Nobody did the interaction. Done now. |
| 2.9 | A3's ability queue vs A3's own "save your ults" boss design | **No queue. Deleted.** A not-ready press plays a click and flashes remaining seconds on the portrait. | The queue auto-fires held ults the instant they're up — a direct mechanical defeat of the boss design in the same analysis. |
| 2.10 | A1's 4-HUD-element rule vs ~15 independent timers on 6 clocks across A3–A8 | **One daily clock at 04:00 UTC. One weekly clock at Monday 04:00 UTC. Nothing else.** | Three different daily reset times were specified across the slate. Killed: Rift-every-10-min, hourly challenges, 20-min gift ladder, Shift refill, separate Daily Deal clock, separate Champion's Token clock. |
| 2.11 | Trading month 3 / month 4 / month 6-or-never | **Not in this plan.** Gifting only (see §3.6). | A factory is a machine that mints items. A duped Sovereign is not a 1:10,000,000 event and the entire broadcast layer dies with it. |
| 2.12 | Rarity ladder read three ways (Common 50% / 87.5% / 84.55%) | **Per-tier reading, Common = residual 84.546%.** CLAUDE.md's "Common 1:2" line is wrong and must be edited to ~1:1.2. | Preserves the intent a player will actually check ("1 in 40 pulls is a Rare"). P(Rare+) = **2.954%**. One module, `src/shared/Odds.luau`, imported by the server roller *and* the odds UI. Drift between them is a policy violation, not a bug. |

**Also resolved against the slate:** A2 claims Sword Factory X has been "unmaintained since Dec 2022, only cosmetic patches"; A4 cites Update 11 as current content. Update 11 shipped a 500× multiplier gamepass, 25 new rarities, buffed artifacts/ascender and a returning dungeon. **A4 is right, A2 is wrong**, and A2's "the factory genre is a 2-3K CCU ceiling" framing partly rests on the dead reading. The ceiling argument survives anyway on the *Sword Factory [Beta]* number (~2.3K live, 3.1K peak) — but state it honestly.

---

# 3. System-by-system spec

## 3.1 Onboarding — the first 180 seconds

Deterministic. Server-side `FirstSession` flag in the profile. Zero modals, zero NPC text, zero tutorial GUI.

**Bucket 1 (`<60s`) — must contain a pull, a grab, a squad and combat:**

| t | Beat |
|---|---|
| 0:00–0:03 | `ReplicatedFirst` loading card. Preload exactly the 14 assets used before 3:00 — never `PreloadAsync` the place. Dismiss at 3.0s **or** on preload complete, whichever is later; on a low-end Android this may be 6s and you cannot promise otherwise (A1's "hard cap 3.0s" is not an engineering guarantee). |
| 0:03 | Spawn on the factory floor, camera framed down the belt. **Belt already running.** A capsule is 80% of the way down it. |
| 0:08 | Capsule cracks. **Scripted pull 1 = Rare**, 1.25× scale, blue aura, distinct Archetype. |
| 0:12 | Player walks into it → picks it up overhead. Walking is the only input every Roblox player already has. |
| 0:16 | Drop into the SQUAD podium. It stands up and idles. |
| 0:22 | **Pull 2 = Uncommon**, different Archetype. |
| 0:30 | **Pull 3 = Common.** SELL chute shutter rolls up for the first time with a mechanical clunk and glows. Two better characters are standing beside it — the sell decision is self-evident, not taught. +50 scrap flies out physically. |
| 0:36 | **Pull 4 = Rare + visible Trait aura.** Squad 3/3. |
| 0:38 | The three squad models stand up and turn toward the portal. That is the call to action. No arrow, no GUI. |
| 0:44 | Through the portal. |
| 0:52 | First enemy dead. Coins drop physically. |

Under live odds, P(nothing above Uncommon in 4 pulls) ≈ 88.9%. Scripting is not optional.

**Bucket 2 (`61-180s`) — escalation:**

| t | Beat |
|---|---|
| 1:00 | Exactly one ability portrait lights up. First ultimate fires. Screen shake, 0.15s hitstop, four enemies die at once. |
| 1:08 | Other two portraits light together. |
| 1:15–1:55 | Corridor of ~20 enemies, 40 HP → 80 HP. Player gets **4 ultimate presses** (8s first-session cooldown). |
| 1:55 | **The Shielded Warden.** For 4 seconds auto-attacks visibly clang off the Guard with `0` popups. The failure *is* the lesson: this game cannot be AFK'd. Then the three portraits pulse. |
| 2:15 | Three ults break Guard → fullscreen shockwave, 0.15s freeze, one large damage number. Warden dies. Drops the **Classifier blueprint** + 500 scrap. |
| 2:25 | Back through the portal holding a blueprint, with a tarped machine bay waiting. That unresolved thread carries past 3:00. |
| ~7:00 | Zone 1 boss dies, Zone 2 unlocks, **Prototype machine unlocks**. Player presses it, 6:00:00 countdown starts, screen reads `ZONE 2 OPEN · PROTOTYPE READY IN 5:59:47`. Session completes and points at tomorrow. |

**Rules:** no idle stretch longer than 8 seconds anywhere in the first 180s. No Robux UI until first Warden kill AND 12:00 elapsed. Four persistent HUD elements in session one (scrap counter, squad bar, ability row in-zone, Guard bar on Warden), six ever. Eight unique strings in the first 120s, ≤3 words: `SQUAD` `SELL` `GO` `TAP` `SHIELD` `AGAIN` `ZONE 2` `BACK TOMORROW`. Every string through a locale table from commit one. `TextScaled` always paired with `UITextSizeConstraint` Min 14 / Max 32 — `TextScaled` alone gives 6px text in small frames on phones. 2px black `UIStroke` on all text.

**Ability buttons:** never labelled 1/2/3. Each is the character's **portrait** with a radial cooldown sweep. Anchored `(1,1)`, offset `(-24,-24)`, horizontal, 20px gutters, `UIScale` off viewport height to land at ~13% of screen height (108px at 1×). Clear of the jump button, ≥60px from Roblox's own chrome. Gamepad maps to LB / RB / LT. **~80% of Roblox sessions are mobile.** Keyboard is the minority case.

## 3.2 Factory production loop

**Two machines at launch.** Molder (SHAPE — Archetype, base worth 10/25/60/150 by family, **additive**). Appraiser (GRADE — Rarity, **multiplicative**, the big axis). Classifier (SORT — Class) unlocks on the 2:15 Warden. Enchanter (CHARM — Trait, multiplicative, capped 2.5×) unlocks on the Zone 3 boss. **Polisher and Upgrader are deleted.** One-word verb on every machine face beside the name; four-syllable dev jargon never has to be parsed.

**Only two axes multiply** (Rarity 1→32,000×, Trait ≤2.5×). Everything else is additive. Total spread ≈ 12M:1 — enormous, still quotable by a community value list. Six multiplicative axes gives ~10⁹ and forecloses value lists forever, which is the mechanism keeping MM2 alive at twelve years.

**Production cadence** (BALANCED throttle):

| Point | s/char | chars/hr |
|---|---|---|
| First session | 6 | — |
| Hour 1 | 9 | 400 |
| Hour 5 | 6 | 600 |
| Hour 20 | 4 | 900 |
| Hour 40+ | 3 (×2 lines) | 2,400 |

**Instance budget — this is the fix nobody computed.** A2's hour-40 factory (3 lines × 1 char/2s) times A6's 12-player floor is **18 grabbable models with rarity FX spawning per second**, ~360 concurrent against A6's stated budget of 36. Mobile framerate death.

> **Rule: the belt emits individual models at a maximum of 1 per 4 seconds. Above that throughput it emits sealed crates containing 3.** You never spawn more than 0.25 models/sec/player. The read-at-a-glance premise survives at every production rate, and punching crates open is a better ceremony than a blur. Hard caps: **8 players per factory server** (not 12), max 40 physical models per plot, un-grabbed Commons despawn after 15s, one shared base mesh per Archetype with scale/tint/particle driven by attributes.

**Throttle:** one physical lever on the conveyor head, three detents. VOLUME (4s/char, Luck ×1). BALANCED (9s/char, Luck ×1.6). QUALITY (22s/char, **Luck ×2.5** — A2's ×9 is deleted, it blows the legal cap on its own). It also governs offline crate quality, so setting QUALITY before logout is a real, rewarded ritual. If telemetry shows the throttle moved <2× per session, it is a fake choice and should be cut.

**Upgrades:** cost `150 × 1.14^L`, +8% production, L1–40. L1 = 171, L10 = 556, L20 = 2,060, L40 = 28,270, ~230K scrap to max. Time-to-afford grows at `1.0556^L` — decelerates gently, never runs away. Model swaps to a bigger, glowier version every 10 levels: cheap art for this dev, and it delivers the visibly-transformed base every durable tycoon has. **Upgrade hold 0.4s** — 2s reads as a loading bar.

**Auto-spawn is on from second zero, free, forever, never an upgrade.** Sword Factory X gating it behind Conveyor L5 is the single most-copied mistake in the genre; Sol's RNG gives auto-roll away and holds 40-100K CCU across 2.08B visits on that restraint.

**Reveal craft** (two hours of work, highest ROI in the build): the capsule interior cycles tier colours as it travels — grey → green → blue — flashes Epic purple for 0.4s, settles back to blue, cracks. Escalate by tier: Common no flicker at all (fast pulls must stay fast), Rare the 0.4s overshoot, **Mythic+ a 5-second pre-roll** (belt stalls, factory lighting drops, audio riser) — that pre-roll is not decoration, it is the window in which a player hits record. Rarity reads through three redundant channels — **scale 1.0 / 1.1 / 1.25 / 1.45 / 1.7 / 2.0 / 2.4 / 3.0×, colour, particle count** — never colour alone, which fails on a dim phone and for ~8% of boys. Sol's charges 100 R$ purely to skip this animation; the wait is the product.

**Sound** (one full gap in the slate): four-note ascending stinger per tier, each tier adding a note and dropping the low-pass filter; sub-bass hit on Legendary+; the 5s Mythic riser; a distinct mechanical *clunk* on the sell shutter; a coin cascade on sell. In an RNG game the reveal audio is half the product.

## 3.3 Combat and zones

**The player character** — undefined across all 8 analyses and ~90 findings. Defined now: **100 HP, no regen, no attack.** The player's verbs are *move*, *press three ultimates*, *collect*. Heal pickups drop from elites (25 HP). **Dash on double-tap-jump: 3s cooldown, 22 studs, 0.35s.** One animation, one CFrame tween, and it is the difference between standing and playing. Death = respawn at the current wave's start, forfeit that wave's unbanked loot only. Never lose banked loot.

**Summons cannot die.** At 0 HP they stagger for 4s and recover. This preserves A3's continuous-DPS model, gives the player a legible failure signal (staggered summon = no ult contributing), and deletes an entire death/revive system. **A4's VANGUARD trait ("+120% while last alive") is deleted** — it assumed the opposite answer.

**Ultimates:** base 14s, floor 10s via Speed. The meter also fills from auto-attack damage landed (1% of bar per 2% of an enemy's max HP), shaving up to 40% for a player who keeps the squad grouped — positioning rewarded without one line of AFK detection. Auto-target the highest-HP enemy in range; no aiming on mobile. **No queue on a not-ready press.** Target 5-7 casts per character per 90s wave — an input every 4-6 seconds, not A3's original 18.

**The 2.5× active-over-AFK ratio** is asserted in the brief with no derivation, and A3's "2.0 × 1.25 = 2.5" rests on the invented claim that AFK collects ~40% of drops. Treat 2.5× as a **target to be measured, not a mechanism to be trusted** (§5). The mechanism: ultimates supply the bulk; drops do **not** vacuum — they land where the enemy died, despawn in 12s with a shrinking ring, rare drops kick back 20-30 studs *away* from the fight, and summons follow on a 15-stud leash so walking to loot drags your DPS out of position. Enforced entirely by geometry. Sell auto-collect as a **radius** upgrade (8 → 25 studs, 199 R$), never global. **Never sell auto-ultimate at any price** — it deletes the ratio for exactly the cohort you need on D8-28.

**Enemies — three behaviours at launch**, ~40 lines each, reskinned forever at the art cadence. **Swarm** (packs of 12, low HP — the ultimate payoff, the reason AoE feels good). **Rusher** (sprints past summons straight at the player — forces movement). **Shielder** (front-block, damageable only from behind — forces you to walk past so the leashed summons flank). Add one per month: Bomber (2.0s fuse), Anchor (30-stud buff aura), Splitter (→3 children at 25% HP). **Difficulty comes from the mix ratio, never from an HP multiplier alone.** Enemy HP ×1.55/zone; over 12 zones that is 155×, against a 154× total power budget (rarity 11 × ult rank 3.5 × condition 1.6 × trait 2.5). The math closes.

**Boss Guard:** HP plus a Guard bar worth 20% of max HP that fully regenerates in 5s if unbroken. Auto-attacks chip Guard at 1×, ultimates at 8× — **three held ults inside ~2s break it, two do not.** Critically, **while Guard is up the boss still takes 25% damage, not 0%** — an under-geared squad wins slowly instead of never. Guard raises at 75/50/25% HP with a 1.5s telegraph ring, and during Guard the boss charges a room-wide slam that **breaking the Guard cancels** — a legible reason to burst that reads in one attempt. Every failed attempt permanently reduces that boss's Guard regen by 4%, floor −40% at 10 attempts. **No enrage wipe:** at 5:00 the boss disengages, you keep everything but the key. A true zero-damage DPS check reads as rigorous and functions as a churn valve on a platform with zero switching cost.

**Publish the wall.** On approach, every boss shows: `Guard 40,000 · breaks in 5s · Your squad burst: 31,200`, with the three biggest levers listed beside it. The player instantly knows they need +8,800 burst and the only place burst comes from is the loop. Publishing the number converts a wall into a goal; "go grind" is where D8-28 players quit.

**Zones: three at launch, one every OTHER Thursday.** A3's "one zone every Thursday, forever" — 4 waves, ~90 enemies, a Guard boss, reskinned art, weekly, alongside characters and seasons — is not shippable by one person. Zone 1 (tutorial, no boss). Zone 2 (first Guard, clearable with Commons). Zone 3 (the wall that sends you back to the factory for a week).

**Run structure:** 4 waves + boss. 75s / 90s / 90s / 90s / up to 135s ≈ 6:30, plus a ~45s scored end card (`ZONE 2 CLEARED · 6:12 (par 7:30) · S RANK · 14 drops · best: Epic Kensei`). **Loot banks automatically at each wave break** with a visible "secured" stamp, and a green exit portal opens for 8 seconds between waves. The real session unit is 90 seconds, so a returning player with 8 minutes still completes something.

**Bosses are always available, never on a respawn timer.** Gate the *reward*: first clear of each zone per 24h pays 100% plus a guaranteed rarity floor; repeats pay 25%. That gives a nameable return line and makes day two's session legitimately shorter than day one's, which is exactly what the algorithm rewards. Blox Fruits can afford 20-60 minute server-specific respawns at ~249K CCU; a new game cannot.

**Chain-kill for over-geared players:** kills within 1.5s build a streak to 10×, and the streak multiplies **drop quality** (+1 rarity tier per 3× of streak, capped at the zone ceiling), never damage. An over-geared player farms old zones by sprinting between clumps and timing ults to keep the chain alive.

**Architecture, non-negotiable, decided before the first enemy is written:** summons and enemies are **custom controllers on one shared `Heartbeat` loop, CFrame movement, Motor6D animation. No `Humanoid`. No per-entity `PathfindingService`.** Humanoid is the most expensive object per instance on a mobile-majority platform, and this is the single most expensive retrofit in the project. Factory hub is shared (8 players). Zones are **in-server arenas 5,000 studs apart with StreamingEnabled** — a weekend. TeleportService + MemoryStore matchmaking is three weeks and buys nothing until there is a population to match; defer to month 3.

## 3.4 Progression and the D8-28 window

**Squad slots are Class-locked: one Striker (Damage), one Guardian (Speed/survivability), one Support (Luck + amp).** A pull only competes against your best *in its class*, so upgrade odds are ~3× higher at every point in the game. Support's ultimate applies **+80% squad damage for 6s**, and Guard-break maths are tuned so three Strikers cannot break a Zone 4+ Guard. This is the cheapest anti-dead-pull mechanic available — one dropdown, zero new characters — and it makes the Classifier a real decision instead of flavour.

**Ult Ranks are the mid-game player's shield against whales.** Five ranks per Archetype, costing **10 / 25 / 60 / 150 / 400 Cores**, giving **1.0 / 1.4 / 1.9 / 2.6 / 3.5×** on *ultimate burst only*. Cores drop **only** from zone enemies and bosses (Zone 1 boss = 5, +7 per zone), **never** purchasable with Robux, never grantable by a code, never buyable with scrap, **2× on the first clear of the day**. Because Guard breaks on burst, a rank-5 Legendary out-bursts an unranked Celestial. The mid-game player who plays beats the whale who bought. This is Blox Fruits' Fragments, and it is why that game survives its own monetization.

**Mastery binds to the ARCHETYPE on the account, never the character instance.** Levels 1-10, XP from kills while squadded, +4% Damage per level, second ult charge at Mastery 5. Per-instance XP is the single worst trap in the slate: a player with a Mastery-9 Common Ryuu would refuse to equip a fresh Legendary Ryuu, hoarding becomes correct, the factory becomes decorative, and the premise inverts. It is also nearly impossible to unwind after launch. **No Mastery-10 bespoke VFX** (A4) — that is +60 VFX assets against a budget of one per character.

**Index:** rows = Archetypes, columns = **Common through Legendary only** (5 cells). Twelve archetypes at launch = 60 cells, +15 per weekly patch. One completed row = **+25% permanent stats on that Archetype** and a gold Mastered frame. Every 10% of total index = **+5% permanent factory Luck** (counts toward the 5.0× cap). Mythic/Celestial/Sovereign are one-off **trophy cells**, never row requirements — a row needing a 1-in-600-million Sovereign-of-a-specific-Archetype is a row nobody finishes and it poisons the screen. **Completion % is computed against currently-available Archetypes** and rewards pay per-row, so shipping new characters never visibly reverses a player's bar. That is otherwise the guaranteed top community complaint.

**Pity — published, and re-priced against real production rates.** A4's numbers were computed at 1,440 chars/hr, an hour-15-to-40 rate, and aimed at a D2-7 player who will never see it — its Legendary pity is 3.75 hours, not 62 minutes. Corrected: **Legendary hard pity at 1,000 characters** (2.5h at hour-1 rate, 1.7h at hour-5), **Mythic at 8,000** (13h at hour-5 rate ≈ a two-day goal). Soft pity from 60% of the counter, ramping that tier's weight 1×→5× over the last 40%. Counter resets on hit. Bars on the factory HUD with a live ETA. **No pity on Celestial or Sovereign** — those stay pure lottery or the server broadcast means nothing; show a lifetime "Produced since last Celestial" counter for bragging instead.

**Foundry (dupe fusion):** N duplicates of the same Archetype at rarity R → 1 at R+1 with a fresh Trait roll. Costs **5 / 6 / 8 / 10 / 12 / 15 / 20** up the ladder. Cumulative that is 8,640,000 Commons per Sovereign — deliberately just under the native 1:10M, so rolling beats fusing for the bottom four tiers and fusing beats rolling for the top three, with the crossover landing naturally around hour 40. Preserves Archetype, so it feeds the index directly. Rate-limit to 3 fuses/day at Mythic+ steps and log every Celestial/Sovereign creation.

**Prestige — one layer only.** **REFIT:** burn all scrap and all machine levels for **+15% permanent production and +1 permanent bank slot**. First available ~hour 4; Refit N costs ~1.9× the lifetime scrap of N−1. **Index, Mastery, Ult Ranks and Foundry progress NEVER reset.** A4's second layer (Ascension, luck ×1.6^stars, extra squad slots) is deleted: it blows the 5.0× Luck cap, and squad slots are on the do-not-sell/do-not-grant list because squad size is the format.

**Late-game scrap sinks, both priced off the item's own value so they inflate automatically:** Trait Reroll on a banked character at **1× / 3× / 9× / 27×** its sell value (3ⁿ, per character, forever). **Re-Appraisal** — reroll only rarity, cost **50× current sell value, keep the higher result.** Both are **EV-negative in currency and EV-positive in identity**: pushing a Mythic upward costs ~32,500 scrap for something worth 650, so it can never be a printer. You pay it because you want *this* character. Assert EV-negativity in a unit test against `ValueFormula`, not in your head. Bank slot N costs `1.6^N` scrap, so hoarding itself is a sink.

## 3.5 Economy, currencies and balance

**Three currencies. Not seven.** Anime Expeditions runs seven with six dedicated stores; that is seven store UIs, seven HUD slots, seven source rates, seven DataStore fields and seven places inflation can hide, for one person shipping weekly.

| | Source | Buys | Rule |
|---|---|---|---|
| **SCRAP** | selling characters | machine levels, conveyor, bank slots, rerolls | Inflates freely. **Never buys combat power.** |
| **CORES** | zone enemies & bosses only | Ult Ranks | Untradeable, unbuyable, un-codeable. **Never buys production.** |
| **TICKETS** | season track | rotating cosmetics | Expires at season end. **Does not exist until month 4.** |

Progressive reveal: Scrap HUD appears at the first sell (~0:30), Cores at the portal (~0:44), Tickets not for months. **Zone drops pay zero scrap, ever.** The moment scrap buys damage, the boss wall stops being a wall and the factory→zone→wall→factory loop collapses into one loop.

**Offline:** **15 sealed crates/hour, 8h cap = 120 crates.** Contents roll at your current Luck and Molder tier. The pile is **physically on the platform** when you return — you punch through it, ~60 seconds of ceremony containing 120 variable-ratio pulls, which is the strongest possible opening minute of a session. No summary modal. **The 8h cap is never extendable by Robux or any pass** — selling "+4h offline" monetizes teaching people to log in less often, and trades D2-7 for one-time ARPPU. Sell the 99 R$ instant-collect instead: same impulse, opposite retention effect.

**Second Shift:** return 6–30h after your last logout and get **2× production for 5/7/10/12 minutes on days 2/3/4/5, then flat**. Forty lines of code, targets exactly the behaviour the algorithm pays for. Cap at once per calendar day.

**Sell-vs-keep must not be a threshold**, or a Discord post says "sell below Epic" within 48 hours and walking to the platform becomes a chore forever. Three orthogonalizers: (1) **Class contributes nothing to worth** — a Luck-class Rare and a Damage-class Rare sell identically but do different jobs, so "keep it?" depends on what your squad is missing; (2) **the Index** — a Common you have never seen is worth more than an Epic you have forty of; (3) **100% sell-back from the bank at any time**, so "keep" is never a permanent loss (decision paralysis in a nine-year-old is itself a bounce risk). The auto-sell pass is **hard-capped at Rare** and can never be set higher. Sword Factory X's banking limit is exactly this pattern and it is why its late-game players stop looking at their own output.

## 3.6 Monetization

**Launch catalog: six SKUs. That is all.**

| SKU | Price | Type |
|---|---|---|
| Luck Flask (2× Luck, 20 min) | **49 R$** | repeatable consumable |
| Auto-Collect (radius 8 → 25 studs) | **79 R$** | pass |
| Roster +25 slots | **99 R$** | repeatable, cap 6 (base 25 → 175) |
| Instant Collect (skip the crate pile) | **99 R$** | pass |
| Auto-Sell (Common/Uncommon only) | **149 R$** | pass |
| 2× Luck permanent | **599 R$** | pass |

Month 3+: Second Line 999 R$, Golden Hour 149 R$ (server-wide +100% Luck, 20 min, named buyer, **one active at a time, queued not stacked, 3h queue ceiling**), Factory Contract subscription **349 R$/mo**. The subscription matters because Roblox takes 70/30 on month one and **no platform fee on renewals** — a retained subscriber is worth ~1.43× the same Robux in passes, and its daily in-game claim manufactures a login reason on every one of the 28 measured days.

**Shop blackout until first Warden kill AND 12:00 elapsed.** No shop button, no boost banner, no badge. Spend is measured *separately* from retention, so a prompt inside the bounce window buys nothing and costs bounce.

**A5's first-purchase moment is deleted.** At minute 22, storage fills, the chute physically seizes the incoming character, suspends it above the hopper with a **4-second countdown** and `Keep it? 79 R$`, and destroys it if declined. That is manufactured loss aversion, on a timer, aimed at a nine-year-old, in an analysis whose own thesis is "rating is distribution" and whose own do-not-sell list forbids paywalling the loop. Egg Hunt 2026 sits at 39.6% on price perception alone; a hostage is worse than a price. **Replacement:** when the roster fills, the oldest **Common** auto-sells with a coin-fly animation and a small toast reading `Roster full — oldest Common sold (+3)`. Nothing above Common is ever auto-sold. Roster Expansion sits in the shop and converts on desire, not on hostage-taking.

**NEVER SELL — write this into the repo as a constraint:**
1. A 4th squad slot. Squad size is 3 for everyone forever; sell roster storage.
2. Any damage or cooldown multiplier. The boss wall is the spine.
3. Zone access, boss skips, or Cores.
4. Offline production, the offline cap, the Prototype, or the daily reset.
5. Paid crates, paid rolls, or **any reroll**.
6. Soft currency. Selling scrap retroactively converts the entire free production line into an indirectly-purchased random item, forcing odds disclosure on the core loop and locking the main gameplay away from players `PolicyService` flags as restricted.
7. Power-limited seasonal characters (cosmetic-limited is fine). A power exclusive creates a returning-player wall at exactly the day-28 measurement point.
8. Auto-ultimate at any price.
9. A VIP grab-bag at launch — a bundle hides which SKU actually converts, and a solo dev has no analytics headroom to untangle it. Bundle in month 3.

**Compliance is a week-1 dependency, not a polish item.** `src/shared/Odds.luau` exports `BASE` and `Effective(luck)` and is the *sole* source of truth for the server roller, the sell chute, the bank UI, the reroll pricing and the odds panel. Drift between any two of these is a policy violation, not a bug. Ship a persistent **Odds** button on the Appraiser and inside every Luck purchase prompt, with a live two-column `now / with this item` view driven off a `LuckChanged` signal — the policy requires boosted odds to be *dynamically updated on screen while active*. Call `PolicyService:GetPolicyInfoForPlayerAsync()` on join; if `ArePaidRandomItemsRestricted`, hide the Luck SKUs and show the rest. **Publish the 5.0× Luck cap** in the same panel.

**R15-only** in Game Settings. Do it because it is free, because the eligibility rule is about the *player's* rig (A5's justification via NPC rigs is wrong — A3 correctly wants summons to have no Humanoid at all), and because R15 deforms better for anime silhouettes. Do **not** model revenue at the 37.8% uplift: it applies only to age-verified US 18+ spend, and every analysis in this slate designs for a nine-year-old.

## 3.7 Session architecture and the daily cycle

**Target: 2 sessions × ~20 minutes = ~40 min/day.** Under the 60-min discovery cap, minute 61 of a single sitting is worth exactly zero to discovery, while a second 20-minute session the same evening is a qualified session *and* exercises the return window. **A7 is the only analysis that knows this cap exists**, which means A1's, A2's and A3's session designs were built without it.

**The whole dated architecture, on two clocks:**

| Object | Clock | Payload |
|---|---|---|
| **Prototype** | 6h from press, 1 queued at a time | Guaranteed **Epic floor, ~8% Legendary**. Physical machine with a glowing countdown you walk past on the way out — the last thing on screen. Started at 4pm it fires at 10pm; started at 8pm it is the first thing you walk to tomorrow. Either way inside 24h. |
| **Offline crates** | 8h accrual cap | 120 sealed crates on the platform. |
| **Daily reset** | 04:00 UTC | First zone clear of each zone pays 100% + rarity floor + 2× Cores. Three daily tasks + a completion bonus, median 18-22 min. **One Overrun zone** (red beam over its portal, 3× drops, second Guard layer, one day-exclusive Archetype) on a fixed 7-day rotation — a config table with 7 rows and a modifier flag, zero new art, wiki-able within two weeks. |
| **Weekly reset** | Monday 04:00 UTC | Weekly boss (fixed seed, 1 attempt/day, damage leaderboard, 3-5 min — the ideal short second session). Featured Archetype at 3× production weight for 7 days, **never removed afterward**. Weekly boards reset. |
| **Login streak** | 7-day track that **PAUSES, never resets** | Return after any gap and claim the next unclaimed day. Day 7 = guaranteed Legendary with the full reveal — the clip, and the reason people say "I'm on day 6" out loud. Loops at 1.5×, caps at lap 4. A purely **cosmetic** streak flame on the factory sign does reset. |

**A7's Shift system is deleted.** Five Shifts/day gating a 2× drop multiplier is an energy bar to a nine-year-old regardless of framing, A7 says so in its own risk section, and it contradicts A3's "boss attempts stay free and unlimited forever." **Also deleted:** the 20-minute gift ladder (PS99's version puts its two biggest prizes at 2h and 3h — 60 and 120 minutes past the point playtime stops counting at all, and it teaches alt-tabbing).

**AFK is a bench in the factory, never a zone run.** Sit on it, camera pulls back to a cinematic of the line, production continues at 40%, characters auto-sort against your threshold. Zones stay strictly active. Roblox platform-kicks at ~20 minutes of no input and you cannot disable it, so any "AFK mode" is an in-game autoplay supplying input. **Instrument bench-time and active-time as separate events from the day the bench ships** — retrofitting that split into a DataStore schema is painful, and if bench exceeds 25% of playtime your headline session number is lying to you.

## 3.8 Social, virality and discovery

**Broadcast ladder,** computed against actual per-server frequency at 8 players × ~400 chars/hr ≈ 53 pulls/min:

| Tier | Effect | Cadence per server |
|---|---|---|
| Rare 1:40 | local toast to the puller | constant |
| Epic 1:250 | 30s coloured light beam over that plot, no text | ~5/min |
| **Legendary 1:2,000** | server banner + gold plot beam | **~every 38 min** |
| **Mythic 1:25,000** | 4s cinematic, all cameras cut, + **Afterglow: everyone in server +10% Luck for 60s** | ~every 8h |
| **Celestial 1:400,000** | cinematic + Afterglow +25%/3min + one free roll for everyone. **Server-local only.** | ~every 5 days |
| **Sovereign 1:10,000,000** | cross-server via MessagingService + permanent **Hall of Firsts** entry | rare enough to stay an event |

Afterglow is what stops a broadcast from being pure envy that drives players into private servers. Cap global broadcasts at 1 per 30 min per client with an overflow ticker — the Celestial cadence that feels magical at 500 CCU becomes wallpaper at 5,000, and retrofitting a governor after players have learned to ignore the banner does not win the attention back. **Private servers get no Afterglow and never originate cross-server broadcasts**, so the public floor is strictly better for luck.

**First Discovery Credit** — the cheapest talk-generator available. The first player on the platform to produce a given Archetype × Rarity gets their username permanently stamped in that index entry for everyone, forever. 12 archetypes × 8 = 96 rows at launch, +24 per weekly patch, of which the Celestial and Sovereign lines stay unclaimed for months. Turns patch day into a race. One global DataStore key per row, `UpdateAsync` compare-and-set. **Stagger the Celestial/Sovereign rows to unlock 12 hours after the rest** so a second timezone gets a real shot at the headline rows.

**Leaderboards:** three. Weekly Boss Clear (fastest time, resets Monday 04:00 UTC, un-botable because it requires manual ult timing against the Guard window, and the most clippable content in the game). Weekly Luck (best single pull this week — a new player who hits a Mythic on Tuesday tops the board over a veteran; that is the point). **Hall of Firsts**, the only permanent one, because nobody can outspend you for a moment in time. Plus a live 8-name wall board on the factory floor. An all-time "most Sovereigns" board is won permanently in week two by the first whale or the first exploiter and then tells 99% of players they cannot compete.

**Referrals — reward co-presence, not signup.** Inviter unlocks a **Coworker Lane**: a second production line that only runs while that specific friend is currently in any server. Up to 3 lanes. **The invitee gets the identical scripted opening plus a cosmetic — never an Epic** (A6's version makes an invited player's first 60 seconds permanently better than an organic player's and miscalibrates the ladder for exactly the cohort it's trying to keep). Lane activates only after the invitee reaches 30 minutes lifetime playtime. Rewarding the install produces alt-account invites and a wave of first-play bouncers, which is now an explicit negative signal. Requires the experience to be live ≥1 day, so it cannot be day-zero.

**Gifting only, no trading.** From player level 15, gift one character per 24h to someone you have shared a server with for 10+ minutes; the gifted character is permanently flagged and can never be gifted again, which kills chains and mules dead. Plus **Squad Loan** — lend one character for a single zone run, receive 25% of their drops. Social, no economy, no scam surface, no moderation load.

**No clans. Use the Roblox Community.** Joining grants **+5% production** — one `GetRankInGroup` call, near-100% opt-in, and it hands you a group wall and group shouts as a free push channel for every patch. Sol's gives away Auto Roll for exactly this. Real clans, if ever, ship as a 6-player co-op raid in month 4+, never as territory.

**Age reality, and nobody added this up:** Experience Notifications 13+. Roblox Moments 13+. Party creation 13+. The DevEx uplift 18+. **A6's headline return mechanic, its clip strategy, its party-fill and A5's revenue uplift are all age-gated out of the primary audience.** Design for **9-13 primary**. Notifications, Moments and Party are *bonus channels*; the in-game broadcast, the Index and the podium carry the under-13 cohort, and the video channel is creator-seeded rather than player-generated.

**The notification, re-pointed.** A6's version is mathematically dead: it caps the overnight run at 3 characters and instructs you to send nothing below Rare. P(Rare+ in 3) = **8.6%**, so it stays silent 91% of nights; its own example copy ("your night shift produced a Mythic") fires **once every ~23 years per player**. Fix: fire the notification off the **6h Prototype completion** — deterministic, guaranteed Epic floor, real copy every single day: *"Your Prototype finished. A Legendary Kensei is on the pedestal."* Prompt for permission once, at the player's first Epic pull, framed as "get told when your line pulls something big."

**The store page — a whole gap in the discovery analysis.** Icon, thumbnail and title are the largest single lever on play-through rate, which the docs name as one of the two primary signals. Spec: **icon** = one character's face at 3/4 view, saturated, filling ≥70% of the frame, one accent colour, zero text (icons render at ~150px on mobile). **Thumbnail 1** = the Sovereign reveal at peak, composed 9:16-safe. **Thumbnail 2** = three summons mid-ultimate against a boss. **Thumbnail 3** = the belt with characters popping off. **Title** ≤ 30 chars with the strongest noun first. Rotate thumbnail 1 weekly and watch play-through rate — it is the cheapest A/B in the project.

**Engineer the clip, don't hope for it.** 5-second telegraph before Mythic+ (the record window). Vertical-safe framing: character and nameplate inside the centre 56% of width, nothing load-bearing in the outer thirds, no UI in the top or bottom 15% — test by literally cropping a screenshot to 9:16. **Near-miss reveal**: the rarity readout animates *up* through the tiers and stalls, passing visibly through SOVEREIGN before settling on Celestial. "Almost" clips travel further than clean wins and it is the cheapest animation in the game. The Guard-break already is a 3-second burst — give it a fullscreen shockwave, 0.15s hitstop, one large damage number. **Build that in week 2, not week 8**; it is the entire combat marketing asset.

**Launch sequence.** Weeks −6 to 0: one character design per day to TikTok/X/Discord — free, because the art is being made anyway, and polls on which Archetype ships next make the audience co-own a roster they will then want to collect. **Do not gate the launch plan on A6's "2,000-5,000 Discord = 150-400 CCU"** — that implies a 7.5-8% Discord-to-concurrent conversion, which is invented and far above reality; treat 1-2% as the planning number. Day 0: launch to the Discord with a code, **zero paid spend**. Days 1-14: measure only sub-60s bounce, 61-180s bounce, and D1. **Hold spend at zero until D1 > 20% and D7 > 8%.** A large paid spike before retention is proven floods the game with first-play bouncers and does lasting damage to how the algorithm reads the experience — a big bad launch does not just fail, it poisons the score you launch on.

---

# 4. Build order

**Baseline: the repo is a Rojo hello-world.** Eight weeks of full-time solo work below is aggressive but real *only* because §1.1 cut roughly 40% of the slate. If art and code are the same person, add two weeks.

### Week 1 — Foundations you cannot retrofit
- `src/shared/Odds.luau` — `BASE` table (Common 84.546% residual), `Effective(luck)` with the **5.0× clamp**, unit-tested to sum to exactly 100% at L = 1.0, 2.0, 3.5, 5.0, 6.0.
- `src/shared/ValueFormula.luau` — sell curve `(1/p)^0.65`, combat curve `M^0.4`, both tables frozen. Unit test asserting Re-Appraisal is EV-negative at every tier.
- **Persistence** (a total gap in the slate): session-locked profile store, save on every sell / squad change / zone clear + 60s autosave, retry-with-backoff, and a **separate immediate backup write for every Mythic+ pull**. Losing a 1-in-10,000,000 pull to a failed write is a rating event and it *will* happen.
- Belt, capsule, drop platform, server-validated proximity grab, sell chute, scrap counter.
- Molder + Appraiser with the `150 × 1.14^L` curve.
- Locale string table.

*Why first: the odds module is a legal surface, the value formulas are the irreversible decision, and persistence is the one system that destroys a player permanently when it fails.*

### Week 2 — Combat core
- Custom entity controller: one shared `Heartbeat` loop, CFrame movement, Motor6D animation, **no Humanoid, no per-entity pathfinding**. Prove it at 9 summons + 40 enemies on a mid-tier Android before writing a second enemy.
- Player: 100 HP, dash, no attack. Summons: 15-stud leash, auto-attack, stagger-not-death.
- Ultimates: 14s base, 10s floor, damage-charged meter, auto-target, no queue, portrait buttons.
- Swarm and Rusher AI. Drops that land physically and despawn in 12s.
- **The Guard-break moment**: shockwave, 0.15s hitstop, big number.

### Week 3 — Zones and the wall
- Wave manager, loot banking with the "secured" stamp, 8s exit portal, scored end card with par times.
- Shielder AI. Guard system: 20% max HP, 5s regen, 8× ult multiplier, 25% damage floor, 75/50/25% raises, cancellable slam, −4% regen per failed attempt, 5:00 soft timeout.
- Zones 1, 2, 3. In-server arenas at 5,000 studs with StreamingEnabled.
- Cores, Ult Ranks, the published boss-wall readout.
- Classifier + Class-locked squad slots.

### Week 4 — The first 180 seconds
- The full scripted sequence from §3.1, beat by beat, including the forced pull results and the shuttered sell chute.
- Mobile HUD: 4 elements, `UITextSizeConstraint`, `UIStroke`, K/M abbreviation above 10,000.
- Reveal craft: tier flicker, 0.4s Rare overshoot, scale ladder, three redundant channels, the full sound ladder, the 5s Mythic pre-roll.
- Gamepad mapping.

### Week 5 — The return engine
- Offline crates (15/hr, 8h cap, 120 max) + the physical pile.
- **Prototype**: 6h timer, physical countdown machine, Epic floor / 8% Legendary.
- 04:00 UTC daily reset: first-clear bonus, 3 tasks + completion, Overrun rotation config table.
- 7-day pausing streak + cosmetic flame.
- Second Shift (6-30h window).
- Index (60 cells) + First Discovery Credit + published pity bars.

### Week 6 — Ship-readiness
- Six-SKU shop, blackout gate, **odds panel with live `now / with this item` columns**, `PolicyService` check.
- Broadcast ladder + Afterglow + rate governor.
- Store page: icon, 3 thumbnails, title, description.
- **Performance pass and the instance budget**: 8-player cap, crate batching above 1/4s, 40-model plot cap, 15s Common despawn, shared base meshes, instance pooling. Profile on a real low-end Android, not in Studio.
- Analytics events (§5), all of them, before launch.

### Week 7 — Test with actual children
- Closed test, 30-50 players from the Discord, **at least five of them aged 9-12 observed directly**. A no-tutorial design fails hard if any physical affordance is ambiguous, and the specific failure to watch for is a player standing on the drop platform not realising they can pick the character up. The fallback is a single three-word world-space billboard, never a modal.
- Fix bounce. Nothing else. Do not add content this week.

### Week 8 — Launch
- Ship to the Discord with a code. Zero paid spend.
- Days 1-3: watch both bounce buckets hourly.
- **Ship a patch on day 4 regardless** — Up-and-Coming ranks growth velocity against your own baseline, so the first patch is worth more than its content.

### Month 3+
| When | Ship |
|---|---|
| Every Thursday | 3 new Archetypes (not 5 — see §7.4), 24 new index rows, one new First Discovery race |
| Every other Thursday | +1 zone |
| Monthly | +1 enemy behaviour (Bomber → Anchor → Splitter) |
| Month 3 | Foundry, Refit, weekly boss, Second Line 999 R$, Golden Hour, subscription, Coworker Lanes, Archetype Mastery |
| Month 4 | Season 1 + Tickets, gifting + Squad Loan, 6-player co-op raid |
| Month 6+ | Reserved-server matchmaking, *if* population justifies it |
| Never | Trading |

---

# 5. The numbers to instrument

Every one of these ships **before** launch, not after.

| Metric | Target | If it's off |
|---|---|---|
| **Bounce `<60s`** | **< 25%** | The primary alarm. If >35%, the physical affordance failed — watch session recordings for players standing on the drop platform doing nothing. Fallback is a three-word world-space billboard. |
| **Bounce `61-180s`** | **< 20%** | The second beat is too slow. Move the Warden earlier and shorten the corridor. This is a *different fix* from the sub-60s number. |
| **D1** | **> 20%** (30-40% good) | Below 20% is critical. Zero paid spend until it clears. If bounce is fine and D1 is not, the Prototype is not landing — check time-from-Prototype-start-to-claim. |
| **D7** | **> 8%** | Below 8%: the boss wall is opaque or the Index isn't hooking. Check boss attempts-to-first-clear. |
| **Sessions/player/day** | **≥ 1.6** | Below 1.4, the session isn't terminating. The end card and the Prototype are not doing their job. |
| **Median session length** | **18-24 min** | >35 min means you built a job, not a game — check bench time. <12 min means the run is too short to bank anything. |
| **Prototype start→claim** | median **14-20h** | <8h: claimed in the same session, it points at nothing. >26h: evening players never see it fire. Tune the 6h number, this is the one most likely wrong on first tuning. |
| **Bench time / total playtime** | **< 25%** | Above it, the active loop isn't paying enough and your headline session number is lying. |
| **Boss attempts-to-first-clear** | median **2-4** | 1 = no wall. >6 = churn valve; drop the Guard-regen decay from −4% to −6%/attempt. |
| **Ult casts / min in-zone** | **6-9** | Below 5, the player is a spectator; drop base cooldown from 14s. |
| **Drops collected / dropped** | AFK ~40%, active ~85% | This is the *measurement* of the 2.5× ratio, which is an unverified assertion from the brief, not a derived fact. If the real gap is 1.4×, say so and fix it with geometry, not by nerfing anything. |
| **Throttle moves / session** | **≥ 2** | Below 2 it is a fake choice and should be cut, not tuned. |
| **Scrap/hr by rarity band** | ladder ≈ **43% of income** | Re-fit the `0.65` exponent in live week 1, **before** adding content on top of it. Never move outside 0.62-0.68. |
| **Sell rate** | **60-70%** at hour 1, **85-90%** at hour 40 | 98% means sell-vs-keep collapsed to a threshold. |
| **Like ratio** | **> 95%** | Below 93%: cut the 2× Luck pass's headline framing first, then the Luck component of the subscription. Rating is distribution. |
| **Spend days D1 / D2-7 / D8-28** | any spend on ≥3 distinct days | One spend day per player means permanent passes are the whole book — that is the argument for the 49 R$ Flask and the subscription, not for raising prices. |
| **Play-through rate** | rising week over week | Rotate thumbnail 1 weekly and attribute. Cheapest A/B in the project. |
| **DataStore write failures** | **0 on Mythic+** | Any non-zero is a P0. Alert on it. |
| **Median FPS, low-end Android, factory at 8 players** | **> 30** | If it drops, the crate-batching threshold moves from 1/4s to 1/6s before anything else is cut. |

---

# 6. Kill list

**From the analyses, do not build:**

1. **Six machines.** Two at launch, four ever. Polisher and Upgrader deleted.
2. **Movable machine grid with adjacency bonuses (A2).** Priced at "maybe 200 lines"; real scope is grid placement, collision, validation, per-player layout persistence, 8-player layout replication, touch pickup/rotate UI and server-authoritative anti-exploit — for a bonus system whose reference implementation is a decade-old game built entirely around it.
3. **Throw-to-sell (A2).** A precision aiming task performed hundreds of times per session by a mobile-majority under-13 audience. A2's own risk section calls it "infuriating at hour 40" and prices the relief at 99 R$. Designing an irritating core verb and selling the cure is the pattern A5 spent a whole finding forbidding.
4. **Retool / Blueprints (A2).** A2 itself names this as "exactly the system a solo dev over-scopes into a three-month detour."
5. **The per-machine speed/luck levers (A2).** Six binary levers is 64 near-equivalent states solved in ten minutes. One throttle.
6. **The QUALITY throttle at ×9 luck (A2).** Blows the legal Luck cap on its own, before any purchase. Capped at ×2.5.
7. **The wallet cap (A2).** Annihilates the sell curve and makes the late-game sink impossible.
8. **Rarity→damage at 3.2× (A4).** Self-defeating: a Common with a top trait beats a naked Sovereign.
9. **Ascension prestige with Luck ×1.6^stars, targeting 16.8× (A4).** Non-compliant, not merely unbalanced.
10. **The 4th, 5th and 6th squad slots (A4).** Squad size is 3, for everyone, forever, by any means.
11. **Per-instance Mastery.** The single worst trap in the slate and near-impossible to unwind post-launch.
12. **Per-rarity ultimate VFX (A3), Mastery-10 upgraded VFX (A4), Ornamental/Prototype model variants (A2).** These silently multiply the art budget by ~8×, ~2× and ~3× against a stated budget of one idle + one attack + one VFX per character.
13. **Robux reroll and lock tokens (A5).** Named in the policy. Rerolls stay earned.
14. **The hostage sell chute (A5).** Manufactured loss aversion with a countdown, monetized, on a child.
15. **Selling soft currency (A5's own warning, restated because it will be tempting in month two).**
16. **The offline-cap extender at 199-399 R$.** Monetizes teaching players to log in less often.
17. **Auto-ultimate and global auto-collect.** Radius bump only.
18. **A5's VIP grab-bag at launch.** Bundles hide which SKU converts.
19. **The Shift/energy system (A7).** A7 identified this trap and stepped in it.
20. **The 20-minute timed gift ladder and everything past it (A7's own anti-pattern finding, applied).**
21. **The ability queue on a not-ready press (A3).** Defeats A3's own boss design.
22. **A3's "one zone every Thursday, forever."** Every other Thursday, and only alongside a reduced character cadence.
23. **Eight to ten zones at launch.** Launch content is spent; Thursday content compounds against your own baseline.
24. **Boss respawn timers.** Gate the reward, never the encounter.
25. **Reserved-server matchmaking in v1.** Three weeks, buys nothing until there is a population.
26. **Humanoid-based summons and enemies.** Works in Studio, dies at 8 players on mobile, most expensive retrofit in the project.
27. **Trading, in any form, in this plan.** A factory mints items. A duped Sovereign kills the entire broadcast layer above it.
28. **All-time global leaderboards.** Won permanently in week two, then dead content that actively tells 99% of players they cannot compete.
29. **Clans and territory.** Killed twice in prior slates on grounds that still apply.
30. **Seven currencies. Three.**
31. **Referral Epics (A6).** Miscalibrates the ladder for the exact cohort being courted.
32. **The overnight-pull notification as specced (A6).** Silent 91% of nights. Fire off the Prototype instead.
33. **A1's "sub-60s is the wrong window."** Both buckets are measured and sub-60s is where most players leave.
34. **Hiding Legendary–Sovereign as "???" in marketing.** Hide them in the *in-game index* only; a 1:10,000,000 Sovereign is the strongest thumbnail hook you have. Famous outside the game, mysterious inside it.

---

# 7. What has to be true

Seven falsifiable assumptions this design rests on, and the cheapest test for each.

**7.1 — A child will walk over and pick up a character without being told.**
The entire no-tutorial opening rests on one unexplained physical affordance. *Test (2 hours, week 4):* build the belt + platform + grab as a bare grey-box place with zero UI, hand a phone to three children aged 9-12, say nothing, watch. If any of the three stands on the platform for >8 seconds, the affordance failed and the fallback billboard ships. **Do not test this on a developer.**

**7.2 — Rarity reads from the model silhouette at arm's length on a phone.**
Everything downstream — no numbers on screen, the 2-second sell-vs-keep read, the whole "art is the product" thesis — depends on it. *Test (3 hours, week 1, before any code):* render one Archetype at all 8 rarity scales, screenshot at 390×844, and ask five people to rank them. If any adjacent pair is confused, widen the scale steps before building anything on top.

**7.3 — The dev can actually produce 3 finished Archetypes per week, indefinitely.**
CLAUDE.md asserts 5/week and **not one of eight analyses stress-tested it**, despite it being the load-bearing input to the roster, the Index, the weekly patch and the entire marketing channel. *Test (this week, before week 1 of the build):* build **one** complete Archetype end to end — model, rig, idle, attack loop, ultimate VFX, 8 rarity variants — and time it honestly. If it takes >12 hours, the cadence is 2/week and the Index, the Featured Archetype rotation and the patch schedule all re-scale to it. **This is the cheapest and most consequential test on the list and it can be run today.**

**7.4 — The physical character drop is meaningfully better than a menu roll.**
It is the whole reason the factory survives §1.1. *Test (week 7, in the closed test):* ship both — a grab-the-model platform and a claim-all button — and randomize per player. Compare pulls-per-session and D1. If the button wins, the factory is a UI and should be one.

**7.5 — Active play is genuinely ~2.5× AFK under real geometry.**
This is an unexamined assertion from the brief. A3 built an elaborate justification on the invented claim that AFK collects "~40% of drops." *Test (week 3):* script a null-input bot through a full Zone 2 run against a human clear, ten runs each, and read the drops-collected ratio directly. If the real gap is 1.4×, tighten the leash and the despawn timer — do not nerf the auto-attack.

**7.6 — The 6-hour Prototype produces a same-day-or-next-day return.**
It is the single object in this plan aimed at the algorithm's most-rewarded behaviour. *Test (live week 1):* median time-from-start-to-claim. 14-20h is the target. This is a one-line config change and the fastest tuning loop in the game — run it before touching anything else.

**7.7 — Three summoned characters with one button each is enough combat to hold a 20-minute session.**
The whole roster economics — one idle, one attack, one VFX per character — depends on the answer being yes. It is the assumption that lets a solo artist compete with studios, and it is also the one that, if wrong, cannot be patched around. *Test (week 2, before any zone exists):* build a single grey-box arena with three summons and two enemy types and play it for twenty minutes yourself. If you are bored at minute eight, the dash and the chain-kill system move from "nice" to "required," and the ultimate cooldown drops from 14s to 11s before Zone 1 is ever built.

---

**Sources:** [Roblox discovery metrics](https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/discovery.md) · [Paid random items policy](https://create.roblox.com/docs/production/monetization/paid-random-items) · [Clarifying Requirements for Paid Random Items](https://devforum.roblox.com/t/clarifying-requirements-for-paid-random-items/4654622) · [Korea loot-box rules push global odds disclosure](https://www.techtimes.com/articles/319148/20260626/koreas-loot-box-rules-push-roblox-disclose-item-odds-worldwide.htm) · [Sword Factory X — Rolimon's](https://www.rolimons.com/game/9103460924) · [Sword Factory [Beta] — Services PV](https://servicespv.com/en/roblox/stats/sword-factory-beta-by-sword-factory-community-roblox) · [Anime Defenders — RoMonitor](https://romonitorstats.com/experience/17017769292/)