# -*- coding: utf-8 -*-
"""Algorithmic Game Theory: Algoritmik Oyun Kurami kitabinin Ingilizce surumu (lang='en').

Ders sayfasinin <div data-lt="en"> blogundan okunur; notlar notes/Chapter_NN_*_Lecture_Notes.html,
ekler Prerequisites.html ve Important_People.html, harita Course_Map.html, sozluk Dictionary.html.
"""
import notes_book

PREFACE = '''
<p>Algorithmic game theory studies strategic interaction through a computer scientist's eyes:
it combines the models of game theory with algorithms and complexity analysis. This book is
made up of the notes for the Algorithmic Game Theory course taught in the Department of
Computer Engineering at Giresun University, and its chapters follow the order of the
course.</p>

<p>The book has five parts. __PARTS__ Chapter 0 rebuilds the mathematics the course uses (probability,
expected value, optimization) through game examples; readers who know these topics can
start directly with Chapter 1.</p>

<p>Every chapter follows the same layout. It opens with learning outcomes. Formal
definitions, theorems and worked examples are set in named boxes. <em>Common mistake</em>
boxes point out the misconceptions students fall into most often. Code traces show, step by
step, how the calculations are done with short Python functions. Each chapter closes with a
summary, a list of key terms, <em>Test Yourself</em> questions with their answers,
suggestions for further reading and a bibliography. The glossary at the end of the book
defines each key term in a sentence and names the chapter that explains it.</p>

<p>The code for each chapter is in its own folder in the companion repository
<span class="u">github.com/sercankulcu/algorithmic-game-theory-python-en</span>. The
interactive figures in the notes are printed in this book with their default values. Slides,
study questions and the games played in class are on the course page.</p>
'''

notes_book.setup(
    globals(),
    lang='en',
    folder='agt',
    course_page='algorithmic-game-theory.md',
    title='Algorithmic Game Theory',
    subtitle='Games, equilibria, mechanisms and computation',
    output='agt/Algorithmic-Game-Theory.pdf',        # under courses-pdfs/
    glossary='Dictionary.html',
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'Algorithmic Game Theory course textbook: games, equilibria, mechanism design, '
                      'auctions, voting, networks, learning',
          '/Keywords': 'game theory, algorithmic game theory, Nash equilibrium, mechanism design, '
                       'auctions, textbook'},
    preface=PREFACE,
    colophon='''<p>Slides, study questions, the games and the working versions of the interactive
     figures are on that page. The interactive figures in this book are printed with their
     default values. The code for each chapter is in the
     <span class="u">github.com/sercankulcu/algorithmic-game-theory-python-en</span> repository.</p>''',
    # course map: at the top of the contents, before Part I
    intro=[('Course_Map.html', 'harita')],
    # interactive figures (data-widget) are drawn by this script
    extra_css=['slides/deck/kaydirici.css'],
    scripts=['slides/deck/kaydirici.js'],
)
