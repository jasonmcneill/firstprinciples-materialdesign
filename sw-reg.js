if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js').then(registration => {
		console.log('Registered First Principles global service worker');
	}).catch(error => {
		console.error('Error in registering First Principles global service worker:', error);
	});
}