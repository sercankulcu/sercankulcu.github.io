---
title: 'The Web Is Moving Into Our Pockets'
date: 2009-04-05
permalink: /posts/2009/04/the-web-is-moving-into-our-pockets/
tags:
  - mobile
  - web
  - technology
---

Browsing the web on a phone used to mean visiting a stripped-down WAP page — minimal text, no images, a navigation designed around a numeric keypad. That was the mobile web until recently: a simplified shadow of the real internet, tolerated rather than enjoyed.

That picture is changing quickly.

## What changed

The iPhone launched in June 2007 with Mobile Safari, the first browser on a phone capable of rendering ordinary web pages rather than WAP versions. Steve Jobs announced at the original iPhone presentation that the device would "show you the real internet" — not a stripped-down version. The pinch-to-zoom touch interface made navigating a desktop-formatted page practical for the first time on a mobile screen.

The iPhone 3G (July 2008) added 3G connectivity, significantly improving download speeds. Android 1.0 launched in October 2008 on the T-Mobile G1, bringing a second platform with full web browser capabilities. By April 2009, Android is appearing on an expanding range of devices, and the competition between iOS and Android is pushing both platforms' browsers to improve faster than mobile browsers had moved previously.

3G networks in 2009 deliver roughly 1–2 Mbps in good coverage areas — not fast by desktop standards, but fast enough to load a news article or a map in a few seconds. The mobile network speed and the device capabilities are converging on a point where a usable web experience is becoming normal rather than exceptional.

## What this forces web developers to rethink

A visitor to a website is no longer necessarily sitting at a desk with a large monitor, a mouse, and a fast broadband connection. They may be on a bus, glancing at a phone screen, looking for one specific piece of information, with slow connectivity and small fingers attempting to hit small links.

The same design that works well at 1280 × 1024 on a broadband connection can be genuinely frustrating on a 320 × 480 screen at 3G speeds. Heavy image backgrounds, small tap targets, multi-column layouts that require horizontal scrolling, and Flash-based content that does not run at all on Mobile Safari are all problems that were easy to ignore when mobile traffic was negligible.

Mobile-specific sites — m.facebook.com, m.twitter.com — are one response: separate versions optimized for small screens, updated independently from the desktop site. This works but multiplies maintenance effort. I suspect the more durable solution will be designs that adapt to available screen space rather than maintaining two separate sites. Flexible grids, images that scale, and CSS that adjusts based on screen width seem like the right direction, though the tooling for this approach is still early.

## What mobile-native means

Phones have capabilities that desktops do not. Location is the obvious one: a phone knows roughly where the user is, which changes what information is useful. A restaurant search from a phone can show restaurants near the user's current location without requiring a city or postal code. A photograph can be taken and immediately uploaded without the intermediate step of transferring files to a computer.

These capabilities are interesting not because they replace what the desktop web can do, but because they make certain applications genuinely better on a phone than on a computer.

The social change is less comfortable to name but probably worth noticing. When a connection to the internet lives in your pocket and is always available, being offline becomes something you choose rather than something that simply happens. Email, news, and communication can follow you everywhere. Whether that constant availability will eventually feel like a burden rather than a feature is a reasonable question that people in April 2009 are not yet in a position to answer from experience.
