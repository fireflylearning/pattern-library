'use strict';

var $ = require('jquery');
var createTabsModule = require('../../_lib/ff-tabs/ff-tabs-module');


var options = {
    visitedCallback: function visitedCallback($lastLinks, $lastContent, $selectedLinks, $selectedContent) {
        console.log($lastLinks, ' was visited');
    },
    completeCallback: function completeCallback($lastLinks, $lastContent, $selectedLinks, $selectedContent) {
        console.log($lastLinks, ' was completed');
    }
};

module.exports = function(tabsValidator) {
    options.isComplete = tabsValidator && tabsValidator.isComplete;
    options.canAdvance = tabsValidator && tabsValidator.canAdvance;
    var tabsHandler = createTabsModule(options);

    $(function() {
        tabsHandler.init();
        // tabsHandler.(next | previous)
    });
    return tabsHandler;
};
