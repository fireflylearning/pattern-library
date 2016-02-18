'use strict';

$(function(){ 
	$("[data-ff-action='filter-toggler']").click(function(){
		var filterTogglerText = $("[data-ff='filter-content']").is(':visible') ? 'Filter this list' : 'Hide filters' ;
		
		$("[data-ff='filter-content']").toggle();
		$("[data-ff='filter-toggler-text']").text(filterTogglerText);

		$("[data-icon='filter-toggler-icon']").toggleClass("ff_icon-page-down-blue").toggleClass("ff_icon-page-forward-blue");

	});
});
