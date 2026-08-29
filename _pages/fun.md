---
layout: archive
title: "Fun"
permalink: /fun/
author_profile: true
---

Films, games, music, entertainment, and other things I enjoy.

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
