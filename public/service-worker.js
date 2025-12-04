self.__WB_DISABLE_DEV_LOGS = true;

const CACHE = "app-shell-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icono64.png",
  "/icono512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(urlsToCache)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener("push", (event) => {
  const payload = event.data ? event.data.json() : {};

  const title = payload.title || "Notificación";

  const options = {
    body: payload.body || "",
    icon: "/icono64.png",
    data: payload,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;

      return fetch(event.request).catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }
      });
    })
  );
});
