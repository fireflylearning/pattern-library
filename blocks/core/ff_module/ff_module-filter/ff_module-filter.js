'use strict';

$(function(){ 
	$(".ff_module-filter__heading").click(function(){
		var filterHeader = $(this),
		      filterIcon = filterHeader.children(".ff_module-filter__control").children(".ff_icon-arrow"),
		      filterContent = filterHeader.next();
		      
		filterIcon.toggleClass("ff_icon-arrow--closed");
		filterContent.slideToggle();
	});
});
