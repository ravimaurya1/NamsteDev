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
    fetch(event.request)
      .then((response) => {
        const cloneData = response.clone();
        caches.open("v1").then((cache) => {
          cache.put(event.request, cloneData);
        });
        return response;
      })
      .catch(() => {
        // Check if the request is for an HTML page
        if (event.request.headers.get("accept").includes("text/html")) {
          // Return the custom offline page
          return new Response(
            `
            <!DOCTYPE html>
            <html>
              <head>
                <title>Offline</title>
                <style>
                  body { 
                    text-align: center; 
                    padding: 50px; 
                    font-family: Arial, sans-serif;
                  }
                  h1 { color: #333; }
                </style>
              </head>
              <body>
                <h1>You are offline</h1>
                <p>Please check your internet connection and try again.</p>
              </body>
            </html>
          `,
            {
              headers: { "Content-Type": "text/html" },
            }
          );
        }
        // For non-HTML requests, try to return cached version
        return caches.match(event.request);
      })
  );
});
