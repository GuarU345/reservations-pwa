self.__WB_DISABLE_DEV_LOGS = true

const CACHE = 'app-shell-v1'
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.png',
    '/assets/index-*.js',
    '/assets/vendor-*.js',
    '/assets/index-*.css'
]

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(urlsToCache)))
})

self.addEventListener('push', (event) => {
    const payload = event.data ? event.data.json() : {};

    const title = payload.title || 'Notificación';

    const options = {
        body: payload.body || '',
        icon: '/favicon.png',
        data: payload,
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
})