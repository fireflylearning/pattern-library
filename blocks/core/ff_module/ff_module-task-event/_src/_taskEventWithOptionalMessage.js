'use strict';
var React = require('react/addons');
var TaskEventBase = require('./_TaskEventBase.js');
module.exports = function(text) {
    return function() {
        var message = this.props.event.message ? React.createElement('p', { key: 'message', className: 'ff_module-task-event__message'}, this.props.event.message) : null;
        return React.createElement(TaskEventBase,
            { 'event': this.props.event },
            [React.createElement('p', { key: 'author-action', className: 'ff_module-task-event__author-action' }, this.props.event.author.name + ' ' + text),
            message]);
    };
};
