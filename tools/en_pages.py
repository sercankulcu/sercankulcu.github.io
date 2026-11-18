# -*- coding: utf-8 -*-
"""English-address copies of the Turkish games: slug, title, search title and description.

Used by tools/make_tr_pages.py (the copies, the /games/ hub links) and tools/make_related.py.
The Turkish page stays at /game/<name>/ and opens in Turkish; the copy at /game/en/<slug>/ opens
in English (ui_lang: en).
"""

GAMES_HUB = '/games/'
PREFIX = '/game/en/'

# Turkish page URL: (English slug, English title, seo_title, excerpt)
GAMES = {
    '/game/fiveletters/': ('five-letters', 'Five Letters', 'Five Letters · Turkish Wordle, Daily Word Puzzle',
        'Guess the five-letter Turkish word in six tries; a new puzzle every day.'),
    '/game/sixletters/': ('six-letters', 'Six Letters', 'Six Letters · 6-Letter Turkish Wordle',
        'Guess the six-letter Turkish word in six tries; a new puzzle every day.'),
    '/game/oneword/': ('one-word', 'One Word', 'One Word · Turkish Word Building Game',
        'Build as many Turkish words as you can from seven letters before the time runs out.'),
    '/game/spellbee/': ('spell-bee', 'Spell Bee', 'Spell Bee · Turkish Word Puzzle',
        'Make Turkish words from seven letters; every word must use the centre letter.'),
    '/game/hangman/': ('hangman', 'Hangman', 'Hangman · Word Guessing Game in Turkish and Five More Languages',
        'Find the hidden word before six misses; Turkish and five other languages.'),
    '/game/boggle/': ('boggle', 'Boggle', 'Boggle · Turkish Word Search Game',
        'Find as many Turkish words as you can on a 4×4 letter grid before the time runs out.'),
    '/game/strands/': ('strands', 'Strands', 'Strands · Turkish Themed Word Search',
        'Find five hidden Turkish words on one theme; a new grid every day.'),
    '/game/sliding-puzzle/': ('sliding-puzzle', 'Sliding Puzzle', 'Sliding Puzzle · Play the 15 Puzzle Online',
        'Classic 15 puzzle: slide numbered tiles into order on a 3×3, 4×4 or 5×5 board.'),
    '/game/battleship/': ('battleship', 'Battleship', 'Battleship · Free Online Game Against the Computer',
        'Place your fleet and sink the computer\'s hidden ships before it sinks yours.'),
    '/game/flappy-bird/': ('floppy-bird', 'Floppy Bird', 'Floppy Bird · Free Online Game',
        'Tap or press Space to flap through the pipes and set a high score.'),
    '/game/millionaire/': ('millionaire', 'Millionaire', 'Millionaire · Online Trivia Quiz Game',
        'Answer 10 questions from easy to hard with three lifelines.'),
    '/game/pixar-color-millionaire/': ('pixar-color-millionaire', 'Pixar Color Millionaire',
        'Pixar Color Millionaire · Guess Pixar Films from Their Colors',
        'Name Pixar films from their colour palettes in a 15-question quiz.'),
    '/game/emoji-quiz/': ('emoji-quiz', 'Emoji Quiz', 'Emoji Quiz · Guess Films and Countries from Emojis',
        'Guess the film, country, food or saying from emoji clues against the clock.'),
    '/game/turkiye-cografya-quiz/': ('turkiye-geography-quiz', 'Türkiye Geography Quiz',
        'Türkiye Geography Quiz · Provinces, Regions, Mountains and Rivers',
        "A timed quiz on Türkiye's provinces, regions, mountains, rivers and lakes."),
}


def en_url(tr_url):
    return PREFIX + GAMES[tr_url][0] + '/' if tr_url in GAMES else None
