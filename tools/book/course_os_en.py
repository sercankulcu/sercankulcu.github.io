# -*- coding: utf-8 -*-
"""Operating Systems: Isletim Sistemleri kitabinin Ingilizce surumu (lang='en').

Ders sayfasinin <div data-lt="en"> blogundan okunur; notlar notes/Chapter_NN_*_Lecture_Notes.html,
ekler Prerequisites.html ve Important_People.html, harita Course_Map.html, sozluk Dictionary.html.
"""
import notes_book

PREFACE = '''
<p>An operating system is the software that sits between the hardware and applications: it
manages processor time, memory, storage and devices, and gives programs abstractions through
which they can use them safely and share them. This book is made up of the notes for the
Operating Systems course taught in the Department of Computer Engineering at Giresun
University, and its chapters follow the order of the course. The examples are written in C,
and in four chapters also in Java.</p>

<p>The book has four parts. __PARTS__</p>

<p>Every chapter follows the same layout. It opens with learning outcomes. Formal
definitions, theorems and worked examples are set in named boxes. <em>Common mistake</em>
boxes point out the misconceptions students fall into most often. Code traces show, step by
step, how a program or an algorithm runs. Each chapter closes with a summary, a list of
key terms, <em>Test Yourself</em> questions with their answers, suggestions for further
reading and a bibliography. The glossary at the end of the book defines each key term in a
sentence and names the chapter that explains it.</p>

<p>The code and lab exercises for each chapter are in the companion repository
<span class="u">github.com/sercankulcu/operating-systems-labs-en</span>, and the Java examples
in <span class="u">github.com/sercankulcu/operating-systems-java-en</span>; the programs use
the same names as the listings in this book. Slides, study questions and simulators are on
the course page.</p>
'''

notes_book.setup(
    globals(),
    lang='en',
    folder='os',
    course_page='operating-systems.md',
    # course map: at the top of the contents, before Part I
    intro=[('Course_Map.html', 'harita')],
    glossary='Dictionary.html',
    title='Operating Systems',
    subtitle='Concepts and Practice in C',
    output='os/Operating-Systems.pdf',               # under courses-pdfs/
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'Operating Systems course textbook: processes, threads, scheduling, synchronization, '
                      'deadlocks, memory, virtual memory, file systems, I/O, multiprocessors, security, Linux',
          '/Keywords': 'operating systems, processes, threads, scheduling, memory management, file systems, '
                       'Linux, C, textbook'},
    preface=PREFACE,
    colophon='''<p>Slides, study questions and simulators are on that page. The code and labs are in the
     <span class="u">github.com/sercankulcu/operating-systems-labs-en</span> repository.</p>''',
)
