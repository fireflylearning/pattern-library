'use strict';

var React = require('react');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState,
    taskEventWithOptionalMessageEdited = require('./taskEventWithOptionalMessage').editedState;

var defaultState = React.createClass({
    displayName: 'StampResponseAsSeenTaskEventDefault',
    render: taskEventWithOptionalMessage('stamped response as seen.')
});

var deletedState = React.createClass({
    displayName: 'StampResponseAsSeenTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted a response seen stamp.')
});

var editedState = React.createClass({
    displayName: 'StampResponseAsSeenTaskEventDeleted',
    render: taskEventWithOptionalMessageEdited('stamped response as seen.')
});

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
