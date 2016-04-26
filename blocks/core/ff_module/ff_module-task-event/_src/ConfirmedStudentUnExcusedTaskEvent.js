'use strict';

var React = require('react');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState,
    taskEventWithOptionalMessageEdited = require('./taskEventWithOptionalMessage').editedState;

var defaultState = React.createClass({
    displayName: 'ConfirmedUnStudentExcusedTaskEventDefault',
    render: taskEventWithOptionalMessage('unexcused student.')
});

var deletedState = React.createClass({
    displayName: 'ConfirmedUnStudentExcusedTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted an unexcused confirmation.')
});

var editedState = React.createClass({
    displayName: 'ConfirmedUnStudentExcusedTaskEventDeleted',
    render: taskEventWithOptionalMessageEdited('unexcused student.')
});

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
