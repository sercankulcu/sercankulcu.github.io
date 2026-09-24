---
layout: archive
title: "WebGL studies"
permalink: /art/webgl/
author_profile: true
---

A second, separate set. Where the [pixel scenes](/art/) limit themselves to a rasteriser written by hand, a 320×180 buffer and a fixed palette, these are made with three.js and drawn at full resolution: physically based glass and metal, soft shadows that move with the light, fog and haze. The rules that stay the same are the 48-second loop and sound synthesised on the spot rather than recorded.

<style>
.art-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.7rem 1.4rem;
  margin: 1.6rem 0 0.5rem;
}

.art-card {
  display: block;
  text-decoration: none;
  color: inherit;
}

.art-card img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border: 1px solid var(--global-border-color, #d8d8d8);
  background: #0c1013;
  transition: border-color .18s;
}

.art-card:hover img {
  border-color: var(--global-text-color, #494e52);
}

.art-card .art-title {
  display: block;
  margin-top: 0.55rem;
  font-weight: 600;
  line-height: 1.25;
}

.art-card:hover .art-title {
  text-decoration: underline;
}

.art-card .art-meta {
  display: block;
  margin-top: 0.18rem;
  font-size: 0.78em;
  line-height: 1.45;
  opacity: 0.6;
}
</style>

<div class="art-grid">

  <a class="art-card" href="/art/webgl/sabah-cayi/">
    <img src="/images/art/webgl/sabah-cayi.png" alt="A tulip-shaped glass of tea on a saucer by a sunlit window, rendered in 3D" loading="lazy" width="960" height="540">
    <span class="art-title">Morning Tea</span>
    <span class="art-meta">A glass of tea by a window above the sea: light through the tea and the glass, window-bar shadows sliding across the table, steam and dust in the sun · three.js · 48 s loop</span>
  </a>

</div>
