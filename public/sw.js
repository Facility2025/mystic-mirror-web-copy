
const CACHE_NAME = 'sistema-arquivos-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/lovable-uploads/3aff111f-532c-4981-9574-0b45374b5d87.png'
];

// Instalar o service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativar o service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar requisições de rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna o cache se disponível, senão busca na rede
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Lidar com prompt de instalação
self.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  console.log('PWA pode ser instalado');
});
