'use strict';

var React = require('react');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState,
    taskEventWithOptionalMessageEdited = require('./taskEventWithOptionalMessage').editedState;

var defaultState = React.createClass({
    displayName: 'ConfirmedStudentExcusedTaskEventDefault',
    render: taskEventWithOptionalMessage('confirmed student is excused.')
});

var deletedState = React.createClass({
    displayName: 'ConfirmedStudentExcusedTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted a confirmation of excuse.')
});

var editedState = React.createClass({
    displayName: 'ConfirmedStudentExcusedTaskEventEdited',
    render: taskEventWithOptionalMessageEdited('confirmed student is excused.')
});


module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
