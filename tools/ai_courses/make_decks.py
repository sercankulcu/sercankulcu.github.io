# -*- coding: utf-8 -*-
"""Yapay Zeka ve Veri Dersleri Rehberi sunumlarini uretir.

    python tools/ai_courses/make_decks.py            # icerigi yazilmis butun dersler + acilis
    python tools/ai_courses/make_decks.py YZ MO      # yalniz verilen dersler

Kaynaklar:
    dersler.py    ders listesi ve dersler arasi iliskiler (ortusme slaytlari, komsuluk semasi)
    profiller.py  kisa adlar ve karsilastirma profilleri (ayrisma tablolari)
    icerik/KOD.py her dersin kendi metni (tanim, tarihce, kavramlar, ...)

Cikti files/ai_courses/slides/ altina yazilir; uretilen HTML'yi elle duzenlemeyin.
"""
import html
import importlib.util
import json
import math
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import dersler as D  # noqa: E402
import profiller as P  # noqa: E402

FILES = os.path.join(REPO, 'files', 'ai_courses')
DERS_URL = '/teaching/ai-courses/'
GUARD_SRC = os.path.join(REPO, 'files', 'advanced_algorithms', 'sunumlar', 'Bolum_02_Acgozlu_Algoritmalar.html')

TUR_RENK = {'alt': 'var(--ds-accent)', 'temel': 'var(--ds-link)', 'yontem': 'var(--ds-good)', 'uygulama': '#c77d12'}
TUR_CIZGI = {'alt': '', 'temel': '', 'yontem': '6 4', 'uygulama': '2 4'}

# Dil: Turkce sunumlar sunumlar/Bolum_NN_..., Ingilizceler slides/Chapter_NN_... (Veri Yapilari modeli).
# Ingilizce metin icerik_en/ ve en_tablolar.py'den, Ingilizce ders adlari asagidaki tablodan gelir.
EN = False

EN_AD = {
    'YZ': ('Artificial Intelligence', 'Artificial_Intelligence'),
    'MO': ('Machine Learning', 'Machine_Learning'),
    'YSA': ('Artificial Neural Networks', 'Neural_Networks'),
    'DO': ('Deep Learning', 'Deep_Learning'),
    'NLP': ('Natural Language Processing and Text Mining', 'Natural_Language_Processing'),
    'PO': ('Reinforcement Learning', 'Reinforcement_Learning'),
    'OT': ('Pattern Recognition', 'Pattern_Recognition'),
    'BM': ('Fuzzy Logic and Fuzzy Systems', 'Fuzzy_Logic'),
    'EMO': ('Evolutionary and Metaheuristic Optimization', 'Evolutionary_and_Metaheuristic_Optimization'),
    'US': ('Expert Systems and Knowledge Representation', 'Expert_Systems'),
    'OGM': ('Probabilistic Graphical Models', 'Probabilistic_Graphical_Models'),
    'UM': ('Generative Models', 'Generative_Models'),
    'CES': ('Multi-Agent Systems', 'Multi_Agent_Systems'),
    'AYE': ('Explainable AI and AI Ethics', 'Explainable_AI_and_Ethics'),
    'SSI': ('Digital Signal Processing', 'Digital_Signal_Processing'),
    'GI': ('Image Processing', 'Image_Processing'),
    'BG': ('Computer Vision', 'Computer_Vision'),
    'KSI': ('Speech Recognition and Audio Processing', 'Speech_and_Audio_Processing'),
    'TGI': ('Medical Image Processing', 'Medical_Image_Processing'),
    'UA': ('Remote Sensing', 'Remote_Sensing'),
    'BGR': ('Computer Graphics', 'Computer_Graphics'),
    'ROB': ('Robotics and Robot Vision', 'Robotics'),
    'BIO': ('Biometric Systems', 'Biometric_Systems'),
    'VM': ('Data Mining', 'Data_Mining'),
    'VB': ('Data Science', 'Data_Science'),
    'BV': ('Big Data Systems', 'Big_Data_Systems'),
    'BE': ('Information Retrieval and Recommender Systems', 'Information_Retrieval_and_Recommender_Systems'),
    'ZS': ('Time Series Analysis and Forecasting', 'Time_Series_Analysis'),
    'SAA': ('Social Network Analysis', 'Social_Network_Analysis'),
    'DC': ('Linear Algebra', 'Linear_Algebra'),
    'OI': ('Probability and Statistics', 'Probability_and_Statistics'),
    'OPT': ('Optimization', 'Optimization'),
    'BK': ('Information Theory', 'Information_Theory'),
    'MLOPS': ('Machine Learning Systems and MLOps', 'MLOps'),
    'GYZ': ('Embedded AI', 'Embedded_AI'),
    'GPU': ('GPU Programming and Parallel Computing', 'GPU_and_Parallel_Computing'),
    'SGY': ('AI in Cybersecurity', 'AI_in_Cybersecurity'),
    'BIN': ('Bioinformatics', 'Bioinformatics'),
}
EN_ACILIS = ('Map of the Field', 'Map_of_the_Field')
EN_KAPANIS = ('Comparisons and Roadmaps', 'Comparisons_and_Roadmaps')
EN_KISIM = {1: 'Core', 2: 'Branches of AI', 3: 'Signals, Images and Audio', 4: 'Data',
            5: 'Mathematical Foundations', 6: 'Systems and Applications'}
EN_SORU = {
    'YZ': 'How does a machine act intelligently by searching, reasoning and planning?',
    'MO': 'How does a program generalize from examples?',
    'YSA': 'How do networks of simple units learn by adjusting their weights?',
    'DO': 'How do many-layered networks learn useful representations from raw data?',
    'NLP': 'How does a computer analyze, understand and generate human language?',
    'PO': 'How can good decisions be learned by trial and error from a reward signal alone?',
    'OT': 'How do we decide from measurements which class an object belongs to?',
    'BM': 'How do we reason with concepts like "hot" or "fast" that have no sharp boundary?',
    'EMO': 'How do we find a good solution when there is no gradient or the search space is huge?',
    'US': 'How is an expert\'s knowledge written down and used for inference?',
    'OGM': 'How do we model and query many interdependent, uncertain variables?',
    'UM': 'How does a model generate new samples that look like real data?',
    'CES': 'How do several autonomous agents decide together or against each other?',
    'AYE': 'When can we trust an AI system\'s decision, and who is responsible for the outcome?',
    'SSI': 'How are sampled signals analyzed, filtered and transformed?',
    'GI': 'How is an image enhanced, transformed and divided into regions?',
    'BG': 'How does a computer understand what is in an image or a video?',
    'KSI': 'How are words, speakers and events extracted from a sound wave?',
    'TGI': 'How do X-ray, CT and MRI images help diagnosis and treatment?',
    'UA': 'What can satellite and aerial images tell us about the Earth?',
    'BGR': 'How is a realistic image produced from the description of a scene?',
    'ROB': 'How does a machine sense the physical world, know where it is and move?',
    'BIO': 'How is a person recognized from their face, fingerprint or voice?',
    'VM': 'How are hidden, useful patterns found in large piles of data?',
    'VB': 'How do we ask the right questions of data and turn the answers into decisions?',
    'BV': 'How is data that does not fit on one machine stored and processed?',
    'BE': 'How are the most relevant documents or products picked from millions of candidates?',
    'ZS': 'How do we find structure in measurements over time and forecast the future?',
    'SAA': 'How are networks of people and their relationships analyzed?',
    'DC': 'How do vectors and matrices represent data and transformations?',
    'OI': 'How is uncertainty measured, and how do we draw reliable conclusions from limited data?',
    'OPT': 'How do we find the values that make an objective function best?',
    'BK': 'How is information measured, and how is it compressed and transmitted with the least loss?',
    'MLOPS': 'How is a model taken from the lab into production and kept running there?',
    'GYZ': 'How do AI models run on small, low-power devices?',
    'GPU': 'How do thousands of cores share the same computation?',
    'SGY': 'How does AI catch attacks, and how is it attacked itself?',
    'BIN': 'How are biological sequences and molecular data analyzed computationally?',
}


def T(tr, en):
    return en if EN else tr


def ders_adi():
    return T('Yapay Zekâ ve Veri Dersleri Rehberi', 'Guide to AI and Data Courses')


def out_dir():
    return os.path.join(FILES, 'slides' if EN else 'sunumlar')


def deck_path():
    return 'deck/' if EN else '../slides/deck/'


def e(s):
    return html.escape(s, quote=True)


def guard():
    s = open(GUARD_SRC, encoding='utf-8').read()
    i = s.index('<!-- ds-guard:begin -->')
    j = s.index('<!-- ds-guard:end -->') + len('<!-- ds-guard:end -->')
    return s[i:j]


def _en_tablo():
    import en_tablolar
    return en_tablolar


def profil(kod):
    return _en_tablo().PROFIL[kod] if EN else P.PROFIL[kod]


def alanlar():
    if EN:
        return [('yaklasim', 'Approach'), ('girdi', 'Input'), ('cikti', 'Output'), ('olcut', 'Success measure'),
                ('matematik', 'Math load'), ('veri', 'Data needs')]
    return P.ALANLAR


def kisa(kod):
    return profil(kod)[0]


def ad(kod):
    return EN_AD[kod][0] if EN else D.ad(kod)


def soru(kod):
    return EN_SORU[kod] if EN else D.KOD[kod][5]


def kisim_adi(no):
    return EN_KISIM[no] if EN else dict(D.KISIMLAR)[no]


def konu(a, b, tr):
    return _en_tablo().KONU[(a, b)] if EN else tr


def tur_ad(t):
    return T({'alt': 'alt alan', 'temel': 'temel alır', 'yontem': 'yöntem paylaşır', 'uygulama': 'uygulama'},
             {'alt': 'subfield', 'temel': 'builds on', 'yontem': 'shares methods', 'uygulama': 'application'})[t]


def dosya_no(no, ilk=None):
    """Bolum no'nun dosya adi (bulundugu dilde)."""
    if EN:
        if no == D.ACILIS[0]:
            govde = EN_ACILIS[1]
        elif no == D.KAPANIS[0]:
            govde = EN_KAPANIS[1]
        else:
            govde = EN_AD[next(d[0] for d in D.DERSLER if d[1] == no)][1]
        return 'Chapter_%02d_%s.html' % (no, govde)
    return 'Bolum_%02d_%s.html' % (no, dosya_govde(no))


def dosya(kod):
    return dosya_no(D.KOD[kod][1])


def link(kod, metin=None):
    return '<a href="%s">%s</a>' % (dosya(kod), metin or ad(kod))


STYLE = """<style>
  .ds-deck .ai-q { margin: 6px 0 14px; padding: 14px 18px; border-left: 5px solid var(--ds-accent); border-radius: 0 12px 12px 0; background: var(--ds-surface-strong); font-size: 22px; font-weight: 700; line-height: 1.3; }
  .ds-deck .ai-time { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
  .ds-deck .ai-time .ds-deck__card { padding: 10px 12px; font-size: 15px; }
  .ds-deck .ai-time .ds-deck__tag { margin-bottom: 4px; }
  .ds-deck .ai-cards .ds-deck__card { padding: 9px 12px; font-size: 14.5px; line-height: 1.35; }
  .ds-deck .ai-cards .ds-deck__card strong { font-size: 15.5px; }
  .ds-deck .ai-tbl { font-size: 14px; }
  .ds-deck .ai-tbl th, .ds-deck .ai-tbl td { padding: 5px 8px; }
  .ds-deck .ai-tbl th:first-child { width: 112px; }
  .ds-deck .ai-tbl td.ai-self { background: color-mix(in srgb, var(--ds-accent) 7%, var(--ds-bg)); }
  .ds-deck .ai-rel { display: inline-block; padding: 0 7px; border-radius: 999px; font-size: 12.5px; font-weight: 700; color: #fff; white-space: nowrap; }
  .ds-deck .ai-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .ds-deck .ai-chips span, .ds-deck .ai-chips a { padding: 3px 10px; border: 1.5px solid var(--ds-border); border-radius: 999px; background: var(--ds-bg); font-size: 14px; }
  .ds-deck .ai-prof { gap: 8px; }
  .ds-deck .ai-prof .ds-deck__card { padding: 6px 11px; font-size: 14px; }
  .ds-deck .ai-prof .ds-deck__card strong { font-size: 11.5px; letter-spacing: .05em; text-transform: uppercase; color: var(--ds-muted); }
  .ds-deck .ai-mx td, .ds-deck .ai-mx th { text-align: center; }
  .ds-deck .ai-mx th:first-child { width: 190px; }
  .ds-deck .ai-demo-p { margin: -4px 0 8px; font-size: 15.5px; line-height: 1.4; }
  .ds-deck .ai-demo { display: flex; gap: 14px; align-items: flex-start; font-size: 14.5px; }
  .ds-deck .ai-demo svg { display: block; flex-shrink: 0; }
  .ds-deck .ai-demo .ai-side { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px; }
  .ds-deck .ai-demo .ai-ctl { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
  .ds-deck .ai-demo button { padding: 4px 11px; border: 1.5px solid var(--ds-border); border-radius: 999px; background: var(--ds-bg); color: var(--ds-text); font: inherit; font-size: 13.5px; cursor: pointer; }
  .ds-deck .ai-demo button:hover { border-color: var(--ds-link); }
  .ds-deck .ai-demo button.is-on { border-color: var(--ds-accent); background: color-mix(in srgb, var(--ds-accent) 16%, var(--ds-bg)); font-weight: 700; }
  .ds-deck .ai-demo label { font-size: 13.5px; color: var(--ds-muted); }
  .ds-deck .ai-demo input[type=range] { width: 100%; accent-color: var(--ds-link); }
  .ds-deck .ai-demo .ai-out { padding: 8px 11px; border: 1.5px solid var(--ds-border); border-radius: 10px; background: var(--ds-bg); font-size: 14px; line-height: 1.4; }
  .ds-deck .ai-demo .ai-out b { color: var(--ds-accent); }
  .ds-deck .ai-demo-n { margin-top: 8px; padding: 7px 12px; border-radius: 10px; background: var(--ds-surface-strong); font-size: 14px; line-height: 1.4; }
  .ds-deck .ai-myth td:first-child { width: 42%; }
  .ds-deck .ai-node rect { fill: var(--ds-bg); stroke: var(--ds-border); stroke-width: 1.5; }
  .ds-deck .ai-node:hover rect { stroke: var(--ds-link); }
  .ds-deck .ai-center rect { fill: color-mix(in srgb, var(--ds-accent) 14%, var(--ds-bg)); stroke: var(--ds-accent); stroke-width: 2; }
  .ds-deck .ai-legend { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; font-size: 13.5px; color: var(--ds-muted); }
  .ds-deck .ai-legend i { display: inline-block; width: 26px; margin-right: 6px; vertical-align: middle; border-top: 3px solid; }
EXTRA
</style>"""


def bolum(no):
    return T('Bölüm %d', 'Chapter %d') % no


def page(no, baslik, excerpt, slides, extra_css='', script=''):
    title = '%s: %s' % (bolum(no), baslik)
    fname = dosya_no(no)
    global EN
    dil = EN
    EN = False
    tr_url = '/files/ai_courses/sunumlar/' + dosya_no(no)
    EN = True
    en_url = '/files/ai_courses/slides/' + dosya_no(no)
    EN = dil
    fm = ['---', 'layout: without-sidebar', 'title: "%s"' % title,
          'permalink: %s' % (en_url if EN else tr_url),
          'excerpt: "%s"' % excerpt.replace('"', "'"), 'lang: %s' % T('tr', 'en'),
          'hreflang:', '  tr: %s' % tr_url, '  en: %s' % en_url,
          'seo_title: "%s · %s"' % (title, T(ders_adi() + ' Sunumu', 'AI and Data Courses Slides')),
          'resource: "Presentation"', 'course:', '  name: "%s"' % ders_adi(),
          '  url: "%s?lang=%s"' % (DERS_URL, T('tr', 'en')), '---', '']
    body = [guard(), '', '<link rel="stylesheet" href="%sdeck.css">' % deck_path(), STYLE.replace('EXTRA', extra_css), '',
            '<div class="ds-deck" id="ds-deck" lang="%s">' % T('tr', 'en'),
            '  <div class="ds-deck__screen" id="ds-deck-screen" tabindex="0" aria-roledescription="%s" aria-label="%s">'
            % (T('sunum', 'presentation'), e(T('%s sunumu', '%s slides') % title)),
            '    <div class="ds-deck__stage" id="ds-deck-stage">',
            '      <div class="ds-deck__progress" aria-hidden="true"><span id="ds-deck-progress"></span></div>',
            '', '      <div class="ds-deck__viewport" aria-live="polite">', '']
    body += slides
    body += ['      </div>', '',
             '      <div class="ds-deck__bar">',
             '        <button class="ds-deck__button" type="button" id="ds-deck-prev" aria-label="%s">←</button>' % T('Önceki slayt', 'Previous slide'),
             '        <span class="ds-deck__counter" id="ds-deck-counter">1 / 1</span>',
             '        <button class="ds-deck__button" type="button" id="ds-deck-next" aria-label="%s">→</button>' % T('Sonraki slayt', 'Next slide'),
             '        <span class="ds-deck__section" id="ds-deck-section">%s</span>' % T('Sercan KÜLCÜ, Tüm hakları saklıdır.', 'Sercan KÜLCÜ. All rights reserved.'),
             '        <select class="ds-deck__select" id="ds-deck-jump" aria-label="%s"></select>' % T('Slayta git', 'Go to slide'),
             '        <button class="ds-deck__button" type="button" id="ds-deck-full" aria-label="%s">⛶</button>' % T('Tam ekran', 'Full screen'),
             '      </div>', '    </div>', '  </div>', '</div>', '', '<script src="%sdeck.js"></script>' % deck_path()]
    if script:
        body += ['<script>', script.strip(), '</script>']
    s = '\n'.join(fm + body) + '\n'
    denetle(fname, s)
    open(os.path.join(out_dir(), fname), 'w', encoding='utf-8', newline='\n').write(s)
    return fname


def dosya_govde(no):
    if no == D.ACILIS[0]:
        return D.ACILIS[2]
    if no == D.KAPANIS[0]:
        return D.KAPANIS[2]
    return next(d[4] for d in D.DERSLER if d[1] == no)


def denetle(fname, s):
    """Canli sitede sayfayi bozan kaliplar (bkz. tools/check_site.py ve proje notlari)."""
    body = s.split('\n---', 1)[1]
    for pat, why in ((r'\{\{|\{%', 'Liquid'), (r'(?<![\w/]):[a-z0-9_+-]+:(?!//)', 'jemoji :ad: kodu')):
        for m in re.finditer(pat, body):
            ctx = body[max(0, m.start() - 30):m.end() + 30]
            if why.startswith('jemoji') and ('http' in ctx or 'style' in ctx[:40]):
                continue
            raise SystemExit('%s: %s -> %r' % (fname, why, ctx))
    for sc in re.findall(r'<script>(.*?)</script>', s, re.S):
        for line in sc.splitlines():
            code = re.sub(r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'', '""', line)
            if '//' in code:
                raise SystemExit('%s: satir ici betikte // var: %s' % (fname, line.strip()))


def slide(title, section, inner, cls=''):
    return ('        <section class="ds-deck__slide%s" data-title="%s" data-section="%s">\n%s\n        </section>\n'
            % (cls, e(title), e(section), inner))


def head(kicker, h2):
    return '          <p class="ds-deck__kicker">%s</p>\n          <h2>%s</h2>' % (kicker, h2)


# ---------------------------------------------------------------- svg yardimcilari

def svg_akis(adimlar):
    """Soldan saga kutular ve oklar. adimlar: [(baslik, alt etiket)]"""
    n = len(adimlar)
    W, gap = 720, 26
    bw = (W - (n - 1) * gap) / n
    parts = ['<svg class="ds-svg" viewBox="0 0 720 130" role="img" aria-label="%s" style="max-width:720px">'
             % e(' → '.join(a for a, _ in adimlar)),
             '<defs><marker id="ai-ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">'
             '<path class="ah" d="M0 0 L10 5 L0 10 z"/></marker></defs>']
    for i, (bas, alt) in enumerate(adimlar):
        x = i * (bw + gap)
        parts.append('<rect class="box" x="%.1f" y="18" width="%.1f" height="52" rx="10"/>' % (x, bw))
        satir = bas.split('\n')
        for k, t in enumerate(satir):
            y = 49 - 9 * (len(satir) - 1) + 18 * k
            parts.append('<text class="txt" x="%.1f" y="%.1f" text-anchor="middle">%s</text>' % (x + bw / 2, y, e(t)))
        for k, t in enumerate(alt.split('\n')):
            parts.append('<text class="lbl" x="%.1f" y="%d" text-anchor="middle">%s</text>' % (x + bw / 2, 92 + 17 * k, e(t)))
        if i < n - 1:
            parts.append('<path class="line" d="M%.1f 44 L%.1f 44" marker-end="url(#ai-ok)"/>' % (x + bw + 3, x + bw + gap - 3))
    parts.append('</svg>')
    return ''.join(parts)


def svg_komsular(kod):
    """Dersi ortada, komsularini cevresinde gosteren sema; dugumler sunumlara baglanir."""
    kom = D.komsular(kod)
    turu = {}
    for a, t, b, _ in D.ILISKILER:
        if a == kod:
            turu[b] = t
        elif b == kod:
            turu[a] = t
    W, H = 720, 400
    cx, cy = W / 2, 190
    n = len(kom)
    rx, ry = (300, 165) if n > 6 else (270, 150)
    parts = ['<svg class="ds-svg" viewBox="0 0 %d %d" role="img" aria-label="%s" style="max-width:720px">' % (W, H, e(T('%s dersinin komşuları', 'Neighbours of %s') % ad(kod)))]
    nodes = []
    for i, (k, _, _) in enumerate(kom):
        ang = -math.pi / 2 + 2 * math.pi * (i + 0.5) / n
        f = 1.0 if (n <= 9 or i % 2 == 0) else 0.74
        w = 16 + 7.4 * len(kisa(k))
        x = min(max(cx + rx * f * math.cos(ang), w / 2 + 4), W - w / 2 - 4)
        nodes.append([k, x, cy + ry * f * math.sin(ang), w])
    for _ in range(80):
        moved = False
        for a in nodes:
            for b in nodes:
                if a is not b and abs(a[1] - b[1]) < (a[3] + b[3]) / 2 + 6 and abs(a[2] - b[2]) < 36:
                    a[2] = min(H - 20, max(18, a[2] + (3 if a[2] >= b[2] else -3)))
                    moved = True
        if not moved:
            break
    for k, x, y, _ in nodes:
        t = turu[k]
        parts.append('<path d="M%.1f %.1f L%.1f %.1f" style="stroke:%s;stroke-width:2.4;fill:none%s"/>'
                     % (cx, cy, x, y, TUR_RENK[t], (';stroke-dasharray:' + TUR_CIZGI[t]) if TUR_CIZGI[t] else ''))
    for k, x, y, w in nodes:
        name = kisa(k)
        parts.append('<a class="ai-node" href="%s"><rect x="%.1f" y="%.1f" width="%.1f" height="30" rx="15"/>'
                     '<text class="txt" x="%.1f" y="%.1f" text-anchor="middle" style="font-size:13.5px">%s</text></a>'
                     % (dosya(k), x - w / 2, y - 15, w, x, y + 5, e(name)))
    name = kisa(kod)
    w = 30 + 9.5 * len(name)
    parts.append('<g class="ai-center"><rect x="%.1f" y="%.1f" width="%.1f" height="44" rx="22"/>'
                 '<text class="txt" x="%.1f" y="%.1f" text-anchor="middle" style="font-size:17px">%s</text></g>'
                 % (cx - w / 2, cy - 22, w, cx, cy + 6, e(name)))
    parts.append('</svg>')
    return ''.join(parts)


def legend():
    return ('<div class="ai-legend">' + ''.join(
        '<span><i style="border-color:%s;%s"></i>%s</span>' % (
            TUR_RENK[t], 'border-top-style:dashed' if t == 'yontem' else 'border-top-style:dotted' if t == 'uygulama' else '',
            tur_ad(t)) for t in ('alt', 'temel', 'yontem', 'uygulama')) + '</div>')


def rel_badge(t):
    return '<span class="ai-rel" style="background:%s">%s</span>' % (TUR_RENK[t], tur_ad(t))


# ---------------------------------------------------------------- ders sunumu

def icerik_yukle(kod):
    kl = 'icerik_en' if EN else 'icerik'
    p = os.path.join(HERE, kl, kod + '.py')
    if not os.path.exists(p):
        return None
    spec = importlib.util.spec_from_file_location(kl + '_' + kod, p)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    C = dict(m.ICERIK)
    pd = os.path.join(HERE, kl, 'demo', kod + '.py')
    if os.path.exists(pd):
        spec = importlib.util.spec_from_file_location('demo_' + kod, pd)
        md = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(md)
        C['demo'] = md.DEMO
    return C


def iliski_listesi(kod):
    """[(diger, tur, bu dersin gozunden cumle, ortak konu)]"""
    out = []
    for a, t, b, konu_tr in D.ILISKILER:
        k = konu(a, b, konu_tr)
        if a == kod:
            if t == 'alt':
                s = T('Bu ders, %s dersinin alt alanıdır', 'This course is a subfield of %s') % link(b)
            elif t == 'temel':
                s = T('Bu ders %s dersini temel alır', 'This course builds on %s') % link(b)
            elif t == 'uygulama':
                s = T('Bu ders %s yöntemlerini uygular', 'This course applies the methods of %s') % link(b)
            else:
                s = T('%s ile yöntem paylaşır', 'Shares methods with %s') % link(b)
            out.append((b, t, s, k))
        elif b == kod:
            if t == 'alt':
                s = T('%s, bu dersin alt alanıdır', '%s is a subfield of this course') % link(a)
            elif t == 'temel':
                s = T('%s bu dersi temel alır', '%s builds on this course') % link(a)
            elif t == 'uygulama':
                s = T('%s bu dersin yöntemlerini uygular', '%s applies the methods of this course') % link(a)
            else:
                s = T('%s ile yöntem paylaşır', 'Shares methods with %s') % link(a)
            out.append((a, t, s, k))
    sira = {'alt': 0, 'temel': 1, 'uygulama': 2, 'yontem': 3}
    out.sort(key=lambda r: (sira[r[1]], D.KOD[r[0]][1]))
    return out


def ders_sunumu(kod, C):
    d = D.KOD[kod]
    no, kisim, adi, sor = d[1], d[2], ad(kod), soru(kod)
    S = []
    agenda = ''.join('<span>%s</span>' % g for g in C['gundem'])
    S.append(slide('%s: %s' % (bolum(no), adi), '',
                   '          <h1>%s</h1>\n          <div class="ds-deck__subtitle">%s · %s %s: %s</div>\n'
                   '          <div class="ds-deck__agenda" aria-label="%s">%s</div>\n'
                   '          <small>%s</small>'
                   % (adi, ders_adi(), T('Kısım', 'Part'), ['I', 'II', 'III', 'IV', 'V', 'VI'][kisim - 1], kisim_adi(kisim),
                      T('Sunum içeriği', 'Chapter contents'), agenda,
                      T('Sercan KÜLCÜ · Giresun Üniversitesi · Bilgisayar Mühendisliği',
                        'Sercan KÜLCÜ · Giresun University · Computer Engineering')),
                   ' ds-deck__slide--title'))
    # 2 soru
    t2 = T('Ders Hangi Soruyu Sorar?', 'What Question Does It Ask?')
    g = T('Giriş', 'Introduction')
    S.append(slide(t2, g,
                   head(g, t2) +
                   '\n          <div class="ai-q">%s</div>\n          <p>%s</p>%s\n          <h3 style="margin-top:4px">%s</h3>'
                   '\n          <div class="ds-deck__grid ds-deck__grid--3 ai-cards ai-prof">%s</div>' % (
                       sor, C['tanim'],
                       ('\n          <div class="ds-deck__callout">%s</div>' % C['not']) if C.get('not') else '',
                       T('Bir bakışta', 'At a glance'),
                       ''.join('<div class="ds-deck__card"><strong>%s</strong><p>%s</p></div>' % (et, profil(kod)[1][al])
                               for al, et in alanlar()))))
    # 3 tarihce
    cards = ''.join('<div class="ds-deck__card"><span class="ds-deck__tag">%s</span><p>%s</p></div>' % (y, t)
                    for y, t in C['tarihce'])
    t3 = T('Kısa Tarihçe', 'A Short History')
    S.append(slide(t3, g, head(g, t3) + '\n          <div class="ai-time">%s</div>' % cards))
    # 4 kavramlar
    dsec = T('Ders', 'The Course')
    cards = ''.join('<div class="ds-deck__card"><strong>%s</strong><p>%s</p></div>' % (b, t) for b, t in C['kavramlar'])
    cols = 4 if len(C['kavramlar']) == 8 else 3
    t4 = T('Temel Kavramlar', 'Core Concepts')
    S.append(slide(t4, dsec, head(dsec, t4) +
                   '\n          <div class="ds-deck__grid ds-deck__grid--%d ai-cards">%s</div>' % (2 if cols == 4 else 3, cards)))
    # 5 is akisi
    t5 = T('Tipik İş Akışı', 'A Typical Workflow')
    S.append(slide(t5, dsec, head(dsec, t5) +
                   '\n          <div class="ds-deck__figure">%s</div>\n          <div class="ds-deck__callout">%s</div>'
                   % (svg_akis(C['akis']), C['akis_ornek'])))
    # 5b etkilesimli problem sayfasi
    demo = C.get('demo')
    if demo:
        dn = T('Dene', 'Try It')
        S.append(slide(dn + ': ' + demo['baslik'], dn, head(dn, demo['baslik']) +
                       '\n          <p class="ai-demo-p">%s</p>\n          <div class="ai-demo" id="ai-demo">%s</div>%s'
                       % (demo['problem'], re.sub(r'<svg(?![^>]*class=)', '<svg class="ds-svg"', demo['html'].strip()),
                          ('\n          <div class="ai-demo-n">%s</div>' % demo['not']) if demo.get('not') else '')))
    # 6 on kosullar
    ksec = T('Konum', 'Context')
    rows = []
    for r in iliski_listesi(kod):
        k, t = r[0], r[1]
        if (t in ('temel', 'alt', 'uygulama') and any(a == kod and b == k for a, tt, b, _ in D.ILISKILER if tt == t)):
            rows.append('<tr><td>%s</td><td>%s</td></tr>' % (link(k), r[3]))
    for ad_, neden, url in C.get('onkosul_ek', []):
        rows.append('<tr><td>%s</td><td>%s</td></tr>' % (('<a href="%s">%s</a>' % (url, ad_)) if url else ad_, neden))
    t6 = T('Ön Koşullar', 'Prerequisites')
    S.append(slide(t6, ksec, head(ksec, t6) +
                   '\n          <p class="ds-deck__small ds-deck__muted">%s</p>'
                   '\n          <table class="ds-deck__table ai-tbl"><tr><th>%s</th><th>%s</th></tr>%s</table>'
                   % (T('Bu dersten önce bilinmesi yararlı olan dersler ve neden gerektikleri.',
                        'Courses worth knowing before this one, and why they are needed.'),
                      T('Ders', 'Course'), T('Neden gerekir', 'Why it is needed'), ''.join(rows))))
    # 7 komsuluk semasi
    t7 = T('Dersin Komşuları', 'Neighbouring Courses')
    S.append(slide(t7, ksec, head(ksec, t7) +
                   '\n          <div class="ds-deck__figure" style="margin:0">%s</div>\n          %s' % (svg_komsular(kod), legend())))
    # 8 ortusme tablosu (8 satirda bir sayfa)
    osec = T('Örtüşme', 'Overlap')
    rel = iliski_listesi(kod)
    parcalar = [rel[i:i + 8] for i in range(0, len(rel), 8)]
    for pi, parca in enumerate(parcalar):
        t = T('Örtüştüğü Dersler', 'Overlapping Courses') + (' (%d/%d)' % (pi + 1, len(parcalar)) if len(parcalar) > 1 else '')
        rows = ''.join('<tr><td>%s</td><td>%s</td><td>%s</td></tr>' % (rel_badge(r[1]), r[2], r[3]) for r in parca)
        S.append(slide(t, osec, head(osec, t) +
                       '\n          <table class="ds-deck__table ai-tbl"><tr><th>%s</th><th>%s</th><th>%s</th></tr>%s</table>'
                       % (T('İlişki', 'Relation'), T('Ders', 'Course'), T('Ortak konu', 'Shared ground'), rows)))
    # 9 ayrisma (iki komsu bir sayfa)
    asec = T('Ayrışma', 'Differences')
    ay = C['ayrisma']
    parcalar = [ay[i:i + 2] for i in range(0, len(ay), 2)]
    for pi, parca in enumerate(parcalar):
        t = T('Ayrıştığı Noktalar', 'Where It Differs') + (' (%d/%d)' % (pi + 1, len(parcalar)) if len(parcalar) > 1 else '')
        cols = [kod] + [k for k, _ in parca]
        hdr = '<tr><th>%s</th>' % T('Ölçüt', 'Criterion') + ''.join('<th>%s</th>' % (kisa(k) if k == kod else link(k, kisa(k))) for k in cols) + '</tr>'
        rows = '<tr><th>%s</th>' % T('Temel soru', 'Core question') + ''.join('<td%s>%s</td>' % (' class="ai-self"' if k == kod else '', soru(k)) for k in cols) + '</tr>'
        for alan, etiket in alanlar():
            rows += '<tr><th>%s</th>' % etiket + ''.join(
                '<td%s>%s</td>' % (' class="ai-self"' if k == kod else '', profil(k)[1][alan]) for k in cols) + '</tr>'
        notlar = ''.join('<li><b>%s:</b> %s</li>' % (kisa(k), cumle) for k, cumle in parca)
        S.append(slide(t, asec, head(asec, t) +
                       '\n          <table class="ds-deck__table ai-tbl" style="font-size:13px">%s%s</table>'
                       '\n          <ul class="ds-deck__small" style="margin-top:8px">%s</ul>' % (hdr, rows, notlar)))
    # 10 uygulamalar
    usec = T('Uygulama', 'Practice')
    cards = ''.join('<div class="ds-deck__card"><strong>%s</strong><p>%s</p></div>' % (b, t) for b, t in C['uygulamalar'])
    t10 = T('Uygulama Alanları', 'Applications')
    S.append(slide(t10, usec, head(usec, t10) +
                   '\n          <div class="ds-deck__grid ds-deck__grid--3 ai-cards">%s</div>' % cards))
    # 11 araclar
    t11 = T('Araçlar ve Örnek Veriler', 'Tools and Datasets')
    S.append(slide(t11, usec, head(usec, t11) +
                   '\n          <h3>%s</h3>\n          <div class="ai-chips">%s</div>'
                   '\n          <h3 style="margin-top:18px">%s</h3>\n          <div class="ai-chips">%s</div>%s'
                   % (T('Araçlar ve kütüphaneler', 'Tools and libraries'),
                      ''.join('<span>%s</span>' % a for a in C['araclar']),
                      C.get('veri_baslik', T('Tanınmış veri setleri', 'Well-known datasets')),
                      ''.join('<span>%s</span>' % a for a in C['veriler']),
                      ('\n          <div class="ds-deck__callout">%s</div>' % C['araclar_not']) if C.get('araclar_not') else '')))
    # 12 yanilgilar
    rows = ''.join('<tr><td>%s</td><td>%s</td></tr>' % (a, b) for a, b in C['yanilgilar'])
    t12 = T('Sık Karıştırılanlar', 'Common Misconceptions')
    S.append(slide(t12, usec, head(usec, t12) +
                   '\n          <table class="ds-deck__table ai-tbl ai-myth"><tr><th>%s</th><th>%s</th></tr>%s</table>'
                   % (T('Yaygın düşünce', 'Common belief'), T('Doğrusu', 'In fact'), rows)))
    # 13 sonra
    ssec = T('Sonrası', 'Next Steps')
    ileri = []
    for a, t, b, _ in D.ILISKILER:
        if b == kod and t in ('temel', 'alt', 'uygulama') and a not in ileri:
            ileri.append(a)
    ileri.sort(key=lambda k: D.KOD[k][1])
    chips = ''.join('<a href="%s">%s</a>' % (dosya(k), ad(k)) for k in ileri) or '<span>%s</span>' % T(
        'Bu ders çoğunlukla uç noktadır; öteki dersleri temel alır.',
        'This course is mostly an end point: it builds on the others.')
    t13 = T('Bu Dersten Sonra', 'After This Course')
    S.append(slide(t13, ssec, head(ssec, t13) +
                   '\n          <h3>%s</h3>\n          <div class="ai-chips">%s</div>'
                   '\n          <h3 style="margin-top:18px">%s</h3>\n          <div class="ai-chips">%s</div>'
                   '\n          <div class="ds-deck__callout">%s</div>'
                   % (T('Bu dersi temel alan ya da genişleten dersler', 'Courses that build on or extend this one'), chips,
                      T('İlgili meslekler', 'Related careers'),
                      ''.join('<span>%s</span>' % m for m in C['meslekler']), C['sonra'])))
    # 14 kaynaklar
    t14 = T('Kaynaklar', 'Further Reading')
    S.append(slide(t14, ssec, head(ssec, t14) +
                   '\n          <ul>%s</ul>' % ''.join('<li>%s</li>' % k for k in C['kaynaklar'])))
    S.append(slide(T('Son', 'The End'), '', '          <h1>%s</h1>\n          <div class="ds-deck__subtitle">%s: %s</div>\n'
                   '          <small><a href="%s">%s</a> · <a href="%s">%s</a> · <a href="%s">%s</a></small>'
                   % (T('Son', 'The End'), bolum(no), adi, dosya_no(no - 1), T('← Önceki bölüm', '← Previous chapter'),
                      dosya_no(1), T('Alanın haritası', 'Map of the field'),
                      dosya_no(no + 1), T('Sonraki bölüm →', 'Next chapter →')), ' ds-deck__slide--title'))
    script = ''
    css = ''
    if demo:
        script = ('(function () {\n  var root = document.getElementById("ai-demo");\n  if (!root) return;\n'
                  '  var SVGNS = "http:" + "/" + "/www.w3.org/2000/svg";\n%s\n})();' % demo['js'].strip('\n'))
        css = demo.get('css', '')
    return page(no, adi, C['excerpt'], S, extra_css=css, script=script)


# ---------------------------------------------------------------- acilis sunumu

def acilis():
    no = D.ACILIS[0]
    baslik = T(D.ACILIS[1], EN_ACILIS[0])
    S = []
    S.append(slide('%s: %s' % (bolum(no), baslik), '',
                   '          <h1>%s</h1>\n          <div class="ds-deck__subtitle">%s</div>\n'
                   '          <div class="ds-deck__agenda" aria-label="%s">%s</div>\n'
                   '          <small>%s</small>' % (
                       baslik, ders_adi(), T('Sunum içeriği', 'Chapter contents'),
                       T('<span>Dersin amacı</span><span>YZ ⊃ MÖ ⊃ YSA ⊃ DÖ</span><span>Altı kısım</span><span>İlişki türleri</span>'
                         '<span>Karşılaştırma ölçütleri</span><span>Etkileşimli harita</span>',
                         '<span>Purpose of the guide</span><span>AI ⊃ ML ⊃ ANN ⊃ DL</span><span>Six parts</span><span>Kinds of relation</span>'
                         '<span>Comparison criteria</span><span>Interactive map</span>'),
                       T('Sercan KÜLCÜ · Giresun Üniversitesi · Bilgisayar Mühendisliği',
                         'Sercan KÜLCÜ · Giresun University · Computer Engineering')),
                   ' ds-deck__slide--title'))
    g = T('Giriş', 'Introduction')
    t = T('Bu Ders Ne Anlatır?', 'What Is This Guide About?')
    S.append(slide(t, g, head(g, t) + T('''
          <p>Yapay zekâ ve veriyle ilgili <b>%d ders</b> her biri bir sunumla tanıtılır. Amaç bu dersleri öğretmek değil, <b>haritasını çıkarmaktır</b>: her ders hangi soruyu sorar, hangi araçları başka derslerle paylaşır, nerede ayrılır?</p>
          <div class="ds-deck__two">
            <div class="ds-deck__pc ds-deck__pc--pro"><h3>Bu derste var</h3><ul>
              <li>Her dersin temel sorusu ve kavramları</li><li>Kısa tarihçe ve tipik iş akışı</li>
              <li>Ön koşullar ve komşu dersler</li><li>Örtüşme ve ayrışma tabloları</li><li>Uygulama alanları ve araçlar</li></ul></div>
            <div class="ds-deck__pc ds-deck__pc--con"><h3>Bu derste yok</h3><ul>
              <li>Ders notu ve kitap</li><li>Kod örnekleri ve ödev</li><li>Formüllerin türetilmesi</li>
              <li>Bir dersin bütün konuları</li></ul></div>
          </div>''', '''
          <p>Each of <b>%d courses</b> on AI and data is introduced in one presentation. The aim is not to teach these courses but to <b>map them</b>: what question does each one ask, which tools does it share with others, and where does it part ways?</p>
          <div class="ds-deck__two">
            <div class="ds-deck__pc ds-deck__pc--pro"><h3>What you will find</h3><ul>
              <li>Each course's core question and concepts</li><li>A short history and a typical workflow</li>
              <li>Prerequisites and neighbouring courses</li><li>Overlap and difference tables</li><li>Applications and tools</li></ul></div>
            <div class="ds-deck__pc ds-deck__pc--con"><h3>What you will not find</h3><ul>
              <li>Lecture notes or a textbook</li><li>Code examples or assignments</li><li>Derivations of formulas</li>
              <li>The full syllabus of any course</li></ul></div>
          </div>''') % len(D.DERSLER)))
    # ic ice kumeler
    venn = T('''<svg class="ds-svg" viewBox="0 0 720 330" role="img" aria-label="Yapay zekâ makine öğrenmesini, makine öğrenmesi yapay sinir ağlarını, yapay sinir ağları derin öğrenmeyi kapsar" style="max-width:700px">
<ellipse cx="360" cy="168" rx="350" ry="158" style="fill:color-mix(in srgb, var(--ds-link) 6%, var(--ds-bg));stroke:var(--ds-link);stroke-width:2"/>
<ellipse cx="420" cy="186" rx="265" ry="126" style="fill:color-mix(in srgb, var(--ds-link) 11%, var(--ds-bg));stroke:var(--ds-link);stroke-width:2"/>
<ellipse cx="475" cy="204" rx="180" ry="94" style="fill:color-mix(in srgb, var(--ds-link) 17%, var(--ds-bg));stroke:var(--ds-link);stroke-width:2"/>
<ellipse cx="520" cy="220" rx="102" ry="60" style="fill:color-mix(in srgb, var(--ds-accent) 16%, var(--ds-bg));stroke:var(--ds-accent);stroke-width:2"/>
<text class="txt" x="64" y="104">Yapay Zekâ</text><text class="lbl" x="64" y="124">arama, planlama,</text><text class="lbl" x="64" y="141">mantık,</text><text class="lbl" x="64" y="158">uzman sistem</text>
<text class="txt" x="185" y="150">Makine Öğrenmesi</text><text class="lbl" x="185" y="172">karar ağacı, SVM,</text><text class="lbl" x="185" y="190">k-ortalama</text>
<text class="txt" x="325" y="160">Yapay Sinir Ağları</text><text class="lbl" x="325" y="182">algılayıcı, çok</text><text class="lbl" x="325" y="200">katmanlı ağ</text>
<text class="txt" x="520" y="216" text-anchor="middle">Derin Öğrenme</text><text class="lbl" x="520" y="238" text-anchor="middle">CNN, dönüştürücü</text>
</svg>''', '''<svg class="ds-svg" viewBox="0 0 720 330" role="img" aria-label="Artificial intelligence contains machine learning, which contains neural networks, which contain deep learning" style="max-width:700px">
<ellipse cx="360" cy="168" rx="350" ry="158" style="fill:color-mix(in srgb, var(--ds-link) 6%, var(--ds-bg));stroke:var(--ds-link);stroke-width:2"/>
<ellipse cx="420" cy="186" rx="265" ry="126" style="fill:color-mix(in srgb, var(--ds-link) 11%, var(--ds-bg));stroke:var(--ds-link);stroke-width:2"/>
<ellipse cx="475" cy="204" rx="180" ry="94" style="fill:color-mix(in srgb, var(--ds-link) 17%, var(--ds-bg));stroke:var(--ds-link);stroke-width:2"/>
<ellipse cx="520" cy="220" rx="102" ry="60" style="fill:color-mix(in srgb, var(--ds-accent) 16%, var(--ds-bg));stroke:var(--ds-accent);stroke-width:2"/>
<text class="txt" x="64" y="104">Artificial</text><text class="txt" x="64" y="122">Intelligence</text><text class="lbl" x="64" y="142">search, planning,</text><text class="lbl" x="64" y="159">logic,</text><text class="lbl" x="64" y="176">expert systems</text>
<text class="txt" x="185" y="150">Machine Learning</text><text class="lbl" x="185" y="172">decision trees,</text><text class="lbl" x="185" y="190">SVM, k-means</text>
<text class="txt" x="325" y="160">Neural Networks</text><text class="lbl" x="325" y="182">perceptron,</text><text class="lbl" x="325" y="200">multilayer net</text>
<text class="txt" x="520" y="216" text-anchor="middle">Deep Learning</text><text class="lbl" x="520" y="238" text-anchor="middle">CNN, transformer</text>
</svg>''')
    t = T('Terimler İç İçe', 'Nested Terms')
    S.append(slide(t, g, head(g, T('Terimler İç İçe: YZ ⊃ MÖ ⊃ YSA ⊃ DÖ', 'Nested Terms: AI ⊃ ML ⊃ ANN ⊃ DL')) +
                   '\n          <div class="ds-deck__figure" style="margin:0">%s</div>\n'
                   '          <p class="ds-deck__small">%s</p>' % (venn, T(
                       'Her halka bir öncekinin alt alanıdır: her derin öğrenme modeli bir sinir ağıdır, ama her yapay zekâ sistemi öğrenmez. '
                       'Satranç oynayan bir arama programı yapay zekâdır, makine öğrenmesi değildir.',
                       'Each ring is a subfield of the one around it: every deep learning model is a neural network, but not every AI system learns. '
                       'A chess program that searches is AI, but it is not machine learning.'))))
    # alti kisim
    ysec = T('Yapı', 'Structure')
    cards = []
    for k_no, _ in D.KISIMLAR:
        ds = [d for d in D.DERSLER if d[2] == k_no]
        cards.append('<div class="ds-deck__card"><strong>%s. %s</strong><p>%s</p></div>' % (
            ['I', 'II', 'III', 'IV', 'V', 'VI'][k_no - 1], kisim_adi(k_no),
            ', '.join('<a href="%s">%s</a>' % (dosya(d[0]), kisa(d[0])) for d in ds)))
    S.append(slide(T('Altı Kısım', 'Six Parts'), ysec, head(ysec, T('Altı Kısım, %d Ders', 'Six Parts, %d Courses') % len(D.DERSLER)) +
                   '\n          <div class="ds-deck__grid ds-deck__grid--3 ai-cards">%s</div>' % ''.join(cards)))
    # iliski turleri
    ornek = T({'alt': ('Derin Öğrenme → Yapay Sinir Ağları', 'Bütün kavramları devralır, kendine özgü yenilerini ekler.'),
               'temel': ('Bilgisayarlı Görü → Görüntü İşleme', 'Öteki ders önce bilinmelidir; bu ders onun üstüne kurulur.'),
               'yontem': ('Veri Madenciliği ↔ Makine Öğrenmesi', 'Aynı araçları kullanırlar ama farklı sorular sorarlar.'),
               'uygulama': ('Tıbbi Görüntü İşleme → Bilgisayarlı Görü', 'Öteki dersin yöntemlerini belirli bir alana, kendi kurallarıyla uygular.')},
              {'alt': ('Deep Learning → Neural Networks', 'Inherits all of its concepts and adds new ones of its own.'),
               'temel': ('Computer Vision → Image Processing', 'The other course comes first; this one is built on top of it.'),
               'yontem': ('Data Mining ↔ Machine Learning', 'They use the same tools but ask different questions.'),
               'uygulama': ('Medical Image Processing → Computer Vision', 'Applies the other course\'s methods to one domain, under that domain\'s rules.')})
    cards = ''.join('<div class="ds-deck__card">%s<p style="margin-top:6px"><b>%s</b></p><p>%s</p></div>' % (rel_badge(t), ornek[t][0], ornek[t][1])
                    for t in ('alt', 'temel', 'yontem', 'uygulama'))
    S.append(slide(T('İlişki Türleri', 'Kinds of Relation'), ysec, head(ysec, T('Dersler Arası Dört İlişki Türü', 'Four Kinds of Relation Between Courses')) +
                   '\n          <div class="ds-deck__grid ds-deck__grid--2 ai-cards">%s</div>' % cards))
    # olcutler
    acik = T({'yaklasim': 'Problemi hangi düşünce biçimiyle ele alır: arama, istatistik, mantık, dönüşüm…',
              'girdi': 'Ders hangi tür veriyle ya da tanımla işe başlar?',
              'cikti': 'Sonunda ne üretilir: karar, model, görüntü, rapor…',
              'olcut': 'Bir çözümün iyi olduğu neye bakılarak söylenir?',
              'matematik': 'Ne kadar ve hangi matematiğe dayanır?',
              'veri': 'Ne kadar veri gerekir; veri olmadan çalışabilir mi?'},
             {'yaklasim': 'The way of thinking it brings to a problem: search, statistics, logic, transforms…',
              'girdi': 'What kind of data or specification does the course start from?',
              'cikti': 'What comes out at the end: a decision, a model, an image, a report…',
              'olcut': 'How do we tell that a solution is good?',
              'matematik': 'How much mathematics does it rely on, and which kind?',
              'veri': 'How much data does it need; can it work without data?'})
    cards = '<div class="ds-deck__card"><strong>%s</strong><p>%s</p></div>' % (
        T('Temel soru', 'Core question'), T('Dersin tek cümlelik varlık nedeni.', 'The course\'s reason to exist, in one sentence.')) + ''.join(
        '<div class="ds-deck__card"><strong>%s</strong><p>%s</p></div>' % (et, acik[al]) for al, et in alanlar())
    S.append(slide(T('Karşılaştırma Ölçütleri', 'Comparison Criteria'), ysec,
                   head(ysec, T('Dersleri Karşılaştırma Ölçütleri', 'Criteria for Comparing Courses')) +
                   '\n          <div class="ds-deck__grid ds-deck__grid--3 ai-cards">%s</div>' % cards))
    # etkilesimli harita
    hsec = T('Harita', 'Map')
    groups = []
    for k_no, _ in D.KISIMLAR:
        chips = ''.join('<button type="button" class="ai-map-c" data-k="%s">%s</button>' % (d[0], kisa(d[0]))
                        for d in D.DERSLER if d[2] == k_no)
        groups.append('<div class="ai-map-g"><div class="ai-map-h">%s</div>%s</div>' % (kisim_adi(k_no), chips))
    t = T('Etkileşimli Harita', 'Interactive Map')
    S.append(slide(t, hsec, head(hsec, t) + '''
          <div class="ai-map">
            <div class="ai-map-l">%s</div>
            <div class="ai-map-p" id="ai-map-p"><p class="ds-deck__muted">%s</p></div>
          </div>''' % (''.join(groups), T('Bir derse tıklayın: komşuları renklenir, ilişkileri burada listelenir.',
                                          'Click a course: its neighbours light up and its relations are listed here.'))))
    # kisimlar arasi baglar
    say = {}
    for a, _, b, _ in D.ILISKILER:
        key = tuple(sorted((D.KOD[a][2], D.KOD[b][2])))
        say[key] = say.get(key, 0) + 1
    enc = max(say.values())
    rom = ['I', 'II', 'III', 'IV', 'V', 'VI']
    hdr = '<tr><th></th>' + ''.join('<th>%s</th>' % rom[i] for i in range(6)) + '</tr>'
    rows = ''
    for i, (k_no, _) in enumerate(D.KISIMLAR):
        rows += '<tr><th style="text-align:left">%s. %s</th>' % (rom[i], kisim_adi(k_no))
        for j in range(6):
            c = say.get(tuple(sorted((i + 1, j + 1))), 0)
            rows += ('<td style="background:color-mix(in srgb, var(--ds-link) %d%%, var(--ds-bg));%s">%s</td>'
                     % (round(6 + 44 * c / enc) if c else 0, 'font-weight:700' if i == j else '', c or '·'))
        rows += '</tr>'
    t = T('Kısımlar Arası Bağlar', 'Links Between Parts')
    S.append(slide(t, hsec, head(hsec, t) +
                   '\n          <table class="ds-deck__table ai-tbl ai-mx" style="font-size:15px">%s%s</table>'
                   '\n          <div class="ds-deck__callout">%s</div>' % (hdr, rows, T(
                       'Hücredeki sayı, iki kısım arasındaki ilişki sayısıdır; köşegen kısmın kendi içindeki bağlarını gösterir. '
                       'Çekirdek ve matematik temeli bütün kısımlara bağlanır; sistem dersleri ise çoğunlukla çekirdeğe dayanır.',
                       'Each cell counts the relations between two parts; the diagonal shows links within a part. '
                       'The core and the mathematical foundations connect to every part, while the systems courses rest mostly on the core.'))))
    # en cok bagli dersler
    derece = sorted(D.DERSLER, key=lambda d: -len(D.komsular(d[0])))[:8]
    rows = ''.join('<tr><td style="white-space:nowrap">%s</td><td class="num">%d</td><td>%s</td></tr>' % (
        link(d[0], kisa(d[0])), len(D.komsular(d[0])),
        ', '.join(kisa(k) for k, _, _ in D.komsular(d[0])[:4]) + (' …' if len(D.komsular(d[0])) > 4 else ''))
        for d in derece)
    S.append(slide(T('Kavşak Dersler', 'Hub Courses'), hsec,
                   head(hsec, T('Kavşak Dersler: En Çok Bağı Olanlar', 'Hub Courses: The Most Connected')) +
                   '\n          <table class="ds-deck__table ai-tbl"><tr><th>%s</th><th class="num">%s</th><th>%s</th></tr>%s</table>'
                   '\n          <div class="ds-deck__callout">%s</div>' % (
                       T('Ders', 'Course'), T('Bağ', 'Links'), T('Bazı komşuları', 'Some neighbours'), rows, T(
                           'Makine öğrenmesi ile matematik temeli (doğrusal cebir, olasılık, optimizasyon) haritanın kavşaklarıdır: başka derslerin çoğu bunlardan birine dayanır.',
                           'Machine learning and the mathematical foundations (linear algebra, probability, optimization) are the hubs of the map: most other courses rest on one of them.'))))
    ksec = T('Kullanım', 'How to Use')
    S.append(slide(T('Nasıl Okunmalı?', 'How to Read It'), ksec, head(ksec, T('Rehber Nasıl Okunmalı?', 'How to Read This Guide')) + T('''
          <div class="ds-deck__grid ds-deck__grid--2 ai-cards">
            <div class="ds-deck__card"><strong>Baştan sona</strong><p>Çekirdek dersler (Bölüm 2–5) bütün haritanın ortak dilidir; önce onları okuyun.</p></div>
            <div class="ds-deck__card"><strong>İlgi alanından</strong><p>Görüntü, dil, veri ya da robotik: ilginizi çeken kısımdan başlayıp ön koşul tablolarını geriye doğru izleyin.</p></div>
            <div class="ds-deck__card"><strong>Karşılaştırarak</strong><p>Karıştırdığınız iki dersin "Ayrıştığı Noktalar" slaytlarını yan yana açın.</p></div>
            <div class="ds-deck__card"><strong>Seçmeli ders seçerken</strong><p>Son bölümdeki yol haritaları, birlikte alındığında anlamlı olan ders gruplarını önerir.</p></div>
          </div>''', '''
          <div class="ds-deck__grid ds-deck__grid--2 ai-cards">
            <div class="ds-deck__card"><strong>Front to back</strong><p>The core courses (Chapters 2–5) are the common language of the whole map; read them first.</p></div>
            <div class="ds-deck__card"><strong>From an interest</strong><p>Images, language, data or robotics: start from the part that interests you and follow the prerequisite tables backwards.</p></div>
            <div class="ds-deck__card"><strong>By comparison</strong><p>Open the "Where It Differs" slides of two courses you tend to confuse side by side.</p></div>
            <div class="ds-deck__card"><strong>Choosing electives</strong><p>The roadmaps in the last chapter suggest groups of courses that make sense together.</p></div>
          </div>''')))
    S.append(slide(T('Son', 'The End'), '', '          <h1>%s</h1>\n          <div class="ds-deck__subtitle">%s: %s</div>\n'
                   '          <small>%s: <a href="%s">%s: %s</a></small>'
                   % (T('Son', 'The End'), bolum(no), baslik, T('Sonraki bölüm', 'Next chapter'), dosya('YZ'), bolum(2), ad('YZ')),
                   ' ds-deck__slide--title'))
    data = [[d[0], kisa(d[0]), dosya(d[0])] for d in D.DERSLER]
    rels = [[a, t, b, konu(a, b, k)] for a, t, b, k in D.ILISKILER]
    css = '''  .ds-deck .ai-map { display: grid; grid-template-columns: minmax(0, 1.9fr) minmax(0, 1fr); gap: 12px; }
  .ds-deck .ai-map-g { margin-bottom: 4px; }
  .ds-deck .ai-map-h { font-size: 10.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--ds-muted); margin-bottom: 2px; }
  .ds-deck .ai-map-c { margin: 0 3px 3px 0; padding: 0 6px; line-height: 1.5; border: 1.5px solid var(--ds-border); border-radius: 999px; background: var(--ds-bg); color: var(--ds-text); font: inherit; font-size: 12px; cursor: pointer; }
  .ds-deck .ai-map-c.is-sel { border-color: var(--ds-accent); background: color-mix(in srgb, var(--ds-accent) 18%, var(--ds-bg)); font-weight: 700; }
  .ds-deck .ai-map-c.is-alt { border-color: var(--ds-accent); }
  .ds-deck .ai-map-c.is-temel { border-color: var(--ds-link); background: color-mix(in srgb, var(--ds-link) 14%, var(--ds-bg)); }
  .ds-deck .ai-map-c.is-yontem { border-color: var(--ds-good); background: color-mix(in srgb, var(--ds-good) 14%, var(--ds-bg)); }
  .ds-deck .ai-map-c.is-uygulama { border-color: #c77d12; background: color-mix(in srgb, #c77d12 14%, var(--ds-bg)); }
  .ds-deck .ai-map-p { padding: 10px 12px; border: 1.5px solid var(--ds-border); border-radius: 12px; background: var(--ds-bg); font-size: 13.5px; line-height: 1.35; max-height: 430px; overflow: auto; }
  .ds-deck .ai-map-p h3 { font-size: 16px; margin: 0 0 6px; }
  .ds-deck .ai-map-p ul { padding-left: 16px; }
  .ds-deck .ai-map-p li { margin: 3px 0; }'''
    script = '''
(function () {
  var D = %s;
  var R = %s;
  var RENK = %s;
  var AD = {};
  D.forEach(function (d) { AD[d[0]] = d; });
  var panel = document.getElementById("ai-map-p");
  var btns = document.querySelectorAll(".ai-map-c");
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\\"": "&quot;" }[c]; }); }
  function sec(k) {
    var kom = {};
    var li = [];
    R.forEach(function (r) {
      if (r[0] === k) { kom[r[2]] = r[1]; li.push([r[2], r[1], r[3], 1]); }
      else if (r[2] === k) { kom[r[0]] = r[1]; li.push([r[0], r[1], r[3], 0]); }
    });
    btns.forEach(function (b) {
      b.className = "ai-map-c" + (b.dataset.k === k ? " is-sel" : kom[b.dataset.k] ? " is-" + kom[b.dataset.k] : "");
    });
    var h = "<h3><a href=\\"" + AD[k][2] + "\\">" + esc(AD[k][1]) + "</a></h3><ul>";
    li.forEach(function (x) {
      h += "<li><b style=\\"color:" + RENK[x[1]] + "\\">" + esc(x[3] ? RENK.ad[x[1]][0] : RENK.ad[x[1]][1]) + "</b> " +
        "<a href=\\"" + AD[x[0]][2] + "\\">" + esc(AD[x[0]][1]) + "</a>: " + esc(x[2]) + "</li>";
    });
    panel.innerHTML = h + "</ul>";
  }
  btns.forEach(function (b) { b.addEventListener("click", function () { sec(b.dataset.k); }); });
})();
''' % (json.dumps(data, ensure_ascii=False), json.dumps(rels, ensure_ascii=False),
       json.dumps(dict(TUR_RENK, ad=T({'alt': ['üst alanı', 'alt alanı'], 'temel': ['temel aldığı', 'onu temel alan'],
                                       'yontem': ['yöntem ortağı', 'yöntem ortağı'], 'uygulama': ['uyguladığı', 'onu uygulayan']},
                                      {'alt': ['parent field', 'subfield'], 'temel': ['builds on', 'built on by'],
                                       'yontem': ['shares methods', 'shares methods'], 'uygulama': ['applies', 'applied by']})),
                  ensure_ascii=False))
    excerpt = T('%s dersi Bölüm 1: yapay zekâ ve veriyle ilgili %d dersin haritası; YZ, makine öğrenmesi, sinir ağları ve derin öğrenme '
                'ilişkisi, altı kısım, dersler arası ilişki türleri, karşılaştırma ölçütleri ve etkileşimli ders haritası.',
                '%s, Chapter 1 slides: a map of %d courses on AI and data; how AI, machine learning, neural networks and deep learning '
                'nest, six parts, kinds of relation, comparison criteria and an interactive course map.') % (ders_adi(), len(D.DERSLER))
    return page(no, baslik, excerpt, S, extra_css=css, script=script)


# ---------------------------------------------------------------- kapanis sunumu

YOLLAR = [
    ('Görü yolu', 'Görüntüden anlam çıkaran sistemler', ['DC', 'SSI', 'GI', 'BG', 'DO', 'TGI']),
    ('Dil yolu', 'Metin ve konuşmayla çalışan sistemler', ['OI', 'MO', 'NLP', 'DO', 'UM', 'BE']),
    ('Veri yolu', 'Veriden karar ve öngörü çıkarmak', ['OI', 'VB', 'VM', 'BV', 'ZS', 'SAA']),
    ('Robotik yolu', 'Fiziksel dünyada algılayıp hareket etmek', ['DC', 'OPT', 'ROB', 'PO', 'CES', 'GYZ']),
    ('Kuram yolu', 'Araştırmaya hazırlanmak', ['DC', 'OI', 'OPT', 'BK', 'OGM', 'MO']),
    ('Üretim yolu', 'Modeli gerçek bir ürüne dönüştürmek', ['MO', 'DO', 'GPU', 'MLOPS', 'GYZ', 'SGY']),
]

ILGI = [
    ('Görüntü ve video', ['GI', 'BG', 'TGI', 'UA', 'BGR', 'BIO', 'SSI', 'DO']),
    ('Dil ve konuşma', ['NLP', 'KSI', 'UM', 'BE', 'OGM', 'DO']),
    ('Veri ve iş dünyası', ['VB', 'VM', 'BV', 'ZS', 'BE', 'SAA', 'OI']),
    ('Robotlar ve fiziksel dünya', ['ROB', 'PO', 'CES', 'GYZ', 'BM', 'BG', 'SSI']),
    ('Matematik ve kuram', ['DC', 'OI', 'OPT', 'BK', 'OGM', 'EMO']),
    ('Sistemler ve donanım', ['GPU', 'MLOPS', 'GYZ', 'BV', 'SGY']),
    ('Güven, toplum ve sağlık', ['AYE', 'SGY', 'TGI', 'BIN', 'BIO']),
    ('Oyunlar ve karar verme', ['YZ', 'PO', 'CES', 'EMO', 'US', 'OPT']),
]

SENARYO = [
    ('Bir hastanenin MR görüntülerinde tümörün sınırlarını otomatik çizmek.', ['TGI', 'BG', 'GI'],
     'Bölütleme görüntü işleme ve görüden gelir; klinik veri, etiket azlığı ve sorumluluk bunu tıbbi görüntü işleme yapar.'),
    ('Bir e-ticaret sitesinde "bunu alanlar şunları da aldı" listesini kurmak.', ['BE', 'VM'],
     'Birliktelik kuralları veri madenciliğinden, kullanıcıya sıralı liste sunmak öneri sistemlerinden gelir.'),
    ('Bir fırının sıcaklığını "biraz sıcak", "çok sıcak" gibi kurallarla denetlemek.', ['BM'],
     'Keskin sınırı olmayan dilsel kurallar ve denetim, bulanık mantığın klasik uygulamasıdır.'),
    ('Bir insansız hava aracının rüzgârda dengede kalmayı deneyerek öğrenmesi.', ['PO', 'ROB'],
     'Etiket yok, yalnız ödül var: pekiştirmeli öğrenme. Fiziksel gövde ve algılayıcılar robotiğin konusu.'),
    ('Yüz bin algılayıcının saniyelik verisini saklayıp sorgulamak.', ['BV', 'ZS'],
     'Tek makineye sığmayan ve akan veri büyük veri sistemlerinin, zamana bağlı çözümlemesi zaman serisinin işidir.'),
    ('Okul servisleri için toplam yolu en kısa rota planını bulmak.', ['EMO', 'OPT', 'YZ'],
     'Kombinatoryal bir optimizasyon problemi: kesin yöntemler optimizasyondan, büyük örneklerde iyi çözüm metasezgisellerden gelir.'),
    ('Bir kredi modelinin bazı başvuru gruplarına haksızlık edip etmediğini denetlemek.', ['AYE', 'VB'],
     'Adalet ölçütleri, açıklama ve hesap verebilirlik açıklanabilir YZ ve etiğin konusudur.'),
    ('Telefonda internete bağlanmadan çalışan sesli komut tanıma.', ['GYZ', 'KSI'],
     'Konuşma tanıma modeli konuşma ve ses işlemeden gelir; cihaza sığdırmak gömülü YZ\'nin işidir.'),
    ('Bir hastalıkla ilgili genleri binlerce örneğin ifade verisinden bulmak.', ['BIN', 'OI'],
     'Biyolojik veri ve yorum biyoenformatik, çok sayıda testte anlamlılık istatistik bilgisi ister.'),
    ('Bir bankanın ağ trafiğinde olağandışı bağlantıları yakalamak.', ['SGY', 'VM'],
     'Aykırı değer bulma veri madenciliğinden gelir; saldırganın uyum sağlaması bunu siber güvenlik problemi yapar.'),
]

YOLLAR_EN = [
    ('Vision track', 'Systems that make sense of images', ['DC', 'SSI', 'GI', 'BG', 'DO', 'TGI']),
    ('Language track', 'Systems that work with text and speech', ['OI', 'MO', 'NLP', 'DO', 'UM', 'BE']),
    ('Data track', 'Turning data into decisions and forecasts', ['OI', 'VB', 'VM', 'BV', 'ZS', 'SAA']),
    ('Robotics track', 'Sensing and acting in the physical world', ['DC', 'OPT', 'ROB', 'PO', 'CES', 'GYZ']),
    ('Theory track', 'Preparing for research', ['DC', 'OI', 'OPT', 'BK', 'OGM', 'MO']),
    ('Production track', 'Turning a model into a real product', ['MO', 'DO', 'GPU', 'MLOPS', 'GYZ', 'SGY']),
]

ILGI_EN = ['Images and video', 'Language and speech', 'Data and business', 'Robots and the physical world',
           'Mathematics and theory', 'Systems and hardware', 'Trust, society and health', 'Games and decision making']

SENARYO_EN = [
    ('Automatically outlining tumours in a hospital\'s MRI scans.',
     'Segmentation comes from image processing and computer vision; clinical data, scarce labels and accountability make it medical image processing.'),
    ('Building a "customers who bought this also bought" list for an online shop.',
     'Association rules come from data mining; presenting a ranked list to the user is the job of recommender systems.'),
    ('Controlling an oven\'s temperature with rules like "a bit hot" and "very hot".',
     'Linguistic rules without sharp boundaries, used for control, are the classic application of fuzzy logic.'),
    ('A drone learning to stay level in the wind by trying.',
     'No labels, only a reward: reinforcement learning. The physical body and its sensors are the business of robotics.'),
    ('Storing and querying per-second readings from a hundred thousand sensors.',
     'Streaming data too large for one machine belongs to big data systems; analysing it over time is time series work.'),
    ('Finding the shortest total route plan for school buses.',
     'A combinatorial optimization problem: exact methods come from optimization, good solutions to large instances from metaheuristics.'),
    ('Auditing whether a credit model treats some groups of applicants unfairly.',
     'Fairness measures, explanations and accountability are the subject of explainable AI and ethics.'),
    ('Voice commands that work on a phone without an internet connection.',
     'The recognition model comes from speech and audio processing; fitting it onto the device is the job of embedded AI.'),
    ('Finding the genes linked to a disease from expression data of thousands of samples.',
     'Biological data and its interpretation are bioinformatics; significance across many tests needs statistics.'),
    ('Catching unusual connections in a bank\'s network traffic.',
     'Outlier detection comes from data mining; an attacker who adapts makes it a cybersecurity problem.'),
]


CIFTLER = [('GI', 'BG'), ('YZ', 'MO'), ('MO', 'VM'), ('VB', 'VM'), ('YSA', 'DO'), ('OT', 'MO'), ('NLP', 'KSI'),
           ('UM', 'DO'), ('BGR', 'BG'), ('MO', 'OI'), ('BE', 'VM'), ('US', 'BM'), ('EMO', 'OPT'), ('MLOPS', 'BV')]


def cift_cumlesi(a, b, icerik):
    for x, y in ((a, b), (b, a)):
        C = icerik.get(x)
        if C:
            for k, cumle in C['ayrisma']:
                if k == y:
                    return cumle
    return None


def kapanis(icerik):
    no = D.KAPANIS[0]
    baslik = T(D.KAPANIS[1], EN_KAPANIS[0])
    yollar = YOLLAR_EN if EN else YOLLAR
    ilgi = [(T(a, ILGI_EN[i]), ks) for i, (a, ks) in enumerate(ILGI)]
    senaryo = [(T(s, SENARYO_EN[i][0]), ks, T(n, SENARYO_EN[i][1])) for i, (s, ks, n) in enumerate(SENARYO)]
    S = []
    rom = ['I', 'II', 'III', 'IV', 'V', 'VI']
    S.append(slide('%s: %s' % (bolum(no), baslik), '',
                   '          <h1>%s</h1>\n          <div class="ds-deck__subtitle">%s</div>\n'
                   '          <div class="ds-deck__agenda" aria-label="%s">%s</div>\n'
                   '          <small>%s</small>' % (
                       T('Karşılaştırma ve<br>Yol Haritaları', 'Comparisons and<br>Roadmaps'), ders_adi(),
                       T('Sunum içeriği', 'Chapter contents'),
                       T('<span>Büyük tablo</span><span>Sık karıştırılan çiftler</span>'
                         '<span>Hangi ders?</span><span>İlgi alanından derse</span><span>Yol haritaları</span>',
                         '<span>The big table</span><span>Often-confused pairs</span>'
                         '<span>Which course?</span><span>From interest to course</span><span>Roadmaps</span>'),
                       T('Sercan KÜLCÜ · Giresun Üniversitesi · Bilgisayar Mühendisliği',
                         'Sercan KÜLCÜ · Giresun University · Computer Engineering')), ' ds-deck__slide--title'))
    # buyuk tablo, kisim kisim
    bsec = T('Büyük tablo', 'The big table')
    for k_no, _ in D.KISIMLAR:
        ds = [d for d in D.DERSLER if d[2] == k_no]
        hdr = '<tr><th>%s</th>' % T('Ders', 'Course') + ''.join('<th>%s</th>' % et for al, et in alanlar()[:4]) + '</tr>'
        rows = ''.join('<tr><th style="white-space:nowrap">%s</th>%s</tr>' % (
            link(d[0], kisa(d[0])), ''.join('<td>%s</td>' % profil(d[0])[1][al] for al, _ in alanlar()[:4])) for d in ds)
        t = T('Büyük Tablo: %s. %s', 'The Big Table: %s. %s') % (rom[k_no - 1], kisim_adi(k_no))
        fs = 13 if len(ds) <= 7 else 12
        S.append(slide(t, bsec, head(bsec, t) +
                       '\n          <table class="ds-deck__table ai-tbl" style="font-size:%dpx">%s%s</table>' % (fs, hdr, rows)))
    hepsi = list(D.DERSLER)
    for i in range(0, len(hepsi), 13):
        parca = hepsi[i:i + 13]
        t = T('Matematik ve Veri İhtiyacı (%d/3)', 'Math and Data Needs (%d/3)') % (i // 13 + 1)
        rows = ''.join('<tr><th style="white-space:nowrap">%s</th><td>%s</td><td>%s</td></tr>' % (
            link(d[0], kisa(d[0])), profil(d[0])[1]['matematik'], profil(d[0])[1]['veri']) for d in parca)
        S.append(slide(t, bsec, head(bsec, t) +
                       '\n          <table class="ds-deck__table ai-tbl" style="font-size:13px"><tr><th>%s</th><th>%s</th><th>%s</th></tr>%s</table>'
                       % (T('Ders', 'Course'), T('Matematik yükü', 'Math load'), T('Veri ihtiyacı', 'Data needs'), rows)))
    # sik karistirilan ciftler
    csec = T('Çiftler', 'Pairs')
    satir = []
    for a, b in CIFTLER:
        c = cift_cumlesi(a, b, icerik)
        if c:
            satir.append('<tr><td style="white-space:nowrap">%s ↔ %s</td><td>%s</td></tr>' % (link(a, kisa(a)), link(b, kisa(b)), c))
    for i in range(0, len(satir), 7):
        t = T('Sık Karıştırılan Çiftler', 'Often-Confused Pairs') + (' (%d/%d)' % (i // 7 + 1, (len(satir) + 6) // 7) if len(satir) > 7 else '')
        S.append(slide(t, csec, head(csec, t) +
                       '\n          <table class="ds-deck__table ai-tbl" style="font-size:13.5px"><tr><th>%s</th><th>%s</th></tr>%s</table>'
                       % (T('Çift', 'Pair'), T('Fark', 'Difference'), ''.join(satir[i:i + 7]))))
    # hangi ders?
    hsec = T('Hangi ders?', 'Which course?')
    for i in range(0, len(senaryo), 5):
        t = T('Hangi Ders? (%d/%d)', 'Which Course? (%d/%d)') % (i // 5 + 1, (len(senaryo) + 4) // 5)
        items = ''.join('<li><b>%s</b><details class="ai-ans"><summary>%s</summary>%s. %s</details></li>' % (
            s, T('Cevap', 'Answer'), ', '.join(link(k, kisa(k)) for k in ks), neden) for s, ks, neden in senaryo[i:i + 5])
        S.append(slide(t, hsec, head(hsec, t) +
                       '\n          <p class="ds-deck__small ds-deck__muted">%s</p>'
                       '\n          <ol class="ai-sen">%s</ol>' % (T(
                           'Her problem için hangi dersin işi olduğunu düşünün, sonra cevabı açın.',
                           'For each problem, decide which course it belongs to, then open the answer.'), items)))
    # ilgi alanindan derse
    ssec = T('Seçim', 'Choosing')
    btns = ''.join('<button type="button" class="ai-ilgi-b" data-i="%d">%s</button>' % (i, a) for i, (a, _) in enumerate(ilgi))
    t = T('İlgi Alanından Derse', 'From Interest to Course')
    S.append(slide(t, ssec, head(ssec, t) + '''
          <p class="ds-deck__small ds-deck__muted">%s</p>
          <div class="ai-ilgi">%s</div>
          <div class="ai-ilgi-s" id="ai-ilgi-s"></div>''' % (T(
        'Bir ya da birkaç ilgi alanı seçin; o alanlara en çok hizmet eden dersler, kaç alana dokunduklarına göre sıralanır.',
        'Pick one or more interests; the courses that serve them are listed, ranked by how many of your interests they touch.'), btns)))
    # yol haritalari
    for i in range(0, len(yollar), 3):
        rows = ''
        for ad_, acik, ks in yollar[i:i + 3]:
            rows += ('<div class="ai-yol"><div class="ai-yol-h"><b>%s</b> <span>%s</span></div><div class="ai-yol-c">%s</div></div>'
                     % (ad_, acik, '<span class="ai-ok">→</span>'.join('<a href="%s">%s</a>' % (dosya(k), kisa(k)) for k in ks)))
        t = T('Yol Haritaları (%d/%d)', 'Roadmaps (%d/%d)') % (i // 3 + 1, (len(yollar) + 2) // 3)
        S.append(slide(t, ssec, head(ssec, t) + '\n          ' + rows +
                       '\n          <p class="ds-deck__small ds-deck__muted" style="margin-top:10px">%s</p>' % T(
                           'Her yol ön koşuldan uzmanlığa doğru sıralanmıştır; yollar kesişir, birden çoğunu izlemek olağandır.',
                           'Each track runs from prerequisites to specialization; the tracks cross, and following more than one is normal.')))
    S.append(slide(T('Son Söz', 'Final Thoughts'), ssec, head(ssec, T('Son Söz', 'Final Thoughts')) + T('''
          <div class="ds-deck__grid ds-deck__grid--2 ai-cards">
            <div class="ds-deck__card"><strong>Ortak dil</strong><p>Doğrusal cebir, olasılık ve optimizasyon hemen her dersin ortak dilidir; bunlar sağlamsa geçişler kolaydır.</p></div>
            <div class="ds-deck__card"><strong>Kavşak ders</strong><p>Makine öğrenmesi haritanın merkezidir: dallar ona dayanır, uygulamalar onu kullanır.</p></div>
            <div class="ds-deck__card"><strong>Ayrım soruda</strong><p>İki ders aynı algoritmayı kullanabilir; onları ayıran, sordukları soru ve başarıyı nasıl ölçtükleridir.</p></div>
            <div class="ds-deck__card"><strong>Alan değişir</strong><p>Bugün ayrı dersler yarın birleşebilir; haritayı ezberlemek yerine ilişki türlerini anlamak kalıcıdır.</p></div>
          </div>''', '''
          <div class="ds-deck__grid ds-deck__grid--2 ai-cards">
            <div class="ds-deck__card"><strong>A common language</strong><p>Linear algebra, probability and optimization are shared by almost every course; with these in place, moving between courses is easy.</p></div>
            <div class="ds-deck__card"><strong>The hub</strong><p>Machine learning sits at the centre of the map: the branches rest on it and the applications use it.</p></div>
            <div class="ds-deck__card"><strong>The question decides</strong><p>Two courses may use the same algorithm; what separates them is the question they ask and how they measure success.</p></div>
            <div class="ds-deck__card"><strong>The field moves</strong><p>Separate courses today may merge tomorrow; understanding the kinds of relation lasts longer than memorizing the map.</p></div>
          </div>''')))
    S.append(slide(T('Son', 'The End'), '', '          <h1>%s</h1>\n          <div class="ds-deck__subtitle">%s: %s</div>\n'
                   '          <small><a href="%s">%s</a> · <a href="%s">%s</a></small>'
                   % (T('Son', 'The End'), bolum(no), baslik, dosya(D.DERSLER[-1][0]), T('← Önceki bölüm', '← Previous chapter'),
                      dosya_no(1), T('Alanın haritası', 'Map of the field')), ' ds-deck__slide--title'))
    css = '''  .ds-deck .ai-sen { font-size: 15.5px; }
  .ds-deck .ai-sen li { margin: 4px 0 6px; }
  .ds-deck .ai-ans { margin-top: 2px; font-size: 14px; color: var(--ds-text); }
  .ds-deck .ai-ans summary { cursor: pointer; color: var(--ds-link); font-weight: 700; font-size: 13px; }
  .ds-deck .ai-ilgi { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
  .ds-deck .ai-ilgi-b { padding: 4px 12px; border: 1.5px solid var(--ds-border); border-radius: 999px; background: var(--ds-bg); color: var(--ds-text); font: inherit; font-size: 14px; cursor: pointer; }
  .ds-deck .ai-ilgi-b.is-on { border-color: var(--ds-accent); background: color-mix(in srgb, var(--ds-accent) 16%, var(--ds-bg)); font-weight: 700; }
  .ds-deck .ai-ilgi-s { display: flex; flex-wrap: wrap; gap: 6px; }
  .ds-deck .ai-ilgi-s a { padding: 3px 10px; border: 1.5px solid var(--ds-border); border-radius: 999px; background: var(--ds-bg); font-size: 14px; }
  .ds-deck .ai-ilgi-s a b { margin-left: 5px; color: var(--ds-accent); }
  .ds-deck .ai-yol { padding: 10px 0 12px; border-bottom: 1px solid var(--ds-border); }
  .ds-deck .ai-yol-h { margin-bottom: 8px; }
  .ds-deck .ai-yol-h b { font-size: 17px; color: var(--ds-accent); }
  .ds-deck .ai-yol-h span { font-size: 14.5px; color: var(--ds-muted); }
  .ds-deck .ai-yol-c { font-size: 15px; line-height: 2.1; }
  .ds-deck .ai-yol-c a { padding: 2px 8px; border: 1.5px solid var(--ds-border); border-radius: 999px; background: var(--ds-bg); white-space: nowrap; display: inline-block; line-height: 1.5; }
  .ds-deck .ai-ok { margin: 0 4px; color: var(--ds-link); font-weight: 800; }'''
    data = {d[0]: [kisa(d[0]), dosya(d[0])] for d in D.DERSLER}
    script = '''
(function () {
  var D = %s;
  var I = %s;
  var sec = {};
  var out = document.getElementById("ai-ilgi-s");
  var btns = document.querySelectorAll(".ai-ilgi-b");
  function ciz() {
    var say = {};
    Object.keys(sec).forEach(function (i) { if (sec[i]) { I[i].forEach(function (k) { say[k] = (say[k] || 0) + 1; }); } });
    var ks = Object.keys(say).sort(function (a, b) { return say[b] - say[a]; });
    out.innerHTML = ks.length ? ks.map(function (k) {
      return "<a href=\\"" + D[k][1] + "\\">" + D[k][0] + (say[k] > 1 ? "<b>×" + say[k] + "</b>" : "") + "</a>";
    }).join("") : "<span class=\\"ds-deck__muted\\">%s</span>";
  }
  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      var i = b.dataset.i; sec[i] = !sec[i]; b.classList.toggle("is-on", sec[i]); ciz();
    });
  });
  ciz();
})();
''' % (json.dumps(data, ensure_ascii=False), json.dumps([ks for _, ks in ilgi], ensure_ascii=False),
       T('Henüz seçim yok.', 'Nothing selected yet.'))
    excerpt = T('%s dersi Bölüm %d: %d dersin yaklaşım, girdi, çıktı, başarı ölçütü, matematik ve veri ihtiyacına göre karşılaştırması, '
                'sık karıştırılan ders çiftleri, hangi ders soruları, ilgi alanına göre ders seçimi ve yol haritaları.',
                '%s, Chapter %d slides: %d courses compared by approach, input, output, success measure, math and data needs; '
                'often-confused pairs, which-course questions, choosing by interest, and roadmaps.') % (ders_adi(), no, len(D.DERSLER))
    return page(no, baslik, excerpt, S, extra_css=css, script=script)


# ---------------------------------------------------------------- ders sayfasi

def sayfa_blogu(icerik):
    """Ders sayfasinin bir dil blogu (EN globaline gore)."""
    rom = ['I', 'II', 'III', 'IV', 'V', 'VI']
    kl = 'slides' if EN else 'sunumlar'
    sun = T('🖼️ Sunum', '🖼️ Slides')

    def lnk(f):
        s = '- [%s](/files/ai_courses/%s/%s)' % (sun, kl, f)
        pdf = f[:-5] + '.pdf'
        if os.path.exists(os.path.join(os.path.dirname(REPO), 'courses-pdfs', 'ai_courses', 'pdf', pdf)):
            s += ' · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/ai_courses/pdf/%s)' % pdf
        return s
    L = ['---', '', '## %s' % T('Ders Haritası', 'Course Map'), '',
         '### %s: %s' % (bolum(1), T(D.ACILIS[1], EN_ACILIS[0])), '',
         T('Bu bölümde rehberin amacı, yapay zekâ, makine öğrenmesi, yapay sinir ağları ve derin öğrenmenin iç içe ilişkisi, dersleri bölen altı kısım, '
           'dersler arasındaki dört ilişki türü (alt alan, temel alma, yöntem paylaşma, uygulama) ve karşılaştırma ölçütleri tanıtılır. '
           'Etkileşimli haritada bir derse tıklanınca komşuları ve ilişkileri görünür.',
           'This chapter sets out the purpose of the guide, how artificial intelligence, machine learning, neural networks and deep learning nest '
           'inside one another, the six parts that group the courses, the four kinds of relation between courses (subfield, builds on, shares methods, '
           'application) and the criteria used to compare them. Clicking a course on the interactive map shows its neighbours and relations.'), '',
         lnk(dosya_no(1)), '', '---', '']
    for k_no, _ in D.KISIMLAR:
        L += ['## %s %s: %s' % (T('Kısım', 'Part'), rom[k_no - 1], kisim_adi(k_no)), '']
        for d in [x for x in D.DERSLER if x[2] == k_no]:
            C = icerik.get(d[0])
            L += ['### %s: %s' % (bolum(d[1]), ad(d[0])), '',
                  '*%s* %s' % (soru(d[0]), re.sub(r'<[^>]+>', '', C['tanim']) if C else ''), '',
                  lnk(dosya(d[0])), '']
        L += ['---', '']
    L += ['## %s' % T('Kapanış', 'Wrap-Up'), '', '### %s: %s' % (bolum(D.KAPANIS[0]), T(D.KAPANIS[1], EN_KAPANIS[0])), '',
          T('Bütün dersler yaklaşım, girdi, çıktı, başarı ölçütü, matematik yükü ve veri ihtiyacına göre tek bir tabloda karşılaştırılır. '
            'Sık karıştırılan ders çiftlerinin farkları, gerçek problemlerin hangi derse düştüğünü soran örnekler, ilgi alanına göre ders öneren '
            'etkileşimli bir süzgeç ve birlikte alındığında anlamlı olan ders yolları verilir.',
            'All courses are compared in one table by approach, input, output, success measure, math load and data needs. '
            'The chapter also covers the differences between often-confused pairs, real problems to sort into the right course, '
            'an interactive filter that suggests courses by interest, and tracks of courses that make sense together.'), '',
          lnk(dosya_no(D.KAPANIS[0]))]
    return L


def ders_sayfasi(icerik_tr, icerik_en):
    global EN
    L = ['---', 'title: "Guide to AI and Data Courses"', 'lang_toggle: true', 'collection: teaching', 'type: "Undergraduate"',
         'permalink: %s' % DERS_URL, 'venue: "Giresun University, Computer Engineering"', 'date: 2023-09-01',
         'location: "Giresun, Turkey"', 'course_language: [tr, en]', '---', '',
         ('![ai and data courses](/images/teaching/teaching-ai-courses.webp){: .align-left width="200" height="150" style="float: left; margin-right: 10px;"} \n'
          if os.path.exists(os.path.join(REPO, 'images', 'teaching', 'teaching-ai-courses.webp')) else '') +
         'This course is a map of the courses around artificial intelligence and data. Each of its %d presentations introduces one course: '
         'the question it asks, its core concepts, a typical workflow, its prerequisites, the courses it overlaps with and the points where it '
         'differs from its nearest neighbours, its applications and tools. '
         'There are no lecture notes, code examples or textbook: the aim is to help students see the field as a whole before choosing their electives.'
         % len(D.DERSLER), '', '']
    for dil, ic in ((False, icerik_tr), (True, icerik_en)):
        EN = dil
        L += ['<div data-lt="%s" lang="%s" markdown="1">' % (T('tr', 'en'), T('tr', 'en')), ''] + sayfa_blogu(ic) + ['', '</div>', '']
    EN = False
    s = '\n'.join(L)
    assert '{{' not in s and '{%' not in s
    p = os.path.join(REPO, '_teaching', 'ai-courses.md')
    open(p, 'w', encoding='utf-8', newline='\n').write(s)
    return p


def iliskileri_denetle():
    gorulen = {}
    for a, t, b, _ in D.ILISKILER:
        if a not in D.KOD or b not in D.KOD or t not in D.TURLER:
            raise SystemExit('ILISKILER: bilinmeyen kod ya da tur: %s %s %s' % (a, t, b))
        cift = frozenset((a, b))
        if cift in gorulen:
            raise SystemExit('ILISKILER: %s ile %s arasinda iki iliski var' % (a, b))
        gorulen[cift] = t
    for kod in D.KOD:
        if kod not in P.PROFIL:
            raise SystemExit('profiller.py: %s icin profil yok' % kod)


def main():
    global EN
    iliskileri_denetle()
    istek = sys.argv[1:]
    yazilan = []
    icerikler = {}
    for dil in (False, True):
        EN = dil
        os.makedirs(out_dir(), exist_ok=True)
        if not istek or 'ACILIS' in istek:
            yazilan.append(acilis())
        icerik = {}
        for d in D.DERSLER:
            C = icerik_yukle(d[0])
            if C is None:
                continue
            icerik[d[0]] = C
            if istek and d[0] not in istek:
                continue
            yazilan.append(ders_sunumu(d[0], C))
        if not istek or 'KAPANIS' in istek:
            yazilan.append(kapanis(icerik))
        icerikler[dil] = icerik
    EN = False
    if not istek or 'SAYFA' in istek:
        yazilan.append(ders_sayfasi(icerikler[False], icerikler[True]))
    for f in yazilan:
        print(f)


if __name__ == '__main__':
    main()
