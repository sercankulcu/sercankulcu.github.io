"""Butun ders notlarindan tek bir kitap HTML'i uretir."""
import io, os, re, glob, sys, html

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
SITE = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'build')
os.makedirs(OUT, exist_ok=True)

PARTS = [(1, 14, 'Basic', 'The language itself'),
         (15, 28, 'Intermediate', 'Memory, data, and programs that last'),
         (29, 42, 'Advanced', 'Tooling, machines, and systems'),
         (43, 56, 'Professional', 'Working as a C programmer')]


def part_of(n):
    for a, b, name, sub in PARTS:
        if a <= n <= b:
            return name
    return ''


def load(n):
    f = glob.glob(os.path.join(SITE, 'files', 'c', 'Week_%02d_*' % n))[0]
    s = io.open(f, encoding='utf-8').read()
    body = s.split('---', 2)[-1]
    title = re.sub('<[^>]+>', '', re.search(r'<h1>(.+?)</h1>', body, re.S).group(1)).strip()
    return body, title, os.path.basename(f)


WEEKS = {'week':'chapter','Week':'Chapter','weeks':'chapters','Weeks':'Chapters'}
WEEK_RE = re.compile(r'\b(Weeks|Week|weeks|week)\b')


def weeks_to_chapters(t):
    # Kitapta 'hafta' yok, 'bolum' var. Sozcuk siniri week03/ gibi yollari
    # kendiliginden korur; kod yorumlarindaki atiflar da donusur.
    return WEEK_RE.sub(lambda m: WEEKS[m.group(1)], t)


def transform(body, n, title):
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


chapters = []
for n in range(1, 57):
    body, title, src = load(n)
    chapters.append((n, title, transform(body, n, title)))
print('  %d bolum okundu' % len(chapters))

CSS = io.open(os.path.join(HERE, 'book.css'), encoding='utf-8').read()

# --- on kisimlar --------------------------------------------------------
toc_rows = []
for a, b, name, sub in PARTS:
    toc_rows.append('<li class="bk-toc-part"><span>%s</span> <em>%s</em></li>' % (name, sub))
    for n, title, _ in chapters[a - 1:b]:
        toc_rows.append('<li class="bk-toc-ch"><span class="n">%d</span>'
                        '<span class="t">%s</span>'
                        '<span class="p" data-ch="%d">&nbsp;</span></li>' % (n, html.escape(title), n))

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
     <span class="u">sercankulcu.github.io/teaching/programming-with-c</span></p>
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

import datetime
front = FRONT.replace('__TOC__', '\n'.join(toc_rows)) \
             .replace('__DATE__', datetime.date.today().strftime('%d %B %Y'))

parts_html = []
for a, b, name, sub in PARTS:
    parts_html.append('<section class="bk-part-page"><p class="bk-part-kicker">Part %d</p>'
                      '<h1>%s</h1><p class="bk-part-sub">%s</p>'
                      '<p class="bk-part-range">Chapters %d&ndash;%d</p></section>'
                      % (PARTS.index((a, b, name, sub)) + 1, name, sub, a, b))
    for n, title, htm in chapters[a - 1:b]:
        parts_html.append(htm)

doc = '''<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Programming with C &mdash; Sercan K&uuml;lc&uuml;</title>
<style>%s</style></head><body>%s%s</body></html>''' % (CSS, front, '\n'.join(parts_html))

io.open(os.path.join(OUT, 'book.html'), 'w', encoding='utf-8', newline='\n').write(doc)
print('  book.html: %.1f MB' % (len(doc) / 1048576))
