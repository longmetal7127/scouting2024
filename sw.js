const cacheName = "offline-cache-v1";
const cacheUrls = ["index.html","index.js","manifest.json", "package-lock.json","package.json","sw.js","favicon.ico","css\\index.css","php\\","node_modules\\dexie\\","pages\\","css\\teams.css","pages\\aboutus.html","pages\\teamdetails.html","pages\\teamdetails.js","css\\","js\\"];

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
  const timeoutPromise = new Promise((resolve) => {
    // Set a timeout to resolve the promise after a certain time (e.g., 3 seconds)
    setTimeout(() => {
      resolve(new Response(null, { status: 408, statusText: 'Request timed out' }));
    }, 3000); // Adjust the timeout duration as needed
  });

  event.respondWith(
    Promise.race([
      // Try fetching from the network
      fetch(event.request),
      timeoutPromise
    ])
    .then(response => {
      // If request succeeds, clone the response to cache and return the response
      if (response && response.status === 200) {
        const responseToCache = response.clone();
        caches.open(cacheName)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });
        return response;
      }
      // If request fails (e.g., network error or timeout), fall back to the cache
      return caches.match(event.request);
    })
    .catch(error => {
      // If fetch from network fails, try serving from cache
      return caches.match(event.request);
    })
  );
});
