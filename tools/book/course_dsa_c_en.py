# -*- coding: utf-8 -*-
"""Data Structures and Algorithms with C: C ile Veri Yapilari ve Algoritmalar kitabinin Ingilizce surumu (lang='en').

Ders sayfasinin <div data-lt="en"> blogundan okunur; notlar notes/Chapter_NN_*_Lecture_Notes.html,
ekler Prerequisites.html ve Important_People.html, harita Course_Map.html, sozluk Dictionary.html.
"""
import notes_book

PREFACE = '''
<p>This book studies data structures and algorithms through their representation in memory
and their implementation in C. Every topic starts from an abstract data type and arrives at a
C99/C11 implementation that works with pointers, dynamic memory and structures, together with
its complexity analysis. It is made up of the notes for the Data Structures and Algorithms with
C course taught in the Department of Computer Engineering at Giresun University, and its
chapters follow the order of the course.</p>

<p>The book has five parts. __PARTS__</p>

<p>Every chapter follows the same layout. It opens with learning outcomes. Formal
definitions, theorems and worked examples are set in named boxes. <em>Common mistake</em>
boxes point out the misconceptions students fall into most often. Traces show, step by
step, how an operation changes the structure. Each chapter closes with a summary, a list of
key terms, <em>Test Yourself</em> questions with their answers, suggestions for further
reading and a bibliography. The glossary at the end of the book defines each key term in a
sentence and names the chapter that explains it.</p>

<p>The code for each chapter is in its own folder in the companion repository,
<span class="u">github.com/sercankulcu/data-structures-and-algorithms-c-en</span>, and the
programs use the same names as the listings in this book. Slides and study questions are on
the course page.</p>
'''

notes_book.setup(
    globals(),
    lang='en',
    folder='dsa_c',
    course_page='data-structures-and-algorithms-with-c.md',
    # course map: at the top of the contents, before Part I
    intro=[('Course_Map.html', 'harita')],
    glossary='Dictionary.html',
    title='Data Structures and Algorithms with C',
    subtitle='',
    output='dsa_c/Data-Structures-and-Algorithms-with-C.pdf',   # under courses-pdfs/
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'Data Structures and Algorithms with C course textbook: arrays, linked lists, stacks, '
                      'queues, trees, heaps, hashing, graphs, union-find, shortest paths, sorting',
          '/Keywords': 'data structures, algorithms, C, pointers, dynamic memory, textbook'},
    preface=PREFACE,
    colophon='''<p>Slides and study questions are on that page. The code for each chapter is in the
     <span class="u">github.com/sercankulcu/data-structures-and-algorithms-c-en</span> repository.</p>''',
)
