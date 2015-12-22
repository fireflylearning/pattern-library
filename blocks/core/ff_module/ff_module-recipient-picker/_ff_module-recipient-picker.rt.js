'use strict';
var React = require('react/addons');
var _ = require('lodash');
var RecipientGroup = require('../ff_module-form-box-group/_ff_module-form-box-group-view');
var RecipientMember = require('../ff_module-form-box-member/_ff_module-form-box-member-view');
function onExpand1(recipient, recipientIndex) {
    this.expandGroup(recipient);
}
function onDelete2(recipient, recipientIndex) {
    this.clearSelection(recipient);
}
function onDelete3(recipient, recipientIndex) {
    this.clearSelection(recipient);
}
function repeatRecipient4(recipient, recipientIndex) {
    return React.createElement('li', {
        'className': 'ff_module-recipient-picker-selected-list__item',
        'key': 'sel-' + recipient.guid
    }, recipient.type === 'groupprofile' ? React.createElement(RecipientGroup, {
        'guid': recipient.guid,
        'label': recipient.label,
        'onExpand': onExpand1.bind(this, recipient, recipientIndex),
        'onDelete': onDelete2.bind(this, recipient, recipientIndex)
    }) : null, recipient.type === 'profile' ? React.createElement(RecipientMember, {
        'guid': recipient.guid,
        'label': recipient.label,
        'onDelete': onDelete3.bind(this, recipient, recipientIndex)
    }) : null);
}
function onClick5(result, resultIndex) {
    this.addRecipient(result);
}
function repeatResult6(result, resultIndex) {
    return React.createElement('li', {
        'className': 'ff_module-recipient-button-list__item',
        'key': 'res-' + result.guid
    }, React.createElement('button', {
        'type': 'button',
        'className': 'ff_module-profile-picture-and-name-button',
        'data-guid': result.guid,
        'onClick': onClick5.bind(this, result, resultIndex)
    }, React.createElement('figure', { 'className': 'ff_module-profile-picture-and-name-button__picture' }, React.createElement('img', {
        'className': 'ff_module-profile-picture-and-name-button__image',
        'src': result.pic_href
    })), React.createElement('span', {
        'className': 'ff_module-profile-picture-and-name-button__title',
        'href': '#'
    }, result.label)));
}
module.exports = function () {
    return React.createElement('div', { 'className': 'ff_module-recipient-picker' }, React.createElement('div', { 'className': 'ff_module-recipient-picker__main' }, React.createElement.apply(this, [
        'ul',
        { 'className': 'ff_module-recipient-picker-selected-list' },
        _.map(this.state.selected, repeatRecipient4.bind(this))
    ]), React.createElement('input', {
        'className': 'ff_module-recipient-picker__input ff_module-form-input ff_module-form-input--invisible',
        'name': 'recipient-picker-query',
        'onChange': this.handleInputChange
    })), React.createElement('div', { 'className': 'ff_module-recipient-picker__selectable' + (this.state.isActive ? ' ff_module-recipient-picker__selectable--is-active' : '') }, this.state.hasResults === true ? React.createElement.apply(this, [
        'ul',
        { 'className': 'ff_module-recipient-button-list' },
        _.map(this.state.results, repeatResult6.bind(this))
    ]) : null, this.state.hasResults === false ? React.createElement('p', {}, 'No results available') : null));
};