'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('button', {
        'type': 'button',
        'title': 'Create new group from list',
        'className': 'ff_module-button ff_module-button--large ff_module-button-new-recipient-group',
        'onClick': this.onClick
    }, React.createElement('span', { 'className': 'ff_module-button__content' }, 'Create new group from list'));
};