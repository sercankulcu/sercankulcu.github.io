---
title: Google Chromecast Is Released
date: 2013-07-15
permalink: /posts/2013/07/google-chromecast-is-released/
tags:
  - software
  - programming
  - computing-history
---

Google announced and began selling the Chromecast on July 24, 2013 for $35, alongside a limited-time offer of three months of Netflix free — which effectively made the device free for existing Netflix subscribers. Google sold out of the first production run within hours. The dongle was 72mm long, plugged directly into a TV's HDMI port, and drew power from a USB port (on the TV or via the included wall adapter), with no remote control, no standalone interface, and no local application storage beyond a small bootloader.

Chromecast used the Cast protocol, which separated device discovery from media streaming. A phone or laptop running a Cast-enabled app (Chrome browser, Netflix, YouTube) discovered Chromecast on the local network via mDNS, then sent it a URL and playback commands over a WebSocket connection — the device fetched the actual video stream directly from the CDN rather than relaying through the phone. This architecture kept the phone's battery and radio out of the video pipeline while making the phone the primary interface. Google published the Cast SDK in February 2014, and within a year hundreds of apps had added Cast support.

Roku had been selling streaming sticks since 2012, and Apple TV (third generation) was available at $99, but neither used a phone-as-remote model. Amazon's Fire TV launched in April 2014 and Fire TV Stick in October 2014. The $35 price and Cast architecture influenced how smart TVs designed their own built-in streaming platforms: LG's webOS 3.0, Samsung's Tizen, and Android TV all added Chromecast support by 2016, meaning a TV could receive Cast commands natively without a dongle. Google sold an estimated 20 million Chromecasts by the end of 2014.
