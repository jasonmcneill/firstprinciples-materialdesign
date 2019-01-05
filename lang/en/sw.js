const CACHE_VERSION = 'v2';
const CACHE_NAME = `${registration.scope}!${CACHE_VERSION}`;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      const fpKeysEn = await fetch('./keys.json').then(response => {
        return response.json();
      });
      const itemsToCache = [];
      fpKeysEn.scriptures.map(scriptureItem => {
        const scriptureKey = scriptureItem.key;
        const xmlUrl = `./scriptures/${scriptureKey}/content.xml`;
        fetch(xmlUrl).then(response => {
          const xmlResponseText = response.text();
          return xmlResponseText;
        }).then(xmlText => {
          cache.add(xmlUrl, xmlText).catch(err => {
            console.error('cache.add() for scripture content failed:', err);
          });
        }).catch(err => {
          console.error('fetch failed for ' + xmlUrl + ':', err);
        });
      });
      fpKeysEn.pages.map(pageItem => {
        const pageKey = pageItem.key;
        const xmlUrl = `./${pageKey}/content.xml`;
        if (pageKey === 'dashboard') {
          itemsToCache.push(`./${pageKey}/logic.js`);
          itemsToCache.push(`./`);
        } else if (pageKey !== 'global') {
          itemsToCache.push(`./${pageKey}/logic.js`);
          itemsToCache.push(`./${pageKey}/`);
        }
        fetch(xmlUrl).then(response => {
          return response.text();
        }).then(xmlText => {
          cache.add(xmlUrl, xmlText).catch(err => {
            console.error('cache.add() for page content failed:', err);
          });
        }).catch(err => {
          console.error('fetch failed for ' + xmlUrl + ':', err);
        });
      });
      itemsToCache.map(itemToCache => {
        const itemUrl = `${itemToCache}`;
        fetch(itemUrl).then(response => {
          return response.text();
        }).then(itemText => {
          cache.add(itemUrl, itemText).catch(err => {
            console.error('cache.add() for ' + itemUrl + ' failed:', err);
          })
        }).catch(err => {
          console.error('fetch failed for ' + itemUrl + ':', err);
        })
      });
    }).catch(err => {
      console.error('caches.open() failed:', err);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(strCacheNames => {
      let strCachesToDelete = [];
      strCacheNames.map(strCacheName => {
        const startsWithName = strCacheName.startsWith(`${registration.scope}!`);
        const notEqualToName = strCacheName !== CACHE_NAME;
        const bothTrue = (startsWithName && notEqualToName);
        if (bothTrue) strCachesToDelete.push(strCacheName);
      });
      Promise.all(strCachesToDelete.map(item => {
        caches.open(item).then(deleteItem => {
          deleteItem.delete();
        });
      }))
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(async function() {
    const response = await caches.match(event.request);
    return response || fetch(event.request);
  }());
});