# -*- coding: utf-8 -*-
"""Bes hafta notuna adimli figur ekler (h18, h19, h20, h33, h41)."""
import io, os, re, glob, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SITE = os.path.join(REPO, 'files', 'c')


# ---------- ortak SVG yardimcilari -----------------------------------------
def head(w, h, alt, uid):
    return ('<svg viewBox="0 0 %d %d" role="img" aria-label="%s" xmlns="http://www.w3.org/2000/svg">'
            '<defs><marker id="%s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" '
            'markerHeight="6" orient="auto-start-reverse">'
            '<path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>' % (w, h, alt, uid))


def box(x, y, w, h, op=None, dash=None, r=8):
    a = ' opacity="%s"' % op if op else ''
    d = ' stroke-dasharray="%s"' % dash if dash else ''
    return ('<rect x="%g" y="%g" width="%g" height="%g" rx="%g" fill="none" stroke="currentColor" '
            'stroke-width="1.5"%s%s/>' % (x, y, w, h, r, a, d))


def txt(x, y, s, size=12.5, op=None, bold=False, anchor='middle'):
    a = ' opacity="%s"' % op if op else ''
    b = ' font-weight="700"' if bold else ''
    return ('<text x="%g" y="%g" fill="currentColor" font-size="%g" text-anchor="%s" '
            'font-family="inherit"%s%s>%s</text>' % (x, y, size, anchor, a, b, s))


def arr(x1, y1, x2, y2, uid, op=None, dash=None):
    a = ' opacity="%s"' % op if op else ''
    d = ' stroke-dasharray="%s"' % dash if dash else ''
    return ('<line x1="%g" y1="%g" x2="%g" y2="%g" stroke="currentColor" stroke-width="1.5" '
            'marker-end="url(#%s)"%s%s/>' % (x1, y1, x2, y2, uid, a, d))


def cells(x, y, n, w, h, vals, dim=False, uid=''):
    """Bitisik hucrelerden olusan blok."""
    o = ['<g%s>' % (' opacity=".3"' if dim else '')]
    o.append(box(x, y, w * n, h))
    for i in range(1, n):
        o.append('<line x1="%g" y1="%g" x2="%g" y2="%g" stroke="currentColor" stroke-width="1.5" '
                 'opacity=".55"/>' % (x + i * w, y, x + i * w, y + h))
    for i, v in enumerate(vals):
        if v is not None:
            o.append(txt(x + i * w + w / 2, y + h / 2 + 4.5, str(v)))
    o.append('</g>')
    return ''.join(o)


# =========================================================================
# h19 — realloc
# =========================================================================
def fig19(step, uid):
    OLDX, OLDY, NEWY, CW, CH = 168, 44, 122, 46, 34
    o = [head(660, 186, ALT19[step], uid)]
    live_old = step <= 2
    # eski blok
    if live_old:
        o.append(cells(OLDX, OLDY, 4, CW, CH, [10, 20, 30, 40]))
        o.append(txt(OLDX + 2 * CW, OLDY - 10, 'capacity 4', 11, '.6'))
    else:
        o.append(cells(OLDX, OLDY, 4, CW, CH, [None] * 4, dim=True))
        o.append(txt(OLDX + 2 * CW, OLDY - 10, 'returned to the allocator', 11, '.45'))
    # yeni blok
    if step >= 2:
        vals = [10, 20, 30, 40] + [None] * 4
        o.append(cells(OLDX, NEWY, 8, CW, CH, vals))
        o.append(txt(OLDX + 4 * CW, NEWY + CH + 16, 'capacity 8', 11, '.6'))
    # isaretciler
    o.append(box(20, OLDY, 78, CH))
    o.append(txt(59, OLDY + CH + 15, 'values', 11.5, '.75', bold=True))
    if step <= 3:
        o.append('<circle cx="59" cy="%g" r="3" fill="currentColor" stroke="none"/>' % (OLDY + CH / 2))
        o.append(arr(98, OLDY + CH / 2, OLDX - 4, OLDY + CH / 2, uid,
                     op='.3' if step == 3 else None, dash='4 3' if step == 3 else None))
    if step >= 2:
        yy = NEWY if step < 4 else OLDY
        if step < 4:
            o.append(box(20, NEWY, 78, CH))
            o.append(txt(59, NEWY + CH + 16, 'bigger', 11.5, '.75', bold=True))
            o.append('<circle cx="59" cy="%g" r="3" fill="currentColor" stroke="none"/>' % (NEWY + CH / 2))
            o.append(arr(98, NEWY + CH / 2, OLDX - 4, NEWY + CH / 2, uid))
    if step == 4:
        o.append('<circle cx="59" cy="%g" r="3" fill="currentColor" stroke="none"/>' % (OLDY + CH / 2))
        o.append('<path d="M98,%g C 130,%g 130,%g %g,%g" fill="none" stroke="currentColor" '
                 'stroke-width="1.5" marker-end="url(#%s)"/>'
                 % (OLDY + CH / 2, OLDY + CH / 2, NEWY + CH / 2, OLDX - 4, NEWY + CH / 2, uid))
    if step == 3:
        o.append(txt(OLDX + 2 * CW, OLDY + CH / 2 + 5, 'dangling', 11.5, '.75', bold=True))
    o.append('</svg>')
    return ''.join(o)


ALT19 = {
 1: 'values points at a full block of four integers',
 2: 'a larger block holds a copy of the four integers while the old block still exists',
 3: 'the old block has gone back to the allocator and any pointer into it is dangling',
 4: 'values now points at the new block of eight',
}
CAP19 = {
 1: 'Four slots, four in use. The next append has nowhere to go.',
 2: '<code>realloc</code> finds a block twice the size and copies the contents across. For a '
    'moment both exist, and <code>bigger</code> names the new one.',
 3: 'It then releases the old block. This is the part that bites: <em>any other pointer you were '
    'holding into the old block is now dangling</em>, even though <code>values</code> still '
    'happens to hold that address.',
 4: '<code>values = bigger</code>. Note the order &mdash; the temporary existed so that a failed '
    '<code>realloc</code> would have left the original block reachable and freeable.',
}


# =========================================================================
# h18 — ozyineleme cerceveleri
# =========================================================================
FR = [(4, 'factorial(4)'), (3, 'factorial(3)'), (2, 'factorial(2)'), (1, 'factorial(1)')]


def fig18(step, uid):
    X, W, H, Y0, GAP = 176, 236, 32, 40, 38
    shown = {1: 1, 2: 2, 3: 4, 4: 4, 5: 2, 6: 0}[step]
    ret = {4: {3: '1'}, 5: {1: '6', 2: '2'}, 6: {}}.get(step, {})
    o = [head(600, 214, ALT18[step], uid)]
    for i in range(4):
        if i >= shown:
            continue
        y = Y0 + i * GAP
        popped = (step == 5 and i >= 2) or (step == 6)
        o.append(box(X, y, W, H, op='.3' if popped else None))
        o.append(txt(X + 84, y + H / 2 + 4.5, FR[i][1], 12, '.3' if popped else None))
        o.append(txt(X + 190, y + H / 2 + 4.5, 'n = %d' % FR[i][0], 11.5, '.4'))
        if i in ret:
            o.append(txt(X + W + 54, y + H / 2 + 4.5, 'returns ' + ret[i], 11.5, '.8'))
    if step <= 3:
        o.append(txt(X - 54, Y0 + 20, 'calls', 11, '.55'))
        o.append(arr(X - 54, Y0 + 30, X - 54, Y0 + (shown - 1) * GAP + 26, uid, op='.5'))
    if step >= 4:
        top = Y0 + (max(shown - 1, 0)) * GAP
        o.append(txt(X - 54, Y0 + 20, 'returns', 11, '.55'))
        o.append(arr(X - 54, Y0 + 3 * GAP + 6, X - 54, Y0 + 24, uid, op='.5'))
    if step == 6:
        o.append(txt(300, 110, '24', 26, bold=True))
        o.append(txt(300, 134, 'the stack is empty again', 11.5, '.6'))
    o.append('</svg>')
    return ''.join(o)


ALT18 = {
 1: 'one frame on the stack for factorial of four',
 2: 'two frames, neither has multiplied anything',
 3: 'four frames exist at once and all are suspended',
 4: 'the base case returns one',
 5: 'two frames have been popped as the multiplications happen',
 6: 'the stack is empty and the result is twenty-four',
}
CAP18 = {
 1: '<code>factorial(4)</code> is called. Its frame holds <code>n</code> and the address to '
    'return to, and then it waits.',
 2: 'It calls <code>factorial(3)</code>. Still nothing has been multiplied &mdash; the first '
    'frame is suspended, holding its own <code>n</code>.',
 3: 'All four frames exist at once. This is the memory cost of recursion: it is proportional to '
    'the <em>depth</em>, and it is paid before any answer comes back.',
 4: '<code>factorial(1)</code> is the base case. It returns 1 without calling anything, and its '
    'frame is popped.',
 5: 'Now the work starts. <code>2 &times; 1 = 2</code>, then <code>3 &times; 2 = 6</code>. The '
    'multiplications happen on the way <em>out</em>.',
 6: '<code>4 &times; 6 = 24</code> and the last frame goes. Nothing was computed on the way down; '
    'everything was computed while unwinding.',
}


# =========================================================================
# h20 — serbest birakma sonrasi kullanim
# =========================================================================
def fig20(step, uid):
    BX, BY, BW, BH = 250, 56, 210, 40
    o = [head(640, 168, ALT20[step], uid)]
    freed = step >= 2
    reused = step >= 4
    o.append(box(BX, BY, BW, BH, op='.3' if freed and not reused else None,
                 dash='5 4' if freed and not reused else None))
    o.append('<line x1="%g" y1="%g" x2="%g" y2="%g" stroke="currentColor" stroke-width="1.5" '
             'opacity="%s"/>' % (BX + 120, BY, BX + 120, BY + BH, '.3' if freed and not reused else '.55'))
    if reused:
        o.append(txt(BX + 60, BY + BH / 2 + 4.5, '0x5f3a'))
        o.append(txt(BX + 165, BY + BH / 2 + 4.5, '&#8230;', 12, '.6'))
        o.append(txt(BX + BW / 2, BY - 10, "somebody else's object", 11, '.6'))
    else:
        o.append(txt(BX + 60, BY + BH / 2 + 4.5, '42', 12.5, '.3' if freed else None))
        o.append(txt(BX + 165, BY + BH / 2 + 4.5, 'next', 11.5, '.3' if freed else '.55'))
        o.append(txt(BX + BW / 2, BY - 10,
                     'owned by the allocator' if freed else 'your Node', 11,
                     '.5' if freed else '.6'))
    # isaretci
    nulled = (step == 5)
    o.append(box(34, BY, 86, BH))
    o.append(txt(77, BY + BH + 15, 'node', 11.5, '.75', bold=True))
    if nulled:
        o.append(txt(77, BY + BH / 2 + 4.5, 'NULL', 12))
    else:
        o.append('<circle cx="77" cy="%g" r="3" fill="currentColor" stroke="none"/>' % (BY + BH / 2))
        o.append(arr(120, BY + BH / 2, BX - 4, BY + BH / 2, uid,
                     op='.45' if freed else None, dash='4 3' if freed else None))
    if step == 3:
        o.append(txt(BX + BW / 2, BY + BH + 28, 'reads 42 &mdash; and looks fine', 11.5, '.8'))
    if step == 4:
        o.append(txt(BX + BW / 2, BY + BH + 28, 'reads 0x5f3a', 11.5, '.8'))
    if step == 5:
        o.append(txt(BX + BW / 2, BY + BH + 28, 'a later use crashes here, not somewhere else',
                     11.5, '.8'))
    o.append('</svg>')
    return ''.join(o)


ALT20 = {
 1: 'node points at a live block holding forty-two',
 2: 'the block has been freed but node still holds its address',
 3: 'reading through the dangling pointer still returns forty-two',
 4: 'the allocator has reused the block and the read returns foreign data',
 5: 'node has been set to null so a later use fails immediately',
}
CAP20 = {
 1: 'A live <code>Node</code> on the heap. <code>node</code> holds its address.',
 2: '<code>free(node)</code>. The block belongs to the allocator again &mdash; but '
    '<code>node</code> was not changed, so it still holds the address. It is now dangling.',
 3: '<code>node-&gt;value</code> reads 42 and everything appears to work, because the allocator '
    'has not handed the block out yet. This is exactly why the bug survives testing.',
 4: 'A later <code>malloc</code> hands the same block to something else. Now the read returns '
    "somebody else's data, and a write corrupts it &mdash; far from the line that is at fault.",
 5: 'The habit that prevents all of this: <code>node = NULL;</code> immediately after '
    '<code>free</code>. A later use then crashes instantly, at the guilty line.',
}


# =========================================================================
# h33 — yeniden boyutlandirma
# =========================================================================
def fig33(step, uid):
    o = [head(640, 232, ALT33[step], uid)]
    small = step <= 2
    BX, BY, BW, BH = 60, 40, 118, 30
    if step <= 3:
        n = 4
        for i in range(n):
            y = BY + i * (BH + 6)
            o.append(box(BX, y, BW, BH, r=6))
            o.append(txt(BX + 18, y + BH / 2 + 4.5, str(i), 11.5, '.55'))
        o.append(txt(BX + BW / 2, BY - 12, '4 buckets', 11, '.6'))
        ENT = {0: ['ash'], 1: ['bee'], 3: ['cod']} if step == 1 else {0: ['ash', 'dov'], 1: ['bee'], 3: ['cod']}
        for b, names in ENT.items():
            y = BY + b * (BH + 6)
            for j, nm in enumerate(names):
                ex = BX + BW + 20 + j * 74
                o.append(arr(ex - 20, y + BH / 2, ex - 4, y + BH / 2, uid, op='.6'))
                o.append(box(ex, y, 62, BH, r=6))
                o.append(txt(ex + 31, y + BH / 2 + 4.5, nm, 11.5))
        if step <= 2:        # adim 3'te yeni dizi geliyor, yuk faktoru yeri degil
            lf = '3 / 4 = 0.75' if step == 1 else '4 / 4 = 1.0'
            o.append(txt(190, 210, 'load factor ' + lf, 11.5, '.7'))
    if step >= 3:
        NX = 372 if step == 3 else 60   # eski zincirle carpismasin
        for i in range(8):
            y = 30 + i * 24
            o.append(box(NX, y, 104, 20, r=5))
            o.append(txt(NX + 16, y + 14, str(i), 10.5, '.55'))
        o.append(txt(NX + 52, 20, '8 buckets', 11, '.6'))
        if step >= 4:
            PLACE = {1: 'bee', 2: 'ash', 5: 'cod', 6: 'dov'}
            for b, nm in PLACE.items():
                y = 30 + b * 24
                o.append(arr(NX + 104, y + 10, NX + 124, y + 10, uid, op='.6'))
                o.append(box(NX + 124, y, 58, 20, r=5))
                o.append(txt(NX + 153, y + 14, nm, 11))
        if step == 5:
            o.append(txt(430, 212, 'load factor 4 / 8 = 0.5', 11.5, '.7'))
    o.append('</svg>')
    return ''.join(o)


ALT33 = {
 1: 'four buckets hold three entries',
 2: 'a fourth entry has made one chain two long',
 3: 'a new array of eight empty buckets sits beside the old four',
 4: 'every entry has been rehashed into the new array and landed in a different bucket',
 5: 'the old array is gone and the table now has eight buckets',
}
CAP33 = {
 1: 'Three entries in four buckets. Load factor 0.75, chains of one, lookup effectively constant.',
 2: 'A fourth entry arrives and lands in bucket 0. Load factor 1.0, and one chain is now two long. '
    'Keep going and the table degrades toward a list.',
 3: 'Double the bucket count: allocate eight, all empty. Nothing has moved yet.',
 4: 'Now rehash <em>every</em> entry. This is the part people forget: the index is '
    '<code>hash(key) % bucket_count</code>, so changing the count changes where every key belongs. '
    'None of the four stays put.',
 5: 'The old array is freed. Load factor is back to 0.5 and chains are short again. Doubling is '
    'what makes this O(1) amortized, exactly as in week 19&rsquo;s growable array.',
}


# =========================================================================
# h41 — veri yarisi
# =========================================================================
def fig41(step, uid):
    o = [head(640, 200, ALT41[step], uid)]
    AX, BX, CX, Y = 44, 452, 248, 74
    o.append(box(CX, Y, 144, 42))
    o.append(txt(CX + 72, Y - 10, 'counter (shared)', 11, '.6'))
    cval = {1: 0, 2: 0, 3: 0, 4: 0, 5: 1, 6: 1}[step]
    o.append(txt(CX + 72, Y + 27, str(cval), 17, bold=True))
    areg = {1: None, 2: 0, 3: 0, 4: 1, 5: 1, 6: 1}[step]
    breg = {1: None, 2: None, 3: 0, 4: 1, 5: 1, 6: 1}[step]
    for x, lab, reg in ((AX, 'thread A', areg), (BX, 'thread B', breg)):
        o.append(box(x, Y, 144, 42))
        o.append(txt(x + 72, Y - 10, lab, 11, '.6'))
        o.append(txt(x + 72, Y + 27, 'reg = %d' % reg if reg is not None else '&#8212;',
                     13 if reg is not None else 12, None if reg is not None else '.4'))
    ACT = {2: ('A', 'load'), 3: ('B', 'load'), 4: ('AB', 'add'),
           5: ('A', 'store'), 6: ('B', 'store')}
    if step in ACT:
        who, what = ACT[step]
        if 'A' in who:
            if what == 'load':
                o.append(arr(CX - 4, Y + 21, AX + 148, Y + 21, uid))
            elif what == 'store':
                o.append(arr(AX + 148, Y + 21, CX - 4, Y + 21, uid))
        if 'B' in who:
            if what == 'load':
                o.append(arr(CX + 148, Y + 21, BX - 4, Y + 21, uid))
            elif what == 'store':
                o.append(arr(BX - 4, Y + 21, CX + 148, Y + 21, uid))
        if what == 'add':
            for x in (AX, BX):
                o.append(txt(x + 72, Y + 62, '+1', 12.5, '.8', bold=True))
    if step == 6:
        o.append(txt(320, 176, 'two increments, one result', 12.5, bold=True))
    o.append('</svg>')
    return ''.join(o)


ALT41 = {
 1: 'counter holds zero and neither thread has read it',
 2: 'thread A has loaded zero',
 3: 'thread B has also loaded zero',
 4: 'both threads have added one to their own copy',
 5: 'thread A has stored one',
 6: 'thread B stores one over it and an increment is lost',
}
CAP41 = {
 1: '<code>counter</code> is 0. Both threads are about to run <code>counter++</code>.',
 2: '<code>counter++</code> is not one operation. It is three: <strong>load</strong>, add, store. '
    'Thread A loads 0 into a register.',
 3: 'Before A gets any further, thread B loads &mdash; and reads 0 as well, because A has not '
    'stored anything yet.',
 4: 'Each thread adds one to <em>its own copy</em>. Neither can see the other.',
 5: 'A stores its result. <code>counter</code> is 1, which is correct so far.',
 6: 'B stores its result over the top. <code>counter</code> is still 1 &mdash; two increments '
    'happened and one was lost. Run this four million times and the total is not four million.',
}


# =========================================================================
FIGS = [
 (19, 'realloc', fig19, CAP19, 4, 'Always use a temporary, as above.',
  'Growing a block, step by step'),
 (18, 'frames', fig18, CAP18, 6, 'which is why the memory cost is proportional to the depth.',
  'Four calls down, four multiplications back'),
 (20, 'uaf', fig20, CAP20, 5, 'which is why it survives testing.',
  'Use after free, from the moment it happens'),
 (33, 'rehash', fig33, CAP33, 5, 'the doubling makes insertion O(1) amortized.',
  'Doubling the table and rehashing'),
 (41, 'race', fig41, CAP41, 6, 'Reasoning about which interleaving you got is already the wrong question.',
  'Losing an update, one operation at a time'),
]


def strip_generated(lines):
    """Bu betigin urettigi bloklari satir bazli, <div> derinligi sayarak siler.
    Regex ile silmek komsu bolumleri de goturebiliyor -- once goturdu."""
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
    return '\n'.join(o) + '\n'


for wk, key, fn, caps, n, anchor, label in FIGS:
    f = glob.glob(os.path.join(SITE, 'Week_%02d_*' % wk))[0]
    s = io.open(f, encoding='utf-8').read()
    s = '\n'.join(strip_generated(s.split('\n')))
    i = s.find(anchor)
    if i < 0:
        print('  h%d: CAPA BULUNAMADI -> %r' % (wk, anchor[:40]))
        continue
    j = s.find('</p>', i)
    j = s.find('\n', j) + 1
    htm = build(wk, key, fn, caps, n, label)
    s = s[:j] + '\n' + htm + s[j:]
    io.open(f, 'w', encoding='utf-8', newline='\n').write(s)
    print('  h%d: %d adim, %.1f KB' % (wk, n, len(htm) / 1024))
