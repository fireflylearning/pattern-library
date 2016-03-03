'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('div', { 'rclass': 'this.generateClass(\'ff_module-task-event\', this.props.event)' }, React.createElement('time', { 'className': 'ff_module-task-event__sent' }, this.formatDate(this.props.event.sent)), this.props.children);
};