---
name: roblox-pulse
description: Pull live Roblox market data, read what the Discover algorithm is currently promoting, and generate verified game ideas from it. Use when picking a genre or hook, sanity-checking a game concept, deciding what to ship next, or asking whether a slot is crowded. Hits Roblox's own explore-api sorts (the algorithm's actual output) plus the public Games API, with a WebSearch fallback where egress is filtered.
---

## What this does

Pulls **live** Roblox market data, reads what the Discover algorithm is currently promoting, and generates game concepts grounded in that read — then verifies each concept doesn't already exist before it gets pitched.

Use it when: picking a genre or hook, sanity-checking a concept someone is excited about, deciding what to ship next, or answering "is this slot crowded?" Do **not** use it to estimate a competitor's retention — that number is not obtainable (see Step 3).

Runs on any machine with normal outbound HTTPS. Degrades to WebSearch-only where egress is filtered.

---

## Step 1: Pull live data

Priority order. Everything in tier 1 is unauthenticated, server-side (no CORS headers — browser `fetch` will fail), and lives on Roblox's own edge (`128.116.0.0/16`, AS22697), *not* behind Cloudflare. No User-Agent spoofing needed; send an honest one.

### 1a. The algorithm's own output — explore-api (start here)

This is the single highest-value call. It returns the Discover/Charts rails in display order, games embedded, no auth.

```bash
curl -s -H 'Accept: application/json' -H 'User-Agent: roblox-pulse/0.1' \
  'https://apis.roblox.com/explore-api/v1/get-sorts?sessionId=pulse&device=computer&country=all' \
  | python3 -m json.tool | head -60
```

- **Auth:** none. **Confidence:** community-verified (live 2026-07-19 and 2026-08-09/10).
- `sessionId` is required (400 without it) but **unvalidated** — any non-empty string. It is not a cursor and not a shuffle seed; the ranked set is identical across sessionIds, which is what makes this usable as a measurement instrument.
- Pin `device=computer&country=all` so snapshots are comparable over time. Varying `country` is how you check regional charting.
- `sortsPageToken` → `nextSortsPageToken` paginates the *list of sorts* and works.

One sort at a time (this is how you poll `up-and-coming` cheaply):

```bash
curl -s -H 'User-Agent: roblox-pulse/0.1' \
  'https://apis.roblox.com/explore-api/v1/get-sort-content?sessionId=pulse&sortId=up-and-coming&device=computer&country=all'
```

**Known-good sortIds** (hard-code these — `get-sorts` does not advertise them all):

`top-trending` · `up-and-coming` · `top-playing-now` · `fun-with-friends` · `top-revisited` · `top-earning` · `top-paid-access` · `top-rated` · `most-popular` · `recommended-for-you`
Genre: `trending-in-{simulation, survival, action, rpg, shooter, strategy, sports-and-racing, roleplay-and-avatar-sim, party-and-casual, obby-and-platformer, puzzle, shopping, entertainment}`

Hard limits to design around:
- **~100 games per sort, no working pagination.** `nextPageToken` is in Roblox's type contract but comes back absent (open devforum request #4040481, unimplemented). If your game isn't top-100 in a sort, it is invisible here — use these sorts to *define the target*, not as your own telemetry.
- **`isSponsored: true` is paid placement, not earned rank.** Filter it before reading anything into position. This is the difference between measuring the algorithm and measuring an ad budget.
- **Array order IS rank.**
- Rate limits, observed Aug 2026 from the responses' own headers: `get-sorts` ~120/min, `get-sort-content` ~50/min. Honor `Retry-After`.
- Migration watch: `apis.roblox.com/charts-api/v1/get-sorts` appears to be the same operation under a new path (RoSeal intercepts both). Keep the base path a config value. If explore-api 404s, swap the segment before assuming anything else broke.
- Some responses mix non-universe numeric IDs (category/filter IDs) into results — validate before batch-resolving.

### 1b. Hydrate — visits, favorites, votes

explore-api gives universeId + live playerCount but **not** visits or favorites. These two calls do, batched:

```bash
IDS=4442272183,2753915549,6516141723
curl -s "https://games.roblox.com/v1/games?universeIds=$IDS"
curl -s "https://games.roblox.com/v1/games/votes?universeIds=$IDS"
```

- **Auth:** none. **Confidence:** documented (Roblox's own Swagger, mirrored at `raw.githubusercontent.com/Paficent/Roblox-Api-Tracker/main/games/v1.json`).
- Cap is **100 IDs**; exceeding it is a 400, not truncation. Batch at 50 — every working client does.
- `/v1/games` returns `playing, visits, favoritedCount, created, updated, genre, genre_l1, maxPlayers, creator`. `/v1/games/votes` returns cumulative lifetime `upVotes, downVotes`.
- ~300 req/min observed. A 5,000-game sweep at 50/call is 100 requests — ~20s of budget. Poll every 5-15 min, never every 30s.
- `playing` is **instantaneous**, not windowed. Roblox exposes **no historical CCU anywhere** — your time series exists only if you build it, and a baseline you didn't start recording months ago cannot be recovered later.

Glue (mandatory — every `roblox.com/games/` URL is a placeId, every stats API keys on universeId):

```bash
curl -s https://apis.roblox.com/universes/v1/places/920587237/universe   # -> {"universeId":...}
```
Cache that mapping **permanently**; it never changes. (`api.roblox.com/universes/get-universe-containing-place` is dead. `/v1/games/multiget-place-details` 401s without a cookie.)

### 1c. Adjacency and crowding

```bash
# What the algorithm files next to a given game — its own answer to "what is this like?"
curl -s 'https://games.roblox.com/v1/games/recommendations/game/{universeId}?maxRows=20'

# How crowded a keyword actually is
curl -s 'https://apis.roblox.com/search-api/omni-search?searchQuery=anime%20factory&sessionId=pulse&pageType=all'
```
Both unauthenticated. omni-search returns 40/page + a next-page token; param casing is inconsistent across sources (`searchQuery` vs `SearchQuery`) — if you get a 400, try the other. Search ranking is experiment-bucketed; treat one pull as a sample.

### 1d. Your own game only — Open Cloud

```bash
curl -s -H "x-api-key: $ROBLOX_API_KEY" https://apis.roblox.com/cloud/v2/universes/{universeId}
```
The only endpoint here with a stability contract. **It cannot return `playing`, `visits`, or `favoritedCount`**, and a key only reads universes you own. Use it for *your* D1/D2-7/D8-28, session length, and DAU. Use the legacy public APIs for everyone else's. There is no supported path to a competitor's live CCU — plan for `games.roblox.com/v1/games` disappearing and don't make anything load-bearing depend on it.

### Tier 2: third party (research pulls, not dependencies)

| Source | Call | Notes |
|---|---|---|
| Rolimons | `GET https://api.rolimons.com/games/v1/gamelist` | One call, ~7,100 games, `{placeId: [name, ccu, icon]}`. **Send `User-Agent` (browser string), `Referer: https://www.rolimons.com/`, `Origin: https://www.rolimons.com/`** or you get 403. Cache 5 min; they refresh ~10 min. CCU only. Curated set — absence means nothing. |
| RoMonitor | `GET https://romonitorstats.com/api/v1/charts/get?name=session-length&placeId={id}&timeslice=day&proVersion=false&start=…&ends=…` | Undocumented, reverse-engineered. `name` also takes `visits`, `platform-ccus`, `platform-session-length`, `platform-sorts`. Only free source of third-party historical session length. **Owned by Silicon Digital → Gamefam.** Research pulls only; you are showing a competitor your query patterns. |
| BloxBunny | no public API | Holds exactly the right dataset — hourly since Aug 2020, per-sort rank history, entry/exit logs, typical placement duration. Zero GitHub consumers. Open devtools on their dashboard or email support; faster than reverse-engineering. |
| CCUCheck / RTrack / GGAID | paid | CCUCheck: 60s sampling + "Algorithm Tracker", **no JSON API** (UI + CSV), $29/$99. RTrack: real API via RapidAPI but Gamebeast acquired it 20 Jan 2026 and is folding it in. GGAID: API is Pro-only, undocumented. |
| Rotrends | **dead** | Deprecated 31 Aug 2026. Its *likes-per-1,000-visits* and *favorites-per-1,000-visits* normalization is worth reimplementing yourself from `/v1/games` data. |

**Never** import third-party revenue, session-length, or retention *estimates* as facts. None publish a testable methodology; CCUCheck "revenue ranges" and RTrack "gamepass sale trends" are modelled, not measured.

### Tier 3: WebSearch fallback (egress blocked)

Third-party stats sites and `create.roblox.com` / `devforum.roblox.com` are commonly 403'd by corporate/agent egress policies. When that happens:
1. `raw.githubusercontent.com` and GitHub code search usually still work. Roblox's own Swagger is at `raw.githubusercontent.com/Paficent/Roblox-Api-Tracker/main/games/{v1,v2}.json`; Roblox's own frontend constants (which endpoints the real web app calls, with what credentials) at `raw.githubusercontent.com/Deepsn/roblox_sourcemap/master/packages/discovery-common/src/ts/common/constants/bedev2Constants.ts`.
2. WebSearch for CCU/visit figures — then **date every number** and pass it through Step 2 before using it.
3. State explicitly in the output that the figure is search-sourced, not API-sourced. Never blend the two in one table without a provenance column.

### Working example

```python
#!/usr/bin/env python3
"""roblox-pulse: snapshot what Discover is pushing, hydrated with real stats."""
import json, time, urllib.request

UA = {"Accept": "application/json", "User-Agent": "roblox-pulse/0.1"}
SORTS = ["up-and-coming", "top-trending", "top-revisited"]

def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.load(r)

rows = {}
for sid in SORTS:                                   # <=50 req/min: sleep 1.3s
    d = get(f"https://apis.roblox.com/explore-api/v1/get-sort-content"
            f"?sessionId=pulse&sortId={sid}&device=computer&country=all")
    for rank, g in enumerate(d.get("games", []), 1):
        if g.get("isSponsored"):                    # paid placement != algorithm
            continue
        uid = g.get("universeId")
        if not isinstance(uid, int):                # guard: junk IDs appear
            continue
        rows.setdefault(uid, {"name": g["name"], "ccu": g["playerCount"], "sorts": {}})
        rows[uid]["sorts"][sid] = rank
    time.sleep(1.3)

ids = list(rows)
for i in range(0, len(ids), 50):                    # 100 is the hard cap; use 50
    chunk = ",".join(map(str, ids[i:i+50]))
    for g in get(f"https://games.roblox.com/v1/games?universeIds={chunk}")["data"]:
        rows[g["id"]].update(visits=g["visits"], favs=g["favoritedCount"],
                             created=g["created"], genre=g.get("genre_l1"))
    for v in get(f"https://games.roblox.com/v1/games/votes?universeIds={chunk}")["data"]:
        up, dn = v["upVotes"], v["downVotes"]
        rows[v["id"]]["rating"] = round(100 * up / max(up + dn, 1), 1)
    time.sleep(0.5)

stamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
print(f"# snapshot {stamp}  (organic only, sponsored filtered)")
for uid, r in sorted(rows.items(), key=lambda kv: -kv[1]["ccu"]):
    print(f'{r["ccu"]:>8} ccu | {r.get("visits",0):>12} visits | '
          f'{r.get("favs",0):>9} favs | {r.get("rating","?"):>5}% | '
          f'{r["sorts"]} | {r["name"]}')
```

Append each run to a file. **The diff between snapshots is the product** — entries, exits, and rank deltas are the only observable signal of what the June 2026 rework rewards. Sweeping all 22 sorts every 15 min costs ~88 req/hr, comfortably safe.

**Storage discipline:** one writer, many read-only readers (SQLite works). Store raw timestamped snapshots; never overwrite. Retry only on 429/5xx with exponential backoff + jitter; hard-fail 4xx. Read `x-ratelimit-remaining` / `x-ratelimit-reset` rather than trusting the numbers above.

**Posture:** unauthenticated, read-only, aggregate game-level data, honest UA, well under observed limits. No cookie. No third-party proxy (RoProxy's own author does not recommend it for production, and a proxy sees every header you send). No HTML scraping of Cloudflare-fronted `www.roblox.com`. Roblox's ToU prohibits automated access in the standard boilerplate way; enforcement is technical (throttles, IP blocks), but the realistic worst case for a solo dev is action against the account shipping the game — which is exactly why the collector should have no account attached to it. The Creator Third Party App Policy separately bans cross-experience *user* tracking; game-level aggregates are the safe side of that line.

---

## Step 2: Sanity-check the data

Do this before any number reaches a pitch. Every rule here exists because someone got it wrong.

1. **Never trust a single tracker.** Every third party is scraping the same public Roblox endpoints, with different sampling rates and different curated rosters. A number that appears in one place and nowhere else is a claim, not a measurement.
2. **Triangulate, and prefer first-hand.** If Roblox's own `/v1/games` disagrees with a tracker, Roblox wins. If two trackers disagree, go get the primary number yourself.
3. **Favorites and visits are far more reliable than CCU.** They're monotonic lifetime counters — no sampling error, no time-of-day effect, no bot-ban step function. CCU is a single instant that swings 3-5x across a day and collapses on a Tuesday morning. Rank games by favorites/visits; use CCU only for *current* momentum.
4. **The impossibility check.** A game with **>1M favorites** or **>100M visits** cannot have a sub-10K peak. Both are the accumulated residue of enormous traffic. If a source tells you otherwise, the source is measuring something else (one region, one place in a universe, a stale snapshot, or a wrong ID).
5. **Force a floor on peak with the lifetime-average identity:**
   ```
   player_hours   = visits × avg_session_minutes / 60
   lifetime_avg_ccu = player_hours / hours_since_launch
   ```
   Worked: 500M visits × 30 min = 250M player-hours. Launched 2 years ago = 17,520 h. → **~14,300 lifetime average CCU.** Peak must be a multiple of that (traffic is front-loaded and diurnal), so any claimed peak under ~30K is wrong. Run this whenever a CCU figure feels low against a big visit count. `created` comes back in `/v1/games`, so `hours_since_launch` is free.
6. **Date every figure.** `(2026-08-21, games.roblox.com/v1/games)`. An undated CCU number is worthless within a month. In writing, put the date and source inline, not in a footnote.
7. **Watch for platform-wide bot-ban waves.** Roblox periodically purges bot accounts and *every* game's CCU steps down at once. A game that "fell 40%" across such a boundary may have lost nothing real. Before reading a decline, check whether the whole cohort moved on the same date — compare a game to its peers, not only to its own past.
8. **Normalize before comparing.** Likes per 1,000 visits and favorites per 1,000 visits compare a 2M-visit game to a 2B-visit game honestly; raw counts only compare age.
9. **Don't confuse `playing` (universe-wide) with a single place**, and don't confuse a *sort rank* with popularity — a top-20 `up-and-coming` slot and a top-20 `most-popular` slot are different orders of magnitude.

---

## Step 3: Read what the algorithm is pushing

**Read the sorts, not the CCU leaderboard.** `most-popular` tells you what won years ago. `up-and-coming` and `trending-in-*` tell you what is winning *now*, which is the only actionable read.

- **`up-and-coming` ranks growth velocity relative to a game's OWN baseline**, not against the platform. A 400 → 1,600 CCU game and a 40K → 160K CCU game are the same signal. Two consequences: (a) small games are genuinely reachable here; (b) **every update re-spikes your own velocity**, which is why the cadence is ship lean, patch weekly.
- **`top-revisited`** is the return-behavior sort and the closest public mirror of what the 2026 signal set actually optimizes. Study its occupants hard.
- **`trending-in-{genre}`** is where you find the crowding answer: if your idea's genre rail is five near-identical games, the slot is taken.
- **Diff snapshots, don't read one.** Entry into `up-and-coming` + what the game's visits/favorites curve looked like in the days *before* entry is the only empirical read available on the velocity claim. That requires you to have been recording. Start now.
- Always drop `isSponsored` rows first.

### The June 2026 signal set

The discovery rework changed what's measured. Design against these, not against 2024 folklore.

| Signal | Detail |
|---|---|
| **First-play bounce** | An **explicit negative**, in **two separately-measured buckets: `<60s` and `61-180s`.** They need different fixes — sub-60s is "I didn't understand what this is / it didn't load / the first screen was a menu," and it's where most departures are. 61-180s is "I understood it and it wasn't worth it." Fix the first with an immediate legible verb on screen 1; fix the second with a first reward inside 3 minutes. |
| **Retention** | Split **D1 / D2-7 / D8-28**. The window widened from 7d to 28d, so a game that spikes and dies is now punished over a month, not a week. |
| **Spend** | Measured **separately** from engagement. Monetizing hard does not buy distribution; it is not in the engagement score. This is why "fully playable for free" positioning coexists with large revenue. |
| **Benchmarks** | **D1 > 20%, D7 > 8%.** Below those you are not competitive for promotion regardless of CCU. |
| **Playtime cap** | Discovery counts at most **60 min/user/day**. Optimizing sessions past an hour buys **nothing algorithmically** — it only shows up in spend and in D2-7. |
| **The most-rewarded behavior** | **Returning within 24-48h for a second, SHORTER session.** Not long sessions. Design sessions that *complete* and then point at tomorrow: a thing finishing overnight, a daily that resets, a visible next threshold. |

**What you cannot get, at any price:** a competitor's D1/D7/D28, their real session length, or their revenue. Roblox exposes retention only to owners via Creator Analytics / the Analytics Query API. No vendor tier changes this. When those benchmarks appear in a plan, they are targets for *your* dashboard — say so, and never present a competitor's retention as known.

---

## Step 4: Generate ideas

Feed Step 3's read in; ask these questions in this order. They are the ones that produce shippable concepts rather than pitch decks.

1. **"What is the verb the player's hands perform?"** Name it in one word. *Catching. Swinging. Stacking. Cutting. Aiming.* If you cannot, there is no game — there is a spreadsheet with a viewport. In fishing games the verb is *catching*; bolt a factory onto it and you have deleted the verb and kept a conveyor that spits out payouts.
2. **"What job does the produced thing DO?"** Anything a game *generates* — a character, a car, a pet, a sword — has to have a job afterward, or the generation is pointless. Good answers are plural and in tension: it earns for you (passively, offline), it fights for you, it is *seen* by other players. Tension between jobs (a limited display slot forcing an eviction) is where the retention actually lives. "It goes in your inventory" is not a job.
3. **"What completes tonight and what points at tomorrow?"** Per Step 3, this is the single most-rewarded loop. Every concept must answer it explicitly.
4. **"What is on screen in the first 20 seconds, and is the verb happening yet?"** Directly targets the `<60s` bounce bucket.
5. **"What does this look like on a phone thumbnail?"** Discover is a grid of icons. If the hook isn't legible at 150×150, the algorithm never gets a chance to measure anything else.
6. **"Which existing sort would this land in, and who's already there?"** If you can't name the rail, you can't name the audience.

### Failure modes — check every idea against both

- **Pitching systems instead of gameplay.** "Assign your squad to expedition posts and collect after 4 hours" is a menu with a timer. Ascension, prestige, mastery trees, and rebirths are *governors* on a loop — they are not the loop. If the pitch can be described entirely in nouns and durations with no verb, it failed question 1. Send-a-team-on-a-timer is the canonical version of this mistake and it keeps coming back because it's easy to spec.
- **Pitching things that already exist.** Enthusiasm is not novelty. Every idea goes to Step 5 before it goes in a document — no exceptions, including ideas that came from Step 3's data.

---

## Step 5: Verify before pitching

**Mandatory, per idea, before it is written down as a recommendation:**

1. `omni-search` the two or three most obvious names for it, plus the genre word:
   ```bash
   curl -s 'https://apis.roblox.com/search-api/omni-search?searchQuery=anime+factory&sessionId=pulse&pageType=all'
   ```
2. Pull `trending-in-{the relevant genre}` and read all ~100 entries.
3. Take the closest existing match and run `recommendations/game/{universeId}` — that surfaces the adjacent cohort the algorithm already believes in, which is where the real competitors hide.
4. Hydrate every candidate through `/v1/games` and record **CCU, visits, favorites, rating, created — with today's date.**
5. Write the verdict in one line: *slot is empty / slot has N games, biggest is X at Y CCU / slot is saturated.* If the biggest incumbent is small, that is usually genre data telling you the demand isn't there — not an opening.

### Cautionary list — real misses that this step would have caught

| Pitched | Killed by |
|---|---|
| **Racer Factory** | Genre data. Biggest Roblox racing game is Midnight Racing Tokyo at ~1.3K CCU; NitroLab Drag Racing ~104 players; racing sessions average 5-6 min, the worst bracket measured. An empty slot that is empty for a reason. |
| **Defend the Factory / base defense** | Saturation. Anime RNG Defense, Anime Defense RNG, Defend ur Base with Anime, Anime Battle RNG — plus Plants vs Brainrots averaging ~856K CCU. One search would have shown this. |
| **Fish as the factory output** | Verb test (Q1). The verb in fishing games is *catching*; a factory deletes it. |
| **Expeditions / assign-to-posts** | Systems-not-gameplay failure mode. |
| **Brainrot-adjacent anything** | Algorithmically filtered since April 2026 — Escape Tsunami fell ~97%, 1.25M CCU in June to 36.5K in August. Trend data, not taste. |
| **Real anime characters** | Legal, not market. Gamefam DMCA'd Anime Adventures and Anime Fighting Simulator X in 2023; both removed. Roblox pulls a game in ~24h on a valid notice. |

---

## Session-length benchmarks by genre

| Genre / game | Avg session |
|---|---|
| Social hangout | 45-60+ min |
| Tycoon | 38-45 min (idle-inflated — discount it) |
| **Simulator / RPG** | **30-40 min** |
| Fish It | ~30 min |
| FISH.OS | 18.1 min |
| Build A Ring Farm | 15.8 min |
| Build to Defend Loot | 10.6 min |
| Racing | 5-6 min |
| Deagle Arena | 5.7 min |

Read these against the 60 min/user/day discovery cap: a 30-40 min session that ends cleanly and pulls the player back tomorrow scores better than a 90-minute grind, because the second half of the grind is not counted and the return is.