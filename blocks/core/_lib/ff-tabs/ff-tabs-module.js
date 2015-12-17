'use strict';

var $ = require('jquery');
var ffTabsCore = require('./_ff-tabs-core');

module.exports = function(options) {

    var __options = $.extend({}, ffTabsCore.defaultOptions, options);

    $(function() {
        console.log(__options.linkSelBase + ' activating', $(__options.root));

        $(__options.root).each(function(index, tab) {
            ffTabsCore.setClickHandler($(tab), __options);
        });

    });

};
