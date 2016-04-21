'use strict';

var React = require('react');
var taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState;

module.exports.defaultState = React.createClass({
    displayName: 'ConfirmedStudentExcusedTaskEventDefault',
    render: taskEventWithOptionalMessage('confirmed student is excused.')
});

module.exports.deletedState = React.createClass({
    displayName: 'ConfirmedStudentExcusedTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted a confirmation of excuse.')
});
