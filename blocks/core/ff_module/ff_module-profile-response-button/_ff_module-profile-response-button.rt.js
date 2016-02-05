'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('button', {
        'type': 'button',
        'className': 'ff_module-profile-response-button' + (this.props.isSelected ? ' ff_module-profile-response-button--is-selected' : ''),
        'data-guid': this.props.guid,
        'onClick': this.props.onSelect,
        'disabled': this.props.isSelected
    }, React.createElement('figure', { 'className': 'ff_module-profile-response-button__picture' }, React.createElement('img', {
        'className': 'ff_module-profile-response-button__image',
        'src': this.props.pic_href
    })), React.createElement('span', {
        'className': 'ff_module-profile-response-button__title',
        'href': '#'
    }, this.props.label));
};