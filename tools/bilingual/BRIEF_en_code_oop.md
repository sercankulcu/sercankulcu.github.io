# Brief: English edition of the OOP-with-Java code repository

Source (Turkish, do not modify): `C:\Users\Sercan\Documents\GitHub\object-oriented-programming-java\BolumNN\src\**\*.java` (423 programs, 11 chapters; Bolum04 uses packages, Bolum07 has JUnit 5 tests with jars in `lib/`, Bolum11 uses SQLite via `lib/sqlite-jdbc-*.jar`, Bolum09 is Swing).
Target: `C:\Users\Sercan\Documents\GitHub\object-oriented-programming-java-en\ChapterNN\src\` (skeleton, Eclipse files, `lib/` jars and `ci/run_examples.py` already in place; do not touch those).
Model to imitate: `C:\Users\Sercan\Documents\GitHub\data-structures-java-en` next to its Turkish twin `data-structures-java`; compare two or three file pairs first.

## What to do
- For every Turkish program in your chapters write the English version under `ChapterNN/src/` (same sub-folders/packages structure). Same program, same logic, same data, same output values; only the language changes.
- File/class names, packages, methods, fields, variables, constants, comments and printed text in English, idiomatic Java. **Use the names in the English course material** so code and notes read side by side: lecture notes `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io\files\java\notes\Chapter_NN_*_Lecture_Notes.html` and slides `...\files\java\slides\Chapter_NN_*.html` (grep them for class/method names, e.g. `Ogrenci` → `Student`, `BankaHesabi` → `BankAccount` if that is what the notes use).
- Packages: lowercase English (`banka` → `bank`, `canli` → `living`, `kalitim` → `inheritance`, …; again prefer the notes' names). The real university domain prefix `tr.edu.giresun` stays; only the segments after it become English (`tr.edu.giresun.banka.rapor` → `tr.edu.giresun.bank.report`).
- File names created by programs (`dosya.txt`, `ogrenci.ser`, `okul.db`, …) become English (`file.txt`, `student.ser`, `school.db`) unless the notes keep the Turkish name.
- Turkish example data that the output depends on (person names like Ayşe, Turkish cities, TL amounts) stays; plain prose strings become English.
- Header comment and inline comments: short, natural English, same content as the Turkish.
- Code that does not compile on the slides is kept as comments next to the corrected version (translate those comments too). JUnit test classes (`*Test.java`) and the test runner (`TestleriCalistir` → e.g. `RunTests`) are translated like any program; assertion messages and `@DisplayName` texts become English.
- Expected output: every file ends with `/* Expected output:` … `*/` (Turkish files have `/* Beklenen cikti:`). Files without a block in Turkish (helper classes, Swing windows) get none. Notes like "her calistirmada degisir" → "varies on every run", "isletim sistemine gore degisir" → "depends on the operating system". Inline `// …` output comments next to `println` lines must match the real output.
- Output runs under the **US English locale** (decimal point): regenerate the expected-output block by actually running the program, never by hand-translating the Turkish block. Numeric results must equal the Turkish ones apart from the decimal separator. Exception messages produced by the JDK stay as the JDK prints them.

## Running (JDK 21)
- `C:/Program Files/Eclipse Adoptium/jdk-21.0.3.9-hotspot/bin` (javac, java) — put it on PATH for the session.
- Check with `python ci/run_examples.py ChapterNN` from the repo root, **one chapter at a time** (other agents run JVMs in parallel; running many at once has frozen this machine). Must end with every program `ok` (Swing windows `skipped (window)` as in the Turkish repo — compare with `python ci/run_examples.py BolumNN` in the Turkish repo).
- `javac -Xlint:all` should give no new warnings compared with the Turkish source.

## Rules
- Only touch your own `ChapterNN/src` folders. No git commands. Do not write the README (the main session does).
- Scratch files in your own subfolder of the scratchpad given in your task; leave no `.class`, `.db`, `.txt`, `.ser` files behind in the repo.

## Report (short)
Per chapter: number of programs, run_examples result (ok/skipped counts, same as Turkish?), notable name choices (packages, main classes), anything whose output differs from the Turkish beyond translation and decimal separators. Also a one-line summary per chapter of what the programs cover (for the README table).
