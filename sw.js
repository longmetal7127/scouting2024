const cacheName = "offline-cache-v1";
const cacheUrls = ["index.html","index.js","manifest.json", "package-lock.json","package.json","sw.js","css\\index.css","node_modules\\dexie\\","pages\\","css\\teams.css","pages\\aboutus.html","pages\\teamdetails.html","pages\\teamdetails.js","css\\","js\\"];

// Installing the Service Worker
self.addEventListener("install", async (event) => {
  try {
    const cache = await caches.open(cacheName);
    await cache.addAll(cacheUrls);
  } catch (error) {
    console.error("Service Worker installation failed:", error);
  }
});

// Fetching resources
self.addEventListener('fetch', event => {
  event.respondWith(
    // Try fetching from the network first
    fetch(event.request)
      .then(response => {
        // If request succeeds, clone the response to cache and return the response
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          return response;
        }
        // If request fails (e.g., network error), fall back to the cache
        return caches.match(event.request);
      })
      .catch(error => {
        // If fetch from network fails, try serving from cache
        return caches.match(event.request);
      })
  );
});


// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     (async () => {
//       const cache = await caches.open(cacheName);
//       try {
//         const cachedResponse = await cache.match(event.request);
//         if (cachedResponse) {
//           console.log("cachedResponse: ", event.request.url);
//           return cachedResponse;
//         }
//         const fetchResponse = await fetch(event.request);
//         if (fetchResponse) {
//           console.log("fetchResponse: ", event.request.url);
//           await cache.put(event.request, fetchResponse.clone());
//           return fetchResponse;
//         }
//       } catch (error) {
//         console.log("Fetch failed: ", error);
//         const cachedResponse = await cache.match("index.html");
//         return cachedResponse;
//       }
//     })()
//   );
// });
