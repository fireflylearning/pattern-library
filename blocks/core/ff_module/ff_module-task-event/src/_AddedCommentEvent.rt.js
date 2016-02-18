'use strict';
var React = require('react/addons');
var _ = require('lodash');
var TaskEventContainer = require('./_TaskEventContainer.js');
module.exports = function () {
    return React.createElement(TaskEventContainer, { 'event': this.props.event }, React.createElement('span', { 'className': 'ff_module-task-event__author-action' }, this.props.event.author.name, ' added a comment:'), React.createElement('blockquote', { 'className': 'ff_module-task-event__comment' }, this.props.event.comment));
};