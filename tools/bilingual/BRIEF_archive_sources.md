# Brief: link archive pieces to their original sources

Repository: `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io` (Jekyll). Folders `_teoman/` (Turkish musician Teoman) and `_nejat-isler/` (Turkish actor Nejat İşler) hold English retellings of Turkish interviews and press articles. Each page starts with a bold source line such as

`**Milliyet — 28 December 1996**`  (sometimes followed by `**Interview by …**`)

For EACH file in your folder:
1. Read the source line and the title (`title:` is the original Turkish headline).
2. Search the web (WebSearch/WebFetch) for the ORIGINAL piece: the newspaper's online archive (e.g. gazetearsivi.milliyet.com.tr, hurriyet.com.tr, sabah.com.tr, radikal archives), the magazine's site, or for TV/radio/podcast/YouTube interviews the official channel's video or episode page. Use the Turkish headline, the person's name, the outlet and the date as search terms.
3. Only if you find a page that clearly is that piece (same outlet, date/issue or episode, matching headline or content) AND it loads (not 403/404, not a search-result page): add ONE line directly under the bold source line(s), as its own paragraph:
   `Original (Turkish): [Outlet, date](https://…)`
   Use the real outlet name and date. One link per piece.
4. If you cannot find it, change nothing. Never invent or guess a URL, never link a generic homepage or a search page, never link unofficial re-uploads of copyrighted video unless it is the broadcaster's or the outlet's own channel.

Rules: touch only files in your folder; minimal edits; UTF-8; no `{{`, `{%`, no `:word:` patterns. Do not commit; no git stash/checkout/reset. Temp files only in `C:\Users\Sercan\AppData\Local\Temp\claude\7124c11a2bd23ac0\c11f1130-2317-4334-bfff-5d20b38079f6\scratchpad\archive\<folder>\`.

Final message (short, Turkish): how many pieces got an original link (list file → URL domain), how many could not be found.
