'use strict';
var React = require('react/addons');
var _ = require('lodash');
var TaskEventBase = require('./_TaskEventBase.js');
module.exports = function () {
    return React.createElement(TaskEventBase, { 'event': this.props.event }, React.createElement('p', { 'className': 'ff_module-task-event__author-action' }, this.props.event.author.name, ' added a mark:'), React.createElement('p', { 'className': 'ff_module-task-event__mark-and-grade' }, this.props.event.mark ? React.createElement('span', { 'className': 'ff_module-task-event__mark' }, this.props.event.mark, '/', this.props.event.markMax) : null, this.props.event.grade ? React.createElement('span', { 'className': 'ff_module-task-event__grade' }, this.props.event.mark ? ', ' : '', this.props.event.grade) : null));
};