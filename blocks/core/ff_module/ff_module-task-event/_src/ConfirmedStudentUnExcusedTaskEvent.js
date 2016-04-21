'use strict';

var React = require('react');
var taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState;

module.exports.defaultState = React.createClass({
    displayName: 'ConfirmedUnStudentExcusedTaskEventDefault',
    render: taskEventWithOptionalMessage('unexcused student.')
});

module.exports.deletedState = React.createClass({
    displayName: 'ConfirmedUnStudentExcusedTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted an unexcused confirmation.')
});

