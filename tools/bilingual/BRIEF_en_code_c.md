# Brief: English edition of the "Data Structures and Algorithms with C" code repository

Source (Turkish, do not modify): `C:\Users\Sercan\Documents\GitHub\data-structures-and-algorithms-c\BolumNN\` — 156 C files: single-file programs `BolumNN/ad.c` and multi-file programs in folders `BolumNN/ad/` (`.h` + `.c`).
Target: `C:\Users\Sercan\Documents\GitHub\data-structures-and-algorithms-c-en\ChapterNN\` (empty chapter folders, `ci/build.sh` and the workflow already in place — do not touch them).

## What to do
- For every program in your chapters write the English version in `ChapterNN/` with the same layout (single file or folder). Same program, same logic, same data, same output values; only the language changes.
- File and folder names in English snake_case (e.g. `secimli_siralama.c` → `selection_sort.c`, `kesir/` with `kesir.h` → `fraction/` with `fraction.h`; update `#include`s).
- Functions, types, variables, macros, comments and printed text in English, idiomatic C. **Use the names of the English course material** for that chapter: lecture notes `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io\files\dsa_c\notes\Chapter_NN_*_Lecture_Notes.html` (being written right now by other agents — use them if they exist) and slides `...\files\dsa_c\slides\Chapter_NN_*.html` (grep the code there). Names that are already English in the Turkish code (`SWAP`, `COMPARE`, `padd`, `attach`, `fast_transpose`, … — the course follows Horowitz–Sahni–Anderson-Freed) stay as they are.
- Header comment and inline comments short, natural English, same content. Comments `/* */` style as in the source.
- Turkish example data that the output depends on (words, names, cities) stays; plain prose strings become English.
- The first line marker `CALISTIRMA: yalniz derleme` becomes `RUN: compile only`.
- Every file ends with `/* Expected output:` … `*/` (Turkish: `/* Beklenen cikti:`). Produce it by actually compiling and running the English program, and check that the values equal the Turkish program's output. Run-dependent notes ("her calistirmada degisir") → "varies on every run".

## Compile and run locally (Windows; clang via zig)
- `python -m ziglang cc -std=c11 -Wall -Wextra -pedantic -O1 -g <files> -o <exe> -lm` — must compile with **no warnings** (CI uses gcc `-Werror` and clang with ASan/UBSan on Linux).
- Run each program with no stdin, in an empty temporary folder; it must exit 0 and leave no files behind (as `ci/build.sh` checks). Also compile+run the Turkish original and compare output values.
- Put executables only in your scratch folder, never inside the repo.

## Rules
- Only touch your own `ChapterNN` folders. No git commands. Do not write the README.
- Scratch files in your own subfolder of the scratchpad given in your task.

## Report (short)
Per chapter: Turkish file → English file, main names chosen, compile/run result. Plus a one-line summary per chapter of what the programs cover (for the README table).
