'use strict';

var React = require('react');
var taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage');

module.exports = React.createClass({
    displayName: 'ConfirmedCompleteTaskEvent',
    render: taskEventWithOptionalMessage('confirmed completion.')
});
