const CACHE_PREFIX = "my-pwa-sercan-cache-";
const CACHE_VERSION = "v22";
const CACHE_NAME = `${CACHE_PREFIX}${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "/images/owl-coffee-beans.png",
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

  // Sadece sitenin kendi kaynaklarını cache'le.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Tarayıcı gezinmeleri genellikle .html uzantısı içermez.
  // Bu nedenle navigate isteklerini ayrıca yakalıyoruz.
  if (request.mode === "navigate") {
    event.respondWith(networkFirstAndCache(request));
    return;
  }

  const pathname = url.pathname.toLowerCase();

  // Doğrudan istenen .html dosyaları da network-first olsun.
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
 * Önce ağı dener.
 * Başarılı yanıtı cache'e kaydeder.
 * Ağ yoksa cache'deki HTML sayfasını döndürür.
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
      <html lang="tr">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Çevrimdışı</title>
        </head>
        <body>
          <h1>İnternet bağlantısı bulunamadı</h1>
          <p>Bu sayfa daha önce cache'e alınmamış.</p>
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
 * Cache varsa hemen döndürür.
 * Aynı anda ağdan yeni sürümü indirip cache'i günceller.
 *
 * PDF, CSS, JavaScript, görsel ve fontlar için kullanılır.
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

  return new Response("Kaynak yüklenemedi.", {
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