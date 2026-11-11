# -*- coding: utf-8 -*-
"""HTML metnine Turkce heceleme noktalarinda yumusak tire (&shy;) ekler.

Chrome'un Windows surumu lang="tr" icin heceleme sozlugu tasimiyor; hyphens:auto
Turkce metinde hicbir sozcugu bolmuyor (denendi). Turkce hece kurali duzenli
oldugu icin noktalari burada koyuyoruz, tarayici da hyphens:manual ile kullaniyor.

Kural: bir unluden once gelen son unsuz yeni heceyi baslatir (ka-rar, Turk-ce,
kont-rol); yan yana iki unlu arasindan da bolunur (sa-at). Bolmeden sonra basta en
az 2, sonda en az 2 harf kalir. Dokunulmayanlar: buyuk harfle baslayan sozcukler
(ozel adlar, cogu yabanci), q/w/x iceren sozcukler, ve su ogelerin icindeki her
sey: basliklar, pre, code, svg, script, style, sub, sup, kbd, lang="en" ya da class="m" (formul), class="u" (adres)
tasiyan ogeler. Etiketler ve ozellik degerleri hic degismez.
"""
import re

VOWELS = set('aeıioöuüâîûAEIİOÖUÜÂÎÛ')
LETTERS = 'a-zçğıöşüâîûA-ZÇĞİÖŞÜÂÎÛ'
WORD = re.compile(r'[%s]{6,}' % LETTERS)
FOREIGN = set('qwxQWX')
SKIP_TAGS = {'pre', 'code', 'svg', 'script', 'style', 'sub', 'sup', 'kbd', 'math', 'title',
             'h1', 'h2', 'h3', 'h4', 'summary'}
VOID = {'br', 'img', 'hr', 'input', 'meta', 'link', 'wbr', 'source', 'col', 'area', 'base'}
TAG = re.compile(r'(<!--.*?-->|<[^>]+>)', re.S)
NAME = re.compile(r'</?\s*([a-zA-Z][\w:-]*)')
SHY = '­'


def word_points(w):
    """w icindeki bolme konumlari (o indeksten once bolunur)."""
    pts = []
    for i in range(1, len(w)):
        a, b = w[i - 1], w[i]
        if b in VOWELS:
            if a in VOWELS:
                pts.append(i)                         # sa-at
            elif i >= 2 and any(ch in VOWELS for ch in w[:i - 1]):
                pts.append(i - 1)                     # unsuz yeni heceyi baslatir
    return sorted(p for p in set(pts) if 2 <= p <= len(w) - 2)


def hyphenate_word(w):
    if w[0].isupper() or FOREIGN & set(w):
        return w
    pts = word_points(w)
    if not pts:
        return w
    out, last = [], 0
    for p in pts:
        out.append(w[last:p])
        last = p
    out.append(w[last:])
    return SHY.join(out)


def _skips(tag, name):
    if name in SKIP_TAGS:
        return True
    if re.search(r'\blang\s*=\s*["\']en', tag):
        return True
    m = re.search(r'\bclass\s*=\s*"([^"]*)"', tag)
    # m: formul, u: adres (adres tireyle bolunmesin)
    return bool(m and {'m', 'u'} & set(m.group(1).split()))


def hyphenate_html(s):
    parts = TAG.split(s)
    stack = []                                        # [(ad, atla_mi)]
    out = []
    for k, part in enumerate(parts):
        if k % 2:                                     # etiket ya da yorum
            out.append(part)
            if part.startswith('<!--'):
                continue
            m = NAME.match(part)
            if not m:
                continue
            name = m.group(1).lower()
            if part.startswith('</'):
                for j in range(len(stack) - 1, -1, -1):
                    if stack[j][0] == name:
                        del stack[j:]
                        break
            elif not (part.endswith('/>') or name in VOID):
                inherited = bool(stack and stack[-1][1])
                stack.append((name, inherited or _skips(part, name)))
            continue
        if stack and stack[-1][1]:
            out.append(part)
            continue
        # &nbsp; gibi varliklarin icine dokunma
        bits = re.split(r'(&#?\w+;)', part)
        out.append(''.join(b if b.startswith('&') else WORD.sub(lambda m: hyphenate_word(m.group(0)), b)
                           for b in bits))
    return ''.join(out)


if __name__ == '__main__':
    for w in ['karşılaştırılabilirlik', 'Türkçe', 'kontrol', 'saat', 'mekanizmaların',
              'dengesi', 'stratejik', 'oyuncunun', 'teşvikuyumluluğu', 'ayrıntılı']:
        print(hyphenate_word(w).replace(SHY, '-'))
