'use strict';

var React = require('react');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState;

var text = 'marked the task as done';

var defaultState = React.createClass({
    displayName: 'MarkAsDoneTaskEventDefault',
    render: taskEventWithOptionalMessage(text)
});

module.exports = {};
module.exports[eventStates.default] = defaultState;
