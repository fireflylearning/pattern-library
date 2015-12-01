'use strict';

$(function(){ 
	$("[data-ff-action='filter-control']").click(function(){
		var filterDropdown = $(this),
		      filterIcon = filterDropdown.find("[data-ff-icon='filter-dropdown-icon']"),
		      filterContent = filterDropdown.closest("[data-ff='filter']").find("[data-ff='filter-content']");
		      
		filterIcon.toggleClass("ff_icon-arrow--closed");
		filterContent.slideToggle(200);
	});
});
