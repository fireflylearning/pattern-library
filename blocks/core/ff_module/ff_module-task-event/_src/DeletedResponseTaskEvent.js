'use strict';

var React = require('react');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState;

var defaultState = React.createClass({
    displayName: 'DeletedResponseTaskEventDefault',
    render: taskEventWithOptionalMessage('deleted a response.')
});

var deletedState = React.createClass({
    displayName: 'DeletedResponseTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('restored a response.')
});

var editedState = 'p';

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
