# Brief: descriptions, headings and site links for blog posts

Repository: `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io` (Jekyll / GitHub Pages). Posts live in `_posts/`. You get a batch file listing ~21 post filenames, one per line. For EACH post in your batch do the three jobs below. Touch only the files in your batch; other agents work on other posts at the same time.

Read the whole post before editing it. Your edits must stay faithful to what the post actually says.

## 1. Description (`excerpt`)
If the front matter has no `excerpt:` line, add one directly after the `title:` line:
`excerpt: "…"`
- One or two complete sentences, **at most 160 characters** (count them), in the post's language (almost all posts are English; a Turkish post gets a Turkish description).
- Say what the post is about and what the reader learns or gets from it. Concrete nouns from the post (product, person, concept, year) beat generic phrases. Never start with "In this post" or "This article".
- Only mention things the post really contains. No claims, numbers or names that are not in the text.
- Use straight double quotes around the value; inside, use single quotes or rephrase. No `{{`, `{%`, and never a word between two colons like `:word:` (the site's emoji plugin turns it into an image).
Good examples already in the repo: `_posts/2026-02-22-learning-by-simulation.md`, `_posts/2026-08-13-kaizen-small-improvements-big-results.md`, `_posts/2026-11-21-melting-clocks-and-linked-drawers-reading-the-course-illustrations.md`.

## 2. Section headings (only long posts)
If the body is longer than 1,200 words and has no `##`/`###` heading, add `## ` headings (as their own paragraph, blank line before and after) at the natural topic changes: one every 3–6 paragraphs, short and specific (e.g. `## Gemba: go and see`). Do not change, reorder or delete any existing text. See the Kaizen post above for the style. Posts that already have headings or are shorter: skip this job.

## 3. Site links (only where natural)
Add at most 1–3 links per post, and only when the post genuinely discusses something the site offers. Many posts will get none; that is fine. Never force a link. Ways to add one:
- turn an existing phrase into a Markdown link without changing its words, or
- add ONE short sentence at the end of the relevant paragraph or at the end of the post (e.g. "The [Operating Systems course](/teaching/operating-systems/?lang=en) covers scheduling in more detail.").
Use root-relative URLs exactly as below. Do not link to Turkish-only material from an English post.

Courses (English view): `/teaching/algorithms/?lang=en`, `/teaching/advanced-algorithms/?lang=en`, `/teaching/data-structures/?lang=en`, `/teaching/data-structures-and-algorithms-with-c/?lang=en`, `/teaching/operating-systems/?lang=en`, `/teaching/microprocessors/?lang=en`, `/teaching/object-oriented-programming-with-java/?lang=en`, `/teaching/computer-and-introduction-to-programming/?lang=en`, `/teaching/programming-with-c/`, `/teaching/algorithmic-game-theory/?lang=en`, `/teaching/ai-courses/?lang=en`.
Data Structures simulators: `/files/data_structures/slides/<name>.html` — names: Chapter_03_Array_Simulator, Chapter_05_Linked_List_Simulator, Chapter_07_Stack_Simulator, Chapter_08_Queue_Simulator, Chapter_08_Round_Robin_Scheduler_Simulator, Chapter_10_Binary_Search_Tree_Simulator, Chapter_10_AVL_Tree_Simulator, Chapter_10_Red_Black_Tree_Simulator, Chapter_10_B_Tree_Simulator, Chapter_11_Binary_Heap_Simulator, Chapter_12_Hash_Table_Simulator, Chapter_13_Disjoint_Sets_Simulator, Chapter_14_Dijkstras_Algorithm_Simulator.
Hubs: `/games/`, `/apps/`, `/art/`, `/publications/`, `/posts/`. Games: `/game/<name>/` for tictactoe, connectfour, sudoku, minesweeper, sliding-puzzle, battleship, memory, hangman, bulls-and-cows, pong. Apps: `/apps/<name>/` for pdf-merger, pdf-compressor, image-compressor-resizer, image-background-remover, qr-code-generator, password-generator, pomodoro-timer, unit-converter, document-scanner, signature-maker.
Related posts: `/posts/2026/08/kaizen-small-improvements-big-results/`, `/posts/2026/02/learning-by-simulation/`, `/posts/2026/06/games-as-a-way-to-understand-algorithms/`. To link another post, use the exact `permalink:` from that post's front matter (grep for it); never guess a URL.

## Rules
- Edit with exact, minimal changes; keep the file's encoding (UTF-8) and line endings. Do not touch other front-matter fields, dates or permalinks.
- Do not commit, and do not use git stash/checkout/reset.
- Temporary scripts only in `C:\Users\Sercan\AppData\Local\Temp\claude\7124c11a2bd23ac0\c11f1130-2317-4334-bfff-5d20b38079f6\scratchpad\ex\<your batch number>\`.

## Check before you finish
For every post in your batch: front matter still parses (starts and ends with `---`), exactly one `excerpt:` line, its value ≤ 160 characters, no `{{`/`{%`/`:word:` added, every link you added points to a URL from the lists above or a permalink you looked up.

Final message (short): how many excerpts, how many posts got headings, how many links you added (and to what), anything you were unsure about.
