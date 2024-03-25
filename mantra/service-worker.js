// Define a unique version for the cache
const CACHE_VERSION = 'v2';
const CACHE_NAME = 'my-pwa-mantra-cache-' + CACHE_VERSION;

// List of URLs to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/data.js',
  '/assets/media/please-calm-my-mind.mp3',
  '/assets/icons/icon-512.png'
  // Add more URLs to cache as needed
];

// Event: Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Event: Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            // Delete outdated caches
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Event: Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Cache hit - return the cached response
      if (response) {
        return response;
      }

      // Clone the request since it's a one-time use
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(response => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response since it's a one-time use
        const responseToCache = response.clone();

        // Open the cache and add the new response
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
