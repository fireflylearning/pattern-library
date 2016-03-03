'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('div', { 'className': 'ff_container-overlay' + (this.props.modifier ? ' ff_container-overlay--' + this.props.modifier : '') + (this.props.classes ? ' ' + this.props.classes : '') }, React.createElement('div', { 'className': 'ff_container-overlay__body' }, this.props.body), React.createElement('div', { 'className': 'ff_container-overlay__bar' }, React.createElement('div', { 'className': 'ff_container-overlay__bar-content' }, this.props.bar)));
};