// Define a unique version for the cache
const CACHE_VERSION = 'v2';
const CACHE_NAME = 'my-pwa-sercan-cache-' + CACHE_VERSION;

// List of URLs to cache
const urlsToCache = [
  '/images/owl-coffee-beans.png',
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

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Yeni cevap cache'e ekleniyor
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return response;
      })
      .catch(() => {
        // Eğer fetch başarısız olursa cache'den getir
        return caches.match(event.request);
      })
  );
});
