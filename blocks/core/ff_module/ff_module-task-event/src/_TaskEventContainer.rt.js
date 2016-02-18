'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('div', { 'className': 'ff_module-task-event ff_module-task-event--' + this.props.event.type }, React.createElement('p', { 'className': 'ff_module-task-event__sent' }, this.props.event.sent), '\n    ', this.props.children, '\n');
};