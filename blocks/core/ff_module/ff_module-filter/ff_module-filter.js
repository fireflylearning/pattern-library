'use strict';

$(function(){ 
	$(".ff_module-filter__label").click(function(){
		var filterLabel = $(this),
		      filterIcon = filterLabel.children(".ff_icon-arrow"),
		      filterContent = filterLabel.next();
		filterIcon.toggleClass("ff_icon-arrow--closed");
		filterContent.slideToggle();
	});
});
