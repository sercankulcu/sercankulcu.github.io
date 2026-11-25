# Brief: English edition of the 8086 assembly code repository

Source (Turkish, do not modify): `C:\Users\Sercan\Documents\GitHub\microprocessors-8086\BolumNN\*.asm` — 258 programs.
Target: `C:\Users\Sercan\Documents\GitHub\microprocessors-8086-en\ChapterNN\` (empty chapter folders; `ci/run86.py`, `inc/emu8086.inc`, `.github/workflows/ci.yml` and `.gitignore` are already in place — do not touch them).

## Chapter mapping
`Bolum01` → `Chapter01`, … , `Bolum11` → `Chapter11` (same number, same content).

## What to do
For every program in your chapters write the English version in `ChapterNN/`. Same program, same logic, same data, same behaviour; only the language changes.

- **File names**: English snake_case, `.asm` (e.g. `bolme_kalan.asm` → `division_remainder.asm`).
- **Labels, variables, procedures, macros, comments and printed strings in English.** Take the names from the English course material of that chapter: lecture notes `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io\files\microprocessors\notes\Chapter_NN_*_Lecture_Notes.html` (being written by other agents; use them if they exist, otherwise use the Turkish notes in `files\microprocessors\notlar\` as a guide) and slides `...\files\microprocessors\slides\Chapter_NN_*.html` (grep the code there). Names that are already standard (register names, `PRINT_NUM`, `SCAN_NUM`, `PTHIS`, `GOTOXY`, … from `emu8086.inc`) stay exactly as they are.
- **emu8086 syntax unchanged**: same instructions, directives (`org 100h`, `include 'emu8086.inc'`, `DEFINE_*`, …), same macros and library calls. The programs must still assemble in emu8086 as well as with UASM here. Do not edit `inc/emu8086.inc`.
- **Directives in English** (comment lines, anywhere in the file):

  | Turkish | English |
  |---|---|
  | `; GIRDI: "12\r"` | `; INPUT: "12\r"` |
  | `; PORT n: 30 40` | `; PORT n: 30 40` (same) |
  | `; YAZMACLAR: AX BX CF` | `; REGISTERS: AX BX CF` |
  | `; BELLEK: etiket 4` | `; MEMORY: label 4` (use the **English label name**) |
  | `; SINIR: 200000` | `; LIMIT: 200000` |
  | `; CALISTIRMA: yalniz derleme` | `; RUN: compile only` |
  | `; Beklenen cikti:` / `; Beklenen cikti (not):` | `; Expected output:` / `; Expected output (note):` |

  The expected-output block stays at the very end of the file, every line prefixed with `; `.
- **Turkish example data stays** where the output depends on it or it is a deliberate example (names such as Ayşe, city names, etc. — see lecture notes; keep them unless they are Turkish *explanations*). Only translate prose, labels and messages.
- **Expected output must come from a real run, never from hand-editing.** Printed strings change length, so printed offsets/addresses, `MEMORY:` dumps, `AX=`/`DX=` values, byte counts (`$-label`) and listing-based numbers can legitimately differ from the Turkish version. That is fine, provided the new expected block is exactly what the English program produces. Also re-check any comment that quotes an address, offset or byte count and update it to the new value.
- Keep byte lengths and addresses in mind: if the lecture comment says "string is 12 bytes" and the English string is not, fix the comment (and any hard-coded constant that depends on it, e.g. a `MOV CX, 12` that counts string characters — better to compute with `$-label` only if the Turkish program already did so; otherwise just adjust the constant).
- If a Turkish program depends on a Turkish-specific behaviour (e.g. upper-casing `ç`), keep the behaviour but think about whether the English notes use the same example; report anything you could not translate faithfully.

## Workflow
1. `export UASM_BIN=C:/Users/Sercan/tools/uasm/uasm64.exe` (PowerShell: `$env:UASM_BIN='C:/Users/Sercan/tools/uasm/uasm64.exe'`). Python package `unicorn` is already installed.
2. Write the English program, strip its old `; Expected output:` block (or leave a placeholder block), then run it and look at the output:
   `python ci/run86.py -v ChapterNN/x.asm`
   (run from `C:\Users\Sercan\Documents\GitHub\microprocessors-8086-en`). Check that the output makes sense and matches the Turkish program's output apart from the translated strings and offset shifts, and compare against the Turkish original run (`python ci/run86.py -v BolumNN/x.asm` in the Turkish repo).
3. Paste the verified output as the `; Expected output:` block, then run again until the status is `ok`.
4. When the chapter is done, run the whole chapter: `python ci/run86.py ChapterNN` — every line must say `ok` (or `compiled` for `RUN: compile only`). Statuses you may see otherwise: `COMPILE FAILED`, `RUN FAILED`, `NO EXPECTED`, `OUTPUT DIFFERS`.
5. Make sure the number of `.asm` files in `ChapterNN/` equals the number in `BolumNN/`.

## Rules
- **No git commands.** Do not modify the Turkish repository.
- Use the scratch folder for any temporary files; leave nothing but the final `.asm` files in the repo (the repo's `.gitignore` already hides `*.com`, `*.exe`, `*.lst`, `*.obj`).
- Do not touch `ci/`, `inc/` or `.github/`. If you think `run86.py` has a bug, report it instead.
- Final report (brief): chapters done, number of programs, anything skipped or changed in behaviour, any program whose output differs from the Turkish one beyond translation/offset shifts.
