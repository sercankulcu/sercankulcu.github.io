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

## Why This Moment Mattered

The event is useful to read as a platform signal, not only as a product announcement. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in software, programming, and computing history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
