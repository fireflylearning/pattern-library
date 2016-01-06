"use strict";

var $ = require("jquery");

module.exports = function() {
    $(function() {
        $("[data-ff-action='filter-control']").click(function() {
            var filterDropdown = $(this),
                filterIcon = filterDropdown.find("[data-ff-icon-open]"),
                filterIconOpen = filterIcon.attr("data-ff-icon-open"),
                filterIconClosed = filterIcon.attr("data-ff-icon-closed"),
                filterContent = filterDropdown.closest("[data-ff='filter']").find("[data-ff='filter-content']");

            filterIcon.toggleClass(filterIconOpen + " " + filterIconClosed);
            filterContent.slideToggle(200);
        });
    });
};
