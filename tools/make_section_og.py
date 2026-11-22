# -*- coding: utf-8 -*-
"""Bölüm paylaşım görselleri (og:image) — 1200x630 vektör çizim, JPEG olarak images/og/ altına.

    python tools/make_section_og.py

Her bölüm için solda başlık ve alt başlık, sağda bölüme özgü sade bir vektör motif çizilir.
Renkler ders görselleriyle aynı dört renk: mavi, kırmızı, yeşil, mor. Playwright + Edge gerekir.
"""
import os
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(HERE), 'images', 'og')
B, R, G, P, INK, SOFT = '#3b5bdb', '#d9483b', '#2f9e6e', '#7048c8', '#1f2430', '#6b7280'

MOTIF = {
    # düşünce balonu ve defter
    'thoughts': f'''
      <rect x="40" y="150" width="230" height="290" rx="14" fill="#fff" stroke="{INK}" stroke-width="6"/>
      <g stroke="{SOFT}" stroke-width="5" stroke-linecap="round"><path d="M80 220h150M80 265h150M80 310h120M80 355h140M80 400h90"/></g>
      <path d="M300 420 L360 160 L385 168 L325 428 Z" fill="{B}"/><path d="M300 420 L325 428 L305 455 Z" fill="{INK}"/>
      <circle cx="330" cy="95" r="70" fill="{P}" opacity=".18"/><circle cx="250" cy="110" r="18" fill="{P}" opacity=".35"/><circle cx="215" cy="135" r="9" fill="{P}" opacity=".5"/>
      <circle cx="330" cy="95" r="22" fill="none" stroke="{P}" stroke-width="6"/><path d="M330 117v20M318 145h24" stroke="{P}" stroke-width="6" stroke-linecap="round"/>''',
    # yörüngeler, yıldız ve fraktal dal
    'nature': f'''
      <g fill="none" stroke-width="5"><ellipse cx="210" cy="250" rx="200" ry="80" stroke="{B}" transform="rotate(-18 210 250)"/>
      <ellipse cx="210" cy="250" rx="140" ry="54" stroke="{P}" transform="rotate(24 210 250)"/></g>
      <circle cx="210" cy="250" r="34" fill="{R}"/><circle cx="58" cy="300" r="13" fill="{B}"/><circle cx="318" cy="198" r="11" fill="{P}"/>
      <g stroke="{G}" stroke-width="7" stroke-linecap="round" fill="none"><path d="M330 500 V430 M330 430 L300 395 M330 430 L362 392 M300 395 L282 372 M300 395 L312 366 M362 392 L352 364 M362 392 L384 372"/></g>
      <g fill="{INK}"><circle cx="40" cy="80" r="4"/><circle cx="120" cy="40" r="3"/><circle cx="380" cy="70" r="4"/><circle cx="420" cy="320" r="3"/></g>''',
    # el izi ve küre
    'humanity': f'''
      <circle cx="250" cy="250" r="170" fill="{B}" opacity=".12"/><circle cx="250" cy="250" r="170" fill="none" stroke="{B}" stroke-width="6"/>
      <path d="M90 250h320M250 80v340" stroke="{B}" stroke-width="4" opacity=".5"/><ellipse cx="250" cy="250" rx="80" ry="170" fill="none" stroke="{B}" stroke-width="4" opacity=".5"/>
      <g fill="{R}"><ellipse cx="250" cy="300" rx="62" ry="70"/><rect x="190" y="175" width="24" height="110" rx="12" transform="rotate(-14 202 230)"/>
      <rect x="222" y="150" width="24" height="120" rx="12"/><rect x="254" y="148" width="24" height="122" rx="12"/><rect x="286" y="165" width="24" height="112" rx="12" transform="rotate(10 298 220)"/>
      <rect x="300" y="250" width="24" height="90" rx="12" transform="rotate(48 312 295)"/></g>''',
    # üst üste fotoğraflar
    'memory': f'''
      <g transform="rotate(-10 200 260)"><rect x="70" y="120" width="240" height="270" rx="8" fill="#fff" stroke="{INK}" stroke-width="5"/><rect x="92" y="142" width="196" height="180" fill="{B}" opacity=".25"/></g>
      <g transform="rotate(7 260 270)"><rect x="150" y="130" width="240" height="270" rx="8" fill="#fff" stroke="{INK}" stroke-width="5"/>
      <rect x="172" y="152" width="196" height="180" fill="{G}" opacity=".22"/><circle cx="320" cy="195" r="22" fill="{R}" opacity=".8"/>
      <path d="M172 332 L232 250 L282 300 L312 270 L368 332 Z" fill="{G}"/><path d="M190 370h110" stroke="{SOFT}" stroke-width="5" stroke-linecap="round"/></g>''',
    # üç kurşun kalem
    'pencils': ''.join(f'''
      <g transform="rotate({a} 250 260)"><rect x="{x}" y="90" width="44" height="300" fill="{c}"/><rect x="{x}" y="70" width="44" height="26" fill="#c7cbd3"/>
      <rect x="{x}" y="52" width="44" height="22" rx="6" fill="{R if c != R else P}" opacity=".85"/><path d="M{x} 390 L{x + 22} 455 L{x + 44} 390 Z" fill="#e9d5b0"/>
      <path d="M{x + 15} 432 L{x + 22} 455 L{x + 29} 432 Z" fill="{INK}"/></g>''' for a, x, c in ((-14, 150, B), (0, 228, G), (14, 306, P))),
    # film şeridi, oyun kolu, nota
    'fun': f'''
      <circle cx="150" cy="190" r="110" fill="none" stroke="{INK}" stroke-width="7"/><circle cx="150" cy="190" r="16" fill="{INK}"/>
      <g fill="{B}"><circle cx="150" cy="122" r="26"/><circle cx="215" cy="170" r="26"/><circle cx="190" cy="248" r="26"/><circle cx="110" cy="248" r="26"/><circle cx="85" cy="170" r="26"/></g>
      <rect x="210" y="330" width="210" height="110" rx="55" fill="{P}"/><path d="M262 365v40M242 385h40" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
      <circle cx="362" cy="372" r="10" fill="#fff"/><circle cx="386" cy="398" r="10" fill="#fff"/>
      <path d="M380 70v120" stroke="{R}" stroke-width="9"/><path d="M380 70 q40 10 50 45" stroke="{R}" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="362" cy="192" rx="26" ry="20" fill="{R}"/>''',
    # tüy kalem ve satırlar
    'poems': f'''
      <g stroke="{SOFT}" stroke-width="5" stroke-linecap="round"><path d="M60 300h190M60 345h230M60 390h160M60 435h210"/></g>
      <path d="M380 60 C300 110 250 200 230 290 C300 250 360 170 380 60 Z" fill="{P}" opacity=".85"/>
      <path d="M380 60 C330 140 280 220 230 290" stroke="{INK}" stroke-width="5" fill="none"/><path d="M230 290 L214 330" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="210" cy="340" r="6" fill="{B}"/>''',
    # mikrofon ve plak
    'teoman': f'''
      <circle cx="300" cy="300" r="140" fill="{INK}"/><circle cx="300" cy="300" r="110" fill="none" stroke="#3a4050" stroke-width="3"/>
      <circle cx="300" cy="300" r="80" fill="none" stroke="#3a4050" stroke-width="3"/><circle cx="300" cy="300" r="40" fill="{R}"/><circle cx="300" cy="300" r="7" fill="#fff"/>
      <rect x="80" y="90" width="80" height="130" rx="40" fill="{B}"/><g stroke="#fff" stroke-width="4" opacity=".7"><path d="M92 130h56M92 155h56M92 180h56"/></g>
      <path d="M60 175 a60 60 0 0 0 120 0" stroke="{INK}" stroke-width="7" fill="none"/><path d="M120 235v60M90 300h60" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>''',
    # klaket ve film karesi
    'nejat-isler': f'''
      <rect x="70" y="200" width="300" height="200" rx="10" fill="{INK}"/>
      <g transform="rotate(-14 70 200)"><rect x="70" y="140" width="300" height="56" rx="6" fill="#fff" stroke="{INK}" stroke-width="6"/>
      <g fill="{INK}"><path d="M95 140 l40 0 l-30 56 l-40 0 Z"/><path d="M175 140 l40 0 l-30 56 l-40 0 Z"/><path d="M255 140 l40 0 l-30 56 l-40 0 Z"/><path d="M335 140 l35 0 l0 10 l-25 46 l-40 0 Z"/></g></g>
      <rect x="100" y="240" width="110" height="20" rx="4" fill="{R}"/><rect x="100" y="285" width="200" height="14" rx="4" fill="#4b5263"/><rect x="100" y="320" width="160" height="14" rx="4" fill="#4b5263"/>
      <g fill="{G}"><rect x="320" y="420" width="90" height="60" rx="6"/><circle cx="365" cy="450" r="14" fill="#fff"/></g>''',
}

TEXT = {
    'thoughts': ('Thoughts', 'Essays on learning, writing and life'),
    'nature': ('Nature', 'Existence, knowledge, logic and mind'),
    'humanity': ('Humanity', 'The human story, from origins to the future'),
    'memory': ('Memory', 'Personal stories and small moments'),
    'pencils': ('Pencils', 'History, design and the joy of collecting'),
    'fun': ('Fun', 'Films, games and music'),
    'poems': ('Poems', 'Turkish poems I return to'),
    'teoman': ('Teoman', 'Interviews and press archive, in English'),
    'nejat-isler': ('Nejat İşler', 'Interviews and press archive, in English'),
}

PAGE = '''<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:1200px;height:630px;background:#fff;font-family:"Segoe UI",Arial,sans-serif}
.c{position:relative;width:1200px;height:630px;overflow:hidden}
.bar{position:absolute;left:0;top:0;width:1200px;height:14px;background:linear-gradient(90deg,%(B)s 0 25%%,%(R)s 25%% 50%%,%(G)s 50%% 75%%,%(P)s 75%%)}
.t{position:absolute;left:72px;top:190px;width:560px}
h1{margin:0;font:700 88px/1.05 Georgia,serif;color:%(INK)s;letter-spacing:-1px}
p{margin:22px 0 0;font-size:32px;line-height:1.3;color:%(SOFT)s}
.by{position:absolute;left:72px;bottom:60px;font-size:24px;font-weight:600;color:%(INK)s}
.by span{color:%(SOFT)s;font-weight:400}
svg{position:absolute;right:60px;top:70px}
</style></head><body><div class="c"><div class="bar"></div>
<div class="t"><h1>%(title)s</h1><p>%(sub)s</p></div><div class="by">Sercan Külcü <span>· Point Zero</span></div>
<svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">%(motif)s</svg></div></body></html>'''


HOME = '''<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:1200px;height:630px;background:#fff;font-family:"Segoe UI",Arial,sans-serif}
.c{position:relative;width:1200px;height:630px;overflow:hidden}
.bar{position:absolute;left:0;top:0;width:1200px;height:14px;background:linear-gradient(90deg,%(B)s 0 25%%,%(R)s 25%% 50%%,%(G)s 50%% 75%%,%(P)s 75%%)}
.t{position:absolute;left:72px;top:170px;width:640px}
h1{margin:0;font:700 82px/1.05 Georgia,serif;color:%(INK)s;letter-spacing:-1px}
p{margin:24px 0 0;font-size:31px;line-height:1.35;color:%(SOFT)s}
.k{margin-top:30px;font-size:24px;color:%(INK)s;font-weight:600}
.by{position:absolute;left:72px;bottom:60px;font-size:24px;color:%(SOFT)s}
.ph{position:absolute;right:110px;top:135px;width:360px;height:360px;border-radius:50%%;overflow:hidden;
    box-shadow:0 0 0 10px #fff,0 0 0 16px %(B)s}
.ph img{width:100%%;height:100%%;object-fit:cover}
</style></head><body><div class="c"><div class="bar"></div>
<div class="t"><h1>Sercan Külcü</h1><p>Assistant Professor of Computer Engineering, Giresun University</p>
<div class="k">Courses · Research · Free tools and games</div></div>
<div class="by">sercankulcu.github.io · Point Zero</div>
<div class="ph"><img src="data:image/jpeg;base64,%(photo)s" alt=""></div></div></body></html>'''


def main():
    os.makedirs(OUT, exist_ok=True)
    import base64
    photo = base64.b64encode(open(os.path.join(os.path.dirname(HERE), 'images', 'profile.jpg'), 'rb').read()).decode()
    with sync_playwright() as p:
        b = p.chromium.launch(channel='msedge')
        pg = b.new_page(viewport={'width': 1200, 'height': 630})
        for k, (t, s) in TEXT.items():
            pg.set_content(PAGE % dict(B=B, R=R, G=G, P=P, INK=INK, SOFT=SOFT, title=t, sub=s, motif=MOTIF[k]))
            out = os.path.join(OUT, k + '.jpg')
            pg.screenshot(path=out, type='jpeg', quality=86)
            print(out, os.path.getsize(out) // 1024, 'KB')
        # ana sayfa: ad, unvan ve profil fotografi
        pg.set_content(HOME % dict(B=B, R=R, G=G, P=P, INK=INK, SOFT=SOFT, photo=photo))
        pg.wait_for_timeout(300)
        out = os.path.join(OUT, 'home.jpg')
        pg.screenshot(path=out, type='jpeg', quality=86)
        print(out, os.path.getsize(out) // 1024, 'KB')
        b.close()


if __name__ == '__main__':
    main()
