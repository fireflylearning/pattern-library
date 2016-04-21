'use strict';

var React = require('react');
var taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState;

module.exports.defaultState = React.createClass({
    displayName: 'RequestResubmissionTaskEventDefault',
    render: taskEventWithOptionalMessage('requested resubmission.')
});

module.exports.deletedState = React.createClass({
    displayName: 'RequestResubmissionTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted a request for resubmission.')
});
