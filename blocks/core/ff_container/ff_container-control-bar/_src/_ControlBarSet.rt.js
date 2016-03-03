'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('div', { 'className': 'ff_container-control-bar__group' }, this.props.title ? React.createElement('h3', { 'className': 'ff_container-control-bar__title' }, this.props.title) : null, this.props.children);
};