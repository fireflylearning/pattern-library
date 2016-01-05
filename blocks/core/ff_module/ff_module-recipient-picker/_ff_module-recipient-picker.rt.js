'use strict';
var React = require('react/addons');
var _ = require('lodash');
var RecipientGroup = require('../ff_module-form-box-group/_ff_module-form-box-group-view');
var RecipientMember = require('../ff_module-form-box-member/_ff_module-form-box-member-view');
var ResultButton = require('../ff_module-profile-picture-and-name-button/_ff_module-profile-picture-and-name-button-view');
function onExpand1(recipient, recipientIndex) {
    this.expandGroup(recipient.guid);
}
function onDelete2(recipient, recipientIndex) {
    this.clearSelection(recipient.guid);
}
function onDelete3(recipient, recipientIndex) {
    this.clearSelection(recipient.guid);
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
function onSelect5(result, resultIndex) {
    this.addRecipient(result.guid);
}
function repeatResult6(result, resultIndex) {
    return React.createElement('li', {
        'className': 'ff_module-recipient-button-list__item',
        'key': 'res-' + result.guid
    }, React.createElement(ResultButton, {
        'guid': result.guid,
        'label': result.label,
        'pic_href': result.pic_href,
        'isSelected': this.checkIsSelected(result.guid, this.state.selected),
        'onSelect': onSelect5.bind(this, result, resultIndex)
    }));
}
module.exports = function () {
    return React.createElement('div', {
        'className': 'ff_module-recipient-picker',
        'onClick': this.dropdownClickHandler
    }, React.createElement('div', { 'className': 'ff_module-recipient-picker__main' }, React.createElement.apply(this, [
        'ul',
        { 'className': 'ff_module-recipient-picker-selected-list' },
        _.map(this.state.selected, repeatRecipient4.bind(this))
    ]), React.createElement('input', {
        'className': 'ff_module-recipient-picker__input ff_module-form-input ff_module-form-input--invisible',
        'name': 'recipient-picker-query',
        'onChange': this.handleInputChange,
        'onClick': this.triggerClickHandler
    })), React.createElement('div', { 'className': 'ff_module-recipient-picker__selectable' + (this.state.isActive ? ' ff_module-recipient-picker__selectable--is-active' : '') }, this.state.hasResults === true ? React.createElement.apply(this, [
        'ul',
        { 'className': 'ff_module-recipient-button-list' },
        _.map(this.state.results, repeatResult6.bind(this))
    ]) : null, this.state.hasResults === false ? React.createElement('p', {}, 'No results available') : null));
};