---
layout: archive
title: "Poems"
og_image: https://sercankulcu.github.io/images/og/poems.jpg
seo_title: "Poems I Return To · Sercan Külcü"
description: "A small collection of Turkish poems I like and return to, by Nazım Hikmet, Attila İlhan, Orhan Veli, Can Yücel and others."
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
