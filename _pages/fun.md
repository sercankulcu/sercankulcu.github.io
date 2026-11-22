---
layout: archive
title: "Fun"
og_image: https://sercankulcu.github.io/images/og/fun.jpg
seo_title: "Fun: Films, Games and Music · Sercan Külcü"
description: "Writing about films, games, music, entertainment and other things I enjoy."
permalink: /fun/
author_profile: true
---

Films, games, music, entertainment, and other things I enjoy.


{% assign entries = site.fun | sort: "date" | reverse %}
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
