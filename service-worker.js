const CACHE_PREFIX = "my-pwa-sercan-cache-";
const CACHE_VERSION = "v24";
const CACHE_NAME = `${CACHE_PREFIX}${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "/images/owl-coffee-beans.webp",
];

const CACHEABLE_EXTENSIONS = [
  ".html",
  ".pdf",
  ".css",
  ".js",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
  ".gif",
  ".woff",
  ".woff2",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(
              cacheName =>
                cacheName.startsWith(CACHE_PREFIX) &&
                cacheName !== CACHE_NAME
            )
            .map(cacheName => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Cache only resources from this website.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Browser navigation requests usually do not include the .html extension.
  // Therefore, navigation requests are handled separately.
  if (request.mode === "navigate") {
    event.respondWith(networkFirstAndCache(request));
    return;
  }

  const pathname = url.pathname.toLowerCase();

  // Handle directly requested .html files with a network-first strategy.
  if (pathname.endsWith(".html")) {
    event.respondWith(networkFirstAndCache(request));
    return;
  }

  const shouldCache = CACHEABLE_EXTENSIONS.some(extension =>
    pathname.endsWith(extension)
  );

  if (shouldCache) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

/**
 * Tries the network first.
 * Stores successful responses in the cache.
 * Returns the cached HTML page when the network is unavailable.
 */
async function networkFirstAndCache(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const networkResponse = await fetch(request);

    if (isCacheableResponse(networkResponse)) {
      await cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response(
      `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Offline</title>
        </head>
        <body>
          <h1>No internet connection</h1>
          <p>This page has not been cached previously.</p>
        </body>
      </html>`,
      {
        status: 503,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      }
    );
  }
}

/**
 * Returns the cached response immediately when available.
 * At the same time, fetches the latest version from the network
 * and updates the cache in the background.
 *
 * Used for PDF, CSS, JavaScript, image, and font files.
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  const networkResponsePromise = fetch(request)
    .then(async response => {
      if (isCacheableResponse(response)) {
        await cache.put(request, response.clone());
      }

      return response;
    })
    .catch(() => null);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await networkResponsePromise;

  if (networkResponse) {
    return networkResponse;
  }

  return new Response("The requested resource could not be loaded.", {
    status: 503,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

function isCacheableResponse(response) {
  return (
    response &&
    response.status === 200 &&
    response.type === "basic"
  );
}
