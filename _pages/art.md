---
layout: archive
title: "Art"
permalink: /art/
author_profile: true
---

Scenes drawn pixel by pixel in the browser. No 3D library and no video in any of them: each frame is a pure function of time, rendered into a 320×180 buffer by a software rasteriser written for that scene, reduced to a fixed palette, and looped. The sound is synthesised on the spot rather than recorded.

They have turned out to be about the same thing. Each one is a place where something is expected and nothing comes: the boat stays moored, the train never arrives, the light turns for no one. The weather does the acting.

Tarayıcıda piksel piksel çizilen sahneler. Hiçbirinde 3B kütüphane ya da video yok: her kare zamanın saf bir fonksiyonu; o sahne için yazılmış bir yazılım rasterlaştırıcısıyla 320×180'lik bir tampona çiziliyor, sabit bir palete indirgeniyor ve döngüye alınıyor. Ses kaydedilmiyor, o anda sentezleniyor.

Sonunda hepsi aynı şeyi anlatır oldu. Her biri bir şeyin beklendiği ama hiçbir şeyin gelmediği bir yer: tekne bağlı kalıyor, tren hiç gelmiyor, ışık kimse için dönüyor. Oyunculuğu hava yapıyor.

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

.art-card .art-en {
  font-weight: 400;
  opacity: 0.65;
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
    <span class="art-title">Sessiz İskele <span class="art-en">· Silent Pier</span></span>
    <span class="art-meta">A foggy morning on a Black Sea pier, walked end to end · 41 colours · 48 s loop</span>
    <span class="art-meta" lang="tr">Karadeniz'de sisli bir sabah, iskelenin bir ucundan öbürüne</span>
  </a>

  <a class="art-card" href="/art/firtinada-fener/">
    <img src="/images/art/firtinada-fener.png" alt="A lighthouse on a rock in a storm, its beam cutting through rain, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Fırtınada Fener <span class="art-en">· Lighthouse in the Storm</span></span>
    <span class="art-meta">A lighthouse through a storm: a turning beam, breaking swell, spray and rain · 43 colours · 48 s loop</span>
    <span class="art-meta" lang="tr">Fırtınada bir fener: dönen huzme, kırılan dalgalar, serpinti ve yağmur</span>
  </a>

  <a class="art-card" href="/art/karli-istasyon/">
    <img src="/images/art/karli-istasyon.png" alt="An empty railway platform under falling snow, lit by sodium lamps, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Karlı İstasyon <span class="art-en">· Snowy Station</span></span>
    <span class="art-meta">An empty platform under snow: sodium lamps pooling on the drifts, and a headlight that never arrives · 40 colours · 48 s loop</span>
    <span class="art-meta" lang="tr">Kar altında boş bir peron: kar yığınlarına düşen sodyum ışığı ve hiç gelmeyen bir far</span>
  </a>

  <a class="art-card" href="/art/akvaryum/">
    <img src="/images/art/akvaryum.png" alt="The inside of a lit aquarium: light pooling on the sand, plants, and fish, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Akvaryum <span class="art-en">· Aquarium</span></span>
    <span class="art-meta">Inside a lit tank at two in the morning: caustics on the sand, Snell's window overhead, fish going nowhere · 44 colours · 48 s loop</span>
    <span class="art-meta" lang="tr">Gece ikide ışığı yanan bir akvaryum: kumda ışık desenleri, yukarıda Snell penceresi, hiçbir yere gitmeyen balıklar</span>
  </a>

  <a class="art-card" href="/art/park-guell/">
    <img src="/images/art/park-guell.png" alt="Gaudí's mosaic bench at Park Güell above Barcelona, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Park Güell</span>
    <span class="art-meta">Gaudí's bench above Barcelona, rebuilt from a photograph: trencadís laid as thousands of flat shards · 50 colours · 48 s loop</span>
    <span class="art-meta" lang="tr">Barselona'ya bakan Gaudí bankı, bir fotoğraftan yeniden kuruldu: binlerce düz parçadan trencadís</span>
  </a>

  <a class="art-card" href="/art/gece-laboratuvari/">
    <img src="/images/art/gece-laboratuvari.png" alt="An empty engineering lab at night, lit by an oscilloscope and a rainy window, drawn in pixels" loading="lazy" width="960" height="540">
    <span class="art-title">Gece Laboratuvarı <span class="art-en">· Night Lab</span></span>
    <span class="art-meta">An empty lab after midnight: a live trace on the scope, rain on the glass, every light in the room coming from the instruments · 45 colours · 48 s loop</span>
    <span class="art-meta" lang="tr">Gece yarısından sonra boş bir laboratuvar: osiloskopta canlı bir sinyal, camda yağmur, odadaki bütün ışık cihazlardan</span>
  </a>

</div>
