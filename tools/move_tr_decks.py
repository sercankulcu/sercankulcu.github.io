# -*- coding: utf-8 -*-
"""Bir dersin Turkce sunum dosyalarini slides/ klasorunden sunumlar/ klasorune tasir.

    python tools/move_tr_decks.py advanced_algorithms          # tasi ve baglantilari guncelle
    python tools/move_tr_decks.py advanced_algorithms --dry    # yalniz ne yapacagini yaz

Veri Yapilari modeli: Turkce sunum, calisma sorulari ve simulatorler sunumlar/ altina gider;
ortak deck/ ve img/ klasorleri (ve Ingilizce Chapter_ sunumlari) slides/ altinda kalir.
Tasinan dosyalarda deck/ ve img/ yollari ../slides/ ile baslar, permalink yeni adrese gecer.
Sitedeki diger dosyalarda (ders sayfasi, notlar, ders haritasi, araclar, 404 haritasi) eski
adresler yenisine cevrilir; _pages/404.md PAGES haritasina eski -> yeni yonlendirmesi eklenir.
"""
import io, json, os, re, subprocess, sys

sys.stdout.reconfigure(encoding='utf-8')
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DRY = '--dry' in sys.argv
course = [a for a in sys.argv[1:] if not a.startswith('--')][0]
SRC = os.path.join(REPO, 'files', course, 'slides')
DST = os.path.join(REPO, 'files', course, 'sunumlar')

moved = sorted(n for n in os.listdir(SRC)
               if n.endswith('.html') and not n.startswith('Chapter_') and os.path.isfile(os.path.join(SRC, n)))
print(len(moved), 'dosya tasinacak')
if not moved:
    sys.exit(0)


def read(p):
    return io.open(p, encoding='utf-8').read()


def write(p, s):
    if not DRY:
        io.open(p, 'w', encoding='utf-8', newline='').write(s)


# 1) git mv
if not DRY:
    os.makedirs(DST, exist_ok=True)
    for n in moved:
        subprocess.run(['git', 'mv', os.path.join(SRC, n), os.path.join(DST, n)], cwd=REPO, check=True)

# 2) tasinan dosyalarin ic yollari
shared = [d for d in os.listdir(SRC) if os.path.isdir(os.path.join(SRC, d))]   # deck, img, ...
pat_shared = re.compile(r'''(?P<q>["'(])(?P<d>%s)/''' % '|'.join(map(re.escape, shared))) if shared else None
for n in moved:
    p = os.path.join(DST if not DRY else SRC, n)
    s = read(p)
    t = s.replace('/files/%s/slides/' % course, '/files/%s/sunumlar/' % course)
    if pat_shared:
        t = pat_shared.sub(lambda m: m.group('q') + '../slides/' + m.group('d') + '/', t)
    if t != s:
        write(p, t)

# 3) sitedeki baglantilar: mutlak ve goreli
abs_old = ['/files/%s/slides/%s' % (course, n) for n in moved]
names = set(moved)
targets = []
for root in ['_teaching', '_pages', '_data', 'tools', 'files', 'game', 'apps']:
    for dp, dn, fn in os.walk(os.path.join(REPO, root)):
        if 'build' in dp.split(os.sep) or '__pycache__' in dp:
            continue
        for f in fn:
            if f.endswith(('.md', '.html', '.py', '.yml', '.js', '.json', '.xml')):
                targets.append(os.path.join(dp, f))
changed = []
for p in targets:
    if os.path.dirname(p) == DST:
        continue
    s = read(p)
    t = s
    for a in abs_old:
        t = t.replace(a, a.replace('/slides/', '/sunumlar/'))
    # notlar/ -> ../slides/X ; ders kokundeki sayfalar -> slides/X
    rel_dir = os.path.relpath(os.path.dirname(p), os.path.join(REPO, 'files', course)).replace('\\', '/')
    if rel_dir == 'notlar':
        t = re.sub(r'\.\./slides/([^"\'#?\s)]+\.html)', lambda m: ('../sunumlar/' + m.group(1)) if m.group(1) in names else m.group(0), t)
    elif rel_dir == '.':
        t = re.sub(r'(?<![\w/.])slides/([^"\'#?\s)]+\.html)', lambda m: ('sunumlar/' + m.group(1)) if m.group(1) in names else m.group(0), t)
    if t != s:
        changed.append(os.path.relpath(p, REPO))
        write(p, t)
print('guncellenen dosyalar:', len(changed))
for c in changed:
    print('  ', c)

# 4) 404 yonlendirmeleri
p404 = os.path.join(REPO, '_pages', '404.md')
s = read(p404)
m = re.search(r'var PAGES = (\{.*?\});', s)
d = json.loads(m.group(1))
n0 = len(d)
for n in moved:
    d['files/%s/slides/%s' % (course, n)] = 'files/%s/sunumlar/%s' % (course, n)
s = s[:m.start(1)] + json.dumps(d, ensure_ascii=False, separators=(',', ':')) + s[m.end(1):]
write(p404, s)
print('404 haritasi:', n0, '->', len(d))
