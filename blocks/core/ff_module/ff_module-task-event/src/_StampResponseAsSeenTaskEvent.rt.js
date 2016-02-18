'use strict';
var React = require('react/addons');
var _ = require('lodash');
var TaskEventContainer = require('./_TaskEventContainer.js');
module.exports = function () {
    return React.createElement(TaskEventContainer, { 'event': this.props.event }, React.createElement('p', { 'className': 'ff_module-task-event__author-action' }, this.props.event.author.name, ' stamped response as seen'));
};