# -*- coding: utf-8 -*-
"""Programming with C kitabi: 56 haftalik not -> 4 kisim, 56 bolum (Ingilizce)."""
import glob, html, io, os, re

from common import SITE, strip_tags

TITLE = 'Programming with C'
LANG = 'en'
OUTPUT = 'c/Programming-with-C.pdf'           # courses-pdfs/ altinda
CSS_FILES = ['book-front.css', 'book.css']    # tools/book/ altinda
FONT = None                                   # bindirme: reportlab Helvetica
META = {'/Author': 'Sercan Külcü',
        '/Subject': 'A complete course in C, in fifty-six chapters',
        '/Keywords': 'C, programming, systems, embedded, course'}
LABELS = {'chapter': 'Chapter', 'chapters': 'Chapters', 'part': 'Part', 'appendices': 'Appendices',
          'title_page': 'Title page', 'preface': 'Preface', 'contents': 'Contents'}
TOC_SECTIONS = False                          # icindekilerde yalnizca bolumler
BOOKMARK_SECTIONS = False


def part_number(k):
    return str(k)


PARTS = [(1, 14, 'Basic', 'The language itself'),
         (15, 28, 'Intermediate', 'Memory, data, and programs that last'),
         (29, 42, 'Advanced', 'Tooling, machines, and systems'),
         (43, 56, 'Professional', 'Working as a C programmer')]

DS_GUARD_RE = re.compile(r'<!-- ds-guard:begin -->.*?<!-- ds-guard:end -->\n*', re.S)
WEEKS = {'week': 'chapter', 'Week': 'Chapter', 'weeks': 'chapters', 'Weeks': 'Chapters'}
WEEK_RE = re.compile(r'\b(Weeks|Week|weeks|week)\b')


def part_of(n):
    for a, b, name, sub in PARTS:
        if a <= n <= b:
            return name
    return ''


def weeks_to_chapters(t):
    # Kitapta 'hafta' yok, 'bolum' var. Sozcuk siniri week03/ gibi yollari
    # kendiliginden korur; kod yorumlarindaki atiflar da donusur.
    return WEEK_RE.sub(lambda m: WEEKS[m.group(1)], t)


def _read(n):
    f = glob.glob(os.path.join(SITE, 'files', 'c', 'Week_%02d_*' % n))[0]
    body = io.open(f, encoding='utf-8').read().split('---', 2)[-1]
    # ds-guard yalnizca izinli adreste gosterir; kitap file:/// uzerinden basilir,
    # orada sayfa gizlenirdi. Blogu kitaba hic tasima.
    body = DS_GUARD_RE.sub('', body)
    title = strip_tags(re.search(r'<h1>(.+?)</h1>', body, re.S).group(1))
    return body, title


def _transform(body, n, title):
    b = weeks_to_chapters(body)
    b = re.sub(r'<link[^>]*>', '', b)
    b = re.sub(r'<div class="c-wk-next">.*?</div>', '', b, flags=re.S)   # web gezinme
    b = re.sub(r'<div class="c-wk-eyebrow">.*?</div>', '', b, flags=re.S)
    b = re.sub(r'<h1>.*?</h1>', '', b, count=1, flags=re.S)
    # GitHub seridi -> kisa satir
    b = re.sub(r'<p class="c-wk-code">.*?</p>',
               '<p class="bk-code-note"><strong>Code for this chapter:</strong> '
               'github.com/sercankulcu/programming-with-c</p>', b, flags=re.S)
    b = b.replace('<details>', '<details open>')                        # kitapta acik
    b = re.sub(r'<div class="c-wk">|</div>\s*$', '', b)
    # bolum numaralarini basliga yedir
    b = re.sub(r'<span class="c-wk-num">(\d+)</span>', r'<span class="bk-num">\1</span>', b)
    lead = re.search(r'<p class="c-wk-lead">(.*?)</p>', b, re.S)
    goals = re.search(r'<div class="c-wk-goals">(.*?)</div>', b, re.S)
    b = re.sub(r'<header class="c-wk-hero">.*?</header>', '', b, flags=re.S)
    head = ['<section class="bk-chapter" id="ch%d">' % n,
            '<p class="bk-part">%s &middot; Chapter %d</p>' % (part_of(n), n),
            '<h1>%s</h1>' % html.escape(title)]
    if lead:
        head.append('<p class="bk-lead">%s</p>' % lead.group(1).strip())
    if goals:
        head.append('<div class="bk-goals">%s</div>' % goals.group(1).strip())
    return '\n'.join(head) + '\n' + b.strip() + '\n</section>'


FRONT = '''
<section class="bk-title">
  <p class="bk-kicker">A complete course</p>
  <h1>Programming with C</h1>
  <p class="bk-sub">Fifty-six weeks, from the first program to production code</p>
  <p class="bk-author">Sercan K&uuml;lc&uuml;</p>
  <p class="bk-aff">Giresun University &middot; Department of Computer Engineering</p>
</section>

<section class="bk-colophon">
  <p>Programming with C</p>
  <p>Sercan K&uuml;lc&uuml;<br>Giresun University, Department of Computer Engineering<br>Giresun, T&uuml;rkiye</p>
  <p>This book is the printed form of the course notes published at<br>
     <span class="u">sercankulcu.github.io/teaching/programming-with-c/</span></p>
  <p>Every program in it is in the companion repository at<br>
     <span class="u">github.com/sercankulcu/programming-with-c</span>, where continuous integration
     compiles it on Linux, macOS and Windows so the listings here stay honest.</p>
  <p class="bk-ver">Generated from the notes of __DATE__.</p>
</section>

<section class="bk-preface">
  <h1>Preface</h1>
  <p>C is small enough to learn completely and unforgiving enough that learning it
  incompletely shows. This book takes a reader from no prior programming experience to
  competent, independent C development, in fifty-six chapters meant to be read in order.</p>

  <p>It is organised in four parts. <strong>Basic</strong> builds the language core, the early
  habits, and the first command-line programs, ending with pointers and strings.
  <strong>Intermediate</strong> covers memory, aggregate data, files, error handling and modular
  design. <strong>Advanced</strong> covers libraries and tooling, data structures, performance,
  undefined behavior, portability, the low-level systems interfaces, network programming and
  concurrency. <strong>Professional</strong> covers working inside an existing codebase,
  collaboration and review, distributing libraries, interoperating with other languages,
  scalable I/O, security testing, bare-metal development, and long-term maintenance.</p>

  <p>Each chapter assumes only what earlier chapters have established, and nothing is used
  before it has been explained. Each is anchored to a worked example that is built and
  explained rather than assigned. The examples form a chain instead of a set of isolated
  exercises: the growable array of chapter 19 becomes the reusable module of chapter 28, the
  library of chapter 29, the installable package of chapter 45 and the target of a
  foreign-language binding in chapter 46; the socket server of chapter 40 becomes the event
  loop of chapter 47. The embedded chapters target an ARM Cortex-M image running under QEMU,
  so every example can be built and run without buying hardware.</p>

  <p>Each chapter ends with a short set of questions and their answers. They are not homework.
  They are there because a reader who cannot answer them has not finished the chapter, and
  the fastest way to find that out is to try.</p>

  <p>The code is not decoration. Every listing is in the companion repository, one directory
  per chapter, and is compiled on three operating systems and two compilers on every change.
  Where a listing is deliberately wrong &mdash; and several are, because a defect you have
  watched fail teaches more than one you have read about &mdash; the text says so.</p>

  <p class="bk-sig">Sercan K&uuml;lc&uuml;<br>Giresun</p>
</section>

<section class="bk-toc">
  <h1>Contents</h1>
  <ul>__TOC__</ul>
</section>
'''


def _appendix(fname, uid, label):
    """files/c altindaki "Prerequisites" / "Important People" sayfasi ek olarak: arama,
    suzgec ve dugmeler atilir, gizli ayrintilar acilir; sayfanin kendi <style> blogu kalir."""
    src = io.open(os.path.join(SITE, 'files', 'c', fname), encoding='utf-8').read()
    b = DS_GUARD_RE.sub('', src.split('---', 2)[-1])
    b = re.sub(r'<link[^>]*>\s*', '', b)
    for rx in (r'<script.*?</script>\s*', r'<button\b.*?</button>', r'<select\b.*?</select>',
               r'<dialog\b.*?</dialog>'):
        b = re.sub(rx, '', b, flags=re.S)
    b = re.sub(r'<input\b[^>]*>', '', b)
    b = re.sub(r'<(span|p|div)[^>]*class="[^"]*__(?:count|empty)\b[^"]*"[^>]*>.*?</\1>', '', b, flags=re.S)
    b = re.sub(r'\shidden(?=[\s>/])', '', b)
    for _ in range(3):
        b = re.sub(r'<div[^>]*>\s*</div>\s*', '', b)
    title = strip_tags(re.search(r'<h1[^>]*>(.*?)</h1>', b, re.S).group(1))
    b = re.sub(r'<h1[^>]*>.*?</h1>', '', b, count=1, flags=re.S)
    b = re.sub(r'\bid="([^"]+)"', lambda m: 'id="%s-%s"' % (uid, m.group(1)), b)
    # goreli baglar sitedeki adrese
    b = re.sub(r'\bhref="(?!https?:|#|mailto:)([^"]*)"',
               lambda m: 'href="https://sercankulcu.github.io/files/c/%s"' % m.group(1), b)
    page = ('<section class="bk-chapter bk-extra" id="%s">\n<p class="bk-part">%s</p>\n<h1>%s</h1>\n%s\n'
            '</section>' % (uid, label, html.escape(title), b))
    return {'id': uid, 'label': label, 'title': title, 'header': title, 'html': page}


def date_text(d):
    return d.strftime('%d %B %Y')


def load():
    """build.py'nin bekledigi yapi; bkz. build.py basindaki aciklama."""
    chapters = []
    for n in range(1, 57):
        body, title = _read(n)
        chapters.append({'id': 'ch%d' % n, 'num': n, 'title': title,
                         'header': title, 'html': _transform(body, n, title),
                         'sections': []})
    parts = [{'id': 'part%d' % (k + 1), 'num': k + 1, 'name': name, 'sub': sub,
              'chapters': list(range(a, b + 1))}
             for k, (a, b, name, sub) in enumerate(PARTS)]
    return {'front': FRONT, 'parts': parts, 'chapters': chapters,
            'appendices': [_appendix('C_Procedural_Programming_Prerequisites.html', 'app-prereq', 'Appendix A'),
                           _appendix('C_Procedural_Programming_Important_People.html', 'app-people', 'Appendix B')],
            'tail': ''}
