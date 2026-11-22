---

layout: archive
title: "Teoman"
og_image: https://sercankulcu.github.io/images/og/teoman.jpg
seo_title: "Teoman Archive: Interviews and Profiles"
description: "Interviews, conversations, profiles and archival press material about the Turkish musician Teoman, retold in English."
permalink: /teoman/
author_profile: true
---

Interviews, conversations, profiles, and archival material about Teoman.


{% assign entries = site.teoman | sort: "date" | reverse %}
{% for post in entries %}
{% assign words = post.content | number_of_words %}
{% assign reading_time = words | divided_by: site.words_per_minute %}
{% if reading_time < 1 %}
{% assign reading_time = 1 %}
{% endif %}

  <div class="collection-entry">
    <a href="{{ post.url | relative_url }}" class="collection-title">{{ post.title }}</a>
    {% if post.title_en %}<div class="collection-meta" lang="en"><em>“{{ post.title_en }}”</em></div>{% endif %}
    <div class="collection-meta">
      {{ post.date | date: "%b %-d, %Y" }} · {{ reading_time }} min read
    </div>
  </div>
{% endfor %}
