# ANIME BOUNTIES! — Full Game Specification

**Draft 2 — 21 Aug 2026.** Draft 1 was adversarially reviewed; this draft fixes five
confirmed game-killers. Changelog at bottom. Owner concept: capture anime-styled characters
in the wild, haul them home, they pay cash/sec. Rarities Common→Cosmic, Molds, movement
gear, base with (deferred) theft pressure.

**Hard constraints (CLAUDE.md):** original anime-STYLE characters only, no real IP · total
Luck capped 5.0x with live on-screen odds · no paid rerolls/locks · D1>20% D7>8% ·
most-rewarded behavior = shorter second session within 24–48h.

---

## 1. Fantasy & pitch

You are a bounty hunter in a neon anime city. Rogue characters spawn with auras you can see
from a distance — the rarer, the louder. Chase, net, and carry them home on your shoulder
while they struggle; slot them onto pads where they stand generating cash per second. Spend
it on rocket shoes, grapples and better nets to catch what you currently can't.

**Title: "Anime Bounties!"**

## 2. Core loop by timescale

| Timescale | Loop |
|---|---|
| Seconds | Spot aura → chase → net → secure |
| Minutes | The haul: 65% speed, struggle QTEs, route choice |
| Session | Collect pad piles · 3 contracts · one Manhunt window |
| Hours | Offline accrual (8h cap, 50%) → login ceremony |
| Days | Gear ladder → districts → Star Rank → Bounty Book |
| Weeks | +1–3 characters weekly · new Molds monthly · seasonal Cosmics |

## 3. Spawning — dual-track (fixes spawn starvation AND the empty-server exploit)

Draft 1's single communal pool fed a 12-player server only ~9 captures/player/session and
made empty-server farming 10x better than playing populated. Split it:

**Scent spawns (personal):** ~22/hr per player, spawn within ~150 studs of you, visible and
capturable ONLY by you. This is your bread and butter — it guarantees the 8–15
captures/session KPI at any population, and makes server-hopping pointless.

**Communal spawns:** 6 per 4-min wave (~90/hr/server), weighted toward the spectacle tail.
Mythic+ fires the server-wide broadcast + map ping; the 12-way pile-on is now a rare shared
event, not the whole economy. Cosmic tints the skybox.

| Tier | Base weight | Cash/sec | Flee speed | Struggles | Net req |
|---|---|---|---|---|---|
| Common | 55% | 1 | 80% | 0 | T1 (free) |
| Uncommon | 26% | 3 | 90% | 1 | T1 |
| Rare | 12% | 12 | 100% | 1 | T1 |
| Epic | 5% | 45 | 110% | 2 | T2 |
| Legendary | 1.6% | 180 | 120% + speed burst | 3 | T2 |
| Mythic | 0.35% | 900 | 130% + blink | 4 | T3 |
| Secret | 0.04% | 6,000 | 133% + blink | 5 | T3 |
| Cosmic | 0.01% | 40,000 | 135% + blink | 6 | T4 |

(Draft 1's smoke/decoy tricks cut from v1 — blink only, Mythic+.)

**Furious rule (no dead losses):** an escaped bounty goes Furious — +25% payout, speed
capped at 135%, and the hunter gets **Hunter's Focus** (+20% run) for the re-chase, so every
Furious target is catchable by construction. Despawn clock pauses while Furious. Third
escape = it collapses exhausted, guaranteed secure. Kids always finish the story.

## 4. Luck — where it applies (and why the pass is worth buying)

Personal Luck cannot bias communal spawns (whose luck would apply?). It applies to what is
yours:

1. **Scent spawn rarity bias** — Luck multiplies the weights of the Rare+ rows of YOUR
   scent table. At 2.0 Luck, Rare+ share roughly doubles.
2. **Mold chance on capture** — **8% base** × Luck (Draft 1's 4% made the pass worthless).
3. **Awakening** — **3% base** × Luck: the captured bounty upgrades one full rarity tier in
   your hands, transform VFX. The built-in clip.

2x Luck pass EV ≈ +35–40% income — clears the "+43% or don't sell it" bar territory honestly.
All three odds render live on the capture UI whenever any boost is active. Luck budget
(published): base 1.0 + Stars ≤2.0 + pass ≤1.0 + potion ≤1.0 = **cap 5.0**.

## 5. Molds

| Mold | Share | Mult | Look |
|---|---|---|---|
| Gold | 55% | ×1.5 | Gold material, coin sparkle |
| Neon | 25% | ×2.5 | Emissive outline, hue cycle |
| Void | 12% | ×4 | Black body, purple rim |
| Prism | 6% | ×8 | Refraction, rainbow rays |
| Galaxy | 2% | ×20 | Starfield body, orbit particles |

v1 ships Gold/Neon/Void; Prism and Galaxy arrive as the first two content patches (each is
a re-spike event). Galaxy Cosmic = 800,000/s — the screenshot number. **Mold Reroll Chip:
crafted from 25 duplicate Commons** (the Common sink). Never sold.

## 6. The capture, blow by blow

1. **Spot** — auras; Legendary+ visible through walls as a light column.
2. **Chase** — flee AI runs waypoints; Mythic+ blinks 15 studs on a 6s cd. Your counters:
   sprint stamina, rocket-dash (8s cd), grapple verticality.
3. **Net** — aimed projectile, 1.5s reload.
4. **Secure** — 3s channel; a moving timing ring once per second; miss restarts the channel.
   Ring shrinks with tier. Fat touch targets on mobile — tested in W1.
5. **Haul** — over the shoulder at 65% (Harness → 80%). Struggle QTE every 15–25s, 1.5s
   window; fail = Furious escape (see §3).
6. **Deliver** — pad ceremony scaled to rarity; cash/sec starts.

**Route choice:** Safe Road (long) vs the **Cut** (half distance). In v1, Cuts are PvE
ambush corridors — rival NPC hunters attack mid-haul; surviving one pays +30% delivery
bonus. (PvP contest in Cuts returns with theft in v1.1, with newbie immunity applying
everywhere.) Your own captured haul is never stealable by players in v1.

## 7. The base

- 6 pads → base levels add +2 to 20 (exponential costs; the mid-game sink). Pad Row pass +4.
- Coin piles are physical (10-min visible cap); walk through to collect.
- **Pad Tuning (the endless sink):** each pad upgrades individually, +8% income per level,
  cost = 15 min of that pad's income × 1.5^level. Uncapped — this is where hour-40 cash goes.
- **Offline:** 50% rate, 8h cap (→12h upgrade). Login: pile burst + "Your bounties earned
  4.2M while you were gone."
- **Theft — v1.1, redesigned after review.** Draft 1 contradicted itself (unstealable hauls
  vs victim pursuit) and was unwinnable for raiders anyway. The v1.1 rule is asymmetric:
  **stolen goods are forcible everywhere** (a raider is fair game the entire way home) and
  the raider gets +15% Adrenaline speed while hauling so pursuit is winnable both ways.
  Offline bases locked, 2h newbie immunity everywhere, Shield 1h dev product. Shields are
  a minor SKU, priced accordingly — not the whale engine Draft 1 pretended.

## 8. Gear ladder (rescaled ×~15 — Draft 1's ladder was exhausted in ~100 minutes)

| Item | Cost | Effect |
|---|---|---|
| Sprint Shoes | 2,500 | +10% run |
| T2 Net | 30,000 | Epic/Legendary capture |
| Rocket Shoes | 75,000 | Dash burst 8s cd |
| Harness I | 150,000 | Haul 65→72% |
| Grapple | 200,000 | Rooftops; required for Shrine Peaks |
| T3 Net | 600,000 | Mythic/Secret |
| Harness II | 1,200,000 | Haul →80% |
| T4 Quantum Net | 8,000,000 | Cosmic |
| Glider / Phase Dash | v1.2 | — |

Gate the loot, not the door: walk anywhere from minute one; you just can't catch what you
find there yet. Seeing a Mythic you can't touch is the aspiration engine.

## 9. Districts & progression

| District | Access | Theme |
|---|---|---|
| Neon City | start | Street archetypes |
| The Docks | walkable; loot needs T2 | Sailor/mecha |
| Shrine Peaks | grapple (physical gate) | Spirit/samurai |
| Voidlands | Star 1 (v1.2) | Dark/cosmic |
| The Rift | weekly 48h event (v1.2) | Rotating limiteds |

**Star Rank (v1.2):** thresholds **5M / 60M / 700M / 8B** lifetime cash (Draft 1's 250k was
passed in an afternoon). A Star resets cash, gear AND base level (pads back to 6 — a real
reset); keeps the Book, your characters (stored), and grants +0.2 Luck (max +2.0) +5% speed.
**Bounty Book:** per-character pages, mold checkboxes; district completion = permanent +2%
cash + a net skin. Cosmics: silhouettes in-game, loud in marketing.

## 10. Session architecture (target 25–35 min, ≥1.6/day)

- **First minute, first session:** spawn in plaza; a scripted Common jogs past with a
  visible aura; net already in hand; first capture by 0:30; pad pays immediately; second,
  runnier Common at 1:30. No tutorial text.
- **Returning session:** collection ceremony (60s) → 3 Daily Contracts → **Manhunt** →
  1–2 free hauls, tune pads, out.
- **Manhunt (redesigned):** once daily, 10 minutes of **×2 scent spawn rate with +1-tier
  bias** — a personal payout window, not an information shader. It is the session climax
  and the reason to come back tomorrow.
- **Contracts target scent spawns** ("your scent will include 2 Rares — catch them"), so
  the 15-minute completion promise is enforceable, not contested.
- Slate flips 04:00 UTC. Streak: day 3 = potion, day 7 = **Mold Reroll Chip + potion**
  (Draft 1 promised a "Chrome mold" that didn't exist in the table).

## 11. Monetization (gentle; rating is distribution)

**Passes:** 2x Luck 399 (now genuinely ~+35–40% EV) · Auto-Collect 199 (v1.1) · Pad Row
249 · VIP 349 (+10% cash, aura, title) · Radar 199 (minimap tier pings).
**Dev products:** Luck Potion 49 (×2, 15 min, capped at 5.0 total) · Shield 1h 99 (v1.1) ·
Rift Key 149 (private guaranteed-Epic+ chase; you still have to catch it) · Starter Pack
199 (one-time). *(Draft 1's Shield 8h cut — it paid players to idle, the worst possible
algorithm signal, and offline bases are already locked.)*
**Cosmetics:** net skins 99–299 · capture poses 149 · haul trails 99 · base themes 249.
**The whale path is Pad Tuning** — uncapped cash sink fed by potions/luck, not by direct
purchase. **Never sold:** haul skips, capture automation, rerolls, characters, extra carry
capacity, Cut escapes. The verb is not for sale.

## 12. VFX ladder / art budget (honest)

Per character: one model + idle + run + struggle. Rarity VFX are shared per-tier overlays;
Molds are shared materials. **v1 roster: 12 characters** (was 24 — review priced 24 at ~5
weeks of pure art). Weekly cadence +1 to +3 DEPENDING ON the still-unrun timer test: one
character end-to-end, honestly timed, before the content calendar is believed.

## 13. Cold start & CCU

NPC targets: fully playable at 1 CCU (scent spawns make population irrelevant to your
income). 12-player servers for spectacle and future theft. Global Wanted Feed: cross-server
ticker of Secret/Cosmic captures.

## 14. KPIs

Bounce <60s <25% · 61–180s <20% · D1 >20% · D7 >8% · session 25–35m · sessions/day ≥1.6 ·
captures/session 8–15 (now guaranteed by scent math: 22/hr × 0.5h = 11 solo) · haul fail
15–25% · Cut usage 25–40% · like ratio >95% (soften theft first if it dips).

## 15. Build order (re-scoped after review; Draft 1's four weeks was ~half of honest)

- **W1 — the verb.** Grey-box: scent spawns, chase (no tricks), net, secure ring, haul +
  struggle QTE, one pad. **Test: 40 reps on a phone. If rep 40 feels like a commute, stop.**
  Also this week: the 12-bot spawn-contention sim (a day of scripting) and the character
  art timer. All three cheap tests before further building.
- **W2–3 — economy.** Pads, piles, offline, gear ladder, tiers 4–8, blink AI, Molds
  (3), Awakening, odds panel, districts 1–2.
- **W4–5 — retention layer.** Contracts, Manhunt, Book, streaks, Shrine Peaks, ceremony,
  first-60s script, analytics.
- **W6–7 — polish + soft launch.** SFX, thumbnails, quiet launch, tune D1 ≥20% before any
  promotion.
- **v1.1 (post-launch):** theft with the asymmetric rule, Shields, Auto-Collect, PvP Cuts.
- **v1.2:** Star Ranks, Voidlands, Rift, Prism/Galaxy, Glider.

## 16. Risks

1. Art cadence — unrun timer test gates the roster and weekly cadence.
2. Chase AI + carry replication are the real engineering — budgeted 2 weeks combined; if
   W1's grey-box slips, cut blink before cutting the haul.
3. Mobile QTE sizing — W1 phone test.
4. Theft tuning (v1.1) — like-ratio is the tripwire.
5. Policy — odds panel ships W2–3 with Molds, not later; luck cap 5.0 rendered live.

---

### Draft 2 changelog (from adversarial review)

1. Spawn economy split into personal scent + communal spectacle — fixes 12-player
   starvation AND the empty-server farming exploit (both were arithmetic failures).
2. Economy rescaled: gear ×~15, Star thresholds ×20 and rebirth now resets pads;
   Pad Tuning added as the uncapped endgame sink (Draft 1 ran out of sinks at ~hour 15,
   one offline night out-earned the entire gear ladder).
3. Luck pass fixed: mold 4→8% base, Awakening 2→3%, luck now biases personal scent
   rarity — EV rises from a mispriced +13% to ~+35–40%.
4. Theft contradiction resolved via asymmetric forcibility + Adrenaline; deferred to v1.1;
   Shield 8h deleted (paid players to idle); shields repriced as minor.
5. Scope honesty: 4 weeks → 7 to v1; roster 24→12; smoke/decoys, Star Ranks, theft,
   Glider, Auto-Collect, Prism/Galaxy, Voidlands, Rift all deferred; Furious made
   always-catchable with a 3-escape pity; Chrome-mold streak reward replaced; contracts
   bound to scent spawns so the 15-min promise holds.
