#!/usr/bin/env python3
"""
roblox-pulse - snapshot what the Roblox Discover algorithm is pushing right now.

Usage:
  python3 pulse.py sorts                      # list available sorts
  python3 pulse.py sort up-and-coming         # games in one sort, hydrated
  python3 pulse.py sort top-trending --json   # machine-readable
  python3 pulse.py game 920587237             # one place id, full stats + sanity check

All endpoints are unauthenticated. If you get 403s on every host you are behind an
egress allowlist - fall back to WebSearch (see SKILL.md Step 1 Tier 3).
"""
import json, sys, time, urllib.request, urllib.error, urllib.parse

UA = "roblox-pulse/0.1 (market research)"
EXPLORE = "https://apis.roblox.com/explore-api/v1"
GAMES = "https://games.roblox.com/v1"
UNIVERSES = "https://apis.roblox.com/universes/v1"

# get-sorts does not advertise all of these; hard-coded from community observation
KNOWN_SORTS = [
    "top-trending", "up-and-coming", "top-playing-now", "fun-with-friends",
    "top-revisited", "top-earning", "top-rated", "most-popular", "recommended-for-you",
]


def get(url, retries=3):
    for attempt in range(retries):
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=25) as r:
                return json.loads(r.read().decode())
        except urllib.error.HTTPError as e:
            if e.code == 429:
                wait = int(e.headers.get("Retry-After", 5))
                print(f"  rate limited, waiting {wait}s", file=sys.stderr)
                time.sleep(wait)
                continue
            if e.code == 403:
                sys.exit(f"403 on {urllib.parse.urlparse(url).netloc} - egress blocked or "
                         f"Cloudflare. See SKILL.md Tier 3 fallback.")
            raise
        except urllib.error.URLError as e:
            if "403" in str(e) or "Tunnel connection failed" in str(e):
                sys.exit(f"BLOCKED: {urllib.parse.urlparse(url).netloc} refused at the proxy.\n"
                         f"You are behind an egress allowlist. Every Roblox host will fail.\n"
                         f"Fall back to WebSearch - see SKILL.md Step 1, Tier 3, and apply the\n"
                         f"triangulation rules in Step 2 since search results are unreliable.")
            if attempt == retries - 1:
                sys.exit(f"network error on {url}: {e}")
            time.sleep(2 ** attempt)
    return None


def sorts():
    d = get(f"{EXPLORE}/get-sorts?sessionId=pulse&device=computer&country=all")
    out = []
    for s in d.get("sorts", []):
        sid = s.get("sortId") or s.get("sortDisplayName")
        out.append((sid, s.get("sortDisplayName", ""), len(s.get("games", []) or [])))
    return out


def sort_content(sort_id):
    d = get(f"{EXPLORE}/get-sort-content?sessionId=pulse&sortId={sort_id}"
            f"&device=computer&country=all")
    games = d.get("games", []) or []
    if not games:  # some sorts embed under a different key
        for k in ("gameSetItems", "items", "entries"):
            if d.get(k):
                games = d[k]
                break
    return games


def hydrate(universe_ids):
    """Batch 50 at a time - >100 is a 400, not a truncation."""
    stats, votes = {}, {}
    ids = [str(i) for i in universe_ids if str(i).isdigit()]
    for i in range(0, len(ids), 50):
        chunk = ",".join(ids[i:i + 50])
        for g in (get(f"{GAMES}/games?universeIds={chunk}") or {}).get("data", []):
            stats[g["id"]] = g
        for v in (get(f"{GAMES}/games/votes?universeIds={chunk}") or {}).get("data", []):
            votes[v["id"]] = v
        time.sleep(0.3)
    return stats, votes


def sanity(g, votes):
    """The checks that catch tracker artifacts. Returns list of warnings."""
    warn = []
    playing = g.get("playing", 0) or 0
    visits = g.get("visits", 0) or 0
    favs = g.get("favoritedCount", 0) or 0
    if favs > 1_000_000 and playing < 10_000:
        warn.append(f"{favs:,} favorites vs {playing:,} playing - past peak, or bad sample")
    if visits > 100_000_000 and playing < 5_000:
        warn.append(f"{visits:,} visits vs {playing:,} playing - well past peak")
    v = votes.get(g.get("id"), {})
    up, down = v.get("upVotes", 0), v.get("downVotes", 0)
    if up + down > 1000:
        ratio = up / (up + down) * 100
        if ratio < 90:
            warn.append(f"rating {ratio:.1f}% - below the 95% healthy bar")
    return warn


def lifetime_avg_ccu(visits, avg_playtime_min, days_live):
    """The arithmetic that catches impossible peak claims.
    A lifetime average forces a floor on peak - peak is always several x this."""
    if not (visits and avg_playtime_min and days_live):
        return None
    return (visits * avg_playtime_min / 60) / (days_live * 24)


def show_sort(sort_id, as_json=False):
    games = sort_content(sort_id)
    if not games:
        sys.exit(f"no games returned for sort '{sort_id}' - try `pulse.py sorts`")
    rows = []
    for rank, g in enumerate(games, 1):
        uid = g.get("universeId") or g.get("id")
        if not uid or not str(uid).isdigit():
            continue
        rows.append({
            "rank": rank,
            "universeId": int(uid),
            "name": g.get("name", "?"),
            "sponsored": bool(g.get("isSponsored")),
            "playing_sort": g.get("playerCount"),
        })
    stats, votes = hydrate([r["universeId"] for r in rows])
    for r in rows:
        s = stats.get(r["universeId"], {})
        r.update(playing=s.get("playing"), visits=s.get("visits"),
                 favorites=s.get("favoritedCount"), created=s.get("created", "")[:10],
                 warnings=sanity(s, votes) if s else ["no stats returned"])
    if as_json:
        print(json.dumps(rows, indent=1))
        return
    organic = [r for r in rows if not r["sponsored"]]
    print(f"\n{sort_id}  -  {len(rows)} games ({len(rows)-len(organic)} sponsored, filtered below)\n")
    print(f"{'#':>3} {'NAME':<38} {'PLAYING':>9} {'VISITS':>14} {'FAVS':>11}  CREATED")
    print("-" * 92)
    for r in organic[:40]:
        print(f"{r['rank']:>3} {r['name'][:37]:<38} {(r['playing'] or 0):>9,} "
              f"{(r['visits'] or 0):>14,} {(r['favorites'] or 0):>11,}  {r['created']}")
        for w in r["warnings"]:
            print(f"      !! {w}")


def show_game(place_id):
    u = get(f"{UNIVERSES}/places/{place_id}/universe")
    uid = u["universeId"]
    stats, votes = hydrate([uid])
    g = stats.get(uid, {})
    v = votes.get(uid, {})
    up, down = v.get("upVotes", 0), v.get("downVotes", 0)
    print(json.dumps({
        "name": g.get("name"), "universeId": uid, "placeId": int(place_id),
        "playing": g.get("playing"), "visits": g.get("visits"),
        "favorites": g.get("favoritedCount"), "created": g.get("created"),
        "rating": f"{up/(up+down)*100:.2f}%" if up + down else None,
        "warnings": sanity(g, votes),
    }, indent=1))
    print("\nNOTE: `playing` is instantaneous, not a peak. Roblox exposes no historical CCU.",
          "\nTo estimate peak: lifetime_avg = (visits x avg_playtime_min / 60) / (days_live x 24)",
          "\nPeak is always several multiples of lifetime average. Use it to reject impossible claims.")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    cmd = sys.argv[1]
    if cmd == "sorts":
        print(f"{'SORT ID':<30} {'DISPLAY NAME':<34} GAMES")
        print("-" * 76)
        for sid, name, n in sorts():
            print(f"{str(sid):<30} {name[:33]:<34} {n}")
        print(f"\nAlso try (not always advertised): {', '.join(KNOWN_SORTS)}")
    elif cmd == "sort":
        show_sort(sys.argv[2], "--json" in sys.argv)
    elif cmd == "game":
        show_game(sys.argv[2])
    else:
        sys.exit(__doc__)
