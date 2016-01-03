'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('div', {
        'className': 'ff_module-form-box-member',
        'id': this.props.guid
    }, React.createElement('span', { 'className': 'ff_module-form-box-member__label' }, this.props.label), React.createElement('button', {
        'className': 'ff_module-form-box-member__delete',
        'onClick': this.props.onDelete,
        'type': 'button'
    }, React.createElement('span', { 'className': 'ff_icon ff_icon-cancel-open-blue' })));
};