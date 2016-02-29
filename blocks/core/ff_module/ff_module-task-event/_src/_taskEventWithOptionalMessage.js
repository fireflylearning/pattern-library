'use strict';
var React = require('react/addons');
var TaskEventBase = require('./_TaskEventBase.js');
module.exports = function(text) {
    return function() {
        return React.createElement(TaskEventBase, { 'event': this.props.event }, React.createElement('p', { 'className': 'ff_module-task-event__author-action' }, this.props.event.author.name + ' ' + text));
    };

};
