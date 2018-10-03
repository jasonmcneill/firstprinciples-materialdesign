const fp = {

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
			if(!poll){
				$.get("/js/poll.json").then(function(data){
					localforage.setItem("poll", data).then(function(allSet){
						fp.poll = JSON.parse(allSet);
					});
				});
			} else {
				fp.poll = poll;
				console.log(fp.poll);
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
