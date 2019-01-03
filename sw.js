const CACHE_VERSION = 'v1';
const CACHE_NAME = `${registration.scope}!${CACHE_VERSION}`;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      const itemsToCache = [
        './',
        'css/light-darkness.css',
        'css/materialize.min.css',
        'css/style.css',
        'css/the-church.css',
        'css/fontawesome-free-5.5.0-web/css/all.min.css',
        'css/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.woff',
        'css/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.woff2',
        'css/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.woff',
        'css/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.woff2',
        'css/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.woff',
        'css/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.woff2',
        'img/body.png',
        'js/jquery-2.1.1.min.js',
        'js/localforage.min.js',
        'js/materialize.min.js',
        'js/fp/base.js',
        'js/fp/language.js',
        'js/fp/scripture.js'
      ];
      cache
        .addAll(itemsToCache).catch(function(err){
          console.error(err);
        })
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(strCacheNames){
      let strCachesToDelete = [];
      strCachesToDelete.map(function(strCacheName){
        const startsWithName = strCacheName.startsWith(`${registration.scope}!`);
        const notEqualToName = strCacheName !== CACHE_NAME;
        const bothTrue = (startsWithName && notEqualToName);
        if (bothTrue) strCachesToDelete.push(strCacheName);
      });
      Promise.all(strCachesToDelete.map(function(item){
        caches.open(item).then(function(deleteItem) {
          deleteItem.delete();
        });
      }))
    })
  );
});
