'use strict';
var React = require('react/addons');
var _ = require('lodash');
var Button = require('../../ff_module-button/ff_module-button.js');
function repeatItem1(item, itemIndex) {
    return React.createElement('li', { 'key': itemIndex }, item.href ? React.createElement('a', {
        'href': item.href,
        'className': 'ff_module-dropdown-button__link'
    }, item.text) : null, !item.href ? React.createElement(Button, {
        'modifier': item.modifier ? item.modifier : 'link',
        'onClick': item.onClick,
        'text': item.text
    }) : null);
}
module.exports = function () {
    return React.createElement('div', {
        'ref': this.bindRef,
        'className': this.generateClass('ff_module-dropdown-button'),
        'data-ff_module-dropdown-button-rt-target': this.getDataAttrId()
    }, !this.props.isDisabled ? React.createElement('button', {
        'type': 'button',
        'className': this.generateClass('ff_module-dropdown-button__button'),
        'data-ff_module-dropdown-button-rt-trigger': this.getDataAttrId()
    }, React.createElement('span', { 'className': 'ff_module-dropdown-button__content' }, this.props.text), React.createElement('span', {
        'className': this.generateClass('ff_module-dropdown-button__icon'),
        'data-ff_module-dropdown-button-rt-target': this.getDataAttrId()
    })) : null, this.props.isDisabled ? React.createElement('button', {
        'type': 'button',
        'className': this.generateClass('ff_module-dropdown-button__button'),
        'disabled': 'true'
    }, React.createElement('span', { 'className': 'ff_module-dropdown-button__content' }, this.props.text), React.createElement('span', { 'className': this.generateClass('ff_module-dropdown-button__icon') })) : null, !this.props.isDisabled && this.props.list.length ? React.createElement('div', {
        'className': this.generateClass('ff_module-dropdown-button__list-container'),
        'data-ff_module-dropdown-button-rt-target': this.getDataAttrId()
    }, React.createElement.apply(this, [
        'ul',
        { 'className': 'ff_module-dropdown-button__list' },
        _.map(this.props.list, repeatItem1.bind(this))
    ])) : null);
};