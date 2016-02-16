'use strict';

var tabsValidator = require('./_ff_module-tabs-control')();
var tabsView = require('./ff_module-tabs');

module.exports = function() {
    tabsView(tabsValidator, { completeCallback: function compTest(){ console.log('[Tabs patternlib] update complete');}});
};
