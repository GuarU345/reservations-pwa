self.__WB_DISABLE_DEV_LOGS = true

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('app-cache').then(cache => cache.addAll(['/', 'index.html']))
    );
});

self.addEventListener('push', (event) => {
    const payload = event.data ? event.data.json() : {};

    const title = payload.title || 'Notificación';

    const options = {
        body: payload.message || '',
        icon: '/favicon.png',
        data: payload,
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
})