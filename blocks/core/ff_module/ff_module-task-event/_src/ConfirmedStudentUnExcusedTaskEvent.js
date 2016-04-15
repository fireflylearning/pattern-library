'use strict';

var React = require('react');
var taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage');

module.exports = React.createClass({
    displayName: 'ConfirmedUnStudentExcusedTaskEvent',
    render: taskEventWithOptionalMessage('unexcused student.')
});
