'use strict';
var React = require('react/addons');
var _ = require('lodash');
function repeatRecipient1(recipient, recipientIndex) {
    return React.createElement('li', { 'className': 'ff_module-recipient-picker-selected-list__item' }, React.createElement('div', {
        'className': 'ff_module-form-box-member',
        'id': recipient.guid
    }, React.createElement('button', {
        'className': 'ff_module-form-box-member__edit',
        'data-edit': recipient.guid,
        'type': 'button'
    }, React.createElement('span', { 'className': 'ff_icon ff_icon-edit-input-box' })), React.createElement('span', { 'className': 'ff_module-form-box-member__label' }, recipient.label), React.createElement('button', {
        'className': 'ff_module-form-box-member__delete',
        'data-delete': recipient.guid,
        'type': 'button'
    }, React.createElement('span', { 'className': 'ff_icon ff_icon-delete' }))));
}
function onClick2(result, resultIndex) {
    this.select(result);
}
function repeatResult3(result, resultIndex) {
    return React.createElement('li', { 'className': 'ff_module-recipient-button-list__item' }, React.createElement('button', {
        'type': 'button',
        'className': 'ff_module-profile-picture-and-name-button',
        'data-guid': result.guid,
        'onClick': onClick2.bind(this, result, resultIndex)
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
        _.map(this.state.selected, repeatRecipient1.bind(this))
    ]), React.createElement('input', {
        'className': 'ff_module-recipient-picker__input ff_module-form-input ff_module-form-input--invisible',
        'name': 'recipient-picker-query',
        'onChange': this.handleInputChange
    })), React.createElement('div', { 'className': 'ff_module-recipient-picker__selectable' }, React.createElement.apply(this, [
        'ul',
        { 'className': 'ff_module-recipient-button-list' },
        _.map(this.state.results, repeatResult3.bind(this))
    ])));
};