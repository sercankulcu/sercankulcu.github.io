# -*- coding: utf-8 -*-
"""Computer Fundamentals and Introduction to Programming: Bilgisayar ve Programlamaya Giris
kitabinin Ingilizce surumu (lang='en').

Ders sayfasinin <div data-lt="en"> blogundan okunur; notlar notes/Chapter_NN_*_Lecture_Notes.html,
ekler Prerequisites.html ve Important_People.html, harita Course_Map.html, sozluk Dictionary.html.
"""
import notes_book

PREFACE = '''
<p>This book starts from the foundations of computers and information technology: hardware,
operating systems, the Internet and office applications. It then moves on to programming
through algorithms and flowcharts, and covers the basic constructs of programming in Java,
from variables to recursion. It is made up of the notes for the Computer Fundamentals and
Introduction to Programming course taught in the Department of Computer Engineering at
Giresun University, and its chapters follow the order of the course.</p>

<p>The book has three parts. __PARTS__</p>

<p>Some chapters are made up of more than one set of lecture notes. These chapters open with
a short title page, and the notes follow as numbered sections such as 4.1 and 4.2.</p>

<p>Every chapter follows the same layout. It opens with learning outcomes. Formal
definitions and worked examples are set in named boxes. <em>Common mistake</em> boxes point
out the misconceptions students fall into most often. Code traces show, step by step, how a
program runs. Each chapter closes with a summary, a list of key terms, <em>Test Yourself</em>
questions with their answers, suggestions for further reading and a bibliography. The
glossary at the end of the book defines each key term in a sentence and names the chapter
that explains it.</p>

<p>The code for the programming chapters is in the companion repository
<span class="u">github.com/sercankulcu/computer-programming-java-en</span>, where each program
is compiled, run and checked against its expected output automatically. Slides, study
questions and simulators are on the course page.</p>
'''

notes_book.setup(
    globals(),
    lang='en',
    folder='computer',
    course_page='computer-and-programming.md',
    intro=[('Course_Map.html', 'harita')],
    glossary='Dictionary.html',
    title='Computer Fundamentals and Introduction to Programming',
    subtitle='First Steps',
    output='computer/Computer-Fundamentals-and-Introduction-to-Programming.pdf',   # under courses-pdfs/
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'Computer Fundamentals and Introduction to Programming course textbook: hardware, '
                      'operating systems, the Internet, office applications, algorithms, programming in Java',
          '/Keywords': 'computer fundamentals, programming, algorithms, Java, textbook'},
    preface=PREFACE,
    colophon='''<p>Slides, study questions and simulators are on that page. The code for the
     programming chapters is in the <span class="u">github.com/sercankulcu/computer-programming-java-en</span>
     repository.</p>''',
)
