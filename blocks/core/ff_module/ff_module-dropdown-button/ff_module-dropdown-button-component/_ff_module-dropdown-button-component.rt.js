'use strict';
var React = require('react/addons');
var _ = require('lodash');
function repeatItem1(item, itemIndex) {
    return React.createElement('li', { 'key': itemIndex }, React.createElement('a', {
        'href': item.href,
        'className': 'ff_module-dropdown-button__link'
    }, item.text));
}
module.exports = function () {
    return React.createElement('div', {
        'className': _.keys(_.pick(this.generateClass('ff_module-dropdown-button', this.props), _.identity)).join(' '),
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
    }, React.createElement('span', { 'className': 'ff_module-dropdown-button__content' }, this.props.text), React.createElement('span', { 'className': _.keys(_.pick(this.generateClass('ff_module-dropdown-button__icon', this.props), _.identity)).join(' ') })) : null, !this.props.isDisabled ? React.createElement('div', {
        'className': _.keys(_.pick(this.generateClass('ff_module-dropdown-button__list-container', this.props), _.identity)).join(' '),
        'data-ff-dropdown-target': this.props.id
    }, React.createElement.apply(this, [
        'ul',
        { 'className': 'ff_module-dropdown-button__list' },
        _.map(this.props.list, repeatItem1.bind(this))
    ])) : null);
};