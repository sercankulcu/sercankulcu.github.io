---
layout: archive
title: "Thoughts"
og_image: https://sercankulcu.github.io/images/og/thoughts.jpg
seo_title: "Thoughts on Learning, Writing and Life · Sercan Külcü"
description: "Personal essays by Sercan Külcü on learning, writing, everyday life, technology, and the ideas that change how we see the world."
permalink: /thoughts/
author_profile: true
---

Essays, observations, questions, and reflections on life, learning, people, and ideas.


{% assign entries = site.thoughts | sort: "date" | reverse %}
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
