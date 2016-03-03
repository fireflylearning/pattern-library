'use strict';

var React = require('react');
var taskEventWithOptionalMessage = require('./_taskEventWithOptionalMessage');

module.exports = React.createClass({
    displayName: 'StampResponseAsSeenTaskEvent',
    render: taskEventWithOptionalMessage('stamped response as seen.')
});
