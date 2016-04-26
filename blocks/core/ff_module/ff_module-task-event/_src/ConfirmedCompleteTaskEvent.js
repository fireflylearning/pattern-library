'use strict';

var React = require('react');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState,
    taskEventWithOptionalMessageEdited = require('./taskEventWithOptionalMessage').editedState;

var defaultState = React.createClass({
    displayName: 'ConfirmedCompleteTaskEventDefault',
    render: taskEventWithOptionalMessage('confirmed completion.')
});

var deletedState = React.createClass({
    displayName: 'ConfirmedCompleteTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted a confirmation of completion.')
});

var editedState = React.createClass({
    displayName: 'StampResponseAsSeenTaskEventDeleted',
    render: taskEventWithOptionalMessageEdited('confirmed completion.')
});

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
