'use strict';

var React = require('react');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState;

var defaultState = React.createClass({
    displayName: 'InvalidType',
    render: taskEventWithOptionalMessage(' - Something went wrong with this response. If this keeps happening, contact our Support Team.')
});

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = defaultState;
module.exports[eventStates.edited] = defaultState;
