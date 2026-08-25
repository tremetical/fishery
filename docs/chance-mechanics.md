# Chance Mechanics — Concept Slate

Third in series. Follows `design-direction.md` and `offline-base-battler.md`. 15 August 2026.

---

## 1. The opening: demand that's leaving the platform

The most popular format in Roblox's third-party gambling ecosystem is **crash**: place a
stake, watch a multiplier climb from 1.00×, cash out before it blows. Variants — Mines,
Towers, Slide — run the same engine with player-dialed risk. Bloxflip is the biggest name,
and Roblox Corp, parents and regulators all classify these as high-risk gambling aimed at a
young demographic.

Read as market research: **appetite for this exact loop among Roblox players is enormous and
demonstrably unmet on-platform.** Players are going somewhere worse to get a feeling your
game could give them for free.

The mechanic isn't the problem. A climbing multiplier you can bail out of is superb design —
it's the extraction loop in Tarkov, the box in Deal or No Deal, the core of every good
push-your-luck board game. It's predatory only when real money is on the table.

### The line, stated once

**Build the mechanic, not the casino.** In-game currency earned through play, no real-money
stake, no Robux wagering, no cash-out, no route from a gambled item back to Robux value.
Roblox additionally requires disclosed odds on paid random items; several jurisdictions
regulate them further. The compliant structure is also the higher-converting one: keep the
roll **free** and sell rate modifiers, convenience and protection. Cross that line and
you're shipping a legal problem with a delete button attached.

## 2. Why press-your-luck beats a loot box

A loot box gives variance without a decision. Press-your-luck gives variance you *chose*,
and that shows up in three commercially relevant places.

- **It produces stories.** "I was at 40× and pushed one more time" is something a player
  tells someone. "I pulled a legendary" is not. On a platform where growth runs through
  short-form clips, the mechanic that generates narrative wins.
- **Losses are self-inflicted, which players forgive.** Losing to greed stings but feels
  fair. Losing to an invisible 0.3% roll feels like cheating. Same math, opposite churn.
- **The tension is free content.** Every run differs without authored content — an unusually
  cheap retention engine for a small team.

It also pairs with the primitive Roblox has validated hardest. Grow a Garden — an idle game
— is the fastest experience in platform history to a billion visits (22M peak CCU, 35B+
total). Offline accrual is the strongest available tailwind. **Nobody has combined it with
press-your-luck:** let the pot build while you're away, then make the player decide what to
do with it.

## 3. Concept slate

| # | Concept | Structure |
|---|---|---|
| 1 | **The Climb** — idle × press-your-luck | offline: pot builds │ login: stake pot → multiplier climbs → BANK or PUSH → reinvest |
| 2 | **Trade-Up** — inventory as stake | collect tier N → sacrifice N items → roll one tier N+1 |
| 3 | **The Deep Vault** — spatial risk | enter → clear room → loot compounds → LEAVE or open next door |
| 4 | **Fuse** — merge × risk | two items → SAFE fuse (60% +1 tier) or RISK fuse (20% +2, may destroy both) |
| 5 | **Cursed Cargo** — information risk | unknown item → APPRAISE (costs) or EQUIP BLIND → discover trait |
| 6 | **Hot Hand** — streak ladder | win → streak++ → escalating stakes → one loss resets |
| 7 | **The Pot** — communal jackpot | all contribute → timer → one winner takes pot |

Merge is worth noting as validated and fresh: **Merge Shop** launched 27 March 2026, 24.6M
visits, ~4.2K CCU, **96% rating**. Players like the mechanic; nobody has put teeth on it.

## 4. Gauntlet — Stage 0: kill screens

The usual six plus one this genre earns: **K7 — does a loss produce a story or just a
subtraction?** That question separates press-your-luck from a slot machine.

| Concept | K1 | K2 <30s | K3 Return | K4 Whale | K5 8-wk | K6 Policy | K7 Loss=story | Result |
|---|---|---|---|---|---|---|---|---|
| 1 · The Climb | Pass | Pass | Pass | Pass | Pass | Pass | **Strong** | Survives clean on all seven — the only one that does |
| 2 · Trade-Up | Pass | Pass | Fix | Pass | Pass | **Care** | Pass | Survives. Closest to loot-box mechanics — earned currency only, odds posted |
| 3 · The Deep Vault | Pass | Pass | Fix | Pass | Med | Pass | **Strong** | Survives. Level content is the cost driver |
| 4 · Fuse | Pass | Pass | Fix | Pass | Pass | Pass | Pass | Survives. Cheapest build by a distance |
| 5 · Cursed Cargo | Weak | Pass | Fix | Pass | Pass | Pass | Pass | Survives. Hook is invisible in a thumbnail |
| 6 · Hot Hand | Pass | Pass | **FAIL** | Med | Pass | Pass | Pass | **Killed as a game.** Reset-to-zero is a *mode* — nothing persists, no tomorrow. Great event inside another game |
| 7 · The Pot | Pass | Med | Pass | Pass | Pass | **FAIL** | **FAIL** | **Killed.** Zero agency; loss is pure subtraction. "Everyone pays in, one winner takes it" is a lottery with the serial numbers filed off |

## 5. Gauntlet — Stage 1: weighted scoring

Retention 35%, monetization 30%, virality 15%, feasibility 10%, defensibility 10%.

| Concept | Ret | Mon | Vir | Feas | Def | **Total** |
|---|---|---|---|---|---|---|
| 1 · The Climb | 8 | 8 | 9 | 9 | 7 | **8.15** |
| 2 · Trade-Up | 8 | 9 | 7 | 8 | 6 | **7.95** |
| 3 · The Deep Vault | 8 | 8 | 8 | 7 | 6 | **7.70** |
| 4 · Fuse | 7 | 8 | 6 | 9 | 7 | **7.35** |
| 5 · Cursed Cargo | 6 | 7 | 7 | 8 | 8 | **6.85** |

The Climb wins on an unusual profile: the only concept scoring 9 on *both* virality and
feasibility. Press-your-luck generates its own clips, and a multiplier with a bank button
needs no netcode, no matchmaking, no persistence beyond a single number. For a small team
that combination is the deciding factor.

## 6. Gauntlet — Stage 2: red team

**Against The Climb.** Pure press-your-luck is thin — one button pressed repeatedly, closer
to a minigame than a game, and it can be *solved*. Once players find the optimal bank point
the tension evaporates.
*Mitigation:* the curve must not be stationary. Vary risk profile per run — some steep and
short-fused, some slow and long — and surface that shape only partially so reading a run is
a skill. Layer permanent progression underneath so a bad run still advances something. The
pot coming from offline accrual is what stops it feeling like a slot machine: you *earned*
that stake by being away, so pushing it means something.

**Against the whole direction.** Chance-forward games attract scrutiny and the audience is
largely minors. Expect moderation attention, parent complaints, and creators framing it as
gambling regardless of real money. The framing risk is real even when compliance is clean.
*Mitigation:* lean into what is unambiguously game rather than wager. Publish odds
prominently rather than burying them. Never let a purchase be the direct stake — Robux buys
rate modifiers and protection, never a spin. Avoid casino iconography entirely: no chips,
cards, slot reels or roulette. Theme it as expedition, heist or ascent. The mechanic
survives that translation completely intact and the association problem disappears with it.

## 7. Verdict

**The Climb as the frame. Trade-Up as the economy. Fuse as the crafting layer.**

The Climb supplies the moment-to-moment decision and the clips. Trade-Up turns the
collection into a second, slower gamble feeding a trading economy — and trading is what gave
Murder Mystery 2 a decade of retention. Fuse is a cheap crafting layer giving banked
winnings somewhere to go.

Together they cover all five primitives: the climb is the roll, the collection is the
persistent asset, the pot is offline accrual, trading and leaderboards are the social stake,
and limited high-volatility runs are the scarcity clock.

### Build order

1. **Weeks 1–2 · The button.** One climb, one bank button, one currency. No accrual, no
   collection, no shop. If pressing push isn't tense by minute three, fix that before
   anything else exists.
2. **Weeks 3–4 · The pot.** Offline accrual feeding the stake, plus permanent upgrades so a
   lost run still advances something. First protective product ships here.
3. **Weeks 5–6 · The collection.** Items, rarity tiers, Trade-Up. Odds published in-game
   from day one.
4. **Weeks 7–8 · The social layer.** Live leaderboards for biggest bank and biggest bust,
   run replays, trading.
5. **Month 3+ · Volatility events.** Limited-time run types with distinct curves — the
   scarcity clock and the season-pass hook.

### What has to be true

- **There must be no solvable optimal bank point.** If a wiki can publish "always bank at
  8.4×", the game is finished. Varying curve shapes per run is the fix and it needs to be in
  from the start.
- **A lost run must still advance something permanent.** Zero-progress sessions are how
  chance games churn players. Losing the pot should still buy a sliver of accrual rate.
- **The biggest bust of the day should be as celebrated as the biggest bank.** If the
  leaderboard only honors winners, losing is shameful and players hide it. If it honors
  spectacular failure, losing becomes content — and content is distribution.

---

## Sources

- [BloxRanks — Roblox chance-game formats](https://bloxranks.com/games/)
- [Roblox gambling concerns — third-party site overview](https://roblox-gambles.b-cdn.net/index.html)
- [Earnaldo — Merge Shop stats and guide](https://earnaldo.com/blog/merge-shop-free-robux-guide)
- [Roblox DevForum — merge systems and paid random items](https://devforum.roblox.com/t/merge-system-and-paid-random-items/4463332)
- [Roblox Creator Hub — monetization and paid random items](https://create.roblox.com/docs/production/monetization)
- [Roblox idle games and offline progression](https://gamertagmythras.com/blog/roblox/best-roblox-idle-games)
- [Grow a Garden — visits and concurrency](https://en.wikipedia.org/wiki/Grow_a_Garden)
