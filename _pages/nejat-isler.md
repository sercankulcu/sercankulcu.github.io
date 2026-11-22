---
layout: archive
title: "Nejat İşler"
og_image: https://sercankulcu.github.io/images/og/nejat-isler.jpg
seo_title: "Nejat İşler Archive: Interviews and Profiles"
description: "Interviews, conversations, profiles and archival press material about the actor Nejat İşler, retold in English."
permalink: /nejat-isler/
author_profile: true
---

Interviews, conversations, profiles, and archival material about Nejat İşler.

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

{% assign entries = site["nejat-isler"] | sort: "date" | reverse %}
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
