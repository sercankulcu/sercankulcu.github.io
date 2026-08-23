---
layout: archive
title: "Fun"
permalink: /fun/
author_profile: true
---

Films, games, music, entertainment, and other things I enjoy.

{% assign entries = site.fun | sort: "date" | reverse %}
{% for post in entries %}
- [{{ post.title }}]({{ post.url | relative_url }}) — {{ post.date | date: "%B %-d, %Y" }}
{% endfor %}
