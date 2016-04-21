'use strict';

var React = require('react');
var taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState;

module.exports.defaultState = React.createClass({
    displayName: 'ConfirmedCompleteTaskEventDefault',
    render: taskEventWithOptionalMessage('confirmed completion.')
});

module.exports.deletedState = React.createClass({
    displayName: 'ConfirmedCompleteTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted a confirmation of completion.')
});
