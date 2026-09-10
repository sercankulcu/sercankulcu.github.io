---
title: 'AJAX And The Web Without Reloading'
date: 2006-01-22
permalink: /posts/2006/01/ajax-and-the-web-without-reloading/
tags:
  - web
  - javascript
  - technology
---

For a long time, using a website has followed a familiar rhythm. I click a link or submit a form, the browser waits, and then the whole page appears again. It works, but it often reminds me that I am moving from one document to another. Recently, some websites have started to feel different.

## Where the technology came from

The key piece of infrastructure is `XMLHttpRequest`, a browser API that allows JavaScript to send an HTTP request in the background and handle the response without interrupting the page. Microsoft introduced it in Internet Explorer 5 in 1999 — originally as an ActiveX control designed to support Outlook Web Access — but for years it was an obscure feature. Other browsers eventually implemented compatible versions, but developers rarely touched it because web pages were mostly documents, and documents loaded as documents.

The moment that changed the conversation was Jesse James Garrett's article "Ajax: A New Approach to Web Applications," published February 18, 2005 in Adaptive Path's newsletter. Garrett assembled existing techniques — `XMLHttpRequest`, JavaScript, the DOM, and asynchronous data exchange — into a named pattern and called the combination Ajax. He was not describing a new technology; he was naming a practice and making it discussable.

Google had already been experimenting publicly. Google Suggest, launched in December 2004, showed search completions as you typed — each keystroke sent a background request and updated the dropdown without a page reload. Gmail, launched in April 2004, and Google Maps, launched in February 2005, showed what a full application built this way could feel like. I can drag the Google Maps canvas and new tiles appear as I move; the page does not flash. Gmail shows conversations, composes messages, and manages labels without the browser ever loading a fresh URL in the traditional sense. These interfaces made the browser feel less like a document reader and more like a place where software can live.

## What the word stands for

AJAX stands for Asynchronous JavaScript and XML, though the XML part has become the least important element of the name. Many implementations already use other formats for the data exchange. The asynchronous part is what matters: the browser continues responding to user input while the background request is in flight, and when the response arrives, only the relevant section of the page updates.

## The problems this introduces

Of course, Ajax creates new problems alongside the improvements. A page can become harder to debug because more things happen in the background. Browser differences remain frustrating — Internet Explorer, Firefox, and Safari do not all implement `XMLHttpRequest` identically, and working around the gaps requires careful code. JavaScript logic can grow difficult to maintain once enough of an application lives in the browser. The back button, bookmarks, and accessibility tools also need more attention when a page changes its content without normal navigation events.

Still, I think this is an important change for the web. Faster connections help, but the real difference is psychological. When the whole screen does not flash and reload after every small action, the application feels more continuous. The user begins to forget that every piece of information is travelling to and from a remote server.

## Where this might lead

I am curious where this will lead. Maybe more programs that currently need installation will eventually work inside a browser. That idea still feels ambitious in January 2006, especially for large applications, but the direction is becoming easier to imagine. If Gmail can work like a mail client and Google Maps can work like a mapping application, the next question is which categories of software follow.

Sometimes a technical change looks small when described as code. "Send a request in the background" sounds almost ordinary. But small changes in interaction can slowly change what people expect from an entire platform.
