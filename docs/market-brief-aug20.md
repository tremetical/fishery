## What's winning right now

Every CCU below is a range across 2–4 trackers. **A platform bot-ban wave began ~17–18 Aug 2026 and was still running on 20 Aug — every figure dated before 18 Aug is inflated by an unknown margin.**

| Game | CCU (dated) | Trend | Why |
|---|---|---|---|
| Grow a Garden 2 | 396K–518K (7–14 Aug, med) | Flat plateau | Sequel launched into an owned audience; 400K in 20 min |
| Brookhaven ⚠ | 337K–571K (Aug, low) — 70% tracker spread | Flat | 78–83B visits, 26.7M favs — major regardless of CCU |
| Sailor Piece ⚠ | 340K–420K (Aug, med) — Rolimons says 2,060; **artifact, discard** | Down from 743.7K (19 Apr) | Anime action-RPG + collection. ~$2.13M/mo, free-to-play framing |
| Blox Fruits ⚠ | 203K–477K (Aug, low) — 2.35x spread | Declining | 7 yrs old; longevity mechanics, not launch spike |
| MM2 ⚠ | 174K–328K post-ban (18 Aug, low) — the quoted **1.0M is stale + bot-inflated** | Cliff | ~500K bots wiped in 2h |
| Animal Hospital | 206K–286K (Aug, med); 1.2M peak Jul | Declining | Launched 10 May 2026 → top-10 in 2 months. New games can still break in |
| +1 Speed Keyboard Escape ⚠ | ~253K (16 Aug, med); peak claims conflict 12x | Declining | ASMR clicker, 3B visits in 7 months |
| Steal a Brainrot | 184K–283K (16–18 Aug, med) | Down ~80% off summer | Genre deprioritized, not dead |
| 99 Nights in the Forest | 190K–370K (16–18 Aug, med) | Declining | Post-hype resting state |
| Jujutsu Shenanigans | 113K–263K (Aug, low) | Flat, re-spikes on updates | Anime-combat ceiling |
| Fish It | 114K–121K (Aug, med) | Collapsing | 50K→2.7M→120K in 12 months |
| Anime Vanguards | 20K–23K (10 Aug, high) | −94% from peak | Anime TD category leader — and that is what leading looks like now |
| Anime Origins | 21K–30K peak (14–17 Aug, med) | New, rising | Funded studio + 100K Discord opened at 26K. **This is your realistic ceiling** |

## What that means

- **Anime tower defense is dying, not consolidating.** Vanguards 21K, Anime Defenders <1.5K, whole TD category ~47K combined. Do not build TD.
- Demand moved to **anime action-RPG with a collection layer** (Sailor Piece, Blox Fruits, JJS). That is where your concept already sits.
- **Build a Base RNG is the live proof**: roll → build → physically defend, 24–34K CCU, 98.7% rating, ten weeks old (2–18 Aug 2026). Bolting a second physical verb onto a roller works.
- **Every "Steal a ___" idea is dead on arrival.** Incumbent owns the mechanic and the search convention; also breaks your own no-trading rule.
- Plan for **200–2,000 sustained CCU**, treat 5–15K as top-decile, 30K as the ceiling of success.
- Distribution, not design, sets the number. 35–45% of new sessions at scale trace to creator coverage.

## The ideas

| Name | What you do | Reuses | New work | Weeks | Verdict |
|---|---|---|---|---|---|
| **Defend the Factory** | Enemies walk your island; carry belt output to the breach, it plants and swings; 3 squad ults | Belt, carry, chute, machines, island | Straight-line walkers, wave mgr, ults | 2 | **Build first** |
| **Catch It** *(rename)* | Rare pulls come off the belt alive and flee; speed scales with rarity; net + tackle | Belt, roll, rarity FX, island terrain | Flee AI (or spline fallback), net, escape timer | 2–2.5 | Strong #2 |
| **Fuse It** | Figures made of head/torso/weapon; press two together, timed mash rerolls one slot | Belt, roll, chute | Socketed rig, press minigame, published table | 2 *(only if one shared rig)* | Strong #3 |
| **Unbox It** | Belt makes sealed boxes; shake to read the rattle, tear, slot into a display case | Everything | Box + shake states, 8 rattle samples, case | 2 | Safest build, weakest retention |
| **Overclock It** | Hold the lever past the red line, sprint a valve circuit, brake or blow | Belt, roll, chute, island | Heat state machine, pile LOD, blow payout | 2 | Good clip, no squad |
| **Don't Get Crushed** | Shadow diameter = rarity, visible to all 8; dodge the crate, punch it, run it home | Roll, FX, island | Telegraph, ragdoll, contested pickup | 1.5–2 | Cheapest; new netcode |
| **Grow an Island** | Keep-or-sell by hand; kept units live in pens and pay forever | Belt, carry, chute, islands | Persistence + 8-island replication | 3 | Overrun risk |
| **Stack It Big** | Two matching units fuse into one bigger; tower visible from other islands | Belt, rarity ladder | Merge rule, persisted tower, LOD | 2 | Unverified name |

**Killed:** Steal a Factory / Steal a Summon / Steal a Fighter / Steal a Machine (all Steal a Brainrot line-for-line; break no-trading; not 2 weeks) · Grow a Legend (Grow a Garden verb-for-verb) · Punch a Titan (AoT IP risk — the 2023 DMCA constraint) · Feed It & Throw a Fighter (throw-as-core-verb, already on your own kill list) · Don't Drop It (chute choice is a lookup table Discord solves in 48h) · Smash the Island (already specced in build-document.md §chain-kill) · Load the Ship (payout scales with server population — pays worst at launch).

## Top 3, ranked

**1. Defend the Factory**
- Wins because: factory and fight share one space — no portal, no loading, no second zone. Build a Base RNG validated exactly this shape at 24–34K/98.7% in ten weeks (Aug 2026). Anime TD is collapsing; this is the other shape.
- Day-2 hook: **Backlog Wave** — offline pressure (8h cap) stacks into one 90-second siege you trigger by lever. Real fight within 15s of spawning, over in 90s.
- SKUs: Luck Flask 2x/20min 49 R$ · Auto-Collect radius 8→25 studs 79 R$ · Roster +25 slots 99 R$.
- Risk: Plants vs Brainrots already ships factory-and-fight in one space. **Verify its Aug 2026 CCU before committing** — if a 2026 clone added a conveyor unit-source, this drops to DEAD.

**2. Catch It — rename required**
- Wins because: the rarity ladder becomes a difficulty curve. A Common is a 2s walk, a Sovereign is a 12s skill test you can lose. Nothing else on the list is this clippable.
- Day-2 hook: escapees go feral and hide on your island; board reads "3 ESCAPED", 3x payout, wiped at 04:00 UTC. Your misses are tomorrow's content, at zero content cost.
- SKUs: Luck Flask 49 R$ · Roster +25 slots 99 R$ · Auto-Sell Common/Uncommon only 149 R$. Never sell sprint, net or tackle.
- Risk: "Catch It" collides head-on with Fish It (2.7M peak CCU, Dec 2025) — you will be read as a clone and buried. Also: a purchased Luck boost that yields a pull the player then *misses* breaks the Paid Random Items odds display. Solve before shipping.

**3. Fuse It**
- Wins because: 12 heads × 12 torsos × 12 weapons = 1,728 readable silhouettes from 36 assets. It is the only idea where your art skill multiplies instead of adds — and it de-risks the untested 5/week roster cadence.
- Day-2 hook: **Order Board** — one grey silhouette wanted today, 8x payout, refreshes 04:00 UTC; your half-finished attempt sits physically in the press.
- SKUs: Luck Flask 49 R$ · Second Press Bay 149 R$ · Part Vault +30 99 R$. No reroll or lock tokens — named in the policy.
- Risk: **2 weeks only if every part fits one shared rig with fixed sockets.** If parts need per-combination fitting it is 5+ weeks — kill it rather than descope.

## Do this first

- **Run the untimed test in CLAUDE.md §7.3 this week**: one Archetype end to end — model, rig, idle, attack, ult VFX, 8 rarity variants — timed honestly. ≤6h picks Defend the Factory with 4–6 fighters; ≥12h forces Unbox It or Don't Get Crushed. Nothing else should be decided before this number exists.
- **Name clearance, one search pass**: exact titles for every shortlisted name, plus `Plants vs Brainrots` current CCU and whether any 2026 clone added a conveyor unit-source. Half the verdicts above ran with an exhausted search budget and are provisional.
- **Prototype the Backlog Wave first, not the factory** — the 90-second return siege is the entire D2-7 argument, and the factory already exists. If it doesn't feel good in a grey-box, the concept fails cheaply.