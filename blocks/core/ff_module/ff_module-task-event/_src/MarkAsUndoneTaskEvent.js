'use strict';

var React = require('react');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState;

var text = 'marked the task as To Do';

var defaultState = React.createClass({
    displayName: 'markAsUndoneTaskEventDefault',
    render: taskEventWithOptionalMessage(text)
});

module.exports = {};
module.exports[eventStates.default] = defaultState;
