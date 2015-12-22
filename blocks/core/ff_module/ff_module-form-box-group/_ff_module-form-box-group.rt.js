'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('div', {
        'className': 'ff_module-form-box-group ff_module-form-box-group--is-editable',
        'id': this.props.guid
    }, React.createElement('button', {
        'className': 'ff_module-form-box-group__edit',
        'data-edit': this.props.guid,
        'onClick': this.props.onExpand,
        'type': 'button'
    }, React.createElement('span', { 'className': 'ff_icon ff_icon-edit-input-box' })), React.createElement('span', { 'className': 'ff_module-form-box-group__label' }, this.props.label), React.createElement('button', {
        'className': 'ff_module-form-box-group__delete',
        'data-delete': this.props.guid,
        'onClick': this.props.onDelete,
        'type': 'button'
    }, React.createElement('span', { 'className': 'ff_icon ff_icon-delete' })));
};