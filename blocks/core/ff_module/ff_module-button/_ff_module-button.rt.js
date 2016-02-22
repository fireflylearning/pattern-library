'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('button', {
        'type': 'button',
        'title': this.props.text,
        'id': this.props.id,
        'disabled': this.props.disabled,
        'className': 'ff_module-button' + (this.props.modifier ? ' ff_module-button--' + this.props.modifier : '') + (this.props.classes ? ' ' + this.props.classes : '') + (this.props.disabled ? ' ff_module-button--is-disabled' : ''),
        'onClick': this.props.onClick
    }, this.props.icon ? React.createElement('span', { 'className': 'ff_icon' + (this.props.icon ? ' ff_icon-' + this.props.icon : '') + (this.props.hide_text ? '' : ' ff_icon-left') }) : null, React.createElement('span', { 'className': 'ff_module-button__content' + (this.props.hide_text ? ' ff_module-button__content--hidden' : '') }, this.props.text));
};