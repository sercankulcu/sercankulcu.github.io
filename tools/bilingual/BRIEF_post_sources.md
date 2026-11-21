# Brief: verify technology news posts against primary sources and cite them

Repository: `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io` (Jekyll). Posts are in `_posts/`. You get a batch file with ~12 post filenames. These are short technology-history / news posts (a product launch, a release, an acquisition…). For EACH post:

## 1. Verify
Read the whole post. List its checkable facts: event date(s), version numbers, prices, specifications (cores, clocks, memory, bandwidth, TOPS, sizes…), counts, names of people and products, and any computed comparison ("2× faster", "five years after"). Check each against a **primary source** found with WebSearch/WebFetch: the company's own press release, blog post or product page, official release notes, a standards body (W3C, IETF, ISO…), the original paper, or an official event recording. Reputable press (Ars Technica, AnandTech, The Verge, Reuters…) is acceptable when no primary source exists. Wikipedia may help you find a source but is never the cited source. Check arithmetic yourself (e.g. 7 / 3.35 ≈ 2.09, not 1.75).

## 2. Fix
- **Wrong fact** (contradicted by a source): change only the wrong word/number in place, keep the sentence and style. If the fixed fact also appears in the front-matter `excerpt:`, fix it there too.
- **Date of the post:** if the front-matter `date:` is earlier than the event the post describes as already having happened, set `date:` to the event day (YYYY-MM-DD) and rename the file to match with `git mv old new` (only the date prefix changes). Never change `permalink:`.
- **Claim you cannot confirm anywhere** after a reasonable search (specific number, spec or feature): do not invent a replacement. If it is a specific detail, soften it to what the sources support or delete just that clause; if a whole post describes an event you cannot find at all, change nothing and report it.
- Do not add new facts beyond what you need to correct an error.

## 3. Cite
At the very end of the post add one paragraph (blank line before it):
`**Sources:** [Title of source 1](https://…), [Title of source 2](https://…)`
1–3 links, primary sources first, each one a page you actually opened and that supports the post's main facts. Use https URLs, real page titles (shortened if long). No link shorteners, no search-result URLs.

## Rules
- Minimal, exact edits; UTF-8; keep line endings; do not touch other front-matter fields. No `{{`, `{%`, and never a word between two colons like `:word:` in text you add.
- Touch only the posts in your batch (others work on other posts in parallel). Do not commit; no git stash/checkout/reset. `git mv` for date renames is allowed.
- Temp files only in `C:\Users\Sercan\AppData\Local\Temp\claude\7124c11a2bd23ac0\c11f1130-2317-4334-bfff-5d20b38079f6\scratchpad\src\<batch number>\`.

## Report (short, plain text)
Per post, one line: filename → `ok` or the corrections made (`old → new`, with the source domain), date changes, and anything you could not verify. End with totals: posts checked, facts corrected, dates changed, posts with sources added, unverifiable posts.
