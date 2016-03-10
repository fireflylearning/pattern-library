'use strict';
var React = require('react/addons');
var _ = require('lodash');
var Button = require('../../ff_module-button/ff_module-button');
module.exports = function () {
    return React.createElement('div', { 'className': 'ff_module-task-event-editor' }, React.createElement('h1', { 'className': 'ff_module-task-event-editor__title' }, this.props.title), '\n    ', this.props.children, '\n    ', React.createElement(Button, {
        'onClick': this.props.onSend,
        'text': this.props.sendText,
        'classes': 'ff_module-task-event-editor__send'
    }));
};