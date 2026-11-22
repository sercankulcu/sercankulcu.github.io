# Brief: English edition of the Algorithms code repository

Source (Turkish, do not modify): `C:\Users\Sercan\Documents\GitHub\algorithms-java\BolumNN\src\*.java` (67 programs, 11 chapters).
Target: `C:\Users\Sercan\Documents\GitHub\algorithms-java-en\ChapterNN\src\` (skeleton, Eclipse files and `ci/run_examples.py` already in place; do not touch those).
Model to imitate: `C:\Users\Sercan\Documents\GitHub\data-structures-java-en` (English edition of the Data Structures repo) next to its Turkish twin `data-structures-java`. Compare two or three file pairs first.

## What to do
- For every Turkish program in your chapters write the English version in `ChapterNN/src/`. Same program, same logic, same data, same output values; only the language changes.
- File/class names, methods, variables, constants, comments and printed text all in English, idiomatic Java. **Use the names in the English course material for that chapter**, so the code reads side by side with it: lecture notes `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io\files\algorithms\notes\Chapter_NN_*_Lecture_Notes.html` and slides `...\files\algorithms\slides\Chapter_NN_*.html` (grep them for the method names). E.g. `HizliSiralama` → `QuickSort` with `quickSort`/`partition`; pseudocode-style names like `PARCALA`/`HIZLI_SIRALA` → `PARTITION`/`QUICKSORT`, matching the English notes' pseudocode.
- Turkish example data that the output depends on (words like "kar", "kalem", names like Ayşe, Turkish cities) stays; plain prose strings become English.
- Header comment and inline comments: short, natural English, same content as the Turkish.
- Expected output: every file ends with `/* Expected output:` … `*/` (Turkish files have `/* Beklenen cikti:`). Keep notes like "her calistirmada degisir" as "varies on every run". Inline `// …` output comments next to `println` lines must match the real output.
- Output runs under the **US English locale** (decimal point, not comma): regenerate the expected-output block by actually running the program, do not just translate the Turkish block. Check that numeric results equal the Turkish ones apart from the decimal separator.
- A program reading keyboard input gets `<Name>.input` next to the source (Turkish: `.girdi`).

## Running (JDK 21)
- `C:/Program Files/Eclipse Adoptium/jdk-21.0.3.9-hotspot/bin` (javac, java).
- Check with `python ci/run_examples.py ChapterNN` from the repo root, **one chapter at a time** (other agents run JVMs in parallel; running many at once has frozen this machine). Must end with every program passing.
- Also `javac -Xlint:all` should give no new warnings compared with the Turkish source.

## Rules
- Only touch your own `ChapterNN/src` folders. No git commands (no add/commit/stash/checkout). Do not write the README (the main session does).
- Scratch files in your own subfolder of the scratchpad given in your task.

## Report (short)
Per chapter: Turkish file → English file name, the main method names chosen, run_examples result. Also give a one-line summary per chapter of what the programs cover (for the README table).
