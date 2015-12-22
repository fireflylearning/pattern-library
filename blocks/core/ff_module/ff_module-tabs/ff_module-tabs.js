'use strict';

var $ = require('jquery');
var createTabsModule = require('../../_lib/ff-tabs/ff-tabs-module');

var options = {};

module.exports = function(tabsValidator) {
    options.isComplete = tabsValidator && tabsValidator.isComplete;
    options.canAdvance = tabsValidator && tabsValidator.canAdvance;
    var tabsHandler = createTabsModule(options);

    $(function() {
        tabsHandler.init();
        // tabsHandler.(next | last)
    });
};
