'use strict';

$(function(){ 
	$("[data-control='filter-dropdown']").click(function(){
		var filterDropdown = $(this),
		      filterIcon = filterDropdown.find("[data-icon='filter-dropdown-icon']"),
		      filterContent = $("[data-content='filter-content']");
		      
		filterIcon.toggleClass("ff_icon-arrow--closed");
		filterContent.slideToggle();
	});
});
