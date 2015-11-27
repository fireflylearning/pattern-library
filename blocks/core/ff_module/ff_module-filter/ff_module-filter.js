'use strict';

$(function(){ 
	$("[data-control='filter-dropdown']").click(function(){
		var filterDropdown = $(this),
		      filterIcon = filterDropdown.find("[data-icon='filter-dropdown-icon']"),
		      filterContent = filterDropdown.next();
		      
		filterIcon.toggleClass("ff_icon-arrow--closed");
		filterContent.slideToggle();
	});
});
