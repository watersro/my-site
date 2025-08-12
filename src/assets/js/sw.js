const CACHE_NAME = "roman-waters-v1";
const STATIC_ASSETS = [
  "/assets/css/style.css",
  "/assets/fonts/AzeretMonoVF.woff2",
  "/assets/js/vendor/gsap.min.js",
  "/assets/js/main.js",
  "/assets/js/cursor-init.js",
  "/assets/js/cursor-circle.js",
  "/assets/js/invert.js",
  "/assets/js/analytics-init.js",
  "/assets/js/background-animation.js",
  "/assets/js/cookie-banner.js",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Fetch event - serve from cache when possible
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});

// Activate event - cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
