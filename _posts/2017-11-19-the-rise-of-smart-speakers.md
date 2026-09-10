---
title: 'The Rise Of Smart Speakers'
date: 2017-11-19
permalink: /posts/2017/11/the-rise-of-smart-speakers/
tags:
  - voice
  - technology
  - artificial-intelligence
---

Amazon introduced the Echo in late 2014, and it spent a year available only by invitation before opening broadly. Google Home launched in November 2016. Apple announced HomePod at WWDC in June and it will ship next year. In three years, voice-activated speakers have moved from a product few people had heard of to the fastest-growing consumer electronics category.

I have been using an Echo for about eighteen months. This is what I have actually learned from it.

## What works and what does not

Voice is genuinely good for a specific set of tasks: music playback, timers and alarms, quick factual questions, adding items to a shopping list, controlling smart home devices that are already set up. These work because the interaction is short, the expected response is unambiguous, and a wrong result has low cost. "Alexa, set a timer for twenty minutes" is faster than finding a phone, unlocking it, and opening a clock app.

Voice is poor for anything that requires comparison, visual browsing, or precise input. Asking Alexa to find a specific product on Amazon is slow and error-prone. Asking a question with a nuanced answer produces a response that is either too short to be useful or impossible to follow without being able to re-read it. Correcting a mistake in a list entry is frustrating.

The useful mental model is not "this replaces the phone" but "this is faster for a specific ten interactions I do repeatedly."

## The architecture behind the cylinder

The device itself is mostly a microphone array, a speaker, and a small processor. It is not doing speech recognition locally. Audio is streamed to Amazon's (or Google's) cloud infrastructure, where recognition, natural language understanding, and response generation happen, and the result is sent back.

This means the speaker requires an internet connection to do almost anything. It also means all audio captured after the wake word is sent to the cloud. Amazon and Google keep records of these requests, though both provide ways to review and delete them.

The wake word detection — the part that decides when "Alexa" or "Hey Google" was said — does run locally, on the device itself. The devices are processing audio continuously but locally, looking only for the wake word pattern. The privacy concern is real but sometimes overstated: the device is not streaming all audio to the cloud, only what comes after a detected wake word.

Still, placing a device with a microphone in a kitchen or bedroom is different from having a phone in a pocket. The intimacy of the location makes the trust question more significant.

## Alexa Skills and the developer platform

Amazon opened the Alexa Skills Kit to developers in 2015, and in 2017 there are now tens of thousands of skills available. A skill is a voice-activated application: a user enables it, and then phrases like "Alexa, open [skill name]" activate it.

The economics work in Amazon's favor. More skills make Echo more useful, which sells more devices, which gives Amazon more data about what people buy and ask about. Skills themselves are not a direct revenue source for Amazon, but they make the platform stickier.

Building a skill is approachable — it is a Lambda function that handles JSON, essentially — but designing one that is actually useful is harder. The discoverability problem is severe. There is no visual interface to browse available skills. Users have to already know what skill they want. Discovering that a useful skill exists requires finding out about it somewhere other than the device itself.

## The discoverability problem is fundamental

A graphical interface can show available options. A menu, a grid of icons, a search box — all of these allow a user to explore what a system can do without prior knowledge. Voice cannot do this cleanly.

The result is that most users learn three to five things their speaker can do and repeat those indefinitely, ignoring almost everything else. The device is not less capable than they think — it is that the interface does not help them discover the capability.

This is probably the deepest design challenge in voice interfaces, and I have not seen a satisfying solution to it in three years of watching the category develop.

## What comes next

The interesting version of this category is not a standalone speaker competing with a phone. It is a voice layer that becomes ambient — present in different rooms, in cars, in devices that also do other things. Amazon is already pursuing this through Alexa integrations with Sonos, other speaker brands, televisions, and appliances.

The keyboard asks you to sit at a desk. The phone asks you to look at a screen. A voice interface that works reliably can be present in a room without requiring attention. That is a different kind of computer access, and it matters for situations where hands and eyes are occupied. Whether the current generation of devices is good enough to make that vision real is a different question.
