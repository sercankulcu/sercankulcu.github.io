# -*- coding: utf-8 -*-
"""Microprocessors: Mikroislemciler kitabinin Ingilizce surumu (lang='en').

Ders sayfasinin <div data-lt="en"> blogundan okunur; notlar notes/Chapter_NN_*_Lecture_Notes.html,
ekler Prerequisites.html ve Important_People.html, harita Course_Map.html, sozluk Dictionary.html.
"""
import notes_book

PREFACE = '''
<p>Microprocessors execute instructions, process data and coordinate every operation of a
computer system. This book studies processor organisation, registers, memory access,
instruction execution and low-level programming through the 8086 architecture. Today's
x86-64 processors are far more complex, but the 8086 is still a good foundation for
learning registers, segmentation, addressing modes, interrupts and assembly programming.
This book is made up of the notes for the Microprocessors course taught in the Department
of Computer Engineering at Giresun University, and its chapters follow the order of the
course.</p>

<p>The book has four parts. __PARTS__</p>

<p>Some chapters are made up of more than one set of lecture notes. These chapters open with
a short title page, and the notes follow as numbered sections such as 4.1 and 4.2.</p>

<p>Every chapter follows the same layout. It opens with learning outcomes. Formal
definitions and worked examples are set in named boxes. <em>Common mistake</em> boxes point
out the misconceptions students fall into most often. Code traces show, step by step, how a
program runs and how the registers and flags change. Each chapter closes with a summary, a
list of key terms, <em>Test Yourself</em> questions with their answers, suggestions for
further reading and a bibliography. The glossary at the end of the book defines each key
term in a sentence and names the chapter that explains it.</p>

<p>The examples run in emu8086. Every program in the book is also in the companion
repository <span class="u">github.com/sercankulcu/microprocessors-8086-en</span>, where each
one is assembled and run automatically and checked against its expected output. Slides,
study questions, the CPU simulator and the other simulators are on the course page.</p>
'''

notes_book.setup(
    globals(),
    lang='en',
    folder='microprocessors',
    course_page='microprocessors.md',
    # course map: at the top of the contents, before Part I
    intro=[('Course_Map.html', 'harita')],
    glossary='Dictionary.html',
    title='Microprocessors',
    subtitle='',
    output='microprocessors/Microprocessors.pdf',     # under courses-pdfs/
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'Microprocessors course textbook: 8086 architecture, registers, assembly, memory access, '
                      'interrupts, instructions, stack and procedures, macros, hardware, instruction encoding',
          '/Keywords': 'microprocessors, 8086, assembly, x86, emu8086, textbook'},
    preface=PREFACE,
    colophon='''<p>Slides, study questions and simulators are on that page. The programs are in the
     <span class="u">github.com/sercankulcu/microprocessors-8086-en</span> repository.</p>''',
)
