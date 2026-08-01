const CACHE_VERSION = "v20";
const CACHE_NAME = `my-pwa-sercan-cache-${CACHE_VERSION}`;
const MAX_CACHE_ITEMS = 60;

const PRECACHE_URLS = [
  "/images/owl-coffee-beans.png",
];

// Yalnızca bu dosya türleri runtime cache'e alınır.
const CACHEABLE_EXTENSIONS = [
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
    Promise.all([
      // Eski cache sürümlerini temizle.
      caches.keys().then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        )
      ),

      // Yeni service worker'ı açık sekmelerde etkinleştir.
      self.clients.claim(),
    ])
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;

  // POST, PUT vb. istekleri cache'leme.
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Üçüncü taraf kaynakları cache'leme.
  if (url.origin !== self.location.origin) {
    return;
  }

  // HTML ve sayfa gezinmelerinde network-first kullan.
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  // Yalnızca belirlenen statik dosya türlerini cache'le.
  const shouldCache = CACHEABLE_EXTENSIONS.some(extension =>
    url.pathname.toLowerCase().endsWith(extension)
  );

  if (shouldCache) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

async function networkFirst(request) {
  try {
    return await fetch(request);
  } catch {
    // Ağ yoksa daha önce özellikle cache'lenmiş bir yanıtı kullan.
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response("İnternet bağlantısı bulunamadı.", {
      status: 503,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  const networkResponsePromise = fetch(request)
    .then(async response => {
      if (isCacheableResponse(response)) {
        await cache.put(request, response.clone());
        await limitCacheSize(cache, MAX_CACHE_ITEMS);
      }

      return response;
    })
    .catch(() => null);

  // Cache varsa hemen göster, arkada güncelle.
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

async function limitCacheSize(cache, maxItems) {
  const keys = await cache.keys();

  while (keys.length > maxItems) {
    const oldestRequest = keys.shift();
    await cache.delete(oldestRequest);
  }
}
