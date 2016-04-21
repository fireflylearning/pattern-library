'use strict';

var React = require('react');
var taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState;

module.exports.defaultState = React.createClass({
    displayName: 'DeletedResponseTaskEventDefault',
    render: taskEventWithOptionalMessage('deleted a response.')
});

module.exports.deletedState = React.createClass({
    displayName: 'DeletedResponseTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('restored a response.')
});
