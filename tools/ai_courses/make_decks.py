# -*- coding: utf-8 -*-
"""Yapay Zeka ve Veri Dersleri Rehberi sunumlarini uretir.

    python tools/ai_courses/make_decks.py            # icerigi yazilmis butun dersler + acilis
    python tools/ai_courses/make_decks.py YZ MO      # yalniz verilen dersler

Kaynaklar:
    dersler.py    ders listesi ve dersler arasi iliskiler (ortusme slaytlari, komsuluk semasi)
    profiller.py  kisa adlar ve karsilastirma profilleri (ayrisma tablolari)
    icerik/KOD.py her dersin kendi metni (tanim, tarihce, kavramlar, ...)

Cikti files/ai_courses/slides/ altina yazilir; uretilen HTML'yi elle duzenlemeyin.
"""
import html
import importlib.util
import json
import math
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import dersler as D  # noqa: E402
import profiller as P  # noqa: E402

OUT = os.path.join(REPO, 'files', 'ai_courses', 'slides')
DERS_ADI = 'Yapay Zekâ ve Veri Dersleri Rehberi'
DERS_URL = '/teaching/ai-courses/'
GUARD_SRC = os.path.join(REPO, 'files', 'advanced_algorithms', 'slides', 'Bolum_02_Acgozlu_Algoritmalar.html')

TUR_RENK = {'alt': 'var(--ds-accent)', 'temel': 'var(--ds-link)', 'yontem': 'var(--ds-good)', 'uygulama': '#c77d12'}
TUR_CIZGI = {'alt': '', 'temel': '', 'yontem': '6 4', 'uygulama': '2 4'}
TUR_AD = {'alt': 'alt alan', 'temel': 'temel alır', 'yontem': 'yöntem paylaşır', 'uygulama': 'uygulama'}


def e(s):
    return html.escape(s, quote=True)


def guard():
    s = open(GUARD_SRC, encoding='utf-8').read()
    i = s.index('<!-- ds-guard:begin -->')
    j = s.index('<!-- ds-guard:end -->') + len('<!-- ds-guard:end -->')
    return s[i:j]


def kisa(kod):
    return P.PROFIL[kod][0]


def link(kod, metin=None):
    return '<a href="%s">%s</a>' % (D.dosya(kod), metin or D.ad(kod))


STYLE = """<style>
  .ds-deck .ai-q { margin: 6px 0 14px; padding: 14px 18px; border-left: 5px solid var(--ds-accent); border-radius: 0 12px 12px 0; background: var(--ds-surface-strong); font-size: 22px; font-weight: 700; line-height: 1.3; }
  .ds-deck .ai-time { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
  .ds-deck .ai-time .ds-deck__card { padding: 10px 12px; font-size: 15px; }
  .ds-deck .ai-time .ds-deck__tag { margin-bottom: 4px; }
  .ds-deck .ai-cards .ds-deck__card { padding: 9px 12px; font-size: 14.5px; line-height: 1.35; }
  .ds-deck .ai-cards .ds-deck__card strong { font-size: 15.5px; }
  .ds-deck .ai-tbl { font-size: 14px; }
  .ds-deck .ai-tbl th, .ds-deck .ai-tbl td { padding: 5px 8px; }
  .ds-deck .ai-tbl th:first-child { width: 112px; }
  .ds-deck .ai-tbl td.ai-self { background: color-mix(in srgb, var(--ds-accent) 7%, var(--ds-bg)); }
  .ds-deck .ai-rel { display: inline-block; padding: 0 7px; border-radius: 999px; font-size: 12.5px; font-weight: 700; color: #fff; white-space: nowrap; }
  .ds-deck .ai-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .ds-deck .ai-chips span, .ds-deck .ai-chips a { padding: 3px 10px; border: 1.5px solid var(--ds-border); border-radius: 999px; background: var(--ds-bg); font-size: 14px; }
  .ds-deck .ai-prof { gap: 8px; }
  .ds-deck .ai-prof .ds-deck__card { padding: 6px 11px; font-size: 14px; }
  .ds-deck .ai-prof .ds-deck__card strong { font-size: 11.5px; letter-spacing: .05em; text-transform: uppercase; color: var(--ds-muted); }
  .ds-deck .ai-mx td, .ds-deck .ai-mx th { text-align: center; }
  .ds-deck .ai-mx th:first-child { width: 190px; }
  .ds-deck .ai-demo-p { margin: -4px 0 8px; font-size: 15.5px; line-height: 1.4; }
  .ds-deck .ai-demo { display: flex; gap: 14px; align-items: flex-start; font-size: 14.5px; }
  .ds-deck .ai-demo svg { display: block; flex-shrink: 0; }
  .ds-deck .ai-demo .ai-side { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px; }
  .ds-deck .ai-demo .ai-ctl { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
  .ds-deck .ai-demo button { padding: 4px 11px; border: 1.5px solid var(--ds-border); border-radius: 999px; background: var(--ds-bg); color: var(--ds-text); font: inherit; font-size: 13.5px; cursor: pointer; }
  .ds-deck .ai-demo button:hover { border-color: var(--ds-link); }
  .ds-deck .ai-demo button.is-on { border-color: var(--ds-accent); background: color-mix(in srgb, var(--ds-accent) 16%, var(--ds-bg)); font-weight: 700; }
  .ds-deck .ai-demo label { font-size: 13.5px; color: var(--ds-muted); }
  .ds-deck .ai-demo input[type=range] { width: 100%; accent-color: var(--ds-link); }
  .ds-deck .ai-demo .ai-out { padding: 8px 11px; border: 1.5px solid var(--ds-border); border-radius: 10px; background: var(--ds-bg); font-size: 14px; line-height: 1.4; }
  .ds-deck .ai-demo .ai-out b { color: var(--ds-accent); }
  .ds-deck .ai-demo-n { margin-top: 8px; padding: 7px 12px; border-radius: 10px; background: var(--ds-surface-strong); font-size: 14px; line-height: 1.4; }
  .ds-deck .ai-myth td:first-child { width: 42%; }
  .ds-deck .ai-node rect { fill: var(--ds-bg); stroke: var(--ds-border); stroke-width: 1.5; }
  .ds-deck .ai-node:hover rect { stroke: var(--ds-link); }
  .ds-deck .ai-center rect { fill: color-mix(in srgb, var(--ds-accent) 14%, var(--ds-bg)); stroke: var(--ds-accent); stroke-width: 2; }
  .ds-deck .ai-legend { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; font-size: 13.5px; color: var(--ds-muted); }
  .ds-deck .ai-legend i { display: inline-block; width: 26px; margin-right: 6px; vertical-align: middle; border-top: 3px solid; }
EXTRA
</style>"""


def page(no, baslik, excerpt, slides, extra_css='', script=''):
    title = 'Bölüm %d: %s' % (no, baslik)
    fname = 'Bolum_%02d_%s.html' % (no, dosya_govde(no))
    fm = ['---', 'layout: without-sidebar', 'title: "%s"' % title,
          'permalink: /files/ai_courses/slides/%s' % fname,
          'excerpt: "%s"' % excerpt.replace('"', "'"), 'lang: tr',
          'seo_title: "%s · %s Sunumu"' % (title, DERS_ADI),
          'resource: "Presentation"', 'course:', '  name: "%s"' % DERS_ADI, '  url: "%s"' % DERS_URL, '---', '']
    body = [guard(), '', '<link rel="stylesheet" href="deck/deck.css">', STYLE.replace('EXTRA', extra_css), '',
            '<div class="ds-deck" id="ds-deck" lang="tr">',
            '  <div class="ds-deck__screen" id="ds-deck-screen" tabindex="0" aria-roledescription="sunum" aria-label="%s sunumu">' % e(title),
            '    <div class="ds-deck__stage" id="ds-deck-stage">',
            '      <div class="ds-deck__progress" aria-hidden="true"><span id="ds-deck-progress"></span></div>',
            '', '      <div class="ds-deck__viewport" aria-live="polite">', '']
    body += slides
    body += ['      </div>', '',
             '      <div class="ds-deck__bar">',
             '        <button class="ds-deck__button" type="button" id="ds-deck-prev" aria-label="Önceki slayt">←</button>',
             '        <span class="ds-deck__counter" id="ds-deck-counter">1 / 1</span>',
             '        <button class="ds-deck__button" type="button" id="ds-deck-next" aria-label="Sonraki slayt">→</button>',
             '        <span class="ds-deck__section" id="ds-deck-section">Sercan KÜLCÜ, Tüm hakları saklıdır.</span>',
             '        <select class="ds-deck__select" id="ds-deck-jump" aria-label="Slayta git"></select>',
             '        <button class="ds-deck__button" type="button" id="ds-deck-full" aria-label="Tam ekran">⛶</button>',
             '      </div>', '    </div>', '  </div>', '</div>', '', '<script src="deck/deck.js"></script>']
    if script:
        body += ['<script>', script.strip(), '</script>']
    s = '\n'.join(fm + body) + '\n'
    denetle(fname, s)
    open(os.path.join(OUT, fname), 'w', encoding='utf-8', newline='\n').write(s)
    return fname


def dosya_govde(no):
    if no == D.ACILIS[0]:
        return D.ACILIS[2]
    if no == D.KAPANIS[0]:
        return D.KAPANIS[2]
    return next(d[4] for d in D.DERSLER if d[1] == no)


def denetle(fname, s):
    """Canli sitede sayfayi bozan kaliplar (bkz. tools/check_site.py ve proje notlari)."""
    body = s.split('\n---', 1)[1]
    for pat, why in ((r'\{\{|\{%', 'Liquid'), (r'(?<![\w/]):[a-z0-9_+-]+:(?!//)', 'jemoji :ad: kodu')):
        for m in re.finditer(pat, body):
            ctx = body[max(0, m.start() - 30):m.end() + 30]
            if why.startswith('jemoji') and ('http' in ctx or 'style' in ctx[:40]):
                continue
            raise SystemExit('%s: %s -> %r' % (fname, why, ctx))
    for sc in re.findall(r'<script>(.*?)</script>', s, re.S):
        for line in sc.splitlines():
            code = re.sub(r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'', '""', line)
            if '//' in code:
                raise SystemExit('%s: satir ici betikte // var: %s' % (fname, line.strip()))


def slide(title, section, inner, cls=''):
    return ('        <section class="ds-deck__slide%s" data-title="%s" data-section="%s">\n%s\n        </section>\n'
            % (cls, e(title), e(section), inner))


def head(kicker, h2):
    return '          <p class="ds-deck__kicker">%s</p>\n          <h2>%s</h2>' % (kicker, h2)


# ---------------------------------------------------------------- svg yardimcilari

def svg_akis(adimlar):
    """Soldan saga kutular ve oklar. adimlar: [(baslik, alt etiket)]"""
    n = len(adimlar)
    W, gap = 720, 26
    bw = (W - (n - 1) * gap) / n
    parts = ['<svg class="ds-svg" viewBox="0 0 720 130" role="img" aria-label="%s" style="max-width:720px">'
             % e(' → '.join(a for a, _ in adimlar)),
             '<defs><marker id="ai-ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">'
             '<path class="ah" d="M0 0 L10 5 L0 10 z"/></marker></defs>']
    for i, (bas, alt) in enumerate(adimlar):
        x = i * (bw + gap)
        parts.append('<rect class="box" x="%.1f" y="18" width="%.1f" height="52" rx="10"/>' % (x, bw))
        satir = bas.split('\n')
        for k, t in enumerate(satir):
            y = 49 - 9 * (len(satir) - 1) + 18 * k
            parts.append('<text class="txt" x="%.1f" y="%.1f" text-anchor="middle">%s</text>' % (x + bw / 2, y, e(t)))
        for k, t in enumerate(alt.split('\n')):
            parts.append('<text class="lbl" x="%.1f" y="%d" text-anchor="middle">%s</text>' % (x + bw / 2, 92 + 17 * k, e(t)))
        if i < n - 1:
            parts.append('<path class="line" d="M%.1f 44 L%.1f 44" marker-end="url(#ai-ok)"/>' % (x + bw + 3, x + bw + gap - 3))
    parts.append('</svg>')
    return ''.join(parts)


def svg_komsular(kod):
    """Dersi ortada, komsularini cevresinde gosteren sema; dugumler sunumlara baglanir."""
    kom = D.komsular(kod)
    turu = {}
    for a, t, b, _ in D.ILISKILER:
        if a == kod:
            turu[b] = t
        elif b == kod:
            turu[a] = t
    W, H = 720, 400
    cx, cy = W / 2, 190
    n = len(kom)
    rx, ry = (300, 165) if n > 6 else (270, 150)
    parts = ['<svg class="ds-svg" viewBox="0 0 %d %d" role="img" aria-label="%s dersinin komşuları" style="max-width:720px">' % (W, H, e(D.ad(kod)))]
    nodes = []
    for i, (k, _, _) in enumerate(kom):
        ang = -math.pi / 2 + 2 * math.pi * (i + 0.5) / n
        f = 1.0 if (n <= 9 or i % 2 == 0) else 0.74
        w = 16 + 7.4 * len(kisa(k))
        x = min(max(cx + rx * f * math.cos(ang), w / 2 + 4), W - w / 2 - 4)
        nodes.append([k, x, cy + ry * f * math.sin(ang), w])
    for _ in range(80):
        moved = False
        for a in nodes:
            for b in nodes:
                if a is not b and abs(a[1] - b[1]) < (a[3] + b[3]) / 2 + 6 and abs(a[2] - b[2]) < 36:
                    a[2] = min(H - 20, max(18, a[2] + (3 if a[2] >= b[2] else -3)))
                    moved = True
        if not moved:
            break
    for k, x, y, _ in nodes:
        t = turu[k]
        parts.append('<path d="M%.1f %.1f L%.1f %.1f" style="stroke:%s;stroke-width:2.4;fill:none%s"/>'
                     % (cx, cy, x, y, TUR_RENK[t], (';stroke-dasharray:' + TUR_CIZGI[t]) if TUR_CIZGI[t] else ''))
    for k, x, y, w in nodes:
        name = kisa(k)
        parts.append('<a class="ai-node" href="%s"><rect x="%.1f" y="%.1f" width="%.1f" height="30" rx="15"/>'
                     '<text class="txt" x="%.1f" y="%.1f" text-anchor="middle" style="font-size:13.5px">%s</text></a>'
                     % (D.dosya(k), x - w / 2, y - 15, w, x, y + 5, e(name)))
    name = kisa(kod)
    w = 30 + 9.5 * len(name)
    parts.append('<g class="ai-center"><rect x="%.1f" y="%.1f" width="%.1f" height="44" rx="22"/>'
                 '<text class="txt" x="%.1f" y="%.1f" text-anchor="middle" style="font-size:17px">%s</text></g>'
                 % (cx - w / 2, cy - 22, w, cx, cy + 6, e(name)))
    parts.append('</svg>')
    return ''.join(parts)


def legend():
    return ('<div class="ai-legend">' + ''.join(
        '<span><i style="border-color:%s;%s"></i>%s</span>' % (
            TUR_RENK[t], 'border-top-style:dashed' if t == 'yontem' else 'border-top-style:dotted' if t == 'uygulama' else '',
            TUR_AD[t]) for t in ('alt', 'temel', 'yontem', 'uygulama')) + '</div>')


def rel_badge(t):
    return '<span class="ai-rel" style="background:%s">%s</span>' % (TUR_RENK[t], TUR_AD[t])


# ---------------------------------------------------------------- ders sunumu

def icerik_yukle(kod):
    p = os.path.join(HERE, 'icerik', kod + '.py')
    if not os.path.exists(p):
        return None
    spec = importlib.util.spec_from_file_location('icerik_' + kod, p)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    C = dict(m.ICERIK)
    pd = os.path.join(HERE, 'icerik', 'demo', kod + '.py')
    if os.path.exists(pd):
        spec = importlib.util.spec_from_file_location('demo_' + kod, pd)
        md = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(md)
        C['demo'] = md.DEMO
    return C


def iliski_listesi(kod):
    """[(diger, tur, bu dersin gozunden cumle, ortak konu)]"""
    out = []
    for a, t, b, konu in D.ILISKILER:
        if a == kod:
            if t == 'alt':
                s = 'Bu ders, %s dersinin alt alanıdır' % link(b)
            elif t == 'temel':
                s = 'Bu ders %s dersini temel alır' % link(b)
            elif t == 'uygulama':
                s = 'Bu ders %s yöntemlerini uygular' % link(b)
            else:
                s = '%s ile yöntem paylaşır' % link(b)
            out.append((b, t, s, konu))
        elif b == kod:
            if t == 'alt':
                s = '%s, bu dersin alt alanıdır' % link(a)
            elif t == 'temel':
                s = '%s bu dersi temel alır' % link(a)
            elif t == 'uygulama':
                s = '%s bu dersin yöntemlerini uygular' % link(a)
            else:
                s = '%s ile yöntem paylaşır' % link(a)
            out.append((a, t, s, konu))
    sira = {'alt': 0, 'temel': 1, 'uygulama': 2, 'yontem': 3}
    out.sort(key=lambda r: (sira[r[1]], D.KOD[r[0]][1]))
    return out


def ders_sunumu(kod, C):
    d = D.KOD[kod]
    no, kisim, adi, soru = d[1], d[2], d[3], d[5]
    kisim_adi = dict(D.KISIMLAR)[kisim]
    S = []
    agenda = ''.join('<span>%s</span>' % g for g in C['gundem'])
    S.append(slide('Bölüm %d: %s' % (no, adi), '',
                   '          <h1>%s</h1>\n          <div class="ds-deck__subtitle">%s · Kısım %s: %s</div>\n'
                   '          <div class="ds-deck__agenda" aria-label="Sunum içeriği">%s</div>\n'
                   '          <small>Sercan KÜLCÜ · Giresun Üniversitesi · Bilgisayar Mühendisliği</small>'
                   % (adi, DERS_ADI, ['I', 'II', 'III', 'IV', 'V', 'VI'][kisim - 1], kisim_adi, agenda),
                   ' ds-deck__slide--title'))
    # 2 soru
    S.append(slide('Ders Hangi Soruyu Sorar?', 'Giriş',
                   head('Giriş', 'Ders Hangi Soruyu Sorar?') +
                   '\n          <div class="ai-q">%s</div>\n          <p>%s</p>%s\n          <h3 style="margin-top:4px">Bir bakışta</h3>'
                   '\n          <div class="ds-deck__grid ds-deck__grid--3 ai-cards ai-prof">%s</div>' % (
                       soru, C['tanim'],
                       ('\n          <div class="ds-deck__callout">%s</div>' % C['not']) if C.get('not') else '',
                       ''.join('<div class="ds-deck__card"><strong>%s</strong><p>%s</p></div>' % (et, P.PROFIL[kod][1][al])
                               for al, et in P.ALANLAR))))
    # 3 tarihce
    cards = ''.join('<div class="ds-deck__card"><span class="ds-deck__tag">%s</span><p>%s</p></div>' % (y, t)
                    for y, t in C['tarihce'])
    S.append(slide('Kısa Tarihçe', 'Giriş', head('Giriş', 'Kısa Tarihçe') + '\n          <div class="ai-time">%s</div>' % cards))
    # 4 kavramlar
    cards = ''.join('<div class="ds-deck__card"><strong>%s</strong><p>%s</p></div>' % (b, t) for b, t in C['kavramlar'])
    cols = 4 if len(C['kavramlar']) == 8 else 3
    S.append(slide('Temel Kavramlar', 'Ders', head('Ders', 'Temel Kavramlar') +
                   '\n          <div class="ds-deck__grid ds-deck__grid--%d ai-cards">%s</div>' % (2 if cols == 4 else 3, cards)))
    # 5 is akisi
    S.append(slide('Tipik İş Akışı', 'Ders', head('Ders', 'Tipik İş Akışı') +
                   '\n          <div class="ds-deck__figure">%s</div>\n          <div class="ds-deck__callout">%s</div>'
                   % (svg_akis(C['akis']), C['akis_ornek'])))
    # 5b etkilesimli problem sayfasi
    demo = C.get('demo')
    if demo:
        S.append(slide('Dene: ' + demo['baslik'], 'Dene', head('Dene', demo['baslik']) +
                       '\n          <p class="ai-demo-p">%s</p>\n          <div class="ai-demo" id="ai-demo">%s</div>%s'
                       % (demo['problem'], re.sub(r'<svg(?![^>]*class=)', '<svg class="ds-svg"', demo['html'].strip()),
                          ('\n          <div class="ai-demo-n">%s</div>' % demo['not']) if demo.get('not') else '')))
    # 6 on kosullar
    rows = []
    for r in iliski_listesi(kod):
        k, t = r[0], r[1]
        if (t in ('temel', 'alt', 'uygulama') and any(a == kod and b == k for a, tt, b, _ in D.ILISKILER if tt == t)):
            rows.append('<tr><td>%s</td><td>%s</td></tr>' % (link(k), r[3]))
    for ad_, neden, url in C.get('onkosul_ek', []):
        rows.append('<tr><td>%s</td><td>%s</td></tr>' % (('<a href="%s">%s</a>' % (url, ad_)) if url else ad_, neden))
    S.append(slide('Ön Koşullar', 'Konum', head('Konum', 'Ön Koşullar') +
                   '\n          <p class="ds-deck__small ds-deck__muted">Bu dersten önce bilinmesi yararlı olan dersler ve neden gerektikleri.</p>'
                   '\n          <table class="ds-deck__table ai-tbl"><tr><th>Ders</th><th>Neden gerekir</th></tr>%s</table>' % ''.join(rows)))
    # 7 komsuluk semasi
    S.append(slide('Dersin Komşuları', 'Konum', head('Konum', 'Dersin Komşuları') +
                   '\n          <div class="ds-deck__figure" style="margin:0">%s</div>\n          %s' % (svg_komsular(kod), legend())))
    # 8 ortusme tablosu (8 satirda bir sayfa)
    rel = iliski_listesi(kod)
    parcalar = [rel[i:i + 8] for i in range(0, len(rel), 8)]
    for pi, parca in enumerate(parcalar):
        t = 'Örtüştüğü Dersler' + (' (%d/%d)' % (pi + 1, len(parcalar)) if len(parcalar) > 1 else '')
        rows = ''.join('<tr><td>%s</td><td>%s</td><td>%s</td></tr>' % (rel_badge(r[1]), r[2], r[3]) for r in parca)
        S.append(slide(t, 'Örtüşme', head('Örtüşme', t) +
                       '\n          <table class="ds-deck__table ai-tbl"><tr><th>İlişki</th><th>Ders</th><th>Ortak konu</th></tr>%s</table>' % rows))
    # 9 ayrisma (iki komsu bir sayfa)
    ay = C['ayrisma']
    parcalar = [ay[i:i + 2] for i in range(0, len(ay), 2)]
    for pi, parca in enumerate(parcalar):
        t = 'Ayrıştığı Noktalar' + (' (%d/%d)' % (pi + 1, len(parcalar)) if len(parcalar) > 1 else '')
        cols = [kod] + [k for k, _ in parca]
        hdr = '<tr><th>Ölçüt</th>' + ''.join('<th>%s</th>' % (kisa(k) if k == kod else link(k, kisa(k))) for k in cols) + '</tr>'
        rows = '<tr><th>Temel soru</th>' + ''.join('<td%s>%s</td>' % (' class="ai-self"' if k == kod else '', D.KOD[k][5]) for k in cols) + '</tr>'
        for alan, etiket in P.ALANLAR:
            rows += '<tr><th>%s</th>' % etiket + ''.join(
                '<td%s>%s</td>' % (' class="ai-self"' if k == kod else '', P.PROFIL[k][1][alan]) for k in cols) + '</tr>'
        notlar = ''.join('<li><b>%s:</b> %s</li>' % (kisa(k), cumle) for k, cumle in parca)
        S.append(slide(t, 'Ayrışma', head('Ayrışma', t) +
                       '\n          <table class="ds-deck__table ai-tbl" style="font-size:13px">%s%s</table>'
                       '\n          <ul class="ds-deck__small" style="margin-top:8px">%s</ul>' % (hdr, rows, notlar)))
    # 10 uygulamalar
    cards = ''.join('<div class="ds-deck__card"><strong>%s</strong><p>%s</p></div>' % (b, t) for b, t in C['uygulamalar'])
    S.append(slide('Uygulama Alanları', 'Uygulama', head('Uygulama', 'Uygulama Alanları') +
                   '\n          <div class="ds-deck__grid ds-deck__grid--3 ai-cards">%s</div>' % cards))
    # 11 araclar
    S.append(slide('Araçlar ve Örnek Veriler', 'Uygulama', head('Uygulama', 'Araçlar ve Örnek Veriler') +
                   '\n          <h3>Araçlar ve kütüphaneler</h3>\n          <div class="ai-chips">%s</div>'
                   '\n          <h3 style="margin-top:18px">%s</h3>\n          <div class="ai-chips">%s</div>%s'
                   % (''.join('<span>%s</span>' % a for a in C['araclar']), C.get('veri_baslik', 'Tanınmış veri setleri'),
                      ''.join('<span>%s</span>' % a for a in C['veriler']),
                      ('\n          <div class="ds-deck__callout">%s</div>' % C['araclar_not']) if C.get('araclar_not') else '')))
    # 12 yanilgilar
    rows = ''.join('<tr><td>%s</td><td>%s</td></tr>' % (a, b) for a, b in C['yanilgilar'])
    S.append(slide('Sık Karıştırılanlar', 'Uygulama', head('Uygulama', 'Sık Karıştırılanlar') +
                   '\n          <table class="ds-deck__table ai-tbl ai-myth"><tr><th>Yaygın düşünce</th><th>Doğrusu</th></tr>%s</table>' % rows))
    # 13 sonra
    ileri = []
    for a, t, b, _ in D.ILISKILER:
        if b == kod and t in ('temel', 'alt', 'uygulama') and a not in ileri:
            ileri.append(a)
    ileri.sort(key=lambda k: D.KOD[k][1])
    chips = ''.join('<a href="%s">%s</a>' % (D.dosya(k), D.ad(k)) for k in ileri) or '<span>Bu ders çoğunlukla uç noktadır; öteki dersleri temel alır.</span>'
    S.append(slide('Bu Dersten Sonra', 'Sonrası', head('Sonrası', 'Bu Dersten Sonra') +
                   '\n          <h3>Bu dersi temel alan ya da genişleten dersler</h3>\n          <div class="ai-chips">%s</div>'
                   '\n          <h3 style="margin-top:18px">İlgili meslekler</h3>\n          <div class="ai-chips">%s</div>'
                   '\n          <div class="ds-deck__callout">%s</div>'
                   % (chips, ''.join('<span>%s</span>' % m for m in C['meslekler']), C['sonra'])))
    # 14 kaynaklar
    S.append(slide('Kaynaklar', 'Sonrası', head('Sonrası', 'Kaynaklar') +
                   '\n          <ul>%s</ul>' % ''.join('<li>%s</li>' % k for k in C['kaynaklar'])))
    onceki = 'Bolum_%02d_%s.html' % (no - 1, dosya_govde(no - 1))
    sonraki = 'Bolum_%02d_%s.html' % (no + 1, dosya_govde(no + 1))
    S.append(slide('Son', '', '          <h1>Son</h1>\n          <div class="ds-deck__subtitle">Bölüm %d: %s</div>\n'
                   '          <small><a href="%s">← Önceki bölüm</a> · <a href="Bolum_01_Alanin_Haritasi.html">Alanın haritası</a> · <a href="%s">Sonraki bölüm →</a></small>'
                   % (no, adi, onceki, sonraki), ' ds-deck__slide--title'))
    script = ''
    css = ''
    if demo:
        script = ('(function () {\n  var root = document.getElementById("ai-demo");\n  if (!root) return;\n'
                  '  var SVGNS = "http:" + "/" + "/www.w3.org/2000/svg";\n%s\n})();' % demo['js'].strip('\n'))
        css = demo.get('css', '')
    return page(no, adi, C['excerpt'], S, extra_css=css, script=script)


# ---------------------------------------------------------------- acilis sunumu

def acilis():
    no = D.ACILIS[0]
    S = []
    S.append(slide('Bölüm 1: Alanın Haritası', '',
                   '          <h1>Alanın Haritası</h1>\n          <div class="ds-deck__subtitle">%s</div>\n'
                   '          <div class="ds-deck__agenda" aria-label="Sunum içeriği"><span>Dersin amacı</span><span>YZ ⊃ MÖ ⊃ YSA ⊃ DÖ</span>'
                   '<span>Altı kısım</span><span>İlişki türleri</span><span>Karşılaştırma ölçütleri</span><span>Etkileşimli harita</span></div>\n'
                   '          <small>Sercan KÜLCÜ · Giresun Üniversitesi · Bilgisayar Mühendisliği</small>' % DERS_ADI,
                   ' ds-deck__slide--title'))
    S.append(slide('Bu Ders Ne Anlatır?', 'Giriş', head('Giriş', 'Bu Ders Ne Anlatır?') + '''
          <p>Yapay zekâ ve veriyle ilgili <b>%d ders</b> her biri bir sunumla tanıtılır. Amaç bu dersleri öğretmek değil, <b>haritasını çıkarmaktır</b>: her ders hangi soruyu sorar, hangi araçları başka derslerle paylaşır, nerede ayrılır?</p>
          <div class="ds-deck__two">
            <div class="ds-deck__pc ds-deck__pc--pro"><h3>Bu derste var</h3><ul>
              <li>Her dersin temel sorusu ve kavramları</li><li>Kısa tarihçe ve tipik iş akışı</li>
              <li>Ön koşullar ve komşu dersler</li><li>Örtüşme ve ayrışma tabloları</li><li>Uygulama alanları ve araçlar</li></ul></div>
            <div class="ds-deck__pc ds-deck__pc--con"><h3>Bu derste yok</h3><ul>
              <li>Ders notu ve kitap</li><li>Kod örnekleri ve ödev</li><li>Formüllerin türetilmesi</li>
              <li>Bir dersin bütün konuları</li></ul></div>
          </div>''' % len(D.DERSLER)))
    # ic ice kumeler
    venn = '''<svg class="ds-svg" viewBox="0 0 720 330" role="img" aria-label="Yapay zekâ makine öğrenmesini, makine öğrenmesi yapay sinir ağlarını, yapay sinir ağları derin öğrenmeyi kapsar" style="max-width:700px">
<ellipse cx="360" cy="168" rx="350" ry="158" style="fill:color-mix(in srgb, var(--ds-link) 6%, var(--ds-bg));stroke:var(--ds-link);stroke-width:2"/>
<ellipse cx="420" cy="186" rx="265" ry="126" style="fill:color-mix(in srgb, var(--ds-link) 11%, var(--ds-bg));stroke:var(--ds-link);stroke-width:2"/>
<ellipse cx="475" cy="204" rx="180" ry="94" style="fill:color-mix(in srgb, var(--ds-link) 17%, var(--ds-bg));stroke:var(--ds-link);stroke-width:2"/>
<ellipse cx="520" cy="220" rx="102" ry="60" style="fill:color-mix(in srgb, var(--ds-accent) 16%, var(--ds-bg));stroke:var(--ds-accent);stroke-width:2"/>
<text class="txt" x="64" y="104">Yapay Zekâ</text><text class="lbl" x="64" y="124">arama, planlama,</text><text class="lbl" x="64" y="141">mantık,</text><text class="lbl" x="64" y="158">uzman sistem</text>
<text class="txt" x="185" y="150">Makine Öğrenmesi</text><text class="lbl" x="185" y="172">karar ağacı, SVM,</text><text class="lbl" x="185" y="190">k-ortalama</text>
<text class="txt" x="325" y="160">Yapay Sinir Ağları</text><text class="lbl" x="325" y="182">algılayıcı, çok</text><text class="lbl" x="325" y="200">katmanlı ağ</text>
<text class="txt" x="520" y="216" text-anchor="middle">Derin Öğrenme</text><text class="lbl" x="520" y="238" text-anchor="middle">CNN, dönüştürücü</text>
</svg>'''
    S.append(slide('Terimler İç İçe', 'Giriş', head('Giriş', 'Terimler İç İçe: YZ ⊃ MÖ ⊃ YSA ⊃ DÖ') +
                   '\n          <div class="ds-deck__figure" style="margin:0">%s</div>\n'
                   '          <p class="ds-deck__small">Her halka bir öncekinin alt alanıdır: her derin öğrenme modeli bir sinir ağıdır, ama her yapay zekâ sistemi öğrenmez. '
                   'Satranç oynayan bir arama programı yapay zekâdır, makine öğrenmesi değildir.</p>' % venn))
    # alti kisim
    cards = []
    for k_no, k_ad in D.KISIMLAR:
        ds = [d for d in D.DERSLER if d[2] == k_no]
        cards.append('<div class="ds-deck__card"><strong>%s. %s</strong><p>%s</p></div>' % (
            ['I', 'II', 'III', 'IV', 'V', 'VI'][k_no - 1], k_ad,
            ', '.join('<a href="%s">%s</a>' % (D.dosya(d[0]), kisa(d[0])) for d in ds)))
    S.append(slide('Altı Kısım', 'Yapı', head('Yapı', 'Altı Kısım, %d Ders' % len(D.DERSLER)) +
                   '\n          <div class="ds-deck__grid ds-deck__grid--3 ai-cards">%s</div>' % ''.join(cards)))
    # iliski turleri
    ornek = {'alt': ('Derin Öğrenme → Yapay Sinir Ağları', 'Bütün kavramları devralır, kendine özgü yenilerini ekler.'),
             'temel': ('Bilgisayarlı Görü → Görüntü İşleme', 'Öteki ders önce bilinmelidir; bu ders onun üstüne kurulur.'),
             'yontem': ('Veri Madenciliği ↔ Makine Öğrenmesi', 'Aynı araçları kullanırlar ama farklı sorular sorarlar.'),
             'uygulama': ('Tıbbi Görüntü İşleme → Bilgisayarlı Görü', 'Öteki dersin yöntemlerini belirli bir alana, kendi kurallarıyla uygular.')}
    cards = ''.join('<div class="ds-deck__card">%s<p style="margin-top:6px"><b>%s</b></p><p>%s</p></div>' % (rel_badge(t), ornek[t][0], ornek[t][1])
                    for t in ('alt', 'temel', 'yontem', 'uygulama'))
    S.append(slide('İlişki Türleri', 'Yapı', head('Yapı', 'Dersler Arası Dört İlişki Türü') +
                   '\n          <div class="ds-deck__grid ds-deck__grid--2 ai-cards">%s</div>' % cards))
    # olcutler
    acik = {'yaklasim': 'Problemi hangi düşünce biçimiyle ele alır: arama, istatistik, mantık, dönüşüm…',
            'girdi': 'Ders hangi tür veriyle ya da tanımla işe başlar?',
            'cikti': 'Sonunda ne üretilir: karar, model, görüntü, rapor…',
            'olcut': 'Bir çözümün iyi olduğu neye bakılarak söylenir?',
            'matematik': 'Ne kadar ve hangi matematiğe dayanır?',
            'veri': 'Ne kadar veri gerekir; veri olmadan çalışabilir mi?'}
    cards = '<div class="ds-deck__card"><strong>Temel soru</strong><p>Dersin tek cümlelik varlık nedeni.</p></div>' + ''.join(
        '<div class="ds-deck__card"><strong>%s</strong><p>%s</p></div>' % (et, acik[al]) for al, et in P.ALANLAR)
    S.append(slide('Karşılaştırma Ölçütleri', 'Yapı', head('Yapı', 'Dersleri Karşılaştırma Ölçütleri') +
                   '\n          <div class="ds-deck__grid ds-deck__grid--3 ai-cards">%s</div>' % cards))
    # etkilesimli harita
    groups = []
    for k_no, k_ad in D.KISIMLAR:
        chips = ''.join('<button type="button" class="ai-map-c" data-k="%s">%s</button>' % (d[0], kisa(d[0]))
                        for d in D.DERSLER if d[2] == k_no)
        groups.append('<div class="ai-map-g"><div class="ai-map-h">%s</div>%s</div>' % (k_ad, chips))
    S.append(slide('Etkileşimli Harita', 'Harita', head('Harita', 'Etkileşimli Harita') + '''
          <div class="ai-map">
            <div class="ai-map-l">%s</div>
            <div class="ai-map-p" id="ai-map-p"><p class="ds-deck__muted">Bir derse tıklayın: komşuları renklenir, ilişkileri burada listelenir.</p></div>
          </div>''' % ''.join(groups)))
    # kisimlar arasi baglar
    say = {}
    for a, t, b, _ in D.ILISKILER:
        key = tuple(sorted((D.KOD[a][2], D.KOD[b][2])))
        say[key] = say.get(key, 0) + 1
    enc = max(say.values())
    rom = ['I', 'II', 'III', 'IV', 'V', 'VI']
    hdr = '<tr><th></th>' + ''.join('<th>%s</th>' % rom[i] for i in range(6)) + '</tr>'
    rows = ''
    for i, (k_no, k_ad) in enumerate(D.KISIMLAR):
        rows += '<tr><th style="text-align:left">%s. %s</th>' % (rom[i], k_ad)
        for j in range(6):
            c = say.get(tuple(sorted((i + 1, j + 1))), 0)
            rows += ('<td style="background:color-mix(in srgb, var(--ds-link) %d%%, var(--ds-bg));%s">%s</td>'
                     % (round(6 + 44 * c / enc) if c else 0, 'font-weight:700' if i == j else '', c or '·'))
        rows += '</tr>'
    S.append(slide('Kısımlar Arası Bağlar', 'Harita', head('Harita', 'Kısımlar Arası Bağlar') +
                   '\n          <table class="ds-deck__table ai-tbl ai-mx" style="font-size:15px">%s%s</table>'
                   '\n          <div class="ds-deck__callout">Hücredeki sayı, iki kısım arasındaki ilişki sayısıdır; köşegen kısmın kendi içindeki bağlarını gösterir. '
                   'Çekirdek ve matematik temeli bütün kısımlara bağlanır; sistem dersleri ise çoğunlukla çekirdeğe dayanır.</div>' % (hdr, rows)))
    # en cok bagli dersler
    derece = sorted(D.DERSLER, key=lambda d: -len(D.komsular(d[0])))[:8]
    rows = ''.join('<tr><td style="white-space:nowrap">%s</td><td class="num">%d</td><td>%s</td></tr>' % (
        link(d[0], kisa(d[0])), len(D.komsular(d[0])),
        ', '.join(kisa(k) for k, _, _ in D.komsular(d[0])[:4]) + (' …' if len(D.komsular(d[0])) > 4 else ''))
        for d in derece)
    S.append(slide('Kavşak Dersler', 'Harita', head('Harita', 'Kavşak Dersler: En Çok Bağı Olanlar') +
                   '\n          <table class="ds-deck__table ai-tbl"><tr><th>Ders</th><th class="num">Bağ</th><th>Bazı komşuları</th></tr>%s</table>'
                   '\n          <div class="ds-deck__callout">Makine öğrenmesi ile matematik temeli (doğrusal cebir, olasılık, optimizasyon) haritanın kavşaklarıdır: başka derslerin çoğu bunlardan birine dayanır.</div>' % rows))
    S.append(slide('Nasıl Okunmalı?', 'Kullanım', head('Kullanım', 'Rehber Nasıl Okunmalı?') + '''
          <div class="ds-deck__grid ds-deck__grid--2 ai-cards">
            <div class="ds-deck__card"><strong>Baştan sona</strong><p>Çekirdek dersler (Bölüm 2–5) bütün haritanın ortak dilidir; önce onları okuyun.</p></div>
            <div class="ds-deck__card"><strong>İlgi alanından</strong><p>Görüntü, dil, veri ya da robotik: ilginizi çeken kısımdan başlayıp ön koşul tablolarını geriye doğru izleyin.</p></div>
            <div class="ds-deck__card"><strong>Karşılaştırarak</strong><p>Karıştırdığınız iki dersin "Ayrıştığı Noktalar" slaytlarını yan yana açın.</p></div>
            <div class="ds-deck__card"><strong>Seçmeli ders seçerken</strong><p>Son bölümdeki yol haritaları, birlikte alındığında anlamlı olan ders gruplarını önerir.</p></div>
          </div>'''))
    S.append(slide('Son', '', '          <h1>Son</h1>\n          <div class="ds-deck__subtitle">Bölüm 1: Alanın Haritası</div>\n'
                   '          <small>Sonraki bölüm: <a href="%s">Bölüm 2: Yapay Zekâ</a></small>' % D.dosya('YZ'), ' ds-deck__slide--title'))
    data = [[d[0], kisa(d[0]), D.dosya(d[0])] for d in D.DERSLER]
    rels = [[a, t, b, konu] for a, t, b, konu in D.ILISKILER]
    css = '''  .ds-deck .ai-map { display: grid; grid-template-columns: minmax(0, 1.9fr) minmax(0, 1fr); gap: 12px; }
  .ds-deck .ai-map-g { margin-bottom: 4px; }
  .ds-deck .ai-map-h { font-size: 10.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--ds-muted); margin-bottom: 2px; }
  .ds-deck .ai-map-c { margin: 0 3px 3px 0; padding: 0 6px; line-height: 1.5; border: 1.5px solid var(--ds-border); border-radius: 999px; background: var(--ds-bg); color: var(--ds-text); font: inherit; font-size: 12px; cursor: pointer; }
  .ds-deck .ai-map-c.is-sel { border-color: var(--ds-accent); background: color-mix(in srgb, var(--ds-accent) 18%, var(--ds-bg)); font-weight: 700; }
  .ds-deck .ai-map-c.is-alt { border-color: var(--ds-accent); }
  .ds-deck .ai-map-c.is-temel { border-color: var(--ds-link); background: color-mix(in srgb, var(--ds-link) 14%, var(--ds-bg)); }
  .ds-deck .ai-map-c.is-yontem { border-color: var(--ds-good); background: color-mix(in srgb, var(--ds-good) 14%, var(--ds-bg)); }
  .ds-deck .ai-map-c.is-uygulama { border-color: #c77d12; background: color-mix(in srgb, #c77d12 14%, var(--ds-bg)); }
  .ds-deck .ai-map-p { padding: 10px 12px; border: 1.5px solid var(--ds-border); border-radius: 12px; background: var(--ds-bg); font-size: 13.5px; line-height: 1.35; max-height: 430px; overflow: auto; }
  .ds-deck .ai-map-p h3 { font-size: 16px; margin: 0 0 6px; }
  .ds-deck .ai-map-p ul { padding-left: 16px; }
  .ds-deck .ai-map-p li { margin: 3px 0; }'''
    script = '''
(function () {
  var D = %s;
  var R = %s;
  var RENK = %s;
  var AD = {};
  D.forEach(function (d) { AD[d[0]] = d; });
  var panel = document.getElementById("ai-map-p");
  var btns = document.querySelectorAll(".ai-map-c");
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\\"": "&quot;" }[c]; }); }
  function sec(k) {
    var kom = {};
    var li = [];
    R.forEach(function (r) {
      if (r[0] === k) { kom[r[2]] = r[1]; li.push([r[2], r[1], r[3], 1]); }
      else if (r[2] === k) { kom[r[0]] = r[1]; li.push([r[0], r[1], r[3], 0]); }
    });
    btns.forEach(function (b) {
      b.className = "ai-map-c" + (b.dataset.k === k ? " is-sel" : kom[b.dataset.k] ? " is-" + kom[b.dataset.k] : "");
    });
    var h = "<h3><a href=\\"" + AD[k][2] + "\\">" + esc(AD[k][1]) + "</a></h3><ul>";
    li.forEach(function (x) {
      h += "<li><b style=\\"color:" + RENK[x[1]] + "\\">" + esc(x[3] ? RENK.ad[x[1]][0] : RENK.ad[x[1]][1]) + "</b> " +
        "<a href=\\"" + AD[x[0]][2] + "\\">" + esc(AD[x[0]][1]) + "</a>: " + esc(x[2]) + "</li>";
    });
    panel.innerHTML = h + "</ul>";
  }
  btns.forEach(function (b) { b.addEventListener("click", function () { sec(b.dataset.k); }); });
})();
''' % (json.dumps(data, ensure_ascii=False), json.dumps(rels, ensure_ascii=False),
       json.dumps(dict(TUR_RENK, ad={'alt': ['üst alanı', 'alt alanı'], 'temel': ['temel aldığı', 'onu temel alan'],
                                     'yontem': ['yöntem ortağı', 'yöntem ortağı'], 'uygulama': ['uyguladığı', 'onu uygulayan']}),
                  ensure_ascii=False))
    excerpt = ('%s dersi Bölüm 1: yapay zekâ ve veriyle ilgili %d dersin haritası; YZ, makine öğrenmesi, sinir ağları ve derin öğrenme '
               'ilişkisi, altı kısım, dersler arası ilişki türleri, karşılaştırma ölçütleri ve etkileşimli ders haritası.' % (DERS_ADI, len(D.DERSLER)))
    return page(no, D.ACILIS[1], excerpt, S, extra_css=css, script=script)


# ---------------------------------------------------------------- kapanis sunumu

YOLLAR = [
    ('Görü yolu', 'Görüntüden anlam çıkaran sistemler', ['DC', 'SSI', 'GI', 'BG', 'DO', 'TGI']),
    ('Dil yolu', 'Metin ve konuşmayla çalışan sistemler', ['OI', 'MO', 'NLP', 'DO', 'UM', 'BE']),
    ('Veri yolu', 'Veriden karar ve öngörü çıkarmak', ['OI', 'VB', 'VM', 'BV', 'ZS', 'SAA']),
    ('Robotik yolu', 'Fiziksel dünyada algılayıp hareket etmek', ['DC', 'OPT', 'ROB', 'PO', 'CES', 'GYZ']),
    ('Kuram yolu', 'Araştırmaya hazırlanmak', ['DC', 'OI', 'OPT', 'BK', 'OGM', 'MO']),
    ('Üretim yolu', 'Modeli gerçek bir ürüne dönüştürmek', ['MO', 'DO', 'GPU', 'MLOPS', 'GYZ', 'SGY']),
]

ILGI = [
    ('Görüntü ve video', ['GI', 'BG', 'TGI', 'UA', 'BGR', 'BIO', 'SSI', 'DO']),
    ('Dil ve konuşma', ['NLP', 'KSI', 'UM', 'BE', 'OGM', 'DO']),
    ('Veri ve iş dünyası', ['VB', 'VM', 'BV', 'ZS', 'BE', 'SAA', 'OI']),
    ('Robotlar ve fiziksel dünya', ['ROB', 'PO', 'CES', 'GYZ', 'BM', 'BG', 'SSI']),
    ('Matematik ve kuram', ['DC', 'OI', 'OPT', 'BK', 'OGM', 'EMO']),
    ('Sistemler ve donanım', ['GPU', 'MLOPS', 'GYZ', 'BV', 'SGY']),
    ('Güven, toplum ve sağlık', ['AYE', 'SGY', 'TGI', 'BIN', 'BIO']),
    ('Oyunlar ve karar verme', ['YZ', 'PO', 'CES', 'EMO', 'US', 'OPT']),
]

SENARYO = [
    ('Bir hastanenin MR görüntülerinde tümörün sınırlarını otomatik çizmek.', ['TGI', 'BG', 'GI'],
     'Bölütleme görüntü işleme ve görüden gelir; klinik veri, etiket azlığı ve sorumluluk bunu tıbbi görüntü işleme yapar.'),
    ('Bir e-ticaret sitesinde "bunu alanlar şunları da aldı" listesini kurmak.', ['BE', 'VM'],
     'Birliktelik kuralları veri madenciliğinden, kullanıcıya sıralı liste sunmak öneri sistemlerinden gelir.'),
    ('Bir fırının sıcaklığını "biraz sıcak", "çok sıcak" gibi kurallarla denetlemek.', ['BM'],
     'Keskin sınırı olmayan dilsel kurallar ve denetim, bulanık mantığın klasik uygulamasıdır.'),
    ('Bir insansız hava aracının rüzgârda dengede kalmayı deneyerek öğrenmesi.', ['PO', 'ROB'],
     'Etiket yok, yalnız ödül var: pekiştirmeli öğrenme. Fiziksel gövde ve algılayıcılar robotiğin konusu.'),
    ('Yüz bin algılayıcının saniyelik verisini saklayıp sorgulamak.', ['BV', 'ZS'],
     'Tek makineye sığmayan ve akan veri büyük veri sistemlerinin, zamana bağlı çözümlemesi zaman serisinin işidir.'),
    ('Okul servisleri için toplam yolu en kısa rota planını bulmak.', ['EMO', 'OPT', 'YZ'],
     'Kombinatoryal bir optimizasyon problemi: kesin yöntemler optimizasyondan, büyük örneklerde iyi çözüm metasezgisellerden gelir.'),
    ('Bir kredi modelinin bazı başvuru gruplarına haksızlık edip etmediğini denetlemek.', ['AYE', 'VB'],
     'Adalet ölçütleri, açıklama ve hesap verebilirlik açıklanabilir YZ ve etiğin konusudur.'),
    ('Telefonda internete bağlanmadan çalışan sesli komut tanıma.', ['GYZ', 'KSI'],
     'Konuşma tanıma modeli konuşma ve ses işlemeden gelir; cihaza sığdırmak gömülü YZ\'nin işidir.'),
    ('Bir hastalıkla ilgili genleri binlerce örneğin ifade verisinden bulmak.', ['BIN', 'OI'],
     'Biyolojik veri ve yorum biyoenformatik, çok sayıda testte anlamlılık istatistik bilgisi ister.'),
    ('Bir bankanın ağ trafiğinde olağandışı bağlantıları yakalamak.', ['SGY', 'VM'],
     'Aykırı değer bulma veri madenciliğinden gelir; saldırganın uyum sağlaması bunu siber güvenlik problemi yapar.'),
]

CIFTLER = [('GI', 'BG'), ('YZ', 'MO'), ('MO', 'VM'), ('VB', 'VM'), ('YSA', 'DO'), ('OT', 'MO'), ('NLP', 'KSI'),
           ('UM', 'DO'), ('BGR', 'BG'), ('MO', 'OI'), ('BE', 'VM'), ('US', 'BM'), ('EMO', 'OPT'), ('MLOPS', 'BV')]


def cift_cumlesi(a, b, icerik):
    for x, y in ((a, b), (b, a)):
        C = icerik.get(x)
        if C:
            for k, cumle in C['ayrisma']:
                if k == y:
                    return cumle
    return None


def kapanis(icerik):
    no = D.KAPANIS[0]
    S = []
    rom = ['I', 'II', 'III', 'IV', 'V', 'VI']
    S.append(slide('Bölüm %d: %s' % (no, D.KAPANIS[1]), '',
                   '          <h1>Karşılaştırma ve<br>Yol Haritaları</h1>\n          <div class="ds-deck__subtitle">%s</div>\n'
                   '          <div class="ds-deck__agenda" aria-label="Sunum içeriği"><span>Büyük tablo</span><span>Sık karıştırılan çiftler</span>'
                   '<span>Hangi ders?</span><span>İlgi alanından derse</span><span>Yol haritaları</span></div>\n'
                   '          <small>Sercan KÜLCÜ · Giresun Üniversitesi · Bilgisayar Mühendisliği</small>' % DERS_ADI, ' ds-deck__slide--title'))
    # buyuk tablo, kisim kisim
    for k_no, k_ad in D.KISIMLAR:
        ds = [d for d in D.DERSLER if d[2] == k_no]
        hdr = '<tr><th>Ders</th>' + ''.join('<th>%s</th>' % et for al, et in P.ALANLAR[:4]) + '</tr>'
        rows = ''.join('<tr><th style="white-space:nowrap">%s</th>%s</tr>' % (
            link(d[0], kisa(d[0])), ''.join('<td>%s</td>' % P.PROFIL[d[0]][1][al] for al, _ in P.ALANLAR[:4])) for d in ds)
        t = 'Büyük Tablo: %s. %s' % (rom[k_no - 1], k_ad)
        fs = 13 if len(ds) <= 7 else 12
        S.append(slide(t, 'Büyük tablo', head('Büyük tablo', t) +
                       '\n          <table class="ds-deck__table ai-tbl" style="font-size:%dpx">%s%s</table>' % (fs, hdr, rows)))
    hepsi = list(D.DERSLER)
    for i in range(0, len(hepsi), 13):
        parca = hepsi[i:i + 13]
        t = 'Matematik ve Veri İhtiyacı (%d/3)' % (i // 13 + 1)
        rows = ''.join('<tr><th style="white-space:nowrap">%s</th><td>%s</td><td>%s</td></tr>' % (
            link(d[0], kisa(d[0])), P.PROFIL[d[0]][1]['matematik'], P.PROFIL[d[0]][1]['veri']) for d in parca)
        S.append(slide(t, 'Büyük tablo', head('Büyük tablo', t) +
                       '\n          <table class="ds-deck__table ai-tbl" style="font-size:13px"><tr><th>Ders</th><th>Matematik yükü</th><th>Veri ihtiyacı</th></tr>%s</table>' % rows))
    # sik karistirilan ciftler
    satir = []
    for a, b in CIFTLER:
        c = cift_cumlesi(a, b, icerik)
        if c:
            satir.append('<tr><td style="white-space:nowrap">%s ↔ %s</td><td>%s</td></tr>' % (link(a, kisa(a)), link(b, kisa(b)), c))
    for i in range(0, len(satir), 7):
        t = 'Sık Karıştırılan Çiftler' + (' (%d/%d)' % (i // 7 + 1, (len(satir) + 6) // 7) if len(satir) > 7 else '')
        S.append(slide(t, 'Çiftler', head('Çiftler', t) +
                       '\n          <table class="ds-deck__table ai-tbl" style="font-size:13.5px"><tr><th>Çift</th><th>Fark</th></tr>%s</table>' % ''.join(satir[i:i + 7])))
    # hangi ders?
    for i in range(0, len(SENARYO), 5):
        t = 'Hangi Ders? (%d/%d)' % (i // 5 + 1, (len(SENARYO) + 4) // 5)
        items = ''.join('<li><b>%s</b><details class="ai-ans"><summary>Cevap</summary>%s. %s</details></li>' % (
            s, ', '.join(link(k, kisa(k)) for k in ks), neden) for s, ks, neden in SENARYO[i:i + 5])
        S.append(slide(t, 'Hangi ders?', head('Hangi ders?', t) +
                       '\n          <p class="ds-deck__small ds-deck__muted">Her problem için hangi dersin işi olduğunu düşünün, sonra cevabı açın.</p>'
                       '\n          <ol class="ai-sen">%s</ol>' % items))
    # ilgi alanindan derse
    btns = ''.join('<button type="button" class="ai-ilgi-b" data-i="%d">%s</button>' % (i, a) for i, (a, _) in enumerate(ILGI))
    S.append(slide('İlgi Alanından Derse', 'Seçim', head('Seçim', 'İlgi Alanından Derse') + '''
          <p class="ds-deck__small ds-deck__muted">Bir ya da birkaç ilgi alanı seçin; o alanlara en çok hizmet eden dersler, kaç alana dokunduklarına göre sıralanır.</p>
          <div class="ai-ilgi">%s</div>
          <div class="ai-ilgi-s" id="ai-ilgi-s"></div>''' % btns))
    # yol haritalari
    for i in range(0, len(YOLLAR), 3):
        rows = ''
        for ad_, acik, ks in YOLLAR[i:i + 3]:
            rows += ('<div class="ai-yol"><div class="ai-yol-h"><b>%s</b> <span>%s</span></div><div class="ai-yol-c">%s</div></div>'
                     % (ad_, acik, '<span class="ai-ok">→</span>'.join('<a href="%s">%s</a>' % (D.dosya(k), kisa(k)) for k in ks)))
        t = 'Yol Haritaları (%d/%d)' % (i // 3 + 1, (len(YOLLAR) + 2) // 3)
        S.append(slide(t, 'Seçim', head('Seçim', t) + '\n          ' + rows +
                       '\n          <p class="ds-deck__small ds-deck__muted" style="margin-top:10px">Her yol ön koşuldan uzmanlığa doğru sıralanmıştır; yollar kesişir, birden çoğunu izlemek olağandır.</p>'))
    S.append(slide('Son Söz', 'Seçim', head('Seçim', 'Son Söz') + '''
          <div class="ds-deck__grid ds-deck__grid--2 ai-cards">
            <div class="ds-deck__card"><strong>Ortak dil</strong><p>Doğrusal cebir, olasılık ve optimizasyon hemen her dersin ortak dilidir; bunlar sağlamsa geçişler kolaydır.</p></div>
            <div class="ds-deck__card"><strong>Kavşak ders</strong><p>Makine öğrenmesi haritanın merkezidir: dallar ona dayanır, uygulamalar onu kullanır.</p></div>
            <div class="ds-deck__card"><strong>Ayrım soruda</strong><p>İki ders aynı algoritmayı kullanabilir; onları ayıran, sordukları soru ve başarıyı nasıl ölçtükleridir.</p></div>
            <div class="ds-deck__card"><strong>Alan değişir</strong><p>Bugün ayrı dersler yarın birleşebilir; haritayı ezberlemek yerine ilişki türlerini anlamak kalıcıdır.</p></div>
          </div>'''))
    S.append(slide('Son', '', '          <h1>Son</h1>\n          <div class="ds-deck__subtitle">Bölüm %d: %s</div>\n'
                   '          <small><a href="%s">← Önceki bölüm</a> · <a href="Bolum_01_Alanin_Haritasi.html">Alanın haritası</a></small>'
                   % (no, D.KAPANIS[1], D.dosya(D.DERSLER[-1][0])), ' ds-deck__slide--title'))
    css = '''  .ds-deck .ai-sen { font-size: 15.5px; }
  .ds-deck .ai-sen li { margin: 4px 0 6px; }
  .ds-deck .ai-ans { margin-top: 2px; font-size: 14px; color: var(--ds-text); }
  .ds-deck .ai-ans summary { cursor: pointer; color: var(--ds-link); font-weight: 700; font-size: 13px; }
  .ds-deck .ai-ilgi { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
  .ds-deck .ai-ilgi-b { padding: 4px 12px; border: 1.5px solid var(--ds-border); border-radius: 999px; background: var(--ds-bg); color: var(--ds-text); font: inherit; font-size: 14px; cursor: pointer; }
  .ds-deck .ai-ilgi-b.is-on { border-color: var(--ds-accent); background: color-mix(in srgb, var(--ds-accent) 16%, var(--ds-bg)); font-weight: 700; }
  .ds-deck .ai-ilgi-s { display: flex; flex-wrap: wrap; gap: 6px; }
  .ds-deck .ai-ilgi-s a { padding: 3px 10px; border: 1.5px solid var(--ds-border); border-radius: 999px; background: var(--ds-bg); font-size: 14px; }
  .ds-deck .ai-ilgi-s a b { margin-left: 5px; color: var(--ds-accent); }
  .ds-deck .ai-yol { padding: 10px 0 12px; border-bottom: 1px solid var(--ds-border); }
  .ds-deck .ai-yol-h { margin-bottom: 8px; }
  .ds-deck .ai-yol-h b { font-size: 17px; color: var(--ds-accent); }
  .ds-deck .ai-yol-h span { font-size: 14.5px; color: var(--ds-muted); }
  .ds-deck .ai-yol-c { font-size: 15px; line-height: 2.1; }
  .ds-deck .ai-yol-c a { padding: 2px 8px; border: 1.5px solid var(--ds-border); border-radius: 999px; background: var(--ds-bg); white-space: nowrap; display: inline-block; line-height: 1.5; }
  .ds-deck .ai-ok { margin: 0 4px; color: var(--ds-link); font-weight: 800; }'''
    data = {d[0]: [kisa(d[0]), D.dosya(d[0])] for d in D.DERSLER}
    script = '''
(function () {
  var D = %s;
  var I = %s;
  var sec = {};
  var out = document.getElementById("ai-ilgi-s");
  var btns = document.querySelectorAll(".ai-ilgi-b");
  function ciz() {
    var say = {};
    Object.keys(sec).forEach(function (i) { if (sec[i]) { I[i].forEach(function (k) { say[k] = (say[k] || 0) + 1; }); } });
    var ks = Object.keys(say).sort(function (a, b) { return say[b] - say[a]; });
    out.innerHTML = ks.length ? ks.map(function (k) {
      return "<a href=\\"" + D[k][1] + "\\">" + D[k][0] + (say[k] > 1 ? "<b>×" + say[k] + "</b>" : "") + "</a>";
    }).join("") : "<span class=\\"ds-deck__muted\\">Henüz seçim yok.</span>";
  }
  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      var i = b.dataset.i; sec[i] = !sec[i]; b.classList.toggle("is-on", sec[i]); ciz();
    });
  });
  ciz();
})();
''' % (json.dumps(data, ensure_ascii=False), json.dumps([ks for _, ks in ILGI], ensure_ascii=False))
    excerpt = ('%s dersi Bölüm %d: %d dersin yaklaşım, girdi, çıktı, başarı ölçütü, matematik ve veri ihtiyacına göre karşılaştırması, '
               'sık karıştırılan ders çiftleri, hangi ders soruları, ilgi alanına göre ders seçimi ve yol haritaları.' % (DERS_ADI, no, len(D.DERSLER)))
    return page(no, D.KAPANIS[1], excerpt, S, extra_css=css, script=script)


# ---------------------------------------------------------------- ders sayfasi

def ders_sayfasi(icerik):
    rom = ['I', 'II', 'III', 'IV', 'V', 'VI']
    L = ['---', 'title: "Guide to AI and Data Courses"', 'collection: teaching', 'type: "Undergraduate"',
         'permalink: %s' % DERS_URL, 'venue: "Giresun University, Computer Engineering"', 'date: 2023-09-01',
         'location: "Giresun, Turkey"', 'course_language: tr', '---', '',
         ('![ai and data courses](/images/teaching/teaching-ai-courses.webp){: .align-left width="200" style="float: left; margin-right: 10px;"} \n'
          if os.path.exists(os.path.join(REPO, 'images', 'teaching', 'teaching-ai-courses.webp')) else '') +
         'This course is a map of the courses around artificial intelligence and data. Each of its %d presentations introduces one course: '
         'the question it asks, its core concepts, a typical workflow, its prerequisites, the courses it overlaps with and the points where it '
         'differs from its nearest neighbours, its applications and tools. '
         'There are no lecture notes, code examples or textbook: the aim is to help students see the field as a whole before choosing their electives.'
         % len(D.DERSLER), '', '---', '',
         '## Ders Haritası', '',
         '### Bölüm 1: Alanın Haritası', '',
         'Bu bölümde rehberin amacı, yapay zekâ, makine öğrenmesi, yapay sinir ağları ve derin öğrenmenin iç içe ilişkisi, dersleri bölen altı kısım, '
         'dersler arasındaki dört ilişki türü (alt alan, temel alma, yöntem paylaşma, uygulama) ve karşılaştırma ölçütleri tanıtılır. '
         'Etkileşimli haritada bir derse tıklanınca komşuları ve ilişkileri görünür.', '',
         '- [🖼️Sunum-Alanın Haritası (HTML)](/files/ai_courses/slides/%s)' % 'Bolum_01_Alanin_Haritasi.html', '', '---', '']
    for k_no, k_ad in D.KISIMLAR:
        L += ['## Kısım %s: %s' % (rom[k_no - 1], k_ad), '']
        for d in [x for x in D.DERSLER if x[2] == k_no]:
            C = icerik.get(d[0])
            L += ['### Bölüm %d: %s' % (d[1], d[3]), '',
                  '*%s* %s' % (d[5], re.sub(r'<[^>]+>', '', C['tanim']) if C else ''), '',
                  '- [🖼️Sunum-%s (HTML)](/files/ai_courses/slides/%s)' % (d[3], D.dosya(d[0])), '']
        L += ['---', '']
    L += ['## Kapanış', '', '### Bölüm %d: %s' % (D.KAPANIS[0], D.KAPANIS[1]), '',
          'Bütün dersler yaklaşım, girdi, çıktı, başarı ölçütü, matematik yükü ve veri ihtiyacına göre tek bir tabloda karşılaştırılır. '
          'Sık karıştırılan ders çiftlerinin farkları, gerçek problemlerin hangi derse düştüğünü soran örnekler, ilgi alanına göre ders öneren '
          'etkileşimli bir süzgeç ve birlikte alındığında anlamlı olan ders yolları verilir.', '',
          '- [🖼️Sunum-%s (HTML)](/files/ai_courses/slides/Bolum_%02d_%s.html)' % (D.KAPANIS[1], D.KAPANIS[0], D.KAPANIS[2]), '']
    s = '\n'.join(L)
    assert '{{' not in s and '{%' not in s
    p = os.path.join(REPO, '_teaching', 'ai-courses.md')
    open(p, 'w', encoding='utf-8', newline='\n').write(s)
    return p


def iliskileri_denetle():
    gorulen = {}
    for a, t, b, _ in D.ILISKILER:
        if a not in D.KOD or b not in D.KOD or t not in D.TURLER:
            raise SystemExit('ILISKILER: bilinmeyen kod ya da tur: %s %s %s' % (a, t, b))
        cift = frozenset((a, b))
        if cift in gorulen:
            raise SystemExit('ILISKILER: %s ile %s arasinda iki iliski var' % (a, b))
        gorulen[cift] = t
    for kod in D.KOD:
        if kod not in P.PROFIL:
            raise SystemExit('profiller.py: %s icin profil yok' % kod)


def main():
    iliskileri_denetle()
    os.makedirs(OUT, exist_ok=True)
    istek = sys.argv[1:]
    yazilan = []
    if not istek or 'ACILIS' in istek:
        yazilan.append(acilis())
    icerik = {}
    for d in D.DERSLER:
        C = icerik_yukle(d[0])
        if C is None:
            continue
        icerik[d[0]] = C
        if istek and d[0] not in istek:
            continue
        yazilan.append(ders_sunumu(d[0], C))
    if not istek or 'KAPANIS' in istek:
        yazilan.append(kapanis(icerik))
    if not istek or 'SAYFA' in istek:
        yazilan.append(ders_sayfasi(icerik))
    for f in yazilan:
        print(f)


if __name__ == '__main__':
    main()
