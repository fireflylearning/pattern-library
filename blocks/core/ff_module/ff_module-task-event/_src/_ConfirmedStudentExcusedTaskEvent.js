'use strict';

var React = require('react');
var taskEventWithOptionalMessage = require('./_taskEventWithOptionalMessage');

module.exports = React.createClass({
    displayName: 'ConfirmedStudentExcusedTaskEvent',
    render: taskEventWithOptionalMessage('confirmed student is excused.')
});
