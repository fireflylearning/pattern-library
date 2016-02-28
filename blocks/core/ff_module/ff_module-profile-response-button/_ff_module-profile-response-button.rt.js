'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('button', {
        'type': 'button',
        'className': this.generateClass(this.props),
        'onClick': this.props.onSelect
    }, React.createElement('figure', { 'className': 'ff_module-profile-response-button__picture' }, React.createElement('img', {
        'className': 'ff_module-profile-response-button__image',
        'src': this.props.pic_href
    })), React.createElement('dl', { 'className': 'ff_module-profile-response-button__caption' }, React.createElement('dt', { 'className': 'ff_module-profile-response-button__label' }, this.props.label), React.createElement('dd', { 'className': 'ff_module-profile-response-button__status' }, this.props.status), this.props.markAndGrade ? React.createElement('dd', { 'className': 'ff_module-profile-response-button__mark-and-grade' }, this.renderGrade(this.props)) : null));
};