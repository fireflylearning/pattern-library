'use strict';

var React = require('react');
var taskEventWithOptionalMessage = require('./_taskEventWithOptionalMessage');

module.exports = React.createClass({
    displayName: 'RequestResubmissionTaskEvent',
    render: taskEventWithOptionalMessage('requested resubmission.')
});
