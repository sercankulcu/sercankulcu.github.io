# -*- coding: utf-8 -*-
"""Algorithms: Algoritmalar kitabinin Ingilizce surumu (lang='en').

Ders sayfasinin <div data-lt="en"> blogundan okunur; notlar notes/Chapter_NN_*_Lecture_Notes.html,
ekler Prerequisites.html ve Important_People.html, harita Course_Map.html, sozluk Dictionary.html.
"""
import notes_book

PREFACE = '''
<p>An algorithm is a finite sequence of well-defined steps that solves a problem or carries out
a computation. This book studies how to argue that an algorithm is correct, how to measure its
time and memory cost, and how these tools apply to sorting, searching, graph and string
problems, together with the trade-offs between different solutions. It is made up of the notes
for the Algorithms course taught in the Department of Computer Engineering at Giresun
University, and its chapters follow the order of the course. The examples are written in
Java.</p>

<p>The book has three parts. __PARTS__ Design paradigms, hard problems and other models of
computation are covered in the follow-up book, <em>Advanced Algorithms</em>.</p>

<p>Every chapter follows the same layout. It opens with learning outcomes. Formal
definitions, theorems and worked examples are set in named boxes. <em>Common mistake</em>
boxes point out the misconceptions students fall into most often. Code traces show, step by
step, how an algorithm changes its data. Each chapter closes with a summary, a list of
key terms, <em>Test Yourself</em> questions with their answers, suggestions for further
reading and a bibliography. The glossary at the end of the book defines each key term in a
sentence and names the chapter that explains it.</p>

<p>The code for each chapter is in its own folder in the companion repository,
<span class="u">github.com/sercankulcu/algorithms-java-en</span>, and the programs use the same
names as the listings in this book. Slides, study questions and simulators that run the
algorithms step by step are on the course page.</p>
'''

notes_book.setup(
    globals(),
    lang='en',
    folder='algorithms',
    course_page='algorithms.md',
    # course map: at the top of the contents, before Part I
    intro=[('Course_Map.html', 'harita')],
    glossary='Dictionary.html',
    title='Algorithms',
    subtitle='Design, Analysis and Implementation in Java',
    output='algorithms/Algorithms.pdf',              # under courses-pdfs/
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'Algorithms course textbook: complexity, sorting, searching, graph and string algorithms',
          '/Keywords': 'algorithms, complexity, sorting, searching, graphs, strings, Java, textbook'},
    preface=PREFACE,
    colophon='''<p>Slides, study questions and simulators are on that page. The code for each
     chapter is in the <span class="u">github.com/sercankulcu/algorithms-java-en</span>
     repository.</p>''',
)
