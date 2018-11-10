const fp = {
	
	lang: {
		default: 'en',
		available: ['en']
	},

	setManifest: function(){
		var lang, manifest;
		navigator.languages ? lang = navigator.languages[0] : lang = navigator.browserLanguage;
		lang = lang.substr(0,2);
		if (fp.lang.langsAvailable.indexOf(lang) <= -1) lang = fp.lang.langDefault;
		manifest = document.createElement('link');
		manifest.rel = 'manifest';
		manifest.href = '/manifest-' + lang + '.json';
		document.head.appendChild(manifest);
	},
	
	getBaseUrl: function(){
		var baseUrl = "http://usd21.org/m/";
		if(location.host === "localhost") baseUrl = "http://localhost:" + location.port + "/";
		if(location.host === "staging.usd21.org") baseUrl = "http://staging.usd21.org/fp/";
		return baseUrl;
	},

	events: {
		onHashChange: function(evt){
			window.addEventListener("hashchange", function(){
				fp.showView(window.location.hash);
			}, false);
		},
		attachEvents: function(){
			fp.events.onHashChange();
		}
	},

	poll: {},

	pollInitial: function(){
		localforage.getItem("poll").then(function(poll){
			var baseUrl = getBaseUrl();
			var pollingUrl = baseUrl + "js/poll.json";
			if(!poll){
				$.get(pollingUrl).then(function(data){
					localforage.setItem("poll", data).then(function(allSet){
						fp.poll = JSON.parse(allSet);
					});
				});
			} else {
				fp.poll = poll;
			}
		})
	},

	pollServer: function(){
	},
	
	detectLang: function(){
		var lang = navigator.language || navigator.browserLanguage;
		lang = lang.substring(0,2);
		lang = lang.toLowerCase();
		if(! lang.length === 2) return;
		localforage.setItem("lang", lang).then(function(lang){
			return lang;
		});
	},

	checkLang: function(){
		localforage.getItem("lang").then(function(lang){
			if(!lang) fp.showView("chooseLang");
		});
	},

	showView: function(view){
		window.location.hash = view;
	},

	init: function(){
		fp.detectLang();
		fp.pollInitial();
		fp.checkLang();
		fp.events.attachEvents();
	}

};

fp.init();
