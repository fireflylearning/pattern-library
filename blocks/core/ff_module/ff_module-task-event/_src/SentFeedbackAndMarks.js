'use strict';

var React = require('react');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState;

var defaultState = React.createClass({
    displayName: 'SentFeedbackAndMarksTaskEventDefault',
    render: taskEventWithOptionalMessage('sent feedback and marks')
});

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = 'span'; // Will never have deleted or edited states
module.exports[eventStates.edited] = 'span';
