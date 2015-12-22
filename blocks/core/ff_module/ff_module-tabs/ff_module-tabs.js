'use strict';

var $ = require('jquery');
var createTabsModule = require('../../_lib/ff-tabs/ff-tabs-module');

module.exports = function(tabsValidator, options) {
    options = $.extend({}, options, tabsValidator);

    var tabsHandler = createTabsModule(options);

    $(function() {
        tabsHandler.init();
        // tabsHandler.(next | previous)
    });
    return tabsHandler;
};
