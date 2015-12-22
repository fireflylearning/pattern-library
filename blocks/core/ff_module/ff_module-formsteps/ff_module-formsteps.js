'use strict';

var $ = require('jquery');
var createFormSteps = require('../../_lib/ff-tabs/ff-tabs-module');

var options = {
    linkSelBase: 'data-ff-formsteps-target',
    contentSelBase: 'data-ff-formsteps-content',
    activeClassSuffix: '--is-current',
    defaultLinkClass: 'ff_module-formstep',
    defaultContentClass: 'ff_container-formstep-content',
};

module.exports = function(stepsValidator) {
    options.isComplete = stepsValidator && stepsValidator.isComplete;
    options.canAdvance = stepsValidator && stepsValidator.canAdvance;
    var formStepsHandler = createFormSteps(options);

    $(function() {
        formStepsHandler.init();
        // formStepsHandler.(next | last)
    });
};
