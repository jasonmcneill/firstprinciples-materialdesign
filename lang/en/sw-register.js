if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js').then(function(registration){
		// console.log('Service Worker registered with scope:', registration.scope);
	}).catch(function(err){
		console.error('Service Worker registration failed:', err);
	});
}