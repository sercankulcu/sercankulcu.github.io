# -*- coding: utf-8 -*-
"""Advanced Algorithms: Ileri Algoritmalar kitabinin Ingilizce surumu (lang='en').

Ders sayfasinin <div data-lt="en"> blogundan okunur; notlar notes/Chapter_NN_*_Lecture_Notes.html,
ekler Prerequisites.html ve Important_People.html, harita Course_Map.html, sozluk Dictionary.html.
"""
import notes_book

PREFACE = '''
<p>This book is made up of the notes for the Advanced Algorithms course taught in the
Department of Computer Engineering at Giresun University, and it continues the
<em>Algorithms</em> book. Algorithm complexity, sorting, searching, graph and string algorithms
are covered there and are assumed here. The book studies the main methods of algorithm
design, ways of coping with hard problems, and models of computation beyond the sequential,
deterministic one. The chapters follow the order of the course; the examples are written in
Java.</p>

<p>The book has three parts. __PARTS__</p>

<p>Every chapter follows the same layout. It opens with learning outcomes. Formal
definitions, theorems and worked examples are set in named boxes. <em>Common mistake</em>
boxes point out the misconceptions students fall into most often. Traces show, step by
step, how an algorithm builds its solution. Each chapter closes with a summary, a list of
key terms, <em>Test Yourself</em> questions with their answers, suggestions for further
reading and a bibliography. The glossary at the end of the book defines each key term in a
sentence and names the chapter that explains it.</p>

<p>The code for each chapter is in its own folder in the companion repository,
<span class="u">github.com/sercankulcu/advanced-algorithms-java-en</span>, and the programs use
the same names as the listings in this book. Slides, study questions and simulators are on the
course page.</p>
'''

notes_book.setup(
    globals(),
    lang='en',
    folder='advanced_algorithms',
    course_page='advanced-algorithms.md',
    # course map: at the top of the contents, before Part I
    intro=[('Course_Map.html', 'harita')],
    glossary='Dictionary.html',
    title='Advanced Algorithms',
    subtitle='Techniques for Hard Problems',
    output='advanced_algorithms/Advanced-Algorithms.pdf',   # under courses-pdfs/
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'Advanced Algorithms course textbook: divide and conquer, greedy algorithms, dynamic '
                      'programming, backtracking, branch and bound, approximation, randomized, online and '
                      'parallel algorithms',
          '/Keywords': 'algorithms, algorithm design, dynamic programming, NP-hard, approximation, Java, textbook'},
    preface=PREFACE,
    colophon='''<p>Slides, study questions and simulators are on that page. The code for each
     chapter is in the <span class="u">github.com/sercankulcu/advanced-algorithms-java-en</span>
     repository.</p>''',
)
