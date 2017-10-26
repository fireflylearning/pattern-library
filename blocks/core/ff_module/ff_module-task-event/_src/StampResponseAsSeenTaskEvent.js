'use strict';

var React = require('react');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState,
    taskEventWithOptionalMessageEdited = require('./taskEventWithOptionalMessage').editedState;

var text = 'stamped response as seen';
var defaultState = React.createClass({
    displayName: 'StampResponseAsSeenTaskEventDefault',
    render: taskEventWithOptionalMessage(text)
});

var deletedState = React.createClass({
    displayName: 'StampResponseAsSeenTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted a response seen stamp.')
});

var editedState = React.createClass({
    displayName: 'StampResponseAsSeenTaskEventDeleted',
    render: taskEventWithOptionalMessageEdited(text)
});

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
