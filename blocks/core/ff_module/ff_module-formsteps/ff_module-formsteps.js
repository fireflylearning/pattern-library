'use strict';

var $ = require('jquery');
var createFormSteps = require('../../_lib/ff-tabs/ff-tabs-module');

var _options = {
    linkSelBase: 'data-ff-formsteps-trigger',
    contentSelBase: 'data-ff-formsteps-target',
    activeClassSuffix: '--is-current',
    defaultLinkClass: 'ff_module-formstep',
    defaultContentClass: 'ff_container-formstep-content',
};

module.exports = function(stepsValidator, options) {

    options = $.extend({}, _options, options, stepsValidator);

    var formStepsHandler = createFormSteps(options);

    $(function() {
        formStepsHandler.init();
        // formStepsHandler.(next | previous)
    });
    return formStepsHandler;
};

