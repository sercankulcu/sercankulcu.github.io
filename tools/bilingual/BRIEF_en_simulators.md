# Brief: English versions of the course simulators

Repo: `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io` (Jekyll / GitHub Pages).
Turkish simulators live in `files/<course>/sunumlar/Bolum_NN_<Name>.html` (single-page interactive tools, 10–20 KB, most use the shared `../slides/deck/stage.js` and `deck.js`, which are already bilingual and switch on the `lang` attribute).

Model — read this pair first: Turkish `files/data_structures/sunumlar/Bolum_03_Dizi_Simulatoru.html` and its approved English version `files/data_structures/slides/Chapter_03_Array_Simulator.html`.

## Output
- English file: `files/<course>/slides/Chapter_NN_<Name>.html` (same `<Name>` as the Turkish file, which is already English, e.g. `Bolum_03_Sorting_Race.html` → `Chapter_03_Sorting_Race.html`).
- Copy the Turkish file and translate in place. Keep structure, ids, classes, `data-*`, algorithms and numbers. `../slides/deck/…` → `deck/…`, `../slides/img/…` → `img/…`. Every `lang="tr"` on the simulator root → `lang="en"`.
- Translate every visible string: headings, buttons, labels, legends, tooltips, `aria-label`, `title`, placeholder, status/log messages produced by the inline script, SVG text. Natural, short UI English (buttons: "Step", "Run", "Reset", "Random array" …). Strings must not get longer than the space allows; prefer short wording.
- Code shown in the simulator (pseudocode or Java) uses the English names of that chapter's English lecture notes (`files/<course>/notes/Chapter_NN_*_Lecture_Notes.html`) and slides.
- Turkish example words/names that the behaviour depends on stay. Numbers in English format (decimal point).
- If the page uses a per-chapter script in `files/<course>/slides/deck/` (e.g. `Bolum_05_Cizge_Gezinme_Algoritmalari.js`) that still prints Turkish UI text, make that script bilingual exactly like `deck.js` does (`const EN = String(document.getElementById(...).getAttribute("lang")).toLowerCase().indexOf("en") === 0; const tx = (tr, en) => EN ? en : tr;`) — the Turkish page must behave exactly as before. Look first at how the element with the lang attribute is found in that script. Do not touch the shared `deck.js`, `stage.js`, `calisma.js`.
- Front matter (as in the model):
  ```
  layout: without-sidebar
  title: "<English title>"
  permalink: /files/<course>/slides/Chapter_NN_<Name>.html
  excerpt: "<one natural English sentence>"
  lang: en
  seo_title: "<English title> · <Course>, Chapter N"
  og_image: <same as Turkish>
  hreflang:
    tr: /files/<course>/sunumlar/Bolum_NN_<Name>.html
    en: /files/<course>/slides/Chapter_NN_<Name>.html
  resource: "Interactive simulation"
  course:
    name: "<Course>"
    url: "/teaching/<course-page>/?lang=en"
  ```
  Courses: algorithms → "Algorithms", `/teaching/algorithms/`; advanced_algorithms → "Advanced Algorithms", `/teaching/advanced-algorithms/`.
  Add the same `hreflang` block to the Turkish twin's front matter (after `lang: tr`) and set its `course.url` to `…/?lang=tr`; change nothing else in it.
- Links from the simulator to Turkish slides/notes/glossary: point them to the English equivalents (`Chapter_NN_<…>.html` slides, `../notes/…_Lecture_Notes.html`, `../Dictionary.html`) or drop them.
- `ds-guard` block: copy byte-for-byte, never change names inside it.

## Rules
- Inline `<script>`: no `//` line comments (use `/* */`) — the site's HTML compressor breaks them; never write `{{` or `{%` anywhere; no `:word:` patterns (jemoji).
- Only your files. No git commands, no `check_site`, do not open the browser pane. Scratch in your own scratchpad subfolder.

## Verify (each simulator)
1. No Turkish characters/words left outside ds-guard (except deliberate example data). Also grep the inline script strings.
2. Inline scripts pass `node --check` (extract them to .js files).
3. Run the page logic headless if feasible (e.g. jsdom is not installed — at least `node --check`), and diff the Turkish/English files to confirm only strings changed.
4. html.parser tag balance clean.

Report briefly: files created, scripts made bilingual, anything you could not translate.
