const CACHE = 'fp_v1';

self.addEventListener('fetch', function(event){
	event.respondWith(
		fetch(event.request).catch(function(){
			return caches.match('./index-offline.html');
		})
	);
});

self.addEventListener('install', function(event){
	const filesToCache = [];
	const keys = fetch('./keys.json').then(function(response){
		return response.json();
	}).then(function(keys){
		filesToCache.push('./keys.json');
		keys.pages.map(function(item){
			if (item.key === 'dashboard') {
				filesToCache.push('./index.html');
				filesToCache.push(`./${item.key}/content.xml`);
				filesToCache.push(`./${item.key}/logic.js`);
			} else {
				filesToCache.push(`./${item.key}/content.xml`);
				filesToCache.push(`./${item.key}/index.html`);
				filesToCache.push(`./${item.key}/logic.js`);
			}
		});
		keys.scriptures.map(function(item){
			filesToCache.push(`./scriptures/${item.key}/content.xml`);
		});
		filesToCache.push('../../img/body.png');
		filesToCache.push('../../js/jquery-2.1.1.min.js');
		filesToCache.push('../../js/localforage.min.js');
		filesToCache.push('../../js/materialize.min.js');
		filesToCache.push('../../js/fp/base.js');
		filesToCache.push('../../js/fp/language.js');
		filesToCache.push('../../js/fp/scripture.js');
		filesToCache.push('../../css/light-darkness.css');
		filesToCache.push('../../css/materialize.min.css');
		filesToCache.push('../../css/style.css');
		filesToCache.push('../../css/the-church.css');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/all.min.css');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/js/all.min.js');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/metadata/icons.json');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/metadata/shims.json');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.eot');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.svg');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.ttf');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.woff');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/webfonts/fa-brands-400.woff2');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.eot');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.svg');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.ttf');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.woff');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/webfonts/fa-regular-400.woff2');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.eot');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.svg');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.ttf');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.woff');
		filesToCache.push('../../css/fontawesome-free-5.5.0-web/webfonts/fa-solid-900.woff2');
	});
	event.waitUntil(
		caches.open(CACHE).then(function(cache){
			console.log('Trying to add to cache:', filesToCache);
			return cache.addAll(filesToCache).catch(function(err){
				console.error(err);
			});
		})
	);
});