# Brief: short descriptions for essays, memories and art pages

Repository: `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io` (Jekyll). Your batch file lists ~25 page paths (relative to the repo root): personal memories, essays, film/game writing, pencil stories, archive pieces and generative-art pages. Their search description is currently cut off mid-sentence because the source text is too long.

For EACH file: read the page, then add ONE front-matter line directly after the `title:` line:

`description: "…"`

- One or two complete sentences, **at most 160 characters** (count them). In the page's language (almost all English).
- Say what the page is about: the concrete subject (the memory, the film, the pencil model, the scene). Keep the author's tone; no marketing language, no "In this post…".
- Only things the page actually contains. No invented names, dates or claims.
- Do NOT change or remove an existing `excerpt:` or any other field, and do not touch the body. If the file already has a `description:` line, leave the file alone.
- Straight double quotes around the value; use single quotes inside. No `{{`, `{%`, and never a word between two colons like `:word:`.
- Touch only the files in your batch. Do not commit; no git stash/checkout/reset. Temp files only in `C:\Users\Sercan\AppData\Local\Temp\claude\7124c11a2bd23ac0\c11f1130-2317-4334-bfff-5d20b38079f6\scratchpad\desc\<batch>\`.

Check before finishing: each file has exactly one `description:` line, ≤160 characters, and the front matter still opens and closes with `---`. Final message: short count and anything you were unsure about.
