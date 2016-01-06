'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('button', { 'onClick': this.onClick }, 'Create group from selection');
};