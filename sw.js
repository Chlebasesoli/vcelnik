// v6 – no-op SW: replaces old intercepting SW, clears all caches
self.addEventListener('install', () => {
  self.skipWaiting(); // take over immediately, don't wait for old SW to stop
});

self.addEventListener('activate', e => {
  // delete ALL old caches so nothing is served from stale cache
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim(); // take control of all open tabs right away
});

// fetch handler intentionally empty – browser handles all requests natively
// This fixes the bug where old SW was intercepting Supabase API calls
self.addEventListener('fetch', () => {});
