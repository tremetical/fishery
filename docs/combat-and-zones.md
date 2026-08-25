# Combat and Zones — design spec

Settled 20 Aug 2026. Companion to CLAUDE.md's concept section.

## Zone structure: sail, don't teleport

**One place, one server.** Your island sits in the middle; zone islands ring it. Walk to
your dock, a boat takes you — ~4s ride with a camera pan. **No Roblox place-teleport ever**
(5-15s, sometimes fails, and every one is a chance to lose the player).

What that buys:
- **Zones are shared with the server.** You see other players fighting with their
  characters. A Mythic ultimate going off across the beach is free aspiration and free clips.
- **Your island is visible from the zones.** Progress is spatial.
- **Unreachable zones are visible from day one.** Aspiration for free.

## Gate the reward, never the door

Roblox switching cost is zero, so a hard wall does not make players grind — it makes them
leave. You can sail anywhere immediately.

| | Underpowered | Ready |
|---|---|---|
| Enemies | Shred you in ~15s | Fair fight |
| Drops | **Scale to damage dealt — you still earn** | Full rate |
| Boss | Cannot break its shield | Clearable |
| Rare table | Locked | Unlocked |

The wall sits on the loot table, not the entrance. "I'm stuck, I quit" becomes "I'm close,
one more run."

## Combat inputs — four, total

- Move (joystick / WASD)
- **1 / 2 / 3** — one ultimate per squad character
- Walking over drops collects them

Three characters follow and auto-attack whatever is nearest. **Position is the command
input** — you walk toward what you want dead.

**Drops land where the enemy died and despawn in ~20s.** That single rule keeps hands busy
with zero skill demand, and it is what separates active from AFK (idle collects ~40% of
drops, active 85%+).

### Ultimates

- **~14s base cooldown**, floors at 10s via Speed
- One per character, tied to weapon archetype
- Screen-filling VFX — where the art budget earns out
- **Rarity scales the visual, not just the number.** Common = a slash. Mythic = screen goes white.
- Three ultimates inside ~2s is the burst window — that is the boss mechanic

### Enemy types — behaviour, not bigger numbers

If Zone 4 is Zone 2 with more HP, players quit at Zone 3.

| Type | Behaviour | Forces |
|---|---|---|
| Runner | Fast, weak, beelines | Keeps you moving |
| Archer | Ranged, kites | Closing distance |
| Brute | Slow, high HP, blocks | Positioning |
| Swarm | 8-12 weak together | AoE ultimates |
| **Warden** | **Shielded — immune to auto-attacks** | **Forces an ultimate** |

The Warden is the unit that makes AFK insufficient. Introduce in Zone 2, early and cheap.

### Bosses

- **Shield = 20% max HP, fully regenerates in 5s**
- **Ultimates deal 8x damage to shields**
- Two held ultimates do NOT break it. Three, inside ~2s, do.

This one rule: makes bosses un-AFK-able, teaches ultimate timing with no tutorial, and makes
squad composition matter (three fast-cooldown characters beat three slow strong ones).

Boss drops a **guaranteed Hall-worthy character**.

## Zones

| Zone | Enemies | Run | Hook |
|---|---|---|---|
| 1 Shoreline | Runners | 2 min | Teaches move + ultimate. Cannot lose |
| 2 Thicket | + Archers, **Warden** | 3 min | Teaches burst. First real boss |
| 3 Quarry | + Brutes | 4 min | Chokepoints, positioning |
| 4 Drowned City | + Swarms | 4 min | AoE ultimates shine |
| 5 Ashfall | All, mixed | 5 min | Composition test |
| 6 The Spire | Elite everything | 6 min | Month-long goal, visible day 1 |

**Ship 3 zones, not 6.** Zones 4-6 are weekly patches, and every patch re-spikes the
Up-and-Coming sort, which ranks growth against your own baseline. Launch content is spent;
patch content compounds.

## Session architecture — target 30-40 min

| Beat | Time |
|---|---|
| Login: collect the overnight pile off the belt | 2 min |
| Factory: sell / display / ascend decisions | 4 min |
| Zone runs x4 | 16 min |
| Hall reshuffle (new rare arrived — who gets evicted?) | 3 min |
| Boss attempt | 5 min |
| **Total** | **~30 min** |

Levers:
- Runs at 3-5 min so "one more" is always cheap
- **The Hall breaks up combat.** Pure combat burns out; fight → manage → fight is what puts
  Pet Sim 99 and Grow a Garden in the 30-40 bracket
- **Ascend costs create the "one more run".** Being 200 scrap short is the strongest pull
  in the game
- AFK is the floor (~40%), never the ceiling

## Retention by window

**Bounce (<60s):** spawn beside a running belt, character in hand by 10s, dock 15 steps
away, **first kill by 45s**, no tutorial.

**D1 (highest-weighted signal — return in 24-48h):**
- Belt runs offline → return to a **physical pile of characters**, a 60s opening ceremony,
  not a popup
- Hall paid hourly while asleep → named number on login
- **Ascend takes real time.** Start a 6h ascension before logging off; it is done when you
  return. This is the one object aimed directly at the metric
- Daily rotating boss with a bonus

**D7:** zone progression is the spine; 3-5 new characters weekly.

**D8-28:** Hall completion index (permanently incomplete) · the Ascend chase (asymptotic) ·
Zone 6, visible since day one, reachable ~week four.

## The three numbers that decide it

- **AFK-to-active ratio** — target ~2.5x, measured as drops-collected. If it is really 1.4x,
  fix with drop geometry, never by nerfing auto-attack
- **Boss attempts to first clear** — median 2-4. One = no wall; 6+ = churn
- **Ultimates per minute in-zone** — 6-9. Below 5 the player is a spectator; shorten cooldown
