---
title: 'Why Progressive Web Apps Are Interesting'
date: 2016-01-24
permalink: /posts/2016/01/why-progressive-web-apps-are-interesting/
tags:
  - web
  - javascript
  - mobile
---

The term "Progressive Web App" was coined by Google engineer Alex Russell in a blog post in June 2015. The concept describes a web application that adopts a set of features progressively — it works for every user regardless of browser, but adds capabilities like offline access, installation, and push notifications for users whose browsers support them.

In January 2016, the technical pieces are becoming real, and several early deployments are demonstrating that the model can work at production scale.

## The three technical foundations

**Service Workers** are the most important piece. A service worker is a JavaScript file that the browser registers as a proxy between the web application and the network. Once registered, it intercepts network requests and can respond from a cache, modify requests, or proceed to the network — the developer's code decides.

A simple offline strategy:

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
```

This returns a cached response when one exists and falls back to the network otherwise. More sophisticated strategies can serve cached content immediately while updating the cache in the background, or cache responses from specific origins while passing others through. The service worker persists after the browser tab closes, enabling background sync and push notifications.

**Web App Manifest** is a JSON file that describes how the application should appear when installed. Name, icons, theme color, and the `display` property — which controls whether the app launches in a browser frame or fullscreen — are specified here:

```json
{
  "name": "My Application",
  "short_name": "App",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#2196F3",
  "icons": [{"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"}]
}
```

When Chrome on Android detects a site with a service worker, HTTPS, and a valid manifest, it prompts the user to add the site to their home screen. The installed app launches without a browser URL bar.

**HTTPS** is required for service worker registration — by design, to prevent man-in-the-middle attacks from intercepting the service worker script. Let's Encrypt, which launched in April 2016, is making HTTPS obtainable at no cost for all sites. This was a significant barrier previously.

## Early production examples

Flipkart, India's largest e-commerce site, launched Flipkart Lite as a PWA in late 2015 after shutting down their mobile web experience in 2015. The PWA delivered 70% increase in conversions, 3x lower data usage, and 40% higher re-engagement rate than their previous mobile web experience. For markets where users have slower connections and limited device storage, the web delivery model addresses real constraints.

Washington Post has been experimenting with service workers for cached article reading offline.

## The honest limits

Browser support in January 2016 is uneven. Service workers are supported in Chrome and Firefox; Safari has not committed to implementing them. This is important because Safari is the required browser on iOS — there is no way to install an alternative browser engine on an iPhone. An iOS user cannot benefit from any service worker features, which means PWAs on iOS lack offline capability and home screen installation through the standard path.

Native applications still have deeper device integration: Bluetooth, NFC, background processing models, performance for graphics-intensive applications, and distribution through app stores with their discovery advantages.

The interesting tension is between openness and capability. A link is still enough to enter a web application, without an app store, without an installation, without trusting a 50 MB download before seeing what the thing does. If the web can deliver enough of the experience that native apps provide for most applications, the distribution model changes in a meaningful way.
