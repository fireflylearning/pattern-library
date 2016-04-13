'use strict';

var React = require('react');
var taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage');

module.exports = React.createClass({
    displayName: 'DeletedResponseTaskEvent',
    render: taskEventWithOptionalMessage('deleted a response.')
});
