// Listen for the install event
self.addEventListener("install", (event) => {
  console.log("Service Worker Installed");
  // Here we are caching the assets
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll(["./index.html", "./style.css", "./script.js"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated");
});

// Listen for the fetch event
self.addEventListener("fetch", (event) => {
  console.log("Service Worker Fetching");
  event.respondWith(
    caches.open("v1").then((cache) => {
      return cache.match(event.request).then((response) => {
        return response || fetch(event.request);
      });
    })
  );
});
