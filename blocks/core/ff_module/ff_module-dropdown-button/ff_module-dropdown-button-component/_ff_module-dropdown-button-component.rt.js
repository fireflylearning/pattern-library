'use strict';
var React = require('react/addons');
var _ = require('lodash');
var Button = require('../../ff_module-button/ff_module-button.js');
function repeatItem1(item, itemIndex) {
    return React.createElement('li', { 'key': itemIndex }, item.href && !item.onClick ? React.createElement('a', {
        'href': item.href,
        'className': 'ff_module-dropdown-button__link'
    }, item.text) : null, item.onClick && !item.href ? React.createElement(Button, {
        'modifier': item.modifier ? item.modifier : 'link',
        'onClick': item.onClick,
        'text': item.text
    }) : null);
}
module.exports = function () {
    return React.createElement('div', {
        'className': 'this.generateClass(\'ff_module-dropdown-button\', this.props)',
        'data-ff-dropdown-target': this.props.id
    }, !this.props.isDisabled ? React.createElement('button', {
        'type': 'button',
        'className': _.keys(_.pick(this.generateClass('ff_module-dropdown-button__button', this.props), _.identity)).join(' '),
        'data-ff-dropdown-trigger': this.props.id
    }, React.createElement('span', { 'className': 'ff_module-dropdown-button__content' }, this.props.text), React.createElement('span', {
        'className': _.keys(_.pick(this.generateClass('ff_module-dropdown-button__icon', this.props), _.identity)).join(' '),
        'data-ff-dropdown-target': this.props.id
    })) : null, this.props.isDisabled ? React.createElement('button', {
        'type': 'button',
        'className': _.keys(_.pick(this.generateClass('ff_module-dropdown-button__button', this.props), _.identity)).join(' '),
        'disabled': 'true'
    }, React.createElement('span', { 'className': 'ff_module-dropdown-button__content' }, this.props.text), React.createElement('span', { 'className': _.keys(_.pick(this.generateClass('ff_module-dropdown-button__icon', this.props), _.identity)).join(' ') })) : null, !this.props.isDisabled && this.props.list.length ? React.createElement('div', {
        'className': _.keys(_.pick(this.generateClass('ff_module-dropdown-button__list-container', this.props), _.identity)).join(' '),
        'data-ff-dropdown-target': this.props.id
    }, React.createElement.apply(this, [
        'ul',
        { 'className': 'ff_module-dropdown-button__list' },
        _.map(this.props.list, repeatItem1.bind(this))
    ])) : null);
};