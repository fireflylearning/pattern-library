'use strict';

var React = require('react');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState;

var defaultState = React.createClass({
    displayName: 'SentReminderTaskEventDefault',
    render: taskEventWithOptionalMessage('sent a reminder.')
});

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = 'span'; // Will never have deleted or edited states
module.exports[eventStates.edited] = 'span';
