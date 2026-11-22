---
layout: archive
title: "Memory"
og_image: https://sercankulcu.github.io/images/og/memory.jpg
seo_title: "Memory: Personal Stories · Sercan Külcü"
description: "Personal stories, memories and small moments from different periods of my life."
permalink: /memory/
author_profile: true
---

Personal stories, memories, and moments from different periods of my life.


{% assign entries = site.memory | sort: "date" | reverse %}
{% for post in entries %}
{% assign words = post.content | number_of_words %}
{% assign reading_time = words | divided_by: 200 %}
{% if reading_time < 1 %}
{% assign reading_time = 1 %}
{% endif %}

  <div class="collection-entry">
    <a href="{{ post.url | relative_url }}" class="collection-title">{{ post.title }}</a>
    <div class="collection-meta">
      {{ post.date | date: "%b %-d, %Y" }} · {{ reading_time }} min read
    </div>
  </div>
{% endfor %}

