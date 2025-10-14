const CACHE_NAME = 'mn-appliance-repairs-v1';
const urlsToCache = [
    '/',
    '/offline.html',
    '/MN-Appliance-Repairs-Logo.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
    'https://www.appliancepartspros.com/b/wp-content/uploads/2022/03/shutterstock_555972565-1-1500x630.jpg',
    'https://bunburyappliancerepairs.com/wp-content/uploads/2021/12/television-repair11.webp'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            }
            .catch(function() {
                if (event.request.destination === 'document') {
                    return caches.match('/offline.html');
                }
            })
        )
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});