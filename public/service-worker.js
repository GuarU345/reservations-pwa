self.__WB_DISABLE_DEV_LOGS = true

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