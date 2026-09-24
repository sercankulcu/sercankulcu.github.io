---
layout: archive
title: "Art"
permalink: /art/
author_profile: true
---

Scenes drawn pixel by pixel in the browser. No 3D library and no video in any of them: each frame is a pure function of time, rendered into a 320×180 buffer by a software rasteriser written for that scene, reduced to a fixed palette, and looped. The sound is synthesised on the spot rather than recorded.

They have turned out to be about the same thing. Each one is a place where something is expected and nothing comes: the boat stays moored, the train never arrives, the light turns for no one. The weather does the acting.

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

  <a class="art-card" href="/art/sessiz-iskele/">
    <img src="/images/art/sessiz-iskele.png" alt="A foggy Black Sea pier with a moored fishing boat, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Silent Pier</span>
    <span class="art-meta">A foggy morning on a Black Sea pier, walked end to end · 41 colours · 48 s loop</span>
  </a>

  <a class="art-card" href="/art/firtinada-fener/">
    <img src="/images/art/firtinada-fener.png" alt="A lighthouse on a rock in a storm, its beam cutting through rain, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Lighthouse in the Storm</span>
    <span class="art-meta">A lighthouse through a storm: a turning beam, breaking swell, spray and rain · 43 colours · 48 s loop</span>
  </a>

  <a class="art-card" href="/art/karli-istasyon/">
    <img src="/images/art/karli-istasyon.png" alt="An empty railway platform under falling snow, lit by sodium lamps, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Snowy Station</span>
    <span class="art-meta">An empty platform under snow: sodium lamps pooling on the drifts, and a headlight that never arrives · 40 colours · 48 s loop</span>
  </a>

  <a class="art-card" href="/art/akvaryum/">
    <img src="/images/art/akvaryum.png" alt="The inside of a lit aquarium: light pooling on the sand, plants, and fish, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Aquarium</span>
    <span class="art-meta">Inside a lit tank at two in the morning: caustics on the sand, Snell's window overhead, fish going nowhere · 44 colours · 48 s loop</span>
  </a>

  <a class="art-card" href="/art/park-guell/">
    <img src="/images/art/park-guell.png" alt="Gaudí's mosaic bench at Park Güell above Barcelona, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Park Güell</span>
    <span class="art-meta">Gaudí's bench above Barcelona, rebuilt from a photograph: trencadís laid as thousands of flat shards · 56 colours · 48 s loop</span>
  </a>

  <a class="art-card" href="/art/gece-laboratuvari/">
    <img src="/images/art/gece-laboratuvari.png" alt="An empty engineering lab at night, lit by an oscilloscope and a rainy window, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Night Lab</span>
    <span class="art-meta">An empty lab after midnight: a live trace on the scope, rain on the glass, every light in the room coming from the instruments · 45 colours · 48 s loop</span>
  </a>

  <a class="art-card" href="/art/bos-durak/">
    <img src="/images/art/bos-durak.png" alt="A roadside bus shelter on a rainy night with a lit timetable and a street lamp reflected in the wet road, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Empty Bus Stop</span>
    <span class="art-meta">A bus shelter in the rain at the edge of town: a flickering timetable, one street lamp streaked across the wet asphalt, and headlights that turn away before they reach the stop · 42 colours · 48 s loop</span>
  </a>

  <a class="art-card" href="/art/kis-limani/">
    <img src="/images/art/kis-limani.png" alt="A small Black Sea fishing harbour at winter dusk with moored boats and a green harbour light, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Harbour in Winter</span>
    <span class="art-meta">A small Black Sea harbour at winter dusk: moored boats rocking on the swell, ropes slackening and tightening, and a green harbour light blinking through the sleet for no one · 45 colours · 48 s loop</span>
  </a>

  <a class="art-card" href="/art/yayla-evi/">
    <img src="/images/art/yayla-evi.png" alt="A wooden highland house at dusk with one lit window, half hidden in fog, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Highland House</span>
    <span class="art-meta">A wooden house on a misty highland at dusk: one lit window, smoke from the chimney, and fog that climbs the valley toward a path no one walks up · 48 colours · 48 s loop</span>
  </a>

  <a class="art-card" href="/art/findik-bahcesi/">
    <img src="/images/art/findik-bahcesi.png" alt="A hazelnut orchard on a sunny hillside with a harvest basket under the bushes, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Hazel Orchard</span>
    <span class="art-meta">A hazelnut orchard on a steep hillside above Giresun: late sun dappling the ground through wind-tossed bushes, and a harvest basket waiting for pickers who never come · 46 colours · 48 s loop</span>
  </a>

  <a class="art-card" href="/art/sinav-salonu/">
    <img src="/images/art/sinav-salonu.png" alt="An empty lecture hall with sunlight slanting through tall windows onto rows of desks, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Exam Hall</span>
    <span class="art-meta">An empty lecture hall a minute before the exam: low sun slanting through tall windows, dust turning in the light, and a clock that never reaches nine · 46 colours · 48 s loop</span>
  </a>

  <a class="art-card" href="/art/cay-bahcesi/">
    <img src="/images/art/cay-bahcesi.png" alt="An empty seaside tea garden in the rain with a striped awning, a brass samovar and tipped chairs, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Tea Garden in the Rain</span>
    <span class="art-meta">An empty tea garden above the sea in the rain: a striped awning dripping over a brass samovar, tipped chairs, and an island fading into the haze · 44 colours · 48 s loop</span>
  </a>

  <a class="art-card" href="/art/gece-treni/">
    <img src="/images/art/gece-treni.png" alt="The inside of a night train compartment with a reading lamp, a glass of tea on the table and moonlit hills outside the window, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Night Train</span>
    <span class="art-meta">A sleeper compartment at night: a reading lamp over worn seats, a glass of tea trembling to the rail joints, and a lit station that flashes past without stopping · 42 colours · 48 s loop</span>
  </a>

  <a class="art-card" href="/art/camasirhane/">
    <img src="/images/art/camasirhane.png" alt="An empty laundromat at night under fluorescent tubes, with one washer running and rain on the front window, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Laundromat, 3 AM</span>
    <span class="art-meta">An empty laundromat at three in the morning: one washer tumbling a load no one will collect, under a fluorescent tube that keeps failing · 45 colours · 48 s loop</span>
  </a>

  <a class="art-card" href="/art/ekim-plaji/">
    <img src="/images/art/ekim-plaji.png" alt="An empty Black Sea beach in October with folded umbrellas, a lifeguard tower and waves running up the sand, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Beach in October</span>
    <span class="art-meta">An empty beach in October: folded umbrellas shivering in the wind, a lifeguard tower flying its red flag for no one, and waves that keep running up the sand · 46 colours · 48 s loop</span>
  </a>

</div>
