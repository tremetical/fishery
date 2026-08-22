# Offline Base Battler — Concept Slate

Follows `design-direction.md`. 15 August 2026.

---

## 1. The opening: validated genre, beatable incumbent

Roblox's existing raid games — Base Raiders, Booga Booga, The Survival Game — are all
**synchronous**: you sneak into a base in a live server while the owner is standing there.
Different genre, different problems.

The closest thing to a true offline base battler is **Build to Defend Loot**
(TwoBrothers Games), and its numbers tell a specific story.

| Metric | Build to Defend Loot | Healthy benchmark | Read |
|---|---|---|---|
| Total visits | 81,321,738 | — | Demand is real and large |
| CCU | ~22,000 | — | Huge funnel, modest steady state |
| Rating | **88.2%** (6,496 downvotes) | 95%+ | Players actively unhappy. Build a Base RNG is at 99% |
| Avg playtime | **10.59 min** | 25–45 min | **The tell.** Log in, collect, get annoyed, leave |
| Favorites | 72,694 | — | People want to like it; they keep bouncing off |
| Server size | 6 | — | Instanced — bases load on demand, not co-inhabited |

Validated demand plus an unloved leader beats an empty genre. You don't have to prove
people want this. You have to fix what makes them leave.

## 2. Diagnosis: why offline raiding churns

Four stacked failure modes. Every async base game fights these; most lose.

- **Asymmetric fun.** Attacking is a game. Being attacked is a subtraction notice.
- **Loss without agency.** You were asleep. Nothing you could have done. Psychologically
  worse than losing a fair fight.
- **Snowballing.** Strong bases farm weak ones; the gap compounds nightly.
- **No comeback path.** Once behind you stay behind, so quitting is rational.

Clash of Clans mitigated these with shields and loot caps but never solved the first.
A 10.59-minute average session is what unsolved looks like.

### The fix worth building the game around

**Make successful defense a win condition that pays out, not merely damage avoided.**

If repelling a raid *earns* — currency, rank, a trophy from the attacker's squad — then
being attacked stops being a subtraction notice and becomes the thing you log in hoping to
read about. It inverts the emotional valence of the entire offline period. Nobody in this
genre has committed to it.

Three supporting rules:

- **You never lose what you built** — only what you accrued. Base is permanent, vault is
  raidable. Loss always recoverable inside one session.
- **Revenge is guaranteed and permanent.** Every attacker joins your revenge list and stays.
  Being raided hands you a quest.
- **The battle log is the product**, not a receipt. It's the highest-value retention
  artifact available: a personalized story waiting every morning.

Target shape of a morning report:

```
▚ NIGHT REPORT — while you were away
03:12  Vexlar_9    breached the east gate      — lost 2.1M scrip
04:40  koi_hunter  repelled by Iron Warden     +840K vigil
05:55  TTV_Marrow  repelled at the vault       +1.2M vigil
06:31  Vexlar_9    returned — repelled, squad captured
       3 of 4 held.  Net +1.9M.  Vexlar_9 added to revenge list.
       ▸ watch replay   ▸ take revenge   ▸ reinforce east gate
```

Four of six lines are good news. That's the thesis in one screen.

## 3. Concept slate

Theme is swappable — each works as a fishery, fortress, space station or corner store.
The mechanic is the idea.

| # | Concept | Core loop |
|---|---|---|
| 1 | **Nightwatch** — day/night async | day: roll → place garrison → raid others │ night: sieges resolve │ dawn: report → vigil → revenge |
| 2 | **Ghost Garrison** — recorded defense | record defense run → stored as ghost → attackers fight it → clip it |
| 3 | **Base Battle RNG, offline** — direct fusion | roll unit → place in garrison → raids resolve offline → loot funds rolls |
| 4 | **Vault Cracker** — skill-based attack | scout → breach layers → crack vault vs timer → extract |
| 5 | **Siege Ledger** — retaliation loop | get raided → revenge window → escalate → rivalry ranks |
| 6 | **Overnight Holdings** — clan territory | clan claims node → overnight contest → map redraws at dawn |

## 4. Gauntlet — Stage 0: kill screens

Same six binary screens as the previous round, plus one the market data earned:
**K7 — does being raided feel good?** That's the screen the incumbent fails.

| Concept | K1 Thumb | K2 <30s | K3 Return | K4 Whale | K5 8-wk | K6 Policy | K7 Raided OK | Result |
|---|---|---|---|---|---|---|---|---|
| 1 · Nightwatch | Pass | Pass | Pass | Pass | **Phased** | Pass | Pass | Survives — K5 passes only because nights ship as PvE first |
| 2 · Ghost Garrison | Pass | Pass | Pass | Med | **Hard** | Pass | Pass | Survives on merit, fails on v1 scope. Month four |
| 3 · Base Battle RNG offline | Pass | Pass | Pass | Pass | Pass | Pass | Med | Survives cleanly. Safest, lowest ceiling |
| 4 · Vault Cracker | Pass | Pass | Med | Pass | Pass | Pass | Med | Survives — stronger as an *attack model* than a whole game |
| 5 · Siege Ledger | Pass | **FAIL** | Pass | Pass | Pass | Pass | Pass | **Killed** — revenge needs history; a new player has no enemies |
| 6 · Overnight Holdings | Weak | **FAIL** | Pass | Pass | **FAIL** | Pass | Pass | **Killed** — nothing for a solo player at minute one; clans aren't a v1 |

## 5. Gauntlet — Stage 1: weighted scoring

Retention 35%, monetization 30%, virality 15%, feasibility 10%, defensibility 10%.

| Concept | Ret | Mon | Vir | Feas | Def | **Total** |
|---|---|---|---|---|---|---|
| 1 · Nightwatch | 9 | 9 | 7 | 6 | 7 | **8.20** |
| 2 · Ghost Garrison | 8 | 7 | 9 | 4 | 9 | **7.55** |
| 3 · Base Battle RNG offline | 8 | 8 | 6 | 9 | 5 | **7.50** |
| 4 · Vault Cracker | 7 | 7 | 8 | 8 | 6 | **7.15** |

Ghost Garrison scores highest on virality and defensibility and lowest on feasibility by a
wide margin — a month-four feature in a v1 costume. Nightwatch wins because its *frame*
solves the genre's core problem rather than decorating around it.

## 6. Gauntlet — Stage 2: red team

**Against Nightwatch.** The day/night frame fights timezones and session habits. Literal
server-time night means players in the wrong timezone never see the day loop. Per-player
night starting at logout means someone who plays twice daily gets two nights and an hourly
player gets none — the economy skews toward people who play *less*.
*Mitigation:* night is a per-player fixed-length window (~4h) beginning at logout, triggering
at most once per real-world day. Frequent players get a predictable daily cadence; absent
players don't accumulate twelve nights of losses. This is the concept's load-bearing number
— test it hard.

**Against the whole direction.** Async base warfare is real backend engineering, which is
*why* the genre is thin on Roblox rather than an accident. You need persistent base state,
a cross-server matchmaking pool, authoritative battle resolution, and stored replays.
Roblox exposes no deterministic RNG serialization — `Random.Product` is an open feature
request, not a shipped API — so you cannot resolve a raid by re-simulating it identically
on two machines.
*Mitigation:* resolve each raid **once**, server-authoritative, and store a compact event
log. The replay plays back the log; it never re-simulates. Keep combat on a fixed tick with
no Roblox physics in the resolution path. This is the most important architectural decision
in the project and it is very hard to retrofit.

## 7. Verdict

**Nightwatch as the frame. Vault Cracker as the attack. Ghost Garrison as the upgrade path.**

Nightwatch makes the offline window diegetic and pays out on successful defense — the one
change that fixes the 10-minute-session problem. Vault Cracker gives attacking a skill
expression suiting Roblox better than unit-deployment strategy. Ghost Garrison is the
month-four move that makes defenses personal and every raid a clip.

### Build order

The order matters more than usual — it validates the loop before the hard part is written.

1. **Weeks 1–2 · Day only.** Build a base, roll a garrison, fight a *PvE* night siege. No
   persistence, no matchmaking, no other players. Tests whether the night report is
   exciting. If it isn't, nothing downstream saves the game.
2. **Weeks 3–4 · The report and the payout.** Vigil currency for successful defenses, the
   morning report screen, first shield product. Tune until being attacked reads as good news.
3. **Weeks 5–6 · Real bases.** Persist base snapshots, seed the pool with plausible bot
   bases, swap PvE nights for real player raids. Bots stay permanently as cold-start padding
   and bracket filler.
4. **Weeks 7–8 · Attack skill.** Vault Cracker breach minigame, replays, revenge list.
5. **Month 3+ · Depth.** Ghost garrisons, clans and territory, trading.

### What has to be true

- **A successful defense must pay more than an average successful raid.** If offense
  out-earns defense, everyone builds glass cannons and the report reverts to a subtraction
  notice. This ratio is the game.
- **The night window must be once per real day, per player.** Get it wrong and the economy
  rewards logging in less.
- **The morning report must be worth opening the app for on its own.** Read it aloud with no
  game attached — if it isn't a story, redesign it before writing any combat code.

---

## Sources

Tracker figures are third-party estimates, used for magnitude only.

- [Rolimon's — Build to Defend Loot stats](https://www.rolimons.com/game/96280251181127)
- [Earnaldo — Build to Defend Loot guide](https://earnaldo.com/blog/build-to-defend-loot)
- [Base Raiders — Roblox](https://www.roblox.com/games/1696916806/Base-Raiders)
- [Booga Booga wiki — raiding](https://booga-booga-roblox.fandom.com/wiki/Raiding)
- [Roblox DevForum — Random.Product deterministic replay request](https://devforum.roblox.com/t/add-randomproduct-for-deterministic-replay-and-serialization/4729239)
- [Roblox DevForum — state-based replay module](https://devforum.roblox.com/t/replaymodule%F0%9F%8E%9E%EF%B8%8F-non-deterministic-state-based-replay-system/4507014)
- [Roblox DevForum — DataStore best practices](https://devforum.roblox.com/t/datastore-best-practices/2845439)
