'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('div', { 'className': 'ff_container-scrollable-list' }, React.createElement('div', { 'className': 'ff_container-scrollable-list__item ff_container-scrollable-list__item--sidebar' }, this.props.sidebar), React.createElement('div', { 'className': 'ff_container-scrollable-list__item ff_container-scrollable-list__item--main' }, this.props.main));
};