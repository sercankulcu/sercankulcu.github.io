# Brief: tabbed help + move-reasoning panel for AGT search games

Repo `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io` (Jekyll, GitHub Pages). Each AGT game exists twice: Turkish `files/agt/sunumlar/Bolum_NN_<Game>.html` and English `files/agt/slides/Chapter_NN_<Game>.html`. Do **both** for each of your games; they must stay equivalent (same features, same code, text in each language).

## Model — read it fully first
`files/agt/sunumlar/Bolum_01_Backgammon.html` and `files/agt/slides/Chapter_01_Backgammon.html`. They already have what you will add to your games:
1. **Tabbed help dialog** (the `?` button): tabs *Kurallar / YZ nasıl karar verir / Kod / Etkinlikler* — EN *Rules / How the AI decides / Code / Activities*. Tab buttons + `section` panels, a tiny inline tab script, styles (`#bg-help …`).
2. **"Hamle gerekçesini göster" / "Show move reasoning" checkbox** and a **reasoning panel** under/next to the board (`.bg-why`): when on, every time the AI moves it lists the candidate moves it evaluated with their values, highlights the chosen one, and shows the parts of the value where that is meaningful. Fixed height + `overflow:auto` so the layout never jumps. Off by default.
3. **Small visual aids** where they help (Backgammon added point numbers and a last-move arrow). Optional: add only if the game clearly lacks them (e.g. highlight the AI's last move).

## What to write per game
- **Rules tab**: the existing help text, kept (tidy it if needed).
- **How the AI decides tab**: explain the page's actual algorithm, for a student who has had the Minimax / Alpha-Beta lecture: what is searched, depth, what the evaluation function counts and with which weights, alpha-beta / move ordering / transposition table / randomness if the code has them, how terminal positions are scored, why the depth is what it is (branching factor estimate). One small worked example with numbers from the real evaluation. Mention what the panel shows. Link the related lecture deck: TR `Bolum_02_Minimaks_ve_Budama.html`, EN `Chapter_02_Minimax_and_Alpha_Beta_Pruning.html` (check the exact names in the folder; Chapter 14 game: also link its chapter deck).
- **Code tab**: the page's real JavaScript for the decision (search function, evaluation, move generation summary), reformatted onto lines and commented so it can be read; behaviour must be exactly the code that runs (simplify only by eliding with `...` irrelevant parts). Then "the same idea in Python", short, in the style of the course's Python repo `C:\Users\Sercan\Documents\GitHub\algorithmic-game-theory-python-en` (EN page) / `algorithmic-game-theory-python` (TR page) — reuse its function names if that game exists there. Code inside `<pre><code>` must be HTML-escaped. Comments in code: Turkish on the TR page, English on the EN page.
- **Activities tab**: written **to the student** ("Kendin dene" / "Try it yourself", TR "sen", EN "you"). 3–4 hands-on tasks that use the reasoning panel (predict then look, recompute a value by hand, change depth/difficulty if the page has it and compare, find a position where the AI errs and explain why from the panel). Then **Discussion questions** (3–4), each followed by `<details class="…-answer"><summary>Cevap</summary><p>…</p></details>` (EN `Answer`). **Never** teacher instructions ("ask the class", "show on the projector", "in class"). See the Backgammon Activities tab for tone.

## Reasoning panel — implementation rules
- **Do not change how the AI plays.** Refactor only to *record* what it already computes (e.g. collect `{move, value}` for each root move inside the root loop; for alpha-beta note that non-best root values may be bounds — say so in the panel/legend, e.g. "≤ v" / "≥ v", or show "pruned"). Same moves, same results, same random tie-breaks as before. If the AI uses randomness or time limits, keep them.
- Show: depth searched, number of positions evaluated if cheap to count, each root candidate (in game notation the page already uses) with its score, sorted, chosen one highlighted; positive/negative colouring as in Backgammon; dark-mode colours.
- Panel text in the page's language. Keep it compact (≈ 110–140 px high, scroll inside). It must not cover the board or push controls off screen at 1280×900 and on a phone width (≈ 380 px).
- If the game has AI vs AI or a hint mode, the panel should work there too.

## Page rules (strict — the live site breaks otherwise)
- Inline `<script>`: **no `//` comments** (use `/* */`), never `{{` or `{%` anywhere in the file, no `:word:` patterns (jemoji). Run `node --check` on every inline script you touched (extract to a temp .js).
- Do not touch the `ds-guard` block. Keep the front matter; don't rename files.
- Prefix new CSS classes/ids per game (e.g. `ttt-`, `c4-`) — no clashes with `deck/oyun.css`.
- Keep the TL currency and Turkish example names; on the EN page everything visible is English (also aria-labels, SVG/canvas text).
- Check tag balance with html.parser.

## Testing (do it)
Headless test with the repo's helper (serves the repo like the live site):
```python
import sys, os; sys.path.insert(0, r'C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io\tools')
import make_slide_pdf as m
from playwright.sync_api import sync_playwright
REPO = r'C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io'
with sync_playwright() as pw:
    b = m.launch(pw); ctx = b.new_context(viewport={'width': 1280, 'height': 900})
    m.serve(ctx, REPO, m.fetch_shell())
    pg = ctx.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(m.BASE + '/files/agt/sunumlar/Bolum_02_TicTacToe.html', wait_until='networkidle')
    # tick the reasoning checkbox, make moves / start AI vs AI, read the panel text, open the help, click each tab
    ...
```
Run it from the `tools` folder (`cd tools; python your_test.py`). Verify for each page (TR and EN): no JS errors; the AI makes the **same** moves as before your change in a few fixed positions (compare against the original file — keep a copy in your scratch folder and run both); the panel fills in and the chosen move is the one played; all four tabs open; take one screenshot at 1280×900 and one at 380×800 and look at them.

## Don'ts
No git. No browser pane. Don't touch games other than yours or shared files (`deck/*`). Scratch files in your scratch folder only. Final report: per game, what the panel shows, any refactor you did in the AI code and how you verified identical play, and anything you could not do.
