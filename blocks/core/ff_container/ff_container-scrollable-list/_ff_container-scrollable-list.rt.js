'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('table', { 'className': 'ff_container-scrollable-list' }, React.createElement('tbody', {}, React.createElement('tr', { 'className': 'ff_container-scrollable-list__row' }, React.createElement('td', { 'className': 'ff_container-scrollable-list__cell ff_container-scrollable-list__cell--sidebar' }, '\n            ', this.props.sidebar, '\n            '), React.createElement('td', { 'className': 'ff_container-scrollable-list__cell ff_container-scrollable-list__cell--main' }, '\n            ', this.props.main, '\n            '))));
};