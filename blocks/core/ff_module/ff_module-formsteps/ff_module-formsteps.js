'use strict';

var tabsModule = require('../../_lib/ff-tabs/ff-tabs-module');

var options = {
    linkSelBase: 'data-ff-formsteps-target',
    contentSelBase: 'data-ff-formsteps-content',
    activeClassSuffix: '--is-current',
    defaultLinkClass: 'ff_module-formstep',
    defaultContentClass: 'ff_container-formstep-content',
};

module.exports = function(stepsValidator) {
    options.isComplete = stepsValidator.isComplete;
    options.canAdvance = stepsValidator.canAdvance;
    tabsModule(options);
};