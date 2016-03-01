'use strict';

$(function(){ 
	$("[data-ff-action='filter-toggler']").click(function(){
		var $filterContent = $("[data-ff='filter-content']"),
		$filterIcon = $("[data-icon='filter-toggler-icon']"),
		$filterTogglerText = $("[data-ff='filter-toggler-text']");

		var isVisible = $filterContent.is(":visible");
		var newText = isVisible ? 'Filter this list' : 'Hide filters' ;

		if (isVisible) {
			$filterContent.hide();
			$filterIcon.removeClass("ff_icon-page-up-open-blue").addClass("ff_icon-page-down-open-blue");
		} else {
			$filterContent.show();
			$filterIcon.removeClass("ff_icon-page-up-open-blue").addClass("ff_icon-page-down-open-blue");
		}
		$filterTogglerText.text(newText);

	});
});
