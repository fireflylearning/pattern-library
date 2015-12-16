'use strict';

var $ = require('jquery');
var ffTabsCore = require('./_ff-tabs-core');

module.exports = function() {

    $.fn.ffTabs = function(options) {
        var __options = $.extend({}, ffTabsCore.defaultOptions, options);

        console.log('ffTabs', this);
        $(this).each(function(index, tab) {
            ffTabsCore.setClickHandler($(tab), __options);
        });

        return this;

    };

};
