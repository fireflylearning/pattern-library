'use strict';

var React = require('react');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState,
    taskEventWithOptionalMessageEdited = require('./taskEventWithOptionalMessage').editedState;

var defaultState = React.createClass({
    displayName: 'RequestResubmissionTaskEventDefault',
    render: taskEventWithOptionalMessage('requested resubmission')
});

var deletedState = React.createClass({
    displayName: 'RequestResubmissionTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted a request for resubmission.')
});

var editedState = React.createClass({
    displayName: 'RequestResubmissionTaskEventEdited',
    render: taskEventWithOptionalMessageEdited('requested resubmission')
});


module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
