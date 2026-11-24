# Brief: English edition of the Operating Systems C code repository

Source (Turkish, do not modify): `C:\Users\Sercan\Documents\GitHub\operating-systems-labs\BolumNN\*.c` — 140 single-file Linux C programs (POSIX: fork, exec, pipes, pthreads, semaphores, mmap, signals …). The `labNN` folders are already English and already copied; do not touch them.
Target: `C:\Users\Sercan\Documents\GitHub\operating-systems-labs-en\ChapterNN\` (empty chapter folders; `ci/build.sh` and the workflow already in place — do not touch them).

## What to do
- For every `BolumNN/*.c` in your chapters write the English version `ChapterNN/<english_snake_case>.c`. Same program, same logic, same data, same output values; only the language changes.
- Functions, types, variables, macros, comments and printed text in English, idiomatic C. Use the names of the English course material for that chapter: lecture notes `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io\files\os\notes\Chapter_NN_*_Lecture_Notes.html` (being written right now by other agents — use them if they exist) and slides `...\files\os\slides\Chapter_NN_*.html` (grep the code there). POSIX/library names stay.
- Header comment and inline comments short, natural English, same content (keep the source's comment style).
- Turkish example data that the output depends on stays; plain prose strings become English.
- Every file ends with `/* Expected output:` … `*/` (Turkish: `/* Beklenen cikti:`). Translate it so it matches what the English program prints: same numbers, same line structure; notes like "her calistirmada degisir" → "varies on every run", "isletim sistemine gore degisir" → "depends on the operating system".

## Checking (these programs are Linux-only; you are on Windows)
- Cross-compile each file for Linux with no warnings: `python -m ziglang cc -target x86_64-linux-gnu -std=gnu11 -Wall -Wextra -O2 -pthread -c <file> -o <scratch>/x.o` (CI uses gcc `-Werror` and clang on Ubuntu and runs every program; a program must exit 0 with no stdin and leave no files behind in its working directory — the Turkish ones already do, keep it that way).
- You cannot run them locally: check by reading that every printed string and the Expected block correspond line by line, and that the code logic is unchanged (diff the Turkish and English files mentally/with a script: only identifiers, strings and comments may differ).
- Put object files only in your scratch folder, never inside the repo.

## Rules
- Only touch your own `ChapterNN` folders. No git commands. Do not write the README.
- Scratch files in your own subfolder of the scratchpad given in your task.

## Report (short)
Per chapter: Turkish file → English file, main names chosen, compile result. Plus a one-line summary per chapter of what the programs cover (for the README table).
