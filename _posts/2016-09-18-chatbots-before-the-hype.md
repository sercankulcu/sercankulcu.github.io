---
title: 'Chatbots Before The Hype'
date: 2016-09-18
permalink: /posts/2016/09/chatbots-before-the-hype/
tags:
  - artificial-intelligence
  - chatbots
  - software
---

In April 2016, Facebook opened the Messenger Platform to developers, allowing companies to build bots that could receive and send messages through Messenger's API. In the weeks that followed, thousands of bots appeared — bots to order pizza, check weather, browse CNN headlines, get customer support, and more. Microsoft launched the Bot Framework in March 2016 with connectors for Skype, Slack, and other platforms. Amazon Alexa, which had launched with the Echo in November 2014, was drawing attention from developers building voice-driven skills for the device.

Chatbots became a significant topic at conferences in 2016 in a way they had not been for years.

## The idea is not new

ELIZA was written at MIT by Joseph Weizenbaum between 1964 and 1966. It simulated a Rogerian therapist by applying pattern-matching rules to the user's input and generating responses that reflected statements back as questions. ELIZA had no understanding of language — it matched phrases against templates — but users reported feeling that it understood them. Weizenbaum was disturbed by this and wrote a book, *Computer Power and Human Reason* (1976), expressing concern about how easily people attributed understanding to systems that had none.

Rule-based systems using AIML (Artificial Intelligence Markup Language), developed by Richard Wallace for A.L.I.C.E. in the 1990s, allowed chatbot authors to define categories: input patterns and corresponding response templates. These systems could handle a limited domain reasonably well when the inputs were predictable.

What is different in 2016 is the distribution environment. People already spend a significant part of the day inside messaging applications. A bot does not need its own app; it appears where users already are. And natural language processing has improved enough that intent recognition — determining what the user is trying to do from a sentence — is more tractable than it was. Tools like Wit.ai (acquired by Facebook in 2015), Api.ai (acquired by Google in 2016), and Luis.ai (Microsoft) provide NLP-as-a-service for recognizing intents and extracting entities from user messages.

## The interface problem

A button or menu shows users what choices exist. Conversation is open-ended. A user can type almost anything, and when the bot fails to understand a sentence that feels simple to the user, the experience becomes frustrating quickly. The user's mental model of what the bot can do is built from the first few interactions, and a mismatch creates disappointment that is hard to recover from.

This suggests that the best chatbots in 2016 are not the most ambitious ones. A bot that handles flight status checks or pizza ordering — clearly, reliably, without pretending to be a general assistant — is more useful than one that promises general conversation and stumbles on the third question.

## What the interest reveals

The underlying question chatbots raise is whether conversation can replace navigation as a computing interface. Instead of learning where a feature lives inside a menu, the user states what they want. This would lower the barrier to using complex software, particularly on mobile devices where menus are small and precise tapping is difficult.

Whether this becomes a durable interface paradigm or a temporary enthusiasm is genuinely unclear in September 2016. The technology for reliable narrow-domain bots is available now. The technology for open-domain conversation that does not mislead users is not. The interesting design question is whether narrow utility, delivered honestly, is enough for a bot to be worth building.
