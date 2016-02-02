'use strict';
var React = require('react/addons');
var _ = require('lodash');
var RecipientGroup = require('../../ff_module-form-box-group/_ff_module-form-box-group-view');
var RecipientMember = require('../../ff_module-form-box-member/_ff_module-form-box-member-view');
var RecipientButtonList = require('../ff_module-recipient-button-list/ff_module-recipient-button-list-component/_ff_module-recipient-button-list-component-viewsimple.js');
function onExpand1(recipient, recipientIndex) {
    this.expandGroup(recipient.guid);
}
function onDelete2(recipient, recipientIndex) {
    this.removeRecipientFromSelection(recipient.guid);
}
function onDelete3(recipient, recipientIndex) {
    this.removeRecipientFromSelection(recipient.guid);
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
module.exports = function () {
    return React.createElement('div', {
        'className': 'ff_module-recipient-picker',
        'onClick': this.stopEventPropagation
    }, React.createElement('div', {
        'className': 'ff_module-recipient-picker__main',
        'onClick': this.resetInput
    }, React.createElement.apply(this, [
        'ul',
        {
            'className': 'ff_module-recipient-picker-selected-list',
            'onClick': this.stopEventPropagation
        },
        _.map(this.state.selected, repeatRecipient4.bind(this))
    ]), React.createElement('input', {
        'className': 'ff_module-recipient-picker__input ff_module-form-input ff_module-form-input--invisible',
        'name': 'recipient-picker-query',
        'onChange': this.handleInputChange,
        'onClick': this.triggerClickHandler,
        'ref': function (ref) {
            //console.log(ref); TODO: Investigate why sometimes null
            if (!ref)
                return;
            this.textInput = ref.getDOMNode();
        }.bind(this)
    })), React.createElement('div', { 'className': 'ff_module-recipient-picker__selectable' + (this.state.isActive ? ' ff_module-recipient-picker__selectable--is-active' : '') }, this.state.hasResults === true ? React.createElement(RecipientButtonList, {
        'results': this.state.results,
        'isSelected': this.checkIsSelected,
        'onSelect': this.addRecipientByResultId
    }) : null, this.state.hasResults === false ? React.createElement('p', {}, 'No results available') : null));
};