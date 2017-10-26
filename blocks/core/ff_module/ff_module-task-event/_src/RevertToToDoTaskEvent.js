'use strict';

var React = require('react');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState,
    taskEventWithOptionalMessageEdited = require('./taskEventWithOptionalMessage').editedState;

var defaultState = React.createClass({
    displayName: 'RevertToToDoTaskEventDefault',
    render: taskEventWithOptionalMessage('reverted the task to To Do')
});

var deletedState = React.createClass({
    displayName: 'RevertToToDoTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted the event \"Revert the task to To Do\".')
});

var editedState = React.createClass({
    displayName: 'StampResponseAsSeenTaskEventDeleted',
    render: taskEventWithOptionalMessageEdited('reverted the task to To Do.')
});

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
