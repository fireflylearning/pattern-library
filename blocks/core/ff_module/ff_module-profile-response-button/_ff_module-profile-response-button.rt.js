'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('button', {
        'type': 'button',
        'className': this.generateClass('ff_module-profile-response-button'),
        'onClick': this.props.onSelect
    }, React.createElement('figure', { 'className': 'ff_module-profile-response-button__picture' }, React.createElement('img', {
        'className': 'ff_module-profile-response-button__image',
        'src': this.props.pic_href
    })), React.createElement('dl', { 'className': 'ff_module-profile-response-button__caption' }, React.createElement('dt', { 'className': 'ff_module-profile-response-button__label' }, this.props.label), this.props.event ? React.createElement('dd', { 'className': 'ff_module-profile-response-button__status' }, React.createElement('span', { 'className': 'ff_module-profile-response-button__status-text' }, this.renderStatus()), React.createElement('time', {
        'dateTime': this.props.event.sent,
        'className': 'ff_module-profile-response-button__status-sent'
    }, ' ', this.renderTime())) : null, this.props.markAndGrade ? React.createElement('dd', { 'className': 'ff_module-profile-response-button__mark-and-grade' }, this.renderMarkAndGrade()) : null));
};