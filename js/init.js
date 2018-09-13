(function($, M){

	$(function(){

		$('.sidenav').sidenav();
		$('.dropdown-trigger').dropdown();
		$('.collapsible').collapsible();
		$('.collapsible-header').on("click", function(evt){
			var theIcon = $(evt.target).find(".material-icons").text();
			if(theIcon === "keyboard_arrow_right") {
				$(evt.target).find(".material-icons").text("keyboard_arrow_down");
			} else if(theIcon === "keyboard_arrow_down") {
				$(evt.target).find(".material-icons").text("keyboard_arrow_right");
			}
		});

	});

})(jQuery, M);
