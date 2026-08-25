# ANIME BOUNTIES! — Full Game Specification

Draft 1 — 21 Aug 2026. Owner-directed concept: capture anime characters in the wild,
haul them home, they pay cash/sec. Rarities Common→Cosmic, mutations (Molds), movement
gear, Steal-a-Brainrot-style base with theft pressure. This doc specs the entire game.

**Hard constraints inherited from CLAUDE.md (non-negotiable):**
- Original characters in an anime STYLE. No real anime IP (Gamefam DMCA precedent, ~24h takedown).
- Total Luck hard-capped at 5.0x, odds published live on screen (Paid Random Items policy).
- No Robux rerolls or lock tokens (named in policy). Rerolls/locks are earned.
- Bounce measured <60s and 61–180s; D1 >20%, D7 >8%; most-rewarded behavior = return in 24–48h.

---

## 1. Fantasy & elevator pitch

You are a bounty hunter in a neon anime city. Rogue characters spawn across the map with
auras you can see from a distance — the rarer, the louder the VFX. Chase one down, net it,
carry it home on your shoulder while it struggles, and slot it into your base, where it
stands on a pad generating cash per second. Spend cash on rocket shoes, grappling hooks and
better nets to catch the ones you currently can't. Other hunters want what's on your pads.

**Title: "Anime Bounties!"** — shorter of the two candidates, parses instantly, fits the
"Anime X" naming convention that indexes well. ("Anime Bounty Hunters!" reads as two ideas.)

## 2. The core loop, by timescale

| Timescale | Loop |
|---|---|
| Seconds | Spot aura → chase → net shot → struggle |
| Minutes | The haul home: 65% speed, struggle QTEs, route choice (safe road vs contested cut) |
| Session | Pads fill with cash piles you physically collect; contracts; one Manhunt window |
| Hours | Offline accrual (8h cap, 50% rate) → login collection ceremony |
| Days | Gear ladder → districts → rebirth (Star Rank) → Bounty Book completion |
| Weeks | +3 new characters weekly, new Molds monthly, seasonal Cosmics |

Three loops stacked (Risky Round Trip + Grow & Return + Social Threat) — the Steal An Egg
shape, currently the fastest-growing loop stack on the platform.

## 3. Rarity ladder

Two curves, per the build-document correction: income steep, capture difficulty flat.
A Cosmic must be an event economically, but still physically catchable.

| Tier | Spawn weight | Cash/sec (base) | Flee speed (vs player 100%) | Struggles on haul | Net required |
|---|---|---|---|---|---|
| Common | 55% | 1 | 80% | 0 | T1 (free) |
| Uncommon | 26% | 3 | 90% | 1 | T1 |
| Rare | 12% | 12 | 100% | 1 | T1 |
| Epic | 5% | 45 | 110% | 2 | T2 |
| Legendary | 1.6% | 180 | 120% + smoke trick | 3 | T2 |
| Mythic | 0.35% | 900 | 130% + blink teleport | 4 | T3 |
| Secret | 0.04% | 6,000 | 135% + decoy clones | 5 | T3 |
| Cosmic | 0.01% | 40,000 | 140% + all tricks | 6 | T4 |

- Server = 12 players. Wave of 15 spawns every 4 minutes (~225/hr). Expected per server-hour:
  ~3.6 Legendary, ~0.8 Mythic, Secret ~1/11hrs, Cosmic ~1/44hrs. Mythic+ spawn fires a
  server-wide broadcast + map ping; Cosmic fires a screen-shake announcement.
- Escaped-net or failed-haul bounties do NOT despawn: they go **Furious** (+10% speed,
  +25% payout) and re-hide in-district for 90s. A miss is a harder second chance, never a
  dead loss.
- Despawn if untouched: 3 minutes (Commons), up to 8 minutes (Mythic+).

### Where Luck applies (solves the shared-spawn problem)

Spawns are server-communal, so personal Luck CANNOT bias the spawn table (whose luck would
apply?). Personal Luck applies at **capture resolution**, rolled the moment the net lands:

- **Mold (mutation) chance:** 4% base × Luck
- **Awakening chance** (captured bounty upgrades one rarity tier, with transform VFX): 2% base × Luck

Both odds display live on the capture UI whenever any boost is active — this is the
policy-compliant surface, and Awakening is the "my Rare became an Epic in my hands" clip.

## 4. Molds (mutations)

Rolled on capture, multiplicative with rarity, visual reskin (material swap + particle set).

| Mold | Share of mold rolls | Multiplier | Look |
|---|---|---|---|
| Gold | 55% | ×1.5 | Gold material, coin sparkle |
| Neon | 25% | ×2.5 | Emissive outline, hue cycle |
| Void | 12% | ×4 | Black body, purple rim light |
| Prism | 6% | ×8 | Refraction shader, rainbow rays |
| Galaxy | 2% | ×20 | Starfield body, orbiting particles |

- Net mold chance at 1.0 Luck = 4%; a Galaxy on any spawn = 0.08% of captures.
- Gold Cosmic = 60,000/s. Galaxy Cosmic = 800,000/s — the number people screenshot.
- **Mold Reroll is earned, never sold:** craft a Reroll Chip from 25 duplicate Commons
  (doubles as the Common sink). Policy keeps Robux out of rerolls.

## 5. The capture, blow by blow

1. **Spot.** Auras are visible through buildings at Legendary+ (colored light column).
   Radar pass pings tier icons on the minimap — information, never automation.
2. **Chase.** Flee AI: waypoint runs with per-tier tricks (smoke = 2s invisibility,
   blink = 15-stud teleport on a 6s cooldown, decoys = 2 fakes that dissolve on hit).
   Player counters: sprint (stamina), rocket-shoe dash (8s cd), grapple (verticality).
3. **Net.** Aimed projectile, 1.5s reload. Hit = bounty downed, struggle bar begins.
4. **Secure.** 3-second channel standing over it. It bucks once per second — a moving
   timing ring; miss the ring and the channel restarts. Higher tiers shrink the ring.
5. **Haul.** Over the shoulder, 65% move speed (Harness upgrades → 80%). Every 15–25s a
   struggle QTE (1.5s window). Fail = it breaks free, goes Furious, chase resumes.
6. **Deliver.** Walk onto an empty pad, ceremony plays (rarity-scaled), cash/sec starts.

**Route choice (the greed decision, every haul):** every district has a Safe Road (long,
no PvP) and a **Cut** (half the distance, marked red, carried bounties are contested there —
another hunter can damage you to force a drop, then take the haul). You choose your risk
per run. Outside Cuts, a carried bounty can never be taken from your hands.

## 6. The base

- Starts with 6 pads; base levels (cash sink) add +2 up to 20; a gamepass adds one row of 4.
- Pads accumulate a **physical coin pile** (10 min of income visible); walking through it
  collects. Auto-Collect pass vacuums in a 25-stud radius.
- **Offline:** 50% rate, 8h cap (upgradeable to 12h). Return ceremony: pile bursts + a
  named report ("Your bounties earned 214,400 while you were gone").
- **Theft (the social threat):** a raider channels 6s at your pad (interruptible by you or
  your turret), then must haul it home with YOUR bounty's struggle stages active and a
  server-visible HOT beacon over their head. Victims online get an alert + waypoint.
- **Protections:** offline bases are locked (no offline theft, ever — this is deliberately
  kinder than Steal a Brainrot and is a stated design position). First 2h of playtime:
  immune and cannot steal. Lock Cores (crafted from 10 dupes) lock one pad for 2h online.
  Shield dev products cover the whole base (1h / 8h).
- Base is walkable by visitors; pads display name, rarity, mold. The base IS the flex.

## 7. Movement & gear ladder (cash sinks)

| Item | Cost | Effect |
|---|---|---|
| Sprint Shoes | 2,000 | +10% run |
| Rocket Shoes | 25,000 | Dash burst, 8s cd — catches Epics |
| Grapple Hook | 60,000 | Rooftop access — REQUIRED for Shrine Peaks district |
| T2 Net Launcher | 15,000 | Epic/Legendary capture |
| Glider | 150,000 | Ridge lines, catches Mythic blinks |
| T3 Net | 120,000 | Mythic/Secret |
| Harness I/II | 40k / 200k | Haul speed 65→72→80% |
| T4 Quantum Net | 1,000,000 | Secret/Cosmic |
| Phase Dash | Star 2 shop | Short blink of your own |

Gear is the ladder: each tier of net + movement opens the next rarity band and district.
Gate the loot, not the door — you can walk anywhere from minute one; you just can't catch
what you find there yet (and seeing a Mythic you can't touch is the aspiration engine).

## 8. Districts

| District | Unlock | Character theme | Terrain gimmick |
|---|---|---|---|
| Neon City | start | Street/delinquent archetypes | Flat, learnable |
| The Docks | free walk, loot needs T2 | Sailor/mecha archetypes | Cranes, container maze |
| Shrine Peaks | grapple required (physical) | Spirit/samurai archetypes | Vertical, rooftops |
| Voidlands | Star Rank 1 | Dark/cosmic archetypes | Low light, aura-spotting paradise |
| The Rift | weekly event, 48h window | Rotating limited characters | Changes weekly |

## 9. Progression

- **Hunter Level** (XP per capture): cosmetic rank + contract difficulty scaling.
- **Star Rank (rebirth):** at 250k / 2M / 15M / 100M lifetime cash — resets cash + gear,
  keeps base/pads/Book. Each Star: +0.2 Luck (max +2.0), +5% run speed, Voidlands at Star 1.
- **Luck budget (published in-game):** base 1.0 + Stars ≤2.0 + 2x pass ≤1.0 + potion ≤1.0
  = hard cap 5.0. The cap and current total render live on the odds panel.
- **The Bounty Book:** per-character page — captured? which Molds? District completion =
  permanent +2% cash multiplier + a net skin. Cosmic pages show silhouettes only in-game
  (but Cosmics are marketed loudly outside the game — famous outside, mysterious inside).

## 10. Session architecture

Target: 25–35 min sessions, ≥1.6 sessions/day.

- **0:00–0:45 first ever session:** spawn in plaza; a Common with a visible aura jogs past
  scripted; free net in hand; first capture by 0:30; pad payout starts instantly; second,
  slightly-runnier Common by 1:30. No tutorial text — the aura and the net do the teaching.
- **Returning session:** collection ceremony (60s) → 3 Daily Contracts (~15 min, e.g.
  "2 Rares in the Docks") → Manhunt window (below) → 1–2 free hauls, lock pads, log off.
- **Manhunt Beacon:** once per day, player-activated, 10 minutes of +1 effective spawn-read
  tier for you (you see richer targets highlighted). It's the "come back tomorrow" ritual
  AND the session's natural climax — after your Manhunt, the session feels complete.
- **Ends that point at tomorrow:** contract slate re-rolls at 04:00 UTC; login streak
  (day 3 potion, day 7 exclusive Chrome mold roll); Rift window countdown visible at base.

## 11. Monetization (gentle; rating is distribution)

**Gamepasses (one-time):**
| Pass | R$ | Effect |
|---|---|---|
| 2x Luck | 399 | Doubles mold+awaken odds (live odds panel) |
| Auto-Collect | 199 | 25-stud coin vacuum |
| Pad Row | 249 | +4 pads (one row max) |
| VIP | 349 | +10% cash, aura cosmetic, title |
| Radar | 199 | Minimap tier pings (info, not automation) |

**Dev products (repeatable — the real engine):**
| Product | R$ | Effect |
|---|---|---|
| Luck Potion | 49 | ×2 luck, 15 min (stacks to cap only) |
| Shield 1h | 99 | Base immune to theft |
| Shield 8h | 249 | Overnight-feel protection while online-idle |
| Rift Key | 149 | Private rift: one guaranteed Epic+ chase (still must catch it) |
| Starter Pack | 199 | Rocket shoes + potion + 5,000 cash (one-time) |

**Cosmetics:** net skins (99–299), capture poses (149), haul trails (99), base themes (249),
pad pedestals (149). Seasonal sets retire.

**Never sold:** haul skips, capture automation, direct characters, mold rerolls/locks,
extra carried-bounty capacity, escape-from-Cut items. The haul is the game; the verb is
not for sale (Fisch's collapse is the cautionary case).

## 12. VFX ladder (the art budget, honestly)

Per character: one model, one idle, one run, one struggle wiggle. That's it.
Rarity VFX are SHARED overlays (aura column, particles, screen effects) built once per tier:
- Common: none. Uncommon: faint shimmer. Rare: colored outline. Epic: particle trail.
- Legendary: light column + ground ring. Mythic: column + local color grade + heartbeat SFX.
- Secret: sky beam + rain of sparks. Cosmic: skybox tint for the whole server + slow-mo
  0.5s on capture + server-wide kill-feed card.
Molds are material swaps + one particle set each, also shared.
Launch roster: 24 originals (anime style, zero IP). Weekly +3. THE UNRUN TEST APPLIES:
time one character end-to-end before believing the cadence.

## 13. Cold start & CCU

- Targets are NPCs: the game is fully playable with 1 concurrent player. Other players are
  threat/spectacle, not required content. This is the structural edge over every player-
  target bounty game (Wild West: 833 CCU; Westbound: 1.9K — both need population).
- 12-player servers so Cuts and theft have bodies without matchmaking.
- Global Wanted Feed: cross-server ticker of Secret/Cosmic captures with usernames —
  aspiration at zero cost.

## 14. KPIs

| Metric | Target | Lever if off |
|---|---|---|
| Bounce <60s | <25% | Scripted first chase earlier/closer |
| Bounce 61–180s | <20% | Second capture beat at 1:30 |
| D1 | >20% | Offline ceremony + streak tuning |
| D7 | >8% | Contract variety, district pacing |
| Median session | 25–35 min | Contract length, Manhunt placement |
| Sessions/day | ≥1.6 | Manhunt as ritual; 04:00 slate flip |
| Captures/session | 8–15 | Spawn density, chase length |
| Haul fail rate | 15–25% | QTE window ±, struggle cadence |
| % hauls via Cut | 25–40% | Cut payout bonus tuning |
| Like ratio | >95% | Soften theft before touching anything else |

## 15. Build order (existing assets: spawn islands; base/pad code adaptable)

- **W1:** spawn waves + aura ladder + net + secure + haul/struggle + pads/cash + 8 chars
  (4 tiers). Grey-box one district. THE TEST: is chase→net→haul fun in a grey-box?
- **W2:** gear shop, tiers 5–8, Molds, Awakening, theft loop + protections, offline accrual,
  first-60s script, odds panel.
- **W3:** contracts, Manhunt, Book, Star Ranks, districts 2–3, analytics events.
- **W4:** polish, SFX, thumbnail set, soft launch quiet, tune D1 before any push.

## 16. Risks (named, not hidden)

1. **Art cadence** — 24 characters + 3/week rides on the untested per-character time. Run the test first.
2. **Steal-genre fatigue / clone filter** — we are not "Steal a X": the hunt verb is primary,
   theft is secondary and kinder (no offline theft). Positioning must lead with the chase.
3. **Mobile QTEs** — struggle rings need fat touch targets; test on a phone in W1.
4. **Theft griefing** — protections specced; tune with the like-ratio as the tripwire.
5. **Policy** — luck cap 5.0 published live; no paid rerolls; odds panel ships in W2, not later.
