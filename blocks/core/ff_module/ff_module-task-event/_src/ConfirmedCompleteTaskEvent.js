'use strict';

var React = require('react');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState,
    taskEventWithOptionalMessageEdited = require('./taskEventWithOptionalMessage').editedState;

var text = 'confirmed the task is complete';

var defaultState = React.createClass({
    displayName: 'ConfirmedCompleteTaskEventDefault',
    render: taskEventWithOptionalMessage(text)
});

var deletedState = React.createClass({
    displayName: 'ConfirmedCompleteTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted the event \"Confirmed the task is complete\".')
});

var editedState = React.createClass({
    displayName: 'StampResponseAsSeenTaskEventDeleted',
    render: taskEventWithOptionalMessageEdited(text)
});

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
