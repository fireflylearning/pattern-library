'use strict';

var $ = require('jquery');

module.exports = function expandableComponent(element) {
	var $expandable = element ? $(element) : $("[data-ff='expandable']");
	
	$expandable.addClass("ff_container-expandable--is-collapsed ");
	
	$expandable.find("[data-ff-action='expandable-dropdown']").click(function(){
		var $this = $(this);
		var $expandableIcon = $("[data-icon='expandable-icon']", $this),
		$expandableText = $("[data-ff='expandable-text']", $this);
		
		var $expandedText = $expandableText.attr("data-expanded-text"),
		$collapsedText = $expandableText.attr("data-collapsed-text"),
		$collapsedIcon = $expandableIcon.attr("data-collapsed-icon"),
		$expandedIcon = $expandableIcon.attr("data-expanded-icon");

		var isCollapsed = $expandable.hasClass("ff_container-expandable--is-collapsed");

		var newText = isCollapsed ? $expandedText : $collapsedText;

		if (isCollapsed) {
			$expandable.removeClass("ff_container-expandable--is-collapsed");
			$expandableIcon.removeClass($collapsedIcon).addClass($expandedIcon);
		} else {
			$expandable.addClass("ff_container-expandable--is-collapsed");
			$expandableIcon.removeClass($expandedIcon).addClass($collapsedIcon);
		}
		$expandableText.text(newText);
	});
};
