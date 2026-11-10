# -*- coding: utf-8 -*-
"""Dersin notlarindan tek bir kitap HTML'i uretir: build/<ders>/book.html.

Dersin kendisi course_<ders>.py icindedir ve load() su yapiyi dondurur:

  front       on kisim HTML'i; __TOC__ ve __DATE__ yer tutuculariyla
  parts       [{id, num, name, sub, chapters: [bolum no, ...]}]
  chapters    [{id, num, title, header, html, sections: [{id, num, title}]}]
              html kendi <section id="<id>"> sarmalayicisini tasir
  appendices  [{id, label, title, header, html}]
  tail        govdenin sonuna eklenen HTML (or. sekilleri cizen betik)

Bu betik kisim sayfalarini ve icindekileri kurar. Icindekilerdeki her satir
hedefine bag verir; Chrome bu baglar icin PDF'e adlandirilmis hedef yazar ve
finalize.py sayfa numaralarini oradan okur. Yapinin kendisi book.json'a gider.
"""
import datetime, html, io, os, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import common

C = common.course()
OUT = common.build_dir(C)
L = C.LABELS
book = C.load()
chap = {c['num']: c for c in book['chapters']}
print('  %d bolum, %d kisim, %d ek okundu' %
      (len(chap), len(book['parts']), len(book['appendices'])))

CSS = '\n'.join(io.open(os.path.join(common.HERE, f) if not os.path.isabs(f) else f,
                        encoding='utf-8').read() for f in C.CSS_FILES)


def page_span(dest):
    return '<span class="p" data-dest="%s">&nbsp;</span>' % dest


def toc_row(cls, n, title, dest):
    return ('<li class="%s"><span class="n">%s</span><span class="t"><a href="#%s">%s</a></span>%s</li>'
            % (cls, n, dest, html.escape(title), page_span(dest)))


toc = []
for p in book['parts']:
    sub = (' <em>%s</em>' % p['sub']) if p.get('sub') else ''
    label = C.toc_part(p) if hasattr(C, 'toc_part') else p['name']
    toc.append('<li class="bk-toc-part"><span><a href="#%s">%s</a></span>%s</li>'
               % (p['id'], label, sub))
    for n in p['chapters']:
        c = chap[n]
        toc.append(toc_row('bk-toc-ch', n, c['title'], c['id']))
        if C.TOC_SECTIONS:
            for s in c['sections']:
                toc.append(toc_row('bk-toc-sec', s['num'], s['title'], s['id']))
if book['appendices']:
    toc.append('<li class="bk-toc-part"><span>%s</span></li>' % L['appendices'])
    for a in book['appendices']:
        toc.append(toc_row('bk-toc-ch', a['label'], a['title'], a['id']))

front = book['front'].replace('__TOC__', '\n'.join(toc)) \
                     .replace('__DATE__', C.date_text(datetime.date.today()))

body = []
for p in book['parts']:
    nums = p['chapters']
    rng = '%s %s&ndash;%s' % (L['chapters'], nums[0], nums[-1]) if len(nums) > 1 \
        else '%s %s' % (L['chapter'], nums[0])
    sub = ('<p class="bk-part-sub">%s</p>' % p['sub']) if p.get('sub') else ''
    body.append('<section class="bk-part-page" id="%s"><p class="bk-part-kicker">%s %s</p>'
                '<h1>%s</h1>%s<p class="bk-part-range">%s</p></section>'
                % (p['id'], L['part'], C.part_number(p['num']), p['name'], sub, rng))
    body.extend(chap[n]['html'] for n in nums)
body.extend(a['html'] for a in book['appendices'])

doc = '''<!doctype html><html lang="%s"><head><meta charset="utf-8">
<title>%s &mdash; Sercan K&uuml;lc&uuml;</title>
<style>%s</style></head><body>%s%s%s</body></html>''' % (
    C.LANG, html.escape(C.TITLE), CSS, front, '\n'.join(body), book.get('tail', ''))

io.open(os.path.join(OUT, 'book.html'), 'w', encoding='utf-8', newline='\n').write(doc)

# finalize.py ve overlay.py icin yapi (HTML'siz)
common.write_json(C, 'book.json', {
    'parts': [{k: p[k] for k in ('id', 'num', 'name', 'chapters')} for p in book['parts']],
    'chapters': [{k: c[k] for k in ('id', 'num', 'title', 'header', 'sections')}
                 for c in book['chapters']],
    'appendices': [{k: a[k] for k in ('id', 'label', 'title', 'header')}
                   for a in book['appendices']],
})
print('  book.html: %.1f MB' % (len(doc) / 1048576))
