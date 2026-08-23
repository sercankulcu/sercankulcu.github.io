---
layout: archive
title: "Thoughts"
permalink: /thoughts/
author_profile: true
---

Essays, observations, questions, and reflections on life, learning, people, and ideas.

{% assign entries = site.thoughts | sort: "date" | reverse %}
{% for post in entries %}
- [{{ post.title }}]({{ post.url | relative_url }})
{% endfor %}
