# -*- coding: utf-8 -*-
"""Object-Oriented Programming with Java: Java ile Nesne Yonelimli Programlama kitabinin
Ingilizce surumu (lang='en').

Ders sayfasinin <div data-lt="en"> blogundan okunur; notlar notes/Chapter_NN_*_Lecture_Notes.html,
ekler Prerequisites.html ve Important_People.html, harita Course_Map.html, sozluk Dictionary.html.
"""
import notes_book

PREFACE = '''
<p>This book starts from the foundations of programming and leads to object-oriented
programming and real applications in Java: classes and objects, encapsulation, inheritance,
polymorphism and abstraction; collections, exceptions, testing, file input and output,
graphical user interfaces, threads and database programming. It is made up of the notes for
the Object-Oriented Programming with Java course taught in the Department of Computer
Engineering at Giresun University, and its chapters follow the order of the course.</p>

<p>The book has four parts. __PARTS__</p>

<p>Some chapters are made up of more than one set of lecture notes. These chapters open with
a short title page, and the notes follow as numbered sections such as 4.1 and 4.2.</p>

<p>Every chapter follows the same layout. It opens with learning outcomes. Formal
definitions and worked examples are set in named boxes. <em>Common mistake</em> boxes point
out the misconceptions students fall into most often. Code traces show, step by step, how a
program runs. Each chapter closes with a summary, a list of key terms, <em>Test Yourself</em>
questions with their answers, suggestions for further reading and a bibliography. The
glossary at the end of the book defines each key term in a sentence and names the chapter
that explains it.</p>

<p>The code for every chapter is in the companion repository
<span class="u">github.com/sercankulcu/object-oriented-programming-java-en</span>, where each
program is compiled, run and checked against its expected output automatically. Slides,
study questions and simulators are on the course page.</p>
'''

notes_book.setup(
    globals(),
    lang='en',
    folder='java',
    course_page='oop-with-java.md',
    intro=[('Course_Map.html', 'harita')],
    glossary='Dictionary.html',
    title='Object-Oriented Programming with Java',
    subtitle='',
    output='java/Object-Oriented-Programming-with-Java.pdf',     # under courses-pdfs/
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'Object-Oriented Programming with Java course textbook: classes, inheritance, '
                      'polymorphism, collections, exceptions, testing, I/O, graphics, threads, databases',
          '/Keywords': 'Java, object-oriented programming, inheritance, polymorphism, textbook'},
    preface=PREFACE,
    colophon='''<p>Slides, study questions and simulators are on that page. The code is in the
     <span class="u">github.com/sercankulcu/object-oriented-programming-java-en</span> repository.</p>''',
)
