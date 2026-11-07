/* 90days challenge – offline cache.
   Nejdřív síť, ať máš vždy aktuální verzi; při výpadku se sáhne do cache. */
const CACHE = "90days-v6";
const FILES = [
  "./", "./index.html", "./manifest.webmanifest",
  "./icon-180.png?v=3", "./icon-192.png?v=3", "./icon-512.png?v=3",
  "./icon-512-maskable.png?v=3", "./favicon-64.png?v=3"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(FILES))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return r;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
