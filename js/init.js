(function($, M){

	$(function(){

		var resetSidenav = function(domObj) {
			$('#slide-out .collapsible').collapsible('close');
		};

		$('.dropdown-trigger').dropdown();
		
		$('.sidenav').sidenav({
			edge: 'right',
			onCloseStart: function(domObj) {
				resetSidenav(domObj);
			}
		});

		$('#slide-out .collapsible').collapsible({
			onOpenStart: function(domObj) {
				$(domObj).find(".collapsible-header > .material-icons").text("keyboard_arrow_down");
			},
			onCloseEnd: function(domObj) {
				$(domObj).find(".collapsible-header > .material-icons").text("keyboard_arrow_right");
			}
		});

	});

})(jQuery, M);
