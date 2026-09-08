#!/usr/bin/env python3
from pathlib import Path
import re
import shutil
import sys

ARCHIVE_PAGE = '''---
layout: archive
title: "Poems"
permalink: /poems/
author_profile: true
---

Poems I like, remember, and return to.

<style>
.collection-entry {
  margin-bottom: 1.15rem;
}

.collection-title {
  font-weight: 600;
}

.collection-meta {
  margin-top: 0.15rem;
  font-size: 0.78em;
  opacity: 0.6;
}
</style>

{% assign entries = site.poems | sort: "order" %}
{% for post in entries %}
  <div class="collection-entry">
    <a href="{{ post.url | relative_url }}" class="collection-title">{{ post.title }}</a>
    {% if post.poet %}
    <div class="collection-meta">{{ post.poet }}</div>
    {% endif %}
  </div>
{% endfor %}
'''

SEARCH_BLOCK = '''

{% for item in site.poems %}
  {% unless first_item %},{% endunless %}
  {
    "title": {{ item.title | jsonify }},
    "url": {{ item.url | relative_url | jsonify }},
    "type": "Poems",
    "excerpt": {{ item.excerpt | default: item.content | strip_html | strip_newlines | truncate: 180 | jsonify }},
    "content": {{ item.content | strip_html | strip_newlines | jsonify }}
  }
  {% assign first_item = false %}
{% endfor %}
'''

COLLECTION_BLOCK = '''  poems:
    output: true
    permalink: /:collection/:path/
'''

DEFAULT_BLOCK = '''  - scope:
      path: ""
      type: poems
    values:
      layout: single
      author_profile: true
      read_time: true
      share: true
      comments: true
'''

TR = str.maketrans({
    'ç':'c','Ç':'C','ğ':'g','Ğ':'G','ı':'i','İ':'I',
    'ö':'o','Ö':'O','ş':'s','Ş':'S','ü':'u','Ü':'U',
    'â':'a','Â':'A','î':'i','Î':'I','û':'u','Û':'U'
})

def slugify(text):
    text = text.translate(TR).lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip('-') or 'poem'

def strip_front_matter(text):
    if not text.startswith('---'):
        return text
    parts = text.split('---', 2)
    return parts[2].lstrip('\n') if len(parts) == 3 else text

def parse_poems(text):
    body = strip_front_matter(text)
    lines = body.splitlines()
    starts = []
    for i in range(len(lines) - 1):
        if lines[i].strip() and lines[i+1].strip() == '---':
            starts.append(i)
    poems = []
    for n, start in enumerate(starts):
        end = starts[n+1] if n+1 < len(starts) else len(lines)
        heading = lines[start].strip()
        content = '\n'.join(lines[start+2:end]).strip()
        if ' / ' in heading:
            title, poet = heading.split(' / ', 1)
            poet = poet.strip()
        else:
            title, poet = heading, None
        poems.append((title.strip(), poet, content))
    return poems

def yaml_quote(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')

def update_config(path):
    text = path.read_text(encoding='utf-8')
    if re.search(r'^  poems:\s*$', text, re.M) is None:
        marker = '  nejat-isler:\n'
        idx = text.find(marker)
        if idx != -1:
            text = text[:idx] + COLLECTION_BLOCK + text[idx:]
        else:
            m = re.search(r'(?m)^defaults:\s*$', text)
            if not m:
                raise RuntimeError('Could not find defaults: in _config.yml')
            text = text[:m.start()] + COLLECTION_BLOCK + '\n' + text[m.start():]
    if re.search(r'(?m)^\s+type:\s*poems\s*$', text) is None:
        marker = '# Sass/SCSS'
        idx = text.find(marker)
        if idx == -1:
            raise RuntimeError('Could not find # Sass/SCSS in _config.yml')
        text = text[:idx] + DEFAULT_BLOCK + '\n' + text[idx:]
    path.write_text(text, encoding='utf-8')

def update_search(path):
    if not path.exists():
        return
    text = path.read_text(encoding='utf-8')
    if 'site.poems' not in text:
        marker = '{% for item in site.memory %}'
        idx = text.find(marker)
        if idx == -1:
            idx = text.rfind(']')
        text = text[:idx] + SEARCH_BLOCK + '\n' + text[idx:]
        path.write_text(text, encoding='utf-8')

def update_about(path):
    if not path.exists():
        return
    text = path.read_text(encoding='utf-8')
    if '](/poems/)' in text:
        return
    old = '[🎬 Fun](/fun/) · [🕰️ Memory](/memory/)'
    new = '[🎬 Fun](/fun/) · [📜 Poems](/poems/) · [🕰️ Memory](/memory/)'
    if old in text:
        text = text.replace(old, new, 1)
        path.write_text(text, encoding='utf-8')

def main():
    repo = Path(sys.argv[1] if len(sys.argv) > 1 else '.').resolve()
    source = repo / '_pages' / 'poems.md'
    config = repo / '_config.yml'
    if not source.exists() or not config.exists():
        raise SystemExit('Run this against the repository root (must contain _pages/poems.md and _config.yml).')

    original = source.read_text(encoding='utf-8')
    poems = parse_poems(original)
    if not poems:
        raise SystemExit('No poems found in _pages/poems.md.')

    backup = repo / '_pages' / 'poems.md.pre-collection.bak'
    if not backup.exists():
        shutil.copy2(source, backup)

    out = repo / '_poems'
    out.mkdir(exist_ok=True)
    for order, (title, poet, content) in enumerate(poems, 1):
        slug = slugify(title)
        target = out / f'{slug}.md'
        fm = ['---', f'title: "{yaml_quote(title)}"']
        if poet:
            fm.append(f'poet: "{yaml_quote(poet)}"')
        fm += [f'order: {order}', '---', '']
        target.write_text('\n'.join(fm) + content + '\n', encoding='utf-8')

    source.write_text(ARCHIVE_PAGE, encoding='utf-8')
    update_config(config)
    update_search(repo / 'search.json')
    update_about(repo / '_pages' / 'about.md')

    print(f'Created {len(poems)} files in _poems/.')
    print('Updated _pages/poems.md, _config.yml, search.json, and _pages/about.md when present.')
    print(f'Backup: {backup.relative_to(repo)}')

if __name__ == '__main__':
    main()
