# Brief: write one new blog post

Repository: `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io` (Jekyll / GitHub Pages). Posts are in `_posts/`. The site owner is Sercan Külcü, Assistant Professor of Computer Engineering at Giresun University (Turkey); he teaches algorithms, data structures, operating systems, microprocessors (8086), C, Java and algorithmic game theory.

Write ONE post as specified in your prompt (topic, date, filename).

## Before writing
- Read 2–3 recent posts for tone and format, e.g. `_posts/2026-09-07-how-japanese-carpenters-built-without-nails.md`, `_posts/2026-08-13-kaizen-small-improvements-big-results.md`, `_posts/2026-11-21-melting-clocks-and-linked-drawers-reading-the-course-illustrations.md`.
- **Verify every fact** (dates, numbers, names, quotes, specs) with WebSearch/WebFetch against primary sources (official announcements, original papers, archives, NASA, Intel, Apple, the original mailing-list post, etc.) or reputable history sources (Computer History Museum, IEEE, major newspapers). Do not include a fact you could not confirm. Never invent quotes; quote only what a source shows, and keep any quote under 15 words.

## Format
Front matter, exactly in this shape:
```
---
title: 'Title In Title Case'
excerpt: "One or two complete sentences, at most 160 characters."
date: YYYY-MM-DD
permalink: /posts/YYYY/MM/slug/
tags:
  - tag-one
  - tag-two
---
```
- Use existing tags where they fit (check other posts): computing-history, hardware, software, education, artificial-intelligence, security, history, career, programming …
- Body: 900–1,400 words of clear, natural English (upper-intermediate: precise but not ornate). An engaging opening paragraph, then 4–6 `##` sections with specific headings, then a short closing. Explain why the event mattered and what it still teaches; the author is an engineer and teacher, so a teaching angle is welcome, but do not invent personal anecdotes or claim experiences the author did not have (no "I remember when…" unless the prompt says so).
- Where it fits naturally, add 1–3 internal links to the site's courses, e.g. `/teaching/operating-systems/?lang=en`, `/teaching/microprocessors/?lang=en`, `/teaching/algorithms/?lang=en`, `/teaching/data-structures/?lang=en`, `/teaching/programming-with-c/`, `/teaching/ai-courses/?lang=en`, `/teaching/computer-and-introduction-to-programming/?lang=en`, or related existing posts (find their exact `permalink:` with grep; never guess).
- End with one paragraph: `**Sources:** [Title](https://…), [Title](https://…)` — 2–4 sources you actually opened and that loaded (not 403/404).
- Rules: no `{{` or `{%` anywhere; never a word between two colons like `:word:`; straight quotes in front matter; UTF-8.

## Do not
Commit, touch other files, or use git stash/checkout/reset. Temp files only in `C:\Users\Sercan\AppData\Local\Temp\claude\7124c11a2bd23ac0\c11f1130-2317-4334-bfff-5d20b38079f6\scratchpad\newpost\<slug>\`.

Final message (short, Turkish): file path, word count, the key facts you verified and their sources, and anything you left out because you could not confirm it.
