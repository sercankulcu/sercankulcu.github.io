# -*- coding: utf-8 -*-
"""h40 cerceveleme + h48 kapsam gudumlu fuzzing (adimlayici); h45 soname + h29 baglama (duragan)."""
import io, os, re, glob, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SITE = os.path.join(REPO, 'files', 'c')


def head(w, h, alt, uid):
    return ('<svg viewBox="0 0 %d %d" role="img" aria-label="%s" xmlns="http://www.w3.org/2000/svg">'
            '<defs><marker id="%s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" '
            'markerHeight="6" orient="auto-start-reverse">'
            '<path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>' % (w, h, alt, uid))


def box(x, y, w, h, op=None, dash=None, r=8, fill=None):
    a = ' opacity="%s"' % op if op else ''
    d = ' stroke-dasharray="%s"' % dash if dash else ''
    f = ' fill="currentColor" fill-opacity="%s"' % fill if fill else ' fill="none"'
    return ('<rect x="%g" y="%g" width="%g" height="%g" rx="%g"%s stroke="currentColor" '
            'stroke-width="1.5"%s%s/>' % (x, y, w, h, r, f, a, d))


def txt(x, y, s, size=12.5, op=None, bold=False, anchor='middle', mono=False):
    a = ' opacity="%s"' % op if op else ''
    b = ' font-weight="700"' if bold else ''
    fam = 'ui-monospace,Consolas,monospace' if mono else 'inherit'
    return ('<text x="%g" y="%g" fill="currentColor" font-size="%g" text-anchor="%s" '
            'font-family="%s"%s%s>%s</text>' % (x, y, size, anchor, fam, a, b, s))


def arr(x1, y1, x2, y2, uid, op=None, dash=None):
    a = ' opacity="%s"' % op if op else ''
    d = ' stroke-dasharray="%s"' % dash if dash else ''
    return ('<line x1="%g" y1="%g" x2="%g" y2="%g" stroke="currentColor" stroke-width="1.5" '
            'marker-end="url(#%s)"%s%s/>' % (x1, y1, x2, y2, uid, a, d))


def line(x1, y1, x2, y2, op='.5', w=1.5, dash=None):
    d = ' stroke-dasharray="%s"' % dash if dash else ''
    return ('<line x1="%g" y1="%g" x2="%g" y2="%g" stroke="currentColor" stroke-width="%g" '
            'opacity="%s"%s/>' % (x1, y1, x2, y2, w, op, d))


# ======================= h40  cerceveleme ================================
def fig40(step, uid):
    X, W, TOP, BOT, H = 60, 540, 44, 132, 30
    o = [head(660, 206, ALT40[step], uid)]
    # gonderen: uc mesaj
    o.append(txt(X - 14, TOP + 20, 'sent', 11, '.6', anchor='end'))
    for i in range(3):
        x = X + i * (W / 3)
        o.append(box(x, TOP, W / 3 - 4, H, r=5, fill='.08'))
        o.append(txt(x + W / 6 - 2, TOP + 20, 'message %d' % (i + 1), 11))
    o.append(txt(X + W / 2, TOP - 12, 'three send calls, ten bytes each', 11, '.55'))
    o.append(arr(X + W / 2, TOP + H + 6, X + W / 2, BOT - 8, uid, op='.35'))
    o.append(txt(X + W / 2 + 40, BOT - 22, 'TCP keeps the order &mdash; nothing else', 10.5, '.5'))
    # alan: adima gore parcalanma
    o.append(txt(X - 14, BOT + 20, 'recv', 11, '.6', anchor='end'))
    if step == 1:
        for i in range(3):
            x = X + i * (W / 3)
            o.append(box(x, BOT, W / 3 - 4, H, r=5, dash='5 4', op='.35'))
        o.append(txt(X + W / 2, BOT + 52, 'what you imagine happens', 11.5, '.6'))
    elif step == 2:
        o.append(box(X, BOT, W, H, r=5, fill='.08'))
        o.append(txt(X + W / 2, BOT + 20, 'one recv, thirty bytes', 11.5))
    elif step == 3:
        for i in range(30):
            x = X + i * (W / 30)
            o.append(box(x, BOT, W / 30 - 1.5, H, r=2, fill='.08'))
        o.append(txt(X + W / 2, BOT + 52, 'thirty recvs, one byte each &mdash; same stream', 11.5, '.6'))
    else:
        parts = [(0, 4, 'len'), (4, 14, 'payload'), (14, 18, 'len'), (18, 28, 'payload')]
        for a, b, lab in parts:
            x = X + a * (W / 30)
            w = (b - a) * (W / 30) - 3
            o.append(box(x, BOT, w, H, r=4, fill='.14' if lab == 'len' else '.05'))
            o.append(txt(x + w / 2, BOT + 20, lab, 10.5 if lab == 'len' else 11))
        o.append(txt(X + W / 2, BOT + 52,
                     'you impose the boundary; the length says where each message ends', 11.5, '.7'))
    o.append('</svg>')
    return ''.join(o)


ALT40 = {1: 'three messages as the sender imagines them arriving',
         2: 'all thirty bytes arrive in a single recv',
         3: 'the same thirty bytes arrive one at a time',
         4: 'a length prefix in front of each payload restores the boundaries'}
CAP40 = {
 1: 'You sent three messages, so it is natural to expect three arrivals. TCP never promised that.',
 2: 'They may arrive as <strong>one</strong> <code>recv</code> of thirty bytes. Nothing is wrong '
    'and nothing is lost &mdash; the byte order is all TCP guarantees.',
 3: 'Or as thirty <code>recv</code> calls of one byte. Identical stream, identical bytes, and code '
    'that assumed one-send-one-recv is now broken in a way that only shows under load.',
 4: 'So you impose the structure yourself. A four-byte length in front of each payload lets the '
    'receiver find the end of a message regardless of how the bytes were delivered &mdash; and '
    'the length must be bounded, or you have handed an attacker the allocation size.',
}


# ======================= h48  kapsam gudumlu fuzzing =====================
def fig48(step, uid):
    o = [head(660, 218, ALT48[step], uid)]
    NODES = [(180, 'magic?'), (320, 'header?'), (460, 'body?'), (600, 'bug')]
    reached = {1: 0, 2: 1, 3: 2, 4: 3}[step]
    Y = 66
    o.append(txt(96, Y + 5, 'input', 11.5, '.7'))
    o.append(box(46, Y - 18, 100, 34, r=6, fill='.08'))
    inp = {1: '"AAAA"', 2: '"CREC"', 3: '"CREC\\x01"', 4: '"CREC\\x01\\xff"'}[step]
    o.append(txt(96, Y + 36, inp, 10.5, '.8', mono=True))
    prev = 146
    for i, (x, lab) in enumerate(NODES):
        on = i <= reached
        o.append(arr(prev, Y - 1, x - 30, Y - 1, uid, op='.75' if on else '.2',
                     dash=None if on else '4 3'))
        o.append(box(x - 30, Y - 18, 62, 34, r=6, fill='.14' if on else None,
                     op=None if on else '.3'))
        o.append(txt(x + 1, Y + 5, lab, 10.5, None if on else '.4'))
        prev = x + 32
    if step == 1:
        o.append(txt(330, Y + 52, 'rejected at the first check &mdash; discarded', 11.5, '.75'))
    else:
        o.append(txt(330, Y + 52, 'reached new code &mdash; kept and mutated further', 11.5, '.75'))
    # korpus
    o.append(txt(46, 142, 'corpus', 11.5, '.7', bold=True, anchor='start'))
    keep = {1: [], 2: ['CREC'], 3: ['CREC', 'CREC\\x01'], 4: ['CREC', 'CREC\\x01', 'CREC\\x01\\xff']}[step]
    if not keep:
        o.append(txt(120, 142, 'empty', 11, '.45', anchor='start'))
    for i, k in enumerate(keep):
        x = 120 + i * 132
        o.append(box(x, 126, 124, 26, r=5))
        o.append(txt(x + 62, 143, k, 10, mono=True))
    if step == 4:
        o.append(txt(330, 194, 'the fuzzer learned the format without being told it', 12, bold=True))
    o.append('</svg>')
    return ''.join(o)


ALT48 = {1: 'a random input is rejected at the first check and discarded',
         2: 'an input that passes the magic check is kept in the corpus',
         3: 'a mutation of the kept input reaches deeper',
         4: 'the corpus now contains inputs that reach the bug'}
CAP48 = {
 1: 'Random bytes die at the first check. A fuzzer that only generated random input would spend '
    'its life here, which is why naive fuzzing finds nothing.',
 2: 'Coverage instrumentation changes it. This input reached a branch no earlier input reached, '
    'so it is <em>kept</em> &mdash; not because anyone told the fuzzer what a valid header is, but '
    'because the coverage counter moved.',
 3: 'Mutations of a kept input are tried next. One gets past the header check, reaches new code '
    'again, and is kept in turn.',
 4: 'A few million iterations of that and the corpus contains inputs that reach deep into the '
    'parser. The fuzzer derived the input format from nothing but which branches ran.',
}


# ======================= duragan: h45 soname =============================
def fig_h45(uid):
    o = [head(660, 186, 'three names linked in a chain, each used by a different tool', uid)]
    NAMES = [(30, 'libintarray.so', 'the linker, at build time', '-lintarray'),
             (252, 'libintarray.so.2', 'the dynamic loader, at run time', 'the soname'),
             (474, 'libintarray.so.2.3.0', 'the file system', 'the actual file')]
    for i, (x, nm, who, note) in enumerate(NAMES):
        w = 186 if i < 2 else 168
        o.append(box(x, 56, w, 36, r=6, fill='.10' if i == 2 else None,
                     dash='5 4' if i < 2 else None))
        o.append(txt(x + w / 2, 79, nm, 11, mono=True))
        o.append(txt(x + w / 2, 42, note, 10.5, '.55'))
        o.append(txt(x + w / 2, 112, who, 10.5, '.7'))
        if i < 2:
            o.append(arr(x + w + 4, 74, NAMES[i + 1][0] - 4, 74, uid, op='.6'))
    o.append(txt(140, 152, 'symbolic link', 10, '.5'))
    o.append(txt(362, 152, 'symbolic link', 10, '.5'))
    o.append(txt(330, 176, 'only the major version is recorded inside programs, so 2.4.0 replaces '
                '2.3.0 silently', 11, '.65'))
    o.append('</svg>')
    return ''.join(o)


# ======================= duragan: h29 baglama ============================
def fig_h29(uid):
    o = [head(640, 216, 'a static library is copied into the executable while a shared one stays a '
              'separate file loaded at run time', uid)]
    for side, (x, title) in enumerate(((36, 'static &mdash; libintarray.a'),
                                       (352, 'shared &mdash; libintarray.so'))):
        o.append(txt(x + 126, 34, title, 12, bold=True))
        o.append(box(x, 52, 252, 84, r=8))
        o.append(txt(x + 126, 70, 'app', 11, '.6'))
        o.append(box(x + 16, 80, 104, 44, r=6, fill='.08'))
        o.append(txt(x + 68, 106, 'main.o', 10.5, mono=True))
        if side == 0:
            o.append(box(x + 132, 80, 104, 44, r=6, fill='.14'))
            o.append(txt(x + 184, 106, 'intarray.o', 10.5, mono=True))
            o.append(txt(x + 126, 158, 'one file, nothing to find at run time', 11, '.7'))
            o.append(txt(x + 126, 178, 'a library fix needs a relink', 11, '.55'))
        else:
            o.append(box(x + 132, 80, 104, 44, r=6, dash='4 3', op='.6'))
            o.append(txt(x + 184, 100, 'reference', 10, '.6'))
            o.append(txt(x + 184, 116, 'to intarray', 10, '.6'))
            o.append(arr(x + 184, 128, x + 184, 150, uid, op='.55'))
            o.append(box(x + 116, 154, 136, 30, r=6, fill='.14'))
            o.append(txt(x + 184, 174, 'libintarray.so', 10.5, mono=True))
            o.append(txt(x + 60, 168, 'found by the', 10, '.55'))
            o.append(txt(x + 60, 182, 'loader', 10, '.55'))
    o.append(line(322, 40, 322, 196, '.15'))
    o.append('</svg>')
    return ''.join(o)


# =========================== montaj ======================================
STEPPERS = [
 (40, 'frame', fig40, CAP40, 4, 'Nothing preserves your message structure',
  'A stream has no message boundaries'),
 (48, 'cov', fig48, CAP48, 4, 'a search that learns the input format without being told it',
  'How coverage turns random bytes into a search'),
]
STATICS = [
 (45, fig_h45, 'it contains only the major version',
  'Two of the three are symbolic links. Each tool follows the chain as far as it needs and no '
  'further.'),
 (29, fig_h29, 'week 45 covers installing properly and embedding a search path',
  'The same code, two places to keep it. The choice is about who has to be present at run time '
  'and who has to relink when the library changes.'),
]


def strip_generated(lines):
    out, i = [], 0
    while i < len(lines):
        l = lines[i]
        if l.startswith('<div class="c-wk-step"') or l.startswith('<div class="c-wk-fig" data-gen='):
            depth = 0
            while i < len(lines):
                depth += lines[i].count('<div') - lines[i].count('</div>')
                i += 1
                if depth <= 0:
                    break
            if i < len(lines) and lines[i].startswith('<p class="c-wk-cap"'):
                i += 1
            while i < len(lines) and lines[i].strip() == '':
                i += 1
            continue
        out.append(l)
        i += 1
    return out


def build(wk, key, fn, caps, n, label):
    o = ['<div class="c-wk-step" role="group" aria-label="%s, step by step">' % label]
    for i in range(1, n + 1):
        o.append('  <input type="radio" name="w%d%s" id="w%d%s-%d"%s>'
                 % (wk, key, wk, key, i, ' checked' if i == 1 else ''))
    o.append('  <div class="c-wk-step-tabs"><b>Step</b>'
             + ''.join('<label for="w%d%s-%d">%d</label>' % (wk, key, i, i) for i in range(1, n + 1))
             + '</div>')
    o.append('  <div class="c-wk-step-panes">')
    for i in range(1, n + 1):
        o.append('    <figure>%s<figcaption>%s</figcaption></figure>'
                 % (fn(i, 'w%d%s%d' % (wk, key, i)), caps[i]))
    o.append('  </div>')
    o.append('</div>')
    return o


def insert(wk, anchor, block_lines):
    f = glob.glob(os.path.join(SITE, 'Week_%02d_*' % wk))[0]
    s = io.open(f, encoding='utf-8').read()
    lines = strip_generated(s.split('\n'))
    s2 = '\n'.join(lines)
    i = s2.find(anchor)
    if i < 0:
        print('  h%d: CAPA YOK' % wk)
        return False
    j = s2.find('</p>', i)
    j = s2.find('\n', j) + 1
    io.open(f, 'w', encoding='utf-8', newline='\n').write(
        s2[:j] + '\n' + '\n'.join(block_lines) + '\n' + s2[j:])
    return True


for wk, key, fn, caps, n, anchor, label in STEPPERS:
    if insert(wk, anchor, build(wk, key, fn, caps, n, label)):
        print('  h%d adimlayici: %d adim' % (wk, n))
for wk, fn, anchor, cap in STATICS:
    blk = ['<div class="c-wk-fig" data-gen="1">%s</div>' % fn('w%dfig' % wk),
           '<p class="c-wk-cap" data-gen="1">%s</p>' % cap]
    if insert(wk, anchor, blk):
        print('  h%d duragan figur' % wk)
