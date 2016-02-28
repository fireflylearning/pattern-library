'use strict';
var React = require('react/addons');
var _ = require('lodash');
var TaskEventBase = require('./_TaskEventBase.js');
module.exports = function () {
    return React.createElement(TaskEventBase, { 'event': this.props.event }, React.createElement('p', { 'className': 'ff_module-task-event__author-action' }, this.props.event.author.name, ' set a task:'), React.createElement('p', { 'className': 'ff_module-task-event__task-title' }, this.props.event.taskTitle));
};