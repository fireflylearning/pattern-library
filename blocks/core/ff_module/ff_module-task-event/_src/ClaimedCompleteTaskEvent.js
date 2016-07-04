'use strict';

var React = require('react');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState,
    taskEventWithOptionalMessageEdited = require('./taskEventWithOptionalMessage').editedState;

var defaultState = React.createClass({
    displayName: 'ClaimedCompleteTaskEventDefault',
    render: taskEventWithOptionalMessage('claimed completion.')
});

var deletedState = React.createClass({
    displayName: 'ClaimedCompleteTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted a claim of completion.')
});

var editedState = React.createClass({
    displayName: 'ClaimedCompleteTaskEventEdited',
    render: taskEventWithOptionalMessageEdited('claimed completion.')
});

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
