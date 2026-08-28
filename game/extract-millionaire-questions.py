#!/usr/bin/env python3
"""
Run this ONCE from the repository root while the original game/millionaire.html
still contains QUESTION_POOL.

It extracts the exact QUESTION_POOL array into:
    game/millionaire-questions.js

No questions are rewritten, reordered, or normalized.
"""

from pathlib import Path
import re
import sys

source_path = Path("millionaire.html")
output_path = Path("millionaire-questions.js")

if not source_path.exists():
    sys.exit("game/millionaire.html bulunamadı.")

source = source_path.read_text(encoding="utf-8")

match = re.search(
    r"const\s+QUESTION_POOL\s*=\s*(\[[\s\S]*?\]);\s*(?=let\s+|const\s+|function\s+|document\.)",
    source,
)

if not match:
    # More tolerant fallback: find the array start and the first closing ];
    start_match = re.search(r"const\s+QUESTION_POOL\s*=\s*\[", source)
    if not start_match:
        sys.exit("QUESTION_POOL bulunamadı.")

    start = start_match.end() - 1
    depth = 0
    quote = None
    escape = False
    end = None

    for i in range(start, len(source)):
        ch = source[i]

        if quote:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == quote:
                quote = None
            continue

        if ch in ("'", '"', "`"):
            quote = ch
        elif ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                end = i + 1
                break

    if end is None:
        sys.exit("QUESTION_POOL kapanışı bulunamadı.")

    array_text = source[start:end]
else:
    array_text = match.group(1)

output = (
    "/* Generated from the existing game/millionaire.html QUESTION_POOL. */\n"
    "window.MILLIONAIRE_QUESTIONS = " + array_text + ";\n"
)

output_path.write_text(output, encoding="utf-8")

count = len(re.findall(r"\{\\s*l\\s*:", array_text))
if count == 0:
    count = len(re.findall(r'["\\\']?l["\\\']?\\s*:', array_text))

print(f"Created {output_path}")
print(f"Approximate question count: {count}")
print("Now replace game/millionaire.html with the integrated HTML file.")
