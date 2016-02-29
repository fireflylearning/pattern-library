'use strict';
var React = require('react/addons');
var _ = require('lodash');
var TaskEventBase = require('./_TaskEventBase.js');
module.exports = function () {
    return React.createElement(TaskEventBase, { 'event': this.props.event }, React.createElement('span', { 'className': 'ff_module-task-event__author-action' }, this.props.event.author.name, ' added a comment:'), React.createElement('blockquote', { 'className': 'ff_module-task-event__comment' }, '\u201C', this.props.event.comment, '\u201D'));
};