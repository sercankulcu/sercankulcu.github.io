# Brief addendum: AI and Data Courses Guide (generated decks)

Read `tools/proof/BRIEF_language_check.md` first; everything there applies, with these differences.

The decks in `files/ai_courses/slides/Chapter_NN_*.html` (English) and `files/ai_courses/sunumlar/Bolum_NN_*.html` (Turkish) are **generated** by `tools/ai_courses/make_decks.py` from Python source files. **Proposals must target the source files, never the generated HTML.**

- English text: `tools/ai_courses/icerik_en/<CODE>.py` (course text), `tools/ai_courses/icerik_en/demo/<CODE>.py` (the interactive "Try it" slide: visible strings only, never JS logic or identifiers), `tools/ai_courses/en_tablolar.py` (KONU, PROFIL tables), and the English tables/strings inside `tools/ai_courses/make_decks.py` (EN_AD, EN_SORU, EN_KISIM, YOLLAR_EN, ILGI_EN, SENARYO_EN and other English literals).
- Turkish text: `tools/ai_courses/icerik/<CODE>.py`, `tools/ai_courses/icerik/demo/<CODE>.py`, `tools/ai_courses/profiller.py`, `tools/ai_courses/dersler.py` (course names, questions, relations) and Turkish literals in `make_decks.py`.

Method: read the generated deck to see the text in context (and to find which course code a chapter is: the deck's excerpt/front matter or `dersler.py` order), then find the exact string in the source file and propose against it. The `file` field is the source path relative to the repo root, e.g. `tools/ai_courses/icerik_en/BG.py`.

Python-source rules for `old`/`new`:
- Copy `old` exactly as it appears in the .py file, including escapes (`\'`, `\n`, `\\`), and keep `new` valid inside the same string literal (same quote style; escape quotes the same way). Strings are often split across adjacent literals `('...' '...')`; keep each proposal inside one literal, or include the whole literal pair exactly.
- Never change dict keys, variable names, list structure, numbers that are data for figures/demos, HTML tags inside strings, or JS code.
- `{{` / `{%` must never appear.

Content: check facts (dates, people, what a method does), consistency between the English and Turkish versions of the same course (same facts, same dates, same examples), and that the "Try it" demo's visible text matches what it computes. Course-wide terms in English: follow the course's majority; American spelling.

After writing your JSONL, verify each `old` occurs exactly once in its source file. Do not run `make_decks.py`, do not edit files, no git, no helper agents. Report as the main brief asks.
