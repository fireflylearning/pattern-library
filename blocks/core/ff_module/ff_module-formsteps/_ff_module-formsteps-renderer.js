'use strict';

var stepsValidator = require('./_ff_module-formsteps-control')();
var stepsView = require('./ff_module-formsteps');

module.exports = function() {
    stepsView(stepsValidator);
};
