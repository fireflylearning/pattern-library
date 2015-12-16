'use strict';

var tabsModule = require('../../_lib/ff-tabs/ff-tabs-module');

var options = {};

module.exports = function(tabsValidator) {
    options.isComplete = tabsValidator.isComplete;
    options.canAdvance = tabsValidator.canAdvance;
    tabsModule(options);
};
