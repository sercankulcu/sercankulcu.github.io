# -*- coding: utf-8 -*-
"""Oyunlar: /games/ sayfasi, oyun sayfalarinin arama on bilgisi ve paylasim kartlari.

    python tools/make_game_pages.py

make_app_pages.py ile ayni yontem:
1. _pages/games.md'yi kart duzeniyle yeniden yazar. Gruplar, siralama, emoji ve oyunun
   arayuz dili asagidaki GROUPS listesindedir; ad ve aciklama oyun sayfasinin title ve
   excerpt'inden gelir (hub ile oyun sayfasi ayni adi kullanir).
2. Her oyun sayfasinin on bilgisine lang, seo_title, og_image ve game_genre yazar;
   _includes/head/custom.html game_genre'den VideoGame JSON-LD'si kurar. Bu dort anahtari
   betik yonetir, elle degistirmeyin.
3. Her oyun icin 1200x630 paylasim karti cizer: images/games/<ad>.jpg
"""
import io, json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import make_app_pages as A

REPO, SITE, e = A.REPO, A.SITE, A.e
CARD_DIR = 'images/games'
CARD_BASE = SITE + '/' + CARD_DIR + '/'
MANAGED = ('lang', 'seo_title', 'og_image', 'game_genre')

# (emoji, grup, vurgu rengi, tur, oyunlar: (emoji, ad, arayuz dili))
GROUPS = [
    ('🎮', 'Arcade & action', '#c0392b', 'Arcade', [
        ('🏎️', 'car-race', 'en'), ('🏀', 'basketball', 'en'), ('⚡', 'fastreflex', 'en'),
        ('🚦', 'squid', 'en'), ('🏓', 'pong', 'en'), ('🐦', 'flappy-bird', 'tr')]),
    ('🧠', 'Puzzle & logic', '#2f8a6b', 'Puzzle', [
        ('💣', 'minesweeper', 'en'), ('🔢', 'sudoku', 'en'), ('🧩', 'connections', 'en'),
        ('🧶', 'strands', 'tr'), ('🃏', 'memory', 'en'), ('🐂', 'bulls-and-cows', 'en'),
        ('🔀', 'sliding-puzzle', 'en'), ('⚓', 'battleship', 'tr')]),
    ('🔤', 'Word games', '#1f6fb2', 'Word game', [
        ('5️⃣', 'fiveletters', 'tr'), ('6️⃣', 'sixletters', 'tr'), ('🔤', 'oneword', 'tr'),
        ('🐝', 'spellbee', 'tr'), ('🎯', 'hangman', 'tr'), ('🔡', 'boggle', 'tr')]),
    ('🎓', 'Quiz & brain training', '#e08a00', 'Quiz', [
        ('🏳️', 'flagquiz', 'en'), ('➗', 'mathmaster', 'en'), ('💰', 'millionaire', 'tr'),
        ('🌍', 'capital-city-quiz', 'en'), ('🎬', 'movie-quiz', 'en'), ('🎨', 'pixar-color-millionaire', 'tr'),
        ('🎭', 'emoji-quiz', 'tr'), ('🗺️', 'turkiye-cografya-quiz', 'tr')]),
    ('🎲', 'Classic & casual', '#7b3fa0', 'Casual', [
        ('🪙', 'yazitura', 'en'), ('🔴', 'connectfour', 'en'), ('❌', 'tictactoe', 'en')]),
]

# arama basligi: genel kalip yerine daha aranir bir ifade
SEO = {
    'fiveletters': 'Beş Harf · Türkçe Wordle, Kelime Tahmin Oyunu',
    'sixletters': 'Altı Harf · 6 Harfli Türkçe Wordle',
    'hangman': 'Adam Asmaca · Türkçe Kelime Tahmin Oyunu',
    'strands': 'Strands · Türkçe Temalı Kelime Avı',
    'oneword': 'Bir Kelime · Türkçe Kelime Türetme Oyunu',
    'spellbee': 'Spell Bee · Türkçe Kelime Oyunu',
    'boggle': 'Boggle · Türkçe Kelime Bulma Oyunu',
    'millionaire': 'Milyoner · Online Bilgi Yarışması Oyunu',
    'turkiye-cografya-quiz': 'Türkiye Coğrafya Quiz · İller, Bölgeler, Dağlar ve Nehirler',
}
TXT = {
    'en': dict(seo='%s · Free Online Game', kicker='Free browser game', l2='Free · Plays in your browser'),
    'tr': dict(seo='%s · Ücretsiz Online Oyun', kicker='Ücretsiz tarayıcı oyunu', l2='Ücretsiz · Tarayıcıda oynanır'),
}


def page_file(name):
    return os.path.join(REPO, 'game', name + '.html')


def read_meta(name):
    s = io.open(page_file(name), encoding='utf-8').read()
    fm = s[4:s.index('\n---\n', 4)]
    assert re.search(r'^permalink: /game/%s/$' % re.escape(name), fm, re.M), name
    g = lambda k: json.loads(re.search(r'^%s: (".*")$' % k, fm, re.M).group(1))
    return g('title'), g('excerpt')


HUB_CSS = A.HUB_CSS.replace('apps-', 'games-')


def build():
    items, out, cards, n = [], [], [], 0
    for gi, gname, accent, genre, games in GROUPS:
        out.append('<h2 class="games-group">%s %s</h2>' % (gi, e(gname)))
        out.append('<div class="games-grid">')
        for ico, name, lang in games:
            title, excerpt = read_meta(name)
            url = '/game/%s/' % name
            n += 1
            items.append({'@type': 'ListItem', 'position': n, 'url': SITE + url, 'name': title})
            la = ' lang="tr"' if lang == 'tr' else ''
            out.append('<a class="app-card" href="%s"%s><span class="app-head"><span class="app-ico" aria-hidden="true">'
                       '%s</span>%s</span><span class="app-desc">%s</span></a>' % (url, la, ico, e(title), e(excerpt)))
            t = TXT[lang]
            A.update_front_matter(url, ['lang: ' + lang,
                                        'seo_title: ' + json.dumps(SEO.get(name, t['seo'] % title), ensure_ascii=False),
                                        'og_image: ' + CARD_BASE + name + '.jpg',
                                        'game_genre: ' + json.dumps(genre)],
                                  path=page_file(name), managed=MANAGED)
            cards.append((name, A.card_html(title, excerpt, ico, accent, False, kicker=t['kicker'], l2=t['l2'], lang=lang)))
        out.append('</div>')

    ld = {'@context': 'https://schema.org', '@type': 'ItemList', 'name': 'Free browser games',
          'numberOfItems': n, 'itemListElement': items}
    desc = ('%d free games that play right in your browser: arcade, puzzle and logic games, '
            'Turkish word games, quizzes and classics. No download, no sign-up.' % n)
    hub = """---
layout: archive
permalink: /games/
title: "Games"
seo_title: "Free Browser Games: Puzzles, Turkish Word Games and Quizzes"
description: %s
author_profile: true
json_ld: %s
---

<style>%s</style>

<p class="games-intro">%d free games that play right in your browser, on a phone or a computer.
No download, no sign-up. Some of the word games and quizzes are in Turkish.</p>

%s
""" % (json.dumps(desc, ensure_ascii=False), json.dumps(json.dumps(ld, ensure_ascii=False), ensure_ascii=False),
           HUB_CSS.strip(), n, '\n'.join(out))
    assert '{{' not in hub and '{%' not in hub
    path = os.path.join(REPO, '_pages', 'games.md')
    old = io.open(path, encoding='utf-8').read() if os.path.exists(path) else None
    if old != hub:
        io.open(path, 'w', encoding='utf-8', newline='\n').write(hub)
        print('yazildi _pages/games.md')
    A.render_cards(cards, CARD_DIR)


if __name__ == '__main__':
    build()
