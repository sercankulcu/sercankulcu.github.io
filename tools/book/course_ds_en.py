# -*- coding: utf-8 -*-
"""Data Structures: Veri Yapilari kitabinin Ingilizce surumu (lang='en').

Ayni ders sayfasinin <div data-lt="en"> blogundan okunur: "## Part I: ..." /
"### Chapter N: ..." duzeni, notes/Chapter_NN_*_Lecture_Notes.html notlari, Prerequisites.html ve Important_People.html
ekleri ve Course_Map.html. Sozluk (sozluk.html) iki dilli, iki kitapta da ayni dosya.
"""
import notes_book

COURSE_PAGE = 'data-structures.md'

PREFACE = '''
<p>Data structures determine how data is laid out in memory and how it is accessed;
choosing the right structure directly affects how fast operations such as searching,
insertion, deletion and traversal run. This book is made up of the notes for the Data
Structures course taught in the Department of Computer Engineering at Giresun University,
and its chapters follow the order of the course. The examples are written in Java.</p>

<p>The book has four parts. __PARTS__</p>

<p>Every chapter follows the same layout. It opens with learning outcomes. Formal
definitions, theorems and worked examples are set in named boxes. <em>Common mistake</em>
boxes point out the misconceptions students fall into most often. Code traces show, step by
step, how an operation changes the structure. Each chapter closes with a summary, a list of
key terms, <em>Test Yourself</em> questions with their answers, suggestions for further
reading and a bibliography. The glossary at the end of the book gives, for each English
term, the Turkish equivalent used in the Turkish edition of these notes.</p>

<p>The code for each chapter is in its own folder in the companion repository,
<span class="u">github.com/sercankulcu/data-structures-java-en</span>; the folder name is given
at the start of the chapter, and the programs use the same names as the listings in this
book. Slides, study questions and simulators that run
the structures step by step are on the course page.</p>
'''

notes_book.setup(
    globals(),
    lang='en',
    folder='data_structures',
    course_page=COURSE_PAGE,
    # course map: at the top of the contents, before Part I
    intro=[('Course_Map.html', 'harita')],
    title='Data Structures',
    subtitle='',
    output='data_structures/Data-Structures.pdf',     # under courses-pdfs/
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'Data Structures course textbook: algorithm analysis, arrays, recursion, linked '
                      'lists, stacks and queues, trees, priority queues, hash tables, sets, graphs',
          '/Keywords': 'data structures, algorithm analysis, Java, linked list, tree, hash table, '
                       'graph, textbook'},
    preface=PREFACE,
    colophon='''<p>Slides, study questions and simulators are on that page. The code for each
     chapter is in the <span class="u">github.com/sercankulcu/data-structures-java-en</span>
     repository.</p>''',
)
