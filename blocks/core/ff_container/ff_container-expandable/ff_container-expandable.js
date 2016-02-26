'use strict';

$(function(){ 
	$("[data-ff-action='expandable']").click(function(){
		var $expandableContent = $("[data-ff='expandable-content']"),
		$expandableIcon = $("[data-icon='expandable-icon']"),
		$expandableText = $("[data-ff='expandable-text']");
		
		var $expandedText = $expandableText.attr("data-expanded-text"),
		$collapsedText = $expandableText.attr("data-collapsed-text"),
		$collapsedIcon = $expandableIcon.attr("data-collapsed-icon"),
		$expandedIcon = $expandableIcon.attr("data-expanded-icon");

		var isVisible = $expandableContent.is(":visible");
		var newText = isVisible ? $collapsedText : $expandedText;

		if (isVisible) {
			$expandableContent.hide();
			$expandableIcon.removeClass($expandedIcon).addClass($collapsedIcon);
		} else {
			$expandableContent.show();
			$expandableIcon.removeClass($collapsedIcon).addClass($expandedIcon);
		}
		$expandableText.text(newText);

	});
});
