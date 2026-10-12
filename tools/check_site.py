# -*- coding: utf-8 -*-
"""Gondermeden once ders sayfalarini denetler (files/<ders>/...).

    python tools/check_site.py                       # tum dersler, yalnizca hizli (dosya) denetimleri
    python tools/check_site.py algorithms computer   # yalnizca verilen dersler
    python tools/check_site.py agt --browser         # + tarayicida tasma, konsol hatasi, kirik baglanti

Dosya denetimleri (saniyeler surer):
  liquid   Jekyll on bilgili her sayfayi Liquid ile isler: metinde "{{" ya da "{%" (or. Java
           `int[][] a = {{1, 2}}`) tum Pages derlemesini durdurur. Ilk parantezi &#123; yazin.
  denge    <section>, <details>, <svg>, <pre> acilis/kapanis sayilari
  coktan   her dsq-mc'de tam bir data-ok; dogru sik en uzun ve belirgin (>= 1,25x) uzun mu
  svg-id   ayni <marker>/gradyan id'si birden cok SVG'de (gizli adimdaki tanim cizilmez, ok
           uclari kaybolur) ya da baska SVG'deki tanima url(#...) ile basvuru
  guard    ds-guard blogu eksik sayfa
  yonerge  "Once kendiniz ..." gibi istenmeyen yonerge cumleleri

Tarayici denetimleri (--browser; Chrome/Edge + playwright, ag gerekir):
  tasma    her sunum/calisma sayfasinin her slayti, tum adimlar ve cevaplar acikken: alt cubuga
           tasan, yatay tasan ya da yatay kirpilan <pre>; otomatik sigdirma %90'in altina inen slayt
  sayfa    konsol hatasi, yuklenemeyen dosya, kirik ic baglanti (tum HTML sayfalari)
Sayfalar make_slide_pdf.py ile ayni sekilde, canli site duzeninin icinde acilir.

Hata varsa cikis kodu 1'dir. Uyarilar (sik dengesi, %90'a yakin kucultme) cikis kodunu degistirmez.
"""
import argparse, html, os, re, sys, urllib.parse
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
FILES = os.path.join(REPO, 'files')
DEF_TAGS = r'(?:marker|linearGradient|radialGradient|pattern|clipPath|filter|mask|symbol)'

errors, warnings = [], []


def err(where, msg):
    errors.append('%s: %s' % (where, msg))


def warn(where, msg):
    warnings.append('%s: %s' % (where, msg))


def courses_with_slides():
    return sorted(d for d in os.listdir(FILES) if os.path.isdir(os.path.join(FILES, d, 'slides')))


def html_files(course):
    base = os.path.join(FILES, course)
    for dirpath, _, names in os.walk(base):
        for n in sorted(names):
            if n.endswith('.html'):
                yield os.path.join(dirpath, n)


def text_of(s):
    return html.unescape(re.sub(r'<[^>]+>', '', s)).strip()


def check_file(path):
    rel = os.path.relpath(path, REPO).replace('\\', '/')
    s = open(path, encoding='utf-8').read()
    has_fm = s.startswith('---')
    body = s.split('\n---', 2)[-1] if has_fm else s

    # liquid
    if has_fm:
        for m in re.finditer(r'\{\{|\{%', body):
            line = s[:s.index(body) + m.start()].count('\n') + 1
            err(rel, 'satir %d: Liquid "%s" (ilk parantezi &#123; yazin)' % (line, m.group(0)))

    # guard
    if has_fm and 'ds-guard:begin' not in s:
        err(rel, 'ds-guard blogu yok')

    # denge
    for a, b in (('<section', '</section>'), ('<details', '</details>'), ('<svg', '</svg>'), ('<pre', '</pre>')):
        if s.count(a) != s.count(b):
            err(rel, '%s %d / %s %d' % (a, s.count(a), b, s.count(b)))

    # yonerge
    for phrase in ('Önce kendiniz',):
        if phrase in s:
            err(rel, '"%s" yonergesi' % phrase)

    # svg-id
    ids = Counter(re.findall(r'<%s\b[^>]*\bid="([^"]+)"' % DEF_TAGS, s))
    for k, v in ids.items():
        if v > 1 and ('url(#%s)' % k) in s:
            err(rel, 'svg tanim id "%s" %d kez tanimli' % (k, v))
    for sv in re.finditer(r'<svg\b.*?</svg>', s, re.S):
        for ref in set(re.findall(r'url\(#([^)]+)\)', sv.group(0))):
            if 'id="%s"' % ref not in sv.group(0) and ref in ids:
                err(rel, 'url(#%s) baska bir SVG\'deki tanima basvuruyor' % ref)

    # coktan
    stats = []
    for m in re.finditer(r'<section class="ds-deck__slide"[^>]*?data-title="([^"]*)"(.*?)</section>', s, re.S):
        for box in re.findall(r'<div class="dsq-mc[^"]*">(.*?)<p class="dsq-why', m.group(2), re.S) or \
                ([m.group(2)] if 'dsq-mc' in m.group(2) else []):
            opts = re.findall(r'<button[^>]*class="dsq-opt"([^>]*)>(.*?)</button>', box, re.S)
            if not opts:
                continue
            ok = [i for i, (attr, _) in enumerate(opts) if 'data-ok' in attr]
            if len(ok) != 1:
                err(rel, '%s: %d data-ok' % (html.unescape(m.group(1)), len(ok)))
                continue
            lens = [len(re.sub(r'^[A-D]\)\s*', '', text_of(t))) for _, t in opts]
            k = ok[0]
            other = max(l for i, l in enumerate(lens) if i != k)
            longest = lens[k] > other
            stats.append(longest)
            if longest and lens[k] >= 1.25 * other and lens[k] > 15:
                warn(rel, '%s: dogru sik belirgin uzun (%d / %d karakter)' % (html.unescape(m.group(1)), lens[k], other))
    # 4 sikta beklenen ~%25; kucuk orneklemde dogal sapmayi uyarmamak icin esik %40
    if len(stats) >= 10 and sum(stats) / len(stats) > 0.40:
        warn(rel, 'dogru sik en uzun olan coktan secmeli orani %%%d (%d/%d)' % (100 * sum(stats) / len(stats), sum(stats), len(stats)))


# ---------- tarayici ----------
MEASURE_JS = r"""async () => {
  await document.fonts.ready; await new Promise(r => setTimeout(r, 150));
  const jump = document.getElementById('ds-deck-jump'); if (!jump) return []; const res = [];
  for (let i = 0; i < jump.options.length; i++) {
    jump.value = i; jump.dispatchEvent(new Event('change'));
    const s = document.querySelector('.ds-deck__slide.is-active');
    const z = parseFloat(s.firstElementChild && s.firstElementChild.style.zoom || '1');
    const closed = [...s.querySelectorAll('details:not([open])')]; closed.forEach(d => d.open = true);
    let over = 0, hx = 0, pre = 0;
    const chk = () => { over = Math.max(over, s.scrollHeight - s.clientHeight); hx = Math.max(hx, s.scrollWidth - s.clientWidth);
      s.querySelectorAll('pre').forEach(p => { const o = getComputedStyle(p).overflowX;
        if (o !== 'auto' && o !== 'scroll') pre = Math.max(pre, p.scrollWidth - p.clientWidth); }); };
    chk();
    for (const nav of s.querySelectorAll('.ds-deck__stepnav')) {
      const nx = nav.querySelector('[data-step="1"]'); let g = 0;
      while (!nx.disabled && g++ < 200) { nx.click(); chk(); }
    }
    closed.forEach(d => d.open = false);
    res.push({ i: i + 1, t: s.dataset.title || '', z, over, hx, pre });
  }
  return res; }"""

NOISE = ('ervice', 'google', 'bad HTTP response code (404) was received when fetching the script')


def browser_checks(courses):
    import make_slide_pdf as m
    from playwright.sync_api import sync_playwright
    pages = []
    for c in courses:
        for p in html_files(c):
            pages.append(os.path.relpath(p, FILES).replace('\\', '/'))
    with sync_playwright() as pw:
        b = m.launch(pw)
        ctx = b.new_context(viewport={'width': 1280, 'height': 900})
        m.serve(ctx, FILES, m.fetch_shell())
        ctx.add_init_script("document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');"
                            "s.textContent='*,*::before,*::after{animation:none!important;transition:none!important}';"
                            "document.head.appendChild(s)})")
        for rel in pages:
            where = 'files/' + rel
            pg = ctx.new_page(); probs = []
            pg.on('pageerror', lambda e: probs.append('JS hatasi: ' + str(e)[:160]))
            pg.on('console', lambda c: probs.append('konsol: ' + c.text[:160])
                  if c.type == 'error' and not any(n in c.text for n in NOISE) else None)
            pg.on('requestfailed', lambda q: probs.append('yuklenemedi: ' + q.url[:140])
                  if not any(n in q.url for n in NOISE) else None)
            pg.on('response', lambda q: probs.append('%d: %s' % (q.status, q.url[:140]))
                  if q.status >= 400 and not any(n in q.url for n in NOISE) else None)
            for attempt in range(3):
                try:
                    pg.goto(m.BASE + '/' + rel, wait_until='networkidle'); break
                except Exception as e:
                    if attempt == 2:
                        err(where, 'acilamadi: ' + str(e).splitlines()[0][:120])
            pg.wait_for_timeout(300)
            for p in probs:
                err(where, p)
            if pg.evaluate("getComputedStyle(document.documentElement).visibility === 'hidden'"):
                err(where, 'ds-guard sayfayi gizledi')
            for h in pg.evaluate("[...document.querySelectorAll('section.page__content a[href]')].map(a => a.getAttribute('href'))"):
                if h.startswith(('http://', 'https://', '#', 'mailto:', 'javascript:')):
                    continue
                path = urllib.parse.unquote(urllib.parse.urlsplit(h).path)
                if not path:
                    continue
                target = (os.path.join(REPO, path.lstrip('/')) if path.startswith('/')
                          else os.path.normpath(os.path.join(os.path.dirname(os.path.join(FILES, rel)), path)))
                if not os.path.exists(target) and not os.path.exists(target + '.md'):
                    err(where, 'kirik baglanti: ' + h)
            if pg.evaluate("!!document.getElementById('ds-deck-next')"):
                res = pg.evaluate(MEASURE_JS)
                for x in res:
                    name = '#%d %s' % (x['i'], x['t'])
                    if x['over'] > 1 or x['hx'] > 1 or x['pre'] > 1:
                        err(where, '%s: tasma (dikey %d, yatay %d, pre %d px)' % (name, x['over'], x['hx'], x['pre']))
                    elif x['z'] < 0.9:
                        warn(where, '%s: %%%d boyuta kucultuluyor' % (name, round(100 * x['z'])))
                print('  %-70s %3d slayt' % (rel, len(res)))
            pg.close()
        b.close()


def main():
    ap = argparse.ArgumentParser(description='Ders sayfalarini gondermeden once denetler.')
    ap.add_argument('courses', nargs='*', help='files/ altindaki ders klasorleri (verilmezse slides/ klasoru olan tumu)')
    ap.add_argument('--browser', action='store_true', help='tarayicida tasma, konsol hatasi ve kirik baglanti denetimi')
    a = ap.parse_args()
    courses = a.courses or courses_with_slides()
    for c in courses:
        if not os.path.isdir(os.path.join(FILES, c)):
            sys.exit('Ders yok: ' + c)
    n = 0
    for c in courses:
        for p in html_files(c):
            check_file(p); n += 1
    print('%d dosya denetlendi (%s).' % (n, ', '.join(courses)))
    if a.browser:
        browser_checks(courses)
    for w in warnings:
        print('UYARI ' + w)
    for e in errors:
        print('HATA  ' + e)
    print('%d hata, %d uyari.' % (len(errors), len(warnings)))
    sys.exit(1 if errors else 0)


if __name__ == '__main__':
    main()
