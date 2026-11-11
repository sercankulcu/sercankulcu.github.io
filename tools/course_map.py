# -*- coding: utf-8 -*-
"""Ders haritasi ureteci: files/<ders>/ders_haritasi.html.

    python tools/course_map.py            # tanimli butun dersler
    python tools/course_map.py os java    # yalnizca verilenler

Harita tanimlari tools/course_maps.py icinde. Bolum adlari ders sayfasindaki
"### Bolum N: Ad" basliklarindan okunur; haritada, tabloda ve kitapta ayni ad gecer.
Dugumler satirlara dizilir; oklar yalnizca ayni satirdaki komsu iki dugum arasinda
ya da ardisik iki satir arasinda cizilir, boylece hicbir ok bir kutunun ustunden
gecmez. Daha uzak bagimliliklar tabloda yazilir.
"""
import html, io, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from course_maps import MAPS  # noqa: E402

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = 722            # viewBox genisligi
GAP_X = 24
GAP_Y = 34
LINE = 17          # satir araligi
FONT = 14.5

GUARD = io.open(os.path.join(SITE, 'files', 'agt', 'ders_haritasi.html'), encoding='utf-8').read()
GUARD = GUARD[GUARD.index('<!-- ds-guard:begin -->'):GUARD.index('<!-- ds-guard:end -->') + len('<!-- ds-guard:end -->')]

LEAD = ('Bu sayfa dersin bütün bölümlerini tek bir haritada birleştirir. Her bölüm bir düğümdür; '
        'bir ok, sonraki konunun önceki konunun hangi fikrine dayandığını gösterir. Derse başlamadan '
        'önce okunursa konuların nereye gittiğini, ders sırasında okunursa bulunulan yeri gösterir.')


def course_info(page):
    s = io.open(os.path.join(SITE, '_teaching', page), encoding='utf-8').read()
    title = re.search(r'^title:\s*"?(.+?)"?\s*$', s, re.M).group(1)
    permalink = re.search(r'^permalink:\s*(\S+)', s, re.M).group(1)
    names = {int(n): t.strip() for n, t in re.findall(r'^### Bölüm (\d+): (.+)$', s, re.M)}
    return title, permalink, names


def wrap(text, maxch):
    words, lines, cur = text.split(), [], ''
    for w in words:
        if cur and len(cur) + 1 + len(w) > maxch:
            lines.append(cur)
            cur = w
        else:
            cur = (cur + ' ' + w).strip()
    lines.append(cur)
    return lines


def svg(m, names, uid):
    rows = m['rows']
    ncols = m.get('ncols', max(len(r) for r in rows))
    bw = (W - 12 - (ncols - 1) * GAP_X) / ncols
    maxch = int((bw - 12) / (FONT * 0.56))
    labels = {n: wrap(names[n], maxch) for r in rows for n in r}
    nl = max(len(v) for v in labels.values())
    bh = nl * LINE + 14
    pos = {}
    for ri, r in enumerate(rows):
        off = (ncols - len(r)) / 2.0
        cols = m.get('cols', {}).get(ri)
        for ci, n in enumerate(r):
            c = cols[ci] if cols else off + ci
            pos[n] = (6 + c * (bw + GAP_X), 6 + ri * (bh + GAP_Y), ri)
    H = 6 + len(rows) * (bh + GAP_Y) - GAP_Y + 6
    out = ['<svg class="ds-svg" viewBox="0 0 %d %d" role="img" aria-label="Dersin bölümlerini birbirine '
           'bağlayan kavram haritası"><defs><marker id="%s" viewBox="0 0 10 10" refX="9" refY="5" '
           'markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse">'
           '<path class="ah" d="M0 0 L10 5 L0 10 z"/></marker></defs>' % (W, H, uid)]
    for e in m['edges']:
        a, b = e[0], e[1]
        accent = len(e) > 2 and e[2] == 'ana'
        xa, ya, ra = pos[a]
        xb, yb, rb = pos[b]
        if ra == rb:
            assert abs(xa - xb) < bw + GAP_X + 1, ('komsu degil', a, b)
            y = ya + bh / 2
            if xb > xa:
                x1, x2 = xa + bw + 3, xb - 3
            else:
                x1, x2 = xa - 3, xb + bw + 3
            y1 = y2 = y
        else:
            assert abs(ra - rb) == 1, ('ardisik satir degil', a, b)
            ca, cb = xa + bw / 2, xb + bw / 2
            lim = bw / 2 - 14
            d = cb - ca
            k = (bh / 2) / (bh + GAP_Y)
            o = max(-lim, min(lim, d * k))
            if rb > ra:
                x1, y1, x2, y2 = ca + o, ya + bh + 3, cb - o, yb - 3
            else:
                x1, y1, x2, y2 = ca + o, ya - 3, cb - o, yb + bh + 3
        st = 'stroke:var(--ds-accent);stroke-width:3.2' if accent else 'stroke:var(--ds-link);stroke-width:1.8'
        out.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" style="%s" marker-end="url(#%s)"/>'
                   % (x1, y1, x2, y2, st, uid))
    for n, (x, y, _) in pos.items():
        hot = ' style="fill:var(--ds-hot)"' if n in m.get('hot', ()) else ''
        out.append('<rect class="box" x="%.1f" y="%.1f" width="%.1f" height="%d" rx="8"%s/>' % (x, y, bw, bh, hot))
        ls = labels[n]
        cx = x + bw / 2
        y0 = y + bh / 2 - (len(ls) - 1) * LINE / 2 + 5
        t = '<text class="txt" x="%.1f" y="%.1f" text-anchor="middle" style="font-size:%gpx">%s' % (
            cx, y0, FONT, html.escape(ls[0]))
        for l in ls[1:]:
            t += '<tspan x="%.1f" dy="%d">%s</tspan>' % (cx, LINE, html.escape(l))
        out.append(t + '</text>')
    out.append('</svg>')
    missing = set(names) - set(pos)
    assert not missing, ('haritada olmayan bolum', missing)
    return ''.join(out), H


def page(key):
    m = MAPS[key]
    _, permalink, names = course_info(m['page'])
    title = m['title']
    body, H = svg(m, names, 'map-' + key)
    rows = []
    for n, deps, bag in m['table']:
        d = ', '.join(names[x] for x in deps) if deps else '—'
        rows.append('    <tr><td>%s (%d)</td><td>%s</td><td>%s</td></tr>' % (names[n], n, d, bag))
    folder = m['folder']
    out = '''---
layout: without-sidebar
title: "%(title)s: Dersin Haritası"
permalink: /files/%(folder)s/ders_haritasi.html
excerpt: "%(title)s dersinin bütün bölümlerini tek bir haritada birleştiren sayfa: her bölümün hangi bölümün üzerine kurulduğu ve aralarındaki bağ."
---

%(guard)s

<link rel="stylesheet" href="notlar/notlar.css">

<article class="ds-notes" id="ds-notes" lang="tr">
<header class="nt-head">
  <p class="nt-kicker">%(title)s</p>
  <h1>Dersin Haritası</h1>
  <p class="nt-lead">%(lead)s</p>
</header>

<figure class="nt-fig nt-fig--wide" id="sekil-harita" style="--w:%(w)dpx">
  <div class="nt-fig__box">%(svg)s</div>
  <figcaption><b>Şekil 1:</b> Dersin haritası. %(caption)s</figcaption>
</figure>

<p><a href="#sekil-harita">Şekil 1</a> konular arasındaki bağları gösterir. Her düğüm bir bölümdür; bir ok, sonraki konunun öncekinin hangi fikrine dayandığını belirtir. Haritada yalnızca en yakın bağlar çizilmiştir; bir bölümün dayandığı bütün bölümler <a href="#tablo-baglar">Tablo 1</a>'dedir.</p>

<div class="nt-tablewrap">
<table class="nt-table nt-table--wide" id="tablo-baglar">
  <caption>Tablo 1: Haritadaki bağlar.</caption>
  <thead><tr><th scope="col">Konu (bölüm)</th><th scope="col">Dayandığı konu</th><th scope="col">Bağ</th></tr></thead>
  <tbody>
%(rows)s
  </tbody>
</table>
</div>

<p>%(spine)s</p>

<p class="nt-foot">Ders sayfası: <a href="%(permalink)s">%(title)s</a> · <a href="sozluk.html">Terim sözlüğü</a> · © Sercan Külcü. Tüm hakları saklıdır.</p>
</article>
''' % dict(title=title, folder=folder, guard=GUARD, lead=LEAD, w=W, svg=body, caption=m['caption'],
           rows='\n'.join(rows), spine=m['spine'], permalink=permalink)
    covered = {r[0] for r in m['table']}
    assert covered == set(names), ('tabloda eksik', set(names) - covered)
    p = os.path.join(SITE, 'files', folder, 'ders_haritasi.html')
    io.open(p, 'w', encoding='utf-8', newline='\n').write(out)
    print('%-16s %2d bolum, %d satir, yukseklik %d' % (key, len(names), len(m['rows']), H))


if __name__ == '__main__':
    for k in sys.argv[1:] or sorted(MAPS):
        page(k)
