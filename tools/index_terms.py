# -*- coding: utf-8 -*-
"""Ders notlarindan dizin terimlerini cikarir: terim -> ogretildigi hafta + kullanildigi haftalar."""
import io, re, html, glob, sys, collections, os

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(REPO, 'files', 'c')

NOTES, TITLES = {}, {}
for f in sorted(glob.glob(os.path.join(SITE, 'Week_*.html')),
                key=lambda p: int(re.search(r'Week_(\d+)', p).group(1))):
    n = int(re.search(r'Week_(\d+)', f).group(1))
    s = io.open(f, encoding='utf-8').read()
    NOTES[n] = s
    TITLES[n] = re.sub('<[^>]+>', '', re.search(r'<h1>(.+?)</h1>', s, re.S).group(1)).strip()
FILES = {n: os.path.basename(p) for n, p in
         ((int(re.search(r'Week_(\d+)', p).group(1)), p)
          for p in glob.glob(os.path.join(SITE, 'Week_*.html')))}

# --- ayiklama kurallari ---------------------------------------------------
DROP_EXACT = {
 'int', 'char', 'void', 'long', 'short', 'float', 'n', 'x', 'y', 'i', 'j', 'k', 'p', 'a', 'b', 'c',
 's', 't', 'v', 'm', 'f', 'out', 'in', 'buf', 'size', 'count', 'len', 'value', 'data', 'ptr',
 'head', 'node', 'tmp', 'result', 'flags', 'mask', 'key', 'name', 'path', 'line', 'text', 'end',
 'left', 'right', 'next', 'prev', 'root', 'top', 'low', 'high', 'mid', 'sum', 'total', 'index',
 'capacity', 'values', 'args', 'argc2', 'this', 'that', 'it', 'counter',
}
KEEP_SHORT = {'if', 'do', 'or', '0', '1'}          # bunlar asla girmesin
GENERIC = {'memory', 'parameters', 'the convention', 'the conventions', 'termination', 'tasks', 'scheduling', 'communication', 'branching', 'installing', 'deprecating', 'the node', 'the script', 'sections', 'cmake', 'make', 'gdb', 'tracing', 'choosing', 'the environment', 'signals', 'the shape of the library', 'the memory map', 'the first hour', 'navigation', 'the three forms', 'the four functions', 'the operators', 'the four idioms', 'the two obligations', 'ownership', 'the model', 'addresses', 'framing', 'threads', 'mutexes', 'recursion', 'the call stack', 'unit tests', 'static analysis', 'continuous integration'}
DROP_RE = [
 re.compile(r'^\s*$'),
 re.compile(r'^[0-9.]+$'),                          # saf sayi
 re.compile(r'[<>]\s*$'),
 re.compile(r'^\W+$'),                              # yalnizca noktalama
 re.compile(r'\s'),                                  # bosluk iceren ifade -> dizin terimi degil
]
KEEP_WITH_SPACE = re.compile(r'^(#include\s+<[a-z0-9_/]+\.h>|struct \w+|unsigned \w+|const \w+)$')


def norm(t):
    t = html.unescape(re.sub('<[^>]+>', '', t)).strip()
    t = t.replace('\u00a0', ' ')
    return t


def acceptable(t):
    if t in DROP_EXACT or t in KEEP_SHORT:
        return False
    if len(t) < 2 or len(t) > 30:
        return False
    if any(r.search(t) for r in DROP_RE) and not KEEP_WITH_SPACE.match(t):
        return False
    if re.match(r'^[a-z_][a-z0-9_]*\.(c|h)$', t) and t not in ('stdio.h',):
        return False                                  # ornek dosya adlari
    if t.endswith((';', '{', '}', '(', ')')):
        return False
    if t.count('"') or t.count("'"):
        return False
    if any(ch in t for ch in '[]()'):
        return False
    return True


code_used = collections.defaultdict(set)
code_count = collections.defaultdict(collections.Counter)
code_taught = collections.defaultdict(set)
concept = {}

for n, s in NOTES.items():
    # islenen ornek bolumunden ONCESI: tanimlarin yeri. Sonrasi uygulamadir.
    we = re.search(r'<h2><span class="c-wk-num">\d+</span>Worked example', s)
    head_zone = s[:we.start()] if we else s
    # --- kavramlar: yalnizca head_zone'daki h2/h3 ---------------------
    for m in re.finditer(r'<h([23])>(.*?)</h[23]>', head_zone, re.S):
        h = re.sub(r'^\d+', '', norm(m.group(2))).strip()
        if not h or h.startswith(('Worked example', 'Common mistakes', 'Check yourself',
                                  'Where this leads', 'Experiment', 'Build ', 'Run ', 'Test ',
                                  'Watch ', 'Prove ', 'Try ', 'Compare ', 'Measure ', 'Confirm ',
                                  'Break ', 'Look ', 'Then ', 'Step ', 'What ', 'Why ', 'Three ',
                                  'Two ', 'Four ', 'Five ')):
            continue
        lvl = int(m.group(1))
        # h2 gercek konu basligi; h3'lerin cogu alt parca -- yalnizca
        # kendi basina aranabilecek olanlari al.
        wordy = len(h.split()) >= 3
        techy = bool(re.search(r'[_>*(]|[a-z]_[a-z]|^[a-z]+\(|[a-z]+_[a-z]+', h))
        if lvl == 3 and not (wordy or techy):
            continue
        if h.lower() in GENERIC:
            continue
        if 2 < len(h) < 54:
            concept.setdefault(h, n)
    # --- kod terimleri ------------------------------------------------
    zone = ' '.join(h for h in re.findall(r'<h[123]>(.*?)</h[123]>', head_zone, re.S)
                    if 'Worked example' not in h)
    g = re.search(r'c-wk-goals(.*?)</div>', s, re.S)
    if g:
        zone += ' ' + g.group(1)
    for c in re.findall(r'<code>(.*?)</code>', zone, re.S):
        t = norm(c)
        if acceptable(t):
            code_taught[t].add(n)
    body = re.sub(r'<pre><code>.*?</code></pre>', '', s, flags=re.S)
    for c in re.findall(r'<code>(.*?)</code>', body, re.S):
        t = norm(c)
        if acceptable(t):
            code_used[t].add(n)
    # "Ogretildigi hafta" kanitini aciklama metninden topla: islenen ornekte bir
    # islev *kullanilir*, anlatilmaz -- h44 bir kod incelemesinde fread'i dort
    # kez aniyor, oysa fread'in yeri h26. Yalnizca o bolumu cikar; sonrasindaki
    # "Common mistakes" hala anlatimdir.
    prose = re.sub(r'<h2><span class="c-wk-num">\d+</span>Worked example.*?(?=<h2>|\Z)',
                   '', s, flags=re.S)
    head_body = re.sub(r'<pre><code>.*?</code></pre>', '', prose, flags=re.S)
    for c in re.findall(r'<code>(.*?)</code>', head_body, re.S):
        t = norm(c)
        if acceptable(t):
            code_count[t][n] += 1


def dominant(counts):
    """Hicbir baslikta gecmeyen terim icin yedek kural: onu acik ara en cok
    anlatan haftayi 'ogretildigi hafta' say. Esik bilerek sikidir -- koyu
    rakam 'burada anlatiliyor' iddiasidir, yanlis isaretlemek bos
    birakmaktan kotudur. Bu yuzden hem en az 3 gecis hem de ikincinin
    iki kati aranir; saglamayan terim sahipsiz kalir."""
    top = counts.most_common(2)
    if not top:
        return None
    w1, c1 = top[0]
    c2 = top[1][1] if len(top) > 1 else 0
    return w1 if c1 >= 3 and c1 >= 2 * c2 else None


entries = []
for t, ws in code_used.items():
    tw = sorted(code_taught.get(t, ()))
    if tw or len(ws) >= 3:
        main = tw[0] if tw else dominant(code_count[t])
        entries.append((t, main, sorted(ws), 'code'))
for h, n in concept.items():
    entries.append((h, n, [n], 'concept'))

entries.sort(key=lambda e: (e[0].lstrip('-_<#%').lower(), e[0]))

if __name__ == '__main__':
    code = [e for e in entries if e[3] == 'code']
    conc = [e for e in entries if e[3] == 'concept']
    print('  kod terimi   : %d (%d tanesinin ogretildigi hafta belli)'
          % (len(code), sum(1 for e in code if e[1])))
    print('  kavram       : %d' % len(conc))
    print('  toplam       : %d\n' % len(entries))
    import random
    random.seed(11)
    print('  --- kod terimi ornekleri ---')
    for t, tw, ws, _ in random.sample(code, 12):
        print('   %-26s %-5s %s' % (t, ('h%d' % tw) if tw else '-', [w for w in ws if w != tw][:6]))
    print('\n  --- kavram ornekleri ---')
    for t, tw, ws, _ in random.sample(conc, 12):
        print('   %-46s h%d' % (t[:46], tw))
