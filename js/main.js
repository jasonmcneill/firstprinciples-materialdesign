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
						fp.poll = allSet;
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

	checkLang: function(){
		localforage.getItem("lang").then(function(lang){
			if(!lang) fp.showView("chooseLang");
		});
	},

	showView: function(view){
		window.location.hash = view;
	},

	init: function(){
		fp.pollInitial();
		fp.events.attachEvents();
		fp.checkLang();
	}

};

fp.init();