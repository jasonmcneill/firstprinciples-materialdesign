if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js').then(async registration => {
		const keys = await fetch('./keys.json').then(response => {
			return response.json();
		});
		console.log(`Registered First Principles ${keys.lang} service worker.`);
	}).catch((error, keys) => {
		console.error(`Error in registering First Principles ${keys.lang} service worker:`, error);
	});
}