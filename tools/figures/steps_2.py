# -*- coding: utf-8 -*-
"""Bes adimlayici (h25 h34 h39 h51 h54) + dort duragan figur (h26 h27 h47 h50)."""
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


def line(x1, y1, x2, y2, op='.5', w=1.5, dash=None):
    d = ' stroke-dasharray="%s"' % dash if dash else ''
    return ('<line x1="%g" y1="%g" x2="%g" y2="%g" stroke="currentColor" stroke-width="%g" '
            'opacity="%s"%s/>' % (x1, y1, x2, y2, w, op, d))


def row(x, y, n, cw, ch, vals, hi=(), dim=()):
    o = [box(x, y, cw * n, ch, r=5)]
    for i in range(1, n):
        o.append(line(x + i * cw, y, x + i * cw, y + ch, '.45'))
    for i in range(n):
        if i in hi:
            o.append('<rect x="%g" y="%g" width="%g" height="%g" fill="currentColor" '
                     'fill-opacity=".12"/>' % (x + i * cw + 1, y + 1, cw - 2, ch - 2))
        if i < len(vals) and vals[i] is not None:
            o.append(txt(x + i * cw + cw / 2, y + ch / 2 + 4.5, str(vals[i]), 12,
                         '.3' if i in dim else None))
    return ''.join(o)


# =========================== h54  oncelik tersinmesi ======================
def fig54(step, uid):
    LX, T0, H = 12, 96, 26
    Y = {'High': 44, 'Mid': 86, 'Low': 128}
    o = [head(660, 186, ALT54[step], uid)]
    for k, y in Y.items():
        o.append(txt(LX + 34, y + H / 2 + 4.5, k, 11.5, '.7', anchor='middle'))
        o.append(line(T0, y + H / 2, 640, y + H / 2, '.12'))
    def bar(k, a, b, blocked=False, note=None):
        y = Y[k]
        s = [box(a, y, b - a, H, r=5, dash='5 4' if blocked else None,
                 op='.45' if blocked else None, fill=None if blocked else '.10')]
        if note:
            s.append(txt((a + b) / 2, y + H / 2 + 4.5, note, 11, '.75' if blocked else None))
        return ''.join(s)
    if step == 1:
        o.append(bar('Low', T0, 236, note='holds M'))
    elif step == 2:
        o.append(bar('Low', T0, 236, note='holds M'))
        o.append(bar('High', 236, 430, blocked=True, note='blocked on M'))
    elif step >= 3 and step <= 4:
        o.append(bar('Low', T0, 236, note='holds M'))
        o.append(bar('Low', 236, 430, blocked=True, note='preempted'))
        o.append(bar('Mid', 236, 430 if step == 3 else 580, note='runs'))
        o.append(bar('High', 236, 430 if step == 3 else 580, blocked=True, note='blocked on M'))
        if step == 4:
            o.append(txt(408, 172, 'High waits behind Mid, which never touches M', 11.5, '.8'))
    else:
        o.append(bar('Low', T0, 236, note='holds M'))
        o.append(bar('Low', 236, 330, note='inherits High'))
        o.append(bar('High', 236, 330, blocked=True, note='waiting'))
        o.append(bar('High', 330, 470, note='runs'))
        o.append(bar('Mid', 330, 470, blocked=True, note='ready'))
        o.append(bar('Mid', 470, 580, note='runs'))
        o.append(txt(408, 172, 'M released at the mark; nothing unbounded happens', 11.5, '.8'))
    o.append(line(T0, 26, T0, 158, '.2'))
    o.append(txt(T0 + 4, 20, 'time', 10.5, '.5', anchor='start'))
    o.append('</svg>')
    return ''.join(o)


ALT54 = {1: 'the low priority task holds the mutex and runs',
         2: 'the high priority task becomes ready and blocks on the mutex',
         3: 'the medium priority task preempts the low one',
         4: 'the high priority task waits behind a medium task that never touches the mutex',
         5: 'priority inheritance lets the low task finish and release the mutex promptly'}
CAP54 = {
 1: 'The low-priority task takes mutex <code>M</code> and starts working. Nothing is wrong yet.',
 2: 'The high-priority task becomes ready and needs <code>M</code>. It blocks. Still reasonable '
    '&mdash; it is waiting for a resource, and the owner is running.',
 3: 'Now the medium-priority task becomes ready. It outranks Low, so it preempts it. Low stops '
    'running &mdash; while still holding <code>M</code>.',
 4: 'This is the inversion. The highest-priority task in the system is waiting on the '
    '<em>lowest</em>, which cannot run because of a task in the middle that has nothing to do '
    'with the mutex. The wait is unbounded: more medium work means more waiting. This is what '
    'reset Mars Pathfinder.',
 5: 'Priority inheritance. While High waits on <code>M</code>, its owner temporarily runs at '
    'High&rsquo;s priority, so Mid cannot preempt it. Low finishes, releases <code>M</code>, and '
    'High proceeds. Mid runs last, which is what its priority always said should happen.',
}


# =========================== h39  fork ====================================
def fig39(step, uid):
    o = [head(640, 206, ALT39[step], uid)]
    PX, CX, BW, BH = 130, 400, 150, 44
    if step == 1:
        o.append(box(260, 40, BW, BH))
        o.append(txt(335, 66, 'one process', 12))
        o.append(txt(335, 120, 'pid_t pid = fork();', 12, '.75'))
        o.append(arr(335, 86, 335, 104, uid, op='.5'))
    else:
        o.append(line(335, 30, 335, 52, '.4'))
        o.append(arr(320, 52, PX + BW - 14, 84, uid, op='.55'))
        o.append(arr(350, 52, CX + 14, 84, uid, op='.55'))
        o.append(txt(335, 24, 'fork()', 11.5, '.7', bold=True))
        gone = (step >= 4)
        o.append(box(PX, 86, BW, BH))
        o.append(txt(PX + 75, 106, 'parent', 12))
        o.append(txt(PX + 75, 124, 'pid = 4711', 11.5, '.6'))
        o.append(box(CX, 86, BW, BH))
        o.append(txt(CX + 75, 106, 'child' if step < 4 else 'ls', 12))
        o.append(txt(CX + 75, 124, 'pid = 0' if step < 4 else 'same pid, new program', 11.5, '.6'))
        if step >= 3:
            o.append(txt(PX + 75, 158, 'takes the else branch', 11, '.65'))
            o.append(txt(CX + 75, 158, 'takes the if branch' if step == 3 else 'execvp replaced the image',
                         11, '.65'))
        if step == 5:
            o.append(arr(CX - 6, 108, PX + BW + 6, 108, uid, op='.6'))
            o.append(txt(335, 100, 'exit status', 11, '.7'))
            o.append(txt(335, 186, 'wait() reaps the child', 11.5, '.8'))
    o.append('</svg>')
    return ''.join(o)


ALT39 = {1: 'a single process about to call fork',
         2: 'fork has returned twice and there are two processes',
         3: 'each process takes a different branch on the return value',
         4: 'exec has replaced the program running in the child',
         5: 'the parent collects the exit status with wait'}
CAP39 = {
 1: 'One process, about to call <code>fork</code>.',
 2: 'The call returns <em>twice</em>, once in each process. Same code, same memory contents, same '
    'open descriptors &mdash; the only difference in the whole universe is the value it returned: '
    'the child&rsquo;s pid in the parent, and 0 in the child.',
 3: 'So the return value is the branch. Both processes run the same <code>if</code>, and take '
    'opposite sides of it. Memory is copied lazily, so a variable the child changes is unchanged '
    'in the parent.',
 4: '<code>execvp</code> replaces the program running in the child. Same process, same pid, same '
    'descriptors &mdash; an entirely different program. This is why <code>fork</code> and '
    '<code>exec</code> are two calls and not one.',
 5: 'The parent calls <code>wait</code> and collects the exit status. Skip this and the child '
    'stays a zombie: finished, but still holding a slot until somebody reads its status.',
}


# =========================== h34  dolasim sirasi ==========================
def fig34(step, uid):
    CW, CH, X, Y = 24, 26, 36, 70
    N = 24
    o = [head(660, 196, ALT34[step], uid)]
    hi = {1: (), 2: tuple(range(6)), 3: (0, 6, 12, 18), 4: ()}[step]
    vals = [None] * N
    if step == 2:
        for k in range(6):
            vals[k] = k + 1
    if step == 3:
        for k, c in enumerate((0, 6, 12, 18)):
            vals[c] = k + 1
    o.append(row(X, Y, N, CW, CH, vals, hi=hi))
    # onbellek satiri parantezleri
    for b in range(3):
        a1 = X + b * 8 * CW
        a2 = a1 + 8 * CW
        o.append(line(a1 + 2, Y + CH + 9, a2 - 2, Y + CH + 9, '.4'))
        o.append(line(a1 + 2, Y + CH + 5, a1 + 2, Y + CH + 9, '.4'))
        o.append(line(a2 - 2, Y + CH + 5, a2 - 2, Y + CH + 9, '.4'))
        o.append(txt((a1 + a2) / 2, Y + CH + 24, 'cache line %d' % b, 10.5, '.55'))
    o.append(txt(X, Y - 12, 'the matrix in memory, row by row', 11, '.6', anchor='start'))
    if step == 2:
        o.append(txt(330, 148, 'six accesses, one line fetched', 12, '.85', bold=True))
    if step == 3:
        o.append(txt(330, 148, 'four accesses, three lines fetched', 12, '.85', bold=True))
    if step == 4:
        o.append(txt(330, 152, 'same operations, same result', 12.5, '.75'))
        o.append(txt(330, 178, 'five to tenfold difference in time', 14, bold=True))
    o.append('</svg>')
    return ''.join(o)


ALT34 = {1: 'a matrix laid out in memory row by row across three cache lines',
         2: 'six consecutive accesses all fall in one cache line',
         3: 'four column-wise accesses fall in three different cache lines',
         4: 'the same work costs five to ten times as much in the wrong order'}
CAP34 = {
 1: 'A 4&times;6 matrix is one contiguous block, stored row by row &mdash; week 12&rsquo;s '
    'row-major layout. The hardware never fetches one <code>int</code>; it fetches a whole cache '
    'line, sixteen of them on a typical machine (eight drawn here).',
 2: 'Iterating rows outermost, columns innermost walks straight along that block. The first access '
    'misses and fetches a line; the next several are already there.',
 3: 'Swap the loops and each step jumps a whole row. Four accesses, three different lines &mdash; '
    'and on a real matrix, a fresh line almost every time, with the prefetcher unable to help '
    'because the stride is not sequential.',
 4: 'Identical results, identical operation count, identical big-O. The only difference is how '
    'often you wait for memory.',
}


# =========================== h25  bit deyimleri ===========================
def fig25(step, uid):
    CW, CH, X = 44, 30, 214
    N = 8
    X0 = 0b10110010
    MASK = 0b00011000
    RES = {1: X0 | MASK, 2: X0 & ~MASK & 0xFF, 3: X0 ^ MASK, 4: X0 & MASK}
    OPN = {1: ('Set', 'x |= mask'), 2: ('Clear', 'x &amp;= ~mask'),
           3: ('Toggle', 'x ^= mask'), 4: ('Test', 'x &amp; mask')}
    bits = lambda v: [(v >> (7 - i)) & 1 for i in range(N)]
    o = [head(640, 196, ALT25[step], uid)]
    m = 2 if step != 2 else 2
    rows = [('x', bits(X0), 44), ('mask' if step != 2 else '~mask',
             bits(MASK if step != 2 else (~MASK) & 0xFF), 88),
            ('result', bits(RES[step]), 140)]
    for lab, bb, y in rows:
        o.append(txt(X - 16, y + CH / 2 + 4.5, lab, 11.5, '.7', anchor='end'))
        chg = tuple(i for i in range(N) if lab == 'result' and bb[i] != bits(X0)[i])
        o.append(row(X, y, N, CW, CH, bb, hi=chg))
    o.append(line(X, 128, X + N * CW, 128, '.35'))
    name, expr = OPN[step]
    o.append(txt(X + N * CW / 2, 24, '%s &mdash; <tspan font-weight="700">%s</tspan>' % (name, expr),
                 12.5, '.8'))
    if step == 4:
        o.append(txt(X + N * CW / 2, 186, 'non-zero, so the bits were set', 11.5, '.75'))
    o.append('</svg>')
    return ''.join(o)


ALT25 = {1: 'or with a mask forces the selected bits to one',
         2: 'and with an inverted mask forces the selected bits to zero',
         3: 'exclusive or with a mask flips the selected bits',
         4: 'and with a mask keeps only the selected bits'}
CAP25 = {
 1: '<strong>Set.</strong> OR with 1 forces a 1; OR with 0 leaves the bit alone. Only the two '
    'bits the mask selects can change.',
 2: '<strong>Clear.</strong> AND with 0 forces a 0; AND with 1 leaves the bit alone. Hence the '
    'inverted mask &mdash; you want zeros exactly where the mask had ones.',
 3: '<strong>Toggle.</strong> XOR with 1 flips; XOR with 0 leaves alone. Twice returns the '
    'original, which is why XOR turns up in cheap encodings and in swap tricks.',
 4: '<strong>Test.</strong> AND keeps only the selected bits and discards the rest. The result is '
    'non-zero exactly when at least one selected bit was set &mdash; so compare against 0, or '
    'against the mask if you need <em>all</em> of them.',
}


# =========================== h51  kesme gecikmesi =========================
def fig51(step, uid):
    Y, H, X0 = 76, 30, 60
    SEG = [(X0, 150, 'finish current<tspan></tspan>', '1&ndash;30 cycles'),
           (150, 330, 'hardware entry', '~12 cycles'),
           (330, 470, 'higher-priority ISR', 'if one is active')]
    o = [head(660, 176, ALT51[step], uid)]
    o.append(line(X0, Y - 16, X0, Y + H + 16, '.5'))
    o.append(txt(X0, Y - 24, 'event', 11.5, '.8', bold=True))
    shown = min(step, 3)
    for i, (a, b, lab, sub) in enumerate(SEG):
        if i >= shown:
            continue
        o.append(box(a, Y, b - a, H, r=5, fill='.07'))
        o.append(txt((a + b) / 2, Y + 19, lab, 11))
        o.append(txt((a + b) / 2, Y + H + 16, sub, 10.5, '.55'))
    if step >= 4:
        o.append(line(470, Y - 16, 470, Y + H + 16, '.5'))
        o.append(txt(520, Y + 19, 'your handler', 12, bold=True, anchor='start'))
        o.append(line(X0, 146, 470, 146, '.6'))
        o.append(line(X0, 142, X0, 150, '.6'))
        o.append(line(470, 142, 470, 150, '.6'))
        o.append(txt(265, 164, 'latency &mdash; the sum, not any one part', 11.5, '.8'))
    o.append('</svg>')
    return ''.join(o)


ALT51 = {1: 'the hardware event arrives and the current instruction must finish',
         2: 'the processor stacks registers and fetches the vector',
         3: 'a higher priority handler may run first',
         4: 'latency is the sum of all three before your handler starts'}
CAP51 = {
 1: 'The event arrives. The processor cannot abandon the instruction it is in the middle of, so '
    'the first cost is finishing it &mdash; short for most instructions, long for a division or a '
    'multi-register move.',
 2: 'Then the hardware entry: push the registers the ABI says must be saved, fetch the vector, '
    'jump. Fixed, and out of your hands.',
 3: 'And if a higher-priority interrupt is active, yours waits for it. On Cortex-M lower numbers '
    'mean <em>higher</em> priority, which is the opposite of most people&rsquo;s first guess.',
 4: 'Only now does your handler&rsquo;s first instruction run. Latency is the whole bracket. This '
    'is why a long handler is not just slow in itself &mdash; it is the third bar in somebody '
    'else&rsquo;s picture.',
}


# ======================= duragan figurler =================================
def fig_h26(uid):
    o = [head(620, 168, 'a program writes into a buffer which is flushed to the file in blocks', uid)]
    o.append(box(30, 52, 130, 46))
    o.append(txt(95, 80, 'your program', 12))
    o.append(box(238, 52, 140, 46))
    o.append(txt(308, 72, 'buffer', 12))
    o.append(txt(308, 90, 'in the C library', 10.5, '.55'))
    o.append(box(452, 52, 130, 46))
    o.append(txt(517, 80, 'the file', 12))
    o.append(arr(160, 75, 232, 75, uid))
    o.append(arr(378, 75, 446, 75, uid))
    o.append(txt(196, 42, 'fputs', 10.5, '.6'))
    o.append(txt(412, 42, 'write', 10.5, '.6'))
    for i, (lab, when) in enumerate((('fully buffered', 'when the buffer fills'),
                                     ('line buffered', 'on every newline'),
                                     ('unbuffered', 'immediately'))):
        y = 122 + i * 15
        o.append(txt(238, y, lab, 10.5, '.75', anchor='start'))
        o.append(txt(378, y, when, 10.5, '.5', anchor='start'))
    o.append('</svg>')
    return ''.join(o)


def fig_h47(uid):
    o = [head(640, 196, 'select examines every descriptor while epoll returns only the ready one', uid)]
    for side, (x, name, sub) in enumerate(((36, 'select / poll', 'O(n) per call'),
                                           (356, 'epoll', 'O(ready) per call'))):
        o.append(txt(x + 124, 28, name, 12.5, bold=True))
        o.append(txt(x + 124, 46, sub, 11, '.6'))
        for i in range(10):
            cx = x + 14 + i * 24
            active = (i == 6)
            o.append(box(cx, 66, 18, 42, r=4,
                         fill='.14' if active else ('.05' if side == 0 else None),
                         op=None if (active or side == 0) else '.35'))
        o.append(txt(x + 124, 128, '10 000 descriptors, one ready', 10.5, '.55'))
        if side == 0:
            o.append(txt(x + 124, 156, 'the kernel walks all of them,', 11, '.75'))
            o.append(txt(x + 124, 172, 'every single call', 11, '.75'))
        else:
            o.append(txt(x + 124, 156, 'the set is registered once;', 11, '.75'))
            o.append(txt(x + 124, 172, 'only the ready one comes back', 11, '.75'))
    o.append(line(330, 30, 330, 180, '.15'))
    o.append('</svg>')
    return ''.join(o)


def fig_h27(uid):
    o = [head(620, 232, 'each failure jumps to the label that undoes exactly what succeeded', uid)]
    STEPS = [('open in', 'fail_in'), ('open out', 'close_in'), ('allocate buf', 'close_out'),
             ('do the work', 'free_buf')]
    for i, (what, lab) in enumerate(STEPS):
        y = 34 + i * 40
        o.append(box(40, y, 176, 30, r=6))
        o.append(txt(128, y + 20, what, 11.5))
        o.append(arr(216, y + 15, 306, y + 15, uid, op='.5', dash='4 3'))
        o.append(txt(261, y + 10, 'on failure', 9.5, '.5'))
        o.append(box(316, y, 150, 30, r=6, dash='4 3', op='.6'))
        o.append(txt(391, y + 20, lab + ':', 11.5, '.75'))
        if i < len(STEPS) - 1:
            o.append(arr(128, y + 30, 128, y + 38, uid, op='.45'))
        o.append(line(466, y + 15, 508, y + 15, '.35'))
    o.append(line(508, 49, 508, 169, '.45'))
    o.append(arr(508, 169, 508, 196, uid, op='.55'))
    o.append(txt(508, 214, 'return', 11.5, '.75'))
    o.append(txt(128, 210, 'one exit path, one release each', 11.5, '.8'))
    o.append('</svg>')
    return ''.join(o)


def fig_h50(uid):
    o = [head(640, 168, 'a control register drawn as bit fields the way a reference manual does', uid)]
    X, Y, CW, CH = 40, 60, 35, 34
    o.append(box(X, Y, CW * 16, CH, r=5))
    for i in range(1, 16):
        o.append(line(X + i * CW, Y, X + i * CW, Y + CH, '.3'))
    for i in range(16):
        o.append(txt(X + i * CW + CW / 2, Y - 10, str(15 - i), 9.5, '.5'))
    FIELDS = [(0, 4, 'reserved', '.05'), (4, 8, 'BAUDDIV', '.14'),
              (12, 1, 'TXE', '.14'), (13, 1, 'RXE', '.14'), (14, 2, 'reserved', '.05')]
    for start, width, name, alpha in FIELDS:
        x = X + start * CW
        o.append('<rect x="%g" y="%g" width="%g" height="%g" fill="currentColor" '
                 'fill-opacity="%s"/>' % (x + 1, Y + 1, width * CW - 2, CH - 2, alpha))
        o.append(txt(x + width * CW / 2, Y + CH + 18, name, 10.5,
                     '.45' if name == 'reserved' else '.8'))
    o.append(txt(X, Y - 30, 'UARTCTL &mdash; offset 0x30', 11.5, '.7', anchor='start'))
    o.append(txt(X, 140, 'Write reserved bits back as you found them; a future part may define them.',
                 11, '.6', anchor='start'))
    o.append('</svg>')
    return ''.join(o)


# =========================== montaj ======================================
STEPPERS = [
 (54, 'inv', fig54, CAP54, 5, 'so it cannot be preempted by the medium task and finishes promptly',
  'Priority inversion, and what inheritance fixes'),
 (39, 'fork', fig39, CAP39, 5, 'a variable changed in the child is unchanged in the parent',
  'One call, two processes'),
 (34, 'cache', fig34, CAP34, 4, 'the difference is commonly five- to tenfold',
  'Why the loop order decides the speed'),
 (25, 'bits', fig25, CAP25, 4, 'A mask of the low <code>n</code> bits is',
  'The four idioms, bit by bit'),
 (51, 'lat', fig51, CAP51, 4, 'is the time from the hardware event to the first instruction of your handler',
  'What interrupt latency is made of'),
]
STATICS = [
 (26, fig_h26, 'one large write is far cheaper than a thousand small ones',
  'Nothing reaches the file until the buffer is flushed &mdash; which is why a crash loses output '
  'and why a prompt without a newline may not appear.'),
 (47, fig_h47, 'registers the set once and returns only what is ready',
  'The same ten thousand connections, the same single event. The difference is how much work the '
  'kernel does to tell you about it.'),
 (27, fig_h27, 'Every duplicate is a place to forget one',
  'Each acquisition jumps to the label that undoes exactly what had succeeded by then, and every '
  'path leaves through the same door.'),
 (50, fig_h50, 'Reading a reference manual',
  'A register is fields, not a number. The manual draws it like this, and so should your header.'),
]


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


def insert(wk, anchor, htm):
    f = glob.glob(os.path.join(SITE, 'Week_%02d_*' % wk))[0]
    s = io.open(f, encoding='utf-8').read()
    s = '\n'.join(strip_generated(s.split('\n')))
    i = s.find(anchor)
    if i < 0:
        print('  h%d: CAPA YOK' % wk)
        return False
    j = s.find('</p>', i)
    j = s.find('\n', j) + 1
    io.open(f, 'w', encoding='utf-8', newline='\n').write(s[:j] + '\n' + htm + s[j:])
    return True


for wk, key, fn, caps, n, anchor, label in STEPPERS:
    if insert(wk, anchor, build(wk, key, fn, caps, n, label)):
        print('  h%d adimlayici: %d adim' % (wk, n))

for wk, fn, anchor, cap in STATICS:
    htm = ('<div class="c-wk-fig" data-gen="1">%s</div>\n<p class="c-wk-cap">%s</p>\n'
           % (fn('w%dfig' % wk), cap))
    if insert(wk, anchor, htm):
        print('  h%d duragan figur' % wk)
