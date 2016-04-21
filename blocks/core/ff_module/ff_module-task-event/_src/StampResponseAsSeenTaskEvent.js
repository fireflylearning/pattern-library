'use strict';

var React = require('react');
var taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState;

module.exports.defaultState = React.createClass({
    displayName: 'StampResponseAsSeenTaskEventDefault',
    render: taskEventWithOptionalMessage('stamped response as seen.')
});

module.exports.deletedState = React.createClass({
    displayName: 'StampResponseAsSeenTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted a response seen stamp.')
});
