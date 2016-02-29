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

		var isHidden = $expandableContent.hasClass("ff_container-expandable__content--hidden");
		var newText = isHidden ? $expandedText : $collapsedText;

		if (isHidden) {
			$expandableContent.removeClass("ff_container-expandable__content--hidden");
			$expandableIcon.removeClass($collapsedIcon).addClass($expandedIcon);
		} else {
			$expandableContent.addClass("ff_container-expandable__content--hidden");
			$expandableIcon.removeClass($expandedIcon).addClass($collapsedIcon);
		}
		$expandableText.text(newText);
	});
});
