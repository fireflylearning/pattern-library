'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('button', {
        'type': 'button',
        'className': 'ff_module-profile-response-button' + (this.props.uiState ? ' ff_module-profile-response-button--' + this.props.uiState : ''),
        'data-guid': this.props.guid,
        'onClick': this.props.onSelect
    }, React.createElement('figure', { 'className': 'ff_module-profile-response-button__picture' }, React.createElement('img', {
        'className': 'ff_module-profile-response-button__image',
        'src': this.props.pic_href
    })), React.createElement('div', { 'className': 'ff_module-profile-response-button__caption' }, React.createElement('span', { 'className': 'ff_module-profile-response-button__label' }, this.props.label), React.createElement('span', { 'className': 'ff_module-profile-response-button__status' }, this.props.status), React.createElement('span', { 'className': 'ff_module-profile-response-button__mark' }, this.props.mark)));
};