'use strict';

$(function(){ 
	$("[data-ff-action='expandable']").click(function(){
		var $expandableContent = $("[data-ff='expandable-content']"),
		$expandableIcon = $("[data-icon='expandable-icon']"),
		$expandableText = $("[data-ff='expandable-text']");
		
		var $expandableOpenText = $expandableText.attr("data-open-text"),
		$expandableClosedText = $expandableText.attr("data-closed-text");

		var isVisible = $expandableContent.is(":visible");
		var newText = isVisible ? $expandableClosedText : $expandableOpenText;

		if (isVisible) {
			$expandableContent.hide();
			$expandableIcon.removeClass("ff_icon-page-up-open-blue").addClass("ff_icon-page-down-open-blue");
		} else {
			$expandableContent.show();
			$expandableIcon.removeClass("ff_icon-page-up-open-blue").addClass("ff_icon-page-up-open-blue");
		}
		$expandableText.text(newText);

	});
});
