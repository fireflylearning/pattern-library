'use strict';

var React = require('react');
var taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage');

module.exports = React.createClass({
    displayName: 'RequestResubmissionTaskEvent',
    render: taskEventWithOptionalMessage('requested resubmission.')
});
