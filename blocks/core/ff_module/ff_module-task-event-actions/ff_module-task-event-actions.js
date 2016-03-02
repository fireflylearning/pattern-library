'use strict';

var React = require('react');
var template = require('./_ff_module-task-event-actions.rt.js');

module.exports = React.createClass({
    displayName: 'TaskEventActions',
    render: template,
    propTypes: {
        onClick: React.PropTypes.func.isRequired
    }
});
