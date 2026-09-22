# -*- coding: utf-8 -*-
"""Kalan figurler: h7 h53 adimlayici; h28 h30 h46 duragan."""
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


# ===================== h7  isaretli / isaretsiz ==========================
def fig7(step, uid):
    X, Y, CW, CH = 96, 58, 27, 32
    N = 16
    o = [head(640, 178, ALT7[step], uid)]
    o.append(box(X, Y, CW * N, CH, r=5))
    for i in range(1, N):
        o.append(line(X + i * CW, Y, X + i * CW, Y + CH, '.35'))
    for i in range(N):
        o.append(txt(X + i * CW + CW / 2, Y + CH / 2 + 4.5, '1', 12, mono=True))
    o.append(txt(X - 14, Y + CH / 2 + 4.5, 'bits', 11, '.6', anchor='end'))
    o.append(txt(X + CW * N / 2, Y - 14, 'the same sixteen bits, unchanged in every step', 11, '.55'))
    lab = {1: ('int a', '&minus;1'), 2: ('unsigned', '65 535'), 3: ('unsigned', '65 535')}[step]
    o.append(txt(X + CW * N / 2, Y + CH + 26, '%s reads this as <tspan font-weight="700">%s</tspan>'
                 % lab, 13))
    if step == 2:
        o.append(txt(X + CW * N / 2, Y + CH + 50,
                     'one operand is unsigned, so a is converted &mdash; no bits move', 11.5, '.7'))
    if step == 3:
        o.append(txt(X + CW * N / 2, Y + CH + 52, 'a &lt; b becomes 65 535 &lt; 1', 13, bold=True))
        o.append(txt(X + CW * N / 2, Y + CH + 74, 'false &mdash; and the language is right', 11.5, '.7'))
    o.append('</svg>')
    return ''.join(o)


ALT7 = {1: 'sixteen bits read as minus one',
        2: 'the same bits read as sixty-five thousand five hundred and thirty-five',
        3: 'the comparison is false because the signed value became a large unsigned one'}
CAP7 = {
 1: '<code>int a = -1;</code> &mdash; in two&rsquo;s complement that is every bit set. (Sixteen '
    'bits drawn; a real <code>int</code> has thirty-two.)',
 2: 'Now compare it with an <code>unsigned</code>. Both operands have rank <code>int</code> and '
    'one is unsigned, so <code>a</code> is converted to unsigned. <strong>Nothing in memory '
    'changes.</strong> Only the reading does.',
 3: 'So <code>a &lt; b</code> asks whether 65&nbsp;535 is less than 1. It is not. The comparison '
    'is false, the compiler is correct, and the bug is in the program &mdash; which is exactly why '
    'it compiles without complaint.',
}


# ===================== h53  sabit bloklu havuz ===========================
def fig53(step, uid):
    X, Y, BW, BH, GAP = 150, 54, 96, 40, 16
    N = 4
    o = [head(640, 190, ALT53[step], uid)]
    # hangi bloklar bos (free list uzerinde) -- head en sondan baslar
    free = {1: [3, 2, 1, 0], 2: [2, 1, 0], 3: [1, 0], 4: [1, 0, 3], 5: []}[step]
    used = [i for i in range(N) if i not in free]
    for i in range(N):
        x = X + i * (BW + GAP)
        infree = i in free
        o.append(box(x, Y, BW, BH, r=6, fill=None if infree else '.10'))
        o.append(txt(x + BW / 2, Y + BH / 2 + 4.5, 'free' if infree else 'in use', 11.5,
                     '.55' if infree else None))
        o.append(txt(x + BW / 2, Y + BH + 17, 'block %d' % i, 10.5, '.5'))
    # free list zinciri
    o.append(txt(X - 74, Y + BH / 2 + 4.5,
                 'free_list', 11.5, '.75', bold=True, anchor='start'))
    if free:
        hx = X + free[0] * (BW + GAP) + BW / 2
        o.append(arr(X - 12, Y + BH / 2, hx - 6 if hx < X else X + free[0] * (BW + GAP) - 4,
                     Y + BH / 2, uid, op='.7'))
        pass
    if not free:
        o.append(txt(X + BW / 2, Y - 24, 'NULL', 12, '.8'))
        o.append(arr(X - 12, Y + BH / 2 - 4, X + BW / 2 - 18, Y - 20, uid, op='.6'))
    if free:
        for a, b in zip(free, free[1:]):
            ax = X + a * (BW + GAP) + BW / 2
            bx = X + b * (BW + GAP) + BW / 2
            o.append('<path d="M%g,%g C %g,%g %g,%g %g,%g" fill="none" stroke="currentColor" '
                     'stroke-width="1.5" opacity=".55" marker-end="url(#%s)"/>'
                     % (ax, Y, ax, Y - 26, bx, Y - 26, bx, Y - 4, uid))
    if step == 5:
        o.append(txt(320, 168, 'pool_alloc returns NULL &mdash; but nothing is fragmented', 12, '.85'))
    else:
        o.append(txt(320, 168, '%d free, %d in use &mdash; every block the same size'
                     % (len(free), len(used)), 11.5, '.6'))
    o.append('</svg>')
    return ''.join(o)


ALT53 = {1: 'all four blocks are on the free list',
         2: 'one block has been handed out',
         3: 'two blocks are in use',
         4: 'a freed block is pushed back onto the head of the list',
         5: 'every block is in use and the free list is empty'}
CAP53 = {
 1: '<code>pool_init</code> threads every block onto a free list, using the first bytes of each '
    'block to hold the link. No extra bookkeeping memory at all.',
 2: '<code>pool_alloc</code> pops the head and returns it. Constant time, always &mdash; there is '
    'no search, because every block fits every request.',
 3: 'Another allocation pops the next one. Note what cannot happen here: two different sizes '
    'leaving an unusable gap between them.',
 4: '<code>pool_free</code> pushes the block back onto the <em>head</em>. It does not matter which '
    'block it was or where it sits in the array.',
 5: 'Exhaustion is the one failure mode, and it is honest: <code>pool_alloc</code> returns '
    '<code>NULL</code> and you handle it. Compare that with <code>malloc</code> on a device, where '
    'fragmentation can make a request fail while plenty of memory is free.',
}


# ===================== duragan figurler ==================================
def fig_h30(uid):
    o = [head(640, 212, 'an array of function pointers indexes into three handlers', uid)]
    X, Y, RW, RH = 44, 52, 230, 34
    rows = [('"add"', 'add'), ('"sub"', 'sub'), ('"mul"', 'mul')]
    o.append(txt(X + RW / 2, 34, 'commands[]', 11.5, '.7', bold=True))
    for i, (name, fn) in enumerate(rows):
        y = Y + i * (RH + 10)
        o.append(box(X, y, RW, RH, r=6))
        o.append(line(X + 108, y, X + 108, y + RH, '.35'))
        o.append(txt(X + 54, y + RH / 2 + 4.5, name, 11.5, mono=True))
        o.append(txt(X + 169, y + RH / 2 + 4.5, 'handler', 11, '.55'))
        o.append(arr(X + RW, y + RH / 2, 420, y + RH / 2, uid, op='.6'))
        o.append(box(420, y, 150, RH, r=6))
        o.append(txt(495, y + RH / 2 + 4.5, 'int %s(int,int)' % fn, 11, mono=True))
    o.append(txt(320, 192, 'adding a command is one line in one place', 11.5, '.7'))
    o.append('</svg>')
    return ''.join(o)


def fig_h28(uid):
    o = [head(640, 196, 'the header shows a name while the definition stays in the source file', uid)]
    o.append(line(320, 26, 320, 178, '.25', dash='6 5'))
    o.append(txt(160, 34, 'what the caller sees', 11.5, '.7', bold=True))
    o.append(txt(480, 34, 'what the library knows', 11.5, '.7', bold=True))
    o.append(txt(320, 190, 'buffer.h', 10.5, '.5'))
    o.append(box(40, 52, 240, 34, r=6))
    o.append(txt(160, 74, 'typedef struct Buffer Buffer;', 10.5, mono=True))
    o.append(txt(160, 104, 'a name, no layout', 11, '.6'))
    for i, sig in enumerate(('buffer_create', 'buffer_append', 'buffer_destroy')):
        o.append(txt(160, 126 + i * 17, sig + '(...)', 10.5, '.75', mono=True))
    o.append(box(360, 52, 240, 96, r=6))
    o.append(txt(480, 72, 'struct Buffer {', 10.5, mono=True, anchor='middle'))
    for i, f in enumerate(('int *data;', 'size_t count;', 'size_t capacity;')):
        o.append(txt(480, 90 + i * 17, f, 10.5, '.75', mono=True))
    o.append(txt(480, 142, '};', 10.5, mono=True))
    o.append(txt(480, 168, 'change it freely &mdash; nobody can depend on it', 11, '.6'))
    o.append('</svg>')
    return ''.join(o)


def fig_h46(uid):
    o = [head(640, 212, 'the first six integer arguments travel in registers and the rest on the stack', uid)]
    REGS = ['rdi', 'rsi', 'rdx', 'rcx', 'r8', 'r9']
    X, Y, W, H = 40, 60, 88, 34
    o.append(txt(X, 26, 'f(a, b, c, d, e, f, g, h)', 12, '.75', anchor='start', mono=True))
    for i, r in enumerate(REGS):
        x = X + i * (W + 8)
        o.append(box(x, Y, W, H, r=6, fill='.08'))
        o.append(txt(x + W / 2, Y + H / 2 + 4.5, r, 11.5, mono=True))
        o.append(txt(x + W / 2, Y - 10, 'arg %d' % (i + 1), 10, '.55'))
    o.append(txt(X, Y + H + 32, 'arguments 7 and 8', 11, '.6', anchor='start'))
    o.append(box(X, Y + H + 44, 180, 30, r=6, dash='5 4', op='.7'))
    o.append(txt(X + 90, Y + H + 64, 'on the stack', 11.5, '.75'))
    o.append(box(X + 236, Y + H + 44, 150, 30, r=6, fill='.08'))
    o.append(txt(X + 311, Y + H + 64, 'rax', 11.5, mono=True))
    o.append(txt(X + 311, Y + H + 32, 'return value', 11, '.6'))
    o.append(txt(320, 196, 'fixed per platform &mdash; which is the only reason Python, Rust and '
                'C++ can call this at all', 11, '.6'))
    o.append('</svg>')
    return ''.join(o)


# =========================== montaj ======================================
STEPPERS = [
 (7, 'su', fig7, CAP7, 3, 'The bug is in the program, not the compiler.',
  'The same bits, read two ways'),
 (53, 'pool', fig53, CAP53, 5, 'every block is the same size, so any free block satisfies any request',
  'A fixed-block pool, allocation by allocation'),
]
STATICS = [
 (30, fig_h30, 'a plugin can extend it at run time',
  'The switch becomes data: one row per command, and the row carries the code to run.'),
 (28, fig_h28, 'and every caller still compiles without modification',
  'The header is the boundary. Everything to its right can change without recompiling anything to '
  'its left.'),
 (46, fig_h46, 'which is what lets code from different compilers and different languages link together',
  'Nothing in the C source says any of this. The ABI does, and every language that calls C obeys it.'),
]


def strip_generated(lines):
    """Uretilmis bloklari satir temelli cikar -- regex ile fazla silme riski yok."""
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
            # varsa hemen ardindaki uretilmis alt yazi
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
    before = len(s)
    lines = strip_generated(s.split('\n'))
    s2 = '\n'.join(lines)
    i = s2.find(anchor)
    if i < 0:
        print('  h%d: CAPA YOK -> %r' % (wk, anchor[:44]))
        return None
    j = s2.find('</p>', i)
    j = s2.find('\n', j) + 1
    out = s2[:j] + '\n' + '\n'.join(block_lines) + '\n' + s2[j:]
    io.open(f, 'w', encoding='utf-8', newline='\n').write(out)
    return len(out) - before


for wk, key, fn, caps, n, anchor, label in STEPPERS:
    d = insert(wk, anchor, build(wk, key, fn, caps, n, label))
    if d is not None:
        print('  h%d adimlayici: %d adim (%+d bayt)' % (wk, n, d))

for wk, fn, anchor, cap in STATICS:
    blk = ['<div class="c-wk-fig" data-gen="1">%s</div>' % fn('w%dfig' % wk),
           '<p class="c-wk-cap" data-gen="1">%s</p>' % cap]
    d = insert(wk, anchor, blk)
    if d is not None:
        print('  h%d duragan figur (%+d bayt)' % (wk, d))
