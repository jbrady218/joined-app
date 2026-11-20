#!/usr/bin/env python3
"""Builds texts/bibpar.json: verse-by-verse Bible parallels for Book of Mormon chapters.

For every Book of Mormon chapter listed in PARALLELS, each verse is matched (by shared wording) to the Bible verse it
quotes, in order. Verses with no good match get an empty label. The app shows the matched Bible verse (KJV and the
modern WEB) under the Book of Mormon verse, with a word-by-word "Compare" view.

The earlier Isaiah entries (texts/isapar.json, aligned by hand) are folded in unchanged.
Run from the repo root:  python3 tools/align_parallels.py
Also rewrites the PAR_KEYS / PAR_REV lines in extras.js.
"""
import json, re, sys

# (book id of the Bible text file, display name)
BIB = {"mat": "Matthew", "isa": "Isaiah", "mic": "Micah", "mal": "Malachi", "exo": "Exodus", "mark": "Mark",
       "1cor": "1 Corinthians", "heb": "Hebrews"}

# Book of Mormon chapter -> ordered list of (bible id, chapter). The Bible chapters are concatenated in this order.
# The third value is the lowest match score accepted (looser for paraphrases).
PARALLELS = {
    "3ne.12": ([("mat", 5)], .50), "3ne.13": ([("mat", 6)], .50), "3ne.14": ([("mat", 7)], .50),
    "3ne.16": ([("isa", 52)], .55), "3ne.20": ([("mic", 5), ("isa", 52)], .55),
    "3ne.21": ([("isa", 52), ("mic", 5)], .55), "3ne.22": ([("isa", 54)], .50),
    "3ne.24": ([("mal", 3)], .50), "3ne.25": ([("mal", 4)], .50),
    "mosiah.12": ([("isa", 52)], .55), "mosiah.13": ([("exo", 20)], .45),
    "2ne.6": ([("isa", 49)], .55), "2ne.9": ([("isa", 55)], .55), "2ne.27": ([("isa", 29)], .45),
    "2ne.30": ([("isa", 11)], .55), "moro.7": ([("1cor", 13)], .45), "moro.10": ([("1cor", 12)], .45),
    "morm.9": ([("mark", 16)], .45),
}

def load_all():
    texts = {}
    base = json.load(open("texts.json"))
    for b in BIB:
        try:
            d = base[b] if b in base else json.load(open(f"texts/{b}.json"))
        except Exception:
            d = json.load(open(f"texts/{b}.json"))
        texts[b] = d
    return texts

def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower())

def words(s):
    return [x for x in (norm(w) for w in s.split()) if x]

def lcs(a, b):
    n, m = len(a), len(b)
    if not n or not m:
        return 0
    prev = [0] * (m + 1)
    for i in range(n):
        cur = [0] * (m + 1)
        ai = a[i]
        for j in range(m):
            cur[j + 1] = prev[j] + 1 if ai == b[j] else max(prev[j + 1], cur[j])
        prev = cur
    return prev[m]

def score(a, b):
    """How much of the shorter verse is found, in order, in the other. 0 when the overlap is tiny."""
    l = lcs(a, b)
    short = min(len(a), len(b))
    if short < 6 or l < 5:
        return 0.0
    return l / short

def align(bom, bib, floor):
    """Monotonic alignment: each BoM verse maps to at most one Bible verse, never going backwards."""
    n, m = len(bom), len(bib)
    S = [[score(bom[i], bib[j]) for j in range(m)] for i in range(n)]
    S = [[s if s >= floor else 0.0 for s in row] for row in S]
    # best[i][j]: best total for the first i BoM verses with the last matched Bible index < j (j = "next allowed")
    NEG = -1
    best = [[0.0] * (m + 2) for _ in range(n + 1)]
    choice = [[None] * (m + 2) for _ in range(n + 1)]
    for i in range(n - 1, -1, -1):
        for j in range(m, -1, -1):
            # option 1: skip this BoM verse
            v, c = best[i + 1][j], ("skip", j)
            # option 2: match it to Bible verse k >= j
            for k in range(j, m):
                if S[i][k] > 0:
                    t = S[i][k] + best[i + 1][k]
                    if t > v:
                        v, c = t, ("match", k)
            best[i][j], choice[i][j] = v, c
    out = [None] * n
    i, j = 0, 0
    while i < n:
        kind, k = choice[i][j]
        if kind == "match":
            out[i] = k
            j = k
        i += 1
    return out

def main():
    texts = load_all()
    result = {}
    # --- earlier Isaiah entries, converted to the same shape ---
    old = json.load(open("texts/isapar.json"))
    for key, P in old.items():
        ch = {r.split(":")[0] for r in P["refs"]}
        title = "Isaiah " + (sorted(ch, key=int)[0] if len(ch) == 1 else f"{sorted(ch, key=int)[0]}–{sorted(ch, key=int)[-1]}")
        result[key] = {"title": title, "labels": ["Isaiah " + r for r in P["refs"]], "kjv": P["kjv"], "web": P["web"]}
    # --- new alignments ---
    for key, (chapters, floor) in PARALLELS.items():
        b, c = key.split(".")
        bomtxt = None
        base = json.load(open("texts.json"))
        bomtxt = (base[b]["std"] if b in base else json.load(open(f"texts/{b}.json"))["std"])[c]
        bib = []  # (label, kjv, web)
        for (bid, ch) in chapters:
            d = texts[bid]
            kv, wb = d["kjv"][str(ch)], d["web"][str(ch)]
            for v in range(len(kv)):
                bib.append((f"{BIB[bid]} {ch}:{v+1}", kv[v], wb[v] if v < len(wb) else ""))
        bw = [words(x[1]) for x in bib]
        m = align([words(x) for x in bomtxt], bw, floor)
        # A Book of Mormon verse can cover several Bible verses (e.g. Moroni 7:45 = 1 Corinthians 13:4-7): extend each match
        # over neighbouring Bible verses while that adds real shared wording and does not run into the next match.
        bomw = [words(x) for x in bomtxt]
        span = {}
        used = [k for k in m if k is not None]
        for i, k in enumerate(m):
            if k is None:
                continue
            lo = hi = k
            nxt = min([x for x in m[i + 1:] if x is not None] or [len(bib)])
            prv = max([x for x in m[:i] if x is not None] or [-1])
            cur = lcs(bomw[i], bw[k])
            while hi - lo < 5:
                if hi + 1 < nxt:
                    g = lcs(bomw[i], sum(bw[lo:hi + 2], []))
                    if g - cur >= 3:
                        hi += 1; cur = g; continue
                if lo - 1 > prv:
                    g = lcs(bomw[i], sum(bw[lo - 1:hi + 1], []))
                    if g - cur >= 3:
                        lo -= 1; cur = g; continue
                break
            span[i] = (lo, hi)
        def lab(i, k):
            lo, hi = span.get(i, (k, k))
            if lo == hi:
                return bib[k][0]
            nm, cv = bib[lo][0].rsplit(" ", 1)[0], bib[lo][0].rsplit(" ", 1)[1]
            c1 = cv.split(":")[0]; v1 = cv.split(":")[1]
            c2, v2 = bib[hi][0].rsplit(" ", 1)[1].split(":")
            return f"{nm} {c1}:{v1}\u2013{v2 if c1 == c2 else c2 + ':' + v2}"
        labels = ["" if k is None else lab(i, k) for i, k in enumerate(m)]
        kjv = ["" if k is None else " ".join(bib[x][1] for x in range(span.get(i, (k, k))[0], span.get(i, (k, k))[1] + 1)) for i, k in enumerate(m)]
        web = ["" if k is None else " ".join(bib[x][2] for x in range(span.get(i, (k, k))[0], span.get(i, (k, k))[1] + 1)) for i, k in enumerate(m)]
        if not any(labels):
            print("NO MATCHES for", key)
            continue
        names = []
        for (bid, ch) in chapters:
            nm = f"{BIB[bid]} {ch}"
            if any(l.startswith(nm + ":") for l in labels):
                names.append(nm)
        matched = sum(1 for l in labels if l)
        result[key] = {"title": " and ".join(names), "labels": labels, "kjv": kjv, "web": web, "partial": matched < len(labels) * 0.8}
        print(f"{key}: {matched}/{len(labels)} verses matched -> {result[key]['title']}")
    json.dump(result, open("texts/bibpar.json", "w"), ensure_ascii=False, separators=(",", ":"))
    # --- keys for the app ---
    keys = sorted(result.keys())
    rev = {}
    for k, P in result.items():
        for lab in P["labels"]:
            if not lab:
                continue
            nm, cv = lab.rsplit(" ", 1)[0], lab.rsplit(" ", 1)[1].split(":")[0]
            bid = {v: k2 for k2, v in BIB.items()}[nm]
            rev.setdefault(f"{bid}.{cv}", [])
            if k not in rev[f"{bid}.{cv}"]:
                rev[f"{bid}.{cv}"].append(k)
    js = open("extras.js").read()
    js = re.sub(r"const PAR_KEYS=.*?;/\*PARKEYS\*/", "const PAR_KEYS=" + json.dumps(keys) + ";const PAR_REV=" + json.dumps(rev) + ";/*PARKEYS*/", js, flags=re.S)
    open("extras.js", "w").write(js)
    print(len(keys), "chapters,", len(rev), "Bible chapters with links back")

if __name__ == "__main__":
    main()
