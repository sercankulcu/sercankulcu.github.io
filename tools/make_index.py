# -*- coding: utf-8 -*-
"""files/c/Index.html uretir ve 56 hafta notunun gezinme satirina baglar."""
import io, os, re, glob, sys, html

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

import index_terms as IX

SITE = IX.SITE
ENTRIES = IX.entries
FILES = IX.FILES
TITLES = IX.TITLES


def wlink(n, main=False):
    return ('<a class="ix-w%s" href="/files/c/%s" title="%s">%d</a>'
            % (' ix-main' if main else '', FILES[n], html.escape(TITLES[n]), n))


def block(items, mono):
    out, letter = [], None
    for t, tw, ws, _ in items:
        first = t.lstrip('-_<#%').upper()[:1]
        if not first.isalpha():
            first = '#'
        if first != letter:
            letter = first
            out.append('</dl>' if out else '')
            out.append('<h3 id="%s-%s">%s</h3>' % ('c' if mono else 't', letter, letter))
            out.append('<dl class="c-ix%s">' % (' c-ix-mono' if mono else ''))
        links = [wlink(tw, True)] if tw else []
        links += [wlink(w) for w in ws if w != tw]
        out.append('<dt>%s</dt><dd>%s</dd>' % (html.escape(t), ' '.join(links)))
    out.append('</dl>')
    return '\n'.join(x for x in out if x)


code = [e for e in ENTRIES if e[3] == 'code']
conc = [e for e in ENTRIES if e[3] == 'concept']
letters = lambda items, pre: ' '.join(
    '<a href="#%s-%s">%s</a>' % (pre, L, L) for L in
    sorted({(t.lstrip('-_<#%').upper()[:1] if t.lstrip('-_<#%')[:1].isalpha() else '#')
            for t, _, _, _ in items}))

DOC = '''---
layout: without-sidebar
title: "Index — Programming with C"
permalink: /files/c/Index.html
excerpt: "Every function, type, flag and topic in the course, with the week that explains it and the weeks that use it."
---

<link rel="stylesheet" href="/files/c/week.css">

<div class="c-wk">

<header class="c-wk-hero">
  <div class="c-wk-eyebrow">Programming with C &middot; Index</div>
  <h1>Index</h1>
  <p class="c-wk-lead">Fifty-six weeks is a lot to hold in your head. This page is for the moment
  you remember that something was explained but not where. The <strong>bold</strong> number is the
  week that explains it; the rest are the weeks that use it.</p>
</header>

<section>
  <h2><span class="c-wk-num">1</span>Functions, types, keywords and flags</h2>
  <p class="c-ix-jump">%s</p>
%s
</section>

<section>
  <h2><span class="c-wk-num">2</span>Topics</h2>
  <p class="c-ix-jump">%s</p>
%s
</section>

<div class="c-wk-next">
  <a href="/teaching/programming-with-c">Course outline</a>
  <a href="/files/c/Ders_Ogretim_Plani.html">Course plan</a>
  <a href="/files/c/Week_01_Computers_and_Toolchain.html">Week 1 &rarr;</a>
</div>

</div>
''' % (letters(code, 'c'), block(code, True), letters(conc, 't'), block(conc, False))

io.open(os.path.join(SITE, 'Index.html'), 'w', encoding='utf-8', newline='\n').write(DOC)
print('  Index.html: %d kod terimi + %d kavram, %.1f KB' % (len(code), len(conc), len(DOC) / 1024))

# --- week.css: dizin stilleri ---------------------------------------------
CSSP = os.path.join(SITE, 'week.css')
css = io.open(CSSP, encoding='utf-8').read()
if '.c-ix' not in css:
    css = css.rstrip('\n') + '''

/* Index page: two columns of term -> week links. */
.c-ix-jump{margin:.2rem 0 1rem;font-size:.85rem;letter-spacing:.06em}
.c-ix-jump a{display:inline-block;padding:0 .28rem;font-weight:750}
.c-ix{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:.1rem .9rem;margin:0 0 1.3rem;
      align-items:baseline}
.c-ix dt{min-width:0;overflow-wrap:anywhere}
.c-ix-mono dt{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.92em}
.c-ix dd{margin:0;white-space:nowrap}
.c-ix .ix-w{display:inline-block;min-width:1.55rem;padding:0 .2rem;text-align:center;
            font-size:.86rem;color:var(--wk-muted);font-variant-numeric:tabular-nums}
.c-ix .ix-main{color:var(--wk-link);font-weight:800}
.c-wk h3[id^="c-"],.c-wk h3[id^="t-"]{margin:1.2rem 0 .4rem;font-size:.9rem;letter-spacing:.14em;
            color:var(--wk-muted)}
@media(min-width:880px){
  .c-ix{grid-template-columns:repeat(2,minmax(0,1fr) auto)}
}
'''
    io.open(CSSP, 'w', encoding='utf-8', newline='\n').write(css)
    print('  week.css: .c-ix stilleri eklendi')

# --- 56 notun gezinme satirina Index ---------------------------------------
n = 0
for f in glob.glob(os.path.join(SITE, 'Week_*.html')):
    s = io.open(f, encoding='utf-8').read()
    if 'files/c/Index.html' in s:
        continue
    s2 = s.replace('<a href="../../teaching/programming-with-c">Course outline</a>',
                   '<a href="../../teaching/programming-with-c">Course outline</a>\n'
                   '  <a href="/files/c/Index.html">Index</a>')
    if s2 == s:
        s2 = re.sub(r'(<a href="[^"]*teaching/programming-with-c">Course outline</a>)',
                    r'\1\n  <a href="/files/c/Index.html">Index</a>', s)
    if s2 != s:
        io.open(f, 'w', encoding='utf-8', newline='\n').write(s2)
        n += 1
print('  %d hafta notunun gezinmesine Index eklendi' % n)
