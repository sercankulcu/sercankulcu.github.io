# -*- coding: utf-8 -*-
"""Ders sayfalarindaki bolum kaynak listelerini sikistirir: bir sunum = bir satir.

    python tools/compact_course_links.py _teaching/computer-and-programming.md [...]
    python tools/compact_course_links.py --all        # _teaching/*.md
    python tools/compact_course_links.py --all --dry  # yalniz ozet

Ardisik liste ogeleri (- [..](..)) okunur; ayni sunuma ait Sunum/PDF/Ders Notu/Calisma Sorulari
(ve Ingilizce Slides/Lecture Notes/Study Questions) baglantilari dosya kokune gore tek satirda
toplanir; kod ve laboratuvar baglantilari ait oldugu sunumun satirina eklenir; simulatorler tek
satira iner. Taninmayan ogeler oldugu gibi kalir. Her dosyada baglanti adresleri kumesinin
degismedigi denetlenir.
"""
import glob, io, os, re, sys

sys.stdout.reconfigure(encoding='utf-8')
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ITEM = re.compile(r'^(?P<ind>\s*)[-*] \[(?P<lab>.*?)\]\((?P<url>[^)\s]+)\)\s*$')

KINDS = [  # (tur, desen, dil)
    ('slides', re.compile(r'^🖼️\s*Sunum\s*[-–]\s*(?P<n>.+?) \(HTML\)$'), 'tr'),
    ('pdf', re.compile(r'^📄\s*Sunum\s*[-–]\s*(?P<n>.+?) \(PDF\)$'), 'tr'),
    ('notes', re.compile(r'^📖\s*Ders Notu\s*[-–]\s*(?P<n>.+?) \(HTML\)$'), 'tr'),
    ('quiz', re.compile(r'^📝\s*Çalışma Soruları\s*[-–]\s*(?P<n>.+?) \(HTML\)$'), 'tr'),
    ('slides', re.compile(r'^🖼️\s*Slides\s*[-–]\s*(?P<n>.+?) \(HTML\)$'), 'en'),
    ('pdf', re.compile(r'^📄\s*Slides\s*[-–]\s*(?P<n>.+?) \(PDF\)$'), 'en'),
    ('notes', re.compile(r'^📖\s*Lecture Notes\s*[-–]\s*(?P<n>.+?) \(HTML\)$'), 'en'),
    ('quiz', re.compile(r'^📝\s*Study Questions\s*[-–]\s*(?P<n>.+?) \(HTML\)$'), 'en'),
    ('code', re.compile(r'^💻\s*(?:Kod Örnekleri|Code Examples)(?:,\s*(?P<n>[^()]+?))?\s*\(GitHub\)$'), None),
    ('lab', re.compile(r'^🧪\s*(?:Laboratuvar Çalışması|Lab Work)(?:,\s*(?P<n>[^()]+?))?\s*\(GitHub\)$'), None),
    ('sim', re.compile(r'^🕹️\s*(?P<n>.+?)(?: \(HTML\))?$'), None),
]
LABEL = {
    'tr': {'slides': '🖼️ Sunum', 'pdf': '📄 PDF', 'notes': '📖 Ders notu', 'quiz': '📝 Sorular',
           'code': '💻 Kod', 'lab': '🧪 Laboratuvar', 'sim': 'Simülatörler', 'games': 'Oyunlar ve simülatörler'},
    'en': {'slides': '🖼️ Slides', 'pdf': '📄 PDF', 'notes': '📖 Notes', 'quiz': '📝 Questions',
           'code': '💻 Code', 'lab': '🧪 Lab', 'sim': 'Simulators', 'games': 'Games and simulators'},
}
ORDER = ['slides', 'pdf', 'notes', 'quiz', 'code', 'lab', 'subsim']
STEM_SUFFIX = re.compile(r'(_Ders_Notu|_Calisma_Sorulari|_Lecture_Notes|_Study_Questions)$')


def classify(lab):
    for kind, pat, lang in KINDS:
        m = pat.match(lab)
        if m:
            return kind, (m.groupdict().get('n') or '').strip(), lang
    return None, None, None


def stem(url):
    b = url.rstrip('/').split('/')[-1]
    b = re.sub(r'\.(html|pdf)$', '', b)
    return STEM_SUFFIX.sub('', b)


def subnum(st):
    m = re.match(r'^(?:Bolum|Chapter)_(\d\d)_(\d\d)_', st)
    return '%d.%d ' % (int(m.group(1)), int(m.group(2))) if m else ''


def render_group(items, lang, games):
    """items: [(kind, name, url, raw)] ardisik liste ogeleri -> yeni satirlar"""
    L = LABEL[lang]
    decks, order, sims, out = {}, [], [], []
    last = None
    for kind, name, url, raw in items:
        if kind in ('slides', 'pdf', 'notes', 'quiz'):
            st = stem(url)
            if st not in decks:
                decks[st] = {'name': name, 'links': {}}
                order.append(st)
            if kind == 'slides' or not decks[st]['name']:
                decks[st]['name'] = name
            decks[st]['links'][kind] = url
            last = st
        elif kind in ('code', 'lab'):
            tag = L[kind] + (' (%s)' % name if name else '')
            if last:
                decks[last]['links'].setdefault(kind, []).append((tag, url))
            else:
                out.append(('extra', '- [%s](%s)' % (tag, url)))
        elif kind == 'sim':
            # girintili (bir alt bolume bagli) simulatorler de bolumun tek simulator satirina toplanir
            sims.append((name, url))
    rows = []
    multi = len(order) > 1
    for st in order:
        d = decks[st]
        parts = []
        for k in ORDER:
            v = d['links'].get(k)
            if v is None:
                continue
            if isinstance(v, list):
                parts += ['[%s](%s)' % x for x in v]
            else:
                parts.append('[%s](%s)' % (L[k], v))
        num = subnum(st)
        if d['name'].startswith(num.strip() + ' '):
            num = ''
        head = '**%s%s** — ' % (num, d['name']) if multi else ''
        rows.append('- ' + head + ' · '.join(parts))
    rows += [x[1] for x in out]
    if sims:
        rows.append('- 🕹️ **%s:** ' % (L['games'] if games else L['sim']) +
                    ' · '.join('[%s](%s)' % s for s in sims))
    return rows


def convert(text, games):
    lines = text.split('\n')
    res, i = [], 0
    while i < len(lines):
        m = ITEM.match(lines[i])
        if not m:
            res.append(lines[i]); i += 1; continue
        # bir blok: bos satirlarla ayrilmis liste ogeleri de ayni bolumde birlikte ele alinir
        j, items, raw = i, [], []
        while j < len(lines):
            mm = ITEM.match(lines[j])
            if mm:
                k, n, lg = classify(mm.group('lab'))
                items.append((k, n, mm.group('url'), lines[j], lg))
                j += 1
            elif lines[j].strip() == '' and j + 1 < len(lines) and ITEM.match(lines[j + 1]):
                j += 1
            else:
                break
        known = [x for x in items if x[0]]
        langs = {x[4] for x in items if x[4]}
        if not any(x[0] in ('slides', 'pdf', 'notes', 'quiz', 'sim') for x in known) or len(langs) > 1 \
                or len(known) != len(items):
            # tanınmayan oge varsa: yalniz tanınan ardışık parcalari donustur, digerlerini birak
            seg = []
            for x in items:
                if x[0]:
                    seg.append(x)
                else:
                    if seg:
                        res += render_group([(a, b, c, d) for a, b, c, d, _ in seg],
                                            ({y[4] for y in seg if y[4]} or {'tr'}).pop(), games)
                        seg = []
                    res.append(x[3])
            if seg:
                res += render_group([(a, b, c, d) for a, b, c, d, _ in seg],
                                    ({y[4] for y in seg if y[4]} or {'tr'}).pop(), games)
        else:
            res += render_group([(a, b, c, d) for a, b, c, d, _ in items], (langs or {'tr'}).pop(), games)
        i = j
    return '\n'.join(res)


def urls(s):
    return sorted(re.findall(r'\]\(([^)\s]+)\)', s))


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    files = [f for f in sorted(glob.glob(os.path.join(REPO, '_teaching', '*.md')))
             if not f.endswith('ai-courses.md')] if '--all' in sys.argv else args   # YZ rehberi kendi ureteciyle yazilir
    for p in files:
        s = io.open(p, encoding='utf-8').read()
        t = convert(s, games='algorithmic-game-theory' in p)
        if urls(s) != urls(t):
            print('ADRES UYUSMAZLIGI, atlandi:', p)
            continue
        n0 = sum(1 for l in s.split('\n') if ITEM.match(l) or l.startswith('- '))
        n1 = sum(1 for l in t.split('\n') if l.startswith('- ') or l.startswith('* '))
        if t != s:
            print('%-55s %4d -> %4d satir' % (os.path.relpath(p, REPO), n0, n1))
            if '--dry' not in sys.argv:
                io.open(p, 'w', encoding='utf-8', newline='').write(t)


if __name__ == '__main__':
    main()
