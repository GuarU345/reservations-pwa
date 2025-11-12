self.__WB_DISABLE_DEV_LOGS = true

export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then(() => {
                    console.log('Service Worker registrado');
                })
                .catch(error => {
                    console.log('SW registration failed: ', error);
                });
        });
    }
}